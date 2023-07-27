function GoToMyOrder() {
    window.location.href = '/Home/CustomerOrders';
}
function MyOrders() {
    var userEmail = window.localStorage.getItem('userEmail');
    var userNameTag = document.getElementById('userNameTag');
    userNameTag.textContent = userEmail;
    var orderDiv = document.getElementById('orderDiv');
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
            var orderId = document.createElement('p');
            orderId.classList.add('orderId');
            orderId.setAttribute('id', 'orderId');
            orderId.textContent = "Order Id: " + item.orderGuid;
            var itemName = document.createElement('p');
            itemName.classList.add('itemBox');
            itemName.setAttribute('id', 'itemName');
            itemName.textContent = "Product Name: " + item.itemName;
            var orderDate = document.createElement('p');
            orderDate.classList.add('orderDate');
            orderDate.textContent = "Order Date: " + item.orderDate;
            var itemAmount = document.createElement('p');
            itemAmount.classList.add('itemAmount');
            itemAmount.setAttribute('id', 'itemAmount');
            itemAmount.textContent = "Order Amount: " + item.itemAmount;
            var totalPrice = document.createElement('p');
            totalPrice.classList.add('totalPrice');
            totalPrice.setAttribute('id', 'totalPrice');
            totalPrice.textContent = "Total Price: " + item.totalPrice;
            perOrderDiv.appendChild(itemName);
            perOrderDiv.appendChild(orderId);
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
var guidsearchBar = document.getElementById('guidsearchBar');
if (guidsearchBar) {
    guidsearchBar.addEventListener("input", function (event) {
        var guiduserInput = guidsearchBar.value;
        var orderDiv = document.querySelector('#orderDiv');
        var userEmail = window.localStorage.getItem('userEmail');
        var url = 'https://localhost:7004/api/Items/GetMyOrdersByGuid' + '?itemGuid=' + guiduserInput + '&userName=' + userEmail;
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
                orderDiv.innerHTML = '';
                data.forEach(function (item) {
                    var perOrderDiv = document.createElement('div');
                    perOrderDiv.classList.add('perOrderDiv');
                    perOrderDiv.setAttribute('id', 'perOrderDiv');
                    var orderId = document.createElement('p');
                    orderId.classList.add('orderId');
                    orderId.textContent = "Order Id: " + item.orderGuid;
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
                    perOrderDiv.appendChild(orderId);
                    perOrderDiv.appendChild(orderDate);
                    perOrderDiv.appendChild(itemAmount);
                    perOrderDiv.appendChild(totalPrice);
                    orderDiv.appendChild(perOrderDiv);
                });
            }
            else {
                orderDiv.innerHTML = '';
            }
        })
            .catch(function (error) {
            console.error('Error occurred while sending the request:', error);
        });
    });
}
//# sourceMappingURL=CustomerOrders.js.map