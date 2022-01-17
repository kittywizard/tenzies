import React from "react";
import Die from "./Die";

function App() {
  const dieLength = 10;
  
  const [die, setDie] = React.useState(1);


  return (
    <main className="app">
      <h3 className="header">Tenzies</h3>
      <p className="subhead">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
          <Die value={1} />
          <Die value={5} />
      </div>
    </main>
  );
}

export default App;
