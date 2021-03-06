import React, {Component} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Completed from './completed.svg'
import WIP from './WIP.svg'


class TodoList extends Component {

  componentDidMount() {

  }

 constructor(props) {
   super(props);
   this.state = {
     friend1 : false,
     friend2 : false,
     friend3 : false
   }
 }

  checkStatus = (key) => {
    console.log(this.props.status[key]);

    setTimeout(() => {
      this.setState({
        friend1 : this.props.status[key].status1,
        friend2 : this.props.status[key].status2,
        friend3 : this.props.status[key].status3
      })
    }, 2000)

  }

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

        <Row> 
          <Col> Friend 1 : <span id="friend1__status"> {this.state.friend1 ? <span> ✅ </span> : <span> ⚙️ </span>} </span> </Col> 
          <Col> Friend 2 : <span id="friend2__status"> {this.state.friend2 ? <span> ✅ </span> : <span> ⚙️ </span>}</span></Col> 
          <Col> Friend 3 : <span id="friend3__status"> {this.state.friend3 ? <span> ✅ </span> : <span> ⚙️ </span>}</span></Col> 

        </Row>

        <br />

<h2> Your Tasks </h2>
{
this.props.tasks.map((task,key) => {
    // console.log(key)
    return(
    <div key={key + 1}>
      <div className="todo-list">
        {/* <input type="checkbox" defaultChecked={task.completed} name={task.id} ref={(input) => {this.checkbox = input}} onClick={(event) => this.props.deleteTask(task.id)}/> */}
        <button className="todo__refresh" onClick={() => this.checkStatus(key)}> 🔄 </button>
        <Col>
          <Row>  <h3>  {key + 1}: {task.completed ? <span> <img src={Completed} width="30px" height="30px"/> </span> : <span> <img src={WIP} width="30px" height="30px"/> </span>} {task.content} </h3> </Row>
    
          <Col> {task.friend1} </Col> 
          <Col>  {task.friend2} </Col> 
          <Col>  {task.friend3} </Col> 
       
        </Col>

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
