// alert("connected");
/////// DEBUGGING SKILLS

// declare variables
let clearAllBtn,
  clearBtn,
  equalToBtn,
  enteringSpace,
  resultSpace,
  operationBtns,
  numberBtns;
// get the various html elements
clearAllBtn = document.getElementById("clear-all-btn");
clearBtn = document.getElementById("clear-btn");
enteringSpace = document.getElementById("entering-space");
resultSpace = document.getElementById("result-space");
numberBtns = document.getElementsByClassName("number-btn");
operationBtns = document.getElementsByClassName("operation-btn");
equalToBtn = document.getElementById("equal-to-btn");

//declared the clicked operation to make it globally accessible
let clickedOperator;

console.log(clearBtn);
console.log(clearAllBtn);
console.log(enteringSpace);
console.log(resultSpace);
console.log(numberBtns);
console.log(operationBtns);

// Functions here
getClickedNum = e => {
  if (enteringSpace.textContent === "0") {
    enteringSpace.textContent = "";
  }

  //check to make sure we are getting the clicked element
  console.log("you clicked: ", e.target.textContent);
  console.log("type: ", typeof e.target.textContent);

  //save the clicked number into a variable
  const clickedNum = e.target.textContent;

  //add the clicked number into the entering space
  enteringSpace.textContent += clickedNum;
};

getClickedOperator = e => {
  if (enteringSpace.textContent === "0") {
    return;
  }
  console.log(
    "checking whether the if statement worked",
    event.target.textContent
  );

  e.target.style.backgroundColor = "green";
  e.target.style.color = "#ffffff";

  clickedOperator = e.target.textContent;
  enteringSpace.textContent += " " + clickedOperator + " ";

  for (i = 0; i < operationBtns.length; i++) {
    if (enteringSpace.textContent !== "0") {
      operationBtns[i].disabled = true;
    }
    if (operationBtns[i].textContent !== clickedOperator) {
      operationBtns[i].style.backgroundColor = "#a8a4a4";
    }
  }
};

resetThings = () => {
  console.log("clear all button clicked");
  enteringSpace.innerHTML = 0;

  for (i = 0; i < operationBtns.length; i++) {
    operationBtns[i].disabled = false;

    operationBtns[i].style.backgroundColor = "burlywood";
    operationBtns[i].style.color = "rgb(126, 84, 30)";
  }
};

getResults = () => {
  console.log("equal to has been clicked");
  let result;

  if (enteringSpace.textContent.length < 3) {
    return;
  }

  const numbersList = enteringSpace.textContent.split(
    " " + clickedOperator + " "
  );
  console.log(numbersList);
  console.log("both numbers are available");
  const num1 = Number(numbersList[0]);
  console.log(num1, typeof num1);
  const num2 = Number(numbersList[1]);
  console.log(num2, typeof num1);

  if ((numbersList[0] != "") & (numbersList[1] != "")) {
    switch (clickedOperator) {
      case "/":
        result = num1 / num2;
        break;
      case "x":
        result = num1 * num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "+":
        result = num1 + num2;
        break;
    }
  } else {
    return;
  }
  console.log(result.toFixed(2).toString());

  //put the result in the result space
  resultSpace.textContent = result.toFixed(2).toString();
  enteringSpace.textContent = result.toFixed(2).toString();
  for (i = 0; i < operationBtns.length; i++) {
    operationBtns[i].disabled = false;

    operationBtns[i].style.backgroundColor = "burlywood";
    operationBtns[i].style.color = "rgb(126, 84, 30)";
  }
};

clearAllBtn.addEventListener("click", resetThings);

//loop over the number buttons and add event listeners to them
for (i = 0; i < numberBtns.length; i++) {
  //   console.log(numberBtns[i].textContent);

  numberBtns[i].addEventListener("click", () => getClickedNum(event));
}

//loop over the operation buttons and add event listeners to them
for (i = 0; i < operationBtns.length; i++) {
  //   console.log(operationBtns[i].textContent)

  operationBtns[i].addEventListener("click", () => getClickedOperator(event));
}

//what happens when the equal to button is pressed
equalToBtn.addEventListener("click", () => getResults());
