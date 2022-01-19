import React from "react";
import Die from "./Die";
import {nanoid} from "nanoid";

function App() {
  const dieLength = 10;
  const min = 1;
  const max = 6;
  let diceArray;
  let randomNum = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

  const [die, setDie] = React.useState([]);

  //this should run only once - set up the initial dice rolls upon initial page render
  React.useEffect(() => {
    diceArray = [];

    for(let i = 0; i < dieLength; i++) {
      diceArray.push({
        value: randomNum(min, max),
        id: i+1,
        key: nanoid(),
        active: false
      });
   } 

   setDie(diceArray);
  }, [diceArray]);

  function rollDice() {
    setDie(prevState => prevState.map(die => {
      return !die.active ? {...die, value: randomNum(min, max)} : die
     }))
  }

  let isWinner = false;

  function toggle(id) {
    setDie(prevState => prevState.map(die => {
        return id === die.id ? {...die, active: true} : die
    }))
    //check for win condition after all variables return an active:true state
    let winnerCheck = 0;
    for(let v = 0; v < die.length; v++) {
        if(die[v].active) {
          winnerCheck++;
          console.log('updating winner ' + winnerCheck)
      } else {
        break;
        //break out of this loop
        }
    }

    //at the end of the loop, check to see if 
    winnerCheck === 10 ? console.log('you win!') : isWinner = false;
  }

  //pass in just the object?
 let dieDisplay = die.map(die => {
    return <Die 
      value={die.value}
      key={die.key}
      id={die.id}
      active={die.active}
      setDie={setDie}
      toggle={toggle}
    />
  })

  return (
    <main className="app">
      <h3 className="header">Tenzies</h3>
      <p className="subhead">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
          {dieDisplay}
      </div>
      <button 
        className="btn"
        onClick={rollDice}>
         {isWinner ? "Start over" : "Roll"}
        </button>
    </main>
  );
}

export default App;
