
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

        // Populate left tabs: info, size, recommend, review
        const infoPanel = document.getElementById('info');
        const sizePanel = document.getElementById('size');
        const recommendPanel = document.getElementById('recommend');
        const reviewPanel = document.getElementById('review');

        if (infoPanel) {
            // Structured accordion sections for 정보 tab
            infoPanel.innerHTML = `
                <div class="info-accordion">
                    <div class="acc-item">
                        <button class="acc-head" data-acc="detail">상품상세</button>
                        <div class="acc-body" id="acc-detail">
                            <div class="info-block">
                                <p>${product.detail}</p>
                                <ul>
                                    <li><strong>브랜드:</strong> ${product.content || '정보 없음'}</li>
                                    <li><strong>카테고리:</strong> ${product.category || '정보 없음'}</li>
                                    <li><strong>가격:</strong> ${parseFloat(product.price).toLocaleString()}원</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="acc-item">
                        <button class="acc-head" data-acc="manufacturer">제조/수입</button>
                        <div class="acc-body" id="acc-manufacturer">
                            <ul class="info-list">
                                <li><strong>제조연월:</strong> 수입제품으로 각 제품별 입고 시기에 따라 상이합니다.</li>
                                <li><strong>제조자/수입자:</strong> Nike. Inc / (유)QWER</li>
                            </ul>
                        </div>
                    </div>
                    <div class="acc-item">
                        <button class="acc-head" data-acc="as">A/S 안내</button>
                        <div class="acc-body" id="acc-as">
                            <ul class="info-list">
                                <li>A/S 책임자와 전화번호: (유)QWER코리아 온라인 스토어 고객센터 / 080-022-0182</li>
                            </ul>
                        </div>
                    </div>
                    <div class="acc-item">
                        <button class="acc-head" data-acc="care">세탁 및 취급주의</button>
                        <div class="acc-body" id="acc-care">
                            <p>세탁방법 및 취급시 주의사항: 자세한 내용은 '자세히 보기'를 클릭하여 확인 부탁드립니다.</p>
                        </div>
                    </div>
                    <div class="acc-item">
                        <button class="acc-head" data-acc="warranty">품질보증</button>
                        <div class="acc-body" id="acc-warranty">
                            <p>품질보증기준: 품질보증기간-섬유 및 일반 소재(구입 후 6개월), 가죽소재(구입 후 1년).</p>
                        </div>
                    </div>
                </div>
            `;
        }

        if (sizePanel) {
            sizePanel.innerHTML = `
                <p>권장 사이즈 가이드 (참고용)</p>
                <table class="size-table">
                    <thead><tr><th>사이즈</th><th>가슴(cm)</th><th>어깨(cm)</th><th>기장(cm)</th></tr></thead>
                    <tbody>
                        <tr><td>S</td><td>90</td><td>40</td><td>65</td></tr>
                        <tr><td>M</td><td>96</td><td>43</td><td>68</td></tr>
                        <tr><td>L</td><td>102</td><td>46</td><td>71</td></tr>
                        <tr><td>XL</td><td>108</td><td>49</td><td>74</td></tr>
                    </tbody>
                </table>
                <p class="size-note">※ 실제 사이즈는 제품, 핏에 따라 다를 수 있으니 상세정보를 확인하세요.</p>
            `;
        }

        if (recommendPanel) {
            // build a horizontal carousel that supports many items
            const recs = getRandomProducts(productData, 12, product.name);
            recommendPanel.innerHTML = `
                <div class="recommend-carousel">
                    <button class="rec-arrow rec-prev" aria-label="prev">‹</button>
                    <div class="recommend-viewport"><div class="recommend-track"></div></div>
                    <button class="rec-arrow rec-next" aria-label="next">›</button>
                </div>
            `;

            const track = recommendPanel.querySelector('.recommend-track');
            const prevBtn = recommendPanel.querySelector('.rec-prev');
            const nextBtn = recommendPanel.querySelector('.rec-next');

            recs.forEach(p => {
                const item = document.createElement('div');
                item.className = 'rec-item';
                item.innerHTML = `
                    <div class="rec-thumb-wrap"><img src="${p.imageUrl}" alt="${p.name}"></div>
                    <p class="rec-name">${p.name}</p>
                    <p class="rec-price">${parseFloat(p.price).toLocaleString()}원</p>
                `;
                // clicking image opens modal; clicking item title navigates
                item.querySelector('img').addEventListener('click', (ev) => { ev.stopPropagation(); openImageModal(p.imageUrl, p.name); });
                item.addEventListener('click', (e) => { if (e.target.tagName.toLowerCase() !== 'img') window.location.href = `detail.html?productName=${encodeURIComponent(p.name)}`; });
                track.appendChild(item);
            });

            // carousel behavior
            let index = 0;
            function updateCarousel() {
                const viewport = recommendPanel.querySelector('.recommend-viewport');
                const items = track.querySelectorAll('.rec-item');
                if (!items.length) return;
                const itemStyle = getComputedStyle(items[0]);
                const itemWidth = items[0].getBoundingClientRect().width + parseFloat(itemStyle.marginRight || 12);
                const visibleCount = Math.floor(viewport.getBoundingClientRect().width / itemWidth) || 1;
                const maxIndex = Math.max(0, items.length - visibleCount);
                index = Math.min(index, maxIndex);
                const offset = -index * itemWidth;
                track.style.transform = `translateX(${offset}px)`;
                prevBtn.disabled = index === 0;
                nextBtn.disabled = index >= maxIndex;
            }

            prevBtn.addEventListener('click', () => { index = Math.max(0, index - 1); updateCarousel(); });
            nextBtn.addEventListener('click', () => { index = index + 1; updateCarousel(); });
            window.addEventListener('resize', updateCarousel);
            setTimeout(updateCarousel, 100);
        }

        if (reviewPanel) {
            const sampleReviews = generateSampleReviews(product);
            let reviewsHtml = `<div class="review-summary"><strong>평점: ${product.rating ? product.rating.toFixed(1) : 'N/A'}</strong> · 리뷰 ${product.reviews || 0}</div>`;
            reviewsHtml += '<div class="review-items">';
            sampleReviews.forEach(rv => {
                reviewsHtml += `
                    <div class="review-item">
                        <div class="review-stars">${'★'.repeat(Math.round(rv.rating))}${'☆'.repeat(5 - Math.round(rv.rating))}</div>
                        <div class="review-text">${rv.text}</div>
                        <div class="review-author">- ${rv.author}</div>
                    </div>
                `;
            });
            reviewsHtml += '</div>';
            reviewPanel.innerHTML = reviewsHtml;
        }

        // previously moved bottom additional info — now if exists, append into appropriate accordion section
        const bottomSideText = document.querySelector('.bottom-Sidetext');
        if (bottomSideText) {
            const manufBody = infoPanel.querySelector('#acc-manufacturer');
            const careBody = infoPanel.querySelector('#acc-care');
            const warrantyBody = infoPanel.querySelector('#acc-warranty');
            // append raw content in a sensible place (manufacturer/body)
            if (manufBody) {
                const wrapper = document.createElement('div');
                wrapper.className = 'additional-info';
                wrapper.innerHTML = bottomSideText.innerHTML;
                manufBody.appendChild(wrapper);
            }
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

    // small helper to create a few sample review items for display
    function generateSampleReviews(product) {
        const samples = [
            '제품이 기대 이상이에요. 재질도 좋고 핏도 예쁩니다.',
            '배송이 빨랐고, 실물이 사진보다 더 예쁘네요.',
            '사이즈가 조금 작게 느껴져 한 사이즈 업 추천합니다.'
        ];
        const out = [];
        for (let i = 0; i < Math.min(3, samples.length); i++) {
            out.push({ rating: Math.max(1, Math.round((product.rating || 4) - i)), text: samples[i], author: `사용자${i + 1}` });
        }
        return out;
    }

    // --- Image modal for recommend tab ---
    function createImageModal() {
        if (document.getElementById('image-modal')) return;
        const modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-box">
                <button class="modal-close" aria-label="닫기">×</button>
                <img id="modal-img" src="" alt="큰 이미지">
                <div id="modal-caption"></div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.modal-backdrop').addEventListener('click', closeImageModal);
        modal.querySelector('.modal-close').addEventListener('click', closeImageModal);
    }

    function openImageModal(src, caption) {
        createImageModal();
        const modal = document.getElementById('image-modal');
        const img = modal.querySelector('#modal-img');
        const cap = modal.querySelector('#modal-caption');
        img.src = src;
        cap.textContent = caption || '';
        modal.classList.add('open');
    }

    function closeImageModal() {
        const modal = document.getElementById('image-modal');
        if (!modal) return;
        modal.classList.remove('open');
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
            // 하단 추천 영역을 삭제했으므로 populateBottomImages 호출 제거

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
    // Tab interaction for left image area
    const tabs = document.querySelectorAll('.left-tabs .tab');
    const tabPanels = document.querySelectorAll('.left-tabs .tab-panel');

    if (tabs.length > 0 && tabPanels.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;

                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                tabPanels.forEach(panel => {
                    if (panel.id === target) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            });
        });
    }

    // Accordion behavior for info tab (allow multiple open)
    (function setupAccordion(){
        const infoTab = document.getElementById('info');
        if (!infoTab) return;
        infoTab.addEventListener('click', (e) => {
            const head = e.target.closest('.acc-head');
            if (!head) return;
            const parent = head.parentElement;
            const body = parent.querySelector('.acc-body');
            const isOpen = body.classList.contains('open');
            if (isOpen) {
                body.classList.remove('open');
                head.classList.remove('open');
            } else {
                body.classList.add('open');
                head.classList.add('open');
            }
        });
    })();

    // adjust right-Side top offset so it sits below header and doesn't overlap
    (function alignRightSideUnderHeader(){
        const rightSide = document.querySelector('.right-Side');
        const header = document.getElementById('header');
        if (!rightSide) return;
        function updateTop() {
            const h = header ? header.offsetHeight : 0;
            const top = h + 8; // 8px gap
            rightSide.style.top = top + 'px';
            // also ensure right position recalculated (in case viewport changed)
            rightSide.style.right = `calc((100% - 1400px) / 2 + 20px)`;
        }
        updateTop();
        window.addEventListener('resize', updateTop);
    })();

    // improve header-aware positioning using ResizeObserver / MutationObserver
    (function robustRightSidePositioning(){
        const rightSide = document.querySelector('.right-Side');
        const header = document.getElementById('header');
        const bigTitle = document.getElementById('big-Title');
        if (!rightSide || !bigTitle) return;
        function applyPos(){
            const h = header ? header.offsetHeight : 0;
            // compute right offset so the fixed panel aligns with the centered 1400px container
            const containerRect = bigTitle.getBoundingClientRect();
            // containerRect.right is distance from viewport left to container right
            const rightOffset = window.innerWidth - containerRect.right + 20; // 20px gap from container
            rightSide.style.top = (h + 8) + 'px';
            rightSide.style.right = `${Math.max(8, rightOffset)}px`;
            rightSide.style.zIndex = 1200;
        }

        applyPos();

        if (window.ResizeObserver && header) {
            try {
                const ro = new ResizeObserver(() => applyPos());
                ro.observe(header);
                ro.observe(bigTitle);
            } catch (e) {
                window.addEventListener('resize', applyPos);
            }
        } else {
            // fallback
            const mo = new MutationObserver(() => applyPos());
            mo.observe(document.body, { childList: true, subtree: true });
            window.addEventListener('resize', applyPos);
            window.addEventListener('scroll', applyPos);
        }
    })();

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