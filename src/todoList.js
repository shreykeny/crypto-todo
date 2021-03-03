import React, {Component} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


class TodoList extends Component {

  render() {
    return (
      <div className="container">
        <Form onSubmit={(event) => {
            event.preventDefault();
            this.props.addTask(this.task.value, this.friend1.value, this.friend2.value, this.friend3.value);
        }}>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Add your to-do here : </Form.Label>
    <Form.Control type="text" placeholder="Buy masks and hand sanitiser" ref={(input) => this.task = input} required/>
    <Form.Label>Add friend 1's address :  </Form.Label>
    <Form.Control type="text" placeholder="Friend 1" ref={(input) => this.friend1 = input} required/>
    <Form.Label>Add friend 2's address :  </Form.Label>
    <Form.Control type="text" placeholder="Friend 2" ref={(input) => this.friend2 = input} required/>
    <Form.Label>Add friend 3's address :  </Form.Label>
    <Form.Control type="text" placeholder="Friend 3" ref={(input) => this.friend3 = input} required/>

  </Form.Group>

  <Button as="input" type="submit" value="Submit"/>{' '}
</Form>

<h2> Your Tasks </h2>
{
  this.props.tasks.map((task,key) => {
    // console.log(task)
    return(
    <div key={key + 1}>
      <div className="todo-list">
        {/* <input type="checkbox" defaultChecked={task.completed} name={task.id} ref={(input) => {this.checkbox = input}} onClick={(event) => this.props.deleteTask(task.id)}/> */}
        <h3> {key + 1} : {task.content} </h3> 
        <br />
        <div> status : 
          <div> {task.friend1} </div> 
          <div> {task.friend2} </div> 
          <div> {task.friend3} </div> 


          </div>
      </div>
    </div>
    )
  })
}

      </div>
    );
  }



}

export default TodoList;
