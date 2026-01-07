document.addEventListener('DOMContentLoaded', function () {
    const cartKey = 'cart';
    const tbody = document.getElementById('cart-items');
    const template = document.getElementById('cart-item-template');
    const totalPriceEl = document.getElementById('total-price');
    const clearBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout');

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(cartKey)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }

    function formatPrice(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function render() {
        const cart = getCart();
        tbody.innerHTML = '';
        let total = 0;

        cart.forEach((item, idx) => {
            const node = template.content.cloneNode(true);
            const tr = node.querySelector('tr');
            tr.dataset.index = idx;

            const img = node.querySelector('.item-thumb');
            const title = node.querySelector('.item-title');
            const option = node.querySelector('.item-option');
            const priceEl = node.querySelector('.price');
            const qtyInput = node.querySelector('.qty-input');
            const subEl = node.querySelector('.subprice');

            img.src = item.img || '../img/topside image.avif';
            title.textContent = item.title || '상품명 없음';
            option.textContent = item.option ? item.option : '';
            priceEl.textContent = formatPrice(item.price || 0);
            qtyInput.value = item.qty || 1;
            const sub = (item.price || 0) * (item.qty || 1);
            subEl.textContent = formatPrice(sub);

            total += sub;

            // attach events
            node.querySelector('.qty-increase').addEventListener('click', () => {
                changeQty(idx, (Number(qtyInput.value) || 1) + 1);
            });
            node.querySelector('.qty-decrease').addEventListener('click', () => {
                const v = (Number(qtyInput.value) || 1) - 1;
                changeQty(idx, v < 1 ? 1 : v);
            });
            qtyInput.addEventListener('change', (e) => {
                let v = Number(e.target.value) || 1;
                if (v < 1) v = 1;
                changeQty(idx, v);
            });
            node.querySelector('.remove-item').addEventListener('click', () => {
                removeItem(idx);
            });

            tbody.appendChild(node);
        });

        totalPriceEl.textContent = formatPrice(total);
    }

    function changeQty(index, qty) {
        const cart = getCart();
        if (!cart[index]) return;
        cart[index].qty = qty;
        saveCart(cart);
        render();
    }

    function removeItem(index) {
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        render();
    }

    clearBtn.addEventListener('click', function () {
        if (confirm('장바구니를 비우시겠어요?')) {
            localStorage.removeItem(cartKey);
            render();
        }
    });

    checkoutBtn.addEventListener('click', function () {
        const cart = getCart();
        if (!cart || cart.length === 0) {
            alert('장바구니에 상품이 없습니다.');
            return;
        }
        // 간단한 시뮬레이션: 결제 후 장바구니 비우기
        if (confirm('주문을 진행하시겠습니까?')) {
            // 실제 구현에서는 서버로 주문정보 전송 필요
            alert('주문이 완료되었습니다. (시뮬레이션)');
            localStorage.removeItem(cartKey);
            render();
            // 주문완료 페이지로 이동하려면 아래 주석 해제 후 경로 수정
            // window.location.href = '../userLog/orderComplete.html';
        }
    });

    render();
});
