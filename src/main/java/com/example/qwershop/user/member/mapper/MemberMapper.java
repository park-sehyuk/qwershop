package com.example.qwershop.user.member.mapper;

import com.example.qwershop.user.member.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    int insertMember(MemberDto memberDto);

    MemberDto overlapId(String id);

    MemberDto loginMember(String id);

    Long findMemberId(String id);
}
