document.addEventListener('DOMContentLoaded', function () {
    // 1. 가격 포맷 함수 (유지)
    function formatPrice(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // 2. 총 합계 재계산 함수 (화면 UI 업데이트용)
    function updateTotalPrice() {
        let total = 0;
        document.querySelectorAll('.col-sub .price-text').forEach(el => {
            const val = parseInt(el.innerText.replace(/,/g, '')) || 0;
            total += val;
        });
        const totalPriceEl = document.getElementById('total-price');
        if (totalPriceEl) totalPriceEl.textContent = formatPrice(total);
    }

    // 3. 수량 변경 (서버 통신)
    // HTML의 onchange="changeCount(this)"와 연결됨
    window.changeCount = function(obj) {
        const count = obj.value;
        const cartId = obj.getAttribute('data-id');
        const token = document.querySelector('meta[name="_csrf"]').content;
        const header = document.querySelector('meta[name="_csrf_header"]').content;

        if (count < 1) { obj.value = 1; return; }

        fetch("/cartItem/" + cartId + "?count=" + count, {
            method: 'PATCH',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                [header]: token
            }
        }).then(res => {
            if (res.ok) {
                // 페이지 전체 리로드 대신 성능을 위해 새로고침하거나
                // 해당 행의 합계만 계산해서 바꿀 수 있음
                location.reload();
            }
        }).catch(err => console.error("수량 변경 실패:", err));
    };

    // 4. 삭제 로직 (서버 통신)
    // HTML의 onclick="deleteItem(this)"와 연결됨
    window.deleteItem = function(obj) {
        const cartId = obj.getAttribute('data-id');
        const token = document.querySelector('meta[name="_csrf"]').content;
        const header = document.querySelector('meta[name="_csrf_header"]').content;

        if(!confirm("삭제하시겠습니까?")) return;

        fetch("/cartItem/" + cartId, {
            method: 'DELETE',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                [header]: token
            }
        }).then(res => {
            if (res.ok) {
                alert("삭제되었습니다.");
                location.reload();
            }
        }).catch(err => console.error("삭제 실패:", err));
    };
});