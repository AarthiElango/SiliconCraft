import data from "./stusuc.json";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import * as bootstrap from "bootstrap";
import jQuery from "jquery"; // optional if using jQuery($)

jQuery(function () {
  const template = `
    <li class="splide__slide">
      <div class="card mx-2" data-src="{src}">
        <img src="{image}" class="card-img w-100" alt="Avatar" />
        </div>
      </div>
    </li>
  `;

  const list = document.querySelector(
    ".internship--student-video .splide__list"
  );
  if (!list) return;

  list.innerHTML = data
    .map((item) =>
      template.replace(/{image}/g, item.image).replace(/{src}/g, item.src)
    )
    .join("");
  setTimeout(() => {
    initSplide();
  });
});

function initSplide() {
  const splide = new Splide(".internship--student-video", {
    type: "loop",
    drag: "free",
    focus: "center",
    perPage: 5, // default for large screens
    arrows: false, // 🚫 removes arrows
    pagination: false, // 🚫 removes dots
    autoScroll: {
      speed: 1,
    },
    breakpoints: {
      1024: { perPage: 2 },
      640: { perPage: 1 },
    },
  });
  splide.mount({ AutoScroll });
  setTimeout(() => {
    watchCardClick();
  });
}

function watchCardClick() {
  const list$ = jQuery(".internship--student-video .splide__list");
  const splide__slide__card$ = list$.find(".card");
  const modal$ = jQuery(".youtube-view");
  console.log(modal$[0]);
  const instance = new bootstrap.Modal(modal$[0]);
  splide__slide__card$.each(function(){
    const self =  jQuery(this);
    jQuery(this).on("click", function () {
      const src = self.attr("data-src");
      modal$.find("iframe").attr("src", src);
      instance.show();
    });
  });
}
