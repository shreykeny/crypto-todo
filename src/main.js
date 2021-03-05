import React, { Component } from 'react';
import TodoList from './todoList';


class Main extends Component {
    render() {
        return(
            <div> 

<div className="container">

<p> Your account address : {this.props.state.account} </p>
<p> Your network is : {this.props.state.network} </p>
<p> Task count : {this.props.state.taskCount} </p>
<p> Your Portis Acc. Balance : {this.props.state.balance} ETH </p>
<p> <strong> By default amount to be paid is 0.03 ETH </strong></p>

  {this.props.state.loading ? <h1> Loading.. </h1>: <TodoList tasks={this.props.state.tasks} addTask= {this.props.addTask} deleteTask={this.props.deleteTask}/>}

</div>
                
            </div> 
        )
    }
}

export default Main;