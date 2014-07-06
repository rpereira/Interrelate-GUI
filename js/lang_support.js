$('#pt-lang').click(function()
{
    var page     = getUrlPage();
    var xml_file = 'languages/' + page + '-languages.xml';

    localStorage.setItem('lang', 'portuguese')
    var language = 'portuguese';
    $.ajax(
    {
        url: xml_file,
        success: function(xml)
        {
            $(xml).
                find('translation').
                each(function()
                {
                    var id      = $(this).attr('id');
                    var split   = id.split("-");

                    if(split[1] === 'form')
                    {
                        setPlaceholders(this, language, id);
                    }
                    else
                    {
                        var text = $(this).find(language).text();
                        $('#' + id).html(text);
                    }
                });
        },
        error: function(err)
        {
          console.log(err)
        }
    });
});

$('#en-lang').click(function()
{
    var page     = getUrlPage();
    var xml_file = 'languages/' + page + '-languages.xml';

    localStorage.setItem('lang', 'english')
    var language = 'english';
    $.ajax(
    {
        url: xml_file,
        success: function(xml)
        {
            $(xml).
                find('translation').
                each(function()
                {
                    var id      = $(this).attr('id');
                    var split   = id.split("-");

                    if(split[1] === 'form')
                    {
                        setPlaceholders(this,language,id);
                    }
                    else
                    {
                        var text = $(this).find(language).text();
                        $('#' + id).html(text);
                    }
                });
        },
        error: function(err)
        {
          console.log(err)
        }
    });
});

$(function()
{
    var page     = getUrlPage();
    var xml_file = 'languages/' + page + '-languages.xml';

    var language = localStorage.getItem('lang');

    if(language === null)
    {
        language = 'english';
        localStorage.setItem('lang', 'english');
    }

    $.ajax(
    {
        url: xml_file,
        success: function(xml)
        {
            $(xml).
                find('translation').
                each(function()
                {
                    var id    = $(this).attr('id');
                    var split = id.split("-");

                    if(split[1] === 'form')
                    {
                        setPlaceholders(this, language, id);
                    }
                    else
                    {
                        var text = $(this).find(language).text();
                        $('#' + id).html(text);
                    }
                });
        },
        error: function(err)
        {
          console.log(err)
        }
    });
});

function getUrlPage()
{
    var _URL        = document.URL;
    var parsed_url  = _URL.split('/');

    if(parsed_url[parsed_url.length-1] === 'index.html')
    {
        return 'index';
    }
    else if(parsed_url[parsed_url.length-1] === 'social.html')
    {
        return 'social';
    }
    else
    {
        return 'index';
    }

}

function setPlaceholders(xml, language, id)
{
    var text = $(xml).find(language).text();
    $('#' + id).attr("placeholder", text);
}

///**
// * Initializes the webpage language preference and stores it on
// * local storage. Only supports pt-PT and english (no distinction).
// */
//function init()
//{
//    var page        = getUrlPage();
//    var xml_file    = 'languages/' + page + '-languages.xml';
//    var user_lang   = navigator.language || navigator.userLanguage;
//
//    // Since only pt-PT and english are supported, if pt-PT is not
//    // the browser's language, the website will be displayed in english
//    if(user_lang !== "pt-PT")
//    {
//        user_lang = "english";
//        console.log(user_lang)
//    }
//
//    // sets language preference on localStorage.
//    // if no preference was previously set, "lang" will be null.
//    if(user_lang !== localStorage.getItem("lang"))
//    {
//        alert("...")
//        localStorage.setItem("lang", user_lang);
//        alert(localStorage.getItem("lang"))
//    }
//
//    alert(user_lang)
//    alert(localStorage.getItem("lang"))
//
//    $.ajax(
//    {
//        url: xml_file,
//        success: function(xml)
//        {
//            $(xml).
//                find('translation').
//                each(function()
//                {
//                    var id      = $(this).attr('id');
//                    var split   = id.split("-");
//
//                    if(split[1] === 'form')
//                    {
//                        setPlaceholders(this, user_lang, id);
//                    }
//                    else
//                    {
//                        var text = $(this).find(user_lang).text();
//                        $('#' + id).html(text);
//                    }
//                });
//        },
//        error: function(err)
//        {
//          console.log(err)
//        }
//    });
//}
