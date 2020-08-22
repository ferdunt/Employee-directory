// Global variables - General
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const search = document.querySelector(".search");

// Global variables - Modal
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalNext = document.querySelector(".modal-next");
const modalBack = document.querySelector(".modal-back");

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
    <img src="${picture.large}" class="avatar" data-index="${index}" />
    <div class="text-container">
      <h2 class="m_name">${name.first} ${name.last}</h2>
      <p class="m_email">${email}</p>
      <p class="m_address">${city}</p>
      <hr />
      <p class="m_phone">${phone}</p>
      <p class="m_address">${street.number} ${street.name}, ${state} ${postcode}</p>
      <p class="m_birthday">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;

    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
}

// Event listener when a CARD is clicked
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        // We call the modal windows with the respective index
        displayModal(index);
    }
});

// Event listener when the CLOSE button is clicked
modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

// Event listener when the NEXT button is clicked
modalNext.addEventListener('click', e => {
    const card = e.target.nextElementSibling.firstElementChild;
    const indexString = card.getAttribute("data-index");

    // Increase the index by 1
    let index = parseInt(indexString) + 1;

    // If the index is the last item we reset the index to 0
    if (index === 12) {
        index = 0;
    }

    // We call the modal windows with the respective index
    displayModal(index)
});

// Event listener when the BACK button is clicked
modalBack.addEventListener('click', e => {
    const card = e.target.nextElementSibling.nextElementSibling.firstElementChild;
    const indexString = card.getAttribute("data-index");

    // Decrease the index by 1
    let index = parseInt(indexString) - 1;

    // If the index is the last item we go to the last index
    if (index === -1) {
        index = 11;
    }

    // We call the modal windows with the respective index
    displayModal(index)
});

// Event listener for searching
search.addEventListener('keyup', e => {
    // Get the value of the search input and convert to lowerCase
    let text = e.target.value.toLowerCase();

    // Create a regular expression with the text 
    const regularExpression = new RegExp(text, 'g');

    // We get all the data loaded in the DOM with the class name
    const currentUsers = document.querySelectorAll(".name");

    // Loop in the data loaded
    currentUsers.forEach((element) => {
        // Get and convert the text inside the element to lowercase
        let name = element.innerHTML.toLowerCase();

        // We get the parent element since currentUsers
        let parent = element.parentElement.parentElement;

        // We evaluate each name with the regular expression
        let dataFound = name.search(regularExpression)

        // We check if there is a valid patern in the dataFound
        if (dataFound === -1) {
            parent.style.display = 'none';
        } else {
            parent.style.display = 'flex';
        }
    });
});

