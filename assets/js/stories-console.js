// Your Firebase config (already created)
const firebaseConfig = {
  apiKey: "AIzaSyA0MVj-8xHrpcawL7WlCj2-thDxxpq2wVQ",
  authDomain: "the-signal-dad36.firebaseapp.com",
  projectId: "the-signal-dad36",
  storageBucket: "the-signal-dad36.firebasestorage.app",
  messagingSenderId: "1041520189352",
  appId: "1:1041520189352:web:fef863c1a396a452d1879d",
  measurementId: "G-9NJGGVYW9K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to Firestore
const db = firebase.firestore();

// Terminal setup
const terminal = document.getElementById('terminal');

// Blinking cursor
function createCursor() {
  const cursor = document.createElement('span');
  cursor.classList.add('cursor');
  return cursor;
}

// Show command prompt
function showPrompt() {
  const promptLine = document.createElement('span');
  promptLine.classList.add('prompt');
  promptLine.textContent = '> ';
  terminal.appendChild(promptLine);

  const input = document.createElement('input');
  input.type = 'text';
  terminal.appendChild(input);

  const cursor = createCursor();
  terminal.appendChild(cursor);

  input.focus();

  input.addEventListener('keydown', async (e) => {
    if (e.key === "Enter") {
      cursor.remove();
      const command = input.value.trim().toLowerCase();
      terminal.innerHTML += input.value + "\n";
      input.remove();
      await handleCommand(command);
    }
  });
}

// Handle commands
async function handleCommand(cmd) {
  switch(cmd) {
    case "help":
      terminal.innerHTML += "Available commands:\n";
      terminal.innerHTML += "stories  - Go to stories.html\n";
      terminal.innerHTML += "about    - About the zine\n";
      terminal.innerHTML += "comment  - Add a comment\n";
      terminal.innerHTML += "view     - View all comments\n";
      terminal.innerHTML += "clear    - Clear screen\n";
      break;

    case "stories":
      window.location.href = "stories.html";
      return;

    case "about":
      terminal.innerHTML += "Red Pines Zine is a cyberpunk-inspired digital zine.\n";
      break;

    case "comment":
      const text = prompt("Enter your comment:");
      if (text) await addComment(text);
      break;

    case "view":
      await viewComments();
      break;

    case "clear":
      terminal.innerHTML = "";
      break;

    default:
      terminal.innerHTML += "Unknown command. Type 'help' for a list of commands.\n";
  }
  showPrompt();
}

// Add a comment to Firestore
async function addComment(text) {
  try {
    await db.collection("comments").add({
      text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    terminal.innerHTML += "Comment saved!\n";
  } catch (err) {
    console.error(err);
    terminal.innerHTML += "Failed to save comment.\n";
  }
}

// View comments from Firestore
async function viewComments() {
  try {
    const snapshot = await db.collection("comments")
                             .orderBy("timestamp", "desc")
                             .get();
    if (snapshot.empty) {
      terminal.innerHTML += "No comments yet.\n";
      return;
    }
    snapshot.forEach(doc => {
      const data = doc.data();
      const time = data.timestamp?.toDate().toLocaleString() || "unknown time";
      terminal.innerHTML += `[${time}] ${data.text}\n`;
    });
  } catch (err) {
    console.error(err);
    terminal.innerHTML += "Failed to load comments.\n";
  }
}

// Start terminal
showPrompt();
