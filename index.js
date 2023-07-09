const inputField = document.getElementById('input-field');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list');

let itemList = store.get('shoppingList') || [];

addButton.addEventListener('click', function () {
  const inputValue = inputField.value;
  clearInputField();
  addItemToShoppingList(inputValue);
});

function addItemToShoppingList(item) {
  itemList.push(item);
  updateShoppingList();
  saveItemListToStorage();
}

function updateShoppingList() {
  clearShoppingList();
  if (itemList.length > 0) {
    itemList.forEach(function (item, index) {
      addItemToShoppingListDOM(item, index);
    });
  } else {
    shoppingList.innerHTML = 'No items here .... yet.';
  }
}

function clearShoppingList() {
  shoppingList.innerHTML = '';
}

function clearInputField() {
  inputField.value = '';
}

function addItemToShoppingListDOM(item, index) {
  const listElement = document.createElement('li');
  listElement.textContent = item;
  shoppingList.append(listElement);

  listElement.addEventListener('click', function () {
    removeItemFromShoppingList(index);
  });
}

function removeItemFromShoppingList(index) {
  itemList.splice(index, 1);
  updateShoppingList();
  saveItemListToStorage();
}

function saveItemListToStorage() {
  store.set('shoppingList', itemList);
}


document.addEventListener('DOMContentLoaded', updateShoppingList);
