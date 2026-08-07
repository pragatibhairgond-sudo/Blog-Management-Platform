const defaultArticles = [
  {
    id: 1,
    title: "Getting Started with Modern JavaScript",
    category: "#AI_ML",
    description: "Learn the essential fundamentals of modern JavaScript, including arrow functions, DOM manipulation, and modern ES6 features."
  },
  {
    id: 2,
    title: "Building RESTful APIs with Node.js & Express",
    category: "#Cloud_DevOps",
    description: "A comprehensive beginner-friendly guide to setting up route handlers, middleware, and handling JSON data in Express."
  },
  {
    id: 3,
    title: "Deploying Web Applications to GitHub Pages",
    category: "#Web_Dev",
    description: "Discover how to configure repository settings, resolve missing static assets, and deploy responsive web projects seamlessly."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  loadAndRenderBlogs();
});

function loadAndRenderBlogs() {
  // Read saved blogs from localStorage
  let savedBlogs = localStorage.getItem("blogs_data");

  if (!savedBlogs || JSON.parse(savedBlogs).length === 0) {
    // Save defaults if empty
    localStorage.setItem("blogs_data", JSON.stringify(defaultArticles));
    savedBlogs = JSON.stringify(defaultArticles);
  }

  const blogs = JSON.parse(savedBlogs);
  renderBlogs(blogs);
}

function renderBlogs(blogs) {
  const container = document.getElementById('blog-list');
  const countElem = document.getElementById('total-articles');

  if (countElem) {
    countElem.textContent = blogs.length;
  }

  if (!container) return;

  container.innerHTML = ''; // Clear container

  blogs.forEach(blog => {
    const card = document.createElement('div');
    card.className = 'showcase-card';
    card.innerHTML = `
      <div class="card-header">
        <span class="tag-pill">${blog.category || '#Dev'}</span>
        <div class="card-actions">
          <button class="btn-edit">✏️ Edit</button>
          <button class="btn-delete" onclick="deleteArticle(${blog.id})">🗑️ Delete</button>
        </div>
      </div>
      <h3 class="card-title">${blog.title}</h3>
      <p class="card-desc">${blog.description}</p>
    `;
    container.appendChild(card);
  });
}

function deleteArticle(id) {
  let blogs = JSON.parse(localStorage.getItem("blogs_data")) || defaultArticles;
  blogs = blogs.filter(item => item.id !== id);
  localStorage.setItem("blogs_data", JSON.stringify(blogs));
  renderBlogs(blogs);
}