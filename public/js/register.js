const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const username = e.target.username.value;
	const email = e.target.email.value;
	const password = e.target.password.value;

	try {
		const { data } = await axios.post(
			"http://localhost:3000/api/v1/users/register",
			{
				username,
				email,
				password,
			}
		);

		localStorage.setItem("user", JSON.stringify(data.msg.user));

		if (data.msg.user.role_id === 1) {
			window.location.href = "/admin/users";
			return;
		}

		console.log(data.ok);
		if (data.ok) {
			alert("Created successfully");
		} else {
			alert("Creation error");
		}

		window.location.href = "/profile";
	} catch (error) {
		console.log(error);
	}
});
