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
    const storedCartList = localStorage.getItem('cartList');
    const cartListDiv = document.getElementById('cartListDiv'); // Assuming you have a div element with the id "cartListDiv"

    if (storedCartList) {
        const cl: CartList = JSON.parse(storedCartList);
        const itemCounts: { [itemName: string]: number } = {}; // Object to keep track of item counts
        const itemPrices: { [itemName: string]: number } = {}; // Object to keep track of item prices
        let totalPrice = 0; // Variable to store the total price

        // Calculate item counts, total prices, and the total price of all items
        cl.itemName.forEach((itemName, index) => {
            if (itemCounts[itemName]) {
                itemCounts[itemName]++;
                itemPrices[itemName] += parseFloat(cl.itemPrice[index]);
            } else {
                itemCounts[itemName] = 1;
                itemPrices[itemName] = parseFloat(cl.itemPrice[index]);
            }
            totalPrice += parseFloat(cl.itemPrice[index]);
        });

        // Render the items with their counts and total prices
        for (let i = 0; i < cl.itemName.length; i++) {
            const itemName = cl.itemName[i];

            // Skip rendering if the item has already been rendered
            if (i !== cl.itemName.indexOf(itemName)) {
                continue;
            }

            const itemContainer = document.createElement('div');
            const itemInfoElement = document.createElement('p');

            const itemCount = itemCounts[itemName];
            const totalPriceForItem = itemPrices[itemName];

            itemInfoElement.textContent = `${itemName} (${itemCount}) - $${totalPriceForItem.toFixed(2)}`;

            itemContainer.appendChild(itemInfoElement);
            cartListDiv.appendChild(itemContainer);
        }

        // Render the total price of all items
        const totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        cartListDiv.appendChild(totalPriceElement);

    }
}
function ClearCartList() {
    localStorage.removeItem('cartList');
}

function SendOrder() {
    const storedCartList = localStorage.getItem('cartList');

    if (storedCartList) {
        const cl: CartList = JSON.parse(storedCartList);
        const itemCounts: { [itemName: string]: number } = {};
        const itemTotalPrices: { [itemName: string]: number } = {};
        let totalPrice = 0;

        // Calculate item counts, total prices, and the total price of all items
        cl.itemName.forEach((itemName, index) => {
            if (itemCounts[itemName]) {
                itemCounts[itemName]++;
                itemTotalPrices[itemName] += parseFloat(cl.itemPrice[index]) * itemCounts[itemName];
            } else {
                itemCounts[itemName] = 1;
                itemTotalPrices[itemName] = parseFloat(cl.itemPrice[index]);
            }
            totalPrice += parseFloat(cl.itemPrice[index]) * itemCounts[itemName];
        });

        // Create separate variables for itemName and itemCount
        let itemNames = '';
        let itemAmounts = '';

        // Generate itemName and itemCount strings
        for (const itemName in itemCounts) {
            const itemCount = itemCounts[itemName];
            itemNames += `${itemName},`;
            itemAmounts += `${itemCount},`;
        }

        // Remove the trailing comma
        itemNames = itemNames.slice(0, -1);
        itemAmounts = itemAmounts.slice(0, -1);

        console.log('Item Names:', itemNames);
        console.log('Item Amounts:', itemAmounts);
        console.log('Total Price:', totalPrice.toFixed(2));

        // Send the itemNames, itemAmounts, and totalPrice to your API using fetch
        const url =
            'https://localhost:7004/api/Items/SaveCartList' +
            `?itemNames=${encodeURIComponent(itemNames.trim())}` +
            `&itemAmounts=${encodeURIComponent(itemAmounts.trim())}` +
            `&totalPrice=${encodeURIComponent(totalPrice.toFixed(2)).trim()}` +
            `&ordererName=${encodeURIComponent(userName).trim()}`;

        fetch(url, {
            method: 'POST',
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the API response if needed
                console.log('API response:', data);
            })
            .catch((error) => {
                // Handle any errors during the fetch request
                console.error('Error:', error);
            });
    }
}



function AddToCart() {
    var itemNameTag = document.querySelector('.itemBox'); // Assuming the itemBox class is used for the item name element
    var itemPriceTag = document.querySelector('.itemPrice'); // Assuming the itemPrice class is used for the item price element

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

const addToCartButton = document.getElementById('addtoCart') as HTMLButtonElement;
if (addToCartButton !== null) {
    addToCartButton.addEventListener("click", AddToCart, false);
}






