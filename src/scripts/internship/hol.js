import $ from "jquery";
window.$ = window.jQuery = $;
import SimpleLightbox from "simplelightbox";

(async () => {
  await import("owl.carousel");
  await import ("simplelightbox");

  const owl = jQuery(".internship--hol .owl-carousel").owlCarousel({
  loop:true,
    margin:10,
    nav:true,
    autoplay:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
  });
  const options = {
      showCounter: true,
    captions: false
  }
  let gallery = new SimpleLightbox('.internship--hol .owl-carousel .owl-item:not(.cloned) a', options);

  console.log(gallery)
 
})();
