export default class timezone {
    constructor(parentElement, users, timezones) {
        // class instance = parameters
        this.parentElement = parentElement;
        this.users = users;
        this.timezones = timezones;

        // call methods
        this.renderUsers();
        this.updateLinePositionForUsers();
        this.addHourLabelsForUsers();

        // Add text at the top to toggle user visibility
        const hideDiv = document.createElement('div');
        hideDiv.textContent = 'Hide/Show Users';
        hideDiv.classList.add('user-hide-toggle');
        hideDiv.addEventListener('click', this.hideUsers.bind(this));
        this.parentElement.insertBefore(hideDiv, this.parentElement.firstChild);

    }

    // Render user element
    /* example HTML rendered:
    <div class="user">
    <div class="user__username">username</div>
    <div class="user__time">
        <div class="user__time-graph">
            <div class="coloured-portion"></div>
        </div>
    </div>
    <div class="user__time-tz"> timezones[user].value </div>
    </div> 
    */

    renderUsers() {
        this.parentElement.innerHTML = "";  // reset content by clearing it

        // Gets offset with the local and utc timezone in case local time is not UTC
        // users timezone are based on difference with UTC
        const browserTimezoneOffset = new Date().getTimezoneOffset() / 60;

        // for each user in the users array 
        this.users.forEach(user => {

            // create div with class user
            const userElement = document.createElement("div");
            userElement.classList.add("user");

            // create div with class user__username
            const usernameElement = document.createElement("div");
            usernameElement.classList.add("user__username");
            usernameElement.textContent = user.username;    // add username
            userElement.appendChild(usernameElement);       // add inside div 'user'

            // create div with class user__time
            const timeElement = document.createElement("div");
            timeElement.classList.add("user__time");
            userElement.appendChild(timeElement);           // add inside div 'user'

            // create div with class user__time-graph
            const graphElement = document.createElement("div");
            graphElement.classList.add("user__time-graph");
            timeElement.appendChild(graphElement);          // add inside div 'user__time' 

            // create div with class user__time-tz
            const timezoneElement = document.createElement("div");
            timezoneElement.classList.add("user__time-tz");
            timezoneElement.textContent = user.timezone;    // add user.timezone
            userElement.appendChild(timezoneElement);       // add inside div 'user'

            this.parentElement.appendChild(userElement);    // add inside timezone element

            /* logic for colouring the part with the user availability */
            // convert user.timezone to float type 
            const timezoneOffset = parseFloat(user.timezone);

            // Convert user.startTime and user.endTime to local time by considering difference with utc and local time
            let adjustedStartTime = user.startTime - timezoneOffset + browserTimezoneOffset;
            let adjustedEndTime = user.endTime - timezoneOffset + browserTimezoneOffset;

            /* Prevent issue when times cross midnight to make sure they are inside user__time-graph */
            // Adjusts adjustedStartTime and adjustedEndTime to 24h
            adjustedStartTime = (adjustedStartTime + 24) % 24;
            adjustedEndTime = (adjustedEndTime + 24) % 24;

            // converts adjustedStartTime and adjustedEndTime to percentage to decide position in coloured portion 
            let startTimePercentage = (adjustedStartTime / 24) * 100;
            let endTimePercentage = (adjustedEndTime / 24) * 100;

            // if the available time cross midnight because startTime is greated than endTime
            // split the coloured part in two
            if (adjustedStartTime > adjustedEndTime) {

                // first part (before midnight)
                const firstPercentage = (24 - adjustedStartTime) / 24 * 100; // calculate and ajudst first part to percentage
                const colouredWidthFirst = graphElement.offsetWidth * (firstPercentage / 100);   // calculate width first part
                const colouredPortionFirst = this.createColoredPortion(startTimePercentage, colouredWidthFirst + 1); // created coloured portion
                graphElement.appendChild(colouredPortionFirst); // add to div user__time-graph

                // second part (after midnight)
                const colouredWidthSecond = graphElement.offsetWidth * (endTimePercentage / 100);
                const colouredPortionSecond = this.createColoredPortion(0, colouredWidthSecond);
                graphElement.appendChild(colouredPortionSecond);

            } else {
                // if times doesn't cross midnight
                // only one coloured part 
                const colouredWidth = (endTimePercentage - startTimePercentage) * (graphElement.offsetWidth / 100);
                const colouredPortion = this.createColoredPortion(startTimePercentage, colouredWidth);
                graphElement.appendChild(colouredPortion);
            }
        });


    }

    // Color the portion inside user__time-graph
    createColoredPortion(leftPercentage, width) {

        // created new div with class 'coloured-portion'
        const colouredPortion = document.createElement("div");
        colouredPortion.classList.add("coloured-portion");

        // apply css style
        colouredPortion.style.width = `${width}px`; // uses template literals to define width
        colouredPortion.style.left = `${leftPercentage}%`; // uses template literals to set where
        return colouredPortion;
    }

    // Create a red line for each '.user__time-graph' showing current time based on local time zone
    updateLinePositionForUsers() {

        // Variables on system clock (local time zone)
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
        const now = new Date();                                 // current time
        const currentHour = now.getHours();                     // hour          
        const currentMinute = now.getMinutes();                 // minute
        const totalMinutes = currentHour * 60 + currentMinute;  // total minutes from midnight

        // selects all '.user__time-graph' elements
        const graphs = document.querySelectorAll('.user__time-graph');

        // for each '.user__time-graph' element
        graphs.forEach(graph => {
            // take width of the '.user__time-graph' element
            const containerWidth = graph.offsetWidth;
            // calculate where to position the line
            const linePositionPercentage = (totalMinutes / (24 * 60)) * 100;
            // set property based on calculation
            graph.style.setProperty('--line-position', `${linePositionPercentage}%`);
        });
    }

    // adds hours 1-24 below .user__time-graph
    addHourLabelsForUsers() {
        // selects all '.user__time-graph' elements
        const graphs = document.querySelectorAll('.user__time-graph');

        // for each '.user__time-graph' element
        graphs.forEach(graph => {
            // for each hour in 24
            for (let hour = 0; hour <= 24; hour++) {
                const label = document.createElement('div');    // create div
                label.textContent = hour;                       // add hour content
                label.classList.add('hour-label');              // add class 'hour-label'
                label.style.left = (hour / 24) * 100 + '%';     // distantiate them
                graph.appendChild(label);                       // add to the '.user__time-graph' element
            }
        });
    }

    hideUsers() {
        const userElements = this.parentElement.querySelectorAll('.user');
        userElements.forEach(user => {
            user.classList.toggle('users--hidden'); // Toggle the 'form--hidden' class
        });
    }

}
