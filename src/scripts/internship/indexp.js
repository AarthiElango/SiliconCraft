import industryExposureData from "./indexp.json";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import * as bootstrap from "bootstrap";
import jQuery from "jquery";

jQuery(function () {
  const template = `
    <li class="splide__slide">
      <div class="card mx-2" data-popup-image="{popup.image}">
        <div class="card-body">
          <div class="d-flex justify-content-center align-items-center">
            <img src="{image}" class="industry-exposure-image" alt="Industry Exposure" />
          </div>
        </div>
      </div>
    </li>
  `;

  const list = document.querySelector(".industry-exposure-splide .splide__list");
  if (!list) return;

  list.innerHTML = industryExposureData
    .map((item) =>
      template
        .replace(/{image}/g, item.image)
        .replace(/{popup.image}/g, item.popup.image)
    )
    .join("");

  setTimeout(() => {
    initSplide();
  });
});

function initSplide() {
  const splide = new Splide(".industry-exposure-splide", {
    type: "loop",
    drag: "free",
    focus: "center",
    perPage: 5,
    gap: '1rem',
    arrows: true,
    pagination: false,
    autoScroll: {
      speed: 1,
    },
    breakpoints: {
      1400: { perPage: 5 },
      1200: { perPage: 4 },
      992: { perPage: 3 },
      768: { perPage: 3 },
      576: { perPage: 1 },
    },
    padding: { left: '2rem', right: '2rem' },
  });
  
  splide.mount({ AutoScroll });
  
  setTimeout(() => {
    watchCardClick();
  });
}

function watchCardClick() {
  const list$ = document.querySelector(".industry-exposure-splide .splide__list");
  const splide__slide__card$ = list$.querySelectorAll(".card");
  const industryExposureModal = document.querySelector("#industryExposureModal");
  new bootstrap.Modal(industryExposureModal);
  const modalBody = industryExposureModal.querySelector(".modal-body");
  
  splide__slide__card$.forEach((card) => {
    card.addEventListener("click", function () {
      const popupImage = card.getAttribute("data-popup-image");
      const img = `<img src="${popupImage}" class="w-100">`;
      modalBody.innerHTML = img;
      const modalInstance = bootstrap.Modal.getOrCreateInstance("#industryExposureModal");
      modalInstance.show();
    });
  });
}