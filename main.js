//  Assignment: Using the jQuery Validation Plugin with Your Dynamic Table
//  File: main.js
//  Ludmyla Almeida, UMass Lowell Computer Science, ludmyla_almeida@student.uml.edu
//  Copyright (c) 2019 by Ludmyla Almeida. All rights reserved.

/* this method uses the jquery plugin */
$(document).ready(function() {
  $("#form").validate({
    rules: {
      hr1: {
        required: true,
        number: true,
        range: [-50, 50]
      },
      hr2: {
        required: true,
        number: true,
        range: [-50, 50]
      },
      vr1: {
        required: true,
        number: true,
        range: [-50, 50]
      },
      vr2: {
        required: true,
        number: true,
        range: [-50, 50]
      }
    },
    messages: {
      hr1: {
        required: "This field is required",
        number: "Please enter a valid number"
      },
      hr2: {
        required: "This field is required",
        number: "Please enter a valid number"
      },
      vr1: {
        required: "This field is required",
        number: "Please enter a valid number"
      },
      vr2: {
        required: "This field is required",
        number: "Please enter a valid number"
      }
    },
    highlight: function(element) {
      $(element).addClass("is-invalid");
    },
    unhighlight: function(element) {
      $(element).removeClass("is-invalid");
      $(element).addClass("is-valid");
    },
    // if its valid submit 
    submitHandler: function() {
      displayTable();
    }
  });
});

/* function to display the table */
function displayTable() {
  //get elements from horizontal axis
  let hr1 = $("#hr1").val();
  let hr2 = $("#hr2").val();

  //find smallest and largest number
  let largest_hr = Math.max(hr1, hr2);
  let smallest_hr = Math.min(hr1, hr2);

  //get elements from vertical axis
  let vr1 = $("#vr1").val();
  let vr2 = $("#vr2").val();

  // find smallest and largest number
  let largest_vr = Math.max(vr1, vr2);
  let smallest_vr = Math.min(vr1, vr2);

  // if table is too big, scroll will be enabled
  if (largest_hr > 20 || largest_vr > 20) {
    $("#tooMany").html("If there are many items, table becomes scrollable");
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
