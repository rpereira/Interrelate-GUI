var ACTIVE_PACKAGE="";



$('#btn-login').click(function(e)
{
    console.log("uau")
});



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
        $("#" + id).css('border', 'solid 3px #449d44');
        $("#a-" + id).css('font-weight' , 'bold');
        $("#a-" + id).css('font-size' , '20px');

        $(ACTIVE_PACKAGE).css('border', 'solid 3px #428bca');
        var ap_id = $(ACTIVE_PACKAGE).attr('id');
        $("#a-" + ap_id).css('font-weight' , 'none');
        $("#a-" + id).css('font-size' , '18px');

        if(ap_id === 'pkg-basic')
        {
            $('#basic-license').removeClass('show');
            $('#basic-license').addClass('hidden');
        }

        $('#buy-' + id).removeClass('hidden');
        $('#buy-' + id).addClass('show');
        $('#buy-' + ap_id).removeClass('show');
        $('#buy-' + ap_id).addClass('hidden');


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

    if(id === 'pkg-personal')
    {
        $('#expiration-date').html('-/-/-');
        $("#value-pay").html('0,00 €');
    }
    else if(id === 'pkg-company')
    {
        var today           = new Date();
        var nextMonth       = new Date(new Date(today).setMonth(today.getMonth()+1));
        var expiration      = nextMonth.getDate() + '/' + nextMonth.getMonth() + '/' + nextMonth.getFullYear();

        $('#expiration-date').html(expiration);
        $("#value-pay").html('75,00 €');
    }
    else
    {
        $("#value-pay").html('0,00 €');
        setBasicPayValue();
    }

}

/** Sets the initial product **/
function setProduct(id)
{
    $("#" + id).css('border', 'solid 3px #449d44');

    $("#a-" + id).css('font-weight' , 'bold');
    $("#a-" + id).css('font-size' , '20px');

    //Activate package description in modal
    $("#buy-" + id).removeClass('hidden');
    $("#buy-" + id).addClass("show");

    ACTIVE_PACKAGE = $('#' + id);
    if(id === 'pkg-basic')
    {
        $('#basic-license').removeClass('hidden');
        $('#basic-license').addClass('show');
    }
    setPrice(ACTIVE_PACKAGE);
}

/** Sets the pay value and expiration date in Basic Package */
function setBasicPayValue()
{
    var text = $('#basic-license option:selected').val()
    if(text === '1 Week')
    {
        var firstDay        = new Date();
        var nextWeek        = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
        var expiration      = nextWeek.getDate() + '/' + nextWeek.getMonth() + '/' + nextWeek.getFullYear();

        $('#expiration-date').html(expiration);
        $("#value-pay").html('0,00 €');
    }
    else if(text === '2 Weeks')
    {
        var firstDay        = new Date();
        var nextWeek        = new Date(firstDay.getTime() + 14 * 24 * 60 * 60 * 1000);
        var expiration      = nextWeek.getDate() + '/' + nextWeek.getMonth() + '/' + nextWeek.getFullYear();

        $('#expiration-date').html(expiration);
        $("#value-pay").html('5,00 €');
    }
    else
    {
        var today           = new Date();
        var nextMonth       = new Date(new Date(today).setMonth(today.getMonth()+1));
        var expiration      = nextMonth.getDate() + '/' + nextMonth.getMonth() + '/' + nextMonth.getFullYear();

        $('#expiration-date').html(expiration);
        $("#value-pay").html('9,00 €');
    }
}


$('#method-bank').click(function(e)
{
    $('#method-bank').css('border', 'solid 2px #449d44');
    $('#method-paypal').css('border', 'solid 1px #ddd');
    $('#payment-bank').removeClass('hidden');
    $('#payment-bank').addClass('show');
    $('#payment-paypal').removeClass('show');
    $('#payment-paypal').addClass('hidden');
});

$('#method-paypal').click(function(e)
{
    $('#method-paypal').css('border', 'solid 2px #449d44');
    $('#method-bank').css('border', 'solid 1px #ddd');
    $('#payment-paypal').removeClass('hidden');
    $('#payment-paypal').addClass('show');
    $('#payment-bank').removeClass('show');
    $('#payment-bank').addClass('hidden');
});


$('#pkg-personal').click(changeColor);
$('#pkg-basic').click(changeColor);
$('#pkg-company').click(changeColor);
//$('#pkg-agency').click(changeColor);

$( '#basic-license').change(function (e)
{
    setBasicPayValue();
});
