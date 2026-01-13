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

    // [추가] 회원 정보 찾기 (수정 폼에 데이터 뿌려주기용)
    public MemberDto findMember(String id) {
        // 기존에 만들어두신 overlapId용 메서드가 MemberDto를 반환하므로 재사용합니다.
        MemberDto member = memberMapper.overlapId(id);
        if (member == null) {
            throw new RuntimeException("해당 사용자를 찾을 수 없습니다.");
        }
        return member;
    }

    // [추가] 회원 정보 업데이트
    public void updateMember(MemberDto memberDto) {
        // 비밀번호를 수정 입력했을 경우에만 암호화해서 세팅
        if (memberDto.getPw() != null && !memberDto.getPw().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(memberDto.getPw());
            memberDto.setPw(encodedPassword);
        } else {
            // 비밀번호를 입력하지 않았다면 기존 비밀번호를 유지하기 위해
            // DB에서 기존 정보를 가져와 세팅하거나, Mapper SQL에서 처리가 필요합니다.
            MemberDto existingMember = memberMapper.overlapId(memberDto.getId());
            memberDto.setPw(existingMember.getPw());
        }

        int result = memberMapper.updateMember(memberDto); // Mapper에 이 메서드를 만들어야 함
        if (result == 0) {
            throw new RuntimeException("회원 정보 수정에 실패했습니다.");
        }
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

    public Long findMemberId(String id) {

        return memberMapper.findMemberIdById(id);
    }

    public String findIdByNameAndPhone(String name, String phone) {
        MemberDto member = memberMapper.findByNameAndPhone(name, phone);
        // 결과가 있으면 id 반환, 없으면 빈 값 반환
        return (member != null) ? member.getId() : "";
    }

    public int getMemberId(String email) {
        Integer memberId = memberMapper.selectMemberId(email);
        if (memberId == null) {
            throw new RuntimeException("해당 사용자를 찾을 수 없습니다.");
        }
        return memberId;
    }
}