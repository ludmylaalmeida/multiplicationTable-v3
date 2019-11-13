//  Assignment: Creating an Interactive Dynamic Table
//  File: main.js
//  Ludmyla Almeida, UMass Lowell Computer Science, ludmyla_almeida@student.uml.edu
//  Copyright (c) 2019 by Ludmyla Almeida. All rights reserved. 

function validateForm(e) {
  let x = document.getElementById(e);
  let val = x.value;

  //invalid if 
  if(val.length < 1 || val.indexOf(" ") > -1){
    x.classList.remove("is-valid");
    x.classList.add("is-invalid");
    return false;
  }
  //invalid if
  if (isNaN(val) || val > 50 || val < -50) {
    x.classList.remove("is-valid");
    x.classList.add("is-invalid");
    return false;
  } else if (val !== " ") {
    //valid if
    console.log(val);
    x.classList.add("is-valid");
    x.classList.remove("is-invalid");
    return true;
  }
}

function checkValidation() {

  // if input is empty, the validation message will display for every field
  validateForm("hr1");
  validateForm("hr2"); 
  validateForm("vr1");
  validateForm("vr2");

  // if it is valid, submit form
  if (validateForm("hr1") && validateForm("hr2") && validateForm("vr1") && validateForm("vr2")) {
    document.getElementById("submitValidation").innerText = "";
    return displayTable();
  } else {  // else display error message
    document.getElementById("submitValidation").innerText = "Fix errors before submitting form";
  }
}

// Bootstrap function taken from : https://getbootstrap.com/docs/4.3/components/forms/#validation
(function() {
  "use strict";
  window.addEventListener(
    "load",
    function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      let forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      let validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
          "submit",
          function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

function displayTable() {
  //get elements from horizontal axis
  let hr1 = document.getElementById("hr1").value;
  let hr2 = document.getElementById("hr2").value;

  //find smallest and largest number
  let largest_hr = Math.max(hr1, hr2);
  let smallest_hr = Math.min(hr1, hr2);

  //get elements from vertical axis
  let vr1 = document.getElementById("vr1").value;
  let vr2 = document.getElementById("vr2").value;

  // find smallest and largest number
  let largest_vr = Math.max(vr1, vr2);
  let smallest_vr = Math.min(vr1, vr2);

  // if table is too big, scroll will be enabled
  if( largest_hr > 20 || largest_vr > 20){
    document.getElementById("tooMany").innerText = "If there are many items, table becomes scrollable"
  }

  // create two arrays
  let hr_array = [];
  let vr_array = [];

  // clear table after resubmit
  let clear = document.getElementsByTagName("tr");
  for (let i = 0; i < clear.length; i++) {
    clear[i].innerHTML = "";
  }

  let tb_header = document.getElementById("topRow");
  let x = tb_header.insertCell();
  x.innerHTML = "x";
  //get the array for the horizontal and add that row
  for (let i = smallest_hr; i <= largest_hr; i++) {
    hr_array.push(i);
    x = tb_header.insertCell();
    x.innerHTML = i;
  }

  let row = document.getElementById("row");
  //get the array for the vertical
  for (let i = smallest_vr; i <= largest_vr; i++) {
    vr_array.push(i);
  }

  for (let i = 0; i < vr_array.length; i++) {
    let row1 = row.insertRow();
    let el = row1.insertCell();
    el.innerHTML = vr_array[i];

    for (let j = 0; j < hr_array.length; j++) {
      let value = vr_array[i] * hr_array[j];
      el = row1.insertCell();
      el.innerHTML = value;
    }
  }
}
