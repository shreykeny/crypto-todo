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
            this.props.addTask(this.task.value);
        }}>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Add your to-do here : </Form.Label>
    <Form.Control type="text" placeholder="Buy masks and hand sanitiser" ref={(input) => this.task = input} required/>
  </Form.Group>

  <Button as="input" type="submit" value="Submit" />{' '}
</Form>

<h2> Your Tasks </h2>
{
  this.props.tasks.map((task,key) => {
    return(
    <div>
      <div className="todo-list">
        {/* <input type="checkbox" defaultChecked={task.completed} name={task.id} ref={(input) => {this.checkbox = input}} onClick={(event) => this.props.deleteTask(task.id)}/> */}
        <h3> {key + 1} : {task.content} </h3> 
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
