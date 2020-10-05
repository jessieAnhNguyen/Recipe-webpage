// hide all items at the beginning
function hideAllItems(list) {
  $(list).children().hide();
}

//display items one by one on click
function displayItemsbyStep(list) {
  // wait for the user to click the button, then "revert" (show item) the next
  //. item in the list

  var children = $(list).children();
  var listLen = $(list).children().length;
  for (let cnt = 0; cnt < listLen; cnt++) {
    var currChild = $(children).get(cnt);
    if (!$(currChild).is(":visible")) {
      $(currChild).show();
      break;
    }
  }
}

//hide items one by one on click
function hideItemsByStep(list) {
  // wait for the user to click the button, then "none" (hide item) the next
  // item in the list
  var children = $(list).children();
  var listLen = $(list).children().length;
  for (let cnt = listLen - 1; cnt >= 0; cnt--) {
    var currChild = $(children).get(cnt);
    if ($(currChild).is(":visible")) {
      $(currChild).hide();
      break;
    }
  }
}

// wait for the document to load
$(document).ready(function () {
  // create "handles" on the buttons from the HTML
  var ingredientBtn = $("#ingredientBtn");
  var stepBtn = $("#stepBtn");

  // create "handles" on the lists
  var ingredientList = $("#ingredientList");
  var stepList = $("#stepList");

  // create "handles" on the hiding buttons from the HTML
  var hideIngredientBtn = $("#hideIngredientBtn");
  var hideStepBtn = $("#hideStepBtn");

  //when user clicks the submit new ingredient button
  $("#addNewIngreBtn").click(function () {
    //check if the input text field is empty
    if ($("#newIngredient").val()) {
      let newItem = $("#newIngredient").val();
      //append the new item to the list
      $(ingredientList).append("<li>" + newItem + "</li>");
      $("#newIngredient").val("");
    }
    return false;
  });

  //when user clicks the submit new step button
  $("#addNewStepBtn").click(function () {
    //check if the input text field is empty
    if ($("#newStep").val()) {
      let newItem = $("#newStep").val();
      //append the new item to the list
      $(stepList).append("<li>" + newItem + "</li>");
      $("#newStep").val("");
    }
    return false;
  });

  // for each item in the lists, set their display value to "none" (hide them)
  hideAllItems(ingredientList);
  hideAllItems(stepList);

  //display the items one by one when clicking the button
  $(ingredientBtn).click(function () {
    displayItemsbyStep(ingredientList);
  });

  $(stepBtn).click(function () {
    displayItemsbyStep(stepList);
  });

  //hide the items one by one when clicking the button
  $(hideIngredientBtn).click(function () {
    hideItemsByStep(ingredientList);
  });
  $(hideStepBtn).click(function () {
    hideItemsByStep(stepList);
  });
});
