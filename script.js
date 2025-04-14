// Load the JSON data
document.addEventListener('DOMContentLoaded', function() {
    showLoadingState();
    addLoadingAnimation();
    
    fetch('resources.json')
        .then(response => response.json())
        .then(data => {
            // Remove loading skeletons
            document.querySelectorAll('.skeleton').forEach(skeleton => {
                skeleton.remove();
            });
            
            displayVideos(data.videos);
            displayPapers(data.papers);
            displayRepos(data.repos);
            displayCourses(data.courses);
            displayBooks(data.books);
        })
        .catch(error => console.error('Error loading resources:', error));
});

// Display Videos
function displayVideos(videos) {
    const container = document.querySelector('#videos .resource-grid');
    
    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        card.innerHTML = `
            <div class="card-header">
                <h3>Video</h3>
            </div>
            <div class="card-body">
                <h4 class="card-title">${video.title}</h4>
                <p class="card-text">${video.why_relevant}</p>
            </div>
            <div class="card-footer">
                <a href="${video.link}" target="_blank" class="btn">Watch</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Display Research Papers
function displayPapers(papers) {
    const container = document.querySelector('#papers .resource-grid');
    
    papers.forEach(paper => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        card.innerHTML = `
            <div class="card-header">
                <h3>Paper</h3>
            </div>
            <div class="card-body">
                <h4 class="card-title">${paper.title}</h4>
                <p class="card-text">${paper.summary}</p>
                <span class="year-tag">${paper.year}</span>
            </div>
            <div class="card-footer">
                <a href="${paper.link}" target="_blank" class="btn">Read</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Display GitHub Repositories
function displayRepos(repos) {
    const container = document.querySelector('#repos .resource-grid');
    
    repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        card.innerHTML = `
            <div class="card-header">
                <h3>GitHub Repository</h3>
            </div>
            <div class="card-body">
                <h4 class="card-title">${repo.name}</h4>
                <p class="card-text">${repo.description}</p>
            </div>
            <div class="card-footer">
                <a href="${repo.link}" target="_blank" class="btn">View Repository</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Display Courses & Tutorials
function displayCourses(courses) {
    const container = document.querySelector('#courses .resource-grid');
    
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        card.innerHTML = `
            <div class="card-header">
                <h3>Course/Tutorial</h3>
            </div>
            <div class="card-body">
                <h4 class="card-title">${course.name}</h4>
                <p class="card-text">${course.focus}</p>
                <span class="platform-tag">${course.platform}</span>
            </div>
            <div class="card-footer">
                <a href="${course.link}" target="_blank" class="btn">Access Course</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Display Books
function displayBooks(books) {
    const container = document.querySelector('#books .resource-grid');
    
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        card.innerHTML = `
            <div class="card-header">
                <h3>Book</h3>
            </div>
            <div class="card-body">
                <h4 class="card-title">${book.title}</h4>
                <p class="card-text">${book.why_relevant}</p>
            </div>
            <div class="card-footer">
                <a href="${book.link}" target="_blank" class="btn">Access Book</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Add loading animation
function addLoadingAnimation() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.animation = `fadeIn 0.5s ease forwards ${index * 0.2}s`;
    });
}

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const offset = 100; // Adjust this value based on your header height

        const targetPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = targetPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Add active state to navigation items
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav a');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const offset = 150; // Adjust this value to change when the active state triggers
        
        if (rect.top <= offset && rect.bottom >= offset) {
            const targetId = `#${section.id}`;
            navItems.forEach(item => {
                if (item.getAttribute('href') === targetId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });
}

// Add scroll event listener for active state
window.addEventListener('scroll', updateActiveNavItem);

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe all resource cards
document.querySelectorAll('.resource-card').forEach(card => {
    observer.observe(card);
});

// Add loading state
function showLoadingState() {
    const containers = document.querySelectorAll('.resource-grid');
    containers.forEach(container => {
        for (let i = 0; i < 3; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'resource-card skeleton';
            skeleton.innerHTML = `
                <div class="card-header"></div>
                <div class="card-body">
                    <div style="height: 24px; margin-bottom: 15px;"></div>
                    <div style="height: 60px;"></div>
                </div>
                <div class="card-footer"></div>
            `;
            container.appendChild(skeleton);
        }
    });
}
