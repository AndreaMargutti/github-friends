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
    const userLink = document.createElement('a');
    userLink.classList.add('d-block', 'pt-2');
    userLink.href = userData.html_url;
    userLink.textContent = 'My GitHub Personal Page'

    //creo nodi di testo per location e repo
    const userLocation = document.createElement('h2');
    userLocation.classList.add('pt-2');
    if (!(userData.location === null)) {
        userLocation.textContent = `Location: ${userData.location}`;
    } else {
        userLocation.textContent = `Location: not available`
    }
    const userRepos = document.createElement('h3');
    userRepos.textContent = `Public Repository: ${userData.public_repos}`;

    //inserisco avatar e nome nel figure
    userInfo.appendChild(userName);
    userInfo.appendChild(userPic);
    userInfo.appendChild(userLink);
    //inserisco tutto nel DOM
    resultContainer.appendChild(userInfo);
    resultContainer.appendChild(userLocation);
    resultContainer.appendChild(userRepos);
}

// funzione per renderizzare in pagina l'errore
function renderError() {
    resultContainer.innerHTML = '';
    resultContainer.classList.remove('d-none');

    const errorDisplay = document.createElement('figure');
    errorDisplay.classList.add('text-center');
    const errorMessage = document.createElement('h1');
    errorMessage.classList.add('text-center');
    errorMessage.style.color = 'red';
    errorMessage.textContent = 'Error 404: User not Found'
    const errorImage = document.createElement('img');
    errorImage.src = 'public/cute-astronaut-lost-space-404-cartoon-vector-icon-illustration-science-technology-isolated-flat_138676-7622.avif';
    errorImage.classList.add('pt-2');

    errorDisplay.appendChild(errorMessage);
    errorDisplay.appendChild(errorImage);
    resultContainer.appendChild(errorDisplay);
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
