/*global $ */

/**
 * jQuery to collapse the navbar on scroll
 */
$(window).scroll(function()
{
    "use strict";

    if($(".navbar").offset().top > 50)
    {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    }
    else
    {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

/**
 * jQuery for page scrolling feature. This requires jQuery easing plugin
 */
$(function()
{
    "use strict";

    $(".page-scroll a").bind("click", function(event)
    {
        var $anchor = $(this);
        $("html, body").
            stop().
            animate(
            {
                scrollTop: $($anchor.attr("href")).offset().top
            }, 1500, "easeInOutExpo");

        event.preventDefault();
    });
});
