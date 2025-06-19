let firstNum = "";
let secondNum = "";
let signEntered = ""; // checks if sign in equation, if true and another sign inputted, call operate
let firstSigned = false;
let secondSigned = false;
let firstDecimal = false;
let secondDecimal = false;
const display = document.querySelector(".input");

function operate(num1, num2, sign) {
  if(sign == '+') {
    
    return parseFloat(num1) + parseFloat(num2);
  }
  
}

function output(input){
    
      if(input == "clear" || input == "Escape") {
        display.textContent = "";
        firstNum = "";
        secondNum = "";
        signEntered = "";
        firstSigned = false;
        secondSigned = false;
        firstDecimal = false;
        secondDecimal = false;
        
      }else if(input == "delete" || input == "Backspace") {
        
      if(display.textContent[display.textContent.length-1] == " ") { //if deleteing a sign, delete 3 chars to remove whitespace too
        signEntered = "";
        display.textContent = display.textContent.slice(0,-3);
      }else {
        //if deleting decimal change first/second decimal to false. if decimal is in first index, check if 0th index is 0, if so delete both
        display.textContent = display.textContent.slice(0,-1); //remove last char, if theres no sign then remove from firstNum and secondNum if there is
        if(signEntered == "") {
          firstNum = firstNum.slice(0,-1);
        }
        else {
          secondNum = secondNum.slice(0,-1);
        }
      }
    
    }else if(input == '+' || input == '-' ||input == '/' ||input == '*') {
      
      
      if(firstNum == "") { //if firstNum is empty or secondNUm is empty AND signEntered, then we can allow a -
        if(input == '-') {
          display.textContent = display.textContent + '-'
          firstNum += '-';
        }
      }
      
      else if(display.textContent[display.textContent.length-1] == " ") { //if last input is sign, change sign instead of adding another sign
        signEntered = input;
        display.textContent = display.textContent.slice(0, -3) + ` ${input} `;
      }
      else if (signEntered == "") { //if sign hasn't been entered in equation add sign 
        display.textContent = display.textContent + ` ${input} `;
        signEntered = input;
      }else { //if sign is already in equation and last input wasn't sign call operate and add sign to result
        //operate
      }
    }
      
    else if(input == '=' || input == 'Enter') {

      //make sure firstnum and secondnum are valid or else do nothing
      
      // if(firstNum == "" || signEntered == "" || secondNum == "") return;
      // firstNum = operate(firstNum, secondNum, signEntered).toString();
      // display.textContent = firstNum;
      // signEntered = "";
      // secondNum = "";
      // console.log(firstNum);
      console.log(input);
      
    }
    else if(input == '.') {
      if(signEntered == "" && !firstDecimal){
        firstDecimal = true;
        if(firstNum == "" || firstNum[0] == '-' && firstNum.length == 1) {
          firstNum += '0.';
          display.textContent = display.textContent + '0.';
        }else {
          firstNum += '.';
          display.textContent = display.textContent + '.';
        }
      }else if(signEntered != "" && !secondDecimal) {
        secondDecimal = true;
        if(secondNum == "" || secondNum[0] == '-' && secondNum.length == 1) {
          secondNum += '0.';
          display.textContent = display.textContent + '0.';
        }else{
          secondNum += '.';
          display.textContent = display.textContent + '.';
        }
      }  
    }
    else { //all digits handled here, special case if 0 is first digit, then can only be followed up with operator or decimal.
      
        if(signEntered == "" && firstNum.length <= 2) {
          if((firstNum[0] == '0' && firstNum[1] != '.') || (firstNum[0] == '-' && firstNum[1] == '0')) {
            firstNum = firstNum.slice(0,-1);
            display.textContent = display.textContent.slice(0,-1);
          }
        }else if(signEntered != "" && secondNum.length <= 2) {
          if((secondNum[0] == '0' && secondNum[1] != '.') || (secondNum[0] == '-' && secondNum[1] == '0')) {
            secondNum = secondNum.slice(0,-1);
            display.textContent = display.textContent.slice(0,-1);  
        }       
      }
      display.textContent = display.textContent + input;
      if(signEntered == "") firstNum += input;
      else secondNum += input;
    }  
}

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  
  if(['1','2','3','4','5','6','7','8','9','0','Backspace', 'Escape', 'Enter', '+' , '-', '*', '/', '.', '='].includes(e.key)){
    e.preventDefault();
    output(e.key);
    return;
  }
    
});


document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        output(button.textContent.trim());
    });
});

//if equation is empty, first char MUST be digit, decimal, or -

// both firstNum and secondNum have one - and one .
