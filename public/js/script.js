let shopItems = [
  {
    "name": "Item One",
    "image": "//placehold.it/100",
    "price": 50,
    "id": 0,
    "quantity": 0
  },
  {
    "name": "Item Two",
    "image": "//placehold.it/100",
    "price": 100,
    "id": 1,
    "quantity": 0
  },
  {
    "name": "Item Three",
    "image": "//placehold.it/100",
    "price": 51,
    "id": 2,
    "quantity": 0
  },
  {
    "name": "Item Four",
    "image": "//placehold.it/100",
    "price": 110,
    "id": 3,
    "quantity": 0
  },
  {
    "name": "Item Five",
    "image": "//placehold.it/100",
    "price": 129,
    "id": 4,
    "quantity": 0
  },
  {
    "name": "Item Six",
    "image": "//placehold.it/100",
    "price": 63,
    "id": 5,
    "quantity": 0
  }
];

let coupons = {
  "1ABC9C": "10",
  "8E44AD": "20",
  "ECF0F1": "10",
  "ECF0F1": "45",
  "D35400": "25",
  "F1C40F": "12"
};

let cartTotal = 0;

const renderShopItem = item => {
  return `
  <div class="m-4 flex font-bold" data-id="${item.id}">
    <div class="w-1/2 flex items-center justify-center sm:hidden">
      <img src="${item.image}" class="w-32 rounded shadow-sm">
    </div>
    <div class="w-1/2 flex sm:w-full sm:flex-row flex-col sm:justify-center">
      <div class="sm:w-1/2 flex flex-wrap items-center sm:justify-start">
        <img src="${item.image}" class="hidden sm:block w-16 rounded shadow-sm">
        <p class="self-center m-2 text-xl">${item.name}</p>
      </div>
      <div class="sm:w-1/4 font-bold flex items-center sm:justify-center text-center p-2">₹
        <span>${item.price}</span></div>
      <div class="sm:w-1/4 font-bold flex items-center sm:justify-center p-2">
        <button class="w-8 bg-gray-500 hover:bg-gray-600 rounded-l text-gray-100 remove-item">-</button>
        <span class="text-center w-8 item-quantity font-normal">${item.quantity}</span>
        <button class="w-8 bg-gray-500 hover:bg-gray-600 rounded-r text-gray-100 add-item">+</button>
      </div>
    </div>
  </div>
  `;
}

const renderShop = () => {
  const shop = document.querySelector('.shop-items');
  shopItems.forEach((item) => {
    shop.innerHTML += renderShopItem(item);
  });
}

renderShop();

let incButtons = Array.from(document.querySelectorAll('.add-item'));
let decButtons = Array.from(document.querySelectorAll('.remove-item'));

const increaseQuantity = (e) => {
  const button = e.target;

  let shopItem = button.parentElement.parentElement.parentElement;
  let itemID = shopItem.getAttribute('data-id');

  let itemQuantity = button.parentElement.querySelector('.item-quantity');
  itemQuantity.innerHTML = +itemQuantity.innerHTML + 1;


  for (let i = 0; i < shopItems.length; i++) {
    if (shopItems[i].id == itemID) {
      shopItems[i].quantity += 1;
      cartTotal += shopItems[i].price;
    }
  }
  renderCart();
  renderTotal();
}

const decreaseQuantity = (e) => {
  const button = e.target;

  let shopItem = button.parentElement.parentElement.parentElement;
  let itemID = shopItem.getAttribute('data-id');

  let itemQuantity = button.parentElement.querySelector('.item-quantity');

  if (+itemQuantity.innerHTML > 0) {
    itemQuantity.innerHTML = +itemQuantity.innerHTML - 1;
    for (let i = 0; i < shopItems.length; i++) {
      if (shopItems[i].id == itemID) {
        shopItems[i].quantity -= 1;
        cartTotal -= shopItems[i].price;
      }
    }
    renderCart();
    renderTotal();
  }
}

incButtons.forEach(btn => btn.addEventListener('click', increaseQuantity));
decButtons.forEach(btn => btn.addEventListener('click', decreaseQuantity));

const renderCartItem = (item) => {
  return `
  <tr>
  <td class="py-2"><span>${item.quantity}</span>✕${item.name}</td>
  <td class="py-2 text-right">${item.quantity * item.price}</td>
  </tr>
  `;
}

const renderCart = () => {
  const cart = document.querySelector('.cart');
  let cartItems = '';
  shopItems.forEach(item => {
    if (item.quantity > 0) {
      cartItems += renderCartItem(item);
    }
  });
  cart.innerHTML = cartItems;
}

const renderTotal = () => {
  document.querySelector('.cart-total').innerHTML = cartTotal;
}

let checkoutButton = document.querySelector('.checkout');


const applyCoupon = () => {
  incButtons.forEach(btn => btn.removeEventListener('click', increaseQuantity));
  decButtons.forEach(btn => btn.removeEventListener('click', decreaseQuantity));

  let appliedCouponValue = 0;
  let checkoutTotal = cartTotal;

  let couponInput = document.querySelector('.coupon').value;
  let couponText = '';

  if (couponInput === '') {
    couponText = `<p class="italic text-gray-500">No coupon applied</p>`;
  } else if (!(couponInput in coupons)) {
    couponText = `<p class="italic text-red-500">Sorry, incorrect coupon.</p>`;
  }
  else {
    appliedCouponValue = +coupons[couponInput];
    checkoutTotal = checkoutTotal * (100 - appliedCouponValue) / 100;
    couponText = `<p class="italic text-green-500">Yay! Coupon for ${appliedCouponValue}% applied.</p>`;
  }

  let checkoutSection = `
  ${couponText}
  <p class="text-lg">Cart Value: <span class="float-right font-bold cart-total">${checkoutTotal}</span></p>
  <button class="block text-white bg-green-500 leading-tight text-sm p-4 mt-4 mx-auto rounded-full">Proceed to
  Checkout</button>
  `;

  document.querySelector('.apply-coupon').innerHTML = checkoutSection;
};

checkoutButton.addEventListener('click', applyCoupon);