var dimPad = 600;

var $pad = $('#pad');

$(document).ready(function(){
    createSquares(16);
    $(document).on('mouseenter', '.squares', function(){
        $(this).addClass('painted');
    });
});

function createSquares(num){
    dimSquare = Math.floor(dimPad / num) - 1;
    // Resize the pad in case dimPad is not divisible, then take the borders into account.
    var newDimPad = (dimSquare * num) + num;
    $pad.width(newDimPad + 'px');
    $pad.height(newDimPad + 'px');
    console.log("newDimPad = " + newDimPad);
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

function promptUser(){
    var input = prompt('How many rows should your sketch pad have? There should be at least 1 row.', '16');
    if (input != null)
    {
        var numOfSquares = parseInt(input);
        if (isNaN(numOfSquares))
        {
            alert('Please enter a number greater than or equal to 1!');
            promptUser();
        }
        else if (Math.floor(dimPad / numOfSquares) < 2)
        {
            alert('That\'s too much. Please limit your rows up to ' + (dimPad/2));
            promptUser();
        }
        else
        {
            $pad.empty();
            createSquares(numOfSquares);
        }
    }
}