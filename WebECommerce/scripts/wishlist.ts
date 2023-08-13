
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
    const url = 'https://localhost:7004/api/Items/GetAllItems';

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
}
