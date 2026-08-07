const blogs = [
  {
    id: 1,
    title: "Getting Started with Modern JavaScript",
    category: "#AI_ML",
    description: "Learn the essential fundamentals of modern JavaScript, including arrow functions, DOM manipulation, and..."
  },
  {
    id: 2,
    title: "Building RESTful APIs with Node.js & Express",
    category: "#Cloud_DevOps",
    description: "A comprehensive beginner-friendly guide to setting up route handlers, middleware, and handling JSON data i..."
  },
  {
    id: 3,
    title: "Deploying Web Applications to GitHub Pages",
    category: "#Web_Dev",
    description: "Discover how to configure repository settings, resolve missing static assets, and deploy responsive web proj..."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  renderBlogs();
});

function renderBlogs() {
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
        <span class="tag-pill">${blog.category}</span>
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
  const index = blogs.findIndex(item => item.id === id);
  if (index !== -1) {
    blogs.splice(index, 1);
    renderBlogs();
  }
}