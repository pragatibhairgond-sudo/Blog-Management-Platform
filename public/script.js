// Hardcoded blog data directly inside script.js
const blogs = [
  {
    id: 1,
    title: "Getting Started with JavaScript",
    author: "Aarti Kamble",
    description: "Learn the core basics of modern JavaScript, including DOM manipulation, ES6 features, and async operations."
  },
  {
    id: 2,
    title: "Building REST APIs with Express",
    author: "Tech Explorer",
    description: "A step-by-step guide on creating robust backend APIs using Express, middleware, and Node.js."
  },
  {
    id: 3,
    title: "Mastering Responsive Web Design",
    author: "Frontend Dev",
    description: "Discover essential CSS Grid, Flexbox, and media query techniques to build layout designs for all screen sizes."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  displayBlogs();
});

function displayBlogs() {
  // 1. Find the target container in HTML
  const blogContainer = document.getElementById('blog-list') || 
                        document.querySelector('.blog-grid') || 
                        document.querySelector('.horizontal-showcase') ||
                        document.querySelector('main');

  if (blogContainer) {
    // Create grid wrapper if rendering directly into main
    let listElement = document.getElementById('blog-list');
    if (!listElement) {
      listElement = document.createElement('div');
      listElement.id = 'blog-list';
      listElement.style.display = 'flex';
      listElement.style.gap = '20px';
      listElement.style.padding = '20px 0';
      listElement.style.overflowX = 'auto';
      blogContainer.appendChild(listElement);
    } else {
      listElement.innerHTML = '';
    }

    // 2. Render each article card
    blogs.forEach(blog => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.style.minWidth = '280px';
      card.style.border = '1px solid #334155';
      card.style.padding = '20px';
      card.style.borderRadius = '12px';
      card.style.background = 'rgba(30, 41, 59, 0.7)';

      card.innerHTML = `
        <h3 style="color: #38bdf8; margin-top: 0;">${blog.title}</h3>
        <p style="color: #94a3b8; font-size: 0.85em;">By <strong>${blog.author}</strong></p>
        <p style="color: #cbd5e1; font-size: 0.95em; line-height: 1.5;">${blog.description}</p>
      `;
      listElement.appendChild(card);
    });
  }

  // 3. Update the counter element
  const totalCountElem = document.getElementById('total-articles') || 
                         document.querySelector('.badge span');
  if (totalCountElem) {
    totalCountElem.textContent = blogs.length;
  }
}