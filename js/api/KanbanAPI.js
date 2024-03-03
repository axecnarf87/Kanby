// API for Local Storage handling

// consts refactory
const localStorageName = "kanban-data";

// Export default class to import class into js files
export default class KanbanAPI { 
	// Static methods

	// Get all items for a particular column
	// Pass the column id
	// Return array with column's items
	static getItems(columnId) {
		const column = 	read()  								// Read from local storage (this is an obj)
						.find(column => column.id == columnId); // Find method, search for column.id = columnId, add to column constant

		// If no column, return empty array
		if (!column) {
			return [];
		}

		// Return array with items 
		return column.items;
	}

	// Insert a new item
	// pass column id and content
	static insertItem(columnId, content, user) {
		const data = read(); 										// Read the data from local storage
		const column = data.find(column => column.id == columnId);	// Find the column

		const item = {												// New item object
			id: Math.floor(Math.random() * 100000),						// Generate id randomly
			content,
			user
		};

		// Error: if the column doesn't exist
		if (!column) {
			throw new Error("Column does not exist.");
		}

		// add the new item to the bottom of the list
		column.items.push(item);
		// Save the new data to the local storage
		save(data); 

		// return the newly created item
		return item;
	}

	// Update an existing item
	// Pass the id of the item, and the obj newProps (content, column and the new position)
	static updateItem(itemId, newProps) {

		// ** arg1: itemId -> identify the item **
		
		// Read the data from local storage
		const data = read(); 							

		// Array destructuring (extracting multiple values from data stored)
		const [item, currentColumn] = (() => {			

			for (const column of data) {			// for every column inside data	(which is an array of objs)			
				const item = column.items.find(item => item.id == itemId);	// Identify the item with the same id passed

				if (item) { // if we find the item
					return [item, column];			// return the array: column = currentColumn
				}
			}
		})();

		if (!item) {
			throw new Error("Item not found.");
		}

		// ** arg2: newProps -> update the content**

		// If we don't find the newProps arg, we keep the current content, otherwise we use newProps
		item.content = newProps.content === undefined ? item.content : newProps.content;

		// added to consider also user assigned
		item.user = newProps.user === undefined ? item.user : newProps.user;

		/* Update column and position */

		// if you provide a new column and position
		if (
			newProps.columnId !== undefined
			&& newProps.position !== undefined // position in the column itself
		) {

			// 
			const targetColumn = data.find(column => column.id == newProps.columnId);

			// if there is no target column
			if (!targetColumn) {
				throw new Error("Target column not found.");
			}

			// Delete the item from it's current column
			currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

			// Move item into it's new column and position
			targetColumn.items.splice(newProps.position, 0, item);
		}

		// Save to local storage
		save(data);
		return item;
	}

	/* Delete an existing item */ 
	static deleteItem(itemId) {

		// Read data from local storage
		const data = read();

		// Identify the data
		for (const column of data) {
			const item = column.items.find(item => item.id == itemId);

			// If item is found, delete item
			if (item) {
				column.items.splice(column.items.indexOf(item), 1);
			}
		}

		// save to local storage
		save(data);
	}
}


// Basic Functions

// Read from local storage
function read() {
	const json = localStorage.getItem(localStorageName); // local storage

	// If there is no data, use default data --> First time for the user
	if (!json) {
		return [
			// TO DO column
			{
				id: 1,
				items: []
			},
			// DOING column
			{
				id: 2,
				items: []
			},
			// DONE column
			{
				id: 3,
				items: []
			},
		];
	}

	// Return the parsed data to the kanban board
	return JSON.parse(json);
}

// Add new data to the local storage
function save(data) {
	// Parse the data and add to the local storage
	localStorage.setItem(localStorageName, JSON.stringify(data));
}
