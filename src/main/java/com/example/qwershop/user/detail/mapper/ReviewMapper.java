package com.example.qwershop.user.detail.mapper;

import com.example.qwershop.user.detail.dto.ReviewDto;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ReviewMapper {
    void insertReview(ReviewDto reviewDto);
    List<ReviewDto> getReviewList(Long itemId);
    void deleteReview(Long reviewId);
}