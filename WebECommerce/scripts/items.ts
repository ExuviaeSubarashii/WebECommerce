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
interface NewItemData {
    itemName: string;
    itemPrice: string;
    itemStock: number;
    userName: string;
}
function AddNewItem() {
    const userEmail = window.localStorage.getItem('userEmail');
    const itemName = document.querySelector('.itemName') as HTMLInputElement;
    const itemPrice = document.querySelector('.itemPrice') as HTMLInputElement;
    const itemStock = document.querySelector('.itemStock') as HTMLInputElement;

    const newItemData: NewItemData = {
        itemName: itemName.value,
        itemPrice: itemPrice.value,
        itemStock: parseInt(itemStock.value),
        userName: userEmail
    };
    const url = 'https://localhost:7004/api/Items/AddNewItem';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItemData),
    })
        .then(response => {
            if (response.ok) {
                // Handle successful response
                return response.json();
            } else {
                // Handle error response
                throw new Error('Failed to add new item.');
            }
        })
        .then(GetMyListings)
        .catch(error => {
            console.log(error);
        });
}



function GetMyListings() {
    const userEmail = window.localStorage.getItem('userEmail');
    const myitemlist = document.getElementById('myitemlist');
    const url = 'https://localhost:7004/api/Items/GetMyListings' + '?userName=' + userEmail;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((data) => {
            data.forEach(item => {

                let userItemList = document.createElement('div');
                userItemList.classList.add('userItemList');
                userItemList.setAttribute('id', 'userItemList');

                var userItemName = document.createElement('p');
                userItemName.classList.add('userItemName');
                userItemName.textContent = "Product Name: " + item.itemName;

                var itemPrice = document.createElement('p');
                itemPrice.classList.add('itemPrice');
                itemPrice.textContent = "Price Tag: " + item.itemPrice + item.itemPriceTag;

                var userItemStock = document.createElement('p');
                userItemStock.classList.add('userItemStock');
                userItemStock.textContent = "Stock: " + item.itemStock;

                var itemImage = document.createElement("img");
                itemImage.classList.add('itemImage');
                itemImage.setAttribute('id', 'itemImage');
                itemImage.src = "/images/" + item.itemImage;

                userItemList.appendChild(userItemName);
                userItemList.appendChild(itemPrice);
                userItemList.appendChild(userItemStock);
                userItemList.appendChild(itemImage);


                myitemlist.appendChild(userItemList);
            });
        });
}
function GotoMyListings() {
    window.location.href = '/Home/AddNewItem';
}












