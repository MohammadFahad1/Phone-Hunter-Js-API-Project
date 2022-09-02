const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    // Display 20 phones only
    phones = phones.slice(0, 10);
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
}

document.getElementById('btn-search').addEventListener('click', function () {
    const searchField = document.getElementById('search-text');
    const searchText = searchField.value;
    loadPhones(searchText);
});

loadPhones(' ');

