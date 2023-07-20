function GoToMyOrder() {
    window.location.href = '/Home/CustomerOrders';
}
function MyOrders() {
    var orderDiv = document.getElementById('orderDiv');
    var userEmail = window.localStorage.getItem('userEmail');
    var url = 'https://localhost:7004/api/Items/GetMyOrders' + '?userName=' + userEmail;
    fetch(url, {
        method: 'GET'
    })
        .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error(response.statusText);
        }
    })
        .then(function (data) {
        data.forEach(function (item) {
            var perOrderDiv = document.createElement('div');
            perOrderDiv.classList.add('perOrderDiv');
            perOrderDiv.setAttribute('id', 'perOrderDiv');
            var itemName = document.createElement('p');
            itemName.classList.add('itemBox');
            itemName.textContent = "Product Name: " + item.itemName;
            var orderDate = document.createElement('p');
            orderDate.classList.add('orderDate');
            orderDate.textContent = "Order Date: " + item.orderDate;
            var itemAmount = document.createElement('p');
            itemAmount.classList.add('itemAmount');
            itemAmount.textContent = "Order Amount: " + item.itemAmount;
            var totalPrice = document.createElement('p');
            totalPrice.classList.add('totalPrice');
            totalPrice.textContent = "Total Price: " + item.totalPrice;
            perOrderDiv.appendChild(itemName);
            perOrderDiv.appendChild(orderDate);
            perOrderDiv.appendChild(itemAmount);
            perOrderDiv.appendChild(totalPrice);
            orderDiv.appendChild(perOrderDiv);
            console.log(data);
        });
    })
        .catch(function (error) {
        console.error('Error occurred while sending the request:', error);
    });
}
//# sourceMappingURL=CustomerOrders.js.map