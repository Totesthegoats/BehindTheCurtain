# GitHub Backend Setup for Decap CMS

Your CMS is now configured to use **GitHub authentication** instead of deprecated Netlify Identity. This is simpler and more modern!

## What You'll Do

1. Upload the updated config file to GitHub
2. Create a GitHub OAuth App (one-time, 5 minutes)
3. Add OAuth credentials to Netlify
4. Access your CMS and log in with GitHub!

---

## Step 1: Upload Updated Config to GitHub

Your `admin/config.yml` has been updated. Now upload it:

### Option A: Via GitHub Web Interface

1. Go to your repository: https://github.com/Totesthegoats/BehindTheCurtain
2. Navigate to the `admin` folder (click on it)
3. Click on `config.yml`
4. Click the **pencil icon** (Edit this file)
5. **Delete all the content**
6. **Copy and paste** the content from your local `admin/config.yml` file
7. Scroll down and click **"Commit changes"**
8. Add commit message: "Switch to GitHub backend"
9. Click **"Commit changes"** again

### Option B: Upload the Entire Folder Again

1. Go to your repository: https://github.com/Totesthegoats/BehindTheCurtain
2. Click "Add file" → "Upload files"
3. Drag your entire `BehindTheCurtain` folder (it will overwrite old files)
4. Commit the changes

---

## Step 2: Create GitHub OAuth Application

This allows the CMS to authenticate via GitHub.

### 2.1 Go to GitHub Settings

1. Click your **profile picture** (top right on GitHub)
2. Click **"Settings"**
3. Scroll down the left sidebar to **"Developer settings"** (at the bottom)
4. Click **"OAuth Apps"**
5. Click **"New OAuth App"** button

### 2.2 Fill Out the OAuth App Form

**Application name:**
```
Behind the Curtain CMS
```

**Homepage URL:**
```
https://your-site-name.netlify.app
```
(Replace `your-site-name` with your actual Netlify site name)

**Application description:** (optional)
```
CMS for Behind the Curtain website
```

**Authorization callback URL:** (IMPORTANT!)
```
https://api.netlify.com/auth/done
```

### 2.3 Register the Application

1. Click **"Register application"**
2. You'll see your new OAuth app page with:
   - **Client ID** (looks like: `Iv1.a1b2c3d4e5f6g7h8`)
   - **Client Secret** (click "Generate a new client secret" if not visible)

3. **IMPORTANT**: Keep this page open! You'll need these values in the next step.

---

## Step 3: Add OAuth to Netlify

Now tell Netlify about your GitHub OAuth app:

### 3.1 Go to Netlify Environment Variables

1. Go to your Netlify dashboard: https://app.netlify.com
2. Click on your site
3. Look for **"Site configuration"** or **"Site settings"**
4. In the left sidebar, find **"Environment variables"**
   - If you don't see it, try: **"Build & deploy"** → **"Environment"**
   - Or look under **"Variables"** or **"Environment"**

### 3.2 Add GitHub OAuth Variables

Click **"Add a variable"** or **"New variable"** and add these TWO variables:

**Variable 1:**
- **Key:** `GITHUB_OAUTH_CLIENT_ID`
- **Value:** (paste your Client ID from GitHub)

**Variable 2:**
- **Key:** `GITHUB_OAUTH_CLIENT_SECRET`
- **Value:** (paste your Client Secret from GitHub)

Click **"Save"** or **"Create"** for both.

### 3.3 Enable GitHub OAuth in Netlify

Still in Netlify settings:

1. Look for **"Access control"** or **"Integrations"** in the sidebar
2. Find **"OAuth"** or **"External OAuth providers"**
3. You should see **"GitHub"**
4. Click **"Install provider"** or **"Enable"**
5. Enter your **Client ID** and **Client Secret** again
6. Click **"Install"** or **"Save"**

**Can't find it?** Try this direct approach:
- Go to: `https://app.netlify.com/sites/YOUR-SITE-NAME/settings/access`
- Look for OAuth section

---

## Step 4: Test Your CMS!

### 4.1 Access the Admin Panel

1. Go to: `https://your-site-name.netlify.app/admin`
2. You should see a **"Login with GitHub"** button
3. Click it!

### 4.2 Authorize the App

1. GitHub will ask you to authorize the application
2. Click **"Authorize"** or **"Authorize Totesthegoats"**
3. You'll be redirected back to your CMS

### 4.3 Success!

You should now see the Decap CMS interface with:
- **Writings** collection
- **Journal** collection
- **Projects** collection

🎉 **You're in!**

---

## Using Your CMS

### Create a New Article

1. Click **"Writings"** in the sidebar
2. Click **"New Writings"**
3. Fill out the form
4. Click **"Publish"** → **"Publish now"**
5. Changes are automatically saved to GitHub and deployed!

### Upload Images

1. When creating/editing a project
2. Click on the **"Featured Image"** field
3. Click **"Choose an image"**
4. Upload from your computer
5. Image is automatically added!

---

## Troubleshooting

### "Error: Failed to load config.yml"
- Make sure you uploaded the updated config.yml to GitHub
- Check that it's in the `admin` folder
- Wait 1-2 minutes for Netlify to redeploy

### "Login with GitHub button doesn't work"
- Make sure you added the environment variables in Netlify
- Check that the callback URL in GitHub OAuth is: `https://api.netlify.com/auth/done`
- Try in an incognito window

### "Not authorized" error
- Make sure your GitHub account (Totesthegoats) has access to the repository
- Check that the repository name in config.yml is correct: `Totesthegoats/BehindTheCurtain`

### "Can't find Environment Variables in Netlify"
Different Netlify UI versions have it in different places:
- Try: **Site settings** → **Environment variables**
- Try: **Build & deploy** → **Environment**
- Try: **Site configuration** → **Environment variables**

---

## What Happens Now

Every time you publish content in the CMS:
1. ✅ Content is saved as a markdown file
2. ✅ Automatically committed to GitHub
3. ✅ Netlify auto-deploys your site (30 seconds)
4. ✅ Your site updates with new content!

---

## Benefits of GitHub Backend

✅ No deprecated technology (Netlify Identity)
✅ Login with your GitHub account
✅ Full version history in GitHub
✅ More secure and modern
✅ Works great with Netlify

---

## Need Help?

**Can't find Environment Variables in Netlify?**
Tell me what navigation options you see and I'll guide you.

**OAuth not working?**
Double-check:
- Client ID and Secret are correct
- Callback URL is exactly: `https://api.netlify.com/auth/done`
- Environment variables are saved in Netlify

**Still stuck?**
Let me know what error you're seeing and I'll help troubleshoot!

---

## Next Steps

1. ✅ Upload updated config.yml to GitHub (Step 1)
2. ✅ Create GitHub OAuth App (Step 2)
3. ✅ Add credentials to Netlify (Step 3)
4. ✅ Test your CMS! (Step 4)

Good luck! 🚀
