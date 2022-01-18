export default function Die(props) {
    return (
        <div className={props.active ? "die active-die" : "die"} 
             onClick={() => props.toggle(props.id)}>
            <p className="die-value">
                {props.value}
            </p>
        </div>
    )
}