import React, { useState } from "react";
import "./App.css";
import InputDisplay from "./components/input-display";
import Button from "./components/button";
import Row from "./components/row";

function App() {
  const [total, setTotal] = useState(0);
  const [inputStack, setInputStack] = useState([]);

  const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  const inputClick = (btnValue) => {
    setInputStack([...inputStack, btnValue]);
    setTotal(btnValue);
    console.log(btnValue);
  };

  const renderBtnRow = () => {
    return btnValues.map((btnValue, index) => (
      <Row key={index}>
        {btnValues[index].map((btnValue, innerIdx) => (
          <Button key={innerIdx} inputClick={inputClick}>
            {btnValue}
          </Button>
        ))}
      </Row>
    ));
  };

  return (
    <div className="flex justify-center">
      <div className="w-[34rem] h-[41rem] border-double border-2 border-indigo-700 rounded px-2 py-2 [&>*]:py-1 bg-indigo-200">
        <InputDisplay total={total}></InputDisplay>
        {renderBtnRow()}
      </div>
    </div>
  );
}

export default App;
