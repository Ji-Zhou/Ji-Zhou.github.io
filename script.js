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

    // Handle Call for Papers expansion
    const journalItems = document.querySelectorAll('.journal-item');
    journalItems.forEach(item => {
        const count = parseInt(item.querySelector('.paper-count').textContent);
        if (count > 0) {
            item.addEventListener('click', function() {
                const details = this.querySelector('.journal-details');
                if (details) {
                    // Toggle the expanded class
                    this.classList.toggle('expanded');
                    
                    // Close other expanded items
                    journalItems.forEach(otherItem => {
                        if (otherItem !== this && otherItem.classList.contains('expanded')) {
                            otherItem.classList.remove('expanded');
                        }
                    });
                }
            });
        }
    });

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
});

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
    // Add expandable class if there are papers
    journalElement.className = `journal-item${journal.papers.length > 0 ? ' expandable' : ''}`;
    journalElement.innerHTML = `
        <div class="journal-header">
            <h4>${journal.name}</h4>
            <span class="paper-count">${journal.papers.length}</span>
        </div>
        ${journal.papers.length > 0 ? `
            <div class="journal-details">
                ${journal.papers.map(paper => `
                    <div class="paper-info">
                        <h5>${paper.title}</h5>
                        <p>${paper.description}</p>
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;
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
                description: "Call for papers on the application of artificial intelligence in transportation systems. Deadline: December 31, 2024."
            },
            {
                title: "Special Issue on Autonomous Vehicles",
                description: "Call for papers on autonomous vehicle technologies and their impact on transportation. Deadline: March 15, 2025."
            }
        ]
    },
    {
        name: "IEEE Transactions on Intelligent Transportation Systems",
        papers: [
            {
                title: "Special Issue on Smart Cities",
                description: "Call for papers on smart city technologies and their implementation. Deadline: January 31, 2025."
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
