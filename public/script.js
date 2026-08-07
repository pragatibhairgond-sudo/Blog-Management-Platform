document.addEventListener("DOMContentLoaded", () => {
  fetchBlogs();
});

async function fetchBlogs() {
  let blogs = [];
  
  // Array of potential path locations for GitHub Pages deployment
  const pathsToTry = ['./blogs.json', 'blogs.json', './public/blogs.json', 'public/blogs.json'];

  for (const path of pathsToTry) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        blogs = await response.json();
        console.log(`Successfully fetched blogs from: ${path}`);
        break; // Stop loop once file is found
      }
    } catch (e) {
      // Continue checking next path
    }
  }

  // Fallback if fetch fails entirely on static host
  if (!blogs || blogs.length === 0) {
    blogs = [
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
  }

  renderBlogs(blogs);
}

function renderBlogs(blogs) {
  const container = document.getElementById('blog-list') || 
                    document.querySelector('.horizontal-showcase') || 
                    document.querySelector('.blog-grid');
                    
  const countElem = document.getElementById('total-articles') || 
                     document.querySelector('.badge span');

  if (countElem) {
    countElem.textContent = blogs.length;
  }

  if (!container) return;

  container.innerHTML = ''; // Clear existing contents

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
  const container = document.getElementById('blog-list') || document.querySelector('.horizontal-showcase');
  if (container) {
    const cards = container.getElementsByClassName('showcase-card');
    if (cards.length > 0) {
      cards[0].remove();
      const countElem = document.getElementById('total-articles') || document.querySelector('.badge span');
      if (countElem) {
        countElem.textContent = Math.max(0, parseInt(countElem.textContent) - 1);
      }
    }
  }
}