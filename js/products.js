// ============================================
// Product Data & Rendering
// ============================================

const products = [
  {
    id: 1,
    name: "Áo Thun Trắng Essential",
    price: 350000,
    category: "ao",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
    description: "Áo thun trắng basic chất liệu cotton 100%, form regular fit thoải mái. Thiết kế tối giản phù hợp cho mọi dịp.",
    sizes: ["S", "M", "L", "XL"],
    featured: true
  },
  {
    id: 2,
    name: "Quần Jeans Slim Fit",
    price: 650000,
    category: "quan",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop",
    description: "Quần jeans slim fit màu xanh đậm, chất liệu denim co giãn nhẹ mang lại sự thoải mái suốt cả ngày.",
    sizes: ["28", "30", "32", "34"],
    featured: true
  },
  {
    id: 3,
    name: "Áo Sơ Mi Linen",
    price: 520000,
    category: "ao",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
    description: "Áo sơ mi linen tự nhiên, thoáng mát cho mùa hè. Kiểu dáng relaxed fit mang phong cách thanh lịch.",
    sizes: ["S", "M", "L", "XL"],
    featured: true
  },
  {
    id: 4,
    name: "Áo Khoác Bomber",
    price: 890000,
    category: "ao",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
    description: "Áo khoác bomber phong cách đường phố, chất liệu nylon nhẹ chống gió. Lớp lót mềm mại giữ ấm tốt.",
    sizes: ["S", "M", "L", "XL"],
    featured: true
  },
  {
    id: 5,
    name: "Quần Kaki Chinos",
    price: 480000,
    category: "quan",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop",
    description: "Quần kaki chinos form straight, chất vải cotton pha spandex mềm mại. Phù hợp cả đi làm lẫn dạo phố.",
    sizes: ["28", "30", "32", "34"],
    featured: false
  },
  {
    id: 6,
    name: "Túi Tote Vải Canvas",
    price: 280000,
    category: "phukien",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=800&fit=crop",
    description: "Túi tote vải canvas dày dặn, thiết kế tối giản với quai xách chắc chắn. Đựng được laptop 14 inch.",
    sizes: ["One Size"],
    featured: true
  },
  {
    id: 7,
    name: "Áo Polo Classic",
    price: 420000,
    category: "ao",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=800&fit=crop",
    description: "Áo polo classic với chất liệu pique cotton cao cấp. Cổ áo dệt kim giữ form tốt sau nhiều lần giặt.",
    sizes: ["S", "M", "L", "XL"],
    featured: false
  },
  {
    id: 8,
    name: "Quần Short Thể Thao",
    price: 320000,
    category: "quan",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=800&fit=crop",
    description: "Quần short thể thao chất liệu quick-dry, thoáng khí. Thiết kế có túi ẩn tiện lợi.",
    sizes: ["S", "M", "L", "XL"],
    featured: false
  },
  {
    id: 9,
    name: "Mũ Bucket Hat",
    price: 190000,
    category: "phukien",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&h=800&fit=crop",
    description: "Mũ bucket hat phong cách streetwear, chất liệu cotton twill. Vành rộng vừa phải che nắng tốt.",
    sizes: ["One Size"],
    featured: true
  },
  {
    id: 10,
    name: "Áo Hoodie Oversize",
    price: 580000,
    category: "ao",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop",
    description: "Áo hoodie oversize nỉ bông dày dặn, giữ ấm cực tốt. Thiết kế unisex phù hợp cả nam và nữ.",
    sizes: ["M", "L", "XL"],
    featured: true
  },
  {
    id: 11,
    name: "Thắt Lưng Da Bò",
    price: 350000,
    category: "phukien",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
    description: "Thắt lưng da bò thật, mặt khóa kim loại mờ sang trọng. Bề mặt da mịn, càng dùng càng đẹp.",
    sizes: ["One Size"],
    featured: false
  },
  {
    id: 12,
    name: "Áo Len Cổ Lọ",
    price: 620000,
    category: "ao",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
    description: "Áo len cổ lọ dệt kim mềm mại, giữ ấm tuyệt vời cho mùa đông. Phom regular fit thanh lịch.",
    sizes: ["S", "M", "L", "XL"],
    featured: true
  }
];

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
