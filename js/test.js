import KanbanAPI from "./api/KanbanAPI.js";
import Kanban from "./view/Kanban.js";
import Timezone from "./view/Timezone.js";
import Authentication from "./view/Authentication.js";
import { timezones, users } from './data/data.js';

/* Helper functions / objects */
// Source: https://javascript.plainenglish.io/unit-test-front-end-javascript-code-without-a-framework-8f00c63eb7d4

// Specific test
function it(description, test) {
  console.log(description); // Log description
  test(); // Execute test
}

// Compare results
function expect(result) {
  return {
    isEqual: function (expected) {
      if (result === expected) {
        console.log("Pass"); // ok
      } else {
        console.error(`Fail: Expected ${expected}, but received ${result}`); // ko
      }
    },
    isExisting: function () {
      if (result) {
        console.log("Pass"); 
      } else {
        console.error(`Fail: Expected existing value, but received ${result}`);
      }
    },
    isNotExisting: function () {
      if (!result) {
        console.log("Pass"); 
      } else {
        console.error(`Fail: Expected notExisting value, but received ${result}`);
      }
    },
  };
}

// test object
const testObject = {
  columns: [
    {
      id: 1,
      items: [] 
    },
    {
      id: 2,
      items: [] 
    },
    {
      id: 3,
      items: [] 
    }
  ]
};

/* Test  */

// Tests on js/api/KanbanAPI.js 
function testKanbanAPI() {
  it("Initial setup", function () {
    const columns = testObject.columns;
    columns.forEach(column => {
      const items = KanbanAPI.getItems(column.id); // items
      expect(items.length).isEqual(column.items.length); // compare lengths
      column.items.forEach(item => {
        expect(items.find(i => i.id === item.id)).isExisting(); // exists?
      });
    });
  });

  it("Return items", function () {
    const columnId = 1;
    const itemsColumn1 = KanbanAPI.getItems(columnId); // column items
    const expectedItemCount = testObject.columns.find(col => col.id === columnId).items.length;
    expect(itemsColumn1.length).isEqual(expectedItemCount); 
  });

  it("Insert new item", function () {
    const newItem = KanbanAPI.insertItem(1, "New Item", "User test"); // Add new item
    expect(typeof newItem === 'object' && newItem !== null).isExisting(); // exists?
  });

  it("Update existing item", function () {
    const newItem = KanbanAPI.insertItem(1, "New Item", "User test"); // Add new item
    const updatedItem = KanbanAPI.updateItem(newItem.id, { content: "New Content" }); // Update item
    expect(updatedItem && updatedItem.content === "New Content").isExisting(); // exists?
  });

  it("Delete item", function () {
    const newItem = KanbanAPI.insertItem(1, "New Item", "User test"); // Add new item
    KanbanAPI.deleteItem(newItem.id); // delete item
    const itemsAfterDeletion = KanbanAPI.getItems(1); 
    expect(itemsAfterDeletion.find(item => item.id === newItem.id)).isNotExisting(); // not exists?
  });
}

// Function to test Kanban.js
function testKanban() {
  it("Render columns", function () {
    const root = document.createElement("div"); // Create a div
    const kanban = new Kanban(root); // Kanban
    const renderedColumns = root.querySelectorAll(".kanban__column").length; // columns
    const expectedColumns = Kanban.columns().length; // expected 
    expect(renderedColumns).isEqual(expectedColumns); 
  });

  it("Add item", function () {
    const root = document.createElement("div"); 
    const kanban = new Kanban(root);
    const initialItemCount = root.querySelector(".kanban__column-items").children.length; // count
    root.querySelector(".kanban__column").querySelector(".kanban__add-item").click(); // add
    const newItemCount = root.querySelector(".kanban__column-items").children.length; // new count
    expect(newItemCount).isEqual(initialItemCount + 1); 
  });
}

// Function to test Timezone.js
function testTimezone() {
  it("Render users", function () {
    const root = document.createElement("div"); 
    const users = [{ id: 1, name: "User", timezone: "GMT+0" }]; // test user
    const timezones = { "GMT+0": 0 }; // test timezone
    const timezoneComponent = new Timezone(root, users, timezones); 
    const renderedUsers = root.querySelectorAll(".user").length; // users
    expect(renderedUsers).isEqual(users.length); 
  });

  it("Render with timezones", function () {
    const root = document.createElement("div"); 
    const timezoneComponent = new Timezone(root, users, timezones); 
    const renderedUsers = root.querySelectorAll(".user").length; 
    const expectedUsers = users.length; // Expected users
    expect(renderedUsers).isEqual(expectedUsers); 
  });

  it("Render with labels", function () {
    const root = document.createElement("div"); 
    const users = [{ id: 1, name: "User", timezone: "GMT+0" }]; // test user
    const timezones = { "GMT+0": 0 }; // test timezone
    const timezoneComponent = new Timezone(root, users, timezones); 
    const userElement = root.querySelector(".user"); 
    const timezoneLabel = userElement.querySelector('.user__time-tz').textContent.trim(); // timezone label
    expect(timezoneLabel).isEqual(users[0].timezone);
  });
}

// Reset local storage before testing
localStorage.clear();

/* Run tests */
testKanbanAPI();
testKanban();
testTimezone();

// Reset local storage after testing
localStorage.clear();

