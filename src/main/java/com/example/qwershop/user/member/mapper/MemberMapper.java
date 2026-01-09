package com.example.qwershop.user.member.mapper;

import com.example.qwershop.user.member.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    int insertMember(MemberDto memberDto);

    MemberDto overlapId(String id);

    MemberDto loginMember(String id);

    Long findMemberId(String id);

    MemberDto findByPhone(String phone);

    // 사용자의 아이디(문자열)로 고유 식별 번호(int)를 조회
    Integer selectMemberId(String email);
}
