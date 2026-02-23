// ============================================
// Cart Logic (localStorage)
// ============================================

const CART_KEY = 'noir_fashion_cart';

// Get cart from localStorage
function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// Add item to cart
function addToCart(productId, size, quantity = 1) {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    item => item.productId === productId && item.size === size
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ productId, size, quantity });
  }

  saveCart(cart);
}

// Remove item from cart
function removeFromCart(productId, size) {
  let cart = getCart();
  cart = cart.filter(
    item => !(item.productId === productId && item.size === size)
  );
  saveCart(cart);
}

// Update item quantity
function updateCartItemQty(productId, size, newQty) {
  const cart = getCart();
  const item = cart.find(
    item => item.productId === productId && item.size === size
  );

  if (item) {
    if (newQty <= 0) {
      removeFromCart(productId, size);
    } else {
      item.quantity = newQty;
      saveCart(cart);
    }
  }
}

// Get total items count
function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Get cart total price
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

// Update cart badge in header
function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.setAttribute('data-count', count);
  });
}

// Clear entire cart
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

// Render cart page
function renderCartPage() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSummaryContainer = document.getElementById('cart-summary');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartContentEl = document.getElementById('cart-content');

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    if (cartEmptyEl) cartEmptyEl.style.display = 'block';
    if (cartContentEl) cartContentEl.style.display = 'none';
    return;
  }

  if (cartEmptyEl) cartEmptyEl.style.display = 'none';
  if (cartContentEl) cartContentEl.style.display = 'grid';

  // Render items
  cartItemsContainer.innerHTML = cart.map(item => {
    const product = getProductById(item.productId);
    if (!product) return '';
    return `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-variant">Size: ${item.size}</div>
          <div class="cart-item-qty">
            <button onclick="changeQty(${product.id}, '${item.size}', -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty(${product.id}, '${item.size}', 1)">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <div class="cart-item-price">${formatPrice(product.price * item.quantity)}</div>
          <div class="cart-item-remove" onclick="removeItem(${product.id}, '${item.size}')">Xoá</div>
        </div>
      </div>
    `;
  }).join('');

  // Render summary
  const subtotal = getCartTotal();
  const shipping = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  if (cartSummaryContainer) {
    cartSummaryContainer.innerHTML = `
      <h3>Tóm tắt đơn hàng</h3>
      <div class="cart-summary-row">
        <span>Tạm tính</span>
        <span>${formatPrice(subtotal)}</span>
      </div>
      <div class="cart-summary-row">
        <span>Phí vận chuyển</span>
        <span>${shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
      </div>
      ${subtotal < 500000 ? '<div class="cart-summary-row" style="font-size:0.75rem;color:var(--gray-400)"><span>Miễn phí ship cho đơn từ 500.000₫</span></div>' : ''}
      <div class="cart-summary-row total">
        <span>Tổng cộng</span>
        <span>${formatPrice(total)}</span>
      </div>
      <button class="btn btn-primary" onclick="checkout()">Thanh toán</button>
    `;
  }
}

// Change quantity helper
function changeQty(productId, size, delta) {
  const cart = getCart();
  const item = cart.find(
    i => i.productId === productId && i.size === size
  );
  if (item) {
    updateCartItemQty(productId, size, item.quantity + delta);
    renderCartPage();
  }
}

// Remove item helper
function removeItem(productId, size) {
  removeFromCart(productId, size);
  renderCartPage();
}

// Checkout
function checkout() {
  const count = getCartCount();
  if (count === 0) return;
  showToast('Cảm ơn bạn! Đơn hàng đã được ghi nhận.');
  clearCart();
  setTimeout(() => {
    renderCartPage();
  }, 500);
}
