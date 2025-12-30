const userNameInput = document.getElementById('userName');

const userPhoneInput = document.getElementById('userPhone');

const certificationButton = document.querySelector('.btn-certification');

const userIdInput = document.getElementById('userId');

certificationButton.addEventListener('click', function () {
  const enteredName = userNameInput.value;

  const enteredPhone = userPhoneInput.value;

  let enteredId = '';

  if (userIdInput) {
    enteredId = userIdInput.value;
  }

  const storedUsers = JSON.parse(localStorage.getItem('userInfo')) || [];

  let isMatchFound = false;

  for (const user of storedUsers) {
    if (!userIdInput) {
      if (user.userName === enteredName && user.userphone === enteredPhone) {
        isMatchFound = true;

        break;
      }
    } else {
      if (
        user.id === enteredId &&
        user.userName === enteredName &&
        user.userphone === enteredPhone
      ) {
        isMatchFound = true;

        break;
      }
    }
  }

  if (isMatchFound) {
    alert('인증번호가 발송되었습니다!');
  } else {
    alert('입력하신 정보와 일치하는 회원이 없습니다. 다시 확인해주세요.');
  }
});
