function GoToPaymentPage() {
    window.location.href = '/Home/PaymentPage';
}
function loadCartListIntoPaymentDiv() {
    var userEmail = window.localStorage.getItem('userEmail');
    var userNameTag = document.getElementById('userNameTag');
    userNameTag.textContent = userEmail;
    var storedCartList = localStorage.getItem('cartList');
    var cartListDiv = document.getElementById('productInformation');
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
            var itemCount = itemCounts_1[itemName];
            var totalPriceForItem = itemPrices_1[itemName];
            itemInfoElement.textContent = "".concat(itemName, " (").concat(itemCount, ") - $").concat(totalPriceForItem.toFixed(2));
            itemContainer.appendChild(itemInfoElement);
            cartListDiv.appendChild(itemContainer);
        });
        var totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = "Total Price: $".concat(totalPrice_1.toFixed(2));
        cartListDiv.appendChild(totalPriceElement);
    }
}
//# sourceMappingURL=payment.js.map