document.getElementById('addPatentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Collect form data
    const formData = new FormData(this);
  
    // Send form data to server via AJAX
    fetch('/add-patent', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert('Patent added successfully!');
      // Optionally, redirect or perform any other action upon successful addition
    })
    .catch(error => {
      console.error('Error adding patent:', error);
      alert('An error occurred while adding the patent. Please try again.');
    });
  });
  