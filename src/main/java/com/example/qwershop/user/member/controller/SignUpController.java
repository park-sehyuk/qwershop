package com.example.qwershop.user.member.controller;

import com.example.qwershop.user.member.dto.MemberDto;
import com.example.qwershop.user.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequiredArgsConstructor
public class SignUpController {

    private final MemberService memberService;

    @GetMapping("/signUp")
    public String signUp() {
        return "user/userLog/signUp";
    }

    @PostMapping("/signUp")
    public String signUpProcess(MemberDto memberDto, Model model, RedirectAttributes rttr) {
        try {
            memberService.insertMember(memberDto);
            rttr.addFlashAttribute("successMessage", "회원가입이 완료되었습니다!");
            return "redirect:/login";
        } catch (IllegalStateException e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "user/userLog/signUp";
        }
    }
}