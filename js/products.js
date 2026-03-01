// ============================================
// Product Data & Rendering
// ============================================
// Dữ liệu sản phẩm được load từ data/products.json
// Để thêm sản phẩm mới, chỉ cần thêm object vào file JSON đó
// ID sẽ được tự động sinh (index + 1)
// ============================================

let products = [];
let productsLoaded = false;
const productsReadyCallbacks = [];

// Load products from JSON file
function loadProducts() {
  return fetch('data/products.json')
    .then(res => res.json())
    .then(data => {
      products = data.map((item, index) => ({
        ...item,
        id: index + 1
      }));
      productsLoaded = true;
      productsReadyCallbacks.forEach(cb => cb());
      productsReadyCallbacks.length = 0;
    });
}

// Wait for products to be ready, then run callback
function onProductsReady(callback) {
  if (productsLoaded) {
    callback();
  } else {
    productsReadyCallbacks.push(callback);
  }
}

// Auto-load on script init
loadProducts();

// Format price to VND
function formatPrice(price) {
  return price.toLocaleString('vi-VN') + '₫';
}

// Get product by ID
function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

// Get featured products
function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

// Get related products (same category, exclude current)
function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

// Filter & sort products
function filterProducts(category = 'all', sortBy = 'default') {
  let filtered = [...products];

  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  switch (sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return filtered;
}

// Render a product card HTML
function renderProductCard(product) {
  return `
    <div class="product-card fade-in" onclick="window.location.href='product.html?id=${product.id}'">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-actions" onclick="event.stopPropagation()">
          <button class="btn btn-primary btn-sm" onclick="addToCartQuick(${product.id})">
            Thêm vào giỏ
          </button>
        </div>
      </div>
      <div class="product-info">
        <div>
          <div class="product-name">${product.name}</div>
          <div class="product-category-label">${getCategoryLabel(product.category)}</div>
        </div>
        <div class="product-price">${formatPrice(product.price)}</div>
      </div>
    </div>
  `;
}

// Get Vietnamese category label
function getCategoryLabel(category) {
  const labels = {
    'ao': 'Áo',
    'quan': 'Quần',
    'phukien': 'Phụ kiện'
  };
  return labels[category] || category;
}

// Render products grid
function renderProductsGrid(containerId, productList) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = productList.map(renderProductCard).join('');
  initFadeIn();
}

// Quick add to cart (default size, qty 1)
function addToCartQuick(productId) {
  const product = getProductById(productId);
  if (!product) return;
  const defaultSize = product.sizes[0];
  addToCart(productId, defaultSize, 1);
  showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
}
