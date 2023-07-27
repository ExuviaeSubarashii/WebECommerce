function ExcludeItemByOne() {
    var itemAmount = document.getElementById('itemAmountp');
    var currentValue = parseInt(itemAmount.textContent, 10);
    if (!isNaN(currentValue)) {
        var newValue = currentValue - 1;
        itemAmount.textContent = newValue.toString();
    }
}
var decreaseButton = document.getElementById('decreaseButton');
decreaseButton.addEventListener('click', ExcludeItemByOne);
//# sourceMappingURL=increaseordecrease.js.map