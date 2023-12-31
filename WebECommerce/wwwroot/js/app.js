function Login() {
    var userEmailInput = document.getElementById('EmailInput');
    var userPasswordInput = document.getElementById('userPasswordInput');
    var userEmail = userEmailInput.value;
    var userPassword = userPasswordInput.value;
    var url = 'https://localhost:7004/api/Users/Login' + '?userEmail=' + userEmail + '&userPassword=' + userPassword;
    fetch(url, {
        method: 'POST'
    })
        .then(function (response) {
        if (response.ok) {
            window.localStorage.setItem('userEmail', userEmail);
            window.location.href = '/Home/ReturnCommerceSite';
        }
        else {
            // Request failed
            throw new Error(response.statusText);
        }
    })
        .then(function (responseText) {
        console.log(responseText);
    })
        .catch(function (error) {
        console.error('Error occurred while sending the request:', error);
    });
}
function LogOut() {
    window.location.href = '/Home/Index';
    localStorage.clear();
}
function GoToFavorites() {
    window.location.href = '/Home/Favorites';
}
//# sourceMappingURL=app.js.map