function Register() {
    var userEmailInput = document.getElementById('EmailInput');
    var userNameInput = document.getElementById('userNameInput');
    var userPasswordInput = document.getElementById('userPasswordInput');
    var userEmail = userEmailInput.value;
    var userName = userNameInput.value;
    var userPassword = userPasswordInput.value;
    var url = "https://localhost:7004/api/Users/Register" + '?userEmail=' + userEmail + '&userName=' + userName + '&userPassword=' + userPassword;
    fetch(url, {
        method: 'POST'
    })
        .then(function (response) {
        if (response.ok) {
            // Request was successful
            return response.text();
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
//# sourceMappingURL=register.js.map