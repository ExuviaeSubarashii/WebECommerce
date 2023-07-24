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
    var userEmail = window.localStorage.getItem('userEmail');
    var userNameTag = document.getElementById('userNameTag');
    userNameTag.textContent = userEmail;
    var storedCartList = localStorage.getItem('cartList');
    var cartListDiv = document.getElementById('cartListDiv');
    if (storedCartList) {
        var cl_1 = JSON.parse(storedCartList);
        var itemCounts_1 = {};
        var itemPrices_1 = {};
        var totalPrice_1 = 0;
        cl_1.itemName.forEach(function (itemName, index) {
            itemCounts_1[itemName] = (itemCounts_1[itemName] || 0) + 1;
            itemPrices_1[itemName] = (itemPrices_1[itemName] || 0) + parseFloat(cl_1.itemPrice[index]);
            totalPrice_1 += parseFloat(cl_1.itemPrice[index]);
        });
        cartListDiv.innerHTML = '';
        Object.keys(itemCounts_1).forEach(function (itemName) {
            var itemContainer = document.createElement('div');
            var itemInfoElement = document.createElement('p');
            var itemImage = document.createElement("img");
            itemImage.classList.add('cartitemImage');
            itemImage.setAttribute('id', 'cartitemImage');
            itemImage.src = "/images/" + itemName.trim() + ".png";
            var itemCount = itemCounts_1[itemName];
            var totalPriceForItem = itemPrices_1[itemName];
            itemInfoElement.textContent = "".concat(itemName, " (").concat(itemCount, ") - $").concat(totalPriceForItem.toFixed(2));
            itemContainer.appendChild(itemInfoElement);
            itemContainer.appendChild(itemImage);
            cartListDiv.appendChild(itemContainer);
        });
        var totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = "Total Price: $".concat(totalPrice_1.toFixed(2));
        cartListDiv.appendChild(totalPriceElement);
    }
}
function ClearCartList() {
    localStorage.removeItem('cartList');
}
function SendOrder() {
    var storedCartList = localStorage.getItem('cartList');
    if (storedCartList) {
        var cl_2 = JSON.parse(storedCartList);
        var itemCounts_2 = {};
        var itemTotalPrices_1 = {};
        var totalPrice_2 = 0;
        // Calculate item counts, total prices, and the total price of all items
        cl_2.itemName.forEach(function (itemName, index) {
            if (itemCounts_2[itemName]) {
                itemCounts_2[itemName]++;
                itemTotalPrices_1[itemName] += parseFloat(cl_2.itemPrice[index]) * itemCounts_2[itemName];
            }
            else {
                itemCounts_2[itemName] = 1;
                itemTotalPrices_1[itemName] = parseFloat(cl_2.itemPrice[index]);
            }
            totalPrice_2 += parseFloat(cl_2.itemPrice[index]) * itemCounts_2[itemName];
        });
        // Create separate variables for itemName and itemCount
        var itemNames = '';
        var itemAmounts = '';
        // Generate itemName and itemCount strings
        for (var itemName in itemCounts_2) {
            var itemCount = itemCounts_2[itemName];
            itemNames += "".concat(itemName, ",");
            itemAmounts += "".concat(itemCount, ",");
        }
        // Remove the trailing comma
        itemNames = itemNames.slice(0, -1);
        itemAmounts = itemAmounts.slice(0, -1);
        console.log('Item Names:', itemNames);
        console.log('Item Amounts:', itemAmounts);
        console.log('Total Price:', totalPrice_2.toFixed(2));
        // Send the itemNames, itemAmounts, and totalPrice securely to your API using fetch
        var cardNumber = document.getElementById('cardNumber');
        var expirationDate = document.getElementById('expirationDate');
        var securityCode = document.getElementById('cvvCode');
        var postalCode = document.getElementById('postalCode');
        var userEmail = window.localStorage.getItem('userEmail');
        var orderData = {
            itemNames: itemNames,
            itemAmounts: itemAmounts,
            totalPrice: totalPrice_2,
            ordererName: userEmail,
            cardNumber: cardNumber.value,
            expirationDate: expirationDate.value,
            securityCode: securityCode.value,
            postalCode: postalCode.value,
        };
        var url = 'https://localhost:7004/api/Items/SaveCartList';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(orderData), // Send the orderData as JSON in the request body
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            // Handle the API response if needed
            ClearCartList();
            console.log('API response:', data);
        })
            .catch(function (error) {
            // Handle any errors during the fetch request
            console.error('Error:', error);
        });
    }
}
function AddToCart() {
    var itemNameTag = document.querySelector('.itemBox');
    var itemPriceTag = document.querySelector('.itemPrice');
    var itemNames = itemNameTag.textContent;
    var itemPrice = itemPriceTag.textContent;
    cl.itemName.push(itemNames); // Add the item name to the itemName array of CartList
    cl.itemPrice.push(itemPrice); // Add the item price to the itemPrice array of CartList
    var formattedItemName = cl.itemName.join(","); // Join the item names with commas and a space
    var formattedItemPrice = cl.itemPrice.join(", "); // Join the item prices with commas and a space
    console.log(formattedItemName); // Output the formatted item names
    console.log(formattedItemPrice); // Output the formatted item prices
    saveCartListToLocalStorage(); // Save the updated CartList to localStorage
}
loadCartListFromLocalStorage(); // Load the CartList from localStorage when the page loads
function GetTheItem() {
    var urlParams = new URLSearchParams(window.location.search);
    var itemName = urlParams.get('itemName');
    var addtoCartButton = document.getElementById('addtoCart');
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
            var itemPrice = document.createElement("p");
            itemPrice.classList.add('itemPrice');
            itemPrice.setAttribute('id', 'itemPrice');
            itemPrice.textContent = item.itemPrice + " " + item.itemPriceTag;
            var itemImage = document.createElement("img");
            itemImage.classList.add('itemImage');
            itemImage.setAttribute('id', 'itemImage');
            itemImage.src = "/images/" + item.itemImage;
            var itemStock = document.createElement("p");
            itemStock.classList.add('itemStock');
            itemStock.setAttribute('id', 'itemStock');
            itemStock.textContent = "Current Stock: " + item.itemStock;
            itemDiv.appendChild(itemPara);
            itemDiv.appendChild(itemPrice);
            itemDiv.appendChild(itemStock);
            itemDiv.appendChild(itemImage);
            if (item.itemStock === 0) {
                addtoCartButton.disabled = true;
            }
            else {
                addtoCartButton.disabled = false;
            }
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
var searchBar = document.getElementById('searchBar');
if (searchBar) {
    searchBar.addEventListener("input", function (event) {
        var userInput = searchBar.value;
        var itemsDiv = document.querySelector('#itemsDiv');
        var url = 'https://localhost:7004/api/Items/GetSpecificItem' + '?itemName=' + userInput;
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
            if (data !== null) {
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
                    itemDiv.appendChild(itemPara);
                    itemDiv.appendChild(itemPrice);
                    itemDiv.appendChild(itemImage);
                    itemsDiv.appendChild(itemDiv);
                });
            }
            else {
                itemsDiv.innerHTML = '';
            }
        })
            .catch(function (error) {
            console.error('Error occurred while sending the request:', error);
        });
    });
}
//# sourceMappingURL=specificitem.js.map