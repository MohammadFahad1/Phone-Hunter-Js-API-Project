const loadPhones = async (searchText, dataLimit) => {

    toggleSpinner(true);
    // Start Loading Spinner

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';

    // Show Not Found Message
    const noPhone = document.getElementById('not-found-msg');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    } else {
        noPhone.classList.add('d-none');
    }

    // Display 20 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, dataLimit);
        showAll.classList.remove('d-none')
    } else {
        showAll.classList.add('d-none');
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below.</p>
            </div>
        </div> 
        `;
        phonesContainer.appendChild(phoneDiv);
    });

    // Stop Spinner Loader
    toggleSpinner(false)
}

const processSearch = (dataLimit) => {
    // Start Loader Spinner
    toggleSpinner(true);
    const searchField = document.getElementById('search-text');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);
});

// Not the best way to load all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
        loaderSection.classList.add('d-flex');
    } else {
        loaderSection.classList.remove('d-flex');
        loaderSection.classList.add('d-none');
    }
}

// We are loading reno series phones by default
loadPhones('reno');

