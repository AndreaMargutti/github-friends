import axios from 'axios';

const apiUrl = 'https://api.github.com/users';
const inputForm = document.getElementById('search-form');
const resultContainer = document.getElementById('result');
const resultApi = [];



inputForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputUsername = document.getElementById('search-bar').value;
    // console.log(inputUsername.replaceAll(' ', ''));
    inputUsername = inputUsername.replaceAll(' ', '');

    // esegui la chiamata all'endpoint
    axios.get(`${apiUrl}/${inputUsername}`)
        .then(function (response) {
            console.log(response.data);
            resultApi.push(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
})
