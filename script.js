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
                    details.style.display = details.style.display === 'none' ? 'block' : 'none';
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
});

// Function to add a journal paper
function addJournalPaper(container, paper) {
    const paperElement = document.createElement('div');
    paperElement.className = 'paper-item';
    paperElement.innerHTML = `
        <img src="${paper.image}" alt="${paper.title}" class="paper-image">
        <div class="paper-content">
            <h4>${paper.title}</h4>
            <p>${paper.authors}</p>
            <p>${paper.journal}</p>
            <p>${paper.description}</p>
        </div>
    `;
    container.appendChild(paperElement);
}

// Function to add a conference paper
function addConferencePaper(container, paper) {
    const paperElement = document.createElement('div');
    paperElement.className = 'paper-item';
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
    journalElement.innerHTML = `
        <div class="journal-header">
            <h4>${journal.name}</h4>
            <span class="paper-count">${journal.papers.length}</span>
        </div>
        ${journal.papers.length > 0 ? `
            <div class="journal-details" style="display: none;">
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
