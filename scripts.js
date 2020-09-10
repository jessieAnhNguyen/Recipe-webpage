// don't execute any JS until after the DOM is loaded

var ingredientCnt = 0;
var stepCnt = 0;

// hide all items at the beginning
function hideAllItems(list, listLen) {
  for (var i = 0; i < listLen; i++) {
    list.children[i].style.display = "none";
  }
}

//display items one by one on click
function displayItemsbyStep(btn, list, listLen) {
  // wait for the user to click the button, then "revert" (show item) the next
  //. item in the list
  btn.addEventListener("click", function () {
    var cnt;
    if (list.id === "ingredientList") {
      cnt = ingredientCnt;
    } else {
      cnt = stepCnt;
    }
    if (cnt < listLen) {
      list.children[cnt].style.display = "revert";
    }
    if (cnt < listLen) {
      cnt++;
    }
    if (list.id === "ingredientList") {
      ingredientCnt = cnt;
    } else {
      stepCnt = cnt;
    }
  });
}

//hide items one by one on click
function hideItemsByStep(btn, list) {
  // wait for the user to click the button, then "none" (hide item) the next
  // item in the list
  btn.addEventListener("click", function () {
    var cnt;
    if (list.id === "ingredientList") {
      cnt = ingredientCnt;
    } else {
      cnt = stepCnt;
    }
    if (cnt > 0) cnt--;
    if (cnt >= 0) {
      list.children[cnt].style.display = "none";
    }
    if (list.id === "ingredientList") {
      ingredientCnt = cnt;
    } else {
      stepCnt = cnt;
    }
  });
}

//main function
document.addEventListener("DOMContentLoaded", function () {
  // create "handles" on the buttons from the HTML
  var ingredientBtn = document.getElementById("ingredientBtn");
  var stepBtn = document.getElementById("stepBtn");

  // create "handles" on the lists
  var ingredientList = document.getElementById("ingredientList");
  var stepList = document.getElementById("stepList");

  // get the lengths of the lists
  ingredientListLen = ingredientList.children.length;
  stepListLen = stepList.children.length;

  // create "handles" on the hiding buttons from the HTML
  var hideIngredientBtn = document.getElementById("hideIngredientBtn");
  var hideStepBtn = document.getElementById("hideStepBtn");

  // for each item in the lists, set their display value to "none" (hide them)
  hideAllItems(ingredientList, ingredientListLen);
  hideAllItems(stepList, stepListLen);

  //display the items one by one when clicking the button
  displayItemsbyStep(ingredientBtn, ingredientList, ingredientListLen);
  displayItemsbyStep(stepBtn, stepList, stepListLen);

  //hide the items one by one when clicking the button
  hideItemsByStep(hideIngredientBtn, ingredientList);
  hideItemsByStep(hideStepBtn, stepList);
});
