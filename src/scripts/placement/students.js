import data from "./students.json";
import * as bootstrap from "bootstrap";
import jQuery from "jquery";

jQuery(function () {
  const template = `
    <div class="col-6 col-sm-4 col-md-3 col-lg-2">
      <div class="card border-0 shadow-sm h-100 placement-card">
        <div class="card-body p-3 text-center">
          <div class="position-relative d-inline-block mb-2">
            <img src="{studentImg}" 
                 class="rounded-circle" 
                 alt="{name}"
                 style="width: 120px; height: 120px; object-fit: cover;">
            <div class="position-absolute bottom-0 end-0 bg-white rounded-pill shadow-sm px-2 py-1" style="font-size: 0.7rem;">
              <img src="{companyLogo}" 
                   alt="{companyName}" 
                   style="height: 16px; width: auto;">
            </div>
          </div>
          <h6 class="card-title mb-1 fw-normal" style="font-size: 0.85rem;">{name}</h6>
          {linkedin}
        </div>
      </div>
    </div>
  `;

  const container = document.querySelector("#studentsRow");
  if (!container) return;

  container.innerHTML = data
    .map(item =>
      template
        .replace(/{studentImg}/g, item.studentImg)
        .replace(/{name}/g, item.name)
        .replace(/{companyLogo}/g, item.companyLogo)
        .replace(/{companyName}/g, item.companyName)
        .replace(
          /{linkedin}/g,
          item.linkedin
            ? `<a href="${item.linkedin}" target="_blank" aria-label="LinkedIn Profile" class="linkedin-icon">
                 <i class="bi bi-linkedin"></i>
               </a>`
            : ""
        )
    )
    .join("");
});
