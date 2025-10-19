import data from "./placement.json";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import * as bootstrap from "bootstrap";
import jQuery from "jquery"; // optional if using jQuery($)

jQuery(function () {
  const template = `
    <li class="splide__slide">
      <div class="card mx-2" data-popup-image="{popup.image}">
        <div class="card-body">
          <div class="d-flex justify-content-center align-items-center flex-column">
            <div class="d-flex justify-content-center align-items-center">
              <img src="{student.image}" class="rounded-circle student-image" alt="Avatar" />
            </div>
            <p class="student-name">{student.name}</p>
            <div class="d-flex justify-content-center align-items-center bg-white">
              <img src="{company.logo}" class="company-logo" alt="" />
            </div>
          </div>
        </div>
      </div>
    </li>
  `;

  const list = document.querySelector(".placement-splide .splide__list");
  if (!list) return;

  list.innerHTML = data
    .map((item) =>
      template
        .replace(/{student.image}/g, item.student.image)
        .replace(/{student.name}/g, item.student.name)
        .replace(/{company.logo}/g, item.company.image)
        .replace(/{popup.image}/g, item.popup.image)
    )
    .join("");

    setTimeout(()=>{
        initSplide();
    });
});

function initSplide(){
 const splide = new Splide(".placement-splide", {
  type: "loop",
  drag: "free",
  focus: "center",
  perPage: 6,
  gap: '1rem', // ✅ Add gap between slides
  arrows: false,
  pagination: false,
  autoScroll: {
    speed: 1,
  },
  breakpoints: {
    1400: { perPage: 5 },
    1200: { perPage: 4 },
    992: { perPage: 3 },
    768: { perPage: 2 },
    576: { perPage: 1 },
  },
  padding: { left: '2rem', right: '2rem' }, // ✅ Add padding
});
  splide.mount({AutoScroll})
  setTimeout(()=>{
      watchCardClick();
    })
}
function watchCardClick() {
  const list$ = document.querySelector(".splide__list");
  const splide__slide__card$ = list$.querySelectorAll(".card");
  const placementSplideModal = document.querySelector("#placementSplideModal");
  new bootstrap.Modal(placementSplideModal);
  const modalBody = placementSplideModal.querySelector(".modal-body");
  splide__slide__card$.forEach((card) => {
    card.addEventListener("click", function () {
      const popupImage = card.getAttribute("data-popup-image");
      const img = `<img src="${popupImage}" class="w-100">`;
      modalBody.innerHTML = img;
      const modalInstance = bootstrap.Modal.getOrCreateInstance(
        "#placementSplideModal"
      );
      modalInstance.show();
    });
  });
}
