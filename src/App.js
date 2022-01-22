import React from "react";
import Die from "./Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
import HighScores from "./HighScores";

function App() {
  const dieLength = 10;
  const min = 1;
  const max = 6;
  let diceArray;
  let randomNum = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

  const [die, setDie] = React.useState([]);
  const [tenzies, setTenzies] = React.useState(false);
  const [rollTracker, setRollTracker] = React.useState(1);
  const [scoreboard, setScoreboard] = React.useState(JSON.parse(localStorage.getItem('scoreboard')) || rollTracker);

  //check each time the die array changes to see if there's a win
  React.useEffect(() => {
    //potentially set this to a variable and then check it
    die.every(element => {
      return element.active &&
      element.value == die[0].value
    }) ? setTenzies(true) : setTenzies(false)

  }, [die])

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
    //check for win condition first
    if(tenzies) {
      window.location.reload();
    }

    //update state if not
    setDie(prevState => prevState.map(die => {
      return !die.active ? {...die, value: randomNum(min, max)} : die
     }))

     //update roll count
     setRollTracker(prevState => prevState + 1);
  }

  function toggle(id) {
    setDie(prevState => prevState.map(die => {
        return id === die.id ? {...die, active: !die.active} : die
    }))
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
      {tenzies && <Confetti />}
      <h3 className="header">Tenzies</h3>
      <p className="subhead">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
          {dieDisplay}
      </div>
      <button 
        className="btn"
        onClick={rollDice}>
         {tenzies ? "New Game" : "Roll"}
        </button>

      {rollTracker > 1 &&
          <div className="roll-count">
          {tenzies ? "You won on Roll #" : "You're on Roll #"}
          {rollTracker}
          </div>
      }


      {/* {scoreboard.length > 1 && */}
            <HighScores 
              rolls={rollTracker}
              tenzies={tenzies}
              scoreboard={scoreboard}
              setScoreboard={setScoreboard}
            />
      
    </main>
  );
}

export default App;
