let firstNum = "";
let secondNum = "";
let signEntered = ""; // checks if sign in equation, if true and another sign inputted, call operate
let firstDecimal = false;
let secondDecimal = false;
let operated = false;
const display = document.querySelector(".input");
const history = document.querySelector(".pastInput");

function operate(num1, num2, sign) {
  if(firstNum[firstNum.length-1] == '.') firstNum = firstNum.slice(0,-1);
  if(secondNum[secondNum.length-1] == '.') secondNum = secondNum.slice(0,-1);
  history.textContent = `${firstNum} ${signEntered} ${secondNum}`;
  
  const a = new Decimal(parseFloat(num1));
  const b = new Decimal(parseFloat(num2));
  
  if(sign == '+') {
    
    firstNum = (a.plus(b)).toString();
  }
  if(sign == '-') {
  
    firstNum =  (a.minus(b)).toString();
  }
  if(sign == '/') {
  
    firstNum =  (a.div(b)).toString();
  }
  if(sign == '*') {
  
    firstNum =  (a.times(b)).toString();
  }
 
  display.textContent = firstNum;
  if(!firstNum.includes('.')) firstDecimal = false;

}

function clear() {
  display.textContent = "";
  history.textContent = "";
  firstNum = "";
  secondNum = "";
  signEntered = "";
  firstDecimal = false;
  secondDecimal = false;
  operated = false;  
}
function output(input){
    
    if(input == "clear" || input == "Escape") {
      clear();
        
    }else if(input == "delete" || input == "Backspace") {
      if(operated) {
        clear();
        operated = false;
      }
      else if(display.textContent[display.textContent.length-1] == " ") { //if deleteing a sign, delete 3 chars to remove whitespace too
        signEntered = "";
        display.textContent = display.textContent.slice(0,-3);
      }else if(display.textContent[display.textContent.length-1] == "."){ //if deleting decimal change first/second decimal to false. if decimal is in first index, check if 0th index is 0, if so delete both
        if(signEntered == "") {
          firstDecimal = false;
          if((firstNum[0] == '-' && firstNum[1] == '0' && firstNum[2] == '.') || (firstNum[0] == '0' && firstNum[1] == '.')) {
            display.textContent = display.textContent.slice(0,-2);
            firstNum = firstNum.slice(0,-2);
          }else {
            display.textContent = display.textContent.slice(0,-1);
            firstNum = firstNum.slice(0,-1);           
          }
        }else {
          secondDecimal = false;
          if((secondNum[0] == '-' && secondNum[1] == '0' && secondNum[2] == '.') || (secondNum[0] == '0' && secondNum[1] == '.')) {
            display.textContent = display.textContent.slice(0,-2);
            secondNum = secondNum.slice(0,-2);
          }else {
            display.textContent = display.textContent.slice(0,-1);
            secondNum = secondNum.slice(0,-1);           
          }          
        }
      }else {
        
        display.textContent = display.textContent.slice(0,-1); //remove last char, if theres no sign then remove from firstNum and secondNum if there is
        if(signEntered == "") {
          firstNum = firstNum.slice(0,-1);
          if(firstNum == "") history.textContent = "";
        }
        else {
          secondNum = secondNum.slice(0,-1);
        }
      }
    
    }else if(input == '+' || input == '-' ||input == '/' ||input == '*') {
      if(operated) {
        signEntered = "";
        secondNum = "";
        secondDecimal = false;
        operated = false;
      }
      if(firstNum == "" && input == '-') { //can add negative to first number
        display.textContent = display.textContent + '-'
        firstNum += '-';           
      }  
      else if(display.textContent[display.textContent.length-1] == " ") { //if last input is sign, change sign instead of adding another sign
        signEntered = input;
        display.textContent = display.textContent.slice(0, -3) + ` ${input} `;
      }
      else if (signEntered == "") { //if sign hasn't been entered in equation add sign 
        display.textContent = display.textContent + ` ${input} `;
        signEntered = input;
      }else { //if sign is already in equation call operate and append new sign to result
        operate(firstNum, secondNum, signEntered);
        operated = false;
        secondNum = "";
        secondDecimal = false;
        signEntered = input;
        display.textContent = display.textContent + ` ${input} `;

      }
    }
      
    else if(input == '=' || input == 'Enter') {

      if(firstNum == "" || secondNum == "") return; //make sure firstnum and secondnum are valid or else do nothing

      operate(firstNum, secondNum, signEntered);
      operated = true;

    }
    else if(input == '.') {
      if(operated){
        clear();
      } 
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
    else { //all digits handled here, special case if 0 is first digit, then can only be followed up with operator or decimal
      if(operated){
        clear();
      } 
      if(signEntered == "") {
        if((firstNum[0] == '0' && firstNum[1] != '.') || (firstNum[0] == '-' && firstNum[1] == '0')) {
          firstNum = firstNum.slice(0,-1);
          display.textContent = display.textContent.slice(0,-1);
        }
      }else if(signEntered != "") {
        if((secondNum[0] == '0' && secondNum[1] != '.') || (secondNum[0] == '-' && secondNum[1] == '0')) {
          secondNum = secondNum.slice(0,-1);
          display.textContent = display.textContent.slice(0,-1);  
        }       
      }
      display.textContent = display.textContent + input;
      if(signEntered == "") {
        firstNum += input;
      }
      else {
        secondNum += input;
      }
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

