package com.example.qwershop.user.member.mapper;

import com.example.qwershop.user.member.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {
    int insertMember(MemberDto memberDto);

    MemberDto overlapId(String id);

    MemberDto loginMember(String id);

    Long findMemberIdById(String id);

    MemberDto findByPhone(String phone);

    int updateMember(MemberDto memberDto);

    // 사용자의 아이디(문자열)로 고유 식별 번호(int)를 조회
    Integer selectMemberId(String email);


    int updatePasswordIfMatch(
            @Param("userId") String userId,
            @Param("userName") String userName,
            @Param("userPhone") String userPhone,
            @Param("newPw") String newPw
    );

    MemberDto findByNameAndPhone(@Param("name") String name, @Param("phone") String phone);

}
