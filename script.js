// =======================================
// Task 1: Verification
// Make sure the script file is running.
// =======================================

// This message should show in the browser console.
console.log("Status Manager Started");

// =======================================
// Setup: grab important elements once
// We will reuse these in many tasks.
// =======================================

var mainTitle = document.getElementById("main-title");       // <h1> at the top
var toggleButton = document.getElementById("toggle-button"); // link that toggles status
var statusDiv = document.getElementById("status-output");    // box that shows status
var timerButton = document.getElementById("timer-button");   // button for timer
var controlPanel = document.getElementById("control-panel"); // box that flashes

// This will hold the id returned by setInterval (Task 10).
var flashIntervalId = null;

// =======================================
// Task 3: Modify Content on Load
// Change the main title text when page loads.
// =======================================

// innerHTML lets us replace the inside of the <h1> tag.
mainTitle.innerHTML = "DOM Project: Ready!";

// =======================================
// Task 4: Manipulate Attributes
// Add a custom data-action attribute to the toggle link.
// =======================================

// setAttribute(name, value) adds or changes an attribute.
toggleButton.setAttribute("data-action", "status-toggle");

// =======================================
// Task 5, 6, 7, 8: Toggle Status Box
// - Show / hide the status box
// - Stop link default behavior
// - Change title background color
// - Add a time stamp when it becomes visible
// =======================================

function toggleStatus(e) {
  // Task 6: Prevent the link from jumping to top or reloading.
  e.preventDefault();

  // Remember if the box was hidden before we toggle it.
  var wasHidden = statusDiv.classList.contains("hidden");

  // Task 5: Toggle the .hidden class to hide or show the box.
  statusDiv.classList.toggle("hidden");

  // Now check if the box is hidden after the toggle.
  var isHiddenNow = statusDiv.classList.contains("hidden");

  // Task 7: Change the title's background color based on visibility.
  // If the box is visible, make the title background yellow.
  if (!isHiddenNow) {
    mainTitle.style.backgroundColor = "yellow";
  } else {
    // If the box is hidden, clear the background color.
    mainTitle.style.backgroundColor = "";
  }

  // Task 8: If it was hidden and now is visible, add a time stamp.
  if (wasHidden && !isHiddenNow) {
    createTimestamp();
  }
}

// Connect the toggleStatus function to the link's click event.
toggleButton.addEventListener("click", toggleStatus);

// =======================================
// Task 8: Dynamic Element Creation
// Make a new <span> with the current time and
// add it inside the status box.
// =======================================

function createTimestamp() {
  // 1. Make a new span element.
  var timeSpan = document.createElement("span");

  // 2. Set its text to the current time.
  //    toLocaleTimeString() returns a human-friendly time.
  timeSpan.innerHTML = " [" + new Date().toLocaleTimeString() + "]";

  // 3. Put the new span at the end of the status box.
  statusDiv.appendChild(timeSpan);
}

// =======================================
// Task 9: Loops and Node Lists
// Turn all list items blue when the page loads.
// =======================================

function highlightListItems() {
  // Get all <li> elements inside the item-list.
  var listItems = document.querySelectorAll("#item-list li");

  // Loop through each item and change its color.
  for (var i = 0; i < listItems.length; i++) {
    // style.color sets the text color directly on the element.
    listItems[i].style.color = "blue";
  }
}

// Run this function once right after the script loads.
highlightListItems();

// =======================================
// Task 10: The Flashing Timer
// Use setInterval and clearInterval to flash
// the control-panel on and off.
// =======================================

function startFlashing() {
  // If the timer is already running, do nothing.
  if (flashIntervalId !== null) {
    return;
  }

  // setInterval runs the function every 500 milliseconds.
  flashIntervalId = setInterval(function () {
    // Toggle .hidden so the panel shows and hides again and again.
    controlPanel.classList.toggle("hidden");
  }, 500);
}

function stopFlashing() {
  // Only stop if the timer is running.
  if (flashIntervalId !== null) {
    // clearInterval stops the repeating timer.
    clearInterval(flashIntervalId);
    flashIntervalId = null;

    // Make sure the panel is visible when we stop.
    controlPanel.classList.remove("hidden");
  }
}

// Bind the timer functions to the timer button events.
// Single click starts the flashing.
timerButton.addEventListener("click", startFlashing);

// Double click stops the flashing.
timerButton.addEventListener("dblclick", stopFlashing);