// Global variables - General
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");

// Global variables - Modal
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// Getting Data - Fetch
fetch(urlAPI)
    .then(result => result.json())
    .then(data => data.results)
    .then(displayEmployees)
    .catch(error => console.error(error))


// Display employees to HTML
function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture

        employeeHTML += `
        <div class="card" data-index="${index}">
        <img src="${picture.large}" class="avatar" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
        `;
    });

    // Append the final HTML to the grid container
    gridContainer.innerHTML = employeeHTML;
}

// Display an employee in modal window
function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
    <img src="${picture.large}" class="avatar" />
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street.name}, ${state} ${postcode}</p>
      <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;

    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
    console.log(employees[index]);
}

// Event listener when a card is clicked
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card")
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

// Event listener when the close button is clicked
modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});