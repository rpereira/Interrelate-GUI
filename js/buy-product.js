var ACTIVE_PACKAGE="";

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

    /** Sets the product selected */

    var last_char = product.substr(product.length - 1);
    if(last_char === '#')
    {
        var proc = product.split('#');
        var id = 'pkg-' + proc[0];
    }
    else
    {
        var id = 'pkg-' + product;
    }

    setProduct(id);
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

/** Changes colors of the package selected to give feedback */
function changeColor(e)
{
    var color = $(this).css('border-color');

    var id= $(this).attr('id');
    if(color === 'rgb(66, 139, 202)')
    {
        $(this).css('border', 'solid 5px #000000');
        $("#a-" + id).css('font-weight' , 'bold');

        $(ACTIVE_PACKAGE).css('border', 'solid 3px #428bca');
        var ap_id = $(ACTIVE_PACKAGE).attr('id');
        $("#a-" + ap_id).css('font-weight' , 'none');

        if(ap_id === 'pkg-basic')
        {
            $('#basic-license').removeClass('show');
            $('#basic-license').addClass('hidden');
        }

    }
    else
    {
        $(this).css('border', 'solid 3px #428bca');
        $("#a-" + id).css('font-weight' , 'none');
    }
    ACTIVE_PACKAGE = this;

    if(id === 'pkg-basic')
    {
        $('#basic-license').removeClass('hidden');
        $('#basic-license').addClass('show');
    }

    setPrice(this);

}

/** Sets the "value to pay" */

function setPrice(element)
{
    var id = $(element).attr('id');

    if(id === 'pkg-personal' || id === 'pkg-basic')
    {
        $("#value-pay").html('0,00 €');
    }
    else if(id === 'pkg-company')
    {
        $("#value-pay").html('75,00 €');
    }

}
$( "#basic-pay-plans").change(function (e)
{
    setBasicPayValue();
});


$('#pkg-personal').click(changeColor);
$('#pkg-basic').click(changeColor);
$('#pkg-company').click(changeColor);
$('#pkg-agency').click(changeColor);

/** Sets the initial product **/
function setProduct(id)
{

    $("#" + id).css('border', 'solid 5px #000000');
    $("#a-" + id).css('font-weight' , 'bold');

    ACTIVE_PACKAGE = $('#' + id);
    if(id === 'pkg-basic')
    {
        $('#basic-license').removeClass('hidden');
        $('#basic-license').addClass('show');
    }
    setPrice(ACTIVE_PACKAGE);
}

/** Sets the pay value in Basic Package */
function setBasicPayValue()
{
    var text = $('#basic-pay-plans option:selected').text();
    if(text === '1 Week')
    {
        $("#value-pay").html('0,00 €');
    }
    else if(text === '2 Weeks')
    {
        $("#value-pay").html('5,00 €');
    }
    else
    {
        $("#value-pay").html('9,00 €');
    }
}
