function GetAllItems() {
    var userEmail = window.localStorage.getItem('userEmail');
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
            var itemPara = document.createElement("p");
            itemPara.classList.add('itemBox');
            itemPara.setAttribute('id', 'itemBox');
            itemPara.textContent = item.itemName;
            var itemPrice = document.createElement("p");
            itemPrice.classList.add('itemPrice');
            itemPrice.textContent = item.itemPrice;
            var itemPriceTag = document.createElement("p");
            itemPriceTag.classList.add('itemPriceTag');
            itemPriceTag.textContent = item.itemPriceTag;
            itemDiv.appendChild(itemPara);
            itemDiv.appendChild(itemPrice);
            itemDiv.appendChild(itemPriceTag);
            itemsDiv.appendChild(itemDiv);
        });
    })
        .catch(function (error) {
        console.error('Error occurred while sending the request:', error);
    });
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
//# sourceMappingURL=items.js.map