$(document).ready(function() {
    history.pushState(null, null, location.href);
    window.onpopstate = function() {
        history.pushState(null, null, location.href); // 뒤로 가기 시 현재 페이지로 돌아오게 함
    };
    // URL 파라미터 값 가져오기
	function getParameter(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
		var results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	console.log(getParameter('s_cate'));

    var url = location.pathname;
    var url_lang = url.split("/")[1];
    var pathParts = url.split('/');
    var filename = pathParts[pathParts.length - 1];
    var phpPrefix = pathParts.slice(0, pathParts.length - 1).join('/');
    var pageName = filename.replace('.php', '');

    //console.log("url_lang", url_lang);
    //console.log("phpPrefix", phpPrefix);
    //console.log("pageName", pageName);

    var currentPageURL = window.location.pathname;

    // URL 파라미터에서 s_cate 값을 가져옴
    var currentDataNum = getParameter("s_cate");
    //console.log("currentDataNum:", currentDataNum);

    // URL 파라미터가 존재하면 해당 탭 활성화
    $("." + pageName + "-box .tabmenu > ul > li").each(function() {
        var tabDataNum = $(this).attr("data-num");
        if (tabDataNum === currentDataNum) {
            $(this).addClass("on").siblings().removeClass("on");
        }
    });

    // `on` 클래스가 있는 요소의 s_cate 값을 기반으로 AJAX 실행
    var activeTab = $("." + pageName + "-box .tabmenu > ul > li.on");
    if (activeTab.length) {
        var dataNum = activeTab.attr("data-num");
		var encodedDataNum = encodeURIComponent(dataNum);
        //var urlName = phpPrefix + "/" + pageName + "/" + dataNum + ".php";
        var urlName = phpPrefix + "/" + pageName + "/" + encodedDataNum + ".php?v=" + Date.now();
        
		if ($('.pageCont').length > 0) {
			conAjax(urlName);
		} else {
			console.log('pageCont가 없어서 conAjax 호출 안함');
		}
    }

    // 탭 클릭 시 처리
    $("." + pageName + "-box .tabmenu > ul > li > a").on("click", function(e) {
        var li = $(this).parent();

        // 'link' 클래스가 있는 경우
        if (li.hasClass('link')) {
            return; // 외부 링크로 이동
        }

        e.preventDefault(); // 기본 동작(페이지 이동)을 막음
        var dataNum = li.attr("data-num");
		var encodedDataNum = encodeURIComponent(dataNum);
        var urlName = phpPrefix + "/" + pageName + "/" + encodedDataNum + ".php?v=" + Date.now();

        // 클릭한 탭만 'on' 추가하고, 다른 탭의 'on' 클래스 제거
        li.siblings().removeClass("on");
        li.addClass("on");

        // AJAX 호출
		if ($('.pageCont').length > 0) {
			conAjax(urlName);
		} else {
			console.log('pageCont가 없어서 conAjax 호출 안함');
		}

        // URL에 s_cate 파라미터 추가
        var newUrl = currentPageURL + "?s_cate=" + encodeURIComponent(dataNum);
        history.pushState(null, "", newUrl);
    });

    $("." + pageName + "-box .menu > ul > li > a").on("click", function(e) {
        var li = $(this).parent();

        // 'link' 클래스가 있는 경우
        if (li.hasClass('link')) {
            return; // 외부 링크로 이동
        }

        e.preventDefault(); // 기본 동작(페이지 이동)을 막음
        var dataNum = li.attr("data-num");
		var encodedDataNum = encodeURIComponent(dataNum);
        var urlName = phpPrefix + "/" + pageName + "/" + encodedDataNum + ".php?v=" + Date.now();

        // 클릭한 탭만 'on' 추가하고, 다른 탭의 'on' 클래스 제거
        li.siblings().removeClass("on");
        li.addClass("on");

        $("." + pageName + "-box .menu").hide();
        $("." + pageName + "-box .pageCont").show();

        // AJAX 호출
		if ($('.pageCont').length > 0) {
			conAjax(urlName);
		} else {
			console.log('pageCont가 없어서 conAjax 호출 안함');
		}

        // URL에 s_cate 파라미터 추가
        var newUrl = currentPageURL + "?s_cate=" + encodeURIComponent(dataNum);
        history.pushState(null, "", newUrl);
    });

    // 뒤로 가기 버튼 클릭 시 URL에 맞는 탭을 활성화하도록 수정
    window.onpopstate = function() {
        var currentDataNum = getParameter("s_cate"); // URL 파라미터 가져오기
        var currentPageURL = window.location.pathname;

        // .tabmenu 내에서 s_cate 값에 맞는 탭 활성화
        if (currentDataNum) {
            $("." + pageName + "-box .tabmenu > ul > li").each(function() {
                var tabDataNum = $(this).attr("data-num");
                if (tabDataNum === currentDataNum) {
                    $(this).addClass("on").siblings().removeClass("on");
                }
            });

            // .menu 내에서 s_cate 값에 맞는 탭 활성화
            $("." + pageName + "-box .menu > ul > li").each(function() {
                var tabDataNum = $(this).attr("data-num");
                if (tabDataNum === currentDataNum) {
                    $(this).addClass("on").siblings().removeClass("on");
                }
            });

            // s_cate 값이 있으면 .menu를 숨김
            $("." + pageName + "-box .menu").hide();
            $("." + pageName + "-box .pageCont").show();

            // 해당하는 데이터를 AJAX로 로드
            //var urlName = phpPrefix + "/" + pageName + "/" + currentDataNum + ".php";
            var urlName = phpPrefix + "/" + pageName + "/" + currentDataNum + ".php?v=" + Date.now()
			if ($('.pageCont').length > 0) {
				conAjax(urlName);
			} else {
				console.log('pageCont가 없어서 conAjax 호출 안함');
			}

        } else {
            // s_cate 값이 없으면 .menu를 보이도록 설정
            $("." + pageName + "-box .menu").show();
            $("." + pageName + "-box .pageCont").hide();
        }
    };


    // Ajax 호출 함수
    function conAjax(urlName) {
        $.ajax({
            url: urlName,
            type: "post",
            dataType: "html",
            cache: false, // 캐시 끄기
            success: function(res) {
                $("." + pageName + "-box .pageCont").html(res); //호출

                /* svg */
                jQuery('img.svg').each(function() {
                    var $img = jQuery(this);
                    var imgID = $img.attr('id');
                    var imgClass = $img.attr('class');
                    var imgURL = $img.attr('src');
                    jQuery.get(imgURL, function(data) {

                        // Get the SVG tag, ignore the rest
                        var $svg = jQuery(data).find('svg');

                        // Add replaced image's ID to the new SVG
                        if (typeof imgID !== 'undefined') {
                            $svg = $svg.attr('id', imgID);
                        }
                        // Add replaced image's classes to the new SVG
                        if (typeof imgClass !== 'undefined') {
                            $svg = $svg.attr('class', imgClass + ' replaced-svg');
                        }

                        // Remove any invalid XML tags as per http://validator.w3.org
                        $svg = $svg.removeAttr('xmlns:a');

                        // Replace image with new SVG
                        $img.replaceWith($svg);

                    }, 'xml');

                });

                var $section = $('.ani'),
                    bodyScroll, windowHeight;
                var currentPageUrl = window.location.pathname;

                function sectionAni() {
                    bodyScroll = $(document).scrollTop();
                    windowHeight = $(window).height() / 1.15;

                    $section.each(function() {
                        if (bodyScroll >= $(this).offset().top + 80 - windowHeight && bodyScroll < $(this).offset().top + $(this).height()) {
                            $(this).addClass('on');
                            $(this).addClass('subOn');
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

                //random
                $('.random-list').each(function() {
                    const $items = $(this).children('.box, li');
                    $items.each(function() {
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
				$(".index-list3").each(function() {
					const $boxes = $(this).children(".box, li");
					$boxes.each(function(index) {
						$(this).css("animation-delay", (0.1 + 0.3 * index) + "s");
					});
				});

                //zoom
                $('.zoom-box').each(function() {
                    var imgSrc = $(this).find('img').attr('src');
                    var imgUrl = window.location.origin + imgSrc;
                    var btn = $('<div class="btn-z"><a href="' + imgUrl + '" target="_blank">이미지 링크</a></div>');
                    $(this).append(btn);
                });
            }
        });
    }
});