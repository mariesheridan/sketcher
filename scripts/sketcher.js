var dimPad = 600;

var $pad = $('#pad');

$(document).ready(function(){
    createSquares(16);
});

function createSquares(num){
    dimSquare = Math.floor(dimPad / num);
    // Resize the pad in case dimPad is not divisible, then take the borders into account.
    dimPad = (dimSquare * num) + num;
    $pad.width(dimPad + 'px');
    $pad.height(dimPad + 'px');
    for (var row = 0; row < num; row++)
    {
        $pad.append('<div class="row"></div>');
    }
    for (var col = 0; col < num; col++)
    {
        $('.row').append('<div class="squares"></div>');
    }
    $('.squares').width(dimSquare + 'px');
    $('.squares').height(dimSquare + 'px');
}