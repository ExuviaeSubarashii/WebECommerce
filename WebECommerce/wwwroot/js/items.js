//TODO REDIRECT TO THE VIEW PAGE AFTER CLICKING THE ITEMBOX
function GetAllItems() {
    var itemDiv = document.getElementById('itemsDiv');
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
            var itemId = document.createElement("p");
            itemId.classList.add('itemBox');
            itemId.setAttribute('id', 'itemIdBox');
            itemId.textContent = item.itemId;
            itemDiv.appendChild(itemId);
            var itemPara = document.createElement("p");
            itemPara.classList.add('itemBox');
            itemPara.setAttribute('id', 'itemBox');
            itemPara.textContent = item.itemName;
            itemDiv.appendChild(itemPara);
            var itemPrice = document.createElement("p");
            itemPrice.classList.add('itemPrice');
            itemPrice.textContent = item.itemPrice;
            itemDiv.appendChild(itemPrice);
            var itemPriceTag = document.createElement("p");
            itemPriceTag.classList.add('itemPriceTag');
            itemPriceTag.textContent = item.itemPriceTag;
            itemDiv.appendChild(itemPriceTag);
            //var itemImage = document.createElement("img");
            //itemImage.classList.add('itemImage');
            //itemImage.src = item.itemImage;
            //itemDiv.appendChild(itemImage);
        });
    })
        .catch(function (error) {
        console.error('Error occurred while sending the request:', error);
    });
}
function gotopage() {
    var itemId = document.getElementById('itemIdBox');
    var itemIdValue = itemId.textContent;
    window.location.href = '/Home/ViewItem?id=' + encodeURIComponent(itemIdValue);
}
var element = document.getElementById('itemsDiv');
element.addEventListener("click", gotopage, false);
function GetTheItem() {
    var urlParams = new URLSearchParams(window.location.search);
    var itemId = urlParams.get('id');
    var itemDiv = document.getElementById('specificItemDiv');
    var url = 'https://localhost:7004/api/Items/GetSpecificItem' + '?id=' + itemId;
    fetch(url, {
        method: 'POST'
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
            var itemId = document.createElement("p");
            itemId.classList.add('itemBox');
            itemId.setAttribute('id', 'itemIdBox');
            itemId.textContent = item.itemId;
            itemDiv.appendChild(itemId);
            var itemPara = document.createElement("p");
            itemPara.classList.add('itemBox');
            itemPara.setAttribute('id', 'itemBox');
            itemPara.textContent = item.itemName;
            itemDiv.appendChild(itemPara);
            var itemPrice = document.createElement("p");
            itemPrice.classList.add('itemPrice');
            itemPrice.textContent = item.itemPrice;
            itemDiv.appendChild(itemPrice);
            var itemPriceTag = document.createElement("p");
            itemPriceTag.classList.add('itemPriceTag');
            itemPriceTag.textContent = item.itemPriceTag;
            itemDiv.appendChild(itemPriceTag);
        });
    })
        .catch(function (error) {
        console.error('Error occurred while sending the request:', error);
    });
}
//# sourceMappingURL=items.js.map