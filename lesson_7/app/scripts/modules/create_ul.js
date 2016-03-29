define("modules/create_ul",[],
    function () {
        console.log("create_ul");
    return function (data) {
        function checkLocalStorage(title, count){
            if (localStorage.key(title)){
                return localStorage.getItem(title)
            }else{
                return count;
            }
        }

        for (var i = 0; i < data.length; ++i) {
            console.log(data[i].count);
        $('ul').append(
            $('<li>').attr('class', 'item').append(
                $('<img>').attr('src', "images/" + data[i].image).attr('alt', data[i].title)
            ).append(
                $('<span>').attr('class', 'counter').append(checkLocalStorage(data[i].title, data[i].count))))
        }

    }
});
