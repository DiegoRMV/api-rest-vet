const tableVets = document.querySelector("#table-vets");
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

const getVets = async () => {
	try {
		const { data } = await axios.get("http://localhost:3000/api/v1/vets/", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const { msg: vets } = await data;
		tableVets.innerHTML = "";

		vets.forEach((vet) => {
			let tr = document.createElement("tr");
			let tdId = document.createElement("td");
			let tdName = document.createElement("td");
			let tdEmail = document.createElement("td");
			let tdOption = document.createElement("td");
			tdOption.style.width = "120px";
			let btnShow = document.createElement("button");
			let btnEdit = document.createElement("button");
			let btnRemove = document.createElement("button");

			tdId.textContent = vet.vid;
			tdName.textContent = vet.name;
			tdEmail.textContent = vet.email;
			btnShow.innerHTML = `<i class="bi bi-eye"></i>`;
			btnEdit.innerHTML = `<i class="bi bi-pencil"></i>`;
			btnRemove.innerHTML = `<i class="bi bi-trash"></i>`;

			btnShow.addEventListener("click", () => {
				modalMain.innerHTML = "";
				let modal = document.createElement("div");
				let title = document.createElement("h2");
				let name = document.createElement("h4");
				let email = document.createElement("h4");
				let btnClose = document.createElement("span");

				modal.classList.add("modal-content");
				title.textContent = "Show";
				name.textContent = vet.name;
				email.textContent = vet.email;
				btnClose.classList.add("btn-modal-close");
				btnClose.textContent = "x";

				btnClose.addEventListener("click", () => closeModal());

				modal.append(btnClose, title, name, email);
				modalMain.append(modal);
				modalMain.style.display = "flex";
				console.log("show-vet");
			});

			btnEdit.addEventListener("click", () => {
				modalMain.innerHTML = "";
				let modal = document.createElement("div");
				modal.classList.add("modal-content");
				modal.innerHTML = `
				<span class="btn-modal-close" onclick="closeModal()">x</span>
				<h2>Edit</h2>
				<form id="edit-form" class="form">
            		<label for="name">Name</label>
            		<input type="text" id="name" name="name" value="${vet.name}" required>

            		<label for="email">Email</label>
            		<input type="email" id="email" name="email" value="${vet.email}" required>
					
            		<input type="number" id="vid" name="vid" value="${vet.vid}"
					style="display: none;" required>
            	
            		<button type="submit">Edit</button>
        		</form>`;

				let formEdit = modal.querySelector("#edit-form");

				formEdit.addEventListener("submit", async (e) => {
					e.preventDefault();
					if (!confirm("Are you sure you want to Edit vet?")) {
						return;
					}

					const name = e.target.name.value;
					const email = e.target.email.value;
					const vid = +e.target.vid.value;

					console.log(vid, name, email);
					try {
						const { data } = await axios.put(
							"http://localhost:3000/api/v1/vets/update",
							{
								vid,
								name,
								email,
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
			});

			btnRemove.addEventListener("click", async () => {
				if (!confirm("Are you sure you want to remove this Vet?")) {
					return;
				}
				try {
					const { data } = await axios.delete(
						`http://localhost:3000/api/v1/vets/delete/`,
						{
							data: { data: vet },
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					console.log(data);
					getVets();
				} catch (error) {
					console.log(error);
				}
			});
			tdOption.append(btnShow, btnEdit, btnRemove);
			tr.append(tdId, tdName, tdEmail, tdOption);
			tableVets.appendChild(tr);
		});
	} catch (error) {
		console.log(error);
	}
};

const btnNew = document.querySelector(".btn-new");

btnNew.addEventListener("click", () => {
	modalMain.innerHTML = "";
	let modal = document.createElement("div");
	modal.classList.add("modal-content");
	modal.innerHTML = `
	<span class="btn-modal-close" onclick="closeModal()">x</span>
	<h2>New</h2>
	<form id="add-form" class="form">
		<label for="name">Name</label>
		<input type="text" id="name" name="name" required>

		<label for="email">Email</label>
		<input type="email" id="email" name="email" required>
	
		<button type="submit">Add</button>
	</form>`;

	let addEdit = modal.querySelector("#add-form");

	addEdit.addEventListener("submit", async (e) => {
		e.preventDefault();
		if (!confirm("Confirm")) {
			return;
		}

		const name = e.target.name.value;
		const email = e.target.email.value;

		try {
			const { data } = await axios.post(
				"http://localhost:3000/api/v1/vets/register",
				{
					name,
					email,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(data.msg.vet);
			if (data.ok) {
				alert("Created successfully");
			} else {
				alert("Creation error");
			}

			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	});

	modalMain.append(modal);
	modalMain.style.display = "flex";
});

getVets();
