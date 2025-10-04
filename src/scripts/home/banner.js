import $ from "jquery";
window.$ = window.jQuery = $;

(async () => {
  await import("owl.carousel");

  const owl = jQuery("section.home--banner .owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
  });

  // On translate (slide change)
  owl.on("translate.owl.carousel", function (event) {
    $(".caption").removeClass("animate__fadeInUp");
  });

  // On translated (after slide changed)
  owl.on("translated.owl.carousel", function (event) {
    $(event.target)
      .find(".owl-item.active .caption")
      .addClass("animate__fadeInUp");
  });

  // Trigger animation for first slide
  $(".owl-item.active .caption").addClass("animate__fadeInUp");
})();
