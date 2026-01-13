package com.example.qwershop.user.main.mapper;

import com.example.qwershop.user.main.dto.MainItemDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface MainItemMapper {

    List<MainItemDto> selectItemCategory(int itemCategory);

    List<MainItemDto> selectSugBrand(String brand);

    List<MainItemDto> searchItems(@Param("query") String query);
}
