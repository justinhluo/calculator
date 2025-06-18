let firstNum = "";
let secondNum = "";
let equation = "";
let signEntered = false; // checks if sign in equation, if true and another sign inputted, call operate
function output(input){
    const display = document.querySelector(".input");
    if(input == "clear" || input == "Escape") {
        display.textContent = "";
        equation = "";
        secondNum = "";
        equation = "";
    }else if(input == "delete" || input == "Backspace") {
      display.textContent = display.textContent.trim().slice(0,-1);
      equation = equation.slice(0, -1);
    }else if(input == '+' || input == '-' ||input == '/' ||input == '*') {
      if(!parseInt(equation[equation.length-1])) { //if last input is sign, change sign instead of adding another sign
        display.textContent = display.textContent.trim().slice(0, -1) + ` ${input} `;
        equation = equation.slice(0, -1) + input;
      }else if (!signEntered) { //if sign hasn't been entered in equation add sign 
        display.append(` ${input} `);
        equation += input;
      }else { //if sign is already in equation and last input wasn't sign call operate and add sign to result
        //operate
      }
      
    }else if(input == '=' || input == 'Enter') {
      //operate()
    }
    else {
        display.append(input);
        equation += input;
    }
}


document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  
  if(['1','2','3','4','5','6','7','8','9','0','Backspace', 'Escape', 'Enter', '+' , '-', '*', '/', '.', '='].includes(e.key))
  
    output(e.key);

});


document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        output(button.textContent.trim());
    });
});

//if equation is empty, first char MUST be digit, decimal, or -
//
//console.log(parseInt('s'));

