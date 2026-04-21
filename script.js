// =======================================
// Task 1: Verification
// This message shows in the browser console
// to prove the script is loaded and working.
// =======================================

console.log("Status Manager Started");

// =======================================
// Setup: grab all the page elements once.
// We save them in variables so we don't have
// to search for them every time.
// =======================================

var mainTitle       = document.getElementById("main-title");
var toggleButton    = document.getElementById("toggle-button");
var statusDiv       = document.getElementById("status-output");           // basic box
var statusDivAdv    = document.getElementById("status-output-advanced");  // advanced box
var timerButton     = document.getElementById("timer-button");
var controlPanel    = document.getElementById("control-panel");

// This holds the timer ID so we can stop it later (Task 10).
var flashIntervalId = null;

// =======================================
// Task 3: Modify Content on Load
// Change the main title when the page loads.
// innerHTML lets us write new text into the element.
// =======================================

mainTitle.innerHTML = "DOM Project: Ready!";

// =======================================
// Task 4: Manipulate Attributes
// Add a custom data-action attribute to the link.
// setAttribute(name, value) sets any attribute we want.
// =======================================

toggleButton.setAttribute("data-action", "status-toggle");

// =======================================
// Task 5 + 6 + 7 + 8: Toggle Status Box
// This function runs every time the toggle link
// is clicked. It shows or hides both output boxes
// and calls BOTH timestamp functions at once.
// =======================================

function toggleStatus(e) {

  // Task 6: Stop the link from jumping the page.
  e.preventDefault();

  // Remember if the boxes were hidden BEFORE we toggle.
  var wasHidden = statusDiv.classList.contains("hidden");

  // Task 5: Toggle the .hidden class on BOTH boxes at the same time.
  statusDiv.classList.toggle("hidden");
  statusDivAdv.classList.toggle("hidden");

  // Check if the boxes are hidden NOW (after the toggle).
  var isHiddenNow = statusDiv.classList.contains("hidden");

  // Task 7: Change the title background color.
  // Yellow when visible, cleared when hidden.
  if (!isHiddenNow) {
    mainTitle.style.backgroundColor = "yellow";
  } else {
    mainTitle.style.backgroundColor = "";
  }

// ===========================================================================
// ===========================================================================
// ===========================================================================
// My Project 3 Modification to be able to present to class
// I added a second output box to demonstrate different JavaScript methods

  // Task 8: Add a time stamp only when the boxes just became visible.
  // We call BOTH functions here so both boxes get a stamp at the same time.
  if (wasHidden && !isHiddenNow) {
    createTimestampBasic();     // writes to the blue box
    createTimestampAdvanced();  // writes to the red box
  }

}

// Connect the function to the click event on the toggle link.
toggleButton.addEventListener("click", toggleStatus);

// =======================================
// Task 8 - BASIC VERSION (Class Way)
// Step 1: Create a new element with createElement.
// Step 2: Set its text with innerHTML.
// Step 3: Attach it to the page with appendChild.
// =======================================

function createTimestampBasic() {
  // Step 1: Make a brand new <span> tag (not on the page yet).
  var timeSpan = document.createElement("span");

  // Step 2: Put the current time inside that span.
  timeSpan.innerHTML = " [" + new Date().toLocaleTimeString() + "]";

  // Step 3: Add the span to the end of the BASIC output box.
  statusDiv.appendChild(timeSpan);
}

// =======================================
// Task 8 - ADVANCED VERSION (New Method)
// insertAdjacentHTML lets you drop an HTML string
// directly into the page in one single step.
// This method was NOT covered in class 
// =======================================

function createTimestampAdvanced() {
  // Build the HTML we want to insert as a string.
  var html = " [" + new Date().toLocaleTimeString() + "]";

  // insertAdjacentHTML(position, htmlString)
  // "beforeend" means: go inside this element, at the very end.
  // The browser reads the string and creates the real HTML for us.
  // No separate createElement or appendChild needed.
  statusDivAdv.insertAdjacentHTML("beforeend", "<span>" + html + "</span>");
}
// ===========================================================================
// ===========================================================================
// ===========================================================================

// =======================================
// Task 9: Loops and Node Lists
// Select all list items and turn them blue.
// querySelectorAll returns a list of every match.
// We loop through the list and set each item's color.
// =======================================

function highlightListItems() {
  // Get every <li> inside the item-list.
  var listItems = document.querySelectorAll("#item-list li");

  // Loop through each one and set the text color to blue.
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].style.color = "blue";
  }
}

// Run this once right when the page loads.
highlightListItems();

// =======================================
// Task 10: The Flashing Timer
// setInterval runs a function over and over
// every X milliseconds until we stop it.
// clearInterval uses the saved ID to stop it.
// =======================================

function startFlashing() {
  // Don't start a second timer if one is already running.
  if (flashIntervalId !== null) {
    return;
  }

  // Run this function every 500 milliseconds.
  // Save the returned ID so we can stop it later.
  flashIntervalId = setInterval(function () {
    // Toggle .hidden so the panel blinks on and off.
    controlPanel.classList.toggle("hidden");
  }, 500);
}

function stopFlashing() {
  // Only stop if a timer is actually running.
  if (flashIntervalId !== null) {
    // clearInterval uses the saved ID to cancel the timer.
    clearInterval(flashIntervalId);
    flashIntervalId = null;

    // Make sure the panel is fully visible when we stop.
    controlPanel.classList.remove("hidden");
  }
}

// Single click starts the flashing.
timerButton.addEventListener("click", startFlashing);

// Double click stops the flashing.
timerButton.addEventListener("dblclick", stopFlashing);