import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      newTaskName: '',
      tasks: [
        { name: '1', stage: 0 },
        { name: '2', stage: 0 },
      ]
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  arrowForwardHandler = (taskname, stageIndex) => {
    let newStage = stageIndex + 1
    this.setState((prevState) => ({ ...prevState, tasks: this.state.tasks.map((i, index) => i.name == taskname ? { ...i, stage: newStage } : { ...i }) }))
  }

  arrowBackwardHandler = (taskname, stageIndex) => {
    let newStage = stageIndex - 1
    this.setState((prevState) => ({ ...prevState, tasks: this.state.tasks.map((i, index) => i.name == taskname ? { ...i, stage: newStage } : { ...i }) }))
  }

  onChangeHandler = event => {
    this.setState({ newTaskName: event.target.value })
  }

  createTaskHandler = () => {
    if (!(this.state.tasks.some(item => item.name === this.state.newTaskName))) {
      if (this.state.newTaskName) {
        let newtask = { name: this.state.newTaskName, stage: 0 }
        const updatedTasks = [...this.state.tasks]
        updatedTasks.push(newtask)
        this.setState({ tasks: updatedTasks })
        this.setState({ newTaskName: '' })
      }
    }
  }

  deleteTaskHandler = (taskname, i) => {
    let taskCopy = [...this.state.tasks];
    let index = taskCopy.findIndex(i => i.name === taskname)
    if (index !== -1) {
      taskCopy.splice(index, 1);
      this.setState({ tasks: taskCopy });
    }
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }
    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input id="create-task-input" type="text" value={this.state.newTaskName} className="large" placeholder="New task name" data-testid="create-task-input" onChange={this.onChangeHandler} />
          <button type="submit" className="ml-30" data-testid="create-task-button" onClick={this.createTaskHandler}>Create task</button>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                          <div className="icons">
                            <button disabled={i === 0} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`} onClick={(e) => this.arrowBackwardHandler(task.name.split(' ').join('-'), i)}>
                              <i className="material-icons">arrow_back</i>
                            </button>
                            <button disabled={i === 3} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`} onClick={(e) => this.arrowForwardHandler(task.name.split(' ').join('-'), i)}>
                              <i className="material-icons">arrow_forward</i>
                            </button>
                            <button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`} onClick={() => this.deleteTaskHandler(task.name, i)}>
                              <i className="material-icons">delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}