
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
    // 2-1. 클릭된 버튼이 속한 행(tr)의 데이터 가져오기
    const userRow = button.closest('tr'); // 버튼에서 가장 가까운 부모 <tr>을 찾음
    const id = userRow.children[0].innerText;
    const name = userRow.children[1].innerText;
    const email = userRow.children[2].innerText;
    const phone = userRow.children[3].innerText;

    // 2-2. 가져온 데이터로 모달 안의 내용 채우기
    modalName.value = name;
    modalId.value = id;
    modalEmail.value = email;
    modalPhone.value = phone;
    // (나머지 주소, 등급 등도 이런 식으로 채울 수 있어요)

    // 2-3. 모달을 화면에 보여주기 (CSS에서 display: none; 을 block; 으로 변경)
    modal.style.display = 'block';
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
