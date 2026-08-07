let allBlogs = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchBlogs();
});

async function fetchBlogs() {
  let blogs = [];
  
  // Potential path locations for static hosting
  const pathsToTry = ['./blogs.json', 'blogs.json', './public/blogs.json', 'public/blogs.json'];

  for (const path of pathsToTry) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        blogs = await response.json();
        console.log(`Successfully fetched blogs from: ${path}`);
        break;
      }
    } catch (e) {
      // Continue checking next path
    }
  }

  // Fallback data if fetch fails on static host
  if (!blogs || blogs.length === 0) {
    blogs = [
      {
        id: 1,
        title: "Getting Started with Modern JavaScript",
        author: "Aarti Kamble",
        category: "#AI_ML",
        description: "Learn the essential fundamentals of modern JavaScript, including arrow functions, DOM manipulation, and modern ES6 features.",
        date: "Aug 4, 2026"
      },
      {
        id: 2,
        title: "Building RESTful APIs with Node.js & Express",
        author: "Tech Explorer",
        category: "#Cloud_DevOps",
        description: "A comprehensive beginner-friendly guide to setting up route handlers, middleware, and handling JSON data in Express.",
        date: "Aug 5, 2026"
      },
      {
        id: 3,
        title: "Deploying Web Applications to GitHub Pages",
        author: "Frontend Dev",
        category: "#Web_Dev",
        description: "Discover how to configure repository settings, resolve missing static assets, and deploy responsive web projects seamlessly.",
        date: "Aug 6, 2026"
      }
    ];
  }

  allBlogs = blogs;
  renderBlogs(allBlogs);
}

function calculateReadTime(text) {
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.ceil(words / 35);
  return `${minutes} min read`;
}

function renderBlogs(blogs) {
  // Target the exact IDs and class names from index.html
  const container = document.getElementById('recent-blogs-grid') || 
                    document.getElementById('blog-list') || 
                    document.querySelector('.scroll-stream');
                    
  const countElem = document.getElementById('total-count') || 
                    document.getElementById('total-articles');

  if (countElem) {
    countElem.textContent = blogs.length;
  }

  if (!container) {
    console.error("Blog container element not found in HTML!");
    return;
  }

  container.innerHTML = ''; // Clear container

  const defaultTags = ['#AI_ML', '#Cloud_DevOps', '#Web_Dev', '#Rust_Lang', '#FullStack'];

  blogs.forEach((blog, idx) => {
    const card = document.createElement('div');
    card.className = 'stream-card'; // Matches index.html CSS
    card.setAttribute('onclick', `openZoomModal(${blog.id})`);

    card.innerHTML = `
      <div>
        <div class="card-top-bar">
          <span class="tag-badge">${blog.category || defaultTags[idx % defaultTags.length]}</span>
          <div class="card-actions" onclick="event.stopPropagation()">
            <button class="btn-edit" onclick="openEditModal(${blog.id})">✏️ Edit</button>
            <button class="btn-delete" onclick="deleteArticle(${blog.id})">🗑️ Delete</button>
          </div>
        </div>
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>
      </div>
      <div>
        <div class="card-meta">
          <span>⏱️ ${calculateReadTime(blog.description)}</span>
          <button class="btn-zoom" onclick="event.stopPropagation(); openZoomModal(${blog.id})">🔎 Read Blog</button>
        </div>
        <div class="card-footer">
          <span>By <strong>${blog.author || 'Author'}</strong></span>
          <span>📅 ${blog.date || 'Aug 7, 2026'}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function deleteArticle(id) {
  if (confirm("Are you sure you want to delete this post?")) {
    allBlogs = allBlogs.filter(b => Number(b.id) !== Number(id));
    renderBlogs(allBlogs);
  }
}