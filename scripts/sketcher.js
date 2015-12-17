var dimPad = 600;
var idPrefix = 'sq';
var $pad = $('#pad');

$(document).ready(function(){
    var colorScheme = 'default';
    var color = "rgb(255,128,179)";
    createSquares(16);
    $(document).on('mouseenter', '.squares', function(){
        color = getColor(colorScheme, $(this).attr('id'));
        $(this).css('background-color', color);
        $(this).css('border-left-color', color);
        $(this).css('border-top-color', color);
        console.log('this in ready = ' + $(this));
    });
    $('input[type=radio][name=color]').change(function(){
        colorScheme = this.value;
        console.log('colorScheme = ' + colorScheme);
    });
});

function createSquares(num){
    dimSquare = Math.floor(dimPad / num) - 1;
    // Resize the pad in case dimPad is not divisible, then take the borders into account.
    var newDimPad = (dimSquare * num) + num;
    $pad.width(newDimPad + 'px');
    $pad.height(newDimPad + 'px');
    $(inputs).width(newDimPad + 'px');
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
    $('.squares').each(function(i){
        $(this).attr('id', idPrefix + i);
    });
    for (var i = 0; i < (num * num); i++)
    {
        var id = '#' + idPrefix + i;
        $(id).data('rgb', '255');
    }
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

function getColor(colorScheme, id){
    var rgb = "rgb(255,128,179)";
    id = '#' + id;
    
    switch (colorScheme)
    {
        case 'default':
        {
            $(id).data('rgb', '255');
            rgb = "rgb(255,128,179)";
            break;
        }
        case 'random':
        {
            $(id).data('rgb', '255');
            rgb = "rgb(" + getRandom255() + "," + getRandom255() + "," + getRandom255() + ")";
            break;
        }
        case 'shadesOfBlack':
        {
            var savedRgb = parseInt($(id).data('rgb'));
            console.log('data rgb = ' + savedRgb);
            savedRgb -= 25;
            if (savedRgb < 0)
            {
                savedRgb = 0;
            }
            $(id).data('rgb', savedRgb);
            rgb = "rgb(" + savedRgb + "," + savedRgb + "," + savedRgb + ")";
            break;
        }
        default:
        {
            rgb = "rgb(255,128,179)";
            break;
        }
    }
    console.log("rgb = " + rgb);
    return rgb;
}

function getRandom255(){
    return Math.floor(Math.random() * 255);
}