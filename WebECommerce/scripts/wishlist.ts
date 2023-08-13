
function handleClick(event: Event) {
    const target = event.target as HTMLElement;

    if (target.id === 'wishListbutton') {
        const itemDiv = target.closest('.itemDiv');

        if (itemDiv) {
            const itemIdElement = itemDiv.querySelector('.itemId');

            if (itemIdElement) {
                const wishId = itemIdElement.textContent?.trim();
                console.log(`itemId value: ${wishId}`);
                const url = 'https://localhost:7004/api/Users/AddToWishList' + '?wishId=' + wishId + "&userName=" + userEmail;
                fetch(url, {
                    method: 'POST'
                })
                    .then(function (response) {
                        if (response.ok) {
                            console.log('${wishId} successfully added to wishlist.');
                        } else {
                            // Request failed
                            throw new Error(response.statusText);
                        }
                    })
            } else {
                console.log('itemId element not found inside itemDiv.');
            }
        }
    }
}

document.addEventListener('click', handleClick);

function LoadMyWishList() {
    const favoriteitemsDiv = document.querySelector('#favoritemsDiv');
    const url = 'https://localhost:7004/api/Users/GetMyWishList' + '?userName=' + userEmail;

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
                var fitemDiv = document.createElement("div");
                fitemDiv.classList.add('fitemDiv');
                fitemDiv.setAttribute('id', 'fitemDiv');

                var itemImage = document.createElement("img");
                itemImage.classList.add('itemImage');
                itemImage.setAttribute('id', 'itemImage');
                itemImage.src = "/images/" + item.itemImage;

                var itemId = document.createElement("p");
                itemId.classList.add('itemId');
                itemId.setAttribute('id', 'itemId');
                itemId.textContent = item.itemId;

                var wishListbutton = document.createElement("button");
                wishListbutton.classList.add('wishListbutton');
                wishListbutton.setAttribute('id', 'wishListbutton');
                wishListbutton.textContent = "Wish";

                var itemPara = document.createElement("p");
                itemPara.classList.add('itemBox');
                itemPara.setAttribute('id', 'itemBox');
                itemPara.textContent = item.itemName;

                var itemPrice = document.createElement("p");
                itemPrice.classList.add('itemPrice');
                itemPrice.textContent = item.itemPrice + " " + item.itemPriceTag;

                fitemDiv.appendChild(itemImage);
                fitemDiv.appendChild(itemId);
                fitemDiv.appendChild(itemPara);
                fitemDiv.appendChild(itemPrice);
                fitemDiv.appendChild(wishListbutton);

                favoriteitemsDiv.appendChild(fitemDiv);
            });
        })
        .catch(function (error) {
            console.error('Error occurred while sending the request:', error);
        });
}
