const apiUrl = 'https://api.github.com/users';

const inputForm = document.getElementById('search-form');


inputForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputUsername = document.getElementById('search-bar').value;
    console.log(inputUsername.replaceAll(' ', ''));

    // esegui la chiamata all'endpoint
})