document.addEventListener("DOMContentLoaded", () => {
  const blogList = document.getElementById('blog-list');
  const blogForm = document.getElementById('blog-form');

  // If on Home Page, fetch and show blogs
  if (blogList) {
    fetchBlogs();
  }

  // If on Add Blog Page, handle form submission
  if (blogForm) {
    blogForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const description = document.getElementById('description').value;

      try {
        const response = await fetch('./blogs.json', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, author, description })
        });

        if (response.ok) {
          window.location.href = './index.html';
        }
      } catch (err) {
        console.error('Error adding blog:', err);
      }
    });
  }
});

// Fetch and display blogs from local blogs.json file
async function fetchBlogs() {
  try {
    const res = await fetch('./blogs.json');
    const blogs = await res.json();
    const blogContainer = document.getElementById('blog-list');
    
    if (!blogContainer) return;
    blogContainer.innerHTML = '';

    blogs.forEach(blog => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.innerHTML = `
        <h2>${blog.title || 'Untitled'}</h2>
        <p class="author">By <strong>${blog.author || 'Anonymous'}</strong></p>
        <p class="description">${blog.description || ''}</p>
        <button class="delete-btn" onclick="deleteBlog(${blog.id})">Delete</button>
      `;
      blogContainer.appendChild(card);
    });

    // Update total articles counter if element exists
    const totalCountElem = document.getElementById('total-articles');
    if (totalCountElem) {
      totalCountElem.textContent = blogs.length;
    }
  } catch (err) {
    console.error('Error fetching blogs:', err);
  }
}

// Delete blog function
async function deleteBlog(id) {
  try {
    console.log(`Deleting blog with id: ${id}`);
    fetchBlogs();
  } catch (err) {
    console.error('Error deleting blog:', err);
  }
}