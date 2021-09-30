import React from "react";
import axios, {AxiosResponse} from "axios";
import {BASE_PATH} from "../globals";

import "./task.css"

class Task extends React.Component<{ task: TaskItem }, any> {
    render() {
        return (
            <tr className={"task_item"}>
                <td>{this.props.task.completed ? <i className="far fa-check-circle"/> :
                    <i className="far fa-circle"/>}</td>
                <td>{this.props.task.title}</td>
            </tr>
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
    }

    componentDidMount() {
        axios.get<null, AxiosResponse<TaskItem[]>>(BASE_PATH + "todos/").then(value => {
            this.setState({tasks: value.data})
        })
    }

    render() {
        return (
            <table className={"task_item_holder"}>
                <tbody className={"task_item_holder"}>
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
                        return <Task key={index} task={value}/>
                    })
                }
                </tbody>
            </table>
        )
    }
}

export default Tasks