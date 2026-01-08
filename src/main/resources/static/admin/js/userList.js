
// userList.js 파일 전체를 이 코드로 교체

// 1. 필요한 HTML 요소들을 자바스크립트로 가져오기
const modal = document.getElementById('userDetailModal');
const openButtons = document.querySelectorAll('.userDetail'); // 모든 '유저 상세정보' 버튼
const closeButton = document.querySelector('.modal-header .close-button');
const closeFooterButton = document.querySelector(
  '.modal-footer .close-button-footer'
);

// 모달 안에 있는 입력창(input), 선택창(select) 등
const modalName = document.getElementById('modal-name');
const modalId = document.getElementById('modal-id');
const modalPhone = document.getElementById('modal-phone');
const modalEmail = document.getElementById('modal-email');

// 2. '유저 상세정보' 버튼을 클릭했을 때 모달을 여는 기능
// openButtons가 여러 개이므로 각각에 대해 똑같은 기능을 달아준다.
openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // 2-1. 클릭된 버튼에서 유저 ID 가져오기
    const userId = button.getAttribute('data-id');

    // 2-2. 서버에서 해당 유저의 상세 정보 가져오기 (AJAX)
    fetch(`/admin/userDetail/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(user => {
        // 2-3. 가져온 데이터로 모달 안의 내용 채우기
        modalName.value = user.name || '';
        modalId.value = user.id || '';
        modalEmail.value = user.email || '';
        modalPhone.value = user.phone || '';
        
        // 추가 정보 필드 (HTML에 있는 것들)
        document.getElementById('modal-address').value = user.address || '';
        // 회원등급, 적립금, 메모 등은 DB 설계에 따라 추가로 채울 수 있습니다.
        // 현재 MemberDto에는 address까지만 있으므로 나머지는 예시로 둡니다.

        // 2-4. 모달을 화면에 보여주기
        modal.style.display = 'block';
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        alert('사용자 정보를 가져오는 데 실패했습니다.');
      });
  });
});

// 3. 모달을 닫는 함수 만들기
const closeModal = () => {
  modal.style.display = 'none';
};

// 4. 닫기 버튼들에게 '클릭'하면 모달을 닫는 기능 추가하기
closeButton.addEventListener('click', closeModal);
closeFooterButton.addEventListener('click', closeModal);

// 5. 모달 바깥의 어두운 배경을 클릭했을 때도 모달이 닫히게 하기
window.addEventListener('click', (event) => {
  // 만약 클릭된 곳이 모달 배경(modal-overlay)이라면
  if (event.target === modal) {
    closeModal();
  }
});
