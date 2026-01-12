package com.example.qwershop.user.detail.controller;

import com.example.qwershop.user.detail.dto.ReviewDto;
import com.example.qwershop.user.detail.service.ReviewService;
import com.example.qwershop.user.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final MemberService memberService;

    @PostMapping("/review/new")
    public ResponseEntity<?> saveReview(@RequestBody ReviewDto reviewDto, Principal principal) {
        if (principal == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }

        String loginId = principal.getName();
        Long memberId = memberService.findMemberId(loginId);

        reviewDto.setMemberId(memberId);
        reviewService.saveReview(reviewDto);

        return new ResponseEntity<>("후기가 등록되었습니다.", HttpStatus.OK);
    }

    @GetMapping("/reviews/{itemId}")
    public List<ReviewDto> getReviews(@PathVariable Long itemId) {
        return reviewService.getReviewList(itemId);
    }

    // --- 삭제 메서드 추가 ---
    @PostMapping("/review/delete/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId, Principal principal) {
        if (principal == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }


        try {
            reviewService.deleteReview(reviewId);
            return new ResponseEntity<>("삭제되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("삭제 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}