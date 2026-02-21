$(function () {
	$('header h1 a').clone().appendTo('#allmenuBox .mlogo');
	$('header #gnb > ul').clone().appendTo('#allmenuBox .menuBox');
	$('header #gnb > ul').clone().appendTo('.policy-box .sitemap');
	$('footer .sns > *').clone().appendTo('#allmenuBox .sns');
	$('#allmenuBox .copyright').text($('footer .copyright').text());

    var $wrap = $('#wrap'),
        $header = $('header'),
        $navi = $('#navi'),
        $gnb = $('#gnb > ul'),
        $gnbHover = $('#navi #gnb > ul > li'),
        $gnbSub = $('#navi #gnb > ul > li > ul'),
        $btn_all = $('.allBox'),
        $all_bg = $('#allmenuBox .allBg'),
        $lnb_p = $('#lnb p.sub_title'),
        $lnbul = $('#lnb ul'),
        $lnbli = $('#lnb li'),
        $btn_top = $('.btn_top'),
        $e_mail = $('.btn_qbox .e_mail'),
        $allmenuBox = $('#allmenuBox');


    $(window).on('load scroll', function() {
        bodyScroll = $(document).scrollTop();
        if (bodyScroll > 0) {
            $header.addClass('fix');
            setTimeout(function() {
                $('body').removeClass('intro');
            }, 2700);
        } else {
            $header.removeClass('fix');
        }
    });

    // 탑버튼
    $(".btn_top a").click(function(e) {
        e.preventDefault();
        $("html,body").stop().animate({
            scrollTop: 0
        });
    });

	let fTimer;
	$('.family-site > a').click(function(e) {
		e.preventDefault();
		clearTimeout(fTimer); // 닫기 타이머 제거
		$(this).parent().toggleClass("on");
		$('.family-site .fbox').stop(true, true).slideToggle();
	});

	// 마우스 들어왔을 때 닫기 타이머 제거
	$('.family-site').on('mouseenter', function() {
		clearTimeout(fTimer);
	});

	// 마우스 나갔을 때 닫기 타이머 시작
	$('.family-site').on('mouseleave', function() {
		fTimer = setTimeout(fTime, 1500);
	});

	function fTime() {
		$('.family-site').removeClass('on');
		$('.family-site .fbox').stop(true, true).slideUp();
	}


	let qTimer;
    $('.quickMenu .quick > a').click(function(e) {
		e.preventDefault();
		clearTimeout(qTimer); // 닫기 타이머 제거
        $(this).parent().toggleClass("on");
        $('.quickMenu .quick .q-box').stop().stop().slideToggle();
    });
    $('.quickMenu').on('mouseleave', function() {
        qTimer = setTimeout(qTime, 1500);
    });
    function qTime() {
        $('.quickMenu').removeClass('on');
         $('.quickMenu .quick .q-box').stop().stop().slideUp();
    }

    // SVG 변환 함수
    function replaceSvg($img) {
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function(data) {
            var $svg = $(data).find('svg');

            if ($svg.length === 0) return;

            if (typeof imgID !== 'undefined') $svg.attr('id', imgID);
            if (typeof imgClass !== 'undefined') $svg.attr('class', imgClass);
            $svg.removeAttr('xmlns:a');

            $img.replaceWith($svg);

        }, 'xml').fail(function() {
            console.error('SVG fetch failed:', imgURL);
        });
    }

    var menuCont = function() {

        /* allmenu */
        $btn_all.off('click');
        $btn_all.click(function(e) {
			e.preventDefault();
			if (!$(this).is('.active')) {
				$('html, body').addClass('body_hidden');
				$(this).addClass('active');
				$allmenuBox.removeClass('off').addClass('on');
				$('#allmenuBox.on .menuCont').overlayScrollbars({});
				$(document).on('click', function() { // 복제
					$(".web #allmenuBox .menuBox > ul > li").each(function() {
						$(this).on('mouseenter', function() {
							var depth2 = $(this).siblings('.subDepth');
							if (!depth2.is(':visible')) {
								depth2.stop().slideDown();
								$('.menuBox > ul > li').removeClass('hvoer');
								$(this).addClass('hover');
							} else {
								$('.menuBox > ul > li').removeClass('hover');
							};
						});
						$(this).on('mouseleave', function() {
							$('.menuBox > ul > li').removeClass('hover');
						});
					});
				});
			} else{
				$('.allBox').removeClass('active');
				$('html, body').removeClass('body_hidden');
				$allmenuBox.removeClass('on').addClass('off');
			}
        });

    }

    var windowSize = function() {

        var winWidth = $(window).width();
        if (winWidth > 760) {
            $('.subtitleTop .submenu-box').removeAttr("style");
            $('.subtitleTop .depthMenu .stit').removeClass("ov");
        }
        if (winWidth > 1024) {
            $wrap.addClass('web');
            $wrap.removeClass('mobile');
			$('.allBox').removeClass('active');
            $('html, body').removeClass('body_hidden');
            $(this).addClass('active');
            $allmenuBox.removeClass('on');
			
			/* #gnb > ul > li width:size 
            $('header #navi #gnb > ul > li').css('width', '');
            $('header #navi #gnb > ul > li').each(function() {
                var $aW = $(this).find('> a');
                var contentWidth = $aW.outerWidth();
                $(this).css('width', contentWidth + 'px');
            });
			*/
			// 각각의 높이
			$('header #navi #gnb > ul').each(function() {
				var li_On = $(this).find('> li');
				var head_H = $('header').height();

				// 전체 메뉴 hover 시 헤더 over 처리
				$(this).on('mouseenter', function() {
					$('header').addClass('over');
				});
				$(this).on('mouseleave', function() {
					$('header').removeClass('over');
					$('header .gnb_bg').css({ 'height': 0 });
				});

				// 개별 li hover 시
				li_On.on('mouseenter', function() {
					var dep2 = $(this).find('> .subDepth');
					var subHeight = dep2.outerHeight() + head_H;

					$(this).addClass('on').siblings().removeClass('on');
					$('.language').removeClass('on');

					// 개별 서브 높이에 맞게 배경 높이 조정
					$('header .gnb_bg').css({
						'height': subHeight + 'px'
					});
				});
			});


            $('header #navi #gnb > ul').each(function() {
                var li_On = $(this).find('> li');
                var dep2 = $(this).find('> li > .subDepth');
                li_On.on('mouseenter', function() {
                    $(this).addClass('on');
					$('header').addClass('over');
                });
                li_On.on('mouseleave', function() {
                    $(this).removeClass('on');
					$('header').removeClass('over');
                });
            });


        } else {
			/*
			//로고
			const observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (mutation.attributeName === 'class') {
						if ($header.hasClass('nav-down')) {
							// h1 a 복제 → .mLogo 안에 넣기
							$header.find('h1').find('img').addClass('svg').each(function() {
								replaceSvg($(this));
							});
						}
					}
				});
			});
			observer.observe($header[0], { attributes: true });
			*/
            $wrap.removeClass('web');
            $wrap.addClass('mobile');

			$('.allBox').removeClass('active');
            $('html, body').removeClass('body_hidden');
            $(this).addClass('active');
            $allmenuBox.removeClass('on');


			/* mobile gnb menu */
			$(document).on('click', function() { // 복제
				$(".mobile #allmenuBox .menuBox > ul > li").each(function() {
					var subDepthDiv = $(this).find('.subDepth');
					if (subDepthDiv.length > 0) {
						$(this).children("a").off('click').on('click', function(e) {
							e.preventDefault(); //a 태그 막기	
							var depth2 = $(this).siblings('.subDepth');
							if (!depth2.is(':visible')) {
								//$('.subDepth').removeAttr("style");
								$('.menuBox > ul').find('.subDepth').stop().slideUp();
								depth2.stop().slideDown();
								$('.menuBox > ul > li').removeClass('hover');
								$(this).parent().addClass('hover');
							} else {
								$('.menuBox > ul > li').removeClass('hover');
								$('.menuBox > ul').find('.subDepth').stop().slideUp();
							};
						});
					}
				});
			});
        }
        $('#allmenuBox .btnClose').click(function() {
			$('.allBox').removeClass('active');
            $('html, body').removeClass('body_hidden');
            $('.allBox').removeClass('active');
            $allmenuBox.removeClass('on').addClass('off');
			$('header').removeClass('over_all');
        });

        $all_bg.click(function() {
            $('html, body').removeClass('body_hidden');
            $('.allBox').removeClass('active');
            $allmenuBox.removeClass('on').addClass('off');
        });

        menuCont();
    }

    var headerRe = function() {
        if (!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)) {
            if ($btn_all.is('.active')) {
                $btn_all.click();

                $('#allmenuBox .menuBox .mCont').empty();
                $('.allBox').removeClass('active');
                $('html, body').removeClass('body_hidden');
                $(this).addClass('active');
                $allmenuBox.removeClass('on').addClass('off');
            }
        }
    }

    $(window).on('load resize orientationchange', function() {
        windowSize();
        headerRe();
        menuCont;
    });

    $(window).resize(function() {
        windowSize();
        headerRe();
        menuCont;
    });

    $(window).on("orientationchange", function(event) {
        windowSize();
        headerRe();
        menuCont;
    });

    // 탑버튼
    $(".btn_top a").click(function(e) {
        e.preventDefault();
        $("html,body").stop().animate({
            scrollTop: 0
        });
    });

    //서브페이지
	$(".depthMenu").each(function() {
		var sublist = $(this);
		var tit = $(sublist).find(".stit");

		$(tit).click(function() {
			if (!$(this).is(".ov")) {
				// 다른 메뉴 닫기
				$(".depthMenu .submenu-box").stop().slideUp();
				$(".depthMenu .stit").removeClass("ov");

				$(this).next(".submenu-box").stop().slideDown();
				$(this).addClass("ov");
			} else {
				// 다시 클릭하면 닫기
				$(this).next(".submenu-box").stop().slideUp();
				$(this).removeClass("ov");
			}
		});
	});


    var subTit1 = $("#navi #gnb > ul").children("li.hover").children("a").text();
    var subTit2 = $("#gnb > ul > li.hover > .subDepth ul > li.over > a").text();
    $(".subtitleTop .depthMenu.dep01 .stit").text(subTit1);
    $(".subtitleTop .depthMenu.dep02 .stit").text(subTit2);
	if (!$(".pageTitle").hasClass("dNo")) {
		let $h3 = $(".pageTitle h3");
		if ($h3.text() !== subTit2) {
			$h3.text(subTit2);
		}
	}
    $("h2.sub-title-m > span").text(subTit1);
    console.log("tit1:"+subTit1)
    console.log("tit2:"+subTit2)
	
    for (var i = 1; i <= 20; i++) {
        $("#navi #gnb > ul").clone().appendTo(".subtitleTop .depthMenu.dep01 .subm" + i);
    };	
    for (var j = 1; j <= 20; j++) {
        $("#navi #gnb > ul > li > .menu" + j + "> ul").clone().appendTo(".subtitleTop .depthMenu.dep02 .subm" + j);
    };

    $(".depthMenu.dep01 .subDepth").remove();

    if ($(".subtitleTop .submenu-box > ul").length === 0) {
        $(".subtitleTop .submenu-box").hide();
    }


    //text ani
    $(".txt_ani").each(function() {
        $(this).html(function(i, el) {
            var spanizer = $.trim(el).split("");
            return '<span>' + spanizer.join('</span><span>') + '</span>';
        });
    });
    $(".txt_ani").each(function() {
        $(this).find("> span").each(function(i) {
            var i = 0.10 * i
            $(this).css("animation-delay", (i) + "s")
        })
    })

    $(".txt_ani_ul").each(function() {
        $(this).find("> li").each(function(i) {
            var i = 0.10 * i
            $(this).css("animation-delay", (i) + "s")
        })
    })

    // 갯수
    $(".submenu-box > ul").addClass("m" + $(".submenu-box > ul > li").length);
    /*
    $("#lnb p").click(function() {
    	$(this).next('ul').stop().slideToggle();
    	$(this).toggleClass('ov');
    })
    var subTit = $("#lnb .depth2").children("li.on").children().text();
    $("#lnb p").text(subTit);
    */


    //animation
    var $section = $('.ani'),
        $section_s = $('.ani_s'),
        bodyScroll, windowHeight;
	var currentPageUrl = window.location.pathname;

    function sectionAni() {
        bodyScroll = $(document).scrollTop();
		if (currentPageUrl.indexOf("index.php") !== -1 || currentPageUrl.indexOf("") !== -1) {
			windowHeight = $(window).height() / 1.3;
		} else {
			windowHeight = $(window).height() / 1.3;
		}

        $section.each(function() {
            if (bodyScroll >= $(this).offset().top + 80 - windowHeight && bodyScroll < $(this).offset().top + $(this).height()) {
                $(this).addClass('on');
                $(this).addClass('subOn');
                $('.main .pnt-box').each(function() {
                    var box = $(this).find('.listbox');
                    if ($(this).hasClass('subOn')) {
                        $(this).addClass('subOn');
                        setTimeout(function() {
                            box.addClass('active');
                        }, 1700);
                    }
                });
            } else {
                $(this).removeClass('on');
            }
        });
    }
    $(function() {
        sectionAni();
    });
    $(window).on('load scroll', function() {
        sectionAni();
    });

    var didScroll;
    var lastScrollTop = 0;
    var delta = 0;
    var subVHeight = $('.subVisual').outerHeight();
    $(window).scroll(function(event) {
        didScroll = true;
    });
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 1);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta) return;
        if (st > lastScrollTop && st > subVHeight - 28) {
            $('header').addClass('nav');
        } else {
            $('header').removeClass('nav');
        }
        lastScrollTop = didScroll;
    }

	//random
	$('.random-list').each(function () {
		const $items = $(this).children('.box, li');
		$items.each(function () {
			let randomDelay = Math.random();
			$(this).css('animation-delay', randomDelay + 's');
		});
	});
	
	//index
	$(".index-list").each(function() {
		const $boxes = $(this).children(".box, li");
		$boxes.each(function(index) {
			$(this).css("animation-delay", (0.3 * index) + "s");
		});
	});
	$(".index-list1").each(function() {
		const $boxes = $(this).children(".box, li");
		$boxes.each(function(index) {
			$(this).css("animation-delay", (0.3 + 0.1 * index) + "s");
		});
	});
	$(".index-list2").each(function() {
		const $boxes = $(this).children(".box, li");
		$boxes.each(function(index) {
			$(this).css("animation-delay", (0.3 + 0.3 * index) + "s");
		});
	});
	$(".index-list3").each(function() {
		const $boxes = $(this).children(".box, li");
		$boxes.each(function(index) {
			$(this).css("animation-delay", (0.1 + 0.2 * index) + "s");
		});
	});
	$(".index-list4").each(function() {
		const $boxes = $(this).children(".box, li");
		$boxes.each(function(index) {
			$(this).css("animation-delay", (0.1 + 0.3 * index) + "s");
		});
	});
	
	//zoom
	$('.zoom-box').each(function () {
		var imgSrc = $(this).find('img').attr('src');
		var imgUrl = window.location.origin + imgSrc;
		var btn = $('<div class="btn-z"><a href="' + imgUrl + '" target="_blank">이미지 링크</a></div>');
		$(this).append(btn);
	});

	$('.global-box .global-popup .scroll-box').overlayScrollbars({});

    stickyTop();
    $(window).scroll(stickyTop).resize(stickyTop);

});

function stickyTop() {
    document_height = $(document).height(); // 문서 전체 높이
    document_scrollTop = $(document).scrollTop(); // 문서 전체 높이 중 스크롤 위치
    window_height = $(window).height(); // 창 높이

    visual_height = $('.topActive').height() - window_height;

    if (document_scrollTop > visual_height) {
        $('.quickMenu').addClass('active')
    } else {
        $('.quickMenu').removeClass('active')
    }
}

$(function() {
    /* gnb */
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();
    $(window).scroll(function(event) {
        didScroll = true;
    });
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        if (Math.abs(lastScrollTop - st) <= delta) return;
        if (st > lastScrollTop && st > navbarHeight) {
            $('header').removeClass('nav-down').addClass('nav-up');
            $('#wrap').removeClass('down');
        } else {
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
                $('#wrap').addClass('down');
            }
        }
        lastScrollTop = st;
    }
    stickyFooter();
    $(window).scroll(stickyFooter).resize(stickyFooter);

    var $w = $(window),
        footerHei = $('footer').outerHeight() - 60,
        $btn_top = $('#btn_top');
    $w.on('scroll', function() {
        var sT = $w.scrollTop();
        var val = $(document).height() - $w.height() - footerHei;
        if (sT >= val) {
            $btn_top.addClass('active');
        } else {
            $btn_top.removeClass('active');
        }
    });
});

function stickyFooter() {
    document_height = $(document).height(); // 문서 전체 높이
    document_scrollTop = $(document).scrollTop(); // 문서 전체 높이 중 스크롤 위치
    window_height = $(window).height(); // 창 높이
    footer_height = $("footer .copyright").height();

    gap = document_height - footer_height - window_height;
    bottom = document_scrollTop - gap;

    if (document_scrollTop > gap) {
        $("#wrap").addClass('s_off')
    } else {
        $("#wrap").removeClass('s_off')
    }

    visual_height = $(".subtitleTop").height() - 50;
    //console.log(visual_height,document_scrollTop)

    if (document_scrollTop > visual_height) {
        $("header").addClass('active')
    } else {
        $("header").removeClass('active')
    }
}



// 게시글 동영상 반응형
document.addEventListener("DOMContentLoaded", function() {
    // 모든 iframe 요소를 선택
    var iframes = document.querySelectorAll('.board-view iframe');

    iframes.forEach(function(iframe) {
        // 새 div 요소 생성
        var div = document.createElement('div');
        div.className = 'video-container';

        // iframe의 부모 노드에 div를 추가하고 iframe을 그 안에 넣음
        iframe.parentNode.insertBefore(div, iframe);
        div.appendChild(iframe);
    });

    // 모든 video 요소를 선택
    var videos = document.querySelectorAll('.board-view video');
    videos.forEach(function(video) {
        // 새 div 요소 생성
        var div = document.createElement('div');
        div.className = 'video-container';

        // video의 부모 노드에 div를 추가하고 video를 그 안에 넣음
        video.parentNode.insertBefore(div, video);
        div.appendChild(video);
    });
});

function resizeContent() {
    if ($(window).width() < 1024) {
        $('a.tel').each(function(){
            var telHref = $(this).data('tel-href');
            if (telHref) {
                $(this).attr('href', telHref);
            }
        });
    } else {
        $('a.tel').each(function(){
            var telHref = $(this).attr('href');
            if (telHref && telHref.startsWith('tel:')) {
                $(this).data('tel-href', telHref);
                $(this).removeAttr('href');
            }
        });
    }
}

$(document).ready(function () {
	resizeContent();
    $(window).on('resize', resizeContent);
});

//global map
function initSlick() {
    var $slider = $('.global-box .map-list > .mapCont .listbox');
    var windowWidth = $(window).width();
    if (windowWidth < 1024) {
        if (!$slider.hasClass('slick-initialized')) {
            $slider.slick({
                infinite: true,
                speed: 600,
                slidesToShow: 1,
                autoplay: false,
                autoplaySpeed: 3000,
                dots: true,
                arrows: false,
                pauseOnFocus: false,
                focusOnSelect: false,
                adaptiveHeight: true,
                cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
                pauseOnHover: true,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1
                        }
                    },
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
    } else {
        if ($slider.hasClass('slick-initialized')) {
            $slider.slick('unslick');
        }
    }
}

$(document).ready(function() {
    initSlick();
});

var resizeTimer;
$(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        initSlick();
    }, 250);
});