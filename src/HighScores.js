import React from "react";

export default function HighScores(props) {

    React.useEffect(() => {
        //check what current state is
        props.setScoreboard(prevScores => {
            return prevScores < props.rolls ? prevScores : props.rolls;
            //unless its the initial state aaahhrrh
        });

        localStorage.setItem('scoreboard', JSON.stringify(props.scoreboard))
    }, [props.tenzies]);

    // let scoreDisplay = props.scoreboard.map(score => {
    //     return <li>{score}</li>
    // })

    return (
        <div className="scores">
            <h2>High Score</h2>
            <ol>
                <li>{props.scoreboard}</li>
                {/* {scoreDisplay} */}
            </ol>
        </div>
    )
}