package com.example.qwershop.admin.usermanagement.mapper;

import com.example.qwershop.admin.usermanagement.dto.SelectUsersDto;
import com.example.qwershop.user.member.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface UserManagerMapper {
    List<SelectUsersDto> getAllUsers();
    MemberDto getUserById(String id);
}
