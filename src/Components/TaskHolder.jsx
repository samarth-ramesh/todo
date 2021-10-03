import React from "react";
import axios from "axios";
import {BASE_PATH} from "../globals";
import Task from "./Task";

import "./task.css"
import CreateTask from "./CreateTask";


class Tasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tasks: []}
        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }


    componentDidMount() {
        this.read()
    }

    create(title) {
        axios.post(BASE_PATH + "todos", {
            title: title,
            userId: 1,
            completed: false
        }).then(({data}) => {
            this.setState((prevState) => ({
                tasks: [...prevState.tasks, data]
            }))
        })
    }

    read() {
        axios.get(BASE_PATH + "todos/").then(value => {
            this.setState({tasks: value.data})
        })
    }

    update(task) {
        axios.put(BASE_PATH + "todos/" + task.id, task).then(({data}) => {
            this.setState((prevState) => ({
                tasks: prevState.tasks.map(task => {
                    return data.id === task.id ? data : task
                })
            }))
        }).catch(reason => {
            console.log(reason)
        })
    }

    delete(task) {
        axios.delete(BASE_PATH + "todos/" + task.id).then(_ => { // we can ignore value ass it returns an empty obj
            this.setState((prevState) => ({
                tasks: prevState.tasks.filter((newTask) => {
                    return newTask.id !== task.id
                })
            }))
        })
    }


    render() {
        return (
            <div className={"task_item_holder"}>
                <h1 className={"title_mobile"}>ToDo</h1>
                <h1 className={"title_desktop"}>ToDo List</h1>
                <CreateTask add={this.create}/>
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
