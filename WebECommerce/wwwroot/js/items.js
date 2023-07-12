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
function gotopage() {
    var itemName = document.getElementById('itemBox');
    var itemNameValue = itemName.textContent;
    window.location.href = '/Home/ViewItem?itemName=' + encodeURIComponent(itemNameValue);
}
var element = document.getElementById('itemsDiv');
if (element !== null) {
    element.addEventListener("click", gotopage, false);
}
//# sourceMappingURL=items.js.map