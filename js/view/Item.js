import DropZone from "./DropZone.js";
import KanbanAPI from "../api/KanbanAPI.js";
import { users } from '../data/data.js';

// Class for a single item in the user interface
export default class Item {

	constructor(id, content, user) { 									

		const bottomDropZone = DropZone.createDropZone();								// In bottomDropZone create the dropzone

		this.elements = {}; 															// new object
		this.elements.root = Item.createRoot();
		this.elements.input = this.elements.root.querySelector(".kanban__item-input"); 	// pass to class .kanban__item-input
        this.elements.userInput = this.elements.root.querySelector(".kanban__user-input"); //pass to class .kanban__user-input

		this.elements.root.dataset.id = id; 											// id passed
		this.elements.input.textContent = content; 										// content passed
		this.elements.userInput.value = user; 											// user passed

		this.content = content; 														// when update, current content value
        this.user = user; 																// when update, current user value

		this.elements.root.appendChild(bottomDropZone); 								// Append the dropzone (the space between items) to the item

		// Click on the item to edit
		const onBlur = () => {
			const newContent = this.elements.input.textContent.trim();
			const newUser = this.elements.userInput.value.trim();
		
			// If nothing changed, do nothing
			if (newContent === this.content && newUser === this.user) {
				return;
			}
		
			// If the content changed, update the content via KanbanAPI
			this.content = newContent;
			this.user = newUser;
		
			KanbanAPI.updateItem(id, {
				content: this.content,
				user: this.user
			});
		
			// Update the value of the user input field
			this.elements.userInput.textContent = this.user;
		};

		// add event listener when unclicking on the item to edit the content or the user
		this.elements.input.addEventListener("blur", onBlur);
		this.elements.userInput.addEventListener("blur", onBlur);


		// Right click -> ask to delete
		this.elements.root.addEventListener("contextmenu", () => {

			// Prompt the user to delete the item
			const check = confirm("Are you sure you want to delete this item?");

			// If confirmed, delete the item
			if (check) {
				KanbanAPI.deleteItem(id);											// delete item from local storage

				this.elements.input.removeEventListener("blur", onBlur); 			// delete events
				this.elements.root.parentElement.removeChild(this.elements.root);	// delete the html
			}

		});

		/* Drag and drop */

		// drag start event
		this.elements.root.addEventListener("dragstart", e => {

			// grab the event object, and set the item id in the dataTransfer
			e.dataTransfer.setData("text/plain", id); 

		});

		// Prevent the default behaviour of the drop event
		this.elements.input.addEventListener("drop", e => {
			e.preventDefault();
		});
	}

	// Return an HTML element to contain basic instruction for a particular item
	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		const userOptions = users.map(user => `<option>${user.username}</option>`).join('');

		return range.createContextualFragment(`
        <div class="kanban__item" draggable="true">
			<div class="kanban__item-input" contenteditable></div>
			<div class="kanban__add-user">
				<input list="users" class="kanban__user-input" placeholder="Select User">
				<datalist id="users">${userOptions}</datalist>
			</div>
        </div>
    	`).children[0];
	}
}
