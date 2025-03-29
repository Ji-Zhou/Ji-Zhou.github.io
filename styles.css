/* Global Styles */
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --text-color: #333;
    --light-gray: #f5f6fa;
    --white: #ffffff;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation Bar */
.navbar {
    background-color: var(--primary-color);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.nav-brand {
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 700;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: var(--white);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-links a:hover,
.nav-links a.active {
    color: var(--secondary-color);
}

/* Main Content */
main {
    margin-top: 80px;
}

.section {
    padding: 4rem 0;
}

.section:nth-child(even) {
    background-color: var(--light-gray);
}

h1, h2, h3, h4 {
    color: var(--primary-color);
    margin-bottom: 0.8rem;
}

/* HomePage Section */
.profile-section {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    margin-top: 2rem;
}

.profile-image img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.profile-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* Research Section */
.publications {
    margin-top: 2rem;
}

.journal-papers, .conference-papers {
    margin-top: 2rem;
}

.paper-item {
    display: grid;
    grid-template-columns: minmax(200px, 300px) 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.paper-item.conference-paper {
    grid-template-columns: 1fr;
}

.paper-image {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.paper-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
}

.paper-content h4 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.paper-content p {
    color: #666;
    line-height: 1.5;
}

/* Resume Section */
.resume-download {
    text-align: center;
    padding: 2rem;
}

.download-btn {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: var(--secondary-color);
    color: var(--white);
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.2s ease;
    position: relative;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.download-btn:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.download-btn:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* Style for the download button when disabled */
.download-btn.unavailable {
    background-color: #95a5a6;
    cursor: not-allowed;
    opacity: 0.8;
}

/* Call for Papers Section */
.journals-list {
    display: grid;
    gap: 1rem;
}

.journal-item {
    padding: 1.5rem;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
}

.journal-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.journal-item.expanded {
    background-color: #e3f2fd; /* Light blue background */
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border-left: 4px solid var(--secondary-color);
    transform: translateY(-2px);
}

.journal-item.expandable {
    position: relative;
    border-left: 4px solid transparent;
    transition: all 0.3s ease;
}

.journal-item.expandable:hover {
    border-left-color: var(--secondary-color);
}

/* Use a cleaner plus/minus indicator */
.journal-item.expandable .paper-count {
    position: relative;
    padding-right: 28px;
}

.journal-item.expandable .paper-count::after {
    content: "+";
    position: absolute;
    right: 8px;
    font-weight: bold;
    font-size: 18px;
    transition: all 0.3s ease;
    color: var(--white);
}

.journal-item.expanded .paper-count::after {
    content: "−"; /* Using minus sign instead of transform rotation */
    transform: translateY(-2px);
}

.journal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.journal-header h4 {
    color: var(--primary-color);
    margin: 0;
    transition: color 0.3s ease;
}

.journal-item:hover .journal-header h4 {
    color: var(--secondary-color);
}

.journal-header::after {
    display: none;
}

.journal-item:hover .journal-header::after {
    display: none;
}

.journal-item.expanded .journal-header::after {
    display: none;
}

.paper-count {
    background-color: var(--secondary-color);
    color: var(--white);
    padding: 0.2rem 0.8rem;
    border-radius: 15px;
    font-size: 0.9rem;
    font-weight: 500;
}

.journal-details {
    margin-top: 1rem;
    padding: 1rem;
    border-top: 1px solid #ddd;
    background-color: #f0f4f8;
    border-radius: 0 0 8px 8px;
    display: none;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
}

.journal-item.expanded .journal-details {
    display: block;
    animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.paper-info {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: var(--white);
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border-left: 3px solid var(--secondary-color);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.paper-info:last-child {
    margin-bottom: 0;
}

.paper-info:hover {
    transform: translateX(5px);
    box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}

.paper-info h5 {
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
}

.paper-info p {
    color: #666;
    line-height: 1.5;
}

/* Footer */
footer {
    background-color: var(--primary-color);
    color: var(--white);
    padding: 2rem 0;
    text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
    .profile-section {
        grid-template-columns: 1fr;
    }

    .paper-item {
        grid-template-columns: 1fr;
    }

    .paper-image {
        max-width: 300px;
        margin: 0 auto 1rem;
    }

    .nav-container {
        flex-direction: column;
        gap: 1rem;
    }

    .nav-links {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }
}

.paper-link {
    margin-top: 12px;
}

.paper-link-btn {
    display: inline-block;
    padding: 6px 12px;
    background-color: var(--secondary-color);
    color: var(--white);
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.paper-link-btn:hover {
    background-color: #2980b9;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.paper-link-btn:active {
    transform: translateY(0);
} 
