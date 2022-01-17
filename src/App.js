import React from "react";
import Die from "./Die";

function App() {
  const dieLength = 10;
  const min = 1;
  const max = 6;
  let diceArray = [];
  
  for(let i = 0; i < dieLength; i++) {
      //generate random number
      let randomNum = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

      diceArray.push({
        value: randomNum(min, max),
        id: i
      });
      //console.log(diceArray)
  }

const [die, setDie] = React.useState(diceArray);

 let dieDisplay = die.map(die => {
    return <Die 
      value={die.value}
      key={die.id}
      setDie={setDie}
    />
  })

  console.log(die);

  return (
    <main className="app">
      <h3 className="header">Tenzies</h3>
      <p className="subhead">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
          {dieDisplay}
      </div>
    </main>
  );
}

export default App;
