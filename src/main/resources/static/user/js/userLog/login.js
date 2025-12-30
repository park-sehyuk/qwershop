document.addEventListener('DOMContentLoaded', function () {
  const memberTab = document.getElementById('member-tab');
  const nonMemberTab = document.getElementById('non-member-tab');
  const memberLoginForm = document.getElementById('member-login-form');
  const nonMemberOrderForm = document.getElementById('non-member-order-form');

  const userIdInput = document.getElementById('user-id');
  const saveIdCheckbox = document.querySelector('.save-id-check');
  const loginButton = document.querySelector('.btn-login');
  const saveId = localStorage.getItem('saveUserId');
  if (saveId) {
    userIdInput.value = saveId;
    saveIdCheckbox.checked = true;
  }

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

  const userPasswordInput = document.getElementById('user-password');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const toggleEyeIcon = document.getElementById('toggle-eye-icon');
  togglePasswordBtn.addEventListener('click', function () {
    const type =
      userPasswordInput.getAttribute('type') === 'password'
        ? 'text'
        : 'password';
    userPasswordInput.setAttribute('type', type);
    if (type === 'password') {
      toggleEyeIcon.src = '../img/open-eyes.jpeg';
      toggleEyeIcon.alt = '비밀번호 보이기';
    } else {
      toggleEyeIcon.src = '../img/close-eyes.jpeg';
      toggleEyeIcon.alt = '비밀번호 숨기기';
    }
  });
  loginButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (saveIdCheckbox.checked) {
      localStorage.setItem('saveUserId', userIdInput.value);
    } else {
      localStorage.removeItem('saveUserId');
    }
    const enteredId = userIdInput.value;
    const enteredPassword = userPasswordInput.value;
    const storedUserJSON = localStorage.getItem('userInfo');

    if (storedUserJSON) {
      const registeredUsers = JSON.parse(storedUserJSON);
      const foundUser = registeredUsers.find(
        (user) => user.id === enteredId && user.password === enteredPassword
      );
      if (foundUser) {
        alert('로그인 성공!');
      } else {
        alert('로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }
  });
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
});
