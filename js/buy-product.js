function getProduct()
{
    var _URL  = document.URL;
    var query = _URL.split("?");
    var param = query[1].split("=");

    var product = param[1];

    return product;
}

$(document).ready(function()
{
    var product = getProduct();

    var link = "social.html"; //+ product + "-section";

    $("#back-home").click().attr("href", link);
});

/**
 * Controls step wizard behaviour.
 */
$(document).ready(function()
{
    var navListItems = $('ul.setup-panel li a');
    var allWells     = $('.setup-content');

    allWells.hide();

    navListItems.click(function(e)
    {
        e.preventDefault();

        var $target = $($(this).attr('href'));
        var $item   = $(this).closest('li');

        if(!$item.hasClass('disabled'))
        {
            navListItems.closest('li').removeClass('active');
            $item.addClass('active');
            allWells.hide();
            $target.show();
        }
    });

    $('ul.setup-panel li.active a').trigger('click');

    $('#activate-step-2').on('click', function(e)
    {
        $('ul.setup-panel li:eq(1)').removeClass('disabled');
        $('ul.setup-panel li a[href="#step-2"]').trigger('click');
        $(this).remove();
    });

    $('#activate-step-3').on('click', function(e)
    {
        $('ul.setup-panel li:eq(2)').removeClass('disabled');
        $('ul.setup-panel li a[href="#step-3"]').trigger('click');
        $(this).remove();
    });
});
