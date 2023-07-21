function GoToPaymentPage() {
    window.location.href = '/Home/PaymentPage';
}
function loadCartListIntoPaymentDiv() {
    const userEmail = window.localStorage.getItem('userEmail');
    var userNameTag = document.getElementById('userNameTag');
    userNameTag.textContent = userEmail;
    const storedCartList = localStorage.getItem('cartList');
    const cartListDiv = document.getElementById('productInformation');

    if (storedCartList) {
        const cl = JSON.parse(storedCartList);
        const itemCounts = {};
        const itemPrices = {};
        let totalPrice = 0;

        cl.itemName.forEach((itemName, index) => {
            itemCounts[itemName] = (itemCounts[itemName] || 0) + 1;
            itemPrices[itemName] = (itemPrices[itemName] || 0) + parseFloat(cl.itemPrice[index]);
            totalPrice += parseFloat(cl.itemPrice[index]);
        });

        cartListDiv.innerHTML = '';

        Object.keys(itemCounts).forEach((itemName) => {
            const itemContainer = document.createElement('div');
            const itemInfoElement = document.createElement('p');

            const itemCount = itemCounts[itemName];
            const totalPriceForItem = itemPrices[itemName];

            itemInfoElement.textContent = `${itemName} (${itemCount}) - $${totalPriceForItem.toFixed(2)}`;
            itemContainer.appendChild(itemInfoElement);
            cartListDiv.appendChild(itemContainer);
        });

        const totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        cartListDiv.appendChild(totalPriceElement);
    }
}