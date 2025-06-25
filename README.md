# 🌐 Scalable Static Website with S3 + Cloudflare + GitHub Actions

This project demonstrates how to build, deploy, and securely serve a **static website** using **AWS S3**, **GitHub Actions**, and **Cloudflare Workers** — all using **free-tier services**.

<br>

## ✅ Objective

> 🚀 Host a static website on AWS S3 with:
- 🔁 Continuous Deployment via GitHub Actions
- 🌍 Global HTTPS access via Cloudflare Workers
- 🔒 SSL without any domain purchase
- 📦 Versioning and Cache-Control

<br>

## 🧰 Tech Stack

| Tool              | Purpose                          |
|------------------|----------------------------------|
| **AWS S3**        | Static site hosting              |
| **Cloudflare Worker** | HTTPS proxy + CDN              |
| **GitHub Actions**| CI/CD pipeline to auto-deploy    |
| **nip.io**        | Free dynamic domain (optional)   |
| **HTML/CSS/JS**   | Static website                   |
| **Bash + YAML**   | Deployment scripting             |

<br>

## 🌐 Live Demo

🔗 [View the Website (HTTPS via Cloudflare)](https://mks.mkssingh8600.workers.dev/)

🔗 [Original S3 Site (HTTP)](http://devops-project-scalable-static-site.s3-website.ap-south-1.amazonaws.com)

<br>

## 📂 Folder Structure

.
├── index.html
├── style.css
├── script.js
└── .github/workflows/deploy.yml


> No build tools like React or Vue used – this is a pure static HTML/CSS/JS site.

<br>

## ⚙️ GitHub Actions CI/CD

- Triggered on `push` to the `main` branch
- Automatically uploads files to the S3 bucket:

- Uses the following cache control headers:


--cache-control "no-cache, no-store, must-revalidate" ```

name: 🚀 Deploy Static Website to S3

on:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: 🧰 Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-south-1

      - name: 🚀 Sync to S3
        run: |
          aws s3 sync . s3://devops-project-scalable-static-site \
            --delete \
            --cache-control "no-cache, no-store, must-revalidate" \
            --exclude ".git/*" \
            --exclude ".github/*" \
            --exclude "README.md"


☁️ Cloudflare Worker (HTTPS Proxy)
A free Cloudflare Worker was created to proxy the S3 website

It provides:

HTTPS (SSL)

Global CDN caching

No domain purchase needed

js
Copy
Edit
export default {
  async fetch(request) {
    const targetUrl = 'http://devops-project-scalable-static-site.s3-website.ap-south-1.amazonaws.com';
    const url = new URL(request.url);
    const path = url.pathname;
    const response = await fetch(`${targetUrl}${path}`);
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type'),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
}
📸 Screenshots
Description	Screenshot
✅ Live Site in Browser	
<img width="1440" alt="Screenshot 2025-06-25 at 12 52 13 PM" src="https://github.com/user-attachments/assets/53427934-e570-41e0-88ed-d7a4481f6eb5" />

✅ GitHub Actions Deploy Log	
<img width="1440" alt="Screenshot 20<img width="1440" alt="Screenshot 2025-06-25 at 12 52 40 PM" src="https://github.com/user-attachments/assets/44340611-8780-44e4-8c50-e01ce09cfb4a" />
25-06-25 at 12 52 33 PM" src="https://github.com/user-attachments/assets/2dc9e033-738f-42ab-a01d-5f1d866c54d6" />

✅ S3 Bucket File View	
<img width="1440" alt="Screenshot 2025-06-25 at 12 52 52 PM" src="https://github.com/user-attachments/assets/51d80ff7-85a9-4fa4-8713-cfa8a5566244" />



🧠 Lessons Learned
Hosting scalable static sites without paid domains is possible

S3 + GitHub Actions = Simple and powerful CI/CD

Cloudflare Workers can be used to proxy any public site via HTTPS

🚀 Future Improvements
Add contact form (using AWS SES or Netlify Forms)

Add analytics tracking

Convert to React + Vite with build step

Add dark mode toggle





