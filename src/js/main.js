import axios from 'axios';

const apiUrl = 'https://api.github.com/users';
const inputForm = document.getElementById('search-form');
const resultContainer = document.getElementById('result');

// funzione per renderizzare i dati dell'utente
function renderUserData(userData) {
    resultContainer.classList.remove('d-none');
    resultContainer.innerHTML = `
    <figure>
        <h1>${userData.login}</h1>
        <img src="${userData.avatar_url}" alt="profile_pic">
    </figure>
    <h2>${userData.location}</h2>
    <h3>${userData.public_repos}</h3>`;
}

inputForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputUsername = document.getElementById('search-bar').value;
    // console.log(inputUsername.replaceAll(' ', ''));
    inputUsername = inputUsername.replaceAll(' ', '');

    // esegui la chiamata all'endpoint
    axios.get(`${apiUrl}/${inputUsername}`)
        .then(function (response) {
            console.log(response.data);
            renderUserData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
})
