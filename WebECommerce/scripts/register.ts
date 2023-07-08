function Register() {
    const userEmailInput = document.getElementById('EmailInput') as HTMLInputElement;
    const userNameInput = document.getElementById('userNameInput') as HTMLInputElement;
    const userPasswordInput = document.getElementById('userPasswordInput') as HTMLInputElement;

    const userEmail: string = userEmailInput.value;
    const userName: string = userNameInput.value;
    const userPassword: string = userPasswordInput.value;

    const url = `https://localhost:7004/api/Users/Register` + '?userEmail=' + userEmail + '&userName=' + userName + '&userPassword=' + userPassword;

    fetch(url, {
        method: 'POST'
    })
        .then(function (response) {
            if (response.ok) {
                // Request was successful
                return response.text();
            } else {
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