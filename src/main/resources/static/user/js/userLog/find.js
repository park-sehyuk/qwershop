$(document).ready(function () {
  const confirmButton = document.querySelector('.btn-confirm');

  if (confirmButton) {
    // 버튼이 있는 경우에만 나머지 요소들을 찾고 이벤트를 겁니다.
    const userNameInput = document.getElementById('userName');
    const userPhoneInput = document.getElementById('userPhone');

    confirmButton.addEventListener('click', function () {
      const enteredName = userNameInput.value;
      const enteredPhone = userPhoneInput.value;

      const token = $("meta[name='_csrf']").attr("content");
      const header = $("meta[name='_csrf_header']").attr("content");

      if (!enteredName || !enteredPhone) {
        alert("이름과 휴대 전화 번호를 입력해주세요.");
        return;
      }

      $.ajax({
        type: "POST",
        url: "/user/find-id",
        beforeSend: function (xhr) {
          if (token && header) {
            xhr.setRequestHeader(header, token);
          }
        },
        data: {
          name: enteredName,
          phone: enteredPhone
        },
        success: function (response) {
          if (response && response !== "") {
            alert("고객님의 아이디는 [" + response + "] 입니다.");
          } else {
            alert("입력하신 정보와 일치하는 회원이 없습니다. 다시 확인해주세요.");
          }
        },
        error: function (xhr) {
          if (xhr.status === 403) {
            alert("보안 토큰이 만료되었습니다. 새로고침 후 다시 시도해주세요.");
          } else {
            alert("서버 통신 중 오류가 발생했습니다.");
          }
        }
      });
    });
  }
});