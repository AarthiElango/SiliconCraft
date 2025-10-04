import $ from "jquery";
window.$ = window.jQuery = $;

jQuery(function(){
    const texts = ['Digital Design', 'Innovation', 'Embedded Systems', 'VLSI'];
    let index = 0;
    jQuery(".internship--hero .animated-text").text(texts[index]);
    setInterval(function(){
        index++;
        if(index >= texts.length){
            index = 0;
        }
    jQuery(".internship--hero .animated-text").text(texts[index]);

    },3000)

})