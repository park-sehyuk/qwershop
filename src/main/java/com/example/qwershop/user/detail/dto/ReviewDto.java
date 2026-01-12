package com.example.qwershop.user.detail.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewDto {
    private Long reviewId;
    private Long itemId;
    private Long memberId;
    private String content;
    private int star;
    private String createdBy;
    private String regTime;
}