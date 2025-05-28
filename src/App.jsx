import { useState } from 'react';
import './App.css';
import { evaluate } from 'mathjs';

function App() {
  const [input, setInput] = useState(""); //useState to store the input

  const buttons = [
    "AC", "/", "*", "Del",
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3", "=",
    "0", ".",
  ];

  const handleClick = (value) => {
    if (value === "AC") {
      setInput("");
    } else if (value === "Del") {
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      try {
        //setInput(eval(input).toString()); // eval() to calculate the result <-- This is where eval() is used and 
        //toString() converts the number back into a string to update the input display.
        //eval(input) calculates the result → 4 + 5 * 2 = 14

        const result = evaluate(input);
        setInput(result.toString());
      } catch (error) {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-green-500 tracking-[1%] mb-4">
          React Calculator
        </h1>

        <div className="w-[50%] mx-auto border border-purple-600 p-4 rounded">
          {/* Display input */}
          <input
            type="text"
            value={input}
            readOnly //A read-only <input> to display the current value
            className="w-full mb-4 p-3 text-right text-2xl border rounded bg-gray-100"
          />

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-4">
            {buttons.map((btn, i) => (
              <button
                key={i}
                onClick={() => handleClick(btn)}
                className={`px-4 py-3 rounded font-semibold text-lg ${btn === "="
                  ? "bg-blue-500 text-white"
                  : btn === "AC"
                    ? "bg-red-500 text-white"
                    : btn === "Del"
                      ? "bg-yellow-500 text-white"
                      : "bg-black text-white"
                  } hover:opacity-80`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

