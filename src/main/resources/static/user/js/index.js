$(".slick-slider").slick({
  arrows: false,
  autoplay: true,
});


// 모든 아이텀 저장 배열
let itemLists = [];


// 아이템 리스트 관련 요소
const bestItemListEl = document.getElementById("bestItemList");
const bestItem = document.getElementById("bestItem");
const suggItemListEl = document.getElementById("suggItemList");
const gucciBtn = document.getElementById("gucciBtn");
const poloBtn = document.getElementById("poloBtn");
const maisonBtn = document.getElementById("maisonBtn");
const balBtn = document.getElementById("balBtn");
const productItemListEl = document.getElementById("productItemList");
// 템플릿
const items = document.getElementById("items");

function loadItems() {
  const data = localStorage.getItem("itemList");
  if (data) {
    const parsed = JSON.parse(data);
    itemLists.push(...parsed);
  }
}

function saveItems() {
  localStorage.setItem("itemList", JSON.stringify(itemLists));
}

function saveDetail(item) {
  localStorage.setItem("itemDetail", JSON.stringify(item));
}

// 스와이프
function enableDragScroll(container) {
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    container.classList.add("dragging");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mouseleave", () => {
    isDown = false;
    container.classList.remove("dragging");
  });

  container.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("dragging");
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1; // 드래그 속도 조절
    container.scrollLeft = scrollLeft - walk;
  });
}

// 적용
enableDragScroll(bestItem);

loadItems();
function applySlickGap(selector, gap) {
  const halfGap = gap / 2;
  $(selector).on("init reInit setPosition", function () {
    $(this).find(".slick-slide").css("margin", `0 ${halfGap}px`);
    $(this).find(".slick-list").css("margin", `0 -${halfGap}px`);
  });
}

applySlickGap("#bestItemList", 28);
applySlickGap("#suggItemList", 28);
applySlickGap("#productItemList", 28);
$("#bestItemList").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 3,
  autoplay: true,
  arrows: false,
});
$("#suggItemList").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: false,
  dots: false,
});
$("#productItemList").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: false,
  dots: false,
});
