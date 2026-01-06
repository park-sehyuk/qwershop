document.addEventListener('DOMContentLoaded', function () {
  const memberTab = document.getElementById('member-tab');
  const nonMemberTab = document.getElementById('non-member-tab');
  const memberLoginForm = document.getElementById('member-login-form');
  const nonMemberOrderForm = document.getElementById('non-member-order-form');

  const userIdInput = document.getElementById('user-id');
  const userPasswordInput = document.getElementById('user-password'); // 상단으로 이동
  const saveIdCheckbox = document.querySelector('.save-id-check');
  const loginButton = document.querySelector('.btn-login');

  // 아이디 불러오기 로직
  const saveId = localStorage.getItem('saveUserId');
  if (saveId) {
    userIdInput.value = saveId;
    saveIdCheckbox.checked = true;
  }

  // 탭 전환 로직 (기존 유지)
  if(memberTab && nonMemberTab) {
    memberTab.addEventListener('click', function (e) {
      e.preventDefault();
      memberTab.classList.add('active');
      nonMemberTab.classList.remove('active');
      memberLoginForm.classList.remove('hidden');
      nonMemberOrderForm.classList.add('hidden');
    });
    nonMemberTab.addEventListener('click', function (e) {
      e.preventDefault();
      nonMemberTab.classList.add('active');
      memberTab.classList.remove('active');
      nonMemberOrderForm.classList.remove('hidden');
      memberLoginForm.classList.add('hidden');
    });
  }

  // 비밀번호 토글 로직 (경로 수정 포함)
  const togglePasswordBtn = document.getElementById('toggle-password');
  const toggleEyeIcon = document.getElementById('toggle-eye-icon');
  if(togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', function () {
      const type = userPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      userPasswordInput.setAttribute('type', type);
      // 타임리프 경로에 맞춰 경로 수정 권장
      if (type === 'password') {
        toggleEyeIcon.src = '/user/imges/open-eyes.jpeg';
        toggleEyeIcon.alt = '비밀번호 보이기';
      } else {
        toggleEyeIcon.src = '/user/imges/close-eyes.jpeg';
        toggleEyeIcon.alt = '비밀번호 숨기기';
      }
    });
  }

  // [핵심 수정] 로그인 버튼 클릭 시
  loginButton.addEventListener('click', function (e) {
    // e.preventDefault();  <-- 이 부분을 삭제하거나 주석 처리해야 서버로 전송됩니다!

    // 아이디 저장 로직만 수행
    if (saveIdCheckbox.checked) {
      localStorage.setItem('saveUserId', userIdInput.value);
    } else {
      localStorage.removeItem('saveUserId');
    }

    // 기존의 localStorage에서 유저 찾는 로직(registeredUsers.find...)은
    // 이제 서버(DB)가 담당하므로 과감히 삭제합니다.

    // 만약 유효성 검사를 하고 싶다면 여기서 하고, 통과하면 전송하게 둡니다.
    if(userIdInput.value === "" || userPasswordInput.value === "") {
      e.preventDefault();
      alert("아이디와 비밀번호를 모두 입력해주세요.");
    }
  });
});