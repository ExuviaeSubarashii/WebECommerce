function Bomba() {
    console.log('bomba');
}
function GetTheItem() {
    var urlParams = new URLSearchParams(window.location.search);
    var itemName = urlParams.get('itemName');
    var url = 'https://localhost:7004/api/Items/GetSpecificItem' + '?itemName=' + itemName;
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
            var itemDiv = document.getElementById('specificItemDiv');
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
var addToCartButton = document.getElementById('addtoCart');
if (addToCartButton !== null) {
    addToCartButton.addEventListener("click", Bomba, false);
}
//# sourceMappingURL=specificitem.js.map