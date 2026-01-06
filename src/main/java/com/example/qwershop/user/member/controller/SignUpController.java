package com.example.qwershop.user.member.controller;

import com.example.qwershop.user.member.dto.MemberDto;
import com.example.qwershop.user.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class SignUpController {

    private final MemberService memberService;

    @GetMapping("/signUp")
    public String signUp() {
        return "user/userLog/signUp";
    }

    @PostMapping("/signUp")
    public String signUpProcess(MemberDto memberDto) {
        System.out.println("회원가입 요청 데이터: " + memberDto.toString());

        try {
            memberService.insertMember(memberDto);
            System.out.println("회원가입 DB 저장 성공!");
        } catch (IllegalStateException e) {
            System.out.println("회원가입 실패: " + e.getMessage());
            return "redirect:/signUp?error";
        }

        return "redirect:/user/login";
    }
}