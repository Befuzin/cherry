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

  input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      cursor.remove();
      const command = input.value.trim().toLowerCase();
      terminal.innerHTML += input.value + "\n";
      input.remove();
      handleCommand(command);
    }
  });
}

// Handle commands
function handleCommand(cmd) {
  switch(cmd) {
    case "help":
      terminal.innerHTML += "Available commands:\n";
      terminal.innerHTML += "stories  - Go to stories.html\n";
      terminal.innerHTML += "about    - About the zine\n";
      terminal.innerHTML += "clear    - Clear screen\n";
      break;

    case "stories":
      window.location.href = "stories.html";
      return;

    case "about":
      terminal.innerHTML += "Red Pines Zine is a cyberpunk-inspired digital zine.\n";
      break;

    case "clear":
      terminal.innerHTML = "";
      break;

    default:
      terminal.innerHTML += "Unknown command. Type 'help' for a list of commands.\n";
  }
  showPrompt();
}

// Start terminal
showPrompt();
