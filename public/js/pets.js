const tablePets = document.querySelector("#table-pets");
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

const getPets = async () => {
	try {
		const { data } = await axios.get("http://localhost:3000/api/v1/pets", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const { msg: pets } = await data;

		tablePets.innerHTML = "";

		pets.forEach((pet) => {
			let tr = document.createElement("tr");
			let tdId = document.createElement("td");
			let tdName = document.createElement("td");
			let tdSpecies = document.createElement("td");
			let tdBreed = document.createElement("td");
			let tdOwner = document.createElement("td");
			let tdOption = document.createElement("td");
			tdOption.style.width = "120px";
			let btnShow = document.createElement("button");
			let btnEdit = document.createElement("button");
			let btnRemove = document.createElement("button");

			tdId.textContent = pet.pid;
			tdName.textContent = pet.name;
			tdSpecies.textContent = pet.species;
			tdBreed.textContent = pet.breed;
			tdOwner.textContent = pet.owner;
			btnShow.innerHTML = `<i class="bi bi-eye"></i>`;
			btnEdit.innerHTML = `<i class="bi bi-pencil"></i>`;
			btnRemove.innerHTML = `<i class="bi bi-trash"></i>`;

			btnShow.addEventListener("click", () => {
				modalMain.innerHTML = "";
				let modal = document.createElement("div");
				let title = document.createElement("h2");
				let name = document.createElement("h4");
				let species = document.createElement("h4");
				let breed = document.createElement("h4");
				let owner = document.createElement("h4");
				let btnClose = document.createElement("span");

				modal.classList.add("modal-content");
				title.textContent = "Show";
				name.textContent = pet.name;
				species.textContent = pet.species;
				breed.textContent = pet.breed;
				owner.textContent = pet.owner;
				btnClose.classList.add("btn-modal-close");
				btnClose.textContent = "x";

				btnClose.addEventListener("click", () => closeModal());

				modal.append(btnClose, title, name, species, breed, owner);
				modalMain.append(modal);
				modalMain.style.display = "flex";
				console.log("show - pet");
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
            		<input type="text" id="name" name="name" value="${pet.name}" required>

            		<label for="species">Species</label>
            		<input type="text" id="species" name="species" value="${pet.species}" required>

            		<label for="breed">Breed</label>
            		<input type="text" id="breed" name="breed" value="${pet.breed}" required>

            		<label for="owner">Owner</label>
            		<input type="number" id="owner" name="owner" value="${pet.owner}" required disabled>
					
            		<input type="number" id="pid" name="pid" value="${pet.pid}"
					style="display: none;" required disabled>
            	
            		<button type="submit">Edit</button>
        		</form>`;

				let formEdit = modal.querySelector("#edit-form");

				formEdit.addEventListener("submit", async (e) => {
					e.preventDefault();
					if (!confirm("Are you sure you want to Edit pet?")) {
						return;
					}

					const name = e.target.name.value;
					const species = e.target.species.value;
					const breed = e.target.breed.value;
					const owner = +e.target.owner.value;
					const pid = +e.target.pid.value;

					console.log(pid, name, species, breed, owner);
					try {
						const { data } = await axios.put(
							"http://localhost:3000/api/v1/pets/update",
							{
								pid,
								name,
								species,
								breed,
								owner,
							},
							{
								headers: {
									Authorization: `Bearer ${token}`,
								},
							}
						);
						

						console.log(data.msg);
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
				if (!confirm("Are you sure you want to remove this Pet?")) {
					return;
				}
				try {
					const { data } = await axios.delete(
						`http://localhost:3000/api/v1/pets/delete`,
						{
							data: { data: pet },
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					console.log(data);
					getPets();
				} catch (error) {
					console.log(error);
				}
			});

			tdOption.append(btnShow, btnEdit, btnRemove);
			tr.append(tdId, tdName, tdSpecies, tdBreed, tdOwner, tdOption);
			tablePets.appendChild(tr);
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
	<h2>Edit</h2>
	<form id="add-form" class="form">
		<label for="name">Name</label>
		<input type="text" id="name" name="name" required">

		<label for="species">Species</label>
		<input type="text" id="species" name="species" required">

		<label for="breed">Breed</label>
		<input type="text" id="breed" name="breed" required">

		<label for="owner">Owner</label>
		<input type="number" id="owner" name="owner" value="1" disabled required>

		<button type="submit">Add</button>
	</form>`;

	let addEdit = modal.querySelector("#add-form");

	addEdit.addEventListener("submit", async (e) => {
		e.preventDefault();
		if (!confirm("Confirm")) {
			return;
		}

		const name = e.target.name.value;
		const species = e.target.species.value;
		const breed = e.target.breed.value;
		const owner = +e.target.owner.value;

		try {
			const { data } = await axios.post(
				"http://localhost:3000/api/v1/pets/register",
				{
					name,
					species,
					breed,
					owner,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(data.msg.pet);
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

getPets();
