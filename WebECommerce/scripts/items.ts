﻿const userEmail = window.localStorage.getItem('userEmail');
function GetAllItems() {
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

                var itemId = document.createElement("p");
                itemId.classList.add('itemId');
                itemId.setAttribute('id', 'itemId');
                itemId.textContent = item.itemId;

                var wishListbutton = document.createElement("button");
                wishListbutton.classList.add('wishListbutton');
                wishListbutton.setAttribute('id', 'wishListbutton');
                wishListbutton.textContent = "Wish";

                var itemPara = document.createElement("p");
                itemPara.classList.add('itemBox');
                itemPara.setAttribute('id', 'itemBox');
                itemPara.textContent = item.itemName;

                var itemPrice = document.createElement("p");
                itemPrice.classList.add('itemPrice');
                itemPrice.textContent = item.itemPrice + " " + item.itemPriceTag;

                itemDiv.appendChild(itemImage);
                itemDiv.appendChild(itemId);
                itemDiv.appendChild(itemPara);
                itemDiv.appendChild(itemPrice);
                itemDiv.appendChild(wishListbutton);

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


function gotopage(event: Event) {
    const itemNameElement = (event.target as HTMLElement).closest('.itemBox');
    if (itemNameElement) {
        const itemNameValue = itemNameElement.textContent?.trim();
        if (itemNameValue) {
            const url = `/Home/ViewItem?itemName=${encodeURIComponent(itemNameValue)}`;
            window.location.href = url;
        }
    }
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
    itemImage: File;
}
function AddNewItem() {
    const itemName = document.querySelector('.itemName') as HTMLInputElement;
    const itemPrice = document.querySelector('.itemPrice') as HTMLInputElement;
    const itemStock = document.querySelector('.itemStock') as HTMLInputElement;
    const itemImage = document.querySelector('.itemImage') as HTMLInputElement;
    const file = itemImage.files[0];

    const newItemData: NewItemData = {
        itemName: itemName.value,
        itemPrice: itemPrice.value,
        itemStock: parseInt(itemStock.value),
        userName: userEmail,
        itemImage: file
    };

    const url = 'https://localhost:7004/api/Items/AddNewItem';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    var formData = new FormData();
    formData.append('itemName', newItemData.itemName);
    formData.append('itemPrice', newItemData.itemPrice);
    formData.append('itemStock', newItemData.itemStock.toString());
    formData.append('userName', newItemData.userName);
    formData.append('itemImage', newItemData.itemImage);

    xhr.send(formData);



    //fetch(url, {
    //    method: 'POST',
    //    headers: {
    //        'Content-Type': 'application/json',
    //    },
    //    body: JSON.stringify(newItemData),
    //})
    //    .then(response => {
    //        if (response.ok) {
    //            // Handle successful response
    //            return response.json();
    //        } else {
    //            // Handle error response
    //            throw new Error('Failed to add new item.');
    //        }
    //    })
    //    .then(GetMyListings)
    //    .catch(error => {
    //        console.log(error);
    //    });
}


function GetMyListings() {
    
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

                const userItemList = document.createElement('div');
                userItemList.classList.add('userItemList');
                userItemList.setAttribute('id', 'userItemList');

                const userItemName = document.createElement('p');
                userItemName.classList.add('userItemName');
                userItemName.textContent = "Product Name: " + item.itemName;

                const itemPrice = document.createElement('p');
                itemPrice.classList.add('itemPrice');
                itemPrice.textContent = "Price Tag: " + item.itemPrice + item.itemPriceTag;

                const userItemStock = document.createElement('p');
                userItemStock.classList.add('userItemStock');
                userItemStock.textContent = "Stock: " + item.itemStock;

                const itemImage = document.createElement("img");
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












