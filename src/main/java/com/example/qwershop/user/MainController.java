package com.example.qwershop.user;

import com.example.qwershop.user.member.dto.MemberDto;
import com.example.qwershop.user.member.service.MemberService; // 추가
import lombok.RequiredArgsConstructor; // 추가
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor // 추가: final이 붙은 필드를 자동으로 생성자 주입해줌
public class MainController {

    // 1. 서비스 의존성 주입 (이게 있어야 DB 저장이 가능함)
    private final MemberService memberService;

    @GetMapping("/")
    public String index() {
        return "user/index";
    }

    @GetMapping("/main")
    public String mianPage(){
        return "user/index";
    }

    @GetMapping("/user/login")
    public String login(){
        return "user/userLog/login";
    }

    @GetMapping("/signUp")
    public String singUp(){
        return "user/userLog/signUp";
    }

    // 2. 회원가입 실제 처리 로직
    @PostMapping("/signUp")
    public String signUpProcess(MemberDto memberDto) {
        System.out.println("회원가입 요청 데이터: " + memberDto.toString());

        try {
            // [핵심] 서비스의 insertMember를 호출해야 DB에 들어갑니다!
            memberService.insertMember(memberDto);
            System.out.println("회원가입 DB 저장 성공!");
        } catch (IllegalStateException e) {
            // 중복 아이디 등 예외 발생 시 로그 출력
            System.out.println("회원가입 실패: " + e.getMessage());
            return "redirect:/signUp?error";
        }

        // 성공 시 로그인 페이지로 이동
        return "redirect:/user/login";
    }

    @GetMapping("/find")
    public String find(){
        return "user/userLog/find";
    }

    @GetMapping("/findpw")
    public String findPw (){
        return "user/userLog/findPw";
    }

    @GetMapping("/search")
    public String search(){
        return "user/search/searchResult";
    }

    @GetMapping("/itemList")
    public String itemList(){
        return "user/production/itemList";
    }

    @GetMapping("/detail")
    public String detail(){
        return "user/production/detail";
    }
}