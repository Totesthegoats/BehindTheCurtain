# Decap CMS Setup Guide

This guide will help you deploy your site with Decap CMS (formerly Netlify CMS), giving you a beautiful admin interface to manage your content.

## What You'll Get

- Professional CMS at `yoursite.com/admin`
- Write articles in a visual editor (like WordPress)
- Upload images with drag-and-drop
- Publish content with one click
- All changes saved to GitHub (version control included!)

---

## Step 1: Create a GitHub Account & Repository

### 1.1 Sign up for GitHub
- Go to [github.com](https://github.com)
- Click "Sign up" and create a free account
- Verify your email

### 1.2 Create a New Repository
1. Click the "+" icon in the top right → "New repository"
2. **Repository name**: `behind-the-curtain` (or your preferred name)
3. **Description**: "Personal Bitcoin website"
4. Select **Public**
5. **Important**: Do NOT check "Add a README file" (you already have one)
6. Click "Create repository"

### 1.3 Upload Your Files
1. On the empty repository page, click "uploading an existing file"
2. Open your `BehindTheCurtain` folder on your computer
3. **Select ALL files and folders** (index.html, styles.css, admin folder, content folder, etc.)
4. **Drag them all** into the GitHub upload area
5. Scroll down and click "Commit changes"
6. Wait for the upload to complete

**Your code is now on GitHub!** ✓

---

## Step 2: Deploy to Netlify

### 2.1 Sign Up for Netlify
1. Go to [netlify.com](https://www.netlify.com)
2. Click "Sign up"
3. **Choose "Sign up with GitHub"** (this is important!)
4. Authorize Netlify to access your GitHub account

### 2.2 Deploy Your Site
1. Once logged in, click "Add new site" → "Import an existing project"
2. Click "GitHub"
3. Find and select your `behind-the-curtain` repository
4. **Site settings:**
   - Branch to deploy: `main` (or `master` if that's what you have)
   - Build command: (leave empty)
   - Publish directory: (leave empty)
5. Click "Deploy site"

### 2.3 Wait for Deployment
- Netlify will deploy your site (takes 1-2 minutes)
- You'll get a URL like: `random-name-123456.netlify.app`
- **Your site is now live!** ✓

### 2.4 Change Site Name (Optional)
1. Click "Site settings"
2. Click "Change site name"
3. Enter your preferred name: `behind-the-curtain`
4. Your new URL: `behind-the-curtain.netlify.app`

---

## Step 3: Enable Decap CMS

### 3.1 Enable Netlify Identity
1. In your Netlify site dashboard, click "Site settings"
2. Click "Identity" in the left sidebar
3. Click "Enable Identity"

### 3.2 Enable Git Gateway
1. Still in "Identity" settings, scroll down to "Services"
2. Click "Enable Git Gateway"
3. This allows the CMS to save changes to GitHub

### 3.3 Invite Yourself as a User
1. Go to the "Identity" tab (top of the page)
2. Click "Invite users"
3. Enter your email address
4. Click "Send"
5. Check your email and click the invitation link
6. Set a password for your CMS access

---

## Step 4: Access Your CMS

### 4.1 Go to Your Admin Panel
1. Visit: `your-site-name.netlify.app/admin`
2. Log in with the email and password you just created
3. **You're in!** 🎉

### 4.2 What You Can Do
- Click "Writings" to create blog posts
- Click "Journal" for journal entries
- Click "Projects" to add portfolio items
- Use the visual editor (rich text, like Word)
- Upload images by clicking the image icon
- Click "Publish" to make content live

---

## How to Update Content

### Adding a New Article

1. Go to `yoursite.com/admin`
2. Log in
3. Click "Writings" → "New Writings"
4. Fill in the form:
   - **Title**: Your article title
   - **Publish Date**: When to publish
   - **Category**: Select from dropdown
   - **Tags**: Add relevant tags
   - **Excerpt**: Short preview text
   - **Body**: Write your article (supports formatting!)
   - **Read Time**: e.g., "5 min read"
   - **Featured**: Check if you want it highlighted
5. Click "Publish" → "Publish now"
6. **Done!** Your article is live in seconds

### Adding Images to Projects

1. Click "Projects" → "New Projects"
2. Fill in the details
3. For **Featured Image**:
   - Click "Choose an image"
   - Drag and drop or select from computer
   - Image automatically uploads
4. Fill in the rest of the form
5. Click "Publish"

### Editing Existing Content

1. Go to admin panel
2. Click on "Writings", "Journal", or "Projects"
3. Click on any item to edit it
4. Make your changes
5. Click "Publish" → "Publish now"

---

## Important Notes

### Manifest Files
When you add new content through the CMS, you'll need to update the manifest.json files manually (for now). After creating content via CMS:

1. Go to your GitHub repository
2. Navigate to the content folder (e.g., `content/writings/`)
3. Edit `manifest.json`
4. Add the new filename to the "files" array
5. Commit the change

**Example:**
```json
{
  "files": [
    "2025-01-15-understanding-bitcoin-value.md",
    "2025-01-20-your-new-article.md"
  ]
}
```

### Updating HTML Files
If you need to update HTML, CSS, or JavaScript:

**Option A - Via GitHub:**
1. Go to your GitHub repository
2. Click on the file you want to edit
3. Click the pencil icon (Edit)
4. Make your changes
5. Click "Commit changes"
6. Netlify auto-deploys in 1-2 minutes

**Option B - Upload New Version:**
1. Update files on your computer
2. In GitHub, navigate to the file
3. Click "Upload files"
4. Drag the updated file
5. Commit

---

## Custom Domain (Optional)

Want to use your own domain instead of `.netlify.app`?

1. Buy a domain (from Namecheap, Google Domains, etc.)
2. In Netlify: Site settings → Domain management
3. Click "Add custom domain"
4. Follow the instructions to point your domain to Netlify
5. Netlify automatically provides free HTTPS!

---

## Troubleshooting

### CMS shows "Config Error"
- Make sure `admin/config.yml` was uploaded correctly
- Check that the file has no syntax errors

### Can't log in to /admin
- Make sure Netlify Identity is enabled
- Check your email for the invitation
- Try resetting your password in Identity settings

### Content not showing on site
- Check that the markdown file exists in the content folder
- Make sure the filename is added to the manifest.json
- Check browser console for errors

### Images not uploading
- Make sure the `images/uploads` folder exists
- Check Netlify Identity permissions
- Try a smaller image (under 5MB)

---

## Workflow Summary

1. **Write content**: Go to `yoursite.com/admin`, create/edit content
2. **Publish**: Click publish in the CMS
3. **Update manifest**: Add new filenames to manifest.json (via GitHub)
4. **Done**: Changes are live!

---

## Benefits of This Setup

✅ **Free** (GitHub + Netlify both free for personal use)
✅ **Fast** (Global CDN, loads quickly anywhere)
✅ **Secure** (HTTPS included, Git-backed)
✅ **Easy** (Visual editor, no code needed for content)
✅ **Version Control** (Every change saved in Git history)
✅ **Backups** (GitHub stores everything)

---

## Need Help?

- **Netlify Docs**: https://docs.netlify.com
- **Decap CMS Docs**: https://decapcms.org/docs
- **GitHub Docs**: https://docs.github.com

Good luck, and enjoy your new CMS! 🚀
