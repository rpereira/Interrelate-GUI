/*global $ */

var ACTIVE_PACKAGE = '';

$('#btn-login').click(function(e)
{
    console.log("yay")
});

/**
 * If terms were accepted, confirm button is disabled.
 */
$('#confirm-checkboxes input[type=checkbox]').click(function()
{
    var age   = $("#cb-confirm-age").prop("checked");
    var terms = $("#cb-confirm-terms").prop("checked");

    if(age && terms)
    {
        $("#btn-agree-terms").removeAttr("disabled", "disabled");
    }
    else
    {
        $("#btn-agree-terms").attr("disabled", "disabled");
    }
});

/**
 * Terms were agreed.
 */
$("#btn-agree-terms").click(function(e)
{
    $("#payment-modal").modal('hide');
    $("#confirm-payment-modal").modal('show');
});


function getProduct()
{
    var _URL  = document.URL;
    var query = _URL.split("?");
    if(query[1] != undefined)
    {
        var param = query[1].split("=");
        return param[1];
    }
    else
    {
        return null;
    }
}

$(document).ready(function()
{
    var product = getProduct();

    var link = "social.html"; //+ product + "-section";

    $("#back-home").click().attr("href", link);

    /** Sets the product selected */
    if(product != null)
    {
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
    }
});

$("#btn-login").click(function(e)
{
    $("#payment-content").addClass('show');
    $("#navbar-user").addClass('show');

    $("#payment-content").removeClass('hide');
    $("#navbar-user").removeClass('hide');

    $("#btn-login").addClass('hide');
});

/** Changes colors of the package selected to give feedback */
function changeColor(e)
{

    var id= $(this).attr('id');
    var ap_id = $(ACTIVE_PACKAGE).attr('id');
    if(id != ap_id)
    {
        $("#" + id).removeClass("inactive-package");
        $("#" + id).addClass("active-package");

        $("#a-" + id).removeClass("h4-inactive-package");
        $("#a-" + id).addClass("h4-active-package");

        $(ACTIVE_PACKAGE).removeClass("active-package");
        $(ACTIVE_PACKAGE).addClass("inactive-package");




        $("#a-" + ap_id).removeClass("h4-active-package");
        $("#a-" + ap_id).addClass("h4-inactive-package");
        if(ap_id === 'pkg-basic')
        {
            $('#basic-license').removeClass('show');
            $('#basic-license').addClass('hidden');
        }

        $('#buy-' + id).removeClass('hidden');
        $('#buy-' + id).addClass('show');
        $('#buy-' + ap_id).removeClass('show');
        $('#buy-' + ap_id).addClass('hidden');

        ACTIVE_PACKAGE = this;

        if(id === 'pkg-basic')
        {
            $('#basic-license').removeClass('hidden');
            $('#basic-license').addClass('show');
        }

        setPrice(this);
    }

}

/** Sets the "value to pay" */

function setPrice(element)
{
    var id = $(element).attr('id');
    var language = localStorage.getItem('lang');
    if(id === 'pkg-company')
    {
        var today           = new Date();
        var nextMonth       = new Date(new Date(today).setMonth(today.getMonth()+1));
        var expiration      = nextMonth.getDate() + '/' + nextMonth.getMonth() + '/' + nextMonth.getFullYear();

        $('#expiration-date').html(expiration);
        $("#price-package").html('75,00 €');
        $("#payment-amount-value").html('75,00 €');
        if(language === 'english'){
            $("#buy-basic-license").html("1 Month");
            $("#package-license").html("1 Month");
        }
        else
        {
            $("#buy-basic-license").html("1 M&ecirc;s");
            $("#package-license").html("1 M&ecirc;s");
        }

    }
    else
    {
        $("#price-package").html('0,00 €');
        setBasicPayValue();
    }

}

/** Sets the initial product **/
function setProduct(id)
{

    $("#" + id).addClass("active-package");
    $("#a-" + id).addClass("h4-active-package");
    //Activate package description in modal
    $("#buy-" + id).removeClass('hidden');
    $("#buy-" + id).addClass("show");

    ACTIVE_PACKAGE = $('#' + id);
    if(id === 'pkg-basic')
    {
        $('#basic-license').removeClass('hidden');
        $('#basic-license').addClass('show');
        setBasicPayValue();
    }
    setPrice(ACTIVE_PACKAGE);
}

/** Sets the pay value and expiration date in Basic Package */
function setBasicPayValue()
{
    var text_select = $('#basic-license option:selected').val();
    var language = localStorage.getItem('lang');

    var text_split = text_select.split('\n');
    var text = text_split[0];

    if(text === '1 Week' || text === "1 Semana")
    {
        var firstDay        = new Date();
        var nextWeek        = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
        var expiration      = nextWeek.getDate() + '/' + nextWeek.getMonth() + '/' + nextWeek.getFullYear();

        $('#expiration-date').html(expiration);
        $("#price-package").html('0,00 €');
        if(language === 'english'){
            $("#package-license").html("1 Week");
            $("#buy-basic-license").html("1 Week");
        }
        else{
            $("#package-license").html("1 Semana");
            $("#buy-basic-license").html("1 Semana");
        }
    }
    else if(text === '2 Weeks' || text === "2 Semanas")
    {
        var firstDay        = new Date();
        var nextWeek        = new Date(firstDay.getTime() + 14 * 24 * 60 * 60 * 1000);
        var expiration      = nextWeek.getDate() + '/' + nextWeek.getMonth() + '/' + nextWeek.getFullYear();

        $('#expiration-date').html(expiration);
        $("#price-package").html('5,00 €');

        if(language === 'english'){
            $("#package-license").html("2 Weeks");
            $("#buy-basic-license").html("2 Weeks");
        }
        else{
            $("#package-license").html("2 Semanas");
            $("#buy-basic-license").html("2 Semanas");
        }
    }
    else
    {
        var today           = new Date();
        var nextMonth       = new Date(new Date(today).setMonth(today.getMonth()+1));
        var expiration      = nextMonth.getDate() + '/' + nextMonth.getMonth() + '/' + nextMonth.getFullYear();

        $('#expiration-date').html(expiration);
        $("#price-package").html('9,00 €');
        if(language === 'english'){
            $("#package-license").html("1 Month");
            $("#buy-basic-license").html("1 Month");
        }
        else{
            $("#package-license").html("1 M&ecirc;s");
            $("#buy-basic-license").html("1 M&ecirc;s");
        }
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


$('#btn-submit-buy').click(function (e)
{
    var price       = $("#price-package").html();
    var license     =  $("#package-license").html();
    var expiration  = $("#expiration-date").html();

    $("#expiration-date-buy").html(expiration);
    $("#details-buy-price").html(price);
    $("#modal-amount").html(price);
});

