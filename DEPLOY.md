# How to Deploy to Vercel

Since this is a Next.js application, **Vercel** is the best place to host it.

## Prerequisites
1. A [GitHub](https://github.com/) account.
2. A [Vercel](https://vercel.com/) account (you can sign up using GitHub).

## Step 1: Push your code to GitHub
You need to get your code from your simple local folder onto GitHub.

1. **Initialize Git** (if you haven't already):
   Open your terminal (Stop the server with `Ctrl+C` if needed) and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit, Hindi Typing Master"
   ```

2. **Create a Repository on GitHub**:
   - Go to GitHub.com and create a **New Repository**.
   - Name it `hindi-typing-master`.
   - **Do not** add a README or .gitignore (you already have them).

3. **Link and Push**:
   - Copy the commands shown by GitHub under "…or push an existing repository from the command line". They look like this:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/hindi-typing-master.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy on Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. You should see your `hindi-typing-master` repository in the list (Import from GitHub). Click **Import**.
4. **Configure Project**:
   - Framework Preset: **Next.js** (detected automatically).
   - Root Directory: `./` (default).
   - Build Command: `npm run build` (default).
5. Click **Deploy**.

## Step 3: Success
Vercel will build your site and give you a URL (e.g., `hindi-typing-master.vercel.app`).

---

## FAQ

**Q: Can I edit on Vercel?**
A: **No.** Vercel is for *hosting*. You edit your code on your computer, save it, and push it to GitHub (`git add .`, `git commit`, `git push`). Vercel detects the change and automatically updates your website within minutes.

**Q: Is it free?**
A: Yes, for personal projects (Hobby Tier).
