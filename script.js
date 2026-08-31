// Data model for portfolio files
const files = {
  'about.js': {
    language: 'JavaScript',
    output: "Executing about.js...\nDeveloper: Your Name\nRole: Frontend Engineer\nFocus: Building rich interactive user experiences.",
    content: `
<span class="keyword">const</span> <span class="variable">developer</span> = {
  <span class="property">name</span>: <span class="string">'Your Name'</span>,
  <span class="property">role</span>: <span class="string">'Frontend Engineer'</span>,
  <span class="property">skills</span>: [<span class="string">'HTML'</span>, <span class="string">'CSS'</span>, <span class="string">'JavaScript'</span>],
  <span class="property">availableForHire</span>: <span class="keyword">true</span>
};

<span class="keyword">function</span> <span class="function">getSummary</span>() {
  <span class="keyword">return</span> <span class="string">\`Hi! I'm \${developer.name}, a \${developer.role}.\`</span>;
}

<span class="function">console</span>.log(<span class="function">getSummary</span>());
`
  },
  'projects.json': {
    language: 'JSON',
    output: "Fetching project repositories...\nFound 2 public repositories:\n- CyberOS (120 Stars)\n- Canvas Physics Engine (85 Stars)",
    content: `
[
  {
    <span class="property">"title"</span>: <span class="string">"CyberOS Portfolio"</span>,
    <span class="property">"tech"</span>: [<span class="string">"HTML5"</span>, <span class="string">"CSS3"</span>, <span class="string">"JavaScript"</span>],
    <span class="property">"description"</span>: <span class="string">"Interactive VS Code visual engine."</span>
  },
  {
    <span class="property">"title"</span>: <span class="string">"Physics Particle Engine"</span>,
    <span class="property">"tech"</span>: [<span class="string">"Canvas API"</span>, <span class="string">"Math"</span>],
    <span class="property">"description"</span>: <span class="string">"Lightweight 2D physics engine built in vanilla JS."</span>
  }
]
`
  },
  'skills.css': {
    language: 'CSS',
    output: "Compiling skills.css...\nStyles loaded: Modern UI Layouts, Flexbox, Grid, Clean Code Formatting.",
    content: `
<span class="selector">.frontend-developer</span> {
  <span class="property">html5</span>: <span class="string">expert</span>;
  <span class="property">css3</span>: <span class="string">advanced</span>;
  <span class="property">javascript</span>: <span class="string">ES6+</span>;
  <span class="property">responsive-design</span>: <span class="keyword">true</span>;
}
`
  },
  'contact.md': {
    language: 'Markdown',
    output: "Contact Details:\nEmail: alex@example.com\nGitHub: @githubuser\nLinkedIn: linkedin.com/in/devprofile",
    content: `
<span class="comment"># Contact Information</span>

- <span class="keyword">Email</span>: alex@example.com
- <span class="keyword">GitHub</span>: github.com/yourhandle
- <span class="keyword">LinkedIn</span>: linkedin.com/in/yourhandle
`
  }
};

let activeFileName = 'about.js';

// DOM Elements
const fileItems = document.querySelectorAll('.file-item');
const tabHeader = document.getElementById('tabHeader');
const codeContent = document.getElementById('codeContent');
const lineNumbers = document.getElementById('lineNumbers');
const windowTitle = document.getElementById('windowTitle');
const languageStatus = document.getElementById('languageStatus');
const termInput = document.getElementById('termInput');
const terminalBody = document.getElementById('terminalBody');
const runBtn = document.getElementById('runBtn');

// Switch active open file
function openFile(fileName) {
  activeFileName = fileName;
  const fileData = files[fileName];

  // Update UI indicators
  fileItems.forEach(item => {
    item.classList.toggle('active', item.dataset.file === fileName);
  });

  tabHeader.innerText = fileName;
  windowTitle.innerText = `${fileName} - VS Code Portfolio`;
  languageStatus.innerText = fileData.language;

  // Render file code syntax
  const trimmedCode = fileData.content.trim();
  codeContent.innerHTML = trimmedCode;

  // Build line numbers
  const lines = trimmedCode.split('\n').length;
  let lineHtml = '';
  for (let i = 1; i <= lines; i++) {
    lineHtml += `${i}<br>`;
  }
  lineNumbers.innerHTML = lineHtml;
}

// Add File Explorer click handlers
fileItems.forEach(item => {
  item.addEventListener('click', () => {
    openFile(item.dataset.file);
  });
});

// Run Code Action
function runCurrentCode() {
  const outputText = files[activeFileName].output;
  printTerminalMessage(`> Node execution: ${activeFileName}`);
  printTerminalMessage(outputText);
}

runBtn.addEventListener('click', runCurrentCode);

// Terminal Engine
function printTerminalMessage(msg) {
  const row = document.createElement('div');
  row.innerText = msg;
  termInput.parentElement.before(row);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

termInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = termInput.value.trim().toLowerCase();
    
    // Print user input
    const userRow = document.createElement('div');
    userRow.innerHTML = `<span class="prompt">PS C:\\Users\\Portfolio></span> ${termInput.value}`;
    termInput.parentElement.before(userRow);

    // Command matching
    if (val === 'help') {
      printTerminalMessage("Commands: about | projects | skills | run | clear");
    } else if (val === 'run') {
      runCurrentCode();
    } else if (val === 'about') {
      openFile('about.js');
    } else if (val === 'projects') {
      openFile('projects.json');
    } else if (val === 'skills') {
      openFile('skills.css');
    } else if (val === 'clear') {
      terminalBody.querySelectorAll('div:not(.terminal-input-row)').forEach(el => el.remove());
    } else if (val !== '') {
      printTerminalMessage(`Command '${val}' not recognized. Type 'help' for commands.`);
    }

    termInput.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});

// Initialize with default file
openFile('about.js');