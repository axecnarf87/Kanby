import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

// Class for a single column in the user interface
export default class Column {
	constructor(id, title) {
		const topDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Column.createRoot(id);
		this.elements.title = this.elements.root.querySelector(".kanban__column-title"); 	// title
		this.elements.items = this.elements.root.querySelector(".kanban__column-items"); 	// items
		this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");		// add button

		this.elements.root.dataset.id = id;				// identify which column id
		this.elements.title.textContent = title;		// title
		this.elements.items.appendChild(topDropZone);	//

		// add listener to add new elements only for the first column
		if (id === 1){
			this.elements.addItem.addEventListener("click", () => {
				const newItem = KanbanAPI.insertItem(id, "");
	
				this.renderItem(newItem);
			});
		}


		KanbanAPI.getItems(id).forEach(item => {
			this.renderItem(item);
		});
	}

	// return an HTML element to contain basic instruction for a particular column
	static createRoot(id) {

		// Using createRange() to generate HTML
			// see example: https://developer.mozilla.org/en-US/docs/Web/API/Range/createContextualFragment
		const range = document.createRange();

		// Identify node with document.body for createContextualFragment
		range.selectNode(document.body);

		// Add button '+ Add' only for first column
		if (id === 1) {
			// Return the HTML for the first column
			return range.createContextualFragment(`
				<div class="kanban__column">
					<div class="kanban__column-title"></div>
					<div class="kanban__column-items"></div>
					<button class="kanban__add-item" type="button">+ Add</button>
				</div>
			`).children[0]; // get the first one
		} else {
			// Return the HTML for the columns after the first
			return range.createContextualFragment(`
				<div class="kanban__column">
					<div class="kanban__column-title"></div>
					<div class="kanban__column-items"></div>
				</div>
			`).children[0]; // get the first one
		}
	}

	renderItem(data) {
		const item = new Item(data.id, data.content);
		this.elements.items.appendChild(item.elements.root);
	}
}