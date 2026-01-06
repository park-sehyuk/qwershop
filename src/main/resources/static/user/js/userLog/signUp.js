const userIdInput = document.getElementById('user-id');
const userPwInput = document.getElementById('user-password');
const userPwConfirmInput = document.getElementById('user-password-confirm');
const userNameInput = document.getElementById('user-name');
const phoneInput = document.getElementById('user-phone');
const emailIdInput = document.getElementById('user-email-id');
const emailDomainInput = document.getElementById('user-email-domain');
const userBirthdateInput = document.getElementById('user-birthdate');

// [수정] HTML의 id="address"와 일치시킴
const addressInput = document.getElementById('address');
const detailAddressInput = document.getElementById('detailAddress');

const checkIdButton = document.querySelector('.btn-inline');
const submitButton = document.querySelector('.btn-primary');
const cancelButton = document.querySelector('.btn-secondary');
const signUpForm = document.querySelector('form');

checkIdButton.addEventListener('click', function () {
  const userId = userIdInput.value;
  if (userId === '') {
    alert('아이디를 입력해주세요.');
    userIdInput.focus();
    return;
  }
  alert(`'${userId}'는(은) 사용 가능한 아이디입니다.`);
});

function pwMatch() {
  const pw = userPwInput.value;
  const PwConfirm = userPwConfirmInput.value;
  if (pw !== PwConfirm) {
    alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    userPwConfirmInput.focus();
    return false;
  }
  return true;
}

function pwRules() {
  const pw = userPwInput.value;
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
  if (!pwRegex.test(pw)) {
    alert('비밀번호는 문자, 숫자, 특수문자를 모두 포함하여 8~20자로 입력해주세요.');
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
    { input: addressInput, name: '기본 주소' },
    { input: emailIdInput, name: '이메일 주소' },
    { input: emailDomainInput, name: '이메일 도메인' }
  ];
  for (let i = 0; i < requiredInputs.length; i++) {
    if (!requiredInputs[i].input || requiredInputs[i].input.value.trim() === '') {
      alert(`${requiredInputs[i].name}을(를) 입력해주세요.`);
      if(requiredInputs[i].input) requiredInputs[i].input.focus();
      return false;
    }
  }
  return true;
}

function emailFormat() {
  const fullEmail = emailIdInput.value.trim() + '@' + emailDomainInput.value.trim();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(fullEmail)) {
    alert('올바른 이메일 주소 형식이 아닙니다.');
    return false;
  }
  return true;
}

submitButton.addEventListener('click', function (event) {
  event.preventDefault();

  if (!required()) return;
  if (!pwRules()) return;
  if (!pwMatch()) return;
  if (!emailFormat()) return;

  // --- [추가] 날짜 형식 변환 (19990101 -> 1999-01-01) ---
  let birthVal = userBirthdateInput.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
  if (birthVal.length === 8) {
    // 8자리 숫자를 yyyy-MM-dd 형식으로 변환
    birthVal = birthVal.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    userBirthdateInput.value = birthVal;
  } else {
    alert("생년월일은 8자리 숫자로 입력해주세요. (예: 19990101)");
    userBirthdateInput.focus();
    return;
  }
  // ----------------------------------------------------

  // 이메일 합치기
  const fullEmail = emailIdInput.value + "@" + emailDomainInput.value;
  let hiddenEmail = document.createElement('input');
  hiddenEmail.type = 'hidden';
  hiddenEmail.name = 'email';
  hiddenEmail.value = fullEmail;
  signUpForm.appendChild(hiddenEmail);

  // 주소 합치기
  const fullAddress = addressInput.value + " " + detailAddressInput.value;
  let hiddenAddr = document.createElement('input');
  hiddenAddr.type = 'hidden';
  hiddenAddr.name = 'address';
  hiddenAddr.value = fullAddress;
  signUpForm.appendChild(hiddenAddr);

  alert('회원가입이 완료되었습니다!');
  signUpForm.submit();
});

function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function(data) {
      let addr = '';
      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }
      document.getElementById('postcode').value = data.zonecode;
      document.getElementById("address").value = addr;
      document.getElementById("detailAddress").focus();
    }
  }).open();
}