const output = document.getElementById('output');
const worker = new Worker('worker.js'); // webworker instance

// Receive messages from the worker
worker.onmessage = function (event) {
    output.innerText = event.data; // it receives from webworker nd shows in the UI,extracts and updates
};

// Function to run user's code
function runCode() {
    output.innerText = ''; 
    const code = document.getElementById('code').value; 
    worker.postMessage(code); // code sent  for execution


     //  Syntax Highlighting Part
     const highlightedCode = document.getElementById('highlightedCode');
     highlightedCode.textContent = code; 
     Prism.highlightElement(highlightedCode); 
    }

// Function to clear output
function clearOutput() {
    output.innerText = '';
}

// Run debugger when F10 is pressed
document.addEventListener("keydown", function(event) { 
    if (event.key === "F10") {
        event.preventDefault(); 
        runCode();
    }
});

// mode changing
function toggleMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
    
    // Save user preference to local storage
    const mode = body.classList.contains("dark-mode") ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", mode); 
}

// Load user preference on page load
window.onload = function () {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
        document.body.classList.remove("light-mode", "dark-mode");
        document.body.classList.add(savedMode);
    }
};



//copy button
function copyOutput() {
    const outputText = output.innerText;
    if (!outputText.trim()) //removes spaces nd also checks if the element is empty or nt
  {
        return;
    }

    navigator.clipboard.writeText(outputText)
        .then(() => {
            CopyAlert();
        })
        .catch(err => {
            console.error("Copy failed: ", err);
        });
}

function CopyAlert() {
    const alertBox = document.getElementById("copy-alert");
    alertBox.style.display = "block";

    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000); 
}

// footer

  document.getElementById("year").textContent = new Date().getFullYear();


