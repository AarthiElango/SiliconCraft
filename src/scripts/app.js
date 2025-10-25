import "./home/index";
import "./internship/index";
import "./courses/index";
import "./common/index";
import "./highlights/index";


// import "./placement/index";
import * as bootstrap from "bootstrap";


jQuery(function(){
const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))

});


jQuery(function(){

    const a= jQuery("nav.primary a");

    const href = window.location.href;

    a.each(function(){
        const ahref = jQuery(this).attr('href');
        if(href.indexOf(ahref) != -1){
            jQuery(this).addClass('active');
        }
    })

})

jQuery(function(){

    jQuery("[data-onclick-navigate]").on('click', function(){
        window.location.href = window.location.origin+jQuery(this).attr('data-onclick-navigate');
    })
})

//nav
document.addEventListener('DOMContentLoaded', function() {
  // Handle modal triggers from dropdown items
  document.querySelectorAll('.dropdown-item[data-bs-toggle="modal"]').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close all open dropdowns
      const dropdowns = document.querySelectorAll('.dropdown-menu.show');
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('show');
      });
      
      // Get the modal target
      const modalTarget = this.getAttribute('data-bs-target');
      
      // Open the modal
      const modal = document.querySelector(modalTarget);
      if (modal) {
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
      }
    });
  });
  
  // Close navbar on mobile after clicking a link
  const navLinks = document.querySelectorAll('.navbar-nav .dropdown-item');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 992) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
});