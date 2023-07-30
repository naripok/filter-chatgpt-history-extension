// CSS selector for the items you want to filter
const selector = "div > ol > li"; // Customize this selector based on your needs

// CSS selector for the container where you want to place the input field
const inputContainerSelector = "nav"; // Customize this selector based on your needs

function waitForElement(selector, callback) {
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
  } else {
    setTimeout(() => waitForElement(selector, callback), 500); // Retry after 500ms
  }
}

// Function to filter the list based on the search term
function filterList(searchTerm, selector) {
  const items = document.querySelectorAll(selector);
  items.forEach((item) => {
    const textContent = item.textContent || item.innerText;
    if (textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.style.display = ""; // Show the item if it matches
    } else {
      item.style.display = "none"; // Hide the item if it doesn't match
    }
  });
}

// Function to create the search input field
function createSearchInput(selector, inputContainerSelector) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search...";
  input.className = "p-2 mt-2 mb-1 rounded text-gray-50 bg-gray-900";
  input.addEventListener("input", (e) => {
    filterList(e.target.value, selector);
  });

  const container = document.querySelector(inputContainerSelector);
  if (container) {
    container.insertBefore(input, container.children[1]); // Add the input field to the specified container
  } else {
    console.warn("Input container not found. Please check the selector.");
  }
}

// Wait for the container to be available, then create the search input field and attach the filtering functionality
waitForElement(inputContainerSelector, () => {
  createSearchInput(selector, inputContainerSelector);
});
