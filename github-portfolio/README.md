# GitHub Portfolio for rootlake/io

A modern, mobile-first landing page for your GitHub projects.

## Features

- Automatic GitHub repository fetching from rootlake/io
- Project cards with:
  - Name and description
  - Live demo links
  - QR codes for mobile testing
  - Tech stack information
  - Last updated date
- Dark/light mode toggle
- Project filtering/search
- Mobile-optimized layout
- Automatic deployment via GitHub Actions

## Setup

1. Clone this repository
2. Create a `.env` file in the root directory with:
   ```
   VITE_GITHUB_TOKEN=your_github_token
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## GitHub Token

Create a GitHub Personal Access Token with the following permissions:
- `repo` (Full control of private repositories)
- `read:user` (Read user profile data)

## Deployment

The site will automatically deploy to GitHub Pages when you push to the `main` branch. Make sure to:

1. Enable GitHub Pages in your repository settings
2. Set the source to the `gh-pages` branch
3. Add the following secret to your repository:
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token

## Development

- Built with Vite
- Uses GitHub GraphQL API
- Vanilla JavaScript
- Modern CSS (Grid/Flexbox) 