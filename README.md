# Behind the Curtain - Website

A modern Bitcoin-focused personal website featuring writings, journal entries, and portfolio sections.

## Pages

- **Home** (`index.html`) - Main landing page with hero section, about, expertise, and projects
- **About** (`about.html`) - Personal information and philosophy
- **Projects** (`projects.html`) - Portfolio of work with images and descriptions
- **Writings** (`writings.html`) - Blog posts and in-depth articles
- **Journal** (`journal.html`) - Quick thoughts and reflections
- **Contact** (`contact.html`) - Contact form and information

## Easy Content Updates

One of the key features of this site is the ability to update your projects, writings, and journal entries **without having to reupload your entire codebase**. Here's how:

### Updating Writings

1. Open `writings.json` in any text editor
2. Add, edit, or remove entries in the `writings` array
3. Upload ONLY the `writings.json` file to your server
4. The changes will appear immediately on your site!

#### Writing Entry Format

```json
{
  "id": 1,
  "title": "Your Article Title",
  "slug": "url-friendly-slug",
  "date": "2025-01-15",
  "category": "bitcoin",
  "tags": ["Bitcoin", "Economics"],
  "excerpt": "A short preview of your article...",
  "content": "Full article content here...",
  "readTime": "8 min read",
  "featured": false
}
```

**Categories**: Use one of: `bitcoin`, `technology`, `economics`, `philosophy`, or add your own
**Featured**: Set to `true` to make an article larger and more prominent

### Updating Journal Entries

1. Open `journal.json` in any text editor
2. Add new entries to the `entries` array (newest first)
3. Upload ONLY the `journal.json` file to your server
4. Done!

#### Journal Entry Format

```json
{
  "id": 1,
  "date": "2025-01-28",
  "title": "Entry Title",
  "content": "Your thoughts here...\n\nUse \\n\\n for new paragraphs.",
  "tags": ["tag1", "tag2"]
}
```

### Updating Projects

1. Open `projects.json` in any text editor
2. Add, edit, or remove entries in the `projects` array
3. Upload ONLY the `projects.json` file (and any new images) to your server
4. Your portfolio updates automatically!

#### Project Entry Format

```json
{
  "id": 1,
  "title": "Project Title",
  "slug": "project-slug",
  "category": "bitcoin",
  "tags": ["Bitcoin", "Development"],
  "description": "Project description...",
  "image": "images/projects/project-name.jpg",
  "imageAlt": "Image description",
  "technologies": ["React", "Node.js"],
  "status": "active",
  "links": {
    "live": "https://example.com",
    "github": "https://github.com/user/repo",
    "demo": ""
  },
  "highlights": [
    "Key achievement 1",
    "Key achievement 2"
  ],
  "featured": false
}
```

**Categories**: Use one of: `bitcoin`, `development`, `education`, `research`, or add your own
**Status**: Use `active`, `completed`, or `archived`
**Images**: Place project images in an `images/projects/` folder
**Featured**: Set to `true` to make a project larger and span 2 columns

## File Structure

```
BTC/
├── index.html              # Home page
├── about.html              # About page
├── projects.html           # Projects portfolio page
├── writings.html           # Writings/blog page
├── journal.html            # Journal page
├── contact.html            # Contact page
├── styles.css              # All site styles
├── script.js               # Main site JavaScript
├── content-loader.js       # Loads content from JSON files
├── projects.json           # ← UPDATE THIS for new projects
├── writings.json           # ← UPDATE THIS for new articles
├── journal.json            # ← UPDATE THIS for new journal entries
├── images/
│   └── projects/           # Project images folder
└── README.md               # This file
```

## Workflow for Adding Content

### Adding a New Project

1. (Optional) Add project image to `images/projects/` folder
2. Edit `projects.json`
3. Copy an existing entry as a template
4. Update the `id` to be unique
5. Fill in title, description, technologies, links, etc.
6. Set the `image` path if you added an image
7. Save the file
8. Upload `projects.json` (and image if added) to your web server

### Adding a New Article

1. Edit `writings.json`
2. Copy the template entry
3. Update the `id` to be unique (increment from the last one)
4. Fill in your title, content, category, tags, etc.
5. Save the file
6. Upload ONLY `writings.json` to your web server

### Adding a Journal Entry

1. Edit `journal.json`
2. Add a new entry at the top of the `entries` array
3. Update the `id` to be unique
4. Fill in the date, title, and content
5. Save the file
6. Upload ONLY `journal.json` to your web server

## Tips

- Keep backups of your JSON files
- Use a JSON validator (like [jsonlint.com](https://jsonlint.com)) to check your JSON is valid before uploading
- For long articles, consider using `\n\n` to create paragraph breaks in the content
- Set `featured: true` for important writings or projects to display them prominently
- Use consistent date formatting (YYYY-MM-DD)
- For projects: optimize images before uploading (recommended: JPG, 800-1200px wide)
- If you don't have an image for a project, the site will show a nice placeholder instead

## Customization

### Changing Colors

Edit the CSS variables at the top of `styles.css`:

```css
:root {
    --color-primary: #f7931a;  /* Bitcoin orange */
    --color-accent: #8b5cf6;   /* Purple accent */
    /* etc... */
}
```

### Adding New Categories

To add new writing or project categories:

1. Add a new filter button in `writings.html` or `projects.html`:
   ```html
   <button class="filter-tab" data-filter="yourcategory">Your Category</button>
   ```

2. Use the category in your entries:
   ```json
   "category": "yourcategory"
   ```

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- Google Fonts (Space Grotesk, JetBrains Mono)

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Questions?

For any questions about updating content or customizing the site, refer to this README or the comments in the code files.
