let itemLists = [];

function loadItems() {
  const data = localStorage.getItem("itmeList");
  if (data) {
    const parsed = JSON.parse(data);
    itemLists.push(...parsed);
  }
}

const productData = [
  {
    imageUrl: "../img/printcottongucci.PNG",
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
    imageUrl: "../img/cottongucci.PNG",
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
    imageUrl: "../img/polosweater.PNG",
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
    imageUrl: "../img/poloclassic.PNG",
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
    imageUrl: "../img/T-shirt1black.jpg",
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
    imageUrl: "../img/T-shirt2latte.jpg",
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
    imageUrl: "../img/T-shirt3fig.jpg",
    name: "CHILLAX 프린트 오버사이즈 티셔츠",
    content: "메종 키츠네",
    price: "140648",
    category: "반팔",
    color1: "",
    color2: "",
    color3: "",
    detail:
      "반소매 코튼 소재 티셔츠입니다. 톤온톤 Chillax Fox 프린트가 있으며 오버사이즈 핏입니다. 앞면에 톤온톤 Chillax Fox 프린트, 골지 마감 라운드넥",
  },
  {
    imageUrl: "../img/dior-black.png",
    name: "Christian Dior Couture 티셔츠, 캐주얼 핏",
    content: "디올",
    price: "1300000",
    category: "긴팔",
    color1: "white",
    color2: "blue",
    color3: "",
    detail:
      "2025 가을 시즌에 에센셜 디자인을 모던한 무드로 해석하여 새롭게 선보이는 Christian Dior Couture 티셔츠입니다. 블랙 컬러의 디스트레스드-이펙트 코튼 저지 소재로 제작되었으며 체스트의 Christian Dior Couture 시그니처 프린트가 특징입니다.",
  },
  {
    imageUrl: "../img/louisvuitton-white.png",
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
    imageUrl: "../img/burberry-white.png",
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
    imageUrl: "../img/balenciagablack.PNG",
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
    imageUrl: "../img/balenciagared.PNG",
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
    imageUrl: "../img/pradacotentshirt.PNG",
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

const ITEMS_PER_PAGE = 12;

let currentPage = parseInt(localStorage.getItem("currentPage") || "1");
let currentSort = localStorage.getItem("currentSort") || "popular";
let wishList = new Set(JSON.parse(localStorage.getItem("wishList") || "[]"));

const search = document.getElementById("searchName");

const grid = document.getElementById("product-grid");
const totalItemsEl = document.getElementById("total-items");
const paginationEl = document.getElementById("pagination");
const sortContainer = document.querySelector(".sort-container");
const sortButton = document.querySelector(".sort-button");
const sortText = document.getElementById("sort-text");

function render() {
  const urlName = decodeURIComponent(
    new URLSearchParams(window.location.search).get("query") || ""
  );
  search.textContent = urlName;
  localStorage.setItem("currentPage", currentPage);
  localStorage.setItem("currentSort", currentSort);
  localStorage.setItem("wishList", JSON.stringify([...wishList]));

  let sortedProducts = [...productData];
  switch (currentSort) {
    case "price_desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "price_asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsForPage = sortedProducts.slice(startIndex, endIndex);

  grid.innerHTML = itemsForPage
    .filter((item) => item.category === urlName)
    .map((product) => {
      const isWished = wishList.has(product.name);
      return `
                <div class="product-item">
                    <div class="img-wrapper">
                        <a href="../production/detail.html?productName=${encodeURIComponent(
                          product.name
                        )}">
                            <img src="${product.imageUrl}" alt="${
        product.name
      }">
                        </a>
                        <button class="wish-button ${
                          isWished ? "active" : ""
                        }" data-product-name="${product.name}">
                            ♥
                        </button>
                    </div>
                    <div class="info">
                        <div class="brand">${product.content}</div>
                        <a href="../production/detail.html?productName=${encodeURIComponent(
                          product.name
                        )}">
                            <div class="name">${product.name}</div>
                        </a>
                        <div class="price">${parseFloat(
                          product.price
                        ).toLocaleString()}원</div>
                    </div>
                </div>
            `;
    })
    .join("");

  renderPagination(sortedProducts.length);

  totalItemsEl.textContent = `${
    productData.filter((item) => item.category === urlName).length
  } Item`;
  const sortOptionText = document.querySelector(
    `.sort-dropdown a[data-sort="${currentSort}"]`
  ).textContent;
  sortText.textContent = sortOptionText;
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  paginationEl.innerHTML = "";

  Array.from({ length: totalPages }, (_, i) => i + 1).forEach((page) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "page-link";
    button.textContent = page;
    if (page === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      currentPage = page;
      render();
    });
    li.appendChild(button);
    paginationEl.appendChild(li);
  });
}

function setupEventListeners() {
  sortButton.addEventListener("click", (e) => {
    e.stopPropagation();
    sortContainer.classList.toggle("active");
  });

  document.querySelector(".sort-dropdown").addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      currentSort = e.target.dataset.sort;
      currentPage = 1;
      render();
    }
  });

  window.addEventListener("click", () => {
    sortContainer.classList.remove("active");
  });

  grid.addEventListener("click", (e) => {
    const wishButton = e.target.closest(".wish-button");
    if (wishButton) {
      const productName = wishButton.dataset.productName;
      if (wishList.has(productName)) {
        wishList.delete(productName);
      } else {
        wishList.add(productName);
      }
      render();
    }
  });
}

setupEventListeners();
render();
