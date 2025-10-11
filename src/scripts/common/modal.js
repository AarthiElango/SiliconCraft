import $ from "jquery";
window.$ = window.jQuery = $;

jQuery(function () {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const modal = params.get("modal");
  if (modal) {
    const modalBtn$ = jQuery(
      `[data-bs-toggle="modal"][data-bs-target=".${modal}"]`
    );
    if (modalBtn$) {
      modalBtn$.trigger("click");
    }
  }
});
