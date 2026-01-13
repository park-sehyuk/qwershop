document.addEventListener('DOMContentLoaded', function() {
    console.log("Order Detail JS Loaded");
});

/**
 * 목록으로 돌아가기
 */
function goBack() {
    location.href = '/order/list';
}

/**
 * 주문 취소 버튼 클릭 시 (기능 확장용)
 * @param {number} orderId
 */
function cancelOrder(orderId) {
    if (confirm("정말로 이 주문을 취소하시겠습니까?")) {
        // 실제 구현 시 fetch나 $.ajax를 사용하여 서버에 취소 요청
        console.log("Cancelling order:", orderId);

        /* 예시:
        fetch(`/api/order/cancel/${orderId}`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                alert("취소되었습니다.");
                location.reload();
            });
        */
        alert("취소 요청이 접수되었습니다. (서버 API 연결 필요)");
    }
}