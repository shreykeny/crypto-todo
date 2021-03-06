import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Friend extends Component {



    render() {
        return (
            <div>

            <Form onSubmit={(event) => {
            event.preventDefault();
            console.log(this.id.value);
            this.props.deleteTask(this.id.value);
        }}>
          
                <Form.Control className="friend__page" type="text" placeholder="Friend's task ID" ref={(input) => this.id = input} required/> 
            
                {/* <Form.Control className="friend__page" type="text" placeholder="Contract Address" ref={(input) => this.task = input} required/>  */}

        
                {/* <Col> <Form.Control className="friend__address__input" type="text" placeholder="Friend 1" ref={(input) => this.friend1 = input} required/> </Col>
                <Col> <Form.Control className="friend__address__input" type="text" placeholder="Friend 2" ref={(input) => this.friend2 = input} required/> </Col>
                <Col> <Form.Control className="friend__address__input" type="text" placeholder="Friend 3" ref={(input) => this.friend3 = input} required/> </Col> */}

                <Button className="todo__submit" as="input" type="submit" value="Submit"/>{' '}

                </Form>
                
            </div>
        )
    }
}

 export default Friend;