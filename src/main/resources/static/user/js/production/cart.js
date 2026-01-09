document.addEventListener('DOMContentLoaded', function () {
    const cartKey = 'cart';
    const tbody = document.getElementById('cart-items');
    const template = document.getElementById('cart-item-template');
    const totalPriceEl = document.getElementById('total-price');

    // 요소가 없을 경우를 대비해 변수만 선언
    const clearBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout');

    // 1. 데이터 로드 함수
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(cartKey)) || [];
        } catch (e) {
            console.error("장바구니 로드 실패:", e);
            return [];
        }
    }

    // 2. 데이터 저장 함수
    function saveCart(cart) {
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }

    // 3. 가격 포맷 함수
    function formatPrice(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // 4. 화면 그리기 함수 (핵심)
    function render() {
        if (!tbody || !template) return; // 필수 요소 없으면 중단

        const cart = getCart();
        tbody.innerHTML = '';
        let total = 0;

        cart.forEach((item, idx) => {
            const node = template.content.cloneNode(true);

            // 데이터 매핑
            const img = node.querySelector('.item-thumb');
            const title = node.querySelector('.item-title');
            const option = node.querySelector('.item-option');
            const priceEl = node.querySelector('.price');
            const qtyInput = node.querySelector('.qty-input');
            const subEl = node.querySelector('.subprice');

            if(img) img.src = item.img || '../img/topside image.avif';
            if(title) title.textContent = item.title || '상품명 없음';
            if(option) option.textContent = item.option ? item.option : '';
            if(priceEl) priceEl.textContent = formatPrice(item.price || 0);
            if(qtyInput) qtyInput.value = item.qty || 1;

            const sub = (item.price || 0) * (item.qty || 1);
            if(subEl) subEl.textContent = formatPrice(sub);

            total += sub;

            // --- 이벤트 연결 (HTML의 onclick 대신 여기서 처리) ---

            // 수량 증가
            node.querySelector('.qty-increase')?.addEventListener('click', () => {
                changeQty(idx, (Number(qtyInput.value) || 1) + 1);
            });

            // 수량 감소
            node.querySelector('.qty-decrease')?.addEventListener('click', () => {
                const v = (Number(qtyInput.value) || 1) - 1;
                changeQty(idx, v < 1 ? 1 : v);
            });

            // 수량 직접 입력
            qtyInput?.addEventListener('change', (e) => {
                let v = Number(e.target.value) || 1;
                if (v < 1) v = 1;
                changeQty(idx, v);
            });

            // 삭제 버튼 (핵심!)
            node.querySelector('.remove-item')?.addEventListener('click', () => {
                removeItem(idx);
            });

            tbody.appendChild(node);
        });

        if(totalPriceEl) totalPriceEl.textContent = formatPrice(total);
    }

    // 5. 수량 변경 로직
    function changeQty(index, qty) {
        const cart = getCart();
        if (!cart[index]) return;
        cart[index].qty = qty;
        saveCart(cart);
        render();
    }

    // 6. 삭제 로직
    function removeItem(index) {
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        render();
    }

    // --- 하단 버튼 이벤트 (요소가 존재할 때만 실행되도록 수정) ---

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            if (confirm('장바구니를 비우시겠어요?')) {
                localStorage.removeItem(cartKey);
                render();
            }
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            const cart = getCart();
            if (!cart || cart.length === 0) {
                alert('장바구니에 상품이 없습니다.');
                return;
            }
            if (confirm('주문을 진행하시겠습니까?')) {
                alert('주문이 완료되었습니다.');
                localStorage.removeItem(cartKey);
                render();
            }
        });
    }

    // 초기 실행
    render();
});