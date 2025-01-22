let posts = [];
let editingPostIndex = null;

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());

    if (editingPostIndex !== null) {
        // Edit existing post
        posts[editingPostIndex] = { title, content, tags };
        editingPostIndex = null;
    } else {
        // Create new post
        posts.push({ title, content, tags });
    }

    document.getElementById('postForm').reset();
    renderPosts();
});

function renderPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p><strong>Tags:</strong> ${post.tags.join(', ')}</p>
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

function editPost(index) {
    const post = posts[index];
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;
    document.getElementById('tags').value = post.tags.join(', ');
    editingPostIndex = index;
}

function deletePost(index) {
    posts.splice(index, 1);
    renderPosts();
}
