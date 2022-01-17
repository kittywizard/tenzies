export default function Die(props) {
    console.log(props)
    return (
        <div className="die">
            <p className="die-value">
                {props.value}
            </p>
        </div>
    )
}