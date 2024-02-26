import KanbanAPI from "./api/KanbanAPI.js";
import Kanban from "./view/Kanban.js";
import Timezone from "./view/Timezone.js";
import { timezones, users } from './data/data.js';
import Authentication from "./view/Authentication.js";


/* Timezone board */
if (document.querySelector(".timezone")) {
	new Timezone(
		document.querySelector(".timezone"), // pass the class
		users,
		timezones
	);
}

/* Kanban board */
if (document.querySelector(".kanban")) {
	new Kanban(
		document.querySelector(".kanban") // pass the class
	);
}


/* Authentication */
if (document.querySelector("#login")) {
	new Authentication();
	document.addEventListener("DOMContentLoaded", () => {
		const loginForm = document.querySelector("#login"); 				// Login form
		const createAccountForm = document.querySelector("#createAccount");	// Create account form

		// Create account form
		document.querySelector("#linkCreateAccount").addEventListener("click", e => {
			e.preventDefault();
			loginForm.classList.add("form--hidden");
			createAccountForm.classList.remove("form--hidden");
		});
	});
}
