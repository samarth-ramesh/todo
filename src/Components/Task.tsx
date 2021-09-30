import React, {useState} from "react";
import axios, {AxiosResponse} from "axios";
import {BASE_PATH} from "../globals";

import "./task.css"
import '@szhsin/react-menu/dist/index.css';
import 'react-responsive-modal/styles.css';

import {ControlledMenu, MenuItem, useMenuState} from "@szhsin/react-menu";
import {FiCheckCircle, FiCircle, FiEdit2, FiTrash} from "react-icons/fi";
import Modal from "react-responsive-modal";

interface TaskProps {
    task: TaskItem,
    update: (arg1: TaskItem) => void
}


function Task(props: TaskProps) {

    const ocf = () => {
        props.update({...props.task, completed: !props.task.completed})
    }

    const {toggleMenu, ...menuProps} = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({x: 0, y: 0});

    const [modalOpen, setModalOpen] = useState(false)
    const [title, setTitle] = useState(props.task.title)

    const editTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
                <MenuItem><FiTrash/> Delete </MenuItem>
            </ControlledMenu>

            <Modal open={modalOpen} onClose={toggleModal} center={true}>
                <h1>Edit!</h1>
                <input value={title} onChange={editTitle} onKeyDown={handleEnter}/>
            </Modal>
        </div>
    );
}

interface TaskItem {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

class Tasks extends React.Component<any, { tasks: TaskItem[] }> {

    constructor(props: any) {
        super(props);
        this.state = {tasks: []}
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        axios.get<null, AxiosResponse<TaskItem[]>>(BASE_PATH + "todos/").then(value => {
            this.setState({tasks: value.data})
        })
    }

    update(task: TaskItem) {
        axios.put<TaskItem>(BASE_PATH + "todos/" + task.id, task).then(({data}) => {
            this.setState((prevState) => ({
                tasks: prevState.tasks.map(task => {
                    return data.id === task.id ? data : task
                })
            }))
        }).catch(reason => {
            console.log(reason)
        })
    }

    render() {
        return (
            <div className={"task_item_holder"}>
                {
                    this.state.tasks.sort(((a, b) => {
                        if (a.completed && !b.completed) {
                            return 1
                        } else if (!a.completed && b.completed) {
                            return -1
                        } else {
                            return 0
                        }
                    })).map((value) => {
                        return <Task key={value.id} task={value} update={this.update}/>
                    })
                }
            </div>
        )
    }
}

export default Tasks