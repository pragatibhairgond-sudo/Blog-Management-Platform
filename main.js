document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts-container');
  const blogForm = document.getElementById('blog-form');

  // Load blog posts on home page
  if (postsContainer) {
    fetchBlogs();
  }

  // Handle post creation on add blog page
  if (blogForm) {
    blogForm.addEventListener('submit', handleFormSubmit);
  }
});

// 1. Fetch and Display All Blogs (with Root Static Fallback for GitHub Pages)
async function fetchBlogs() {
  const postsContainer = document.getElementById('posts-container');
  let blogs = [];

  try {
    // Try fetching from Node backend first
    const response = await fetch('/api/blogs');
    if (response.ok) {
      blogs = await response.json();
    } else {
      throw new Error("Server API not available");
    }
  } catch (error) {
    console.log('Backend server not detected, falling back to static ./blogs.json:', error);
    
    // Fallback: Fetch directly from root ./blogs.json file for GitHub Pages
    try {
      const staticResponse = await fetch('./blogs.json');
      blogs = await staticResponse.json();
    } catch (staticError) {
      console.error('Error fetching static blogs:', staticError);
    }
  }

  // If no blogs returned or array is empty
  if (!blogs || blogs.length === 0) {
    postsContainer.innerHTML = '<p class="no-posts">No blog posts found.</p>';
    return;
  }

  // Render Blog Cards
  postsContainer.innerHTML = blogs.map(blog => `
    <article class="blog-card">
      <div class="card-header">
        <span class="category-badge">${blog.category || 'General'}</span>
        <span class="post-date">${blog.date || ''}</span>
      </div>
      <h3 class="card-title">${blog.title}</h3>
      <p class="card-excerpt">${blog.content}</p>
      <div class="card-footer">
        <span class="author-name">By ${blog.author}</span>
        <div class="card-actions">
          <button class="btn-action btn-edit" onclick="editBlog(${blog.id})">
            ✏️ Edit
          </button>
          <button class="btn-action btn-delete" onclick="deleteBlog(${blog.id})">
            🗑️ Delete
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// 2. Submit New Blog Post
async function handleFormSubmit(event) {
  event.preventDefault();

  const newBlog = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    category: document.getElementById('category').value,
    content: document.getElementById('content').value
  };

  try {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlog)
    });

    if (response.ok) {
      alert('Blog published successfully!');
      window.location.href = 'index.html';
    } else {
      const data = await response.json();
      alert(data.error || 'Failed to publish post.');
    }
  } catch (error) {
    console.error('Error creating blog:', error);
    alert('Something went wrong!');
  }
}

// 3. Edit Existing Blog Post (Server + Static Friendly)
async function editBlog(id) {
  try {
    let blogs = [];
    
    // Fetch current blogs
    const response = await fetch('/api/blogs').catch(() => null);
    if (response && response.ok) {
      blogs = await response.json();
    } else {
      const staticRes = await fetch('./blogs.json');
      blogs = await staticRes.json();
    }

    const blogToEdit = blogs.find(blog => Number(blog.id) === Number(id));

    if (!blogToEdit) {
      alert('Blog post not found!');
      return;
    }

    const newTitle = prompt('Edit Title:', blogToEdit.title);
    if (newTitle === null) return;

    const newAuthor = prompt('Edit Author:', blogToEdit.author);
    if (newAuthor === null) return;

    const newCategory = prompt('Edit Category:', blogToEdit.category);
    if (newCategory === null) return;

    const newContent = prompt('Edit Content:', blogToEdit.content);
    if (newContent === null) return;

    const updatedBlog = {
      title: newTitle,
      author: newAuthor,
      category: newCategory,
      content: newContent
    };

    const updateResponse = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBlog)
    });

    if (updateResponse.ok) {
      alert('Blog updated successfully!');
      fetchBlogs();
    } else {
      alert('Updated locally! (Server API is not active on GitHub Pages)');
    }
  } catch (error) {
    console.error('Error updating blog:', error);
    alert('Note: Editing persistent data requires running the backend server locally.');
  }
}

// 4. Delete Blog Post
async function deleteBlog(id) {
  if (!confirm('Are you sure you want to delete this blog post?')) return;

  try {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      fetchBlogs();
    } else {
      alert('Delete action is only supported when running the Express server locally.');
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
    alert('Delete action is only supported when running the Express server locally.');
  }
}

// 5. Function to dynamically filter blog cards as you type
function searchBlogs() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const blogCards = document.querySelectorAll('.blog-card');

  blogCards.forEach(card => {
    const title = card.querySelector('h3, .card-title, h2')?.textContent.toLowerCase() || '';
    const author = card.querySelector('.author-name, .author, .card-author')?.textContent.toLowerCase() || '';
    const category = card.querySelector('.category-badge, .category, .card-category')?.textContent.toLowerCase() || '';
    const content = card.querySelector('.card-excerpt, p')?.textContent.toLowerCase() || '';

    if (title.includes(query) || author.includes(query) || category.includes(query) || content.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
