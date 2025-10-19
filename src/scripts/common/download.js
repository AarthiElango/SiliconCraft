import * as bootstrap from "bootstrap";

jQuery(function () {
 const courseDatabase = {
  "asic-dv": {
    name: "Advanced ASIC Design & Verification",
    brochure: "src/brochure/asic-dv.pdf", // updated relative to index.html
  },
  pd: { 
    name: "Physical Design", 
    brochure: "src/brochure/pd.pdf" 
  },
  fpga: {
    name: "FPGA-Based System Design",
    brochure: "src/brochure/fpga.pdf"
  },
  embedded: {
    name: "Advanced Embedded Systems",
    brochure: "src/brochure/embedded.pdf"
  },
  analog: { 
    name: "Analog Circuit Design", 
    brochure: "src/brochure/analog.pdf" 
  },
  layout: { 
    name: "Analog Layout Design", 
    brochure: "src/brochure/layout.pdf" 
  },
};


  const contactModal$ = jQuery(".contact");
  const contactModalInstance = new bootstrap.Modal(contactModal$[0]);
  const form$ = jQuery("form.contact");
  const fullname$ = form$.find("#fullname");
  const email$ = form$.find("#email");
  const mobile$ = form$.find("#mobile");
  const googleScriptURL =
  "https://script.google.com/macros/s/AKfycbwL8VQhy_loO4KF8UrxUZokPeek3qCKtQf_j0efuz491Tp9jSHEDxFj-WJ7egnwVu4bgA/exec"; 
  // replace with Apps Script deployment URL


  fullname$.on("keyup", function () {
    validateFullname();
  });
  email$.on("keyup", function () {
    validateEmail();
  });
  mobile$.on("keyup", function () {
    validateMobile();
  });
  let selectedCourse = null;
  jQuery(".download-brochure").on("click", function () {
    selectedCourse = jQuery(this).attr("data-course");
    form$[0].reset();
    form$.find("fieldset").prop('disabled', false);

    setTimeout(() => {
      contactModalInstance.show();
    });
  });

  form$.on("submit", async function (event) {
    event.preventDefault();
    event.stopPropagation();
  const data = {
  fullname: fullname$.val(),
  email: form$.find("#email").val(),
  mobile: form$.find("#mobile").val(),
  job: form$.find(`[name="job"]:checked`).val(),
  course: courseDatabase[selectedCourse]?.name || selectedCourse, // ✅ added course name
};

    

    if (!validateFullname() || !validateEmail() || !validateMobile()) {
      return;
    }
    form$.find("fieldset").prop('disabled', true);
    try {
      await fetch(googleScriptURL, {
        method: "POST",
        mode: "no-cors", // or leave it out; "cors" is default
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(courseDatabase[selectedCourse].brochure)
       // Download brochure
      const link = document.createElement("a");
      link.href = courseDatabase[selectedCourse].brochure;
      link.download = `${courseDatabase[selectedCourse].name}-Brochure.pdf`; // Fixed: Added backticks
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    form$.find("fieldset").prop('disabled', false);

      contactModalInstance.hide();

    } catch (err) {
      alert("Error saving data. Please try again.");
      contactModalInstance.hide();
    form$.find("fieldset").prop('disabled', false);


    }
  });

  function validateFullname() {
    fullname$.closest("div").find(".invalid-feedback").hide();
    fullname$.removeClass("is-invalid");
    const fullname = fullname$.val().trim();
    if (!fullname || fullname.length < 3 || fullname.length > 40) {
      fullname$.addClass("is-invalid");
      fullname$.closest("div").find(".invalid-feedback").show();
      return false;
    }
    return true;
  }

  function validateEmail() {
    email$.closest("div").find(".invalid-feedback").hide();
    email$.removeClass("is-invalid");
    const email = email$.val().trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(email);
    if (!email || !valid) {
      email$.addClass("is-invalid");
      email$.closest("div").find(".invalid-feedback").show();
      return false;
    }
    return true;
  }

  function validateMobile() {
    mobile$.closest("div").find(".invalid-feedback").hide();
    mobile$.removeClass("is-invalid");
    const mobile = mobile$.val().trim();
    const valid = /^[6-9][0-9]{9}$/.test(mobile);
    if (!mobile || !valid) {
      mobile$.addClass("is-invalid");
      mobile$.closest("div").find(".invalid-feedback").show();
      return false;
    }
    return true;
  }
});
