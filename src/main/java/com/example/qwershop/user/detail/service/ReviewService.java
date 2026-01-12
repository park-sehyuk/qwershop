package com.example.qwershop.user.detail.service;

import com.example.qwershop.user.detail.dto.ReviewDto;
import com.example.qwershop.user.detail.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewMapper reviewMapper;

    public void saveReview(ReviewDto reviewDto) {
        reviewMapper.insertReview(reviewDto);
    }

    public List<ReviewDto> getReviewList(Long itemId) {
        return reviewMapper.getReviewList(itemId);
    }
    public void deleteReview(Long reviewId) {
        reviewMapper.deleteReview(reviewId);
    }

}