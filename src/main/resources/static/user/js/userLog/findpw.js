$(".btn-confirm").on("click", function() {
    // 1. 메타 태그에서 토큰 읽어오기
    const token = $("meta[name='_csrf']").attr("content");
    const header = $("meta[name='_csrf_header']").attr("content");

    const param = {
        userId: $("#userId").val(),
        userName: $("#userName").val(),
        userPhone: $("#userPhone").val(),
        newPw: $("#newPw").val() // 새로운 비밀번호 입력창의 ID
    };

    $.ajax({
        url: "/user/find-pw",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(param),
        // 2. 요청 보내기 전 헤더에 CSRF 토큰 추가
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(response) {
            alert("비밀번호가 성공적으로 변경되었습니다.");
            location.href = "/login";
        },
        error: function(xhr) {
            console.log(xhr.status); // 403이 계속 뜨는지 확인
            alert("정보가 일치하지 않거나 오류가 발생했습니다.");
        }
    });
});