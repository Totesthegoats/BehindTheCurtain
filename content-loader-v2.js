// Content Loader for Markdown-based Content (Decap CMS compatible)
// This script loads content from markdown files with YAML frontmatter

// Simple markdown parser
function parseMarkdown(markdown) {
    // Convert markdown to HTML (basic implementation)
    let html = markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // Links
        .replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>')
        // Line breaks
        .replace(/\n\n/gim, '</p><p>')
        // Lists
        .replace(/^\- (.*$)/gim, '<li>$1</li>');

    return `<p>${html}</p>`.replace(/<p><\/p>/g, '');
}

// Parse frontmatter from markdown file
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { data: {}, content: content };
    }

    const frontmatter = match[1];
    const body = match[2];

    // Parse YAML frontmatter (simple implementation)
    const data = {};
    const lines = frontmatter.split('\n');
    let currentKey = null;
    let currentArray = null;

    lines.forEach(line => {
        // Handle arrays
        if (line.trim().startsWith('-') && currentArray) {
            currentArray.push(line.trim().substring(1).trim().replace(/^["']|["']$/g, ''));
        }
        // Handle key-value pairs
        else if (line.includes(':')) {
            const colonIndex = line.indexOf(':');
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            // Remove quotes
            value = value.replace(/^["']|["']$/g, '');

            // Check if it's a boolean
            if (value === 'true') value = true;
            if (value === 'false') value = false;

            // Check if next item is an array
            if (value === '') {
                currentKey = key;
                currentArray = [];
                data[key] = currentArray;
            } else {
                data[key] = value;
                currentKey = null;
                currentArray = null;
            }
        }
    });

    return { data, content: body };
}

// Fetch and parse a markdown file
async function fetchMarkdownFile(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
        const content = await response.text();
        return parseFrontmatter(content);
    } catch (error) {
        console.error('Error fetching markdown:', error);
        return null;
    }
}

// Get list of markdown files from a directory
async function getMarkdownFiles(directory) {
    // Since we can't list directory contents from browser,
    // we'll maintain a manifest file
    try {
        const response = await fetch(`${directory}/manifest.json`);
        const manifest = await response.json();
        return manifest.files;
    } catch (error) {
        console.error('Error loading manifest:', error);
        return [];
    }
}

// Load Writings
async function loadWritings() {
    const container = document.getElementById('writings-container');
    if (!container) return;

    try {
        const files = await getMarkdownFiles('content/writings');
        const writings = [];

        for (const file of files) {
            const parsed = await fetchMarkdownFile(`content/writings/${file}`);
            if (parsed) {
                writings.push({
                    ...parsed.data,
                    body: parsed.content,
                    id: file.replace('.md', ''),
                    slug: file.replace('.md', '')
                });
            }
        }

        // Sort by date (newest first)
        writings.sort((a, b) => new Date(b.date) - new Date(a.date));

        displayWritings(writings);
        setupWritingsFilter(writings);
    } catch (error) {
        console.error('Error loading writings:', error);
        container.innerHTML = '<p class="error">Failed to load writings. Please try again later.</p>';
    }
}

// Display writings in the grid
function displayWritings(writings, filter = 'all') {
    const container = document.getElementById('writings-container');

    const filtered = filter === 'all'
        ? writings
        : writings.filter(w => w.category === filter);

    if (filtered.length === 0) {
        container.innerHTML = '<p class="no-results">No writings found in this category.</p>';
        return;
    }

    container.innerHTML = filtered.map(writing => `
        <article class="writing-card ${writing.featured ? 'featured' : ''}" data-category="${writing.category}">
            <div class="writing-header">
                <span class="writing-category">${writing.category}</span>
                <span class="writing-date">${formatDate(writing.date)}</span>
            </div>
            <h3 class="writing-title">${writing.title}</h3>
            <p class="writing-excerpt">${writing.excerpt}</p>
            <div class="writing-meta">
                <span class="read-time">${writing.readTime}</span>
                <div class="writing-tags">
                    ${writing.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <button class="read-more" onclick="expandWriting('${writing.id}')">Read More →</button>
            <div class="writing-content" id="content-${writing.id}" style="display: none;">
                <div class="content-text">${parseMarkdown(writing.body)}</div>
                <button class="read-less" onclick="collapseWriting('${writing.id}')">Show Less ↑</button>
            </div>
        </article>
    `).join('');
}

// Setup filter functionality
function setupWritingsFilter(writings) {
    const filterButtons = document.querySelectorAll('.filter-tab');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            displayWritings(writings, filter);
        });
    });
}

// Expand/collapse functions
function expandWriting(id) {
    const content = document.getElementById(`content-${id}`);
    if (content) {
        content.style.display = 'block';
        content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function collapseWriting(id) {
    const content = document.getElementById(`content-${id}`);
    if (content) {
        content.style.display = 'none';
    }
}

// Load Journal Entries
async function loadJournal() {
    const container = document.getElementById('journal-container');
    if (!container) return;

    try {
        const files = await getMarkdownFiles('content/journal');
        const entries = [];

        for (const file of files) {
            const parsed = await fetchMarkdownFile(`content/journal/${file}`);
            if (parsed) {
                entries.push({
                    ...parsed.data,
                    body: parsed.content,
                    id: file.replace('.md', '')
                });
            }
        }

        // Sort by date (newest first)
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));

        displayJournalEntries(entries);
    } catch (error) {
        console.error('Error loading journal:', error);
        container.innerHTML = '<p class="error">Failed to load journal entries. Please try again later.</p>';
    }
}

// Display journal entries
function displayJournalEntries(entries) {
    const container = document.getElementById('journal-container');

    if (entries.length === 0) {
        container.innerHTML = '<p class="no-results">No journal entries yet. Check back soon!</p>';
        return;
    }

    container.innerHTML = entries.map(entry => `
        <article class="journal-entry">
            <div class="entry-header">
                <h3 class="entry-title">${entry.title}</h3>
                <span class="entry-date">${formatDate(entry.date)}</span>
            </div>
            <div class="entry-content">
                ${parseMarkdown(entry.body)}
            </div>
            ${entry.tags && entry.tags.length > 0 ? `
                <div class="entry-tags">
                    ${entry.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            ` : ''}
        </article>
    `).join('');
}

// Load Projects
async function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    try {
        const files = await getMarkdownFiles('content/projects');
        const projects = [];

        for (const file of files) {
            const parsed = await fetchMarkdownFile(`content/projects/${file}`);
            if (parsed) {
                projects.push({
                    ...parsed.data,
                    body: parsed.content,
                    id: file.replace('.md', '')
                });
            }
        }

        displayProjects(projects);
        setupProjectsFilter(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = '<p class="error">Failed to load projects. Please try again later.</p>';
    }
}

// Display projects in the grid
function displayProjects(projects, filter = 'all') {
    const container = document.getElementById('projects-container');

    const filtered = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    if (filtered.length === 0) {
        container.innerHTML = '<p class="no-results">No projects found in this category.</p>';
        return;
    }

    container.innerHTML = filtered.map(project => `
        <article class="project-card ${project.featured ? 'featured' : ''}" data-category="${project.category}">
            <div class="project-image-wrapper">
                ${project.image ? `
                    <img src="${project.image}" alt="${project.imageAlt || project.title}" class="project-image">
                ` : `
                    <div class="project-placeholder">
                        <span>${project.title}</span>
                    </div>
                `}
                ${project.status === 'active' ? '<span class="project-badge active">Active</span>' : ''}
                ${project.status === 'completed' ? '<span class="project-badge completed">Completed</span>' : ''}
            </div>
            <div class="project-content">
                <div class="project-header">
                    <span class="project-category">${project.category}</span>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>

                ${project.highlights && project.highlights.length > 0 ? `
                    <ul class="project-highlights">
                        ${project.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                ` : ''}

                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>

                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>

                <div class="project-links">
                    ${project.liveUrl ? `<a href="${project.liveUrl}" class="project-link" target="_blank">View Live →</a>` : ''}
                    ${project.githubUrl ? `<a href="${project.githubUrl}" class="project-link" target="_blank">GitHub →</a>` : ''}
                    ${project.demoUrl ? `<a href="${project.demoUrl}" class="project-link" target="_blank">Demo →</a>` : ''}
                </div>
            </div>
        </article>
    `).join('');
}

// Setup project filter functionality
function setupProjectsFilter(projects) {
    const filterButtons = document.querySelectorAll('.filter-tab');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            displayProjects(projects, filter);
        });
    });
}

// Helper: Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('writings-container')) {
        loadWritings();
    }

    if (document.getElementById('journal-container')) {
        loadJournal();
    }

    if (document.getElementById('projects-container')) {
        loadProjects();
    }
});
