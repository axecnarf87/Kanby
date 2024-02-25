import KanbanAPI from "./api/KanbanAPI.js";
import Kanban from "./view/Kanban.js";
import Timezone from "./view/Timezone.js";

/* Kanban board */
if (document.querySelector(".kanban")) {
	new Kanban(
		document.querySelector(".kanban") // pass the class
	);
}

/* Kanban board */
if (document.querySelector(".timezone")) {
	new Kanban(
		document.querySelector(".timezone") // pass the class
	);
}

/* Authentication */
if (document.querySelector("#login")) {
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

// test user
// const timezones = [
// 	{ value: "-12:00", label: "(GMT -12:00) Eniwetok, Kwajalein" },
// 	{ value: "-11:00", label: "(GMT -11:00) Midway Island, Samoa" },
// 	{ value: "-10:00", label: "(GMT -10:00) Hawaii" },
// 	{ value: "-09:50", label: "(GMT -9:30) Taiohae" },
// 	{ value: "-09:00", label: "(GMT -9:00) Alaska" },
// 	{ value: "-08:00", label: "(GMT -8:00) Pacific Time (US & Canada)" },
// 	{ value: "-07:00", label: "(GMT -7:00) Mountain Time (US & Canada)" },
// 	{ value: "-06:00", label: "(GMT -6:00) Central Time (US & Canada), Mexico City" },
// 	{ value: "-05:00", label: "(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima" },
// 	{ value: "-04:50", label: "(GMT -4:30) Caracas" },
// 	{ value: "-04:00", label: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz" },
// 	{ value: "-03:50", label: "(GMT -3:30) Newfoundland" },
// 	{ value: "-03:00", label: "(GMT -3:00) Brazil, Buenos Aires, Georgetown" },
// 	{ value: "-02:00", label: "(GMT -2:00) Mid-Atlantic" },
// 	{ value: "-01:00", label: "(GMT -1:00) Azores, Cape Verde Islands" },
// 	{ value: "+00:00", label: "(GMT) Western Europe Time, London, Lisbon, Casablanca" },
// 	{ value: "+01:00", label: "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris" },
// 	{ value: "+02:00", label: "(GMT +2:00) Kaliningrad, South Africa" },
// 	{ value: "+03:00", label: "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg" },
// 	{ value: "+03:50", label: "(GMT +3:30) Tehran" },
// 	{ value: "+04:00", label: "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi" },
// 	{ value: "+04:50", label: "(GMT +4:30) Kabul" },
// 	{ value: "+05:00", label: "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent" },
// 	{ value: "+05:50", label: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi" },
// 	{ value: "+05:75", label: "(GMT +5:45) Kathmandu, Pokhara" },
// 	{ value: "+06:00", label: "(GMT +6:00) Almaty, Dhaka, Colombo" },
// 	{ value: "+06:50", label: "(GMT +6:30) Yangon, Mandalay" },
// 	{ value: "+07:00", label: "(GMT +7:00) Bangkok, Hanoi, Jakarta" },
// 	{ value: "+08:00", label: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong" },
// 	{ value: "+08:75", label: "(GMT +8:45) Eucla" },
// 	{ value: "+09:00", label: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk" },
// 	{ value: "+09:50", label: "(GMT +9:30) Adelaide, Darwin" },
// 	{ value: "+10:00", label: "(GMT +10:00) Eastern Australia, Guam, Vladivostok" },
// 	{ value: "+10:50", label: "(GMT +10:30) Lord Howe Island" },
// 	{ value: "+11:00", label: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia" },
// 	{ value: "+11:50", label: "(GMT +11:30) Norfolk Island" },
// 	{ value: "+12:00", label: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka" },
// 	{ value: "+12:75", label: "(GMT +12:45) Chatham Islands" },
// 	{ value: "+13:00", label: "(GMT +13:00) Apia, Nukualofa" },
// 	{ value: "+14:00", label: "(GMT +14:00) Line Islands, Tokelau" }
// ];


// // Example array of users hardcoded
// const users = [
// 	{ username: "Bugs Bunny", startTime: 22, endTime: 17, timezone: timezones[17].value },
// 	{ username: "Daffy Duck", startTime: 9, endTime: 18, timezone: timezones[16].value },
// 	{ username: "Elmer Fudd", startTime: 10, endTime: 19, timezone: timezones[38].value },
// 	{ username: "Foghorn Leghorn", startTime: 21, endTime: 18, timezone: timezones[16].value },
// 	{ username: "Granny", startTime: 22, endTime: 14, timezone: timezones[7].value },
// 	{ username: "Lola Bunny", startTime: 8, endTime: 17, timezone: timezones[13].value },
// 	{ username: "Marvin the Martian", startTime: 11, endTime: 20, timezone: timezones[6].value },
// 	{ username: "Pepé Le Pew", startTime: 9, endTime: 18, timezone: timezones[16].value },
// 	{ username: "Porky Pig", startTime: 8, endTime: 17, timezone: timezones[8].value },
// 	{ username: "Speedy Gonzales", startTime: 10, endTime: 19, timezone: timezones[26].value },
// 	{ username: "Sylvester the Cat", startTime: 9, endTime: 18, timezone: timezones[34].value },
// 	{ username: "Taz (the Tasmanian Devil)", startTime: 8, endTime: 17, timezone: timezones[1].value },
// 	{ username: "Tweety", startTime: 7, endTime: 16, timezone: timezones[35].value },
// 	{ username: "Wile E. Coyote", startTime: 10, endTime: 19, timezone: timezones[14].value },
// 	{ username: "Road Runner", startTime: 8, endTime: 17, timezone: timezones[22].value },
// 	{ username: "Yosemite Sam", startTime: 9, endTime: 18, timezone: timezones[30].value }
// ];

// function renderUsers() {
//     const parentElement = document.querySelector(".parent");
//     parentElement.innerHTML = ""; // Clear previous content

//     // Get the timezone offset of the browser
//     const browserTimezoneOffset = new Date().getTimezoneOffset() / 60;

//     users.forEach(user => {
//         // Create user element
//         const userElement = document.createElement("div");
//         userElement.classList.add("usertz");

//         // Create username element
//         const usernameElement = document.createElement("div");
//         usernameElement.classList.add("usertz__username");
//         usernameElement.textContent = user.username;
//         userElement.appendChild(usernameElement);

//         // Create time element
//         const timeElement = document.createElement("div");
//         timeElement.classList.add("usertz__time");
//         userElement.appendChild(timeElement);

//         // Create graph element
//         const graphElement = document.createElement("div");
//         graphElement.classList.add("usertz__time__graph");
//         timeElement.appendChild(graphElement);

//         // Create timezone element
//         const timezoneElement = document.createElement("div");
//         timezoneElement.classList.add("usertz__time__tz");
//         timezoneElement.textContent = user.timezone;
//         userElement.appendChild(timezoneElement);

//         // Append user element to parent
//         parentElement.appendChild(userElement);

//         // Calculate the offset based on the user's timezone
//         const timezoneOffset = parseFloat(user.timezone);

//         // Calculate the adjusted start and end times based on the user's timezone offset and the browser's timezone offset
//         let adjustedStartTime = user.startTime - timezoneOffset + browserTimezoneOffset;
//         let adjustedEndTime = user.endTime - timezoneOffset + browserTimezoneOffset;

//         // Normalize adjusted times to be between 0 and 24
//         adjustedStartTime = (adjustedStartTime + 24) % 24;
//         adjustedEndTime = (adjustedEndTime + 24) % 24;

//         // Calculate the width and position of the colored portion
//         let startTimePercentage = (adjustedStartTime / 24) * 100;
//         let endTimePercentage = (adjustedEndTime / 24) * 100;

//         // Check if endTime is less than startTime
//         if (adjustedStartTime > adjustedEndTime) {
//             // Calculate the portion until midnight
//             const midnightPercentage = (24 - adjustedStartTime) / 24 * 100;
//             // Set the width and position of the colored portion until midnight
//             const coloredWidthUntilMidnight = graphElement.offsetWidth * (midnightPercentage / 100);
//             const coloredPortionUntilMidnight = createColoredPortion(startTimePercentage, coloredWidthUntilMidnight);
//             graphElement.appendChild(coloredPortionUntilMidnight);

//             // Calculate the portion from midnight until endTime
//             const coloredWidthFromMidnight = graphElement.offsetWidth * (endTimePercentage / 100);
//             const coloredPortionFromMidnight = createColoredPortion(0, coloredWidthFromMidnight);
//             graphElement.appendChild(coloredPortionFromMidnight);
//         } else {
//             // Set the width and position of the colored portion
//             const coloredWidth = (endTimePercentage - startTimePercentage) * (graphElement.offsetWidth / 100);
//             const coloredPortion = createColoredPortion(startTimePercentage, coloredWidth);
//             graphElement.appendChild(coloredPortion);
//         }
//     });
// }

// // Function to create a colored portion
// function createColoredPortion(leftPercentage, width) {
//     const coloredPortion = document.createElement("div");
//     coloredPortion.classList.add("colored-portion");
//     coloredPortion.style.width = `${width+1}px`;
//     coloredPortion.style.left = `${leftPercentage}%`;
//     return coloredPortion;
// }

// // Call renderUsers to display the users
// renderUsers();



// // Function to update the position of the current time line for each user
// function updateLinePositionForUsers() {
//     // Get the current time
//     const now = new Date();
//     const currentHour = now.getHours();
//     const currentMinute = now.getMinutes();
//     const totalMinutes = currentHour * 60 + currentMinute;

//     // Get all the .usertz__time__graph elements
//     const graphs = document.querySelectorAll('.usertz__time__graph');

//     // Loop through each graph to update the position of the current time line
//     graphs.forEach(graph => {
//         const containerWidth = graph.offsetWidth;
//         const linePositionPercentage = (totalMinutes / (24 * 60)) * 100;
//         graph.style.setProperty('--line-position', `${linePositionPercentage}%`);
//     });
// }

// // Call updateLinePositionForUsers
// updateLinePositionForUsers();

// // Function to add hour labels for each user's time graph
// function addHourLabelsForUsers() {
//     // Get all the .usertz__time__graph elements
//     const graphs = document.querySelectorAll('.usertz__time__graph');

//     // Loop through each graph to add hour labels
//     graphs.forEach(graph => {
//         for (let hour = 0; hour <= 24; hour++) {
//             const label = document.createElement('div');
//             label.textContent = hour;
//             label.classList.add('hour-label');
//             label.style.left = (hour / 24) * 100 + '%';
//             graph.appendChild(label);
//         }
//     });
// }

// // Call addHourLabelsForUsers
// addHourLabelsForUsers();