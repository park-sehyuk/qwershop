package com.example.qwershop.user.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    // 1. 로그인 페이지로 이동
    @GetMapping("/user/login")
    public String login(){
        return "user/userLog/login";
    }

    // 2. 로그인 실패 시 에러 처리 (Whitelabel 에러 방지)
    @GetMapping("/user/login/error")
    public String loginError(Model model) {
        model.addAttribute("loginErrorMsg", "아이디 또는 비밀번호를 확인해주세요.");
        return "user/userLog/login";
    }
}