$(function() {
    $('html').removeClass('no-js').addClass('js');

    if(typeof jQuery.browser == 'undefined' || !jQuery.browser.mobile) {
        $('.vanimate-fadein').addClass('vanimate-hidden').viewportChecker({
            classToAdd: 'vanimate-visible animate fadeIn',
            offset: 100
        });

        $('.vanimate-fadeinup').addClass('vanimate-hidden').viewportChecker({
            classToAdd: 'vanimate-visible animate fadeInUp',
            offset: 100
        });
    }

    setMenuListener();
    //setGallerySlider();
    setPopups();
    setJournalHover();
    setWineCollectionActions();
});

$(window).load(function() {
    $('#preloader').fadeOut();
    $('#main_content').show();

    $('.delayedFadeIn').addClass('fadeIn').removeClass('vh');
    $('.delayedFadeInUp').addClass('fadeInUp').removeClass('vh');

    setTimeout(function() {
        $('.txtDelayedFadeIn').addClass('fadeIn').removeClass('vh');
        $('.txtDelayedFadeInUp').addClass('fadeInUp').removeClass('vh');
    }, 500);

    setTimeout(function() {
        $('.subtxtDelayedFadeIn').addClass('fadeIn').removeClass('vh');
        $('.subtxtDelayedFadeInUp').addClass('fadeInUp').removeClass('vh');
    }, 900);
    setGallerySlider();
});


function setMenuListener() {
    var menuButton = $('#menu_button');
    var mobileMenuIcon = $('#mobile_menu_icon');
    var mobileMenuPopup = $('#mobile_menu_popup');
    if (menuButton.length > 0) {
        menuButton.click(function() {
            console.log("test");
            if ($('#menu_popup_innback').width() > 0) hideMenu();
            else showMenu();
        });
    }

    if (mobileMenuIcon.length > 0) {
        mobileMenuIcon.click(function() {
            if(!mobileMenuPopup.is(':visible')) mobileMenuPopup.stop(true, true).show().animate({opacity: 1}, 400);
            else mobileMenuPopup.stop(true, true).show().animate({opacity: 0}, 400, function() { $(this).hide(); });
        });
    }
}

function hideMenu() {
    console.log("test");
    $('#menu_popup_back').stop(true, true).animate({opacity: 0}, 200, function() { $(this).hide(); });
    $('#menu_popup').stop(true, true).animate({opacity: 0}, 400, function() { $(this).hide(); });
    $('#menu_popup_innback').stop(true, true).animate({width: '0%'}, 400, function() { $(this).hide(); });
    $('#menu_button .text').text("MENU");
    $('#menu_button .icon').removeClass("icon-close");
}

function showMenu() {
    $('#menu_popup_back').stop(true, true).show().animate({opacity: 1}, 400);
    $('#menu_popup_innback').stop(true, true).show().animate({width: '100%'}, 400);
    $('#menu_popup').stop(true, true).show().animate({opacity: 1}, 600);
    $('#menu_button .text').text("CLOSE");
    $('#menu_button .icon').addClass("icon-close");
}

function setGallerySlider() {

    var transitionDuration = 500;
    var gallerySlider = $('#gallery_slider');
    var galleryTitle = $('#gallery_title');
    var galleryNumber = $('#gallery_number');
    var numItems = gallerySlider.find('.gallery_item').length;

    if (gallerySlider.length > 0) {
        var fullGallery = gallerySlider.lightSlider({

            item: 3,
            loop: true,
            slideMove: 1,
            pager: false,
            gallery: false,
            slideMargin: 80,
            prevHtml: '<span class="left_line"></span><span>PREV</span>',
            nextHtml: '<span class="right_line"></span><span>NEXT</span>',
            responsive : [
                {
                    breakpoint: 976,
                    settings: {
                        item: 1,
                        slideMove: 1,
                        slideMargin: 20
                    }
                }
            ],
            onAfterSlide: function(el, elnumber) {
                var centerItem = $(el).find('li:nth-child(' + (elnumber+2) + ')');

                if (centerItem && galleryTitle && centerItem != null && galleryTitle != null) {
                    galleryTitle.stop(true, true).fadeOut(transitionDuration / 2, function () {
                        galleryTitle.text(centerItem.data('title'));
                        galleryTitle.fadeIn(transitionDuration / 2);
                    });
                }

                if (galleryNumber && galleryNumber != null) {
                    galleryNumber.stop(true, true).fadeOut(transitionDuration / 2, function () {
                        galleryNumber.text(centerItem.data('number') + ' / ' + numItems);
                        galleryNumber.fadeIn(transitionDuration / 2);
                    });
                }
            }


        });
    }
}

function setPopups() {
    var popupLinks = $('.popup_link');
    if (popupLinks.length > 0) {
        popupLinks.click(showPopups);
        $('#mobile_close_icon').click(hidePopups);
        $('#close_button').click(hidePopups);
        $(".popup_element").click(hidePopups);
    }
}

function showPopups(e) {
    e.preventDefault();
    var popupBackElement = $('#noise_popup_back');
    var fixedElements = $('.fixed_elements');
    var popupElement = $($(this).attr('href'));

    if (popupElement.length > 0) {
        $('#mobile_close_icon').show().animate({opacity: 1}, 200);
        $('#close_button').show().animate({opacity: 1}, 200);
        fixedElements.find('.main_menu').css('display', 'none');
        popupBackElement.stop(true, true).show().animate({opacity: 0.95}, 200, function() {
            fixedElements.find('#mobile_menu_icon').css('display', 'none');
            //fixedElements.find('.main_menu').css('display', 'none');
            fixedElements.find('.left_holder').css('display', 'none');
            fixedElements.find('.right_holder').css('display', 'none');
            fixedElements.find('.bottom_holder').css('display', 'none');
            $('html, body').css('overflow', 'hidden');
            if(popupElement.hasClass("about_wine_popup")) { // wine popup, animate parts
                var wine = popupElement.find(".wine");
                var text = popupElement.find(".popup_content");
                var other = popupElement.find(".triangle, .mesmerising");
                wine.css({opacity: 0});
                text.css({opacity: 0});
                other.css({opacity: 0});
                popupElement.stop(true, true).show().animate({opacity: 1}, 200, function(){
                    wine.stop(true, true).delay(100).animate({opacity: 1}, 1000, "easeInCubic");
                    text.stop(true, true).delay(300).animate({opacity: 1}, 1100, "easeInCubic");
                    other.stop(true, true).delay(600).animate({opacity: 1}, 900, "easeInCubic");
                });
            } else popupElement.stop(true, true).show().animate({opacity: 1}, 200);
        });
    }
}

function hidePopups(e) {
    var fixedElements = $('.fixed_elements');
    fixedElements.find('#mobile_menu_icon').css('display', '');
    fixedElements.find('.main_menu').css('display', '');
    fixedElements.find('.left_holder').css('display', '');
    fixedElements.find('.right_holder').css('display', '');
    fixedElements.find('.bottom_holder').css('display', '');
    $('html, body').css('overflow', '');

    e.preventDefault();
    $('#noise_popup_back').stop(true, true).animate({opacity: 0}, 200, function() { $(this).hide(); });
    $('.popup_element').stop(true, true).animate({opacity: 0}, 200, function() { $(this).hide(); });
    $('#mobile_close_icon').stop(true, true).animate({opacity: 0}, 200, function() { $(this).hide(); });
    $('#close_button').stop(true, true).animate({opacity: 0}, 200, function() { $(this).hide(); });
}

function setJournalHover() {
    var journalLink = $('.journal_link');

    if (journalLink.length > 0) {
        journalLink.hover(
            function() {
                var imageScale = $(this).parents('.journal_item_hover').find('.image_scale');
                var imageScaleOverlay = $(this).parents('.journal_item_hover').find('.image_scale_overlay');
                if(imageScale.length > 0) imageScale.addClass('hover');
                if(imageScaleOverlay.length > 0) imageScaleOverlay.addClass('hover');
            }, function() {
                var imageScale = $(this).parents('.journal_item_hover').find('.image_scale');
                var imageScaleOverlay = $(this).parents('.journal_item_hover').find('.image_scale_overlay');
                if(imageScale.length > 0) imageScale.removeClass('hover');
                if(imageScaleOverlay.length > 0) imageScaleOverlay.removeClass('hover');
            }
        );
    }
}

function setWineCollectionActions() {
    if(typeof jQuery.browser == 'undefined' || !jQuery.browser.mobile) {
        var wineCollection = $('#wine_collection_wines');
        var wineMenu = $('#wines_side_menu');

        if (wineCollection.length > 0 && wineMenu.length > 0) {
            wineCollection.viewportChecker({
                repeat: true,
                classToAdd: 'wine_hover',
                callbackFunction: function (el, action) {
                    if (action == 'add') wineMenu.find('ul').stop(true, true).fadeIn();
                    else wineMenu.find('ul').stop(true, true).fadeOut();
                }
            });

            wineCollection.find('.wine').viewportChecker({
                repeat: true,
                classToAdd: 'wine_hover',
                offset: 300,
                callbackFunction: function (el, action) {
                    wineMenu.find('a').removeClass('active');
                    var wineElement = wineMenu.find('.' + $(el).attr('id') + ' a');
                    if (wineElement.length > 0) wineElement.addClass('active');
                }
            });

            wineMenu.find('a').click(function(e) {
                e.preventDefault();

                var wineElement = $($(this).attr('href'));
                if (wineElement.length > 0) {
                    $("html, body").stop(true, true).animate({
                        scrollTop: wineElement.offset().top - 550
                    }, 800);
                }
            });
        }
    }
}
function setFloatingCards() {
    var floatingCards = $('.floatingcard_holder');

    var defaultLightWidth = 40;
    var defaultLightAngle = 45;

    var maxRotateX = 6;
    var maxRotateY = 6;
    var maxLightWidth = 25;
    var maxLightAngle = 20;

    var lightValue = {
        width: defaultLightWidth,
        angle: defaultLightAngle
    };

    floatingCards.mousemove(function(event) {
        var offset = $(this).offset();
        var fcHalfWidth = $(this).width() / 2;
        var fcHalfHeight = $(this).height() / 2;
        var mouseX = (event.pageX - offset.left) || 0;
        var mouseY = (event.pageY - offset.top) || 0;

        var diffX = -1 * (fcHalfWidth - mouseX);
        var diffY = fcHalfHeight - mouseY;
        var rotateX = diffY / fcHalfHeight * maxRotateX;
        var rotateY = diffX / fcHalfWidth * maxRotateY;

        lightValue.width = defaultLightWidth - (diffY / fcHalfHeight * maxLightWidth);
        lightValue.angle = defaultLightAngle - (diffX / fcHalfWidth * maxLightAngle);

        $(this).css('transform', "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)");
        $(this).find('.floatingcard_light').css('background-image', "linear-gradient(" + lightValue.angle + "deg, rgba(0, 0, 0, 0.5), transparent " + lightValue.width + "%)");
    });
    
    floatingCards.mouseleave(function() {
        $(this).css('transform', "rotateX(0deg) rotateY(0deg)");
        $(this).find('.floatingcard_light').css('background-image', "linear-gradient(" + defaultLightAngle + "deg, rgba(0, 0, 0, 0.5), transparent " + defaultLightWidth + "%)");
    });
}