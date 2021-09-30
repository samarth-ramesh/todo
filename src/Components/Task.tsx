import React from "react";
import axios, {AxiosResponse} from "axios";
import {BASE_PATH} from "../globals";

import "./task.css"

interface TaskProps {
    task: TaskItem,
    markAsDone: (arg1: TaskItem) => void
}


class Task extends React.Component<TaskProps, any> {

    constructor(props: TaskProps) {
        super(props);
        this.ocf = this.ocf.bind(this)
    }

    ocf() {
        this.props.markAsDone({...this.props.task, completed:true})
    }

    render() {
        return (
            <div className={"task_item"}>
                <div className={"task_left"}>
                    <div className={"task_icon_holder"} onClick={this.ocf}>
                        <i className={this.props.task.completed ? "far fa-check-circle" : "far fa-circle"}/>
                    </div>
                    <div
                        className={this.props.task.completed ? "task_item_completed" : undefined}>{this.props.task.title}
                    </div>
                </div>
                <div className={"task_item_delete"}>
                    <i className="far fa-trash-alt"/>
                </div>
            </div>
        );
    }
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
        this.markAsDone = this.markAsDone.bind(this)
    }

    componentDidMount() {
        axios.get<null, AxiosResponse<TaskItem[]>>(BASE_PATH + "todos/").then(value => {
            this.setState({tasks: value.data})
        })
    }

    markAsDone(task: TaskItem) {
        axios.put<TaskItem>(BASE_PATH + "todos/" + task.id, {...task, completed: true}).then(response => {
            for (let i = 0; i < this.state.tasks.length; i++) {
                if (this.state.tasks[i].id === task.id) {
                    const newState = [...this.state.tasks];
                    newState[i] = response.data
                    this.setState({tasks: newState})
                    break;
                }
            }
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
                    })).map((value, index) => {
                        return <Task key={index} task={value} markAsDone={this.markAsDone}/>
                    })
                }
            </div>
        )
    }
}

export default Tasks