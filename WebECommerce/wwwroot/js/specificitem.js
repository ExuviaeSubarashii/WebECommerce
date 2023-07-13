var CartList = /** @class */ (function () {
    function CartList() {
        this.itemName = [];
        this.itemPrice = [];
    }
    return CartList;
}());
var cl = new CartList();
function loadCartListFromLocalStorage() {
    var storedCartList = localStorage.getItem('cartList');
    if (storedCartList) {
        cl = JSON.parse(storedCartList);
    }
}
function saveCartListToLocalStorage() {
    localStorage.setItem('cartList', JSON.stringify(cl));
}
function loadCartListIntoCartListDiv() {
    var storedCartList = localStorage.getItem('cartList');
    var cartListDiv = document.querySelector('#cartListDiv'); // Assuming you have a div element with the id "cartListDiv"
    if (storedCartList) {
        var cl_1 = JSON.parse(storedCartList);
        var itemCounts_1 = {}; // Object to keep track of item counts
        var itemPrices_1 = {}; // Object to keep track of item prices
        var totalPrice_1 = 0; // Variable to store the total price
        // Calculate item counts, total prices, and the total price of all items
        cl_1.itemName.forEach(function (itemName, index) {
            if (itemCounts_1[itemName]) {
                itemCounts_1[itemName]++;
                itemPrices_1[itemName] += parseFloat(cl_1.itemPrice[index]);
            }
            else {
                itemCounts_1[itemName] = 1;
                itemPrices_1[itemName] = parseFloat(cl_1.itemPrice[index]);
            }
            totalPrice_1 += parseFloat(cl_1.itemPrice[index]);
        });
        // Render the items with their counts and total prices
        for (var i = 0; i < cl_1.itemName.length; i++) {
            var itemName = cl_1.itemName[i];
            // Skip rendering if the item has already been rendered
            if (i !== cl_1.itemName.indexOf(itemName)) {
                continue;
            }
            var itemContainer = document.createElement('div');
            var itemInfoElement = document.createElement('p');
            var itemCount = itemCounts_1[itemName];
            var totalPriceForItem = itemPrices_1[itemName];
            itemInfoElement.textContent = "".concat(itemName, " (").concat(itemCount, ") - $").concat(totalPriceForItem.toFixed(2));
            itemContainer.appendChild(itemInfoElement);
            cartListDiv.appendChild(itemContainer);
        }
        // Render the total price of all items
        var totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = "Total Price: $".concat(totalPrice_1.toFixed(2));
        cartListDiv.appendChild(totalPriceElement);
    }
}
function ClearCartList() {
    localStorage.removeItem('cartList');
}
function SendOrder() {
}
function AddToCart() {
    var itemNameTag = document.querySelector('.itemBox'); // Assuming the itemBox class is used for the item name element
    var itemPriceTag = document.querySelector('.itemPrice'); // Assuming the itemPrice class is used for the item price element
    var itemNames = itemNameTag.textContent;
    var itemPrice = itemPriceTag.textContent;
    cl.itemName.push(itemNames); // Add the item name to the itemName array of CartList
    cl.itemPrice.push(itemPrice); // Add the item price to the itemPrice array of CartList
    var formattedItemName = cl.itemName.join(", "); // Join the item names with commas and a space
    var formattedItemPrice = cl.itemPrice.join(", "); // Join the item prices with commas and a space
    console.log(formattedItemName); // Output the formatted item names
    console.log(formattedItemPrice); // Output the formatted item prices
    saveCartListToLocalStorage(); // Save the updated CartList to localStorage
}
loadCartListFromLocalStorage(); // Load the CartList from localStorage when the page loads
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
            itemPrice.setAttribute('id', 'itemPrice');
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
    addToCartButton.addEventListener("click", AddToCart, false);
}
//# sourceMappingURL=specificitem.js.map