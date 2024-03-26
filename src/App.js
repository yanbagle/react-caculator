import React, { useState } from "react";
import "./App.css";
import InputDisplay from "./components/input-display";
import Button from "./components/button";
import Row from "./components/row";

function App() {
  const [display, setDisplay] = useState(0);
  const [total, setTotal] = useState(null);
  const [currentInput, setCurrentInput] = useState([]);
  const [operator, setOperator] = useState(null);
  const [hasPreviouslySetOperator, setHasPreviouslySetOperator] =
    useState(false);
  const inputSizeLimit = 9;

  const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  const inputClick = (btnValue) => {
    if (display.length >= inputSizeLimit && typeof btnValue === "number") {
      return;
    }

    if (btnValue === "C") {
      reset();
    } else if (btnValue === "+-") {
      const currNum = +currentInput.join("");
      if (currNum > 0) {
        const neg = Math.abs(currNum) * -1;
        setCurrentInput([neg]);
        setDisplay(neg);
      } else {
        const pos = Math.abs(currNum);
        setCurrentInput([pos]);
        setDisplay(pos);
      }
    } else if (btnValue === "%") {
      const percentage = +currentInput.join("") / 100;
      setCurrentInput([percentage]);
      setDisplay(percentage);
    } else if (typeof btnValue === "number") {
      const inputArr = [...currentInput, btnValue];
      setCurrentInput(inputArr);
      setDisplay(+inputArr.join(""));
      setHasPreviouslySetOperator(false);
    } else if (typeof btnValue === "string") {
      if (hasPreviouslySetOperator) {
        setOperator(btnValue);
        return;
      }
      const runningTotal = doMath(total, +currentInput.join(""), btnValue);
      setTotal(runningTotal);
      setDisplay(runningTotal);
      setCurrentInput([]);
      setOperator(btnValue);
      setHasPreviouslySetOperator(true);
    }
  };

  const doMath = (num1, num2, currentOperator) => {
    if (currentOperator === "+") {
      return num1 + num2;
    } else if (currentOperator === "-") {
      if (num1 === null) {
        return num2;
      }
      return num1 - num2;
    } else if (currentOperator === "X") {
      if (num1 === null) {
        num1 = 1;
      }
      return num1 * num2;
    } else if (currentOperator === "/") {
      if (num1 === null) {
        return num2;
      }
      return num1 / num2;
    } else if (currentOperator === "=") {
      return doMath(num1, num2, operator);
    }
  };

  const reset = () => {
    setCurrentInput([]);
    setDisplay(0);
    setOperator(null);
    setTotal(null);
  };

  const renderBtnRow = () => {
    return btnValues.map((btnValue, index) => (
      <Row key={index}>
        {btnValues[index].map((btnValue, innerIdx) => (
          <Button
            key={innerIdx}
            inputClick={inputClick}
            equalButton={btnValue === "=" ? true : false}
          >
            {btnValue}
          </Button>
        ))}
      </Row>
    ));
  };

  return (
    <div className="flex justify-center">
      <div className="w-[34rem] h-[41rem] border-double border-2 border-indigo-700 rounded px-2 py-2 [&>*]:py-1 bg-indigo-200">
        <InputDisplay total={display}></InputDisplay>
        {renderBtnRow()}
      </div>
    </div>
  );
}

export default App;
