import "./create.css"
import {FiCircle, FiPlusCircle} from "react-icons/fi";
import React, {useState} from "react";

function CreateTask(props) {
    const [text, setText] = useState("")

    const onChange = (e) => {
        setText(e.target.value)
    }

    const [focussed, setFocussed] = useState(false)
    const toggleFocus = (_) => {
        setFocussed((prevState => !prevState))
    }

    const add = () => {
        props.add(text)
    }

    return (
        <div className={"create_holder"}>
            {focussed || (text !== "") ? <FiCircle/> : <FiPlusCircle/>}
            <input type={"text"} maxLength={255} placeholder={"Add a task"} value={text} onChange={onChange}
                   onFocus={toggleFocus} onBlur={toggleFocus}
                   className={text === "" ? "create_empty_input" : "create_filled_input"}/>
            {text === "" ? null : <button onClick={add}>ADD</button>}
        </div>
    )
}

export default CreateTask
