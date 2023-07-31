var userEmail = window.localStorage.getItem('userEmail');
function GetAllItems() {
    var userNameTag = document.getElementById('userNameTag');
    userNameTag.textContent = userEmail;
    var itemsDiv = document.querySelector('#itemsDiv');
    var url = 'https://localhost:7004/api/Items/GetAllItems';
    fetch(url, {
        method: 'GET'
    })
        .then(function (response) {
        if (response.ok) {
            // Request was successful
            return response.json();
        }
        else {
            // Request failed
            throw new Error(response.statusText);
        }
    })
        .then(function (data) {
        data.forEach(function (item) {
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
            itemPrice.textContent = item.itemPrice + " " + item.itemPriceTag;
            itemDiv.appendChild(itemImage);
            itemDiv.appendChild(itemPara);
            itemDiv.appendChild(itemPrice);
            itemsDiv.appendChild(itemDiv);
        });
    })
        .catch(function (error) {
        console.error('Error occurred while sending the request:', error);
    });
    var storedCartList = localStorage.getItem('cartList');
    var clearcartlistbutton = document.getElementById('clearcartlistbutton');
    var showCartListButton = document.getElementById('showButton');
    var sendOrderButton = document.getElementById('sendOrderButton');
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
    var itemName = event.target.querySelector('.itemBox');
    var itemNameValue = itemName.textContent;
    window.location.href = '/Home/ViewItem?itemName=' + encodeURIComponent(itemNameValue.trim());
}
var element = document.getElementById('itemsDiv');
if (element !== null) {
    element.addEventListener("click", gotopage, false);
}
function AddNewItem() {
    var itemName = document.querySelector('.itemName');
    var itemPrice = document.querySelector('.itemPrice');
    var itemStock = document.querySelector('.itemStock');
    var itemImage = document.querySelector('.itemImage');
    var file = itemImage.files[0];
    var newItemData = {
        itemName: itemName.value,
        itemPrice: itemPrice.value,
        itemStock: parseInt(itemStock.value),
        userName: userEmail,
        itemImage: file
    };
    //var byteArray;
    //const reader = new FileReader();
    //reader.onload = (event) => {
    //    const resultArrayBuffer = event.target?.result as ArrayBuffer;
    //    byteArray = new Uint8Array(resultArrayBuffer);
    //    console.log(byteArray);
    //};
    //reader.readAsArrayBuffer(file);
    //console.log(file);
    var url = 'https://localhost:7004/api/Items/AddNewItem';
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
    var myitemlist = document.getElementById('myitemlist');
    var url = 'https://localhost:7004/api/Items/GetMyListings' + '?userName=' + userEmail;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        data.forEach(function (item) {
            var userItemList = document.createElement('div');
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
//# sourceMappingURL=items.js.map