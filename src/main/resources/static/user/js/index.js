$(".slick-slider").slick({
  arrows: false,
  autoplay: true,
});

// 슬라이더 이미지 배열
let sliderImgs = [
  "img/sliderImg1.png",
  "img/gucciSlider.jpg",
  "img/sliderImg3.jpg",
  "img/sliderImg4.jpg",
];

// 모든 아이텀 저장 배열
let itemLists = [];

// 베스트 아이템 리스트 데이터
let bestItemList = [
  {
    id: 1,
    src: "img/gadigan1.PNG",
    title: "블랙/카멜 울 자카드 가디건",
    price: "2240000",
    content: "구찌",
  },
  {
    id: 2,
    src: "img/shirtsweater1.PNG",
    title: "텍스처 코튼 리넨 셔츠 스웨터",
    price: "369000",
    content: "랄프로렌",
  },
  {
    id: 3,
    src: "img/tshirt1.PNG",
    title: "프린트 코튼 저지 티셔츠",
    price: "830000",
    content: "구찌",
  },
  {
    id: 4,
    src: "img/classic1.PNG",
    title: "클래식핏 리넨셔츠",
    price: "219000",
    content: "랄프로렌",
  },
  {
    id: 5,
    src: "img/intarsia1.PNG",
    title: "인타르시아 디테일의 실크 코튼 스웨터",
    price: "2110000",
    content: "구찌",
  },
  {
    id: 6,
    src: "img/poloshirt1.PNG",
    title: "커스텀 슬림핏 소프트 코튼 폴로 셔츠",
    price: "125300",
    content: "랄프로렌",
  },
];

// 추천 아이템 리스트 데이터
let suggItemList = [
  {
    imageUrl: "img/printcottongucci.PNG",
    name: "프린트 코튼 저지 티셔츠",
    content: "구찌",
    price: "830000",
    category: "반팔",
    color1: "",
    color2: "",
    color3: "",
    detail:
      "새로운 시즌을 맞아 진화를 거듭하는 구찌의 하우스 코드와 저지 소재의 만남. 구찌 웹(Web) 배너 프린트가 돋보이는 레귤러 핏 코튼 저지 티셔츠.",
  },
  {
    imageUrl: "img/cottongucci.PNG",
    name: "자수 코튼 피케 폴로 셔츠",
    content: "구찌",
    price: "1160000",
    category: "반팔",
    color1: "",
    color2: "",
    color3: "",
    detail:
      "섬세한 플로라 자수, 엠보스 로고, 다양한 장인 정신 디테일을 강조하는 차분한 블랙/그레이/그린 톤의 2025년 프리폴 아이템. 구찌 자수가 돋보이는 블랙 코튼 피케 소재의 폴로 셔츠.",
  },
  {
    imageUrl: "img/polosweater.PNG",
    name: "윔블던 코튼 폴로 칼라 스웨터",
    content: "랄프로렌",
    price: "439000",
    category: "반팔",
    color1: "",
    color2: "",
    color3: "",
    detail:
      "왼쪽 체스트에 시그니처 포니 자수, 스트라이프 팁 디테일, 리브 니트 폴로 칼라, 3버튼 플래킷, 천연 자개 버튼, 리브 니트 암밴드, 짧은 소매",
  },
  {
    imageUrl: "img/poloclassic.PNG",
    name: "클래식핏 리넨셔츠",
    content: "랄프로렌",
    price: "219000",
    category: "반팔",
    color1: "",
    color2: "",
    color3: "",
    detail:
      "왼쪽 체스트에 시그니처 포니 자수, 리넨 100%, 뒷면에 편안한 핏과 뛰어난 활동성을 보장하는 박스 플리츠가 있는 스플릿 요크",
  },
  {
    imageUrl: "img/T-shirt1black.jpg",
    name: "칠렉스 폭스 패치 레귤러 티셔츠",
    content: "메종 키츠네",
    price: "149625",
    category: "반팔",
    color1: "white",
    color2: "ink blue",
    color3: "",
    detail:
      "니트 티셔츠, 클래식 핏, 반소매, 리브 니트 파이핑 크루넥, 소매와 허리 부분 강화 솔기, 가슴 부분에 여우 자수 패치워크, 단색 뒷면",
  },
  {
    imageUrl: "img/T-shirt2latte.jpg",
    name: "더블 볼드 폭스 헤드 컴포트 티셔츠",
    content: "메종 키츠네",
    price: "166725",
    category: "반팔",
    color1: "anthracite",
    color2: "",
    color3: "",
    detail:
      "반소매 코튼 소재 티셔츠입니다. Double Bold Fox Head 자수 패치가 있으며 컴포트 핏입니다. 골지 마감 라운드 네크라인",
  },
  {
    imageUrl: "img/T-shirt3fig.jpg",
    name: "CHILLAX 프린트 오버사이즈 티셔츠",
    content: "메종 키츠네",
    price: "140,648",
    category: "반팔",
    color1: "",
    color2: "",
    color3: "",
    detail:
      "반소매 코튼 소재 티셔츠입니다. 톤온톤 Chillax Fox 프린트가 있으며 오버사이즈 핏입니다. 앞면에 톤온톤 Chillax Fox 프린트, 골지 마감 라운드넥",
  },
  {
    imageUrl: "img/dior-black.png",
    name: "Christian Dior Couture 티셔츠, 캐주얼 핏",
    content: "디올",
    price: "1300000",
    category: "반팔",
    color1: "white",
    color2: "blue",
    color3: "",
    detail:
      "2025 가을 시즌에 에센셜 디자인을 모던한 무드로 해석하여 새롭게 선보이는 Christian Dior Couture 티셔츠입니다. 블랙 컬러의 디스트레스드-이펙트 코튼 저지 소재로 제작되었으며 체스트의 Christian Dior Couture 시그니처 프린트가 특징입니다.",
  },
  {
    imageUrl: "img/louisvuitton-white.png",
    name: "엠브로이더드 시그니처 티셔츠",
    content: "루이비통",
    price: "2050000",
    category: "반팔",
    color1: "black",
    color2: "",
    color3: "",
    detail:
      "가벼운 면 저지 소재로 선보이는 스마트한 블랙 색상의 티셔츠. 클래식한 실루엣에 라피아 느낌의 디테일을 더해 예술적인 분위기를 자아내는 디자인. 가슴 부분에 수를 놓아 완성한 루이 비통 레터링. 뒷면의 Marque L.Vuitton Déposée 라벨. 캐주얼한 여름철 룩과 믹스매치하기 좋은 활용도 높은 아이템.",
  },
  {
    imageUrl: "img/burberry-white.png",
    name: "크로스 스티치 EKD 코튼 티셔츠",
    content: "버버리",
    price: "760000",
    category: "반팔",
    color1: "black",
    color2: "",
    color3: "",
    detail:
      "면 저지 소재의 크루넥 티셔츠. 버버리 체크 스타일의 기마상 디자인(Equestrian Knight Design, EKD) 및 버버리 로고가 십자수로 연출된 아이템.",
  },
  {
    imageUrl: "img/balenciagablack.PNG",
    name: "남성 나노 Bb 미디엄 핏 티셔츠 페이드 블랙",
    content: "발렌시아가",
    price: "830000",
    category: "반팔",
    color1: "",
    color2: "",
    color3: "",
    detail:
      "이 제품의 주요 소재는 농장에서 화학 물질 사용과 물 소비를 줄이고 기존 농업 방식보다 더 나은 토양 품질에 기여하는 농업 방식으로 생산된 오가닉 코튼이 50% 이상 포함되어 있습니다.",
  },
  {
    imageUrl: "img/balenciagared.PNG",
    name: "레드 드라이 저지 소재의 발렌시아가 푸마 오버사이즈 티셔츠",
    content: "발렌시아가",
    price: "1000000",
    category: "반팔",
    color1: "",
    color2: "",
    color3: "",
    detail:
      "발렌시아가는 2025년까지 우리의 컬렉션에서 100% 메탈-프리 태닝 가죽을 목표로 하고, 모회사인 케어링의 원자재 및 제조 공정 기준과 100% 일치하는 것을 목표로 하고 있습니다. 이 야심찬 약속은 여러 단계를 거쳐야 하며, 투명성을 위해 이 웹사이트에 정기적으로 정보를 업데이트할 것입니다.",
  },
  {
    imageUrl: "img/pradacotentshirt.PNG",
    name: "코튼 티셔츠",
    content: "프라다",
    price: "1550000",
    category: "반팔",
    color1: "white",
    color2: "",
    color3: "",
    detail:
      "골지 니트 크루 넥으로 완성된 클래식한 디자인을 가진 코튼 티셔츠입니다. 매끈하고 아이코닉한 모양의 패브릭 삼각형 로고가 디자인을 장식합니다.",
  },
];

// 상품 아이템 리스트 데이터
let productItemList = [
  {
    id: 1,
    src: "img/gadigan1.PNG",
    title: "블랙/카멜 울 자카드 가디건",
    price: "2240000",
    content: "구찌",
  },
  {
    id: 2,
    src: "img/sweater1.PNG",
    title: "윔블던 코튼 폴로 칼라 스웨터",
    price: "439000",
    content: "랄프로렌",
  },
  {
    id: 3,
    src: "img/tshirt1.PNG",
    title: "프린트 코튼 저지 티셔츠",
    price: "830000",
    content: "구찌",
  },
];

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
  const data = localStorage.getItem("itmeList");
  if (data) {
    const parsed = JSON.parse(data);
    itemLists.push(...parsed);
  }
}

function saveItems() {
  localStorage.setItem("itmeList", JSON.stringify(itemLists));
}

function saveDetail(item) {
  localStorage.setItem("itmeDetail", JSON.stringify(item));
}

function bestList() {
  // 베스트 아이템 리스트
  bestItemList.forEach((item) => {
    const cloneLi = items.content.firstElementChild.cloneNode(true);
    cloneLi.querySelector("img").src = item.src;
    cloneLi.querySelector(".title").textContent = item.title;
    cloneLi.querySelector(".price").textContent = `가격: ${parseFloat(
      item.price
    ).toLocaleString()}원`;
    cloneLi.querySelector(".content").textContent = item.content;
    bestItemListEl.appendChild(cloneLi);
  });
}

function suggItem() {
  // 추천 아이템 리스트
  suggItemList.forEach((item, i) => {
    if (i > 2) return; // 3개까지만 표시
    const cloneLi = items.content.firstElementChild.cloneNode(true);
    const link = cloneLi.querySelector("a");
    link.href = "production/detail.html?name=" + encodeURIComponent(item.name); // 한글 대비

    // 클릭 시 localStorage 저장
    link.addEventListener("click", (e) => {
      localStorage.setItem("detailItem", JSON.stringify(item));
    });

    cloneLi.querySelector("img").src = item.imageUrl;
    cloneLi.querySelector("img").alt = item.name;
    cloneLi.querySelector(".title").textContent = item.name;
    cloneLi.querySelector(".price").textContent = `가격: ${parseFloat(
      item.price
    ).toLocaleString()}원`;
    cloneLi.querySelector(".content").textContent = item.content;
    suggItemListEl.appendChild(cloneLi);
  });

  // 구찌 탭 기능
  gucciBtn.addEventListener("click", () => {
    suggItemListEl.innerHTML = "";
    const suggFilter = suggItemList
      .filter((item) => item.content === "구찌") // 조건 필터링
      .slice(0, 3);

    suggFilter.forEach((item, i) => {
      if (item.content === "구찌") {
        const cloneLi = items.content.firstElementChild.cloneNode(true);
        const link = cloneLi.querySelector("a");
        link.href =
          "production/detail.html?name=" + encodeURIComponent(item.name); // 한글 대비

        // 클릭 시 localStorage 저장
        link.addEventListener("click", (e) => {
          localStorage.setItem("detailItem", JSON.stringify(item));
        });
        cloneLi.querySelector("img").src = item.imageUrl;
        cloneLi.querySelector("img").alt = item.name;
        cloneLi.querySelector(".title").textContent = item.name;
        cloneLi.querySelector(".price").textContent = `가격: ${parseFloat(
          item.price
        ).toLocaleString()}원`;
        cloneLi.querySelector(".content").textContent = item.content;
        suggItemListEl.appendChild(cloneLi);
        saveDetail(item);
      }
    });
  });

  // 릴프로렌 탭 기능
  poloBtn.addEventListener("click", () => {
    suggItemListEl.innerHTML = "";
    const suggFilter = suggItemList
      .filter((item) => item.content === "랄프로렌") // 조건 필터링
      .slice(0, 3);

    suggFilter.forEach((item, i) => {
      if (item.content === "랄프로렌") {
        const cloneLi = items.content.firstElementChild.cloneNode(true);
        const link = cloneLi.querySelector("a");
        link.href =
          "production/detail.html?name=" + encodeURIComponent(item.name); // 한글 대비

        // 클릭 시 localStorage 저장
        link.addEventListener("click", (e) => {
          localStorage.setItem("detailItem", JSON.stringify(item));
        });
        cloneLi.querySelector("img").src = item.imageUrl;
        cloneLi.querySelector("img").alt = item.name;
        cloneLi.querySelector(".title").textContent = item.name;
        cloneLi.querySelector(".price").textContent = `가격: ${parseFloat(
          item.price
        ).toLocaleString()}원`;
        cloneLi.querySelector(".content").textContent = item.content;
        suggItemListEl.appendChild(cloneLi);
      }
    });
  });

  // 메종키츠네 탭 기능
  maisonBtn.addEventListener("click", () => {
    suggItemListEl.innerHTML = "";
    const suggFilter = suggItemList
      .filter((item) => item.content === "메종 키츠네") // 조건 필터링
      .slice(0, 3);

    suggFilter.forEach((item, i) => {
      if (item.content === "메종 키츠네") {
        const cloneLi = items.content.firstElementChild.cloneNode(true);
        const link = cloneLi.querySelector("a");
        link.href =
          "production/detail.html?name=" + encodeURIComponent(item.name); // 한글 대비

        // 클릭 시 localStorage 저장
        link.addEventListener("click", (e) => {
          localStorage.setItem("detailItem", JSON.stringify(item));
        });
        cloneLi.querySelector("img").src = item.imageUrl;
        cloneLi.querySelector("img").alt = item.name;
        cloneLi.querySelector(".title").textContent = item.name;
        cloneLi.querySelector(".price").textContent = `가격: ${parseFloat(
          item.price
        ).toLocaleString()}원`;
        cloneLi.querySelector(".content").textContent = item.content;
        suggItemListEl.appendChild(cloneLi);
      }
    });
  });

  // 샤넬 탭 기능
  balBtn.addEventListener("click", () => {
    suggItemListEl.innerHTML = "";
    const suggFilter = suggItemList
      .filter((item) => item.content === "발렌시아가") // 조건 필터링
      .slice(0, 3);

    suggFilter.forEach((item, i) => {
      if (item.content === "발렌시아가") {
        const cloneLi = items.content.firstElementChild.cloneNode(true);
        const link = cloneLi.querySelector("a");
        link.href =
          "production/detail.html?name=" + encodeURIComponent(item.name); // 한글 대비

        // 클릭 시 localStorage 저장
        link.addEventListener("click", (e) => {
          localStorage.setItem("detailItem", JSON.stringify(item));
        });
        cloneLi.querySelector("img").src = item.imageUrl;
        cloneLi.querySelector("img").alt = item.name;
        cloneLi.querySelector(".title").textContent = item.name;
        cloneLi.querySelector(".price").textContent = `가격: ${parseFloat(
          item.price
        ).toLocaleString()}원`;
        cloneLi.querySelector(".content").textContent = item.content;
        suggItemListEl.appendChild(cloneLi);
      }
    });
  });
}

function produtList() {
  // 이달의 상품 리스트
  productItemList.forEach((item) => {
    const cloneLi = items.content.firstElementChild.cloneNode(true);
    cloneLi.querySelector("img").src = item.src;
    cloneLi.querySelector("img").alt = item.title;
    cloneLi.querySelector(".title").textContent = item.title;
    cloneLi.querySelector(".price").textContent = `가격: ${parseFloat(
      item.price
    ).toLocaleString()}원`;
    cloneLi.querySelector(".content").textContent = item.content;
    productItemListEl.appendChild(cloneLi);
  });
}
bestList();
suggItem();
produtList();

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
$("#bestItemList").slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  arrows: false,
});
