function GetAllItems() {
    const userEmail = window.localStorage.getItem('userEmail');
    var userNameTag = document.getElementById('userNameTag');
    userNameTag.textContent = userEmail;
    const itemsDiv = document.querySelector('#itemsDiv');
    const url = 'https://localhost:7004/api/Items/GetAllItems';

    fetch(url, {
        method: 'GET'
    })
        .then(function (response) {
            if (response.ok) {
                // Request was successful
                return response.json();
            } else {
                // Request failed
                throw new Error(response.statusText);
            }
        })
    
        .then(function (data) {
            data.forEach(item => {
                var itemDiv = document.createElement("div");
                itemDiv.classList.add('itemDiv');
                itemDiv.setAttribute('id', 'itemDiv');

                var itemImage = document.createElement("img");
                itemImage.classList.add('itemImage');
                itemImage.setAttribute('id', 'itemImage');
                itemImage.src = "/images/" + item.itemImage;

                var itemPara = document.createElement("p");
                itemPara.classList.add('itemBox');
                itemPara.setAttribute('id', 'itemBox');
                itemPara.textContent = item.itemName;

                var itemPrice = document.createElement("p");
                itemPrice.classList.add('itemPrice');
                itemPrice.textContent = item.itemPrice +" "+ item.itemPriceTag;

                itemDiv.appendChild(itemPara);
                itemDiv.appendChild(itemPrice);
                itemDiv.appendChild(itemImage);
                

                itemsDiv.appendChild(itemDiv);
            });
        })
        .catch(function (error) {
            console.error('Error occurred while sending the request:', error);
        });
    const storedCartList = localStorage.getItem('cartList');
    const clearcartlistbutton = document.getElementById('clearcartlistbutton') as HTMLButtonElement;
    const showCartListButton = document.getElementById('showButton') as HTMLButtonElement;
    const sendOrderButton = document.getElementById('sendOrderButton') as HTMLButtonElement;
    if (storedCartList.length > 0) {
        clearcartlistbutton.disabled = false;
        showCartListButton.disabled = false;
        sendOrderButton.disabled = false;
    }
    else {
        clearcartlistbutton.disabled = true;
        showCartListButton.disabled = true;
        sendOrderButton.disabled = true;
    }
}


function gotopage(event) {
    const itemName = event.target.querySelector('.itemBox');
    const itemNameValue = itemName.textContent;
    window.location.href = '/Home/ViewItem?itemName=' + encodeURIComponent(itemNameValue.trim());
}

const element = document.getElementById('itemsDiv');
if (element !== null) {
    element.addEventListener("click", gotopage, false);
}












