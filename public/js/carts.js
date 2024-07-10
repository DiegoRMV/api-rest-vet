const tableCarts = document.querySelector("#table-carts");
const modalMain = document.querySelector(".modal-main");
let token = user.token;
let allProducts;
let allUsers;

window.addEventListener("click", (event) => {
	if (event.target == modalMain) {
		modalMain.style.display = "none";
	}
});

function closeModal() {
	modalMain.style.display = "none";
}

const fetchProducts = async () => {
	const { data } = await axios.get("http://localhost:3000/api/v1/products");

	const { msg: products } = await data;

	allProducts = products;
};

const fetchUsers = async () => {
	const { data } = await axios.get("http://localhost:3000/api/v1/users", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const { msg: users } = await data;

	allUsers = users;
};

const getCarts = async () => {
	try {
		fetchProducts();
		fetchUsers();
		const { data } = await axios.get("http://localhost:3000/api/v1/carts/all", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const { msg: carts } = await data;

		tableCarts.innerHTML = "";

		carts.forEach((cart) => {
			const user = allUsers.find((user) => user.uid == cart.iduser);
			const product = allProducts.find(
				(product) => product.pid == cart.idproduct
			);

			let tr = document.createElement("tr");
			let tdId = document.createElement("td");
			let tdUser = document.createElement("td");
			let tdProduct = document.createElement("td");
			let tdPrice = document.createElement("td");
			let tdAmount = document.createElement("td");
			let tdTotal = document.createElement("td");
			let tdOption = document.createElement("td");
			tdOption.style.width = "120px";
			let btnShow = document.createElement("button");
			// let btnEdit = document.createElement("button");
			let btnRemove = document.createElement("button");

			tdId.textContent = cart.cid;
			tdUser.textContent = user.username;
			tdProduct.textContent = product.name;
			tdPrice.textContent = product.price;
			tdAmount.textContent = cart.amount;
			tdTotal.textContent = product.price * cart.amount;
			btnShow.innerHTML = `<i class="bi bi-eye"></i>`;
			// btnEdit.innerHTML = `<i class="bi bi-pencil"></i>`;
			btnRemove.innerHTML = `<i class="bi bi-trash"></i>`;

			btnShow.addEventListener("click", () => {
				modalMain.innerHTML = "";
				let modal = document.createElement("div");
				let title = document.createElement("h2");
				let nameUser = document.createElement("h4");
				let nameProduct = document.createElement("h4");
				let price = document.createElement("h4");
				let amount = document.createElement("h4");
				let total = document.createElement("h2");
				let btnClose = document.createElement("span");

				modal.classList.add("modal-content");
				title.textContent = "Show";
				nameUser.textContent = user.username;
				nameProduct.textContent = product.name;
				price.textContent = "$ " + product.price;
				amount.textContent = cart.amount;
				total.textContent = "Total: $" + product.price * cart.amount;
				btnClose.classList.add("btn-modal-close");
				btnClose.textContent = "x";

				btnClose.addEventListener("click", () => closeModal());

				modal.append(
					btnClose,
					title,
					nameUser,
					nameProduct,
					price,
					amount,
					total
				);
				modalMain.append(modal);
				modalMain.style.display = "flex";
				console.log("show - cart");
			});

			btnRemove.addEventListener("click", async () => {
				if (!confirm("Are you sure you want to remove this Cart?")) {
					return;
				}
				try {
					const { data } = await axios.delete(
						`http://localhost:3000/api/v1/carts/delete/`,
						{
							data: { data: cart },
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					console.log(data);
					getCarts();
				} catch (error) {
					console.log(error);
				}
			});
			tdOption.append(btnShow, btnRemove);
			tr.append(tdId, tdUser, tdProduct, tdPrice, tdAmount, tdTotal, tdOption);
			tableCarts.appendChild(tr);
		});
	} catch (error) {
		console.log(error);
	}
};

getCarts();
