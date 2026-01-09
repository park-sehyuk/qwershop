package com.example.qwershop.user.member.service;

import com.example.qwershop.user.member.dto.MemberDto;
import com.example.qwershop.user.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        MemberDto member = memberMapper.loginMember(id);

        if (member == null) {
            throw new UsernameNotFoundException("아이디가 존재하지 않습니다: " + id);
        }


        return User.builder()
                .username(member.getId())
                .password(member.getPw())
                .roles(member.getStatus().toString())
                .build();
    }


    public int insertMember(MemberDto memberDto) {
        this.overlapId(memberDto.getId());
        this.overlapPhone(memberDto.getPhone());

        String encodedPassword = passwordEncoder.encode(memberDto.getPw());
        memberDto.setPw(encodedPassword);

        return memberMapper.insertMember(memberDto);
    }
    public void overlapPhone(String phone) {
        MemberDto findMember = memberMapper.findByPhone(phone);
        if (findMember != null) {
            throw new IllegalStateException("이미 가입된 전화번호입니다.");
        }
    }

    public void overlapId(String id) {
        MemberDto findId = memberMapper.overlapId(id);
        if (findId != null)
            throw new IllegalStateException("중복된 아이디입니다.");
    }

    public int getMemberId(String email) {
        Integer memberId = memberMapper.selectMemberId(email);

        if (memberId == null) {
            throw new RuntimeException("해당 사용자를 찾을 수 없습니다.");
        }

        return memberId;
    }

}