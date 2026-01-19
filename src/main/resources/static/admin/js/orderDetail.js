document.addEventListener('DOMContentLoaded', function() {
    const statusForm = document.querySelector('form[action*="updateOrderStatus"]');

    if (statusForm) {
        statusForm.addEventListener('submit', function(e) {
            const selectedStatus = this.querySelector('select[name="status"]').value;
            const confirmMsg = `주문 상태를 [${selectedStatus}](으)로 변경하시겠습니까?`;

            if (!confirm(confirmMsg)) {
                e.preventDefault(); // 취소 시 폼 제출 중단
            }
        });
    }

    // 뒤로가기 버튼 이벤트 (만약 HTML에 onclick 대신 id를 쓴다면)
    const backBtn = document.querySelector('.btn-back');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            location.href = '/admin/orderList';
        });
    }
});