const containerModal = document.querySelector(".container-modal");
const modalDetail = document.querySelector(".modal-detail");
const btnClose = document.querySelector(".btn-close");

async function loading() {
	const { data } = await axios.get("http://localhost:3000/api/v1/products");
	const { msg: products } = await data;

	products.forEach((product) => {
		let container = document.createElement("div");
		container.classList.add("card-container");
		container.innerHTML = `<article class="card-main"> <div class="header-card"> <img src="http://localhost:3000/uploads/images/${product.images[0]}" alt="${product.name}"> </div> <div class="body-card"> <h2>${product.name}</h2> <h3>Descripcion</h3> <p>${product.description}</p> </div><div class="footer-card"> <button class='btn-seemore' id='${product.pid}'>Ver producto</a> </div> </article>`;
		let containerProducts = document.querySelector(".container-products");
		containerProducts.appendChild(container);
	});
	const btnSeeMore = document.querySelectorAll(".btn-seemore");
	btnSeeMore.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			let idpro = e.target.id;
			containerModal.style.display = "flex";
			details(products, idpro);
		});
	});
}

function mostrar(etiqueta) {
	etiqueta.classList.remove("oculto");
	etiqueta.classList.add("mostrar");
	etiqueta.classList.remove("ocultar");
}
function ocultar(etiqueta) {
	etiqueta.classList.remove("mostrar");
	etiqueta.classList.add("ocultar");
}

async function details(products, idProduct) {
	let product = await products.find((product) => product.pid == idProduct);

	console.log(product);

	// Obtenemos la img principal
	const mainIMG = document.getElementById("img_main");
	// Obtenemos el container de imagenes
	const contIMG = document.getElementById("container_img");

	mainIMG.innerHTML = "";
	contIMG.innerHTML = "";
	// CARGARMOS LAS FOTOS
	for (i = 0; i < product.images.length; i++) {
		let container = document.createElement("li");
		container.innerHTML = `<img class="img_opt" src="http://localhost:3000/uploads/images/${product.images[i]}" alt="imagen de ${product.name}">`;
		if (i == 0) {
			mainIMG.src = "http://localhost:3000/uploads/images/" + product.images[i];
			container.classList.add("img_elegida");
		}
		contIMG.appendChild(container);
	}

	// CARGAMOS EL TTULO, LA DESCRIPCION Y EL PRECIO

	const display_titulo = document.getElementById("producto_titulo");
	const display_desc = document.getElementById("producto_desc");
	const display_precio = document.getElementById("producto_precio");
	const btnAddCart = document.querySelector(".add");

	display_titulo.innerText = product.name;
	display_desc.innerText = product.description;
	display_precio.innerHTML = product.price;
	btnAddCart.id = product.pid;

	// DAMOS FUNCIONALIDAD AL BOTON DE  AGREGAR AL CARRITO

	btnAddCart.addEventListener("click", async (e) => {
		e.preventDefault();

		if (!user) {
			window.location.href = "/login";
		}

		let token = await user.token;

		console.log(e.target.id);

		const { data } = await axios.post(
			"http://localhost:3000/api/v1/carts/register",
			{
				idProduct: +e.target.id,
				amount: 1,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const { msg: product } = await data;
		console.log(product);

		// const modal = document.getElementById("modal");
		// mostrar(modal);
		// setTimeout(() => {
		// 	ocultar(modal);
		// }, 2000);
	});

	const optIMG = document.querySelectorAll(".img_opt");

	mainIMG.classList;

	optIMG.forEach((element) => {
		element.addEventListener("click", (e) => {
			let imgTarget = e.target.src;
			let imgMain = mainIMG.src;
			const elegida = document.querySelectorAll(".img_elegida");
			elegida.forEach((element) => {
				element.classList.remove("img_elegida");
			});

			e.target.parentElement.classList.add("img_elegida");
			mainIMG.src = imgTarget;
		});
	});
}

btnClose.addEventListener("click", () => {
	containerModal.style.display = "none";
});

window.addEventListener("click", (event) => {
	if (event.target == containerModal) {
		containerModal.style.display = "none";
	}
});

loading();
