const tableProducts = document.querySelector("#table-products");
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

const getProducts = async () => {
	try {
		const { data } = await axios.get("http://localhost:3000/api/v1/products/");

		const { msg: products } = await data;

		tableProducts.innerHTML = "";

		products.forEach((product) => {
			let tr = document.createElement("tr");
			let tdId = document.createElement("td");
			let tdName = document.createElement("td");
			let tdPrice = document.createElement("td");
			let tdCategory = document.createElement("td");
			let tdDescription = document.createElement("td");
			let tdImages = document.createElement("td");
			let tdOption = document.createElement("td");
			tdOption.style.width = "120px";
			let btnShow = document.createElement("button");
			let btnEdit = document.createElement("button");
			let btnRemove = document.createElement("button");

			let productClean = JSON.stringify(product.images);
			productClean = productClean.replaceAll("[", "");
			productClean = productClean.replaceAll("]", "");
			productClean = productClean.replaceAll(/["]/g, "");
			let imagesArray = productClean.split(",");
			productClean = productClean.replaceAll(",", " ");

			tdId.textContent = product.pid;
			tdName.textContent = product.name;
			tdPrice.textContent = product.price;
			tdCategory.textContent = product.category;
			tdDescription.textContent = product.description;
			tdImages.textContent = productClean;
			btnShow.innerHTML = `<i class="bi bi-eye"></i>`;
			btnEdit.innerHTML = `<i class="bi bi-pencil"></i>`;
			btnRemove.innerHTML = `<i class="bi bi-trash"></i>`;

			btnShow.addEventListener("click", () => {
				modalMain.innerHTML = "";
				let modal = document.createElement("div");
				let title = document.createElement("h2");
				let name = document.createElement("h4");
				let price = document.createElement("h4");
				let category = document.createElement("h4");
				let description = document.createElement("h5");
				let btnClose = document.createElement("span");

				modal.classList.add("modal-content");
				title.textContent = "Show";
				name.textContent = product.name;
				price.textContent = "$ " + product.price;
				category.textContent = product.category;
				description.textContent = product.description;
				btnClose.classList.add("btn-modal-close");
				btnClose.textContent = "x";

				btnClose.addEventListener("click", () => closeModal());

				modal.append(btnClose, title, name, price, category, description);
				modalMain.append(modal);
				modalMain.style.display = "flex";
				console.log("show - product");
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
                    <input type="text" name="name" id="name" value="${product.name}" required>
                   
                    <label for="price">Price</label>
                    <input type="number" pattern="[0-9]{1,}\.[0-9]{1,}" name="price" id="price" value="${product.price}" required>
                    
                    <label for="category">Category</label>
                    <input type="text" name="category" id="category" value="${product.category}" required>
                    
                    <label for="description">Description</label>
                    <textarea name="description" id="description" rows="4" required>${product.description}</textarea>
                    
                    <div class="drop-area" id="drop-area">
                        Drag and drop files here or click to select
                    </div>
                    <input type="file" id="images" name="images" multiple style="display: none;">
					
					<input type="number" id="pid" name="pid" value="${product.pid}" style="display: none;"
					required>
					
					<input type="text" id="oldimages" name="oldimages" value="${imagesArray}"
					style="display: none;" required>
					
                    <div class="file-list" id="file-list"></div>
                    <button type="submit">Send</button>
                </form>`;

				const editForm = modal.querySelector("#edit-form");
				const dropArea = modal.querySelector("#drop-area");
				const fileInput = modal.querySelector("#images");
				const fileList = modal.querySelector("#file-list");

				editForm.addEventListener("submit", async (e) => {
					e.preventDefault();
					if (!confirm("Are you sure you want to Edit Product?")) {
						return;
					}

					let formData = new FormData(editForm);

					console.log(
						e.target.pid.value,
						e.target.name.value,
						e.target.price.value,
						e.target.category.value,
						e.target.description.value,
						e.target.oldimages.value,
						e.target.images.files
					);
					try {
						const { data } = await axios.put(
							"http://localhost:3000/api/v1/products/update",
							formData,
							{
								headers: {
									"Content-Type": "multipart/form-data",
									Authorization: `Bearer ${token}`,
								},
							}
						);
						console.log(data.msg.product);
						if (data.ok) {
							alert("Edited successfully");
						} else {
							alert("Editing error");
						}

						window.location.reload();
					} catch (error) {
						console.log("error");
						console.log(error);
					}
				});

				dropArea.addEventListener("dragover", (e) => {
					e.preventDefault();
					dropArea.classList.add("highlight");
				});

				dropArea.addEventListener("dragleave", () => {
					dropArea.classList.remove("highlight");
				});

				dropArea.addEventListener("drop", (e) => {
					e.preventDefault();
					dropArea.classList.remove("highlight");

					let files = e.dataTransfer.files;
					fileInput.files = files;
					displayFiles(files);
				});

				dropArea.addEventListener("click", () => {
					fileInput.click();
				});

				fileInput.addEventListener("change", () => {
					displayFiles(fileInput.files);
				});

				function displayFiles(files) {
					fileList.innerHTML = "";

					for (let i = 0; i < files.length; i++) {
						const fileItem = document.createElement("p");
						fileItem.textContent = files[i].name;
						fileList.appendChild(fileItem);
					}
				}

				modalMain.append(modal);
				modalMain.style.display = "flex";
			});

			btnRemove.addEventListener("click", async () => {
				if (!confirm("Are you sure you want to remove this Product?")) {
					return;
				}
				try {
					const { data } = await axios.delete(
						`http://localhost:3000/api/v1/products/delete`,
						{
							data: { data: product },
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					console.log(data);
					getProducts();
				} catch (error) {
					console.log(error);
				}
			});
			tdOption.append(btnShow, btnEdit, btnRemove);
			tr.append(
				tdId,
				tdName,
				tdPrice,
				tdCategory,
				tdDescription,
				tdImages,
				tdOption
			);
			tableProducts.appendChild(tr);
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
		<input type="text" name="name" id="name" required>
	   
		<label for="price">Price</label>
		<input type="number" pattern="[0-9]{1,}\.[0-9]{1,}" name="price" id="price" required>
		
		<label for="category">Category</label>
		<input type="text" name="category" id="category" required>
		
		<label for="description">Description</label>
		<textarea name="description" id="description" rows="4" required></textarea>
		
		<div class="drop-area" id="drop-area">
			Drag and drop files here or click to select
		</div>
		<input type="file" id="images" name="images" multiple style="display: none;" required>
		<div class="file-list" id="file-list"></div>

		<button type="submit">Add</button>
	</form>`;

	const addForm = modal.querySelector("#add-form");
	const dropArea = modal.querySelector("#drop-area");
	const fileInput = modal.querySelector("#images");
	const fileList = modal.querySelector("#file-list");

	addForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		if (!confirm("Confirmar")) {
			return;
		}

		let formData = new FormData(addForm);

		try {
			const { data } = await axios.post(
				"http://localhost:3000/api/v1/products/register",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(data.msg.product);
			if (data.ok) {
				alert("Created successfully");
			} else {
				alert("Creation error");
			}

			window.location.reload();
		} catch (error) {
			console.log("error");
			console.log(error);
		}
	});

	dropArea.addEventListener("dragover", (e) => {
		e.preventDefault();
		dropArea.classList.add("highlight");
	});

	dropArea.addEventListener("dragleave", () => {
		dropArea.classList.remove("highlight");
	});

	dropArea.addEventListener("drop", (e) => {
		e.preventDefault();
		dropArea.classList.remove("highlight");

		let files = e.dataTransfer.files;
		fileInput.files = files;
		displayFiles(files);
	});

	dropArea.addEventListener("click", () => {
		fileInput.click();
	});

	fileInput.addEventListener("change", () => {
		displayFiles(fileInput.files);
	});

	function displayFiles(files) {
		fileList.innerHTML = "";

		for (let i = 0; i < files.length; i++) {
			const fileItem = document.createElement("p");
			fileItem.textContent = files[i].name;
			fileList.appendChild(fileItem);
		}
	}

	modalMain.append(modal);
	modalMain.style.display = "flex";
});

getProducts();
