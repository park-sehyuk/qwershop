package com.example.qwershop.admin.usermanagement.service;

import com.example.qwershop.admin.usermanagement.dto.SelectUsersDto;
import com.example.qwershop.admin.usermanagement.mapper.UserManagerMapper;
import com.example.qwershop.user.member.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserManagerService {

    private final UserManagerMapper userManagerMapper;

    public List<SelectUsersDto> getAllUsers() {

        System.out.println("getAllUsertService에 접근 완료");
        List<SelectUsersDto> userList = userManagerMapper.getAllUsers();

        System.out.println("getAllUsertService에 접근 완료2");
        System.out.println(userList);

        return userList;
    }

    public MemberDto getUserById(String id) {
        return userManagerMapper.getUserById(id);
    }
}
