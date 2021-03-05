import React, {Component} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class TodoList extends Component {

  render() {
    return (
      <div className="container">
        <div className="todo__section"> 
        <Form onSubmit={(event) => {
            event.preventDefault();
            this.props.addTask(this.task.value, this.friend1.value, this.friend2.value, this.friend3.value);
        }}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <div>
              <Form.Control className="friend__address__input" type="text" placeholder="Add your todo in here " ref={(input) => this.task = input} required/> 
            </div>

            <div className="friends"> 
              <Row> 
                <Col> <Form.Control className="friend__address__input" type="text" placeholder="Friend 1" ref={(input) => this.friend1 = input} required/> </Col>
                <Col> <Form.Control className="friend__address__input" type="text" placeholder="Friend 2" ref={(input) => this.friend2 = input} required/> </Col>
                <Col> <Form.Control className="friend__address__input" type="text" placeholder="Friend 3" ref={(input) => this.friend3 = input} required/> </Col>

              <Button className="todo__submit" as="input" type="submit" value="Submit"/>{' '}
              </Row>
            </div>
          </Form.Group>

        </Form>
        </div>

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
          {/* <div> {task.friend1} </div> 
          <div> {task.friend2} </div> 
          <div> {task.friend3} </div>  */}


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
