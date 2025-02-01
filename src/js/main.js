import axios from 'axios';

const apiUrl = 'https://api.github.com/users';
const inputForm = document.getElementById('search-form');
const resultContainer = document.getElementById('result');

// funzione per renderizzare i dati dell'utente
function renderUserData(userData) {
    resultContainer.classList.remove('d-none');

    const userInfo = document.createElement('figure');
    const userName = document.createElement('h1');
    userName.textContent = userData.login;
    let userPic = document.createElement('img');
    userPic.src = userData.avatar_url;

    const userLocation = document.createElement('h2');
    userLocation.textContent = userData.location;
    const userRepos = document.createElement('h3');
    userRepos.textContent = `Public Repos: ${userData.public_repos}`;

    userInfo.appendChild(userName);
    userInfo.appendChild(userPic);
    resultContainer.appendChild(userInfo);
    resultContainer.appendChild(userLocation);
    resultContainer.appendChild(userRepos);

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
