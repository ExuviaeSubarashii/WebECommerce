function Login() {
    const userEmailInput = document.getElementById('EmailInput') as HTMLInputElement;
    const userPasswordInput = document.getElementById('userPasswordInput') as HTMLInputElement;

    const userEmail: string = userEmailInput.value;
    const userPassword: string = userPasswordInput.value;

    const url = 'https://localhost:7004/api/Users/Login' + '?userEmail=' + userEmail + '&userPassword=' + userPassword;

    fetch(url, {
        method: 'POST'
    })
        .then(function (response) {
            if (response.ok) {
                window.localStorage.setItem('userEmail', userEmail);
                window.location.href = '/Home/ReturnCommerceSite';

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
function LogOut() {
    window.location.href = '/Home/Index';
    localStorage.clear();
}
