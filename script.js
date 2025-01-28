document.getElementById('upload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        populateCards(jsonData);
    };

    reader.readAsArrayBuffer(file);
});

function populateCards(data) {
    const cardsContainer = document.getElementById('schoolCards');
    cardsContainer.innerHTML = ''; // Clear previous cards

    data.forEach((row, index) => {
        if (index === 0) return; // Skip header row

        const [imageFileName, name, place, postAvailable, contact] = row;

        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = `images/${imageFileName}`;
        image.alt = `${name}'s Image`;
        image.onerror = () => (image.src = 'images/default.jpg'); // Default image if not found

        const namePlace = document.createElement('h2');
        namePlace.textContent = `${name}, ${place}`;

        const post = document.createElement('p');
        post.textContent = `Post Available: ${postAvailable}`;

        const contactInfo = document.createElement('p');
        contactInfo.textContent = `Contact: ${contact}`;

        card.appendChild(image);
        card.appendChild(namePlace);
        card.appendChild(post);
        card.appendChild(contactInfo);

        cardsContainer.appendChild(card);
    });
}
