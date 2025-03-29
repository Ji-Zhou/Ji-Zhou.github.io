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
        title: "Multi-echelon sustainable reverse logistics network design with incentive mechanism for eco-packages",
        authors: "Ji Zhou, Senyan Yang, Hui Feng, Zexu An",
        journal: "Journal of Cleaner Production, 2023",
        description: "Research Project in My Bachelor Study",
        image: "assets/papers/paper1.jpg",
        boldWords: ["Ji Zhou"]
    },
    {
        title: "Attention-based 3DTCN-LSTM short-term network traffic prediction model considering multi-base station spatiotemporal coupling",
        authors: "Yuliang Zhan, Ji Zhou, Jiayi Zhang",
        journal: "Internation Journal of Web Engineering and Technology, 2022",
        description: "Research Project in My Bachelor Study",
        image: "assets/papers/paper2.jpg",
        boldWords: ["Ji Zhou"]
    },
    {
        title: "A Multi-Level Framework for Collaborative Vehicle Trajectory Planning in Unstructured Road Environments",
        authors: "Ji Zhou, Biao Xu, Yougang Bian, Hongmao Qin, Chen Wang, Nan Zheng",
        journal: "Automation in Construction, Under Review",
        description: "Research Project in My Doctoral Study",
        image: "assets/papers/paper3.jpg",
        boldWords: ["Ji Zhou"]
    },
    {
        title: "Smart Modular Parcel Lockers as a Mean for Last-Mile Delivery: An Optimization Model and Solution Algorithm for Parcels Allocation and Lockers Configuration",
        authors: "Ji Zhou, Senyan Yang, Chen Wang, Liang Zheng, Nan Zheng",
        journal: "Engineering Applications of Artificial Intelligence, Under Review",
        description: "Research Project in My Bachelor Study",
        image: "assets/papers/paper4.jpg",
        boldWords: ["Ji Zhou"]
    },
    {
        title: "Collaborative Trajectory Planning for Non-Holonomic Automated Mobile Robots via Distributed Multi-Agent Proximal Policy Optimization",
        authors: "Jingyi Yu, Ji Zhou",
        journal: "Applied Soft Computing, Under Review",
        description: "Research Project in My Bachelor Study",
        image: "assets/papers/paper5.jpg",
        boldWords: ["Ji Zhou"]
    },
    {
        title: "Autonomous Haulage System for Open-Pit Mining: A Bibliometric Analysis and Topic Modeling based Review",
        authors: "Ji Zhou, Nan Zheng",
        journal: "On-going",
        description: "Research Project in My Doctoral Study",
        image: "assets/papers/paper6.jpg",
        boldWords: ["Ji Zhou"]
    }


];


// Example conference papers
const conferencePapers = [
    {
        title: "A Novel Vehicle Scheduling Method utilizing Federate Reinforcement Learning for Unmanned Transportation in Controlled Areas",
        authors: "Australia, 2025.07",
        conference: "2025 Summer Meeting of the Traffic Flow Theory and Characteristics Committe, Symposium on Advancing Traffic Flow Theory for a Sustainable Future",
        description: "Oral Presentation"
    },
    {
        title: "Multi-echelon Sustainable Reverse Logistics Network Design with Incentive Mechanism for Eco-packages",
        authors: "Beijing, 2024.11",
        conference: "2024 China Logistics Academic Annual Conference",
        description: "Oral Presentation"
    },
    {
        title: "Multi-echelon Sustainable Reverse Logistics Network Design with Incentive Mechanism for Eco-packages",
        authors: "Nanjing, 2023.07",
        conference: "The 18th International Conference on Service Systems and Service Management",
        description: "Oral Presentation"
    },
    {
        title: "Multi-echelon Sustainable Reverse Logistics Network Design with Incentive Mechanism for Eco-packages",
        authors: "Shanghai, 2024.05",
        conference: "The 10th China Academic Conference on Low Carbon Development Management",
        description: "Oral Presentation"
    }
];

// Example journals with call for papers
const journals = [
    {
        name: "Transportation Research Part C: Emerging Technologies",
        papers: [
            {
                title: "Special Issue",
                description: "Foundation Models and Large Language Models in Urban Mobility. Deadline: October 31, 2025.",
                link: "https://www.journals.elsevier.com/transportation-research-part-c-emerging-technologies/call-for-papers"
            },
            {
                title: "Special Issue",
                description: "Innovations for operation and pricing of public mobility services. Deadline: December 31, 2025.",
                link: "https://www.journals.elsevier.com/transportation-research-part-c-emerging-technologies/call-for-papers"
            }
        ]
    },
    {
        name: "IEEE Transactions on Intelligent Transportation Systems",
        papers: [
            {
                title: "Special Issue",
                description: "Federated Learning and Digital Twins for Intelligent Transportation System. Deadline: May 31, 2025.",
                link: "https://ieee-itss.org/pub/t-its/special-issues/"
            }
        ]
    },
    {
        name: "IEEE Transactions on Automation Science and Engineering",
        papers: [
            {
                title: "Special Issue",
                description: "Machine Learning for Optimization in Automation. Deadline: April 30, 2025.",
                link: "https://www.ieee-ras.org/publications/t-ase/special-issues-t-ase"
            }
        ] // No current calls for papers
    }
];

// Function to initialize content
function initializeContent() {
    try {
        console.log("Initializing content...");
        
        // Add journal papers
        const journalContainer = document.querySelector('.journal-papers');
        if (!journalContainer) {
            console.error("Journal container not found!");
        } else {
            console.log("Found journal container, adding papers...");
            console.log("Journal papers to add:", journalPapers.length);
            journalPapers.forEach((paper, index) => {
                try {
                    addJournalPaper(journalContainer, paper);
                    console.log(`Added journal paper ${index+1}/${journalPapers.length}`);
                } catch (err) {
                    console.error(`Error adding journal paper ${index+1}:`, err);
                }
            });
        }

        // Add conference papers
        const conferenceContainer = document.querySelector('.conference-papers');
        if (!conferenceContainer) {
            console.error("Conference container not found!");
        } else {
            console.log("Found conference container, adding papers...");
            console.log("Conference papers to add:", conferencePapers.length);
            conferencePapers.forEach((paper, index) => {
                try {
                    addConferencePaper(conferenceContainer, paper);
                    console.log(`Added conference paper ${index+1}/${conferencePapers.length}`);
                } catch (err) {
                    console.error(`Error adding conference paper ${index+1}:`, err);
                }
            });
        }

        // Add journals with call for papers
        const journalsContainer = document.querySelector('.journals-list');
        if (!journalsContainer) {
            console.error("Journals container not found!");
        } else {
            console.log("Found journals container, adding journals...");
            console.log("Journals to add:", journals.length);
            journals.forEach((journal, index) => {
                try {
                    addJournal(journalsContainer, journal);
                    console.log(`Added journal ${index+1}/${journals.length}`);
                } catch (err) {
                    console.error(`Error adding journal ${index+1}:`, err);
                }
            });
        }
        
        console.log("Content initialization complete!");
    } catch (error) {
        console.error("Error initializing content:", error);
    }
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
