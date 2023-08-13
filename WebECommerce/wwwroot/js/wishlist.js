function handleClick(event) {
    var _a;
    var target = event.target;
    if (target.id === 'wishListbutton') {
        var itemDiv = target.closest('.itemDiv');
        if (itemDiv) {
            var itemIdElement = itemDiv.querySelector('.itemId');
            if (itemIdElement) {
                var wishId = (_a = itemIdElement.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                console.log("itemId value: ".concat(wishId));
                var url = 'https://localhost:7004/api/Users/AddToWishList' + '?wishId=' + wishId + "&userName=" + userEmail;
                fetch(url, {
                    method: 'POST'
                })
                    .then(function (response) {
                    if (response.ok) {
                        console.log('${wishId} successfully added to wishlist.');
                    }
                    else {
                        // Request failed
                        throw new Error(response.statusText);
                    }
                });
            }
            else {
                console.log('itemId element not found inside itemDiv.');
            }
        }
    }
}
document.addEventListener('click', handleClick);
//# sourceMappingURL=wishlist.js.map