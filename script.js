// Load the JSON data
document.addEventListener('DOMContentLoaded', function() {
    fetch('resources.json')
        .then(response => response.json())
        .then(data => {
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
                <h3>YouTube Video</h3>
            </div>
            <div class="card-body">
                <h4 class="card-title">${video.title}</h4>
                <p class="card-text">${video.why_relevant}</p>
            </div>
            <div class="card-footer">
                <a href="${video.link}" target="_blank" class="btn">Watch Video</a>
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
                <h3>Research Paper</h3>
            </div>
            <div class="card-body">
                <h4 class="card-title">${paper.title}</h4>
                <p class="card-text">${paper.summary}</p>
                <span class="year-tag">${paper.year}</span>
            </div>
            <div class="card-footer">
                <a href="${paper.link}" target="_blank" class="btn">Read Paper</a>
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
