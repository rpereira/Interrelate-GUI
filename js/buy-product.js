function getProduct(){
    var _URL = document.URL;
    var query = _URL.split("?");
    var param = query[1].split("=");

    var product = param[1];
}
