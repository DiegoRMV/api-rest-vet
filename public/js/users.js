const tableUsers = document.querySelector("#table-users");
const modalMain = document.querySelector(".modal-main");

let token = user.token;

window.addEventListener("click", (event) => {
	if (event.target == modalMain) {
		modalMain.style.display = "none";
	}
});

function closeModal() {
	modalMain.style.display = "none";
}

const getUsers = async () => {
	try {
		const { data } = await axios.get("http://localhost:3000/api/v1/users/", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const { msg: users } = await data;

		tableUsers.innerHTML = "";

		users.forEach((user) => {
			// if (user.role_id === 1) return;

			let tr = document.createElement("tr");
			let tdId = document.createElement("td");
			let tdUsername = document.createElement("td");
			let tdEmail = document.createElement("td");
			let tdPassword = document.createElement("td");
			tdPassword.classList.add("text-break");
			let tdOption = document.createElement("td");
			tdOption.style.width = "120px";
			let btnShow = document.createElement("button");
			let btnEdit = document.createElement("button");
			let btnRemove = document.createElement("button");

			tdId.textContent = user.uid;
			tdUsername.textContent = user.username;
			tdEmail.textContent = user.email;
			tdPassword.textContent = user.password;
			btnShow.innerHTML = `<i class="bi bi-eye"></i>`;
			btnEdit.innerHTML = `<i class="bi bi-pencil"></i>`;
			btnRemove.innerHTML = `<i class="bi bi-trash"></i>`;

			btnShow.addEventListener("click", () => {
				modalMain.innerHTML = "";
				let modal = document.createElement("div");
				let title = document.createElement("h2");
				let username = document.createElement("h4");
				let email = document.createElement("h4");
				let btnClose = document.createElement("span");

				modal.classList.add("modal-content");
				title.textContent = "Show";
				username.textContent = user.username;
				email.textContent = user.email;
				btnClose.classList.add("btn-modal-close");
				btnClose.textContent = "x";

				btnClose.addEventListener("click", () => {
					modalMain.style.display = "none";
				});

				modal.append(btnClose, title, username, email);
				modalMain.append(modal);
				modalMain.style.display = "flex";
				console.log("show");
			});

			btnEdit.addEventListener("click", () => {
				modalMain.innerHTML = "";
				let modal = document.createElement("div");
				modal.classList.add("modal-content");
				modal.innerHTML = `
				<span class="btn-modal-close" onclick="closeModal()">x</span>
				<h2>Edit</h2>
				<form id="edit-form" class="form">
            		<label for="username">Username</label>
            		<input type="text" id="username" name="username" value="${user.username}" required>

            		<label for="email">Email</label>
            		<input type="email" id="email" name="email" value="${user.email}" required>

            		<label for="password">Password</label>
            		<input type="password" id="password" name="password" placeholder="******">

            		<input type="text" id="originPassword" name="originPassword" value="${user.password}"
					style="display: none;" required>
					
            		<input type="number" id="uid" name="uid" value="${user.uid}"
					style="display: none;" required>
            	
            		<button type="submit">Edit</button>
        		</form>`;

				let formEdit = modal.querySelector("#edit-form");

				formEdit.addEventListener("submit", async (e) => {
					e.preventDefault();
					if (!confirm("Are you sure you want to Edit user?")) {
						return;
					}

					const username = e.target.username.value;
					const email = e.target.email.value;
					let password = e.target.password.value;
					const originPassword = e.target.originPassword.value;
					const uid = +e.target.uid.value;

					if (password == "") {
						password = originPassword;
					}

					console.log(uid, username, email, password, originPassword);
					try {
						const { data } = await axios.put(
							"http://localhost:3000/api/v1/users/adminupdate",
							{
								uid,
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

						console.log(data);
						if (data.ok) {
							alert("Edited successfully");
						} else {
							alert("Editing error");
						}

						window.location.reload();
					} catch (error) {
						console.log(error);
					}
				});

				modalMain.append(modal);
				modalMain.style.display = "flex";
				console.log("edit fin");
			});

			btnRemove.addEventListener("click", async () => {
				if (!confirm("Are you sure you want to remove this User?")) {
					return;
				}
				try {
					const { data } = await axios.delete(
						`http://localhost:3000/api/v1/users/delete/`,
						{
							data: { data: user },
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					console.log(data);
					getUsers();
				} catch (error) {
					console.log(error);
				}
			});

			tdOption.append(btnShow, btnEdit, btnRemove);
			tr.append(tdId, tdUsername, tdEmail, tdPassword, tdOption);
			tableUsers.appendChild(tr);
		});
	} catch (error) {
		console.log(error);
	}
};

getUsers();
