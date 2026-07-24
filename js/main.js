// DAPUR MULIA - Main JavaScript Engine

// Format Rupiah
function formatRupiah(amount) {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount);
}

// Generate stars HTML
function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
        else if (i - rating < 1) stars += '<i class="fas fa-star-half-alt"></i>';
        else stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

// Product card HTML
function createProductCard(product, showAddCart) {
    if (showAddCart === undefined) showAddCart = true;
    const hasDiscount = product.discountPrice && product.discountPrice > 0;
    var badges = '';
    if (product.isNew) badges += '<span class="badge bg-success me-1">Baru</span> ';
    if (product.isPopular) badges += '<span class="badge bg-danger me-1">Populer</span> ';
    
    var html = '<div class="col-lg-3 col-md-4 col-6">';
    html += '<div class="product-card">';
    if (badges) html += '<div class="product-badge">' + badges + '</div>';
    html += '<div class="product-image"><i class="fas fa-cake-candles placeholder-icon"></i></div>';
    html += '<div class="product-body">';
    html += '<div class="product-category">' + product.category + '</div>';
    html += '<h6 class="product-title"><a href="product-detail.html?id=' + product.id + '">' + product.name + '</a></h6>';
    html += '<div class="product-rating">' + getStars(product.rating) + ' <span class="text-muted ms-1">(' + product.reviews + ')</span></div>';
    html += '<div class="product-price">';
    html += '<span class="price-current">' + formatRupiah(hasDiscount ? product.discountPrice : product.price) + '</span>';
    if (hasDiscount) html += '<span class="price-original">' + formatRupiah(product.price) + '</span>';
    html += '</div>';
    html += '<div class="product-actions">';
    if (showAddCart) html += '<button onclick="addToCart(' + product.id + ')" class="btn btn-primary btn-sm"><i class="fas fa-shopping-cart me-1"></i>Keranjang</button> ';
    html += '<a href="https://wa.me/6281271273063?text=Halo%20Dapur%20Mulia,%20saya%20mau%20pesan%20' + encodeURIComponent(product.name) + '" target="_blank" class="btn btn-success btn-sm"><i class="fab fa-whatsapp"></i></a>';
    html += '</div></div>';
    return html;
}

// Initialize home page
function initHome() {
    var catGrid = document.getElementById('categoriesGrid');
    if (catGrid) {
        var html = '';
        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            html += '<div class="col-lg-2 col-md-3 col-4">';
            html += '<a href="products.html?category=' + encodeURIComponent(cat.name) + '" class="category-card">';
            html += '<div class="category-icon"><i class="fas ' + (cat.icon || 'fa-tag') + '"></i></div>';
            html += '<h6>' + cat.name + '</h6>';
            html += '<small>' + cat.count + ' produk</small>';
            html += '</a></div>';
        }
        catGrid.innerHTML = html;
    }

    var featGrid = document.getElementById('productGrid');
    if (featGrid) {
        var html = '';
        var count = 0;
        for (var i = 0; i < productsData.length && count < 8; i++) {
            if (productsData[i].isPopular) {
                html += createProductCard(productsData[i]);
                count++;
            }
        }
        featGrid.innerHTML = html;
    }

    var testGrid = document.getElementById('testimonialGrid');
    if (testGrid) {
        var html = '';
        for (var i = 0; i < testimonials.length; i++) {
            var t = testimonials[i];
            html += '<div class="col-lg-4 col-md-6">';
            html += '<div class="testimonial-card">';
            html += '<div class="testimonial-stars">' + getStars(t.rating) + '</div>';
            html += '<p class="testimonial-text">"' + t.text + '"</p>';
            html += '<div class="testimonial-author">';
            html += '<div class="testimonial-avatar"><i class="fas fa-user"></i></div>';
            html += '<div><div class="testimonial-name">' + t.name + '</div>';
            html += '<div class="testimonial-role">' + t.role + '</div>';
            html += '</div></div>';
        }
        testGrid.innerHTML = html;
    }

    updateCartCount();
}

// Products page
function initProducts() {
    var grid = document.getElementById('productsGrid');
    var catFilter = document.getElementById('categoryFilter');
    var searchInput = document.getElementById('searchInput');
    var sortSelect = document.getElementById('sortSelect');
    var countBadge = document.getElementById('productCount');
    if (!grid) return;

    if (catFilter) {
        var cats = [];
        for (var i = 0; i < productsData.length; i++) {
            if (cats.indexOf(productsData[i].category) === -1) cats.push(productsData[i].category);
        }
        cats.sort();
        for (var i = 0; i < cats.length; i++) {
            var c = cats[i];
            var label = document.createElement('label');
            label.className = 'form-check-label d-block mb-1';
            label.innerHTML = '<input type="checkbox" class="form-check-input me-1 category-cb" value="' + c + '"> ' + c;
            catFilter.appendChild(label);
        }
    }

    function filterProducts() {
        var filtered = [];
        for (var i = 0; i < productsData.length; i++) filtered.push(productsData[i]);
        
        var query = searchInput ? searchInput.value.toLowerCase() : '';
        var checkboxes = document.querySelectorAll('.category-cb:checked');
        var selectedCats = [];
        for (var i = 0; i < checkboxes.length; i++) selectedCats.push(checkboxes[i].value);
        var sort = sortSelect ? sortSelect.value : '';

        if (query) {
            var temp = [];
            for (var i = 0; i < filtered.length; i++) {
                if (filtered[i].name.toLowerCase().indexOf(query) !== -1 || filtered[i].category.toLowerCase().indexOf(query) !== -1) {
                    temp.push(filtered[i]);
                }
            }
            filtered = temp;
        }

        if (selectedCats.length > 0) {
            var temp = [];
            for (var i = 0; i < filtered.length; i++) {
                if (selectedCats.indexOf(filtered[i].category) !== -1) temp.push(filtered[i]);
            }
            filtered = temp;
        }

        if (sort === 'low') {
            filtered.sort(function(a, b) { return (a.discountPrice || a.price) - (b.discountPrice || b.price); });
        } else if (sort === 'high') {
            filtered.sort(function(a, b) { return (b.discountPrice || b.price) - (a.discountPrice || a.price); });
        } else if (sort === 'popular') {
            filtered.sort(function(a, b) { return b.reviews - a.reviews; });
        } else if (sort === 'new') {
            filtered.sort(function(a, b) { return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); });
        }

        if (countBadge) countBadge.textContent = filtered.length + ' produk';
        
        if (filtered.length > 0) {
            var html = '';
            for (var i = 0; i < filtered.length; i++) html += createProductCard(filtered[i]);
            grid.innerHTML = html;
        } else {
            grid.innerHTML = '<div class="col-12 text-center py-5"><i class="fas fa-search fa-3x text-muted mb-3"></i><h5>Produk tidak ditemukan</h5><p class="text-muted">Coba kata kunci lain</p></div>';
        }
    }

    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (catFilter) catFilter.addEventListener('change', filterProducts);
    if (sortSelect) sortSelect.addEventListener('change', filterProducts);

    var params = new URLSearchParams(window.location.search);
    if (params.get('category') && catFilter) {
        var cats = params.get('category').split(',');
        var cbs = document.querySelectorAll('.category-cb');
        for (var i = 0; i < cbs.length; i++) {
            if (cats.indexOf(cbs[i].value) !== -1) cbs[i].checked = true;
        }
    }
    if (params.get('search') && searchInput) searchInput.value = params.get('search');

    filterProducts();
}

// Product detail page
function initProductDetail() {
    var container = document.getElementById('productDetail');
    if (!container) return;
    var params = new URLSearchParams(window.location.search);
    var id = parseInt(params.get('id'));
    var product = null;
    for (var i = 0; i < productsData.length; i++) {
        if (productsData[i].id === id) { product = productsData[i]; break; }
    }
    if (!product) {
        container.innerHTML = '<div class="text-center py-5"><h4>Produk tidak ditemukan</h4><a href="products.html" class="btn btn-primary mt-3">Kembali</a></div>';
        return;
    }

    var hasDiscount = product.discountPrice && product.discountPrice > 0;
    document.title = product.name + ' - Dapur Mulia';
    
    var html = '<div class="row g-5">';
    html += '<div class="col-lg-6"><div class="product-detail-image"><i class="fas fa-cake-candles placeholder-icon"></i></div>';
    html += '<div class="col-lg-6">';
    html += '<div class="product-category">' + product.category + '</div>';
    html += '<h2 class="fw-bold">' + product.name + '</h2>';
    html += '<div class="product-rating mb-3">' + getStars(product.rating) + ' <span class="text-muted ms-2">(' + product.reviews + ' ulasan)</span></div>';
    html += '<div class="product-price mb-4">';
    html += '<span class="price-current fs-3">' + formatRupiah(hasDiscount ? product.discountPrice : product.price) + '</span>';
    if (hasDiscount) html += '<span class="price-original fs-5 ms-2">' + formatRupiah(product.price) + '</span><span class="badge bg-danger ms-2">Diskon</span>';
    html += '</div>';
    html += '<p class="text-muted">' + product.description + '</p>';
    html += '<div class="d-flex gap-2 mb-4">';
    html += '<button onclick="addToCart(' + product.id + ')" class="btn btn-primary btn-lg flex-grow-1"><i class="fas fa-shopping-cart me-2"></i>Tambah ke Keranjang</button>';
    html += '<a href="https://wa.me/6281271273063?text=Halo%20Dapur%20Mulia,%20saya%20mau%20pesan%20' + encodeURIComponent(product.name) + '%20-%20' + encodeURIComponent(formatRupiah(hasDiscount ? product.discountPrice : product.price)) + '" target="_blank" class="btn btn-success btn-lg"><i class="fab fa-whatsapp"></i></a>';
    html += '</div>';
    html += '<div class="border-top pt-3">';
    html += '<small class="text-muted d-block mb-1"><i class="fas fa-check-circle text-success me-1"></i> Produk Fresh</small>';
    html += '<small class="text-muted d-block mb-1"><i class="fas fa-truck me-1"></i> Pengiriman ke seluruh Indonesia</small>';
    html += '<small class="text-muted d-block"><i class="fas fa-credit-card me-1"></i> Pembayaran Transfer Bank</small>';
    html += '</div></div>';
    container.innerHTML = html;
}

// Cart
var cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    var existing = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) { existing = cart[i]; break; }
    }
    if (existing) existing.qty = (existing.qty || 1) + 1;
    else cart.push({ id: productId, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Produk ditambahkan ke keranjang!');
}

function updateCartCount() {
    var badges = document.querySelectorAll('.cart-count');
    var total = 0;
    for (var i = 0; i < cart.length; i++) total += (cart[i].qty || 1);
    for (var i = 0; i < badges.length; i++) {
        badges[i].textContent = total;
        badges[i].style.display = total > 0 ? 'flex' : 'none';
    }
}

function showToast(msg) {
    var existing = document.getElementById('toast');
    if (existing) existing.remove();
    var t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = 'position:fixed;top:20px;right:20px;background:#FF7A00;color:white;padding:15px 25px;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.2);z-index:99999;font-weight:500;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function() { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; setTimeout(function() { t.remove(); }, 300); }, 2500);
}

// Cart page
function initCartPage() {
    var container = document.getElementById('cartContainer');
    if (!container) return;

    var urlParams = new URLSearchParams(window.location.search);
    var addId = parseInt(urlParams.get('id'));
    if (addId) addToCart(addId);

    function renderCart() {
        if (cart.length === 0) {
            container.innerHTML = '<div class="text-center py-5"><i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i><h4>Keranjang Kosong</h4><p class="text-muted">Belum ada produk di keranjang Anda.</p><a href="products.html" class="btn btn-primary btn-lg mt-2">Mulai Belanja</a></div>';
            return;
        }
        var total = 0;
        var html = '';
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            var p = null;
            for (var j = 0; j < productsData.length; j++) {
                if (productsData[j].id === item.id) { p = productsData[j]; break; }
            }
            if (!p) continue;
            var price = p.discountPrice || p.price;
            var subtotal = price * (item.qty || 1);
            total += subtotal;
            html += '<div class="cart-item" data-id="' + item.id + '">';
            html += '<div class="cart-item-image"><i class="fas fa-cake-candles placeholder-icon"></i></div>';
            html += '<div class="cart-item-details"><h6 class="mb-1">' + p.name + '</h6><small class="text-muted">' + formatRupiah(price) + ' / pcs</small></div>';
            html += '<div class="qty-control"><button class="qty-btn dec">-</button><input type="text" class="qty-input" value="' + (item.qty || 1) + '" readonly><button class="qty-btn inc">+</button></div>';
            html += '<div class="fw-bold text-primary" style="min-width:100px;text-align:right;">' + formatRupiah(subtotal) + '</div>';
            html += '<button class="btn btn-sm btn-outline-danger remove-item"><i class="fas fa-trash"></i></button>';
            html += '</div>';
        }
        html += '<div class="d-flex justify-content-between align-items-center mt-4 p-3 bg-white rounded shadow-sm">';
        html += '<h5 class="mb-0">Total: <span class="text-primary">' + formatRupiah(total) + '</span></h5>';
        html += '<div><a href="products.html" class="btn btn-outline-primary me-2">Lanjut Belanja</a><a href="checkout.html" class="btn btn-primary btn-lg">Checkout</a></div>';

        container.innerHTML = html;

        var incBtns = container.querySelectorAll('.inc');
        for (var i = 0; i < incBtns.length; i++) {
            (function(btn) {
                btn.onclick = function() {
                    var id = parseInt(this.closest('.cart-item').dataset.id);
                    for (var k = 0; k < cart.length; k++) {
                        if (cart[k].id === id) { cart[k].qty = (cart[k].qty || 1) + 1; break; }
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                };
            })(incBtns[i]);
        }

        var decBtns = container.querySelectorAll('.dec');
        for (var i = 0; i < decBtns.length; i++) {
            (function(btn) {
                btn.onclick = function() {
                    var id = parseInt(this.closest('.cart-item').dataset.id);
                    for (var k = 0; k < cart.length; k++) {
                        if (cart[k].id === id) {
                            if (cart[k].qty > 1) { cart[k].qty--; }
                            else { cart.splice(k, 1); }
                            break;
                        }
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                };
            })(decBtns[i]);
        }

        var removeBtns = container.querySelectorAll('.remove-item');
        for (var i = 0; i < removeBtns.length; i++) {
            (function(btn) {
                btn.onclick = function() {
                    var id = parseInt(this.closest('.cart-item').dataset.id);
                    for (var k = 0; k < cart.length; k++) {
                        if (cart[k].id === id) { cart.splice(k, 1); break; }
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                    showToast('Produk dihapus dari keranjang');
                };
            })(removeBtns[i]);
        }
    }
    renderCart();
}

// Checkout page
function initCheckout() {
    var summary = document.getElementById('orderSummary');
    var form = document.getElementById('checkoutForm');
    if (!summary) return;

    if (cart.length === 0) {
        summary.innerHTML = '<p class="text-muted">Keranjang kosong. <a href="products.html">Belanja dulu yuk!</a></p>';
        return;
    }

    var total = 0;
    var html = '';
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var p = null;
        for (var j = 0; j < productsData.length; j++) {
            if (productsData[j].id === item.id) { p = productsData[j]; break; }
        }
        if (!p) continue;
        var price = p.discountPrice || p.price;
        var subtotal = price * (item.qty || 1);
        total += subtotal;
        html += '<div class="d-flex justify-content-between py-1"><span>' + p.name + ' x' + item.qty + '</span><span>' + formatRupiah(subtotal) + '</span></div>';
    }
    html += '<hr><div class="d-flex justify-content-between fw-bold fs-5"><span>Total</span><span class="text-primary">' + formatRupiah(total) + '</span></div>';
    summary.innerHTML = html;

    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            var name = document.getElementById('custName') ? document.getElementById('custName').value : 'Customer';
            var phone = document.getElementById('custPhone') ? document.getElementById('custPhone').value : '-';
            var address = document.getElementById('custAddress') ? document.getElementById('custAddress').value : '-';
            var notes = document.getElementById('orderNotes') ? document.getElementById('orderNotes').value : '-';

            var msg = '';
            var totalWA = 0;
            for (var i = 0; i < cart.length; i++) {
                var p2 = null;
                for (var j = 0; j < productsData.length; j++) {
                    if (productsData[j].id === cart[i].id) { p2 = productsData[j]; break; }
                }
                if (p2) {
                    var pr = p2.discountPrice || p2.price;
                    msg += '%0A  - ' + p2.name + ' x' + cart[i].qty + ' = ' + formatRupiah(pr * (cart[i].qty || 1));
                    totalWA += pr * (cart[i].qty || 1);
                }
            }

            var waUrl = 'https://wa.me/6281271273063?text=';
            waUrl += 'Halo%20Dapur%20Mulia!%0A%0ASaya%20ingin%20memesan:%0A' + msg;
            waUrl += '%0A%0AData%20Pemesan:%0ANama:%20' + encodeURIComponent(name);
            waUrl += '%0ATelepon:%20' + encodeURIComponent(phone);
            waUrl += '%0AAlamat:%20' + encodeURIComponent(address);
            waUrl += '%0ACatatan:%20' + encodeURIComponent(notes);
            waUrl += '%0A%0ATotal:%20' + encodeURIComponent(formatRupiah(totalWA));
            waUrl += '%0A%0AMohon%20konfirmasi%20pesanan%20saya.%20Terima%20kasih.';

            window.open(waUrl, '_blank');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert('Pesanan berhasil dikirim! Kami akan menghubungi Anda via WhatsApp.');
        };
    }
}

// Run all
document.addEventListener('DOMContentLoaded', function() {
    initHome();
    initProducts();
    initProductDetail();
    initCartPage();
    initCheckout();
});
