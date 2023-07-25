class CartList {
    itemName: string[];
    itemPrice: string[];

    constructor() {
        this.itemName = [];
        this.itemPrice = [];
    }
}

let cl: CartList = new CartList();

function loadCartListFromLocalStorage() {
    const storedCartList = localStorage.getItem('cartList');
    if (storedCartList) {
        cl = JSON.parse(storedCartList);
    }
}

function saveCartListToLocalStorage() {
    localStorage.setItem('cartList', JSON.stringify(cl));
}
function loadCartListIntoCartListDiv() {
    const userEmail = window.localStorage.getItem('userEmail');
    var userNameTag = document.getElementById('userNameTag');
    userNameTag.textContent = userEmail;
    const storedCartList = localStorage.getItem('cartList');
    const cartListDiv = document.getElementById('cartListDiv');

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

            const itemImage = document.createElement("img");
            itemImage.classList.add('cartitemImage');
            itemImage.setAttribute('id', 'cartitemImage');
            itemImage.src = "/images/" + itemName.trim() + ".png";

            const itemCount = itemCounts[itemName];
            const totalPriceForItem = itemPrices[itemName];

            itemInfoElement.textContent = `${itemName} (${itemCount}) - $${totalPriceForItem.toFixed(2)}`;
            itemContainer.appendChild(itemInfoElement);
            itemContainer.appendChild(itemImage);
            cartListDiv.appendChild(itemContainer);
        });

        const totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        cartListDiv.appendChild(totalPriceElement);
    }
}

function ClearCartList() {
    localStorage.removeItem('cartList');
}

interface OrderData {
    itemNames: string;
    itemAmounts: string;
    totalPrice: string;
    ordererName: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
    postalCode: string;
}

function SendOrder() {
    const storedCartList = localStorage.getItem('cartList');

    if (storedCartList) {
        const cl: CartList = JSON.parse(storedCartList);
        const itemCounts: { [itemName: string]: number } = {};
        let totalPrice = 0;

        // Calculate item counts and the total price of all items
        cl.itemName.forEach((itemName, index) => {
            if (itemCounts[itemName]) {
                itemCounts[itemName]++;
            } else {
                itemCounts[itemName] = 1;
            }
            totalPrice += parseFloat(cl.itemPrice[index]) * itemCounts[itemName];
        });

        // Create separate variables for itemName and itemCount
        let itemNames = '';
        let itemAmounts = '';
        let itemTotalPricesString = '';

        // Generate itemName and itemCount strings
        for (const itemName in itemCounts) {
            const itemCount = itemCounts[itemName];
            itemNames += `${itemName},`;
            itemAmounts += `${itemCount},`;
            itemTotalPricesString += `${cl.itemPrice[itemCount]}, `;
        }

        // Remove the trailing comma and space from itemNames and itemAmounts
        itemNames = itemNames.slice(0, -1);
        itemAmounts = itemAmounts.slice(0, -1);

        // Remove the trailing comma and space from itemTotalPricesString
        itemTotalPricesString = itemTotalPricesString.slice(0, -2);

        console.log('Item Names:', itemNames);
        console.log('Item Amounts:', itemAmounts);
        console.log('Total Price:', itemTotalPricesString);

        // Send the itemNames, itemAmounts, and totalPrice securely to your API using fetch
        const cardNumber = document.getElementById('cardNumber') as HTMLInputElement;
        const expirationDate = document.getElementById('expirationDate') as HTMLInputElement;
        const securityCode = document.getElementById('cvvCode') as HTMLInputElement;
        const postalCode = document.getElementById('postalCode') as HTMLInputElement;
        const userEmail = window.localStorage.getItem('userEmail');

        const orderData: OrderData = {
            itemNames: itemNames,
            itemAmounts: itemAmounts,
            totalPrice: itemTotalPricesString,
            ordererName: userEmail,
            cardNumber: cardNumber.value,
            expirationDate: expirationDate.value,
            securityCode: securityCode.value,
            postalCode: postalCode.value,
        };

        const url = 'https://localhost:7004/api/Items/SaveCartList';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(orderData), // Send the orderData as JSON in the request body
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the API response if needed
                ClearCartList();
                console.log('API response:', data);
            })
            .catch((error) => {
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
    const urlParams = new URLSearchParams(window.location.search);
    const itemName = urlParams.get('itemName');
    const addtoCartButton = document.getElementById('addtoCart') as HTMLButtonElement;
    const url = 'https://localhost:7004/api/Items/GetSpecificItem' + '?itemName=' + itemName;

    fetch(url, {
        method: 'GET'
    })
        .then(function (response) {
            if (response.ok) {
                // Request was successful
                return response.json();
            } else {
                // Request failed
                throw new Error(response.statusText);
            }
        })
        .then(function (data) {
            data.forEach(item => {
                const itemDiv = document.getElementById('specificItemDiv') as HTMLDivElement;

                const itemPara = document.createElement("p");
                itemPara.classList.add('itemBox');
                itemPara.setAttribute('id', 'itemBox');
                itemPara.textContent = item.itemName;

                const itemPrice = document.createElement("p");
                itemPrice.classList.add('itemPrice');
                itemPrice.setAttribute('id', 'itemPrice');
                itemPrice.textContent = item.itemPrice + " " + item.itemPriceTag;

                const itemImage = document.createElement("img");
                itemImage.classList.add('itemImage');
                itemImage.setAttribute('id', 'itemImage');
                itemImage.src = "/images/" + item.itemImage;

                const itemStock = document.createElement("p");
                itemStock.classList.add('itemStock');
                itemStock.setAttribute('id', 'itemStock');
                itemStock.textContent = "Current Stock: "+item.itemStock;

                itemDiv.appendChild(itemPara);
                itemDiv.appendChild(itemPrice);
                itemDiv.appendChild(itemStock);
                itemDiv.appendChild(itemImage);
                if (item.itemStock === 0) {
                    addtoCartButton.disabled = true;
                } else {
                    addtoCartButton.disabled = false;
                }
            });
        })
        .catch(function (error) {
            console.error('Error occurred while sending the request:', error);
        });
}

const addToCartButton = document.getElementById('addtoCart') as HTMLButtonElement;
if (addToCartButton !== null) {
    addToCartButton.addEventListener("click", AddToCart, false);
}

const searchBar = document.getElementById('searchBar') as HTMLInputElement;
if (searchBar) {

searchBar.addEventListener("input", (event) => {
    var userInput = searchBar.value;
    const itemsDiv = document.querySelector('#itemsDiv');
    const url = 'https://localhost:7004/api/Items/GetSpecificItem' + '?itemName=' + userInput;

    fetch(url, {
        method: 'GET'
    })
        .then(function (response) {
            if (response.ok) {
                // Request was successful
                return response.json();
            } else {
                // Request failed
                throw new Error(response.statusText);
            }
        })
        .then(function (data) {
            if (data !== null) {
                data.forEach(item => {
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






