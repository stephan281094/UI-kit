window.onload = ->
    $all        = document.querySelectorAll("*")
    $debug      = document.querySelector(".debug")
    $button     = document.querySelector("#debug-toggle .button")
    $checkbox   = document.querySelector("#debug-toggle input[type=checkbox]")
    show        = false

    toggleLines = ->
        if show is false
            drawLines()
        else
            clearLines()

    drawLines = ->
        $debug.style.display = "block"
        $button.innerHTML = "CSS debugging ON"

        [].forEach.call $all, (a) ->
            if $checkbox.checked is false
                a.style.outline = "1px solid #888"
            else
                a.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16)

        show = true

    clearLines = ->
        $debug.style.display = "none"
        $button.innerHTML = "CSS debugging OFF"

        [].forEach.call $all, (a) ->
            a.style.outline = "none"

        show = false

    $button.addEventListener "click", (->
        toggleLines()
        ), false
    $checkbox.addEventListener "click", (->
        drawLines()  if show is true # Redraw lines
        ), false
