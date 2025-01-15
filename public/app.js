// State management
let isAuthenticated = false;
let userToken = null;
let userId;

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const videoUrlInput = document.getElementById('videoUrl');
const summarizeBtn = document.getElementById('summarizeBtn');
const resultSection = document.getElementById('result');
const videoThumbnail = document.getElementById('videoThumbnail');
const videoTitle = document.getElementById('videoTitle');
const summaryText = document.getElementById('summaryText');
const historySection = document.getElementById('history');
const historyList = document.getElementById('historyList');

// Auth event listeners
loginBtn.addEventListener('click', () => {
    if (isAuthenticated) {
        logout();
    } else {
        loginModal.classList.remove('hidden');
    }
});

registerBtn.addEventListener('click', () => {
    registerModal.classList.remove('hidden');
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.classList.add('hidden');
    if (e.target === registerModal) registerModal.classList.add('hidden');
});

// Form submissions
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) throw new Error('Login failed');
        
        const data = await response.json();
        userToken = data.token;
        userId=data.id;
        isAuthenticated = true;
        updateUIForAuth();
        loginModal.classList.add('hidden');
        loadUserHistory();
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again or Verify Your mail.');
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    const confirmPassword = e.target.elements[2].value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) throw new Error('Registration failed');

        alert('Registration successful! Please log in.');
        registerModal.classList.add('hidden');
        loginModal.classList.remove('hidden');
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again .');
    }
});

// Video summarization
summarizeBtn.addEventListener('click', async () => {
    const videoUrl = videoUrlInput.value;
    if (!isValidYouTubeUrl(videoUrl)) {
        alert('Please enter a valid YouTube URL');
        return;
    }
    if (!isAuthenticated) {
        alert('Please log in to use this feature');
        loginModal.classList.remove('hidden');
        return;
    }

    try {
        summarizeBtn.disabled = true;
        summarizeBtn.textContent = 'Summarizing...';

        const response = await fetch('/api/summarize', {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify({videoUrl ,userId})
        });

        if (!response.ok) throw new Error('Summarization failed');

        const data = await response.json();
        displayResult(data);

        // displayResult(JSON.parse(data));
    } catch (error) {
        console.error('Summarization failed:', error);
        alert('Failed to summarize video. Please try again.');
    } finally {
        summarizeBtn.disabled = false;
        summarizeBtn.textContent = 'Summarize';
    }
});

// Helper functions
function isValidYouTubeUrl(url) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
}

function displayResult(data) {
    // videoTitle.textContent = data.title;
    summaryText.textContent = data.transcript;
    resultSection.classList.remove('hidden');
}

function updateUIForAuth() {
    if (isAuthenticated) {
        loginBtn.textContent = 'Logout';
        registerBtn.classList.add('hidden');
        historySection.classList.remove('hidden');
    } else {
        loginBtn.textContent = 'Login';
        registerBtn.classList.remove('hidden');
        historySection.classList.add('hidden');
        resultSection.classList.add('hidden');
    }
}

function logout() {
    userSignOut();
    isAuthenticated = false;
    userToken = null;
    // Window.reload();
    updateUIForAuth();
    
}

async function loadUserHistory() {
    if (!isAuthenticated) return;

    try {
        const response = await fetch('/api/history', {
            headers: { 'Authorization': `${userId}` }
        });

        if (!response.ok) throw new Error('Failed to fetch history');

        const history = await response.json();
        historyList.innerHTML = '';
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <h3>${item.videoUrl}</h3>
                <p>${item.summary.substring(0, 100)}...</p>
            `;
            historyList.appendChild(historyItem);
        });
    } catch (error) {
        console.error('Failed to load history:', error);
    }
}

async function userSignOut() {
    try{
    const response = await fetch('/api/signout', {
    });
    if(response.error){
        alert("Failed to log Out");
    }
} catch(error){
    console.log("failed to SignOut");


}
}
