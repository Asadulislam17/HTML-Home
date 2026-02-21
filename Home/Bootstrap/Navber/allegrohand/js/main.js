$(function() {
	//visual
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

	function onYouTubeIframeAPIReady() {
		swiper.init();
	}

	var stopBtn = $('.visual').find('.playstop .stop');
	var time = 0;
	var speedTime = 800;
	var visualPlayer;
	let slideTimeout = null;
	const DEFAULT_AUTOPLAY_TIME = 5000; // 기본값 설정

	function prgr() {
		const $activeSlide = $('.swiper-slide-active');
		let swiperTime = parseInt($activeSlide.attr('data-swiper-autoplay'));
		
		// ✅ NaN 체크 및 기본값 적용
		if (isNaN(swiperTime) || swiperTime <= 0) {
			swiperTime = DEFAULT_AUTOPLAY_TIME;
		}
		
		let autoplayTime = swiperTime - speedTime;
		console.log('autoplayTime:', autoplayTime, 'swiperTime:', swiperTime);

		$('.swiper-pagination-bullet-active .line').stop(true).css('width', 0).animate({
			'width': '100%'
		}, autoplayTime);
		
		if (slideTimeout) clearTimeout(slideTimeout);
		slideTimeout = setTimeout(() => {
			swiper.slideNext();
		}, autoplayTime);
	}

	var swiper = new Swiper('#visual .swiper-container.visual', {
		effect: 'fade',
		crossFade: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			type: 'bullets',
			renderBullet: function(index, className) {
				return '<span class="' + className + '">' +
					'<svg width="100%" height="2" viewBox="0 0 100 2" preserveAspectRatio="none" class="line-chart">' +
					'<rect class="line" x="0" y="0" width="100%" height="2" fill="#fff" />' +
					'</svg></span>';
			},
		},
		autoplay: false,
		speed: speedTime,
		loop: true,
		centeredSlides: false,
		simulateTouch: true,
		autoplayDisableOnInteraction: false,
		paginationClickable: true,

		on: {
			init: function() {
				console.log('Swiper 초기화 완료');
				handleVideo(this);
				requestAnimationFrame(prgr);
			},
			slideChange: function() {
				console.log('slide changed');
				$('.swiper-pagination-bullet .line').removeAttr('style').stop(true);

				if ($('.playstop .stop').hasClass('play')) return;

				handleVideo(this);
				requestAnimationFrame(prgr);
			},
		},
	});

	$('.visual .swiper-pagination-bullet').on('click', function() {
		if (slideTimeout) clearTimeout(slideTimeout);
		swiper.slideTo($(this).index());
		requestAnimationFrame(prgr);
	});

	var totalslide = swiper.slides.length;
	$(".totalslide").html(totalslide);

	function updateSlideNumbers() {
		var activeslide = swiper.realIndex + 1;

		// activeslide 표시
		$(".activeslide").text(activeslide);

		// 총 슬라이드 수 설정
		if (totalslide < 10) {
			$(".stxt-1").text("0");
			$(".stxt-2").text("0");
		} else {
			$(".stxt-1").text(activeslide < 10 ? "0" : "");
			$(".stxt-2").text("");
		}
	}

	// 초기 로드 시 업데이트
	updateSlideNumbers();

	swiper.on('slideChangeTransitionStart', function() {
		updateSlideNumbers();
		var realIndex = swiper.realIndex;

		// 현재 슬라이드(복제 포함)
		var $activeSlide = $(swiper.slides[swiper.activeIndex]);
		var activeVideo = $activeSlide.find('video')[0];

		// 현재 보이는 영상만 처음부터 재생
		if (activeVideo) {
			activeVideo.currentTime = 0;
			activeVideo.play().catch(err => console.log("Autoplay blocked:", err));
		}

		// 🔹 loop용 복제 슬라이드도 함께 재생하도록 처리
		$('.visual .swiper-slide[data-swiper-slide-index="' + realIndex + '"]').each(function() {
			if (this === $activeSlide[0]) return; // 중복 방지
			var dupVideo = $(this).find('video')[0];
			if (dupVideo) {
				try {
					dupVideo.currentTime = 0;
				} catch (e) {}
				dupVideo.play().catch(err => console.log("Duplicate autoplay blocked:", err));
			}
		});
	});

	function handleVideo(swiper) {
		// 기존 플레이어 제거
		if (window.visualPlayer && typeof window.visualPlayer.destroy === 'function') {
			try {
				window.visualPlayer.destroy();
			} catch (e) {}
			window.visualPlayer = null;
		}

		// 모든 youtube div 초기화
		$('.swiper-slide .youtube').empty();

		const $activeSlide = $(swiper.slides[swiper.activeIndex]);
		const videoId = $activeSlide.find('.mov').data('url');
		const $youtubeDiv = $activeSlide.find('.youtube');

		if (!videoId) return;

		const playerId = 'visualPlayer_' + swiper.activeIndex;
		$youtubeDiv.attr('id', playerId);

		window.visualPlayer = new YT.Player(playerId, {
			videoId: videoId,
			playerVars: {
				autoplay: 1,
				mute: 1,
				modestbranding: 1,
				iv_load_policy: 3,
				showinfo: 0,
				controls: 0,
				playsinline: 1,
				rel: 0,
				loop: 1,
				playlist: videoId,
				vq: 'hd1080'
			},
			events: {
				onReady: e => {
					e.target.seekTo(0);
					e.target.playVideo();
				},
				onError: err => console.error('YouTube error:', err),
			}
		});
	}


    //fullpage
    var aniBox = $('.aniBox');
    $('#fullpage').fullpage({
        sectionsColor: ['#000', '#231815', '#fff', '#fff', '#fff', ''],
        anchors: ['Main', 'Products', 'AboutUs', 'News', 'Video', 'Last'],
        verticalCentered: true,
        menu: '#menu',
        navigation: false,
        navigationPosition: 'right',
        //scrollingSpeed: 1000,
        css3: true,
        scrollOverflow: true,
        responsiveWidth: 1023,
        responsiveHeight: 700,
        showActiveTooltip: false, // Add this line to hide the tooltips
        onLeave: function(anchorLink, index, direction) {
            $('#wrap').addClass('on');
            if (index === 1 || index === 2) {
                $('#wrap').removeClass('on');
            }

            if (index === 2) {
                const $listbox = $('.product .listbox');
                let moving = false;

                // 휠 이벤트 함수
                function bindWheel() {
                    $listbox.off('wheel.fpScroll').on('wheel.fpScroll', function(e) {
                        e.stopPropagation();

                        // 모달(b-modal)이 열려 있으면 fullpage 스크롤 허용 후 중단
                        if ($('.b-modal').length > 0) {
                            $.fn.fullpage.setAllowScrolling(true);
                            return;
                        }

                        if (moving) return;

                        const $el = $(this); // 현재 이벤트 발생한 listbox만
                        let scrT = $el.scrollTop();
                        let scrH = $el.height();
                        let conH = $el.find('ul').outerHeight(true); // 마진 포함 높이
                        let scrB = Math.max(conH - scrH, 0); // 음수 방지
                        let delta = e.originalEvent.deltaY;

                        // 아래로 스크롤 → 끝 도달
                        if (delta > 0 && (scrB <= 0 || scrT + 5 >= scrB)) {
                            moving = true;
                            $.fn.fullpage.setAllowScrolling(true);
                            $.fn.fullpage.moveTo(3);
                            setTimeout(() => {
                                moving = false;
                            }, 100);
                        }
                        // 위로 스크롤 → 맨 위 도달
                        else if (delta < 0 && scrT <= 0) {
                            moving = true;
                            $.fn.fullpage.setAllowScrolling(true);
                            $.fn.fullpage.moveTo(1);
                            setTimeout(() => {
                                moving = false;
                            }, 100);
                        }
                    });
                }

                // 창 크기에 따라 이벤트 바인딩 제어
                function checkWindowSize() {
                    if ($(window).width() >= 1024) {
                        // 모달이 열려 있으면 fullpage 스크롤 허용
                        if ($('.b-modal').length > 0) {
                            $.fn.fullpage.setAllowScrolling(true);
                        } else {
                            $.fn.fullpage.setAllowScrolling(false);
                            bindWheel();
                        }
                    } else {
                        $listbox.off('wheel.fpScroll'); // 1024 미만이면 이벤트 제거
                        $.fn.fullpage.setAllowScrolling(true);
                    }
                }

                // 초기 실행
                checkWindowSize();

                // 리사이즈 시 반영
                $(window).on('resize', checkWindowSize);

                // 모달 상태 변화 감지
                $(document).on('DOMSubtreeModified', function() {
                    if ($('.b-modal').length > 0) {
                        $.fn.fullpage.setAllowScrolling(true);
                    } else {
                        checkWindowSize();
                    }
                });


            } else {
                const $listbox = $('.product .listbox');
                $listbox.off('wheel.fpScroll'); // wheel 이벤트 제거
                $.fn.fullpage.setAllowScrolling(true); // 강제로 스크롤 허용
            }

            if (index === 1 || index === 3) {
                $.fn.fullpage.setAllowScrolling(true);
                // 이동 후 즉시 활성화
                setTimeout(() => $.fn.fullpage.setAllowScrolling(true), 10);
            }



        },
        afterLoad: function(anchorLink, index, origin, destination, direction) {
            console.log('index:', index);
            if (index !== 0) {
                $(this).find(aniBox).addClass('on');
            }
            if (index === 1 || index === 2) {
                $('#wrap').removeClass('on');
            }

            if (index === 5) {}

        },
    });

    $('.btn_top a').click(function(e) {
        e.preventDefault();
        $.fn.fullpage.moveTo(1, 1);
    });

    //product
    var pList = $(".product");

    function initSlick() {
        var windowWidth = $(window).width();

        pList.each(function() {
            var pSlider = $(this).find(".listbox > ul");

            if (windowWidth <= 1024) {
                if (!pSlider.hasClass("slick-initialized")) {
                    pSlider.slick({
                        infinite: true,
                        speed: 600,
                        slidesToShow: 1,
                        autoplay: false,
                        dots: true,
                        arrows: false,
                        adaptiveHeight: true,
                        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
                        touchThreshold: 10,
                        pauseOnHover: true,
                        responsive: [{
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 2
                                }
                            },
                            {
                                breakpoint: 760,
                                settings: {
                                    slidesToShow: 1
                                }
                            }
                        ]
                    });
                }
            } else {
                if (pSlider.hasClass("slick-initialized")) {
                    pSlider.slick('unslick');
                }
            }
        });
    }

    // 초기 실행
    initSlick();

    // debounce 함수
    var resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initSlick();
        }, 100);
    });


    //new
    var nSwiper = new Swiper('.news .listbox .swiper-container', {
        fadeEffect: {
            crossFade: false
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        speed: 1500,
        slidesPerView: '1',
        spaceBetween: 5,
        loop: true,
        simulateTouch: true,
        touchRatio: 0.3,
        longSwipesRatio: 0.05,
        navigation: {
            nextEl: '.news .swiper-button-next',
            prevEl: '.news .swiper-button-prev',
        },
        pagination: {
            el: '.news .swiper-pagination',
            type: 'bullets',
            clickable: 'true',
        },
        breakpoints: {
            1024: {
                slidesPerView: 'auto',
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 'auto',
                spaceBetween: 10,
            }
        },
        on: {
            init: function() {
                this.update();
            },
            resize: function() {
                this.update();
            }
        }
    });

    nSwiper.autoplay.stop();
    const targetN = document.querySelector('section.news .aniBox');
    const swiperOverN = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (
                mutation.attributeName === 'class' &&
                targetN.classList.contains('on')
            ) {
                // 슬라이드를 바로 넘기지 말고 autoplay만 시작 (slideNext 제거)
                nSwiper.autoplay.start();
            } else {
                nSwiper.autoplay.stop();
            }
        });
    });
    swiperOverN.observe(targetN, {
        attributes: true
    });

    //video
    var vSwiper = new Swiper('.video .listbox .swiper-container', {
        fadeEffect: {
            crossFade: false
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        speed: 1500,
        slidesPerView: '1',
        spaceBetween: 5,
        loop: true,
        simulateTouch: true,
        touchRatio: 0.3,
        longSwipesRatio: 0.05,
        navigation: {
            nextEl: '.video .swiper-button-next',
            prevEl: '.video .swiper-button-prev',
        },
        pagination: {
            el: '.video .swiper-pagination',
            type: 'bullets',
            clickable: 'true',
        },
        breakpoints: {
            1024: {
                slidesPerView: 'auto',
                spaceBetween: 50,
            },
            640: {
                slidesPerView: 'auto',
                spaceBetween: 30,
            }
        },
        on: {
            init: function() {
                this.update();
                fixOffsetV(this);
                togglePaginationV(this);
            },
            resize: function() {
                this.update();
                fixOffsetV(this);
                // 여기서는 단순 update만
            }
        }
    });

    vSwiper.on('slideChange', function() {
        $('.video .listbox .swiper-container .swiper-slide .mov-box').each(function() {
            var v = $(this).find('video')[0];
            if (v) {
                v.pause();
                v.currentTime = 0;
            }
            $(this).find('.bg, .play').show();
        });
    });

    $('.video .swiper-pn > div').click(function() {
        vSwiper.autoplay.start();
    });

    function fixOffsetV(swiper) {
        const swiperWidth = swiper.el.offsetWidth;
        const slide = swiper.slides[swiper.activeIndex];
        const slideWidth = slide.offsetWidth;

        if (window.innerWidth >= 1600) {
            const totalSlidesWidth = (slideWidth * 3) + (swiper.params.spaceBetween * 2);
            const remain = swiperWidth - totalSlidesWidth;

            swiper.params.slidesOffsetBefore = remain / 2;
            swiper.params.slidesOffsetAfter = remain / 2;
        } else {
            swiper.params.slidesOffsetBefore = 0;
            swiper.params.slidesOffsetAfter = 0;
        }

        swiper.update();
    }

    function togglePaginationV(swiper) {
        const realSlides = swiper.slides.filter(slide => !slide.classList.contains('swiper-slide-duplicate')).length;
        let newType;

        if (window.innerWidth <= 640) {
            newType = 'bullets';
        } else {
            //newType = realSlides <= 2 ? 'bullets' : 'progressbar';
            newType = realSlides <= 2 ? 'bullets' : 'bullets';
        }

        if (swiper.params.pagination.type !== newType) {
            swiper.pagination.destroy();
            swiper.params.pagination.type = newType;
            swiper.pagination.init();
            swiper.pagination.render();
            swiper.pagination.update();
        }
    }


    vSwiper.autoplay.stop();
    const targetV = document.querySelector('section.video .aniBox');
    const swiperOverV = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (
                mutation.attributeName === 'class' &&
                targetV.classList.contains('on')
            ) {
                // 슬라이드를 바로 넘기지 말고 autoplay만 시작 (slideNext 제거)
                vSwiper.autoplay.start();
            } else {
                vSwiper.autoplay.stop();
            }
        });
    });
    swiperOverV.observe(targetV, {
        attributes: true
    });


    // 팝업 열기
    var popupPlayer; // 글로벌 변수

    $(".video .listbox .swiper-container .swiper-slide a").on("click", function(e) {
        e.preventDefault();

        if (vSwiper) vSwiper.autoplay.stop();

        var videoId = $(this).data("url"); // 클릭한 영상 ID
        $('.popup_box').addClass('on');

        var $youtubeDiv = $('.popup_box .youtube');

        // 기존 플레이어 제거
        if (popupPlayer) {
            popupPlayer.stopVideo();
            popupPlayer.destroy();
            popupPlayer = null;
        }

        $youtubeDiv.empty().attr('id', 'popupPlayer'); // 새 플레이어용 div

        // 새 플레이어 생성
        popupPlayer = new YT.Player('popupPlayer', {
            height: '390',
            width: '640',
            videoId: videoId,
            playerVars: {
                'controls': 1,
                'rel': 0,
                'playsinline': 1,
                'autoplay': 1,
                'loop': 1,
                'playlist': videoId,
                'mute': 0,
                'vq': 'hd1080'
            },
            events: {
                'onReady': function(event) {
                    event.target.loadVideoById(videoId, 0); // 항상 처음부터 시작
                }
            }
        });
    });

    $('.popup_box .btn_close, .popup_box .bg').on("click", function(e) {
        e.preventDefault();
        $('.popup_box').removeClass("on");

        if (popupPlayer) {
            popupPlayer.stopVideo();
            popupPlayer.destroy();
            popupPlayer = null;
            $('.popup_box .youtube').empty();
        }

        if (vSwiper && vSwiper.autoplay) {
            setTimeout(function() {
                vSwiper.autoplay.start();
            }, 50);
        }
    });



    //clients
    $('.video .clients-list').each(function() {
        var $this = $(this);
        var $listUl = $this.find('.list ul');
        var $reListUl = $this.find('.re-list ul');

        var cloneCount = 5;

        // 각각 cloneCount 만큼 복제
        for (var i = 0; i < cloneCount; i++) {
            $listUl.clone().appendTo($this.find('.list'));
            $reListUl.clone().appendTo($this.find('.re-list'));
        }

        // 브라우저 렌더링 안정성을 위해 setTimeout 사용
        var winW = $(window).width();

        setTimeout(function() {
            var $firstUl = $this.find('.re-list ul').first();
            var $secondUl = $this.find('.re-list ul').eq(1);

            var ulWidth = $firstUl.outerWidth(true);

            var gap = 0;
            if ($secondUl.length) {
                var firstRight = $firstUl.offset().left + $firstUl.outerWidth();
                var secondLeft = $secondUl.offset().left;
                gap = secondLeft - firstRight;
            }

            var totalWidth = $this.find('.re-list ul').length * (ulWidth + gap);

            var moveX = ulWidth + gap;

            $this.find('.re-list').css({
                width: totalWidth + 'px',
                transform: 'translateX(-' + moveX + 'px)'
            });
        }, 50);

    });
});