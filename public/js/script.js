let shopItems = [{
  "name": "Item One",
  "image": "//placehold.it/300x200",
  "price": "50",
  "id": "0",
  "quantity": "1"
}, {
  "name": "Item Two",
  "image": "//placehold.it/300x200",
  "price": "100",
  "id": "1",
  "quantity": "1"
}, {
  "name": "Item Three",
  "image": "//placehold.it/300x200",
  "price": "51",
  "id": "2",
  "quantity": "1"
}, {
  "name": "Item Four",
  "image": "//placehold.it/300x200",
  "price": "110",
  "id": "3",
  "quantity": "1"
}, {
  "name": "Item Five",
  "image": "//placehold.it/300x200",
  "price": "129",
  "id": "4",
  "quantity": "1"
}, {
  "name": "Item Six",
  "image": "//placehold.it/300x200",
  "price": "63",
  "id": "5",
  "quantity": "1"
}];

let coupons = {
  "1ABC9C": "10",
  "8E44AD": "20",
  "ECF0F1": "10",
  "ECF0F1": "45",
  "D35400": "25",
  "F1C40F": "12"
};

let appliedCouponValue = 0;

let checkoutButton = document.querySelector('.checkout');
checkoutButton.addEventListener('click', function() {
  let couponInput = document.querySelector('.coupon').value;
  let couponText = document.querySelector('.coupon-text');
  if (!(couponInput in coupons)) {
    couponText.classList.add('text-red-500');
    couponText.innerHTML = `
    <p>Sorry, incorrect coupon.</p>
    `;
  } else {
    appliedCouponValue = parseInt(coupons[couponInput]);
    checkoutTotal = checkoutTotal * (100 - appliedCouponValue)/100;
    while (cartItems.length) {
      cartItems.pop();
    }
    
    let couponText = document.querySelector('.coupon-text');
    couponText.classList.add('text-green-500');
    couponText.innerHTML = `
    <p>Yay! Coupon for ${appliedCouponValue}% applied!</p>
    `;
  }
  couponText.classList.remove('hidden');
  let checkoutValue = document.querySelector('.checkout-value');
  checkoutValue.querySelector('.checkout-amount').innerText = checkoutTotal;
  checkoutValue.classList.remove('hidden');
})


let cartItems = [];

let checkoutTotal = 0;

const renderShopItem = item => {
  return `
<div class="w-1/2 md:w-1/4 bg-white rounded-lg shadow-md p-6 m-4" data-id="${item.id}">
<img class="w-full object-cover object-center rounded" src="${item.image}" alt="${item.name}">
<h3 class="mt-3 text-xl font-bold">${item.name} <span class="float-right">₹ ${item.price}</span></h3>
<div class="mt-2 flex justify-center">
<button
class="add-item inline-block py-2 px-4 bg-blue-400 hover:bg-blue-500 rounded-sm text-white uppercase text-xs font-bold leading-tight">Add
to Cart</button>
</div>
</div>
`;
}

const renderShop = () => {
  const shopItemsContainer = document.querySelector('.shop-items');
  shopItems.forEach((item) => {
      shopItemsContainer.innerHTML += renderShopItem(item);
  });
}

renderShop();

let shoppingCart = document.querySelector('.shopping-cart');

let addButtons = Array.from(document.querySelectorAll('.add-item'));


const addCartItem = (e) => {
  let button = e.target;
  let shopItem = button.parentElement.parentElement;
  let itemID = shopItem.getAttribute('data-id');

  for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === itemID) {
          alert("Item already in cart.");
          return;
      }
  }

  for (let i = 0; i < shopItems.length; i++) {
      if (shopItems[i].id === itemID) {
          cartItems.push(shopItems[i]);
          break;
      }
  }
  renderCart();
  updateCartTotal();
}

addButtons.forEach(btn => {
  btn.addEventListener('click', addCartItem);
})

const updateCartItem = e => {
  let quantity = e.value;

  if (isNaN(quantity) || quantity < 1) {
      alert('Minimum quantity is 1');
      e.value = 1;
  }

  let cartRow = e.parentElement.parentElement;
  let itemID = cartRow.getAttribute('data-id');
  let itemTotal = cartRow.querySelector('.cart-item-total');
  let itemPrice = cartRow.querySelector('.cart-item-price').innerText;
  for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === itemID) {
          cartItems[i].quantity = e.value;
      }
  }

  itemTotal.innerText = parseInt(e.value) * parseInt(itemPrice);

  updateCartTotal();
}


const renderCartItem = (item) => {
  return `
<tr class="cart-row" data-id="${item.id}">
  <td class="px-4 py-2">${item.name}</td>
  <td class="px-4 py-2 text-center cart-item-price">${item.price}</td>
  <td class="px-4 py-2 w-1/4 text-center">
    <input class="cart-item-quantity w-12 bg-gray-100 rounded px-2" type="number" value="${item.quantity}" onchange="updateCartItem(this)">
  </td>
  <td class="px-4 py-2 text-center">
    <span class="cart-item-total">${item.price * item.quantity}</span>
    <button
      class="remove-item inline-block ml-2 py-1 px-2 bg-red-400 hover:bg-red-500 rounded-sm text-white uppercase text-xs font-bold leading-tight float-right" onclick="removeCartItem(this)">✕</button>
  </td>
</tr>
`
}

const renderCart = () => {
  let newCart = "";
  cartItems.forEach(item => {
      newCart += renderCartItem(item);
  })
  shoppingCart.innerHTML = newCart;
}

const removeCartItem = (e) => {
  let itemRow = e.parentElement.parentElement;
  let itemID = itemRow.getAttribute('data-id');
  itemRow.remove();
  for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id == itemID) {
          cartItems[i].quantity = 1;
          cartItems.splice(i, 1);
          break;
      }
  }
  updateCartTotal();
}

const updateCartTotal = () => {
  let total = 0;
  const totalDOM = document.querySelector('.cart-total');

  const cartRows = Array.from(document.querySelectorAll('.cart-row'));

  cartRows.forEach(row => {
      total += parseInt(row.querySelector('.cart-item-price').innerText) * row.querySelector('.cart-item-quantity').value;
  })
  checkoutTotal = total;
  totalDOM.innerText = checkoutTotal;
}