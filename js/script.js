body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}

.loader-container {
    text-align: center;
    padding: 20px;
}

.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    display: none; /* Tugma bosilguncha yashirin */
    margin: 0 auto 20px;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

h2 { color: #333; font-size: 1.2rem; }
p { color: #888; font-size: 0.9rem; }

button {
    background: #007AFF;
    color: white;
    border: none;
    padding: 12px 40px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
