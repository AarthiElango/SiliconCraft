import "./home/index";
import "./internship/index";
import "./courses/index";
import "./common/index";
import "./highlights/index";

// import "./placement/index";
import * as bootstrap from "bootstrap";


jQuery(function(){
const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))

});


jQuery(function(){

    const a= jQuery("nav.primary a");

    const href = window.location.href;

    a.each(function(){
        const ahref = jQuery(this).attr('href');
        if(href.indexOf(ahref) != -1){
            jQuery(this).addClass('active');
        }
    })

})

jQuery(function(){

    jQuery("[data-onclick-navigate]").on('click', function(){
        window.location.href = window.location.origin+jQuery(this).attr('data-onclick-navigate');
    })
})