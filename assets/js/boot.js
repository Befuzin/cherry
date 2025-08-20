const terminal = document.getElementById('terminal');

const bootLines = [
  "Red Pines Zine OS v1.0",
  "Initializing memory...",
  "Checking filesystem...",
  "Loading modules...",
  "Starting interface...",
  "System ready.",
  "",

];

let lineIndex = 0;
let authenticated = false; // new flag to track if password was entered

// Random flicker character
function randomChar() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  return chars[Math.floor(Math.random() * chars.length)];
}

// Typing effect with occasional glitch
function typeLineGlitch(text, callback, i = 0) {
  if (i < text.length) {
    if (Math.random() < 0.05) {
      terminal.innerHTML += randomChar();
    } else {
      terminal.innerHTML += text[i];
    }
    i++;
    terminal.scrollTop = terminal.scrollHeight;
    setTimeout(() => typeLineGlitch(text, callback, i), 30 + Math.random() * 50);
  } else {
    if (Math.random() < 0.3) {
      const glitchSpan = document.createElement('span');
      glitchSpan.classList.add('glitch');
      glitchSpan.textContent = text;
      terminal.appendChild(glitchSpan);
      setTimeout(() => {
        glitchSpan.remove();
        terminal.innerHTML += text + "\n";
        callback();
      }, 300);
    } else {
      terminal.innerHTML += "\n";
      callback();
    }
  }
}

// Print boot sequence
function printBootSequence() {
  if (lineIndex < bootLines.length) {
    typeLineGlitch(bootLines[lineIndex], () => {
      lineIndex++;
      printBootSequence();
    });
  } else {
    requestPassword(); // password prompt after boot
  }
}

// Glitchy password prompt
function requestPassword() {
  const promptLine = document.createElement('span');
  promptLine.classList.add('prompt');
  terminal.appendChild(promptLine);

  typeLineGlitch("Enter password: ", () => {
    const input = document.createElement('input');
    input.type = 'text';
    terminal.appendChild(input);

    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    terminal.appendChild(cursor);

    input.focus();

    let passwordValue = '';

    input.addEventListener('keydown', (e) => {
      if (e.key === "Enter") {
        cursor.remove();

        const maskedSpan = document.createElement('span');
        maskedSpan.classList.add('glitch');
        maskedSpan.textContent = '*'.repeat(passwordValue.length);
        terminal.appendChild(maskedSpan);
        terminal.innerHTML += "\n";

        input.remove();

        if (passwordValue.toLowerCase() === "red pines") {
          authenticated = true; // mark as authenticated
          typeLineGlitch("Access granted.\n\n", showPrompt);
        } else {
          typeLineGlitch("Access denied. Try again.\n", requestPassword);
        }
      } else if (e.key === "Backspace") {
        passwordValue = passwordValue.slice(0, -1);
        input.value = '*'.repeat(passwordValue.length);
        e.preventDefault();
      } else if (e.key.length === 1) {
        passwordValue += e.key;
        input.value = '*'.repeat(passwordValue.length);
        e.preventDefault();
      }
    });
  });
}

// Show command prompt
function showPrompt() {
  const promptLine = document.createElement('span');
  promptLine.classList.add('prompt');
  promptLine.textContent = '> ';
  terminal.appendChild(promptLine);

  const input = document.createElement('input');
  terminal.appendChild(input);

  const cursor = document.createElement('span');
  cursor.classList.add('cursor');
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
      if (authenticated) {
        terminal.innerHTML += "Available commands:\n";
        terminal.innerHTML += "stories  - Latest News\n";
        terminal.innerHTML += "about    - About the zine\n";
        terminal.innerHTML += "clear    - Clear screen\n";
      } else {
        terminal.innerHTML += "Unknown command. Type the correct password to unlock commands.\n";
      }
      break;
    case "stories":
      window.location.href = "stories.html";
      return;
    case "about":
      terminal.innerHTML += "Red Pines Zine is maintained by @Mez.\n";
      break;
    case "clear":
      terminal.innerHTML = "";
      break;
    default:
      terminal.innerHTML += "Unknown command. Type 'help' for a list of commands.\n";
  }
  showPrompt();
}

// Start boot
printBootSequence();
