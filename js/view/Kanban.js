import Column from "./Column.js";

// Class for entry point for the user interface code
export default class Kanban {

	constructor(root) {
		this.root = root;

		// For every column 
		Kanban.columns().forEach(column => {

			// Create an instance of Column class with comumn id and title
			const columnView = new Column(column.id, column.title);

			// Append child created to the root
			this.root.appendChild(columnView.elements.root);
		});
	}

	// Define a static method column, return an array of every column and name
	static columns() {
		return [
			{
				id: 1,
				title: "To DO"
			},
			{
				id: 2,
				title: "DOing"
			},
			{
				id: 3,
				title: "DOne"
			}
		];
	}
}
