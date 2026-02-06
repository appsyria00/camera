body {
    margin: 0;
    padding: 0;
    background: #f0f2f5;
    font-family: system-ui, -apple-system, sans-serif;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding-top: 20px;
}

.fb-container {
    width: 100%;
    max-width: 400px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,.1);
    overflow: hidden;
}

.header {
    background: #1877f2;
    padding: 12px;
    text-align: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -1px;
}

.form-area {
    padding: 20px;
}

input {
    width: 100%;
    padding: 14px;
    margin: 8px 0;
    border: 1px solid #dddfe2;
    border-radius: 6px;
    font-size: 16px;
    box-sizing: border-box;
    outline: none;
}

input:focus {
    border-color: #1877f2;
    box-shadow: 0 0 0 2px #e7f3ff;
}

.login-btn {
    width: 100%;
    padding: 14px;
    background: #1877f2;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
}

.links {
    text-align: center;
    margin: 15px 0;
    font-size: 14px;
}

.links a {
    color: #1877f2;
    text-decoration: none;
}

.footer {
    text-align: center;
    padding: 20px;
    font-size: 13px;
    color: #8a8d91;
    line-height: 1.6;
}

/* تصميم اللودر */
#loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #1877f2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
