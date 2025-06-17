let firstNum = "";
let secondNum = "";
let equation = "";
function output(input){
    const display = document.querySelector(".input");
    if(input == "clear" || input == "Escape") {
        display.textContent = "";
        equation = "";
    }else if(input == "delete" || input == "Backspace") {
      display.textContent = display.textContent.slice(0,-1);
      equation = equation.slice(0, -1);
    }else if(input == '+' || input == '-' ||input == '/' ||input == '*') {
      display.append(` ${input} `);
      equation += input;
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


