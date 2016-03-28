/**
 * Created by student on 27.03.16.
 */

define("set_on_click",[
        "data",
        "create_ul"],
    function () {
        console.log("set_on_click");
    return function ($) {
        $('body').on('click', 'li', function () {
            var element = this.querySelector('span');
            element.innerText = Number(element.innerText) + 1;
        });
    }
});