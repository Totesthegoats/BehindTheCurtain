// Content Loader for Writings and Journal Pages
// This script dynamically loads content from JSON files

// Load Writings
async function loadWritings() {
    const container = document.getElementById('writings-container');
    if (!container) return;

    try {
        const response = await fetch('writings.json');
        const data = await response.json();

        displayWritings(data.writings);
        setupWritingsFilter(data.writings);
    } catch (error) {
        console.error('Error loading writings:', error);
        container.innerHTML = '<p class="error">Failed to load writings. Please try again later.</p>';
    }
}

// Display writings in the grid
function displayWritings(writings, filter = 'all') {
    const container = document.getElementById('writings-container');

    // Filter writings
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
            <button class="read-more" onclick="expandWriting(${writing.id})">Read More →</button>
            <div class="writing-content" id="content-${writing.id}" style="display: none;">
                <div class="content-text">${formatContent(writing.content)}</div>
                <button class="read-less" onclick="collapseWriting(${writing.id})">Show Less ↑</button>
            </div>
        </article>
    `).join('');
}

// Setup filter functionality
function setupWritingsFilter(writings) {
    const filterButtons = document.querySelectorAll('.filter-tab');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter writings
            const filter = button.getAttribute('data-filter');
            displayWritings(writings, filter);
        });
    });
}

// Expand writing to show full content
function expandWriting(id) {
    const content = document.getElementById(`content-${id}`);
    if (content) {
        content.style.display = 'block';
        content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Collapse writing
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
        const response = await fetch('journal.json');
        const data = await response.json();

        displayJournalEntries(data.entries);
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
                ${formatContent(entry.content)}
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
        const response = await fetch('projects.json');
        const data = await response.json();

        displayProjects(data.projects);
        setupProjectsFilter(data.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = '<p class="error">Failed to load projects. Please try again later.</p>';
    }
}

// Display projects in the grid
function displayProjects(projects, filter = 'all') {
    const container = document.getElementById('projects-container');

    // Filter projects
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
                    ${project.links.live ? `<a href="${project.links.live}" class="project-link" target="_blank">View Live →</a>` : ''}
                    ${project.links.github ? `<a href="${project.links.github}" class="project-link" target="_blank">GitHub →</a>` : ''}
                    ${project.links.demo ? `<a href="${project.links.demo}" class="project-link" target="_blank">Demo →</a>` : ''}
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
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
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

// Helper: Format content (convert line breaks to paragraphs)
function formatContent(content) {
    return content
        .split('\n\n')
        .map(para => para.trim())
        .filter(para => para.length > 0)
        .map(para => `<p>${para}</p>`)
        .join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we're on and load appropriate content
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
