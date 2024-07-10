const profileForm = document.querySelector("#profile-form");
const profileEmail = document.querySelector("[name='email']");
const profileUsername = document.querySelector("[name='username']");

if (!user) {
	window.location.href = "/login";
}

let token = user.token;

profileEmail.value = user.email;
profileUsername.value = user.username;

profileForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	if (!confirm("Are you sure you want to Edit profile?")) {
		return;
	}

	const username = e.target.username.value;
	const email = e.target.email.value;
	const password = e.target.newPassword.value;

	try {
		const { data } = await axios.put(
			"http://localhost:3000/api/v1/users/update",
			{
				username,
				email,
				password,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		localStorage.setItem("user", JSON.stringify(data.msg.user));

		if (data.msg.user.role_id === 1) {
			window.location.href = "/admin/users";
			return;
		}

		console.log(data.ok);
		if (data.ok) {
			alert("Modified successfully");
		} else {
			alert("Modified error");
		}

		window.location.href = "/profile";
	} catch (error) {
		console.log(error);
	}
});
