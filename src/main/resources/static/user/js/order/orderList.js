/**
 * 주문 상세 페이지로 이동
 * @param {number} orderId
 */
function goDetail(orderId) {
    if(!orderId) {
        alert("주문 번호를 찾을 수 없습니다.");
        return;
    }
    // 상세 페이지 경로가 있다면 이동 (현재는 예시)
    location.href = "/order/detail/" + orderId;
}

// 페이지 로드 시 실행될 로직 (필요할 경우)
document.addEventListener("DOMContentLoaded", function() {
    console.log("주문 내역 페이지가 로드되었습니다.");
});