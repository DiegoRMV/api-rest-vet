const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const email = e.target.email.value;
	const password = e.target.password.value;

	try {
		const { data } = await axios.post(
			"http://localhost:3000/api/v1/users/login",
			{
				email,
				password,
			}
		);
		localStorage.setItem("user", JSON.stringify(data.msg.user));

		if (data.msg.user.role_id === 1) {
			window.location.href = "/admin/users";
			return;
		}

		window.location.href = "/profile";
	} catch (error) {
		console.log(error);
	}
});

function mostrar(etiqueta) {
	etiqueta.classList.remove("ocultar");
	etiqueta.classList.remove("oculto");
	etiqueta.classList.add("mostrar");
}
function ocultar(etiqueta) {
	etiqueta.classList.add("ocultar");
	etiqueta.classList.remove("mostrar");
}

const showModal = () => {
	
	const modal = document.getElementById("modal");
	mostrar(modal);
	setTimeout(() => {
		ocultar(modal);
	}, 2000);
};
