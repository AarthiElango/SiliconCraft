import $ from "jquery";
window.$ = window.jQuery = $;
import * as bootstrap from "bootstrap";

(async () => {
  await import("owl.carousel");

  const owl = jQuery(".internship--stusuc .owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
  jQuery(".internship--stusuc .owl-carousel .owl-item:not(.cloned) .item").on(
    "click",
    function () {
      const src = jQuery(this).attr("data-src");
      if (!src) {
        return;
      }
      const modal = document.querySelector(".youtube-view");
      jQuery(modal).find("iframe").attr("src", src);
      const instance = bootstrap.Modal.getOrCreateInstance(modal);
      instance.show();
    }
  );
})();
