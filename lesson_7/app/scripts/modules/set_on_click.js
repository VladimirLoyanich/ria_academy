/**
 * Created by student on 27.03.16.
 */

define("modules/set_on_click",
    ["modules/create_ul"],
    function () {
        console.log("set_on_click");
    return function ($) {
        $('body').on('click', 'li', function () {
            var element = this.querySelector('span');
            element.innerText = Number(element.innerText) + 1;
            var atribute = this.querySelector('img').getAttribute("alt");
            console.log(atribute);
            localStorage.setItem(atribute, element.innerText);
            console.log(localStorage.getItem(atribute))
        });
        $('body').on('click', 'button', function () {
            localStorage.clear();
            location.reload();
        });
    }
});