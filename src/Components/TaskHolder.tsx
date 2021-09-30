import React from "react";
import {TaskItem} from "../vite-env";
import axios, {AxiosResponse} from "axios";
import {BASE_PATH} from "../globals";
import Task from "./Task";

import "./task.css"


class Tasks extends React.Component<any, { tasks: TaskItem[] }> {

    constructor(props: any) {
        super(props);
        this.state = {tasks: []}
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    delete(task: TaskItem){
        axios.delete(BASE_PATH + "todos/" + task.id).then(_ => { // we can ignore value ass it returns an empty obj
            this.setState((prevState) => ({
                tasks: prevState.tasks.filter((newTask) => {
                    return newTask.id !== task.id
                })
            }))
        })
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
                        return <Task key={value.id} task={value} update={this.update} delete={this.delete}/>
                    })
                }
                </div>
        )
    }
}

export default Tasks