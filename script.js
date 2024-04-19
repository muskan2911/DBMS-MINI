let patentType = null; // Variable to store the selected patent type

function setPatentType(type) {
  patentType = type; // Set the selected patent type
  // Get references to the buttons
  const productButton = document.getElementById("productButton");
  const designButton = document.getElementById("designButton");

  // Remove the 'active' class from both buttons
  productButton.classList.remove("active");
  designButton.classList.remove("active");

  // Add the 'active' class to the clicked button
  if (type === 'product') {
    productButton.classList.add("active");
  } else if (type === 'design') {
    designButton.classList.add("active");
  }

  // Call search function to update patent list based on new patent type
  search();
}

function search() {
  const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  const patentList = document.getElementById("patentList");
  patentList.innerHTML = ""; // Clear previous search results

  // Send AJAX request to fetch patents from the server
  fetch(`/patents?searchInput=${searchInput}&patentType=${patentType}`)
    .then(response => response.json())
    .then(patents => {
      // Display fetched patents
      patents.forEach(patent => {
        const patentItem = document.createElement("div");
        patentItem.classList.add("patent-item");
        patentItem.innerHTML = `
          <h2>${patent.title}</h2>
          <p>Patent ID: ${patent.id}</p>
          <p>Authors: ${patent.authors.join(", ")}</p>
          <p>Department: ${patent.department}</p>
          <p>Date Published: ${patent.datePublished}</p>
        `;
        patentList.appendChild(patentItem);
      });

      // If no patents found
      if (patents.length === 0) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No patents found.";
        patentList.appendChild(noResultsMessage);
      }
    })
    .catch(error => {
      console.error('Error fetching patents:', error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "An error occurred while fetching patents. Please try again later.";
      patentList.appendChild(errorMessage);
    });
}
