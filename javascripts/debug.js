window.onload = function(){
    var $all        = document.querySelectorAll("*");
    var $debug      = document.querySelector('.debug');
    var $button     = document.querySelector('#debug-toggle .button');
    var $checkbox   = document.querySelector('#debug-toggle input[type=checkbox]');
    var show        = false;

    $button.addEventListener('click', function(){
        toggleLines();
    }, false);
    $checkbox.addEventListener('click', function(){
        if(show === true){
            drawLines(); // Redraw lines
        }
    }, false);

    function toggleLines(){
        if(show === false){
            drawLines();
        }else{
            clearLines();
        }
    }

    function drawLines(){
        $debug.style.display = 'block';
        $button.innerHTML = "CSS debugging ON";

        [].forEach.call($all ,function(a){
            if($checkbox.checked === false){
                a.style.outline = "1px solid #888";
            }else{
                a.style.outline = "1px solid #" + (~~(Math.random()*(1<<24))).toString(16);
            }
        });

        show = true;
    }

    function clearLines(){
        $debug.style.display = 'none';
        $button.innerHTML = "CSS debugging OFF";

        [].forEach.call($all, function(a){
            a.style.outline = "none";
        });

        show = false;
    }
}
