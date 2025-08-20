// comments.js

// Get article ID from body
const articleId = document.body.dataset.articleId;

// DOM elements
const commentsList = document.getElementById('comments-list');
const commentAuthor = document.getElementById('comment-author');
const commentText = document.getElementById('comment-text');
const submitBtn = document.getElementById('submit-comment');

// Helper: render a single comment
function renderComment(data) {
  const div = document.createElement('div');
  div.classList.add('comment');
  div.style.border = '1px solid #33ff66';
  div.style.padding = '10px';
  div.style.marginBottom = '10px';
  div.style.backgroundColor = '#111';
  div.style.color = '#33ff66';
  div.style.fontFamily = '"Courier New", monospace';
  
  const author = document.createElement('strong');
  author.textContent = data.author + ': ';
  div.appendChild(author);

  const text = document.createElement('span');
  text.textContent = data.text;
  div.appendChild(text);

  commentsList.appendChild(div);
}

// Load comments from Firestore
function loadComments() {
  commentsList.innerHTML = '';
  db.collection('comments')
    .where('articleId', '==', articleId)
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      commentsList.innerHTML = '';
      snapshot.forEach(doc => renderComment(doc.data()));
    });
}

// Post new comment
submitBtn.addEventListener('click', () => {
  const author = commentAuthor.value.trim();
  const text = commentText.value.trim();

  if (!author || !text) {
    alert('Please enter both handle and comment.');
    return;
  }

  db.collection('comments').add({
    articleId: articleId,
    author: author,
    text: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    commentAuthor.value = '';
    commentText.value = '';
  })
  .catch(err => console.error('Error adding comment:', err));
});

// Initialize
loadComments();
