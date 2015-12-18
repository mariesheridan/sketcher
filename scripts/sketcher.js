var dimPad = 600;
var idPrefix = 'sq';
var $pad = $('#pad');
var baseColor = 'rgb(255,255,255)';
var baseBorder = 'rgb(229, 229, 255)';

$(document).ready(function(){
    var colorScheme = 'default';
    createSquares(16);
    var mouseDown = false;
   $pad.css('background-color', baseColor);
   $('body').css('background-color', baseBorder);
   $('#inputs').css('background-color', baseBorder);
   $(document).on('mousedown', '.squares', function(){
       mouseDown = true;
       paint('#' + $(this).attr('id'), colorScheme);
   });
   $(document).mousedown(function(){
       mouseDown = true;
   });
   $(document).mouseup(function(){
       mouseDown = false;
   });
    $(document).on('mouseover', '.squares', function(){
        if (mouseDown)
        {
            paint('#' + $(this).attr('id'), colorScheme);
        }
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
    $('.squares').css('border-left-color', baseBorder)
                 .css('border-top-color', baseBorder);
    $('.squares').each(function(i){
        $(this).attr('id', idPrefix + i);
    });
    for (var i = 0; i < (num * num); i++)
    {
        var id = '#' + idPrefix + i;
        $(id).data('rgb', '255');
    }
}

function paint(id, colorScheme) {
        var color = getColorForId(colorScheme, id);
        $(id).css('background-color', color[0]);
        $(id).css('border-left-color', color[1]);
        $(id).css('border-top-color', color[1]);
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

function getColorForId(colorScheme, id){
    var rgb = ["rgb(255,128,179)", "rgb(255,128,179)"];
    
    switch (colorScheme)
    {
        case 'default':
        {
            $(id).data('rgb', '255');
            rgb = ["rgb(255,128,179)", "rgb(255,128,179)"];
            break;
        }
        case 'random':
        {
            $(id).data('rgb', '255');
            var rgbRandom = "rgb(" + getRandom255() + "," + getRandom255() + "," + getRandom255() + ")";
            rgb = [rgbRandom, rgbRandom]
            break;
        }
        case 'shadesOfBlack':
        {
            var savedRgb = parseInt($(id).data('rgb'));
            savedRgb -= 25;
            if (savedRgb < 0)
            {
                savedRgb = 0;
            }
            $(id).data('rgb', savedRgb);
            var rgbShades = "rgb(" + savedRgb + "," + savedRgb + "," + savedRgb + ")";
            rgb = [rgbShades, rgbShades]
            break;
        }
        case 'eraser':
        {
            $(id).data('rgb', '255');
            rgb = [baseColor, baseBorder];
            break;
        }
        default:
        {
            rgb = ["rgb(255,128,179)", "rgb(255,128,179)"];
            break;
        }
    }
    console.log("rgb = " + rgb[0]);
    return rgb;
}

function getRandom255(){
    return Math.floor(Math.random() * 255);
}