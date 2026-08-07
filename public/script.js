document.addEventListener("DOMContentLoaded", () => {
  fetchBlogs();
});

async function fetchBlogs() {
  let blogs = [];

  // Try fetching blogs.json from public directory first, then root directory
  try {
    let res = await fetch('./public/blogs.json');
    if (!res.ok) {
      res = await fetch('./blogs.json');
    }
    blogs = await res.json();
  } catch (err) {
    console.error('Error loading blogs.json:', err);
    return;
  }

  // Find article container in HTML
  const blogContainer = document.getElementById('blog-list') || 
                        document.querySelector('.blog-grid') || 
                        document.querySelector('.horizontal-showcase');

  if (blogContainer) {
    blogContainer.innerHTML = ''; // Clear container

    blogs.forEach(blog => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.style.border = '1px solid #333';
      card.style.padding = '15px';
      card.style.margin = '10px 0';
      card.style.borderRadius = '8px';
      card.style.background = 'rgba(255,255,255,0.05)';

      card.innerHTML = `
        <h3 style="color: #61dafb; margin-top: 0;">${blog.title}</h3>
        <p style="color: #aaa; font-size: 0.9em;">By <strong>${blog.author}</strong></p>
        <p style="color: #ddd;">${blog.description}</p>
      `;
      blogContainer.appendChild(card);
    });
  }

  // Update total articles counter
  const totalCountElem = document.getElementById('total-articles') || 
                         document.querySelector('.badge span');
  if (totalCountElem) {
    totalCountElem.textContent = blogs.length;
  }
}