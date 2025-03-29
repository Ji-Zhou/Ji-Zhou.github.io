// Navigation active state
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation active state
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');

    function setActiveNavLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Initialize content
    initializeContent();

    // After content is initialized, attach event listeners to journal items
    attachJournalEvents();
    
    // Setup resume download with verification
    setupResumeDownload();
});

// Function to attach event listeners to journal items
function attachJournalEvents() {
    // No need to manually attach events anymore as they're directly added in the addJournal function
    console.log('Journal events are handled directly in the addJournal function');
}

// Function to toggle journal expansion
function toggleJournalExpansion(event) {
    console.log('Journal clicked:', this);
    
    // Toggle the expanded class
    this.classList.toggle('expanded');
    
    // Close other expanded items
    const allJournals = document.querySelectorAll('.journal-item.expandable');
    allJournals.forEach(journal => {
        if (journal !== this && journal.classList.contains('expanded')) {
            journal.classList.remove('expanded');
        }
    });
    
    // Prevent event from bubbling up
    event.stopPropagation();
}

// Function to add a journal paper
function addJournalPaper(container, paper) {
    // Process description to make specific words bold
    let processedDescription = paper.description;
    
    // If boldWords array is provided in the paper object, make those words bold
    if (paper.boldWords && Array.isArray(paper.boldWords)) {
        paper.boldWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'g');
            processedDescription = processedDescription.replace(regex, `<strong>${word}</strong>`);
        });
    }
    
    const paperElement = document.createElement('div');
    paperElement.className = 'paper-item';
    paperElement.innerHTML = `
        <img src="${paper.image}" alt="${paper.title}" class="paper-image">
        <div class="paper-content">
            <h4>${paper.title}</h4>
            <p>${paper.authors}</p>
            <p>${paper.journal}</p>
            <p>${processedDescription}</p>
        </div>
    `;
    container.appendChild(paperElement);
}

// Function to add a conference paper
function addConferencePaper(container, paper) {
    const paperElement = document.createElement('div');
    paperElement.className = 'paper-item conference-paper';
    paperElement.innerHTML = `
        <div class="paper-content">
            <h4>${paper.title}</h4>
            <p>${paper.authors}</p>
            <p>${paper.conference}</p>
            <p>${paper.description}</p>
        </div>
    `;
    container.appendChild(paperElement);
}

// Function to add a journal with call for papers
function addJournal(container, journal) {
    const journalElement = document.createElement('div');
    journalElement.className = 'journal-item';
    
    // Add journal header
    const headerElement = document.createElement('div');
    headerElement.className = 'journal-header';
    
    // Add journal name
    const nameElement = document.createElement('h4');
    nameElement.textContent = journal.name;
    headerElement.appendChild(nameElement);
    
    // Add paper count
    const countElement = document.createElement('span');
    countElement.className = 'paper-count';
    countElement.textContent = journal.papers.length;
    headerElement.appendChild(countElement);
    
    // Add header to journal element
    journalElement.appendChild(headerElement);
    
    // If journal has papers, add details section and button
    if (journal.papers.length > 0) {
        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'toggle-details-btn';
        toggleButton.textContent = 'Show Details';
        toggleButton.style.marginTop = '10px';
        toggleButton.style.padding = '5px 10px';
        toggleButton.style.backgroundColor = 'var(--secondary-color)';
        toggleButton.style.color = '#fff';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '4px';
        toggleButton.style.cursor = 'pointer';
        journalElement.appendChild(toggleButton);
        
        // Create details container
        const detailsElement = document.createElement('div');
        detailsElement.className = 'journal-details';
        detailsElement.style.display = 'none'; // Hidden by default
        
        // Add paper info
        journal.papers.forEach(paper => {
            const paperInfoElement = document.createElement('div');
            paperInfoElement.className = 'paper-info';
            
            const titleElement = document.createElement('h5');
            titleElement.textContent = paper.title;
            paperInfoElement.appendChild(titleElement);
            
            const descElement = document.createElement('p');
            descElement.textContent = paper.description;
            paperInfoElement.appendChild(descElement);
            
            // Add link if available
            if (paper.link) {
                const linkContainer = document.createElement('div');
                linkContainer.className = 'paper-link';
                linkContainer.style.marginTop = '10px';
                
                const linkElement = document.createElement('a');
                linkElement.href = paper.link;
                linkElement.target = "_blank";
                linkElement.rel = "noopener noreferrer";
                linkElement.className = 'paper-link-btn';
                linkElement.textContent = 'Visit Call for Papers';
                
                linkContainer.appendChild(linkElement);
                paperInfoElement.appendChild(linkContainer);
            }
            
            detailsElement.appendChild(paperInfoElement);
        });
        
        journalElement.appendChild(detailsElement);
        
        // Add click handler to the button
        toggleButton.addEventListener('click', function() {
            if (detailsElement.style.display === 'none') {
                detailsElement.style.display = 'block';
                toggleButton.textContent = 'Hide Details';
                journalElement.style.backgroundColor = '#e3f2fd';
                journalElement.style.borderLeft = '4px solid var(--secondary-color)';
            } else {
                detailsElement.style.display = 'none';
                toggleButton.textContent = 'Show Details';
                journalElement.style.backgroundColor = '';
                journalElement.style.borderLeft = '';
            }
        });
    }
    
    container.appendChild(journalElement);
}

// Example journal papers
const journalPapers = [
    {
        title: "A Novel Approach to Autonomous Vehicle Navigation",
        authors: "Zhou, J., Zheng, N., & Smith, J.",
        journal: "Transportation Research Part C: Emerging Technologies",
        description: "This paper presents a novel approach to autonomous vehicle navigation using deep learning techniques.",
        image: "assets/papers/paper1.jpg"
    },
    {
        title: "Machine Learning in Traffic Flow Prediction",
        authors: "Zhou, J., & Zheng, N.",
        journal: "IEEE Transactions on Intelligent Transportation Systems",
        description: "An innovative method for traffic flow prediction using machine learning algorithms.",
        image: "assets/papers/paper2.jpg",
        boldWords: ["machine learning", "traffic flow"]
    }
];

// Example conference papers
const conferencePapers = [
    {
        title: "Real-time Traffic Signal Optimization",
        authors: "Zhou, J., Zheng, N., & Johnson, R.",
        conference: "IEEE International Conference on Intelligent Transportation Systems (ITSC)",
        description: "A new framework for real-time traffic signal optimization in urban areas."
    },
    {
        title: "Deep Learning for Traffic Flow Analysis",
        authors: "Zhou, J., & Zheng, N.",
        conference: "Transportation Research Board Annual Meeting",
        description: "Application of deep learning techniques in traffic flow analysis and prediction."
    }
];

// Example journals with call for papers
const journals = [
    {
        name: "Transportation Research Part C: Emerging Technologies",
        papers: [
            {
                title: "Special Issue on AI in Transportation",
                description: "Call for papers on the application of artificial intelligence in transportation systems. Deadline: December 31, 2024.",
                link: "https://www.journals.elsevier.com/transportation-research-part-c-emerging-technologies/call-for-papers"
            },
            {
                title: "Special Issue on Autonomous Vehicles",
                description: "Call for papers on autonomous vehicle technologies and their impact on transportation. Deadline: March 15, 2025.",
                link: "https://www.journals.elsevier.com/transportation-research-part-c-emerging-technologies/call-for-papers/autonomous-vehicles"
            }
        ]
    },
    {
        name: "IEEE Transactions on Intelligent Transportation Systems",
        papers: [
            {
                title: "Special Issue on Smart Cities",
                description: "Call for papers on smart city technologies and their implementation. Deadline: January 31, 2025.",
                link: "https://ieee-itss.org/publication/transactions/calls-for-papers/"
            }
        ]
    },
    {
        name: "Transportation Research Part B: Methodological",
        papers: [] // No current calls for papers
    }
];

// Function to initialize content
function initializeContent() {
    // Add journal papers
    const journalContainer = document.querySelector('.journal-papers');
    journalPapers.forEach(paper => {
        addJournalPaper(journalContainer, paper);
    });

    // Add conference papers
    const conferenceContainer = document.querySelector('.conference-papers');
    conferencePapers.forEach(paper => {
        addConferencePaper(conferenceContainer, paper);
    });

    // Add journals with call for papers
    const journalsContainer = document.querySelector('.journals-list');
    journals.forEach(journal => {
        addJournal(journalsContainer, journal);
    });
}

// Function to check if resume file exists and setup resume link
function setupResumeDownload() {
    const resumeLink = document.querySelector('.download-btn');
    if (!resumeLink) return;
    
    // Store the original link
    const originalHref = resumeLink.getAttribute('href');
    
    // Show loading state initially
    resumeLink.textContent = 'Checking Resume...';
    
    // Check if file exists when page loads
    fetch(originalHref, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                // File exists
                resumeLink.textContent = 'Download Resume (PDF)';
                
                // Add click handler for download
                resumeLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = originalHref;
                });
            } else {
                // File doesn't exist
                resumeLink.textContent = 'Resume Not Available';
                resumeLink.classList.add('unavailable');
                
                // Add click handler to show message
                resumeLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('The resume PDF has not been uploaded yet. Please contact the author to request the resume.');
                });
            }
        })
        .catch(error => {
            console.error('Error checking resume file:', error);
            resumeLink.textContent = 'Resume Not Available';
            resumeLink.classList.add('unavailable');
            
            // Add click handler to show message
            resumeLink.addEventListener('click', function(e) {
                e.preventDefault();
                alert('The resume PDF has not been uploaded yet. Please contact the author to request the resume.');
            });
        });
} 
