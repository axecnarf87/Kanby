import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone {
	
	// Create the html element for the dropzone functionality
	static createDropZone() {
		const range = document.createRange();

		range.selectNode(document.body);

		const dropZone = range.createContextualFragment(`
			<div class="kanban__dropzone"></div>
		`).children[0];

		// Once we have a dropzone and the user dragover it, add the class kanban__dropzone--active to html of the item
		dropZone.addEventListener("dragover", e => {
			e.preventDefault();
			dropZone.classList.add("kanban__dropzone--active");
		});

		// While dragging, when the user leave the dropzone, remove the class kanban__dropzone--active from html of the item
		dropZone.addEventListener("dragleave", () => {
			dropZone.classList.remove("kanban__dropzone--active");
		});

		// When the use drop into a dropzone
		dropZone.addEventListener("drop", e => {
			
			// prevent default behaviour
			e.preventDefault();							

			// Remove the class kanban__dropzone--active
			dropZone.classList.remove("kanban__dropzone--active");

			// constants
			const columnElement = dropZone.closest(".kanban__column");										// which column
			const columnId = Number(columnElement.dataset.id);												// id of the column

			const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));		// array of dropzones in the column
			const droppedIndex = dropZonesInColumn.indexOf(dropZone);										// index of the dropzones (0 is the top one in the column)

			const itemId = Number(e.dataTransfer.getData("text/plain"));									// id of the item
			const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);						// element of the item based on the id
			
			// Where to insert
			// if the dropzone is part of an item in the kanban, this is after the element, otherwise is the top dropzone
			const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone;

			// If you try to drag an item into its own dropzone, do nothing
			if (droppedItemElement.contains(dropZone)) {
				return;
			}

			// add the item dragged after the dropzone
			insertAfter.after(droppedItemElement);

			// Update the local storage, with the new item id, the column id and the position
			KanbanAPI.updateItem(itemId, {
				columnId,
				position: droppedIndex
			});
		});

		return dropZone;
	}
}
