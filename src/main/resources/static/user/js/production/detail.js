
document.addEventListener('DOMContentLoaded', function () {
    const productData = [
        {
            imageUrl: '../img/printcottongucci.PNG',
            name: '프린트 코튼 저지 티셔츠',
            content: '구찌',
            price: '830000',
            category: '반팔',
            color1: 'black',
            color2: '',
            color3: '',
            detail: '새로운 시즌을 맞아 진화를 거듭하는 구찌의 하우스 코드와 저지 소재의 만남.<br>구찌 웹(Web) 배너 프린트가 돋보이는 레귤러 핏 코튼 저지 티셔츠.',
            rating: 2.5, 
            reviews: 220 
        }, {
            imageUrl: '../img/cottongucci.PNG',
            name: '자수 코튼 피케 폴로 셔츠',
            content: '구찌',
            price: '1160000',
            category: '반팔',
            color1: 'black',
            color2: '',
            color3: '',
            detail: '섬세한 플로라 자수, 엠보스 로고, 다양한 장인 정신 디테일을 강조하는 차분한<br> 블랙/그레이/그린 톤의 2025년 프리폴 아이템. 구찌 자수가 돋보이는<br> 블랙 코튼 피케 소재의 폴로 셔츠.',
            rating: 4.6, 
            reviews: 420
        }, {
            imageUrl: '../img/polosweater.PNG',
            name: '윔블던 코튼 폴로 칼라 스웨터',
            content: '랄프로렌',
            price: '439000',
            category: '반팔',
            color1: 'white',
            color2: '',
            color3: '',
            detail: '왼쪽 체스트에 시그니처 포니 자수, 스트라이프 팁 디테일, 리브 니트 폴로 칼라,<br> 3버튼 플래킷, 천연 자개 버튼, 리브 니트 암밴드, 짧은 소매',
            rating: 3.6, 
            reviews: 620
        }, {
            imageUrl: '../img/poloclassic.PNG',
            name: '클래식핏 리넨셔츠',
            content: '랄프로렌',
            price: '219000',
            category: '반팔',
            color1: 'Navy',
            color2: '',
            color3: '',
            detail: '왼쪽 체스트에 시그니처 포니 자수, 리넨 100%, 뒷면에 편안한 핏과 뛰어난<br> 활동성을 보장하는 박스 플리츠가 있는 스플릿 요크',
            rating: 1.2, 
            reviews: 20
        }, {
            imageUrl: '../img/T-shirt1black.jpg',
            name: '칠렉스 폭스 패치 레귤러 티셔츠',
            content: '메종 키츠네',
            price: '149625',
            category: '반팔',
            color1: 'black',
            color2: '',
            color3: '',
            detail: '니트 티셔츠, 클래식 핏, 반소매, 리브 니트 파이핑 크루넥, 소매와 허리 부분<br> 강화 솔기, 가슴 부분에 여우 자수 패치워크, 단색 뒷면',
            rating: 3.1, 
            reviews: 270
        }, {
            imageUrl: '../img/T-shirt2latte.jpg',
            name: '더블 볼드 폭스 헤드 컴포트 티셔츠',
            content: '메종 키츠네',
            price: '166725',
            category: '반팔',
            color1: 'white',
            color2: '',
            color3: '',
            detail: '반소매 코튼 소재 티셔츠입니다. Double Bold Fox Head 자수 패치가 있으며<br> 컴포트 핏입니다. 골지 마감 라운드 네크라인',
            rating: 4.2, 
            reviews: 100
        }, {
            imageUrl: '../img/T-shirt3fig.jpg',
            name: 'CHILLAX 프린트 오버사이즈 티셔츠',
            content: '메종 키츠네',
            price: '140648',
            category: '반팔',
            color1: 'blue',
            color2: '',
            color3: '',
            detail: '반소매 코튼 소재 티셔츠입니다. 톤온톤 Chillax Fox 프린트가 있으며<br> 오버사이즈 핏입니다. 앞면에 톤온톤 Chillax Fox 프린트, 골지 마감 라운드넥',
            rating: 1.5, 
            reviews: 17
        }, {
            imageUrl: '../img/dior-black.png',
            name: 'Christian Dior Couture 티셔츠, 캐주얼 핏',
            content: '디올',
            price: '1300000',
            category: '반팔',
            color1: 'black',
            color2: '',
            color3: '',
            detail: '2025 가을 시즌에 에센셜 디자인을 모던한 무드로 해석하여 새롭게 선보이는<br> Christian Dior Couture 티셔츠입니다. 블랙 컬러의 디스트레스드-이펙트 코튼 저지 <br>소재로 제작되었으며 체스트의 Christian Dior Couture 시그니처 프린트가 특징입니다.',
            rating: 4.8, 
            reviews: 548
        }, {
            imageUrl: '../img/louisvuitton-white.png',
            name: '엠브로이더드 시그니처 티셔츠',
            content: '루이비통',
            price: '2050000',
            category: '반팔',
            color1: 'white',
            color2: '',
            color3: '',
            detail: '가벼운 면 저지 소재로 선보이는 스마트한 블랙 색상의 티셔츠. 클래식한<br> 실루엣에 라피아 느낌의 디테일을 더해 예술적인 분위기를 자아내는 디자인.<br> 가슴 부분에 수를 놓아 완성한 루이 비통 레터링. 뒷면의 Marque L.Vuitton <br>Déposée 라벨. 캐주얼한 여름철 룩과 믹스매치하기 좋은 활용도 높은 아이템.',
            rating: 5.0, 
            reviews: 162
        }, {
            imageUrl: '../img/burberry-white.png',
            name: '크로스 스티치 EKD 코튼 티셔츠',
            content: '버버리',
            price: '760000',
            category: '반팔',
            color1: 'white',
            color2: '',
            detail: '면 저지 소재의 크루넥 티셔츠. 버버리 체크 스타일의 기마상 디자인<br>(Equestrian Knight Design, EKD) 및 버버리 로고가 십자수로 연출된 아이템.',
            rating: 4.9, 
            reviews: 319
        }, {
            imageUrl: '../img/balenciagablack.PNG',
            name: '남성 나노 Bb 미디엄 핏 티셔츠 페이드 블랙',
            content: '발렌시아가',
            price: '830000',
            category: '반팔',
            color1: 'black',
            color2: '',
            color3: '',
            detail: '이 제품의 주요 소재는 농장에서 화학 물질 사용과 물 소비를 줄이고 기존 농업<br> 방식보다 더 나은 토양 품질에 기여하는 농업 방식으로 생산된 오가닉 코튼이 50% 이상<br> 포함되어 있습니다.',
            rating: 2.2, 
            reviews: 361
        }, {
            imageUrl: '../img/balenciagared.PNG',
            name: '레드 드라이 저지 소재의 발렌시아가 푸마 오버사이즈 티셔츠',
            content: '발렌시아가',
            price: '1000000',
            category: '반팔',
            color1: 'red',
            color2: '',
            color3: '',
            detail: '발렌시아가는 2025년까지 우리의 컬렉션에서 100% 메탈-프리 태닝 가죽을<br> 목표로 하고, 모회사인 케어링의 원자재 및 제조 공정 기준과 100% 일치하는 것을 목표로<br> 하고 있습니다. 이 야심찬 약속은 여러 단계를 거쳐야 하며, 투명성을 위해 이 웹사이트에<br> 정기적으로 정보를 업데이트할 것입니다.',
            rating: 2.8, 
            reviews: 196
        }, {
            imageUrl: '../img/pradacotentshirt.PNG',
            name: '코튼 티셔츠',
            content: '프라다',
            price: '1550000',
            category: '반팔',
            color1: 'brown',
            color2: '',
            color3: '',
            detail: '골지 니트 크루 넥으로 완성된 클래식한 디자인을 가진 코튼 티셔츠입니다.<br> 매끈하고 아이코닉한 모양의 패브릭 삼각형 로고가 디자인을 장식합니다.',
            rating: 4.7, 
            reviews: 672
        }
    ];

    const params = new URLSearchParams(window.location.search);
    const productNameFromUrl = params.get('productName');

    const clothWrapper = document.querySelector('.cloth');
    const mainImageEl = document.getElementById('main-product-image');

    const bottomImageDynamicContainer = document.getElementById('bottom-image-dynamic-container');

    function updateProductDisplay(product) {
        if (!product) return;

        if (mainImageEl) {
            mainImageEl.style.backgroundImage = `url('${product.imageUrl}')`;
            mainImageEl.style.backgroundSize = `cover`;
            mainImageEl.style.backgroundPosition = `center`;
        }

        const productNameKoreanEl = document.getElementById('product-name-korean');
        if (productNameKoreanEl) {
            productNameKoreanEl.textContent = product.name;
        }

        const productNameEnglishEl = document.getElementById('product-name-english');
        if (productNameEnglishEl) {
            productNameEnglishEl.textContent = product.content;
        }

        const productRatingNumberEl = document.querySelector('.Rating .number');
        if (productRatingNumberEl) {
            productRatingNumberEl.textContent = product.rating ? product.rating.toFixed(1) : 'N/A';
        }

        const productReviewEl = document.querySelector('.Rating .review');
        if (productReviewEl) {
            productReviewEl.textContent = product.reviews ? `리뷰 ${product.reviews}` : '리뷰 없음';
        }

        const productPriceEl = document.getElementById('product-price');
        if (productPriceEl) {
            productPriceEl.textContent = `${parseFloat(product.price).toLocaleString()}원`;
        }

        const productInfoDetailLi = document.getElementById('product-info-detail');
        if (productInfoDetailLi) {
            productInfoDetailLi.innerHTML = `<strong>상세 정보:</strong> ${product.detail}`;
        }

        const colorContainer = document.querySelector('.color');
        if (colorContainer) {
            colorContainer.innerHTML = '';
            const availableColors = [];
            if (product.color1) availableColors.push(product.color1);
            if (product.color2) availableColors.push(product.color2);
            if (product.color3) availableColors.push(product.color3);

            const uniqueColors = [...new Set(availableColors)];

            if (uniqueColors.length > 0) {
                uniqueColors.forEach(color => {
                    const button = document.createElement('button');
                    button.className = 'color-option';
                    button.style.backgroundColor = color.toLowerCase();
                    button.title = color;

                    button.addEventListener('click', () => {
                        document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('selected'));
                        button.classList.add('selected');
                        console.log(`선택된 색상: ${color}`);
                    });
                    colorContainer.appendChild(button);
                });
                colorContainer.querySelector('.color-option')?.classList.add('selected');
            } else {
                const noColorText = document.createElement('p');
                noColorText.textContent = '색상 정보가 없습니다.';
                colorContainer.appendChild(noColorText);
            }
        }
    }

    function getRandomProducts(arr, num, excludeProductName = null) {
        let filteredArr = [...arr];
        if (excludeProductName) {
            filteredArr = arr.filter(p => p.name !== decodeURIComponent(excludeProductName));
        }
        const shuffled = [...filteredArr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function initializeThumbnailsAndScroll() {
        if (clothWrapper && mainImageEl) {
            if (clothWrapper.currentClickListener) {
                clothWrapper.removeEventListener('click', clothWrapper.currentClickListener);
            }

            const newThumbnailClickListener = function (event) {
                if (event.target.tagName === 'IMG' && event.target.classList.contains('thumbnail-item')) {
                    const clickedProductName = event.target.alt;
                    const clickedProduct = productData.find(p => p.name === clickedProductName);

                    if (clickedProduct) {
                        const currentSelectedThumbnail = document.querySelector('.cloth img.selected-thumbnail');
                        if (currentSelectedThumbnail) {
                            currentSelectedThumbnail.classList.remove('selected-thumbnail');
                        }
                        event.target.classList.add('selected-thumbnail');
                        updateProductDisplay(clickedProduct);
                        populateBottomImages(clickedProduct);
                    }
                }
            };
            clothWrapper.addEventListener('click', newThumbnailClickListener);
            clothWrapper.currentClickListener = newThumbnailClickListener;
        }

        const clothContainer = document.querySelector('.cloth-container');
        const scrollPrevBtn = document.querySelector('.scroll-icon1');
        const scrollNextBtn = document.querySelector('.scroll-icon2');
        const scrollDots = document.querySelectorAll('.scroll p.dot');

        if (clothContainer && clothWrapper && scrollPrevBtn && scrollNextBtn && scrollDots.length > 0) {
            const imageWidth = 150;
            const imageGap = 10;
            const containerWidth = clothContainer.offsetWidth;

            let currentIndex = 0;
            const totalImages = clothWrapper.children.length;
            const itemsPerView = Math.floor(containerWidth / (imageWidth + imageGap));
            const totalPages = Math.max(1, Math.ceil(totalImages / itemsPerView));

            scrollDots.forEach((dot, index) => {
                if (index < totalPages) {
                    dot.style.display = 'block';
                } else {
                    dot.style.display = 'none';
                }
                dot.classList.remove('active');
            });

            if (totalPages > 0) {
                scrollDots[0].classList.add('active');
            }

            function updateScrollPosition() {
                const offset = -currentIndex * itemsPerView * (imageWidth + imageGap);
                clothWrapper.style.transform = `translateX(${offset}px)`;

                scrollDots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
                scrollPrevBtn.disabled = currentIndex === 0;
                scrollNextBtn.disabled = currentIndex >= totalPages - 1;
            }

            scrollPrevBtn.removeEventListener('click', scrollPrevBtn.currentListener);
            scrollNextBtn.removeEventListener('click', scrollNextBtn.currentListener);
            scrollDots.forEach(dot => dot.removeEventListener('click', dot.currentListener));

            const prevListener = () => { if (currentIndex > 0) { currentIndex--; updateScrollPosition(); } };
            const nextListener = () => { if (currentIndex < totalPages - 1) { currentIndex++; updateScrollPosition(); } };

            scrollPrevBtn.addEventListener('click', prevListener);
            scrollNextBtn.addEventListener('click', nextListener);

            scrollPrevBtn.currentListener = prevListener;
            scrollNextBtn.currentListener = nextListener;

            scrollDots.forEach((dot, index) => {
                const dotListener = () => {
                    if (index < totalPages) {
                        currentIndex = index;
                        updateScrollPosition();
                    }
                };
                dot.addEventListener('click', dotListener);
                dot.currentListener = dotListener;
            });

            updateScrollPosition();
        }
    }

    function populateBottomImages(currentPageProduct) {
        if (!bottomImageDynamicContainer) {
            console.warn("하단 이미지 컨테이너를 찾을 수 없습니다.");
            return;
        }

        bottomImageDynamicContainer.innerHTML = '';

        const currentProductColors = [];
        if (currentPageProduct.color1) currentProductColors.push(currentPageProduct.color1.toLowerCase());
        if (currentPageProduct.color2) currentProductColors.push(currentPageProduct.color2.toLowerCase());
        if (currentPageProduct.color3) currentProductColors.push(currentPageProduct.color3.toLowerCase());
        const uniqueCurrentColors = [...new Set(currentProductColors)];

        const filteredProductsByColor = productData.filter(item => {
            if (item.name === currentPageProduct.name) {
                return false;
            }
            const itemColors = [item.color1, item.color2, item.color3].map(c => c ? c.toLowerCase() : '').filter(Boolean);
            return itemColors.some(color => uniqueCurrentColors.includes(color));
        });

        let productsToDisplay;
        const numberOfImagesToDisplay = 10;

        if (filteredProductsByColor.length > 0) {
            productsToDisplay = getRandomProducts(filteredProductsByColor, numberOfImagesToDisplay);
        } else {
            console.log("매칭되는 색상의 다른 제품이 없습니다. 랜덤 제품을 표시합니다.");
            productsToDisplay = getRandomProducts(productData, numberOfImagesToDisplay, currentPageProduct.name);
        }

        productsToDisplay.forEach(item => {
            const img = document.createElement('img');
            img.src = item.imageUrl;
            img.alt = item.name;
            img.classList.add('bottom-additional-image');
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                window.location.href = `detail.html?productName=${encodeURIComponent(item.name)}`;
            });
            bottomImageDynamicContainer.appendChild(img);
        });

        bottomImageDynamicContainer.scrollTop = 0;
    }

    if (productNameFromUrl) {
        const product = productData.find(p => p.name === decodeURIComponent(productNameFromUrl));

        if (product) {
            updateProductDisplay(product);

            if (clothWrapper) {
                clothWrapper.innerHTML = '';
                const numberOfThumbnails = 8;
                const randomThumbnails = getRandomProducts(productData, numberOfThumbnails, productNameFromUrl);

                randomThumbnails.forEach(item => {
                    const img = document.createElement('img');
                    img.src = item.imageUrl;
                    img.alt = item.name;
                    img.classList.add('thumbnail-item');
                    clothWrapper.appendChild(img);
                });
            }
            initializeThumbnailsAndScroll();
            populateBottomImages(product);

        } else {
            const rightSideEl = document.querySelector('.right-Side');
            if (rightSideEl) {
                rightSideEl.innerHTML = '<h2>상품 정보를 찾을 수 없습니다.</h2><p>선택하신 상품이 존재하지 않거나, 품절되었습니다.</p>';
            }
        }
    } else {
        const rightSideEl = document.querySelector('.right-Side');
        if (rightSideEl) {
            rightSideEl.innerHTML = '<h2>잘못된 접근입니다.</h2><p>표시할 상품 정보가 지정되지 않았습니다.</p>';
        }
    }
    const sizeBar = document.querySelector('.size-Bar');
    const sizeOptions = document.querySelector('.size-options');
    const sizeText = document.querySelector('.sizeText');
    const sizeButtons = document.querySelectorAll('.size-options ul li button');

    if (sizeBar && sizeOptions && sizeText && sizeButtons.length > 0) {
        sizeBar.addEventListener('click', function () {
            if (sizeOptions.style.display === 'none' || sizeOptions.style.display === '') {
                sizeOptions.style.display = 'block';
            } else {
                sizeOptions.style.display = 'none';
            }
        });

        sizeButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.stopPropagation();

                const currentSelected = document.querySelector('.size-options ul li button.selected');
                if (currentSelected) {
                    currentSelected.classList.remove('selected');
                }

                this.classList.add('selected');
                sizeText.textContent = this.dataset.size;
                sizeOptions.style.display = 'none';
                console.log(`선택된 사이즈: ${this.dataset.size}`);
            });
        });

        document.addEventListener('click', function (event) {
            if (sizeOptions.style.display === 'block' && !sizeBar.contains(event.target) && !sizeOptions.contains(event.target)) {
                sizeOptions.style.display = 'none';
            }
        });
    }
});