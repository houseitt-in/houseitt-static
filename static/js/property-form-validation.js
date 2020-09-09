function scrollTopToPosition(pos) {
  $("html, body").animate(
    { scrollTop: pos - 70},
    "fast"
  );
}

function fillErrorBoxes(class_name) {
  $(`span.error-box.${class_name}`).text("This data is required.");
}


function fillErrorTextfieldBoxes(element, error) {
  if ($(element).hasClass("checkbox-textfield-tf")) {
    if (!error) {
      $(element).siblings('span.error-box-req-input').text("(Required)");
    } else {
      $(element).siblings('span.error-box-req-input').text("(Required Number)");
    }
  } else {
    $(element).siblings('span.error-box-req-input').text(error || "Required Data");
  }
}

function fillErrorSelectBoxes(element) {
  $(element.parentElement).siblings('span.error-box').text("Required Data");
}

function fillErrorFileBoxes(element) {
  $(element).siblings('span.error-box').text("Required Data");
}

function fillErrorAtleaseOneBoxes(element) {
  $(element.parentElement.parentElement).siblings('span.error-box:first').text("Required Data");
}

function validateAtleastOneOption(class_names, parent="") {
  let isValid = true
  let firstErrorElement = null;
  class_names.forEach((e) => {
    const elem = parent ? $(`${parent} input.${e}:visible`) : $(`input.${e}:visible`);
    // Don't validate if not visible
    if(elem.length === 0) {
      return;
    }
    if(elem.filter(":checked").length === 0) {
      if (firstErrorElement === null) {
        firstErrorElement = elem.get(0);
      }
      fillErrorAtleaseOneBoxes(elem.get(0));
      isValid = false;
    }
  });
  return [isValid, firstErrorElement];
}

function validateFileUpload() {
  let isValid = true;
  let firstErrorElement = null;
  $("input[type='file']:required").each(function () {
    if(this.files.length === 0) {
      if (firstErrorElement === null) {
        firstErrorElement = this;
      }
      fillErrorFileBoxes(this);
      isValid = false;
    }
  });
  return [isValid, firstErrorElement];
}
function validateReqSelectOptions() {
  let isValid = true
  let firstErrorElement = null;
  $("select[required] option:selected").each(function () {
    if(!$(this).val().trim()) {
      if (firstErrorElement === null) {
        firstErrorElement = this.parentElement;
      }
      fillErrorSelectBoxes(this.parentElement);
      isValid = false;
    }
  });
  return [isValid, firstErrorElement];
}

function validateTextfields(parent="") {
  let isValid = true
  let firstErrorElement = null;
  const elems = parent ? $(`${parent} input[type='text']`):$("input[type='text']");
  elems.filter(`[required]:visible`).each(function () {
    if(!$(this).val().trim()) {
      if (firstErrorElement === null) {
        firstErrorElement = this;
      }
      fillErrorTextfieldBoxes(this);
      isValid = false;
    }
  });
  return [isValid, firstErrorElement];
}


function validateNumberTextfields(parent="") {
  let isValid = true
  let firstErrorElement = null;
  var reg = /^\d+$/;
  const elems = parent ? $(`${parent} input[type='number']`):$("input[type='number']");
  elems.filter(`[required]:visible`).each(function () {
    if(!$(this).val().trim()) {
      if (firstErrorElement === null) {
        firstErrorElement = this;
      }
      fillErrorTextfieldBoxes(this);
      isValid = false;
    } else if(!reg.test($(this).val().trim())) {
      if (firstErrorElement === null) {
        firstErrorElement = this;
      }
      fillErrorTextfieldBoxes(this, "Number Required");
      isValid = false;
    }
  });
  return [isValid, firstErrorElement];
}


function cleanErrors() {
  $(`span.error-box`).text("");
  $(`span.error-box-checkbox`).text("");
  $(`span.error-box-req-input`).text("");
}

function flat_form_validate() {
  cleanErrors();
  atleastOne = [
    "bhk-options",
    "washroom-options",
    "rent-type-options",
    "for-options",
    "construction-type-options",
    "washroom-style-options",
    "security-negotiable-options",
  ];
  const validatorFunctions = [
    validateNumberTextfields,
    validateTextfields,
    validateFileUpload,
    validateReqSelectOptions,
  ]

  let isFormValid = true;
  let firstErrorPos = null;
  let firstErrorElement;
  const firstErrorElements = new Array();
  
  [isValid, firstErrorElement] = validateAtleastOneOption(atleastOne);
  if(isFormValid && !isValid) {
    isFormValid = false;
  }
  if (firstErrorElement){
    firstErrorElements.push(firstErrorElement);
  }

  validatorFunctions.forEach(e => {
    [isValid, firstErrorElement] = e();
    if(isFormValid && !isValid) {
      isFormValid = false;
    }

    if (firstErrorElement){
      firstErrorElements.push(firstErrorElement);
    }
  });

  if (!isFormValid) {
    firstErrorPos = firstErrorElements.reduce((a,c) => {
      return Math.min($(c).offset().top, a)
    }, Infinity)
    scrollTopToPosition(firstErrorPos);
    return false;
  }
  return true;
}

function pg_form_validate() {
  cleanErrors();
  atleastOne = [
    "sharing-options",
    "singleSharingRoomFacilities",
    "singleSharingWashroom", "doubleSharingRoomFacilities",
    "doubleSharingWashroom", "tripleSharingRoomFacilities",
    "tripleSharingWashroom", "quadSharingRoomFacilities", "quadSharingWashroom",
    "for-options", "operated-by-options", "co-livingFacilities", "security-negotiable-options"
  ];
  const validatorFunctions = [
    validateNumberTextfields,
    validateTextfields,
    validateFileUpload,
    validateReqSelectOptions,
  ]

  let isFormValid = true;
  let firstErrorPos = null;
  let firstErrorElement;
  const firstErrorElements = new Array();

  [isValid, firstErrorElement] = validateAtleastOneOption(atleastOne);
  if(isFormValid && !isValid) {
    isFormValid = false;
  }
  if (firstErrorElement){
    firstErrorElements.push(firstErrorElement);
  }

  validatorFunctions.forEach(e => {
    [isValid, firstErrorElement] = e();
    if(isFormValid && !isValid) {
      isFormValid = false;
    }

    if (firstErrorElement){
      firstErrorElements.push(firstErrorElement);
    }
  });

  if (!isFormValid) {
    firstErrorPos = firstErrorElements.reduce((a,c) => {
      return Math.min($(c).offset().top, a)
    }, Infinity)
    scrollTopToPosition(firstErrorPos);

    // open closed accordions if have error
    $(".s_accordion:visible").not(".s_active").each(function(){
      if ($(this.nextElementSibling).find(".error-box,error-box-req-input").not(":empty").length > 0) {
        $(this).addClass("s_active");
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + "px";
      }
    });
    return false;
  }
  return true;
}
document.addEventListener("DOMContentLoaded", function (event) {
  const submit_flat_btn = document.querySelector("#submit_flat_button");
  if (submit_flat_btn) {
    const flat_form = document.querySelector("#flat_form");
    submit_flat_btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (flat_form_validate()) {
        flat_form.submit();
      }
    });
  }

  const submit_pg_btn = document.querySelector("#submit_pg_button");
  if (submit_pg_btn){
    const pg_form = document.querySelector("#pg_form");
    submit_pg_btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (pg_form_validate()) {
        pg_form.submit();
      }
    });
  }

  /*
    function selectEmptyRequiredFields(errors, checkboxes_classes) {
        const selectedInputs = document.querySelectorAll('input.sharingType');
        const singleSharingPrice = document.querySelector(".singleSharingPrice");
        const doubleSharingPrice = document.querySelector(".doubleSharingPrice");
        const tripleSharingPrice = document.querySelector(".tripleSharingPrice");
        const quadSharingPrice = document.querySelector(".quadSharingPrice");
        const singleSharingBeds = document.querySelector(".singleSharingBeds");
        const doubleSharingBeds = document.querySelector(".doubleSharingBeds");
        const tripleSharingBeds = document.querySelector(".tripleSharingBeds");
        const quadSharingBeds = document.querySelector(".quadSharingBeds");
        selectedInputs.forEach(input => {
            const selectedValue = (input.checked) ? input.value : "";
            switch (selectedValue) {
                case "SINGLE":
                    checkboxes_classes.push("singleSharingRoomFacilities");
                    checkboxes_classes.push("singleSharingWashroom");
                    if(singleSharingPrice.value === "")
                        errors["Single Sharing Price"] = "Please enter a value";
                    if(singleSharingBeds.value === "")
                        errors["Single Sharing Beds"] = "Please enter a value";
                    break;
                case "DOUBLE":
                    checkboxes_classes.push("doubleSharingRoomFacilities");
                    checkboxes_classes.push("doubleSharingWashroom");
                    if(doubleSharingPrice.value === "")
                        errors["Double Sharing Price"] = "Please enter a value";
                    if(doubleSharingBeds.value === "")
                        errors["Double Sharing Beds"] = "Please enter a value";
                    break;
                case "TRIPLE":
                    checkboxes_classes.push("tripleSharingRoomFacilities");
                    checkboxes_classes.push("tripleSharingWashroom");
                    if(tripleSharingPrice.value === "")
                        errors["Triple Sharing Price"] = "Please enter a value";
                    if(tripleSharingBeds.value === "")
                        errors["Triple Sharing Beds"] = "Please enter a value";
                    break;
                case "QUAD":
                    checkboxes_classes.push("quadSharingRoomFacilities");
                    checkboxes_classes.push("quadSharingWashroom");
                    if(quadSharingPrice.value === "")
                        errors["Quad Sharing Price"] = "Please enter a value";
                    if(quadSharingBeds.value === "")
                        errors["Quad Sharing Beds"] = "Please enter a value";
                    break;
                default:
                    break;
            }
        })
    }
    */
});
