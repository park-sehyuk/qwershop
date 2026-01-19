document.addEventListener('DOMContentLoaded', function() {
    // 테이블의 각 행(tr)에 클릭 이벤트 추가 (헤더 제외)
    const orderRows = document.querySelectorAll('.order-table tbody tr');

    orderRows.forEach(row => {
        row.style.cursor = 'pointer'; // 마우스 커서를 손가락 모양으로
        row.addEventListener('click', function(e) {
            // 버튼 자체를 클릭한 경우에는 이벤트 중복 방지
            if (e.target.tagName === 'BUTTON') return;

            // 해당 행의 주문번호 추출 (ID 클래스가 부여된 td가 있다고 가정)
            const orderIdText = this.querySelector('.order-id').innerText;
            const orderId = orderIdText.replace('#', ''); // '#' 제거

            location.href = `/admin/orderDetail/${orderId}`;
        });
    });
});