import axios from 'axios';

const apiUrl = 'https://api.github.com/users';
const inputForm = document.getElementById('search-form');
const resultContainer = document.getElementById('result');

// funzione per renderizzare i dati dell'utente
function renderUserData(userData) {
    // svuoto tutta la sezione
    resultContainer.innerHTML = '';

    // rendo visibile la sezione
    resultContainer.classList.remove('d-none');

    //creo il figure con all'interno avatar e nome utente
    const userInfo = document.createElement('figure');
    userInfo.classList.add('text-center');
    const userName = document.createElement('h1');
    userName.textContent = userData.login;
    let userPic = document.createElement('img');
    userPic.classList.add('pt-2');
    userPic.src = userData.avatar_url;

    //creo nodi di testo per location e repo
    const userLocation = document.createElement('h2');
    userLocation.classList.add('pt-2');
    userLocation.textContent = `Location: ${userData.location}`;
    const userRepos = document.createElement('h3');
    userRepos.textContent = `Public Repository: ${userData.public_repos}`;


    //inserisco avatar e nome nel figure
    userInfo.appendChild(userName);
    userInfo.appendChild(userPic);
    //inserisco tutto nel DOM
    resultContainer.appendChild(userInfo);
    resultContainer.appendChild(userLocation);
    resultContainer.appendChild(userRepos);
}

// funzione per renderizzare in pagina l'errore
function renderError() {
    resultContainer.innerHTML = '';
    resultContainer.classList.remove('d-none');

    const errorMessage = document.createElement('h1');
    errorMessage.classList.add('text-center');
    errorMessage.style.color = 'red';
    errorMessage.textContent = 'Error 404: User not Found'

    resultContainer.appendChild(errorMessage);
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
            renderError();
        });
})
