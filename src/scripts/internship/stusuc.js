import data from "./stusuc.json";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import * as bootstrap from "bootstrap";
import jQuery from "jquery";

jQuery(function () {
  const template = `
    <li class="splide__slide">
      <div class="card mx-2" data-src="{src}">
        <img src="{image}" class="card-img w-100" alt="Video Thumbnail" />
      </div>
    </li>
  `;

  const list = document.querySelector(".internship--student-video .splide__list");
  if (!list) return;

  // Populate slides dynamically from JSON
  list.innerHTML = data
    .map(item => template.replace(/{image}/g, item.image).replace(/{src}/g, item.src))
    .join("");

  setTimeout(() => initSplide());
});

function initSplide() {
  const splide = new Splide(".internship--student-video", {
    type: "loop",
    drag: "free",
    focus: "center",
    perPage: 3,
    arrows: false,
    pagination: false,
    autoScroll: { speed: 1 },
    breakpoints: {
      1024: { perPage: 2 },
      640: { perPage: 1 },
    },
  });

  splide.mount({ AutoScroll });

  setTimeout(() => watchCardClick());
}

function watchCardClick() {
  const cards = jQuery(".internship--student-video .splide__list .card");
  const modal$ = jQuery(".youtube-view");
  const instance = new bootstrap.Modal(modal$[0]);

  cards.each(function () {
    const self = jQuery(this);
    self.on("click", function () {
      const src = self.attr("data-src");
      modal$.find("iframe").attr("src", src);
      instance.show();
    });
  });

  // Clear iframe on modal close to stop video playback
  modal$.on("hidden.bs.modal", function () {
    modal$.find("iframe").attr("src", "");
  });
}
