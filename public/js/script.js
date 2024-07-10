const btnLogout = document.querySelector("#btn-logout");
const btnUser = document.querySelector("#btn-user");
const adminOptions = document.querySelector("#admin-options");
const formSearch = document.querySelector("#form-search");
const inputSearch = document.querySelector("#input-search");

let user = JSON.parse(localStorage.getItem("user"));

if (!user) {
	btnLogout.disabled = true;
	btnUser.setAttribute("href", "/login");
} else {
	btnLogout.disabled = false;
	btnUser.setAttribute("href", "/profile");
}

if (user && user.role_id == 1) {
	adminOptions.classList.remove("d-none");
} else {
	adminOptions.classList.add("d-none");
}

btnLogout.addEventListener("click", () => {
	localStorage.removeItem("user");
	btnUser.setAttribute("href", "/login");
	window.location.href = "/";
});

// console.log(formSearch, inputSearch);


// formSearch.addEventListener("submit")