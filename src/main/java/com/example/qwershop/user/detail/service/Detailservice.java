package com.example.qwershop.user.detail.service;

import com.example.qwershop.user.detail.dto.DetailDto;
import com.example.qwershop.user.detail.dto.GroupDto;
import com.example.qwershop.user.detail.mapper.DetailMapper;
import com.example.qwershop.user.main.dto.MainItemDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Detailservice {

    private final DetailMapper detailMapper;

    public DetailDto viewItem(Long itemId){
        return detailMapper.selectItem(itemId);
    }

    // 공용 메서드
    public List<GroupDto> findType(String groupCode) {
        return detailMapper.groupType(groupCode);
    }

    // 읽기 좋은 별칭 메서드
    public List<GroupDto> findColor() {

        return findType("ITEM_COLOR");
    }

    public List<GroupDto> findSize() {

        return findType("ITEM_SIZE");
    }

}
