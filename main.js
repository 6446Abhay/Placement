// main.js

// Function to handle Excel file upload on the admin page
function uploadExcel() {
    const fileInput = document.getElementById("uploadExcel");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an Excel file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Save data to localStorage
        localStorage.setItem("placementData", JSON.stringify(jsonData));
        document.getElementById("statusMessage").innerText = "Excel file uploaded successfully!";
    };
    reader.readAsArrayBuffer(file);
}

// Function to handle Image file upload on the admin page
function uploadImage() {
    const fileInput = document.getElementById("uploadImage");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const imageUrl = e.target.result;
        // Save image URL to localStorage (or upload to server in a real app)
        localStorage.setItem("uploadedImage", imageUrl);
        document.getElementById("statusMessage").innerText = "Image uploaded successfully!";
    };
    reader.readAsDataURL(file);
}

// Function to load and display placement data on the placement page
function loadPlacementData() {
    const storedData = localStorage.getItem("placementData");
    if (!storedData) {
        alert("No Excel file uploaded. Please upload one in the Admin Panel.");
        return;
    }

    const jsonData = JSON.parse(storedData);
    const container = document.getElementById("photo-container");
    container.innerHTML = ""; // Clear old content

    jsonData.forEach(item => {
        const card = document.createElement("div");
        card.className = "photo-card";
        card.innerHTML = `
            <img src="${item['Image URL'] || 'uploads/default-image.jpg'}" alt="${item['School Name'] || 'No School Name'}">
            <p><strong>School Name:</strong> ${item['School Name'] || 'N/A'}</p>
            <p><strong>Placement Available:</strong> ${item['Placement Available'] || 'N/A'}</p>
            <p><strong>Contact No:</strong> ${item['Contact No'] || 'N/A'}</p>
        `;
        container.appendChild(card);
    });
}

// Call the loadPlacementData function when the page loads
window.onload = function () {
    if (window.location.pathname.includes("placement.html")) {
        loadPlacementData();
    }
};
