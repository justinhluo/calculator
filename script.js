let firstNum = "";
let secondNum = "";
let signEntered = ""; // checks if sign in equation, if true and another sign inputted, call operate
let firstDecimal = false;
let secondDecimal = false;
let operated = false;
const display = document.querySelector(".input");
const history = document.querySelector(".pastInput");
const screen =  document.querySelector(".screen");

function formatNum(num) { 

  num = parseFloat(num);

  if(Math.abs(num) !=0 && (Math.abs(num) >= 1e+8 || Math.abs(num) <= 1e-8)) {

    return num.toExponential(8).toString().replace(/\.?0+e/, 'e');
  }
  else if (num > 0 && num.toString().length >= 9 || num < 0 && num.toString().length >= 10) {

      return (num.toPrecision(8)).toString().replace(/(\.\d*?[1-9])0+$/g, '$1').replace(/\.0+$/g, '');
  }

   else {
      return num.toString();
   }
}


function operate() {
  let result;

  if(firstNum[firstNum.length-1] == '.') firstNum = firstNum.slice(0,-1);
  if(secondNum[secondNum.length-1] == '.') secondNum = secondNum.slice(0,-1);

  firstNum = formatNum(firstNum);
  secondNum = formatNum(secondNum);
  
  const a = new Decimal(parseFloat(firstNum));
  const b = new Decimal(parseFloat(secondNum));


  history.textContent = `${firstNum} ${signEntered} ${secondNum}`
  
  
  if(signEntered == '+') {
    
    result = (a.plus(b));
  }
  if(signEntered == '-') {
  
    result =  (a.minus(b));
  }
  if(signEntered == '/') {
  
    result =  (a.div(b));
  }
  if(signEntered == '*') {
  
    result =  (a.times(b));
  }
  
  firstNum = formatNum(result.toString()); 
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

      if(firstNum == "") {
        if(input == '-') {
          display.textContent = display.textContent + '-'
          firstNum += '-';
        }
        return;
      }

      if(firstNum == '-') return;
       
      if(display.textContent[display.textContent.length-1] == " ") { //if last input is sign, change sign instead of adding another sign
        signEntered = input;
        display.textContent = display.textContent.slice(0, -3) + ` ${input} `;
        return;
      }
      if (signEntered == "" && firstNum != "-" && firstNum != "") { //if sign hasn't been entered in equation add sign 
        display.textContent = display.textContent + ` ${input} `;
        signEntered = input;
        return;
      } //if sign is already in equation call operate and append new sign to result
      
      operate();
      operated = false;
      secondNum = "";
      secondDecimal = false;
      signEntered = input;
      display.textContent = display.textContent + ` ${input} `;
 
    }
  
      
    else if(input == '=' || input == 'Enter') {

      if(firstNum == "" || secondNum == "") return; //make sure firstnum and secondnum are valid or else do nothing

      operate();
      operated = true;

    }
    else if(input == '.') {
      if(operated){
        clear();
      } 
      if(signEntered == "" && !firstDecimal){
        firstDecimal = true;
        if(firstNum == "" || (firstNum[0] == '-' && firstNum.length == 1)) {
          firstNum += '0.';
          display.textContent = display.textContent + '0.';
        }else {
          firstNum += '.';
          display.textContent = display.textContent + '.';
        }
      }else if(signEntered != "" && !secondDecimal) {
        secondDecimal = true;
        if(secondNum == "" || (secondNum[0] == '-' && secondNum.length == 1)) {
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
        if((firstNum[0] == '0' && firstNum.length == 1) || (firstNum[0] == '-' && firstNum[1] == '0' && firstNum.length == 2)) {
          firstNum = firstNum.slice(0,-1);
          display.textContent = display.textContent.slice(0,-1);
        }
      }else if(signEntered != "") {
        if((secondNum[0] == '0' && secondNum.length == 1) || (secondNum[0] == '-' && secondNum[1] == '0' && secondNum.length == 2)) {
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

