const userIdInput = document.getElementById('user-id');
const userPwInput = document.getElementById('user-password');
const userPwConfirmInput = document.getElementById('user-password-confirm');
const userNameInput = document.getElementById('user-name');
const phoneInput = document.getElementById('user-phone');
const emailIdInput = document.getElementById('user-email-id');
const emailDomainInput = document.getElementById('user-email-domain');
const userBirthdateInput = document.getElementById('user-birthdate');

const checkIdButton = document.querySelector('.btn-inline');
const submitButton = document.querySelector('.btn-primary');
const cancelButton = document.querySelector('.btn-secondary');

checkIdButton.addEventListener('click', function () {
  const userId = userIdInput.value;

  if (userId === '') {
    alert('아이디를 입력해주세요.');
    userIdInput.focus();
    return;
  }
  if (userId.length < 6 || userId.length > 20) {
    alert('아이디는 6자 이상 20자 이하로 입력해주세요.');
    userIdInput.focus();
    return;
  }
  const idRegex = /^[a-zA-Z0-9]+$/;
  if (!idRegex.test(userId)) {
    alert('아이디는 영어 대소문자와 숫자만 사용할 수 있습니다.');
    userIdInput.focus();
    return;
  }
  const existingUser = users.find((user) => user.id === userId);
  if (existingUser) {
    alert(`'${userId}'는(은) 이미 사용중인 아이디입니다.`);
    userIdInput.focus();
  } else {
    alert(`'${userId}'는(은) 사용 가능한 아이디입니다.`);
  }
});

function pwMatch() {
  const pw = userPwInput.value;
  const PwConfirm = userPwConfirmInput.value;

  if (pw === '' || PwConfirm === '') {
    return true;
  }
  if (pw !== PwConfirm) {
    alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    userPwConfirmInput.focus();
    return false;
  }
  return true;
}

function pwRules() {
  const pw = userPwInput.value;
  if (pw === '') {
    alert('비밀번호를 입력해주세요.');
    userPwInput.focus();
    return false;
  }
  if (pw.length < 8 || pw.length > 20) {
    alert('비밀번호는 8자 이상 20자 이하로 입력해주세요.');
    userPwInput.focus();
    return false;
  }
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
  if (!pwRegex.test(pw)) {
    alert(
      '비밀번호는 문자, 숫자, 특수문자를 모두 포함하여 8~20자로 입력해주세요.'
    );
    userPwInput.focus();
    return false;
  }
  return true;
}

function required() {
  const requiredInputs = [
    { input: userIdInput, name: '아이디' },
    { input: userPwInput, name: '비밀번호' },
    { input: userPwConfirmInput, name: '비밀번호 확인' },
    { input: userNameInput, name: '이름' },
    { input: phoneInput, name: '전화번호' },
    { input: emailIdInput, name: '이메일 주소' },
    { input: emailDomainInput, name: '이메일 도메인' },
    { input: userBirthdateInput, name: '생년월일' },
  ];
  for (let i = 0; i < requiredInputs.length; i++) {
    const field = requiredInputs[i];
    if (field.input.value.trim() === '') {
      alert(`${field.name}을(를) 입력해주세요.`);
      field.input.focus();
      return false;
    }
  }
  return true;
}

function emailFormat() {
  const emailId = emailIdInput.value.trim();
  const emailDomain = emailDomainInput.value.trim();

  if (emailId === '' || emailDomain === '') {
    return true;
  }
  const fullEmail = emailId + '@' + emailDomain;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,6}$/;

  if (!emailRegex.test(fullEmail)) {
    alert('올바른 이메일 주소 형식이 아닙니다. 다시 확인해주세요.');
    emailIdInput.focus();
    return false;
  }
  return true;
}

function phoneNumber() {
  const phoneNumber = phoneInput.value.trim();
  if (phoneNumber === '') {
    return true;
  }
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phoneNumber)) {
    alert('올바른 휴대폰 번호 형식이 아닙니다. 숫자만 10~11자리 입력해주세요.');
    phoneInput.focus();
    return false;
  }
  return true;
}

function birthdate() {
  const birthdate = userBirthdateInput.value.trim();

  if (birthdate === '') {
    return true;
  }
  const birthdateRegex = /^[0-9]{8}$/;
  if (!birthdateRegex.test(birthdate)) {
    alert('생년월일은 YYYYMMDD 형식의 숫자 8자리로 입력해주세요.');
    userBirthdateInput.focus();
    return false;
  }
  return true;
}

let users = [];
function usersData() {
  localStorage.setItem('userInfo', JSON.stringify(users));
}
function loadUser() {
  const data = localStorage.getItem('userInfo');
  if (data) {
    users = JSON.parse(data);
  } else {
    users = [];
  }
}

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  if (!required()) {
    return;
  }
  const userId = userIdInput.value;
  const idRegex = /^[a-zA-Z0-9]+$/;
  if (userId.length < 6 || userId.length > 20 || !idRegex.test(userId)) {
    alert('아이디를 6~20자 영문/숫자로 정확히 입력해주세요.');
    userIdInput.focus();
    return;
  }
  if (!pwRules()) {
    return;
  }
  if (!pwMatch()) {
    return;
  }
  if (!phoneNumber()) {
    return;
  }
  if (!emailFormat()) {
    return;
  }
  if (!birthdate()) {
    return;
  }
  alert('회원가입이 완료되었습니다! 환영합니다!');
  users.push({
    id: userIdInput.value,
    userName: userNameInput.value,
    password: userPwInput.value,
    userphone: phoneInput.value,
    userEmail: emailIdInput.value + '@' + emailDomainInput.value,
    userBirth: userBirthdateInput.value,
  });
  usersData();
});

cancelButton.addEventListener('click', function () {
  window.location.href = '../index.html';
});

document.addEventListener('DOMContentLoaded', function () {
  loadUser();
});
