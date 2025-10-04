import $ from "jquery";
window.$ = window.jQuery = $;



jQuery(function(){
 
  setHeroInnerHeight();

});

jQuery(window).on('resize',function() {
  setHeroInnerHeight();
});

  function setHeroInnerHeight(){
 const homeHero$ = jQuery(".home--hero");
  const video$ = homeHero$.find("video");

 video$.on('loadedmetadata', function() {
  let height= video$.height();
    if(height < 400){
      height = 400;
    }
    homeHero$.find(".content .inner").css('height', height+'px');
    homeHero$.find(".wrapper").css('height', height+'px');
});
  }