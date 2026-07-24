
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const citySelect = document.getElementById("city");

let allUsers = [];

async function loadUsers() {

    try {

        showLoading();
        
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {

            throw new Error("Failed to fetch users");
        }
        
        const users = await response.json();

        displayUsers(users);

        allUsers = users;

        loadCities(allUsers);


    } catch (error) {

        showError(error.message);

    } finally {

        hideLoading();
    }
}

searchInput.addEventListener("input", function(event) {

    const query = event.target.value.toLowerCase();

    const filteredUsers = allUsers.filter(user =>

        user.name.toLowerCase().includes(query) ||

        user.email.toLowerCase().includes(query)

    );

    displayUsers(filteredUsers);

});

sortSelect.addEventListener("change", function() {

    let sortedUsers = [...allUsers];


    if (sortSelect.value === "asc") {

        sortedUsers.sort((a, b) =>

            a.name.localeCompare(b.name)

        );

    }


    if (sortSelect.value === "desc") {

        sortedUsers.sort((a, b) => 

            b.name.localeCompare(a.name)

        );

    }


    displayUsers(sortedUsers);

});

citySelect.addEventListener("change", function() {

    const selectedCity = citySelect.value;

    const filteredUsers = allUsers.filter(user =>

        selectedCity === "all" ||

        user.address.city === selectedCity

    );

    displayUsers(filteredUsers);

});

function showLoading() {

    loading.classList.remove("hidden");

    container.innerHTML = "";
}

function hideLoading() {

    loading.classList.add("hidden");
}


function showError(message) {

    errorDiv.textContent = `Error: ${message}`;

    errorDiv.classList.remove("hidden");
}

function displayUsers(users) {

    container.innerHTML = users.map(user => `

        <div class="user-card">

            <h2>${user.name}</h2>

            <p>📧 ${user.email}</p>

            <p>🏢 ${user.company.name}</p>

            <p>📍 ${user.address.city}</p>

        </div>

    `).join("");
}

function loadCities(users) {

    const cities = users.map(user => user.address.city);

    const uniqueCities = [...new Set(cities)];


    uniqueCities.forEach(city => {

        citySelect.innerHTML += `

            <option value="${city}">
                ${city}
            </option>

        `;

    });

}

// Initialize

loadUsers();