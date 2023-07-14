var userName;
function Login() {
    const userEmailInput = document.getElementById('EmailInput') as HTMLInputElement;
    const userPasswordInput = document.getElementById('userPasswordInput') as HTMLInputElement;

    const userEmail: string = userEmailInput.value;
    userName = userEmail;
    const userPassword: string = userPasswordInput.value;

    const url = 'https://localhost:7004/api/Users/Login' + '?userEmail=' + userEmail + '&userPassword=' + userPassword;

    fetch(url, {
        method: 'POST'
    })
        .then(function (response) {
            if (response.ok) {
                // Request was successful
                //return response.text();
                console.log("it worked");
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
