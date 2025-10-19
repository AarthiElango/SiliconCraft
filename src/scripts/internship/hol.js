import handsOnData from "./hol.json";
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
            <img src="{image}" class="hands-on-image" alt="Hands on Learning" />
          </div>
        </div>
      </div>
    </li>
  `;

  const list = document.querySelector(".hands-on-splide .splide__list");
  if (!list) return;

  list.innerHTML = handsOnData
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
  const splide = new Splide(".hands-on-splide", {
    type: "loop",
    drag: "free",
    focus: "center",
    perPage:4,
    gap: '1rem',
    arrows: false,
    pagination: false,
    autoScroll: {
      speed: 1,
    },
    breakpoints: {
      1400: { perPage: 4 },
      1200: { perPage: 3 },
      992: { perPage: 3 },
      768: { perPage: 2 },
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
  const list$ = document.querySelector(".hands-on-splide .splide__list");
  const splide__slide__card$ = list$.querySelectorAll(".card");
  const handsOnModal = document.querySelector("#handsOnModal");
  new bootstrap.Modal(handsOnModal);
  const modalBody = handsOnModal.querySelector(".modal-body");
  
  splide__slide__card$.forEach((card) => {
    card.addEventListener("click", function () {
      const popupImage = card.getAttribute("data-popup-image");
      const img = `<img src="${popupImage}" class="w-100">`;
      modalBody.innerHTML = img;
      const modalInstance = bootstrap.Modal.getOrCreateInstance("#handsOnModal");
      modalInstance.show();
    });
  });
}