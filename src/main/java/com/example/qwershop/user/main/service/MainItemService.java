package com.example.qwershop.user.main.service;

import com.example.qwershop.user.main.dto.MainItemDto;
import com.example.qwershop.user.main.mapper.MainItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MainItemService {

    private final MainItemMapper mainItemMapper;

    // 공용 메서드
    public List<MainItemDto> findItemCategory(int itemCategory) {
        return mainItemMapper.selectItemCategory(itemCategory);
    }

    // 읽기 좋은 별칭 메서드
    public List<MainItemDto> findBestItems() {
        return findItemCategory(13);
    }

    public List<MainItemDto> findMonthlyItems() {
        return findItemCategory(15);
    }

    public List<MainItemDto> findSuggItems() {
        return findItemCategory(14);
    }

    public List<MainItemDto> getSuggItems(String brand) {
        return mainItemMapper.selectSugBrand(brand);
    }

}
