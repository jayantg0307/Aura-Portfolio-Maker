function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  // Reset any previous error
  errorMsg.textContent = '';

  // Basic validation
  if (!username || !password) {
    errorMsg.textContent = 'Please fill in all fields.';
    return;
  }

  // Check credentials and redirect
  if (username === 'sonit' && password === 'sonit123') {
    window.location.href = 'index.html';
  } else {
    errorMsg.textContent = 'Invalid credentials. Please try again.';
  }
}
