import React, {useState} from "react";

import "./task.css"
import '@szhsin/react-menu/dist/index.css';
import 'react-responsive-modal/styles.css';

import {ControlledMenu, MenuItem, useMenuState} from "@szhsin/react-menu";
import {FiCheckCircle, FiCircle, FiEdit2, FiTrash} from "react-icons/fi";
import Modal from "react-responsive-modal";



function Task(props) {

    const ocf = () => {
        props.update({...props.task, completed: !props.task.completed})
    }

    const deleteItem = () => {
        props.delete(props.task)
    }

    const {toggleMenu, ...menuProps} = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({x: 0, y: 0});

    const [modalOpen, setModalOpen] = useState(false)
    const [title, setTitle] = useState(props.task.title)

    const editTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleEnter = (e) => {
        if (e.code === "Enter") {
            toggleModal()
        }
    }

    const toggleModal = () => {
        toggleMenu(false)
        setModalOpen(!modalOpen)
        props.update({...props.task, title: title})
    }

    return (
        <div className={"task_item"} onContextMenu={e => {
            e.preventDefault()
            setAnchorPoint({x: e.clientX, y: e.clientY})
            toggleMenu(true)
        }}>
            <div className={"task_left"}>
                <div className={"task_icon_holder"} onClick={ocf}>
                    {props.task.completed ? <FiCheckCircle/> : <FiCircle/>}
                </div>
                <div
                    className={props.task.completed ? "task_item_completed" : undefined}>{title}
                </div>
            </div>

            <ControlledMenu {...menuProps} anchorPoint={anchorPoint}
                            onClose={() => toggleMenu(false)}>
                <MenuItem onClick={toggleModal}><FiEdit2/> Edit </MenuItem>
                <MenuItem onClick={deleteItem}><FiTrash/> Delete </MenuItem>
            </ControlledMenu>

            <Modal open={modalOpen} onClose={toggleModal} center={true}>
                <h1>Edit!</h1>
                <input value={title} onChange={editTitle} onKeyDown={handleEnter}/>
            </Modal>
        </div>
    );
}


export default Task
