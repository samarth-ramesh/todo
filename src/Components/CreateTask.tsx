import "./create.css"
import {FiPlusCircle} from "react-icons/fi";

function CreateTask() {
    return (
        <div className={"create_holder"}>
            <FiPlusCircle/>
            <input type={"text"} maxLength={255} placeholder={"Add a task"}/>
        </div>
    )
}

export default CreateTask