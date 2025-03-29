# Personal Homepage for Ji Zhou

This is a personal homepage template designed for academic professionals. The website features a modern, responsive design with sections for personal information, research publications, resume download, and call for papers.

## Features

- Responsive navigation bar
- Homepage with profile information
- Research section with journal and conference papers
- Resume download section
- Interactive Call for Papers section
- Mobile-friendly design

## Directory Structure

```
.
├── index.html          # Main HTML file
├── styles.css         # CSS styles
├── script.js          # JavaScript functionality
├── assets/           # Directory for images and documents
│   ├── profile.jpg   # Your profile picture
│   └── resume.pdf    # Your resume PDF
└── README.md         # This file
```

## Customization

### 1. Profile Information
Edit the `index.html` file to update your personal information in the HomePage section:
- Add your profile picture to `assets/profile.jpg`
- Update the brief introduction
- Add your contact information
- List your educational background
- Add your latest news

### 2. Research Publications
To add journal papers, use the `addJournalPaper` function in `script.js`:
```javascript
addJournalPaper(container, {
    title: "Paper Title",
    authors: "Authors",
    journal: "Journal Name",
    description: "Paper description",
    image: "path/to/paper/image.jpg"
});
```

To add conference papers, use the `addConferencePaper` function:
```javascript
addConferencePaper(container, {
    title: "Paper Title",
    authors: "Authors",
    conference: "Conference Name",
    description: "Paper description"
});
```

### 3. Resume
Place your resume PDF file in the `assets` directory as `resume.pdf`. The download link will automatically work.

### 4. Call for Papers
To add journals with call for papers, use the `addJournal` function:
```javascript
addJournal(container, {
    name: "Journal Name",
    papers: [
        {
            title: "Call for Papers Title",
            description: "Description of the call"
        }
    ]
});
```

## Deployment

1. Create a new repository on GitHub named `ji-zhou.github.io`
2. Push these files to your repository
3. Enable GitHub Pages in your repository settings
4. Your website will be available at `https://ji-zhou.github.io`

## Customization Tips

- The color scheme can be modified in the `:root` variables in `styles.css`
- Font styles can be changed by modifying the Google Fonts link in `index.html`
- The layout can be adjusted by modifying the CSS grid and flexbox properties
- Add your own images and documents to the `assets` directory

## Browser Support

The website is compatible with all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest) 
