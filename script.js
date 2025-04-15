// Prevent zoom on double tap
document.addEventListener(
  "dblclick",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);

// Fix initial viewport scaling
window.addEventListener("load", function () {
  // Reset viewport zoom level
  const viewport = document.querySelector('meta[name="viewport"]');
  viewport.setAttribute(
    "content",
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  );

  // Force redraw
  document.body.style.display = "none";
  document.body.offsetHeight;
  document.body.style.display = "";
});

// Update the DOMContentLoaded event listener at the beginning of the file
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Load and display content
    const response = await fetch("resources.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Display content sections
    displayVideos(data.videos);
    displayPapers(data.papers);
    displayRepos(data.repos);
    displayCourses(data.courses);
    displayBooks(data.books);

    // Make content visible (redundant if CSS handles it, but safe)
    document.querySelectorAll("section").forEach((section) => {
      section.style.display = "block";
      section.style.visibility = "visible";
      section.style.opacity = "1";
    });
    const main = document.querySelector("main");
    main.style.display = "block";
    main.style.visibility = "visible";
    main.style.opacity = "1";

    // Initialize navigation AFTER content is loaded and displayed
    initializeNavigation();

    // Force layout recalc might be needed AFTER dynamic content
    document.body.style.display = "none";
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = "";
  } catch (error) {
    console.error("Error loading or processing content:", error);
    // Display error message to user?
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.innerHTML =
        '<p style="color: red; text-align: center; padding: 20px;">Failed to load resources. Please check the console for errors.</p>';
      mainElement.style.display = "block";
      mainElement.style.visibility = "visible";
      mainElement.style.opacity = "1";
    }
  }
});

// Display Videos
function displayVideos(videos) {
  const container = document.querySelector("#videos .resource-grid");

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.className = "resource-card";

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
  const container = document.querySelector("#papers .resource-grid");

  papers.forEach((paper) => {
    const card = document.createElement("div");
    card.className = "resource-card";

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
  const container = document.querySelector("#repos .resource-grid");

  repos.forEach((repo) => {
    const card = document.createElement("div");
    card.className = "resource-card";

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
  const container = document.querySelector("#courses .resource-grid");

  courses.forEach((course) => {
    const card = document.createElement("div");
    card.className = "resource-card";

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
  const container = document.querySelector("#books .resource-grid");

  books.forEach((book) => {
    const card = document.createElement("div");
    card.className = "resource-card";

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
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.animation = `fadeIn 0.5s ease forwards ${index * 0.2}s`;
  });
}

// Remove the existing scroll code and replace it with this:
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  // No need to call updateScrollMargins here if set in CSS
});

// Simplified Navigation Initialization
function initializeNavigation() {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href"); // e.g., "#videos"
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Let the browser handle the scroll with CSS offsets
        targetSection.scrollIntoView({ behavior: "smooth" });

        // Update active state immediately on click
        navLinks.forEach((lnk) => lnk.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Initial active state update on load
  updateActiveNavItemOnScroll();
}

// Update active state on scroll (slightly adjusted offset logic)
function updateActiveNavItemOnScroll() {
  const navHeight = document.querySelector("nav")?.offsetHeight || 80; // Estimate nav height
  // Adjust offset: consider nav height and a small buffer
  const scrollPosition = window.scrollY + navHeight + 20;

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const id = section.getAttribute("id");
    const navLink = document.querySelector(`nav a[href="#${id}"]`);

    if (navLink) {
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // Check if another link is already active (prefer lower sections if overlapping)
        const currentActive = document.querySelector("nav a.active");
        if (currentActive && currentActive !== navLink) {
          const currentActiveSection = document.querySelector(
            currentActive.getAttribute("href")
          );
          if (
            currentActiveSection &&
            currentActiveSection.offsetTop < sectionTop
          ) {
            // The current active section is above this one, keep it active
          } else {
            currentActive.classList.remove("active");
            navLink.classList.add("active");
          }
        } else if (!currentActive) {
          navLink.classList.add("active");
        }
      } else {
        navLink.classList.remove("active");
      }
    }
  });

  // Ensure at least one item is active if near top or bottom
  const firstLink = document.querySelector("nav a");
  const lastLink =
    document.querySelectorAll("nav a")[
      document.querySelectorAll("nav a").length - 1
    ];
  if (!document.querySelector("nav a.active")) {
    if (window.scrollY < 100 && firstLink) {
      // Near top
      firstLink.classList.add("active");
    } else if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      lastLink
    ) {
      // Near bottom
      lastLink.classList.add("active");
    }
  }
}

// Add scroll event listener for active state
window.addEventListener("scroll", updateActiveNavItemOnScroll);

// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Observe all resource cards
document.querySelectorAll(".resource-card").forEach((card) => {
  observer.observe(card);
});

// Add loading state
function showLoadingState() {
  const containers = document.querySelectorAll(".resource-grid");
  containers.forEach((container) => {
    for (let i = 0; i < 3; i++) {
      const skeleton = document.createElement("div");
      skeleton.className = "resource-card skeleton";
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

// Ensure content is visible after loading
document.addEventListener("DOMContentLoaded", function () {
  // Force layout recalculation
  document.body.style.display = "none";
  document.body.offsetHeight;
  document.body.style.display = "";

  // Remove any loading states
  document.querySelectorAll(".skeleton").forEach((skeleton) => {
    skeleton.remove();
  });

  // Make sure all sections are visible
  document.querySelectorAll("section").forEach((section) => {
    section.style.visibility = "visible";
    section.style.opacity = "1";
  });
});
