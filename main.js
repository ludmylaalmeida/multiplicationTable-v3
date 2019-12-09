/*  Assignment 8: Using the jQuery UI Slider and Tab Widgets
    File: main.js
    Ludmyla Almeida, UMass Lowell Computer Science, ludmyla_almeida@student.uml.edu
    Copyright (c) 2019 by Ludmyla Almeida. All rights reserved.
*/

// tabCounter
var tabCounter = 1;

/* this function validates the form */
$(document).ready(function() {
  /* this method uses the jquery plugin */
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
        number: "Please enter a val number"
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
      createTab();
      event.preventDefault(); // prevents form from losing input data
    }
  });
});

$(document).ready(function() {
  let vr1 = $("#vr1").val();
  let vr2 = $("#vr2").val();
  let hr1 = $("#hr1").val();
  let hr2 = $("#hr2").val();
  staticTable(hr1, hr2, vr1, vr2);

  updateSlider();
  // this selects all the inputs in the form
  updateStaticTable();
});

function updateStaticTable() {
  document.querySelectorAll("input").forEach(item => {
    item.addEventListener("keyup", function() {
      var validator = $("#form").validate();
      /* This makes sure the form is valid  before chaging the static table */
      if (validator.form()) {
        let vr1 = $("#vr1").val();
        let vr2 = $("#vr2").val();
        let hr1 = $("#hr1").val();
        let hr2 = $("#hr2").val();
        staticTable(hr1, hr2, vr1, vr2);
      }
    });
  });
  document.querySelectorAll(".slider").forEach(item => {
    item.addEventListener("click", function() {
      var validator = $("#form").validate();
      /* This makes sure the form is valid  before chaging the static table */
      if (validator.form()) {
        let vr1 = $("#vr1").val();
        let vr2 = $("#vr2").val();
        let hr1 = $("#hr1").val();
        let hr2 = $("#hr2").val();
        if(vr1 > 10 || vr2 > 10 || hr1 > 10|| hr2 > 10){

        }
        staticTable(hr1, hr2, vr1, vr2);
      }
    });
  });
}

/* slider using jquery ui */
$(function slider() {
  $("#hr1-slider").slider({
    range: "max",
    min: -50,
    max: 50,
    value: 0,
    slide: function(event, ui) {
      $("#hr1").val(ui.value);
    }
  });
  $("#hr2-slider").slider({
    range: "max",
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#hr2").val(ui.value);
    }
  });
  $("#vr1-slider").slider({
    range: "max",
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#vr1").val(ui.value);
    }
  });
  $("#vr2-slider").slider({
    range: "max",
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#vr2").val(ui.value);
    }
  });
});

function updateSlider() {
  /* update slider while typing */
  $("#hr1").on("keyup", function() {
    $("#hr1-slider").slider("value", this.value);
  });
  $("#hr2").on("keyup", function() {
    $("#hr2-slider").slider("value", this.value);
  });
  $("#vr1").on("keyup", function() {
    $("#vr1-slider").slider("value", this.value);
  });
  $("#vr2").on("keyup", function() {
    $("#vr2-slider").slider("value", this.value);
  });
}

/*
  This function creates the tab and calls the function to create the table, it also takes care of removing the tab
*/
function createTab() {
  /* get values from input */
  let vr1 = $("#vr1").val();
  let vr2 = $("#vr2").val();
  let hr1 = $("#hr1").val();
  let hr2 = $("#hr2").val();

  /* create tab using jquery ui */
  var tabs = $("#tabs").tabs({});

  var tabTemplate =
      "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close active' role='presentation'>Remove Tab</span></li>",
    tableTemplate =
      "<table id='row-" +
      tabCounter +
      "' class='table col-6'><tr id='topRow-" +
      tabCounter +
      "' class=''></tr></table>";

  /* this section of adds a new tab */
  var label = hr1 + " to " + hr2 + " by " + vr1 + " to " + vr2,
    id = "tabs-" + tabCounter,
    li = $(
      tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label)
    ),
    tabContentHtml = tableTemplate;

  tabs.find(".ui-tabs-nav").append(li);
  tabs.append("<div id='" + id + "'><p>" + tabContentHtml + "</p></div>");
  tabs.tabs("refresh");
  tabCounter++;
  $("#tabs").tabs("option", "active", -1);
  /* calls the function to create the table inside the new tab */
  tableInTab(hr1, hr2, vr1, vr2);

  /* Close icon: removing the tab on click */
  tabs.on("click", "span.ui-icon-close", function() {
    var panelId = $(this)
      .closest("li")
      .remove()
      .attr("aria-controls");
    $("#" + panelId).remove();
    tabs.tabs("refresh");
  });

  tabs.on("keyup", function(event) {
    if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
      var panelId = tabs
        .find(".ui-tabs-active")
        .remove()
        .attr("aria-controls");
      $("#" + panelId).remove();
      tabs.tabs("refresh");
    }
  });
}

/* function to display the table */
function tableInTab(hr1, hr2, vr1, vr2) {
  //find smallest and largest number
  let largest_hr = Math.max(hr1, hr2);
  let smallest_hr = Math.min(hr1, hr2);
  let largest_vr = Math.max(vr1, vr2);
  let smallest_vr = Math.min(vr1, vr2);

  let tableId = "topRow-" + (tabCounter - 1);
  let rowId = "row-" + (tabCounter - 1);

  createTable(tableId, rowId, largest_hr, smallest_hr, largest_vr, smallest_vr);
}

function staticTable(hr1, hr2, vr1, vr2) {
  //find smallest and largest number
  let largest_hr = Math.max(hr1, hr2);
  let smallest_hr = Math.min(hr1, hr2);
  let largest_vr = Math.max(vr1, vr2);
  let smallest_vr = Math.min(vr1, vr2);

  //clear table after resubmit
  let clear = $("#row tr");
  for (let i = 0; i < clear.length; i++) {
    clear[i].innerHTML = "";
  }

  createTable(
    "topRow",
    "row",
    largest_hr,
    smallest_hr,
    largest_vr,
    smallest_vr
  );
}

function createTable(
  id1,
  id2,
  largest_hr,
  smallest_hr,
  largest_vr,
  smallest_vr
) {
  // create two arrays
  let hr_array = [];
  let vr_array = [];

  let tb_header = document.getElementById(id1);
  let x = tb_header.insertCell();
  x.innerHTML = "x";
  //get the array for the horizontal and add that row
  for (let i = smallest_hr; i <= largest_hr; i++) {
    hr_array.push(i);
    x = tb_header.insertCell();
    x.innerHTML = i;
  }

  let row = document.getElementById(id2);
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

$(document).ready(function() {
  $("#clear").on("click", function() {
    if (tabCounter > 1) {
      $("#tabs").tabs("destroy");
    }

    //clear table after resubmit
    for (let i = tabCounter - 1; i > 0; i--) {
      let tr = $("#row-" + i + " tr");
      let ul = $("ul");
      // remove all the tr
      for (let j = 0; j < tr.length; j++) {
        tr[j].innerHTML = "";
      }
      for (let j = 0; j < ul.length; j++) {
        ul[j].innerHTML = "";
      }
    }
  });
});
