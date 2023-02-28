const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", (event) => {
	event.preventDefault()
	// const username = loginForm.username.value
	const username = loginForm.username.value
	const password = loginForm.password.value
	if (username && password) {
		localStorage.setItem('username', username);
		window.location.href = '../pages/form.html'
		loginForm.reset()
	}
});
