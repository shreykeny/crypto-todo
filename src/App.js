import React, {Component} from 'react';
import './App.css';
import Web3 from 'web3';
import {TODO_LIST_ABI, TODO_LIST_ADDRESS} from './config.js';

import TodoList from './todoList';
import Main from './main';
import Friend from './friend';

import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Portis from '@portis/web3';
import Navbar from 'react-bootstrap/Navbar';
import Logo from './logo.svg';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account : '',
      network : '',
      taskCount : '0',
      tasks : [],
      loading : true, 
      portis : null,
      friend1 : '',
      friend2 : '', 
      friend3 : '', 
      login : false,
      status : []
    }

    this.addTask = this.addTask.bind(this);
    this.deleteTask= this.deleteTask.bind(this);

  }



  componentDidMount() {

  }

signInPortis = () => {
    const portis = new Portis('faad537b-c4a3-428f-b24e-6c1767c4e624', 'maticMumbai');
 
    const web3 = new Web3(portis.provider);

    this.loadBlockchainData(portis, web3);
  }

 signInWithMetamask = () => {
    const portis = "metamask";
    const web3 = new Web3(window.ethereum);

    window.ethereum.enable().then(() => {
    this.loadBlockchainData(portis, web3)
    })
    .catch(error => {
        // User denied account access
        console.log(error)
    })


  }

  async loadBlockchainData(portis, web3) {

if (portis == "metamask") {
      this.setState({
        login : true
      })
}

else {
      portis.isLoggedIn().then(({ error, result }) => {
      // console.log(error, "rsults" + result);
      this.setState({
        login : result
      })
    });
}
    

    // const portis = new Portis('faad537b-c4a3-428f-b24e-6c1767c4e624', 'goerli');
 
    // const web3 = new Web3(portis.provider);

    // portis.showPortis();


    // this.setState({portis});

    // web3.eth.getAccounts((error, accounts) => {
    //   console.log(accounts);
    // });




    // const web3 = new Web3(window.ethereum)
    // window.ethereum.enable().catch(error => {
    //     // User denied account access
    //     console.log(error)
    // })

    const network = await web3.eth.net.getNetworkType();
   
   web3.eth.getAccounts()
   .then(data => {

    web3.eth.getBalance(data[0])
    .then(
      balance => {
        this.setState({
          balance : web3.utils.fromWei(balance, 'ether')
        })
      }
    )

    this.setState({
      account : data[0],
      network : network
    })
   })


   const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);

   this.setState({todoList})

   const taskCount = await todoList.methods.taskCount().call();

   this.setState({taskCount : taskCount});

   for (let i = 1 ; i <= this.state.taskCount; i++) {
     const task = await todoList.methods.tasks(i).call();

     this.setState({
       tasks : [...this.state.tasks, task]
     })

   }

   console.log(this.state.tasks);

   let statuses = [];
   

  for (let i = 1 ; i <= this.state.taskCount; i++) {

    let data = {};


    const status1 = await todoList.methods.friendAddress(i, this.state.tasks[i - 1].friend1).call();
    const status2 = await todoList.methods.friendAddress(i, this.state.tasks[i - 1].friend2).call();
    const status3 = await todoList.methods.friendAddress(i, this.state.tasks[i - 1].friend3).call();

    data = {
      status1 : status1,
      status2 : status2,
      status3 : status3
    }

    statuses.push(data);

  }


setTimeout(() => {
    this.setState({
      status : statuses
    })

  // console.log(this.state);
}, 5000);


  console.log(this.state.status);


  this.setState({
    loading : false
  })

  }

  addTask(content, friend1, friend2, friend3){
    this.setState({ loading : true}); 

    const portis = new Portis('faad537b-c4a3-428f-b24e-6c1767c4e624', 'maticMumbai');
 
    const web3 = new Web3(portis.provider);



    this.state.todoList.methods.createTask(content, friend1, friend2, friend3).send({ from:this.state.account, to:TODO_LIST_ADDRESS, value: 30000000000000000 })
    .once('receipt', (receipt) => {
      console.log(receipt);
      this.setState({ loading : false});
    })
  }

  deleteTask(id){
    this.setState({ loading : true}); 
    this.state.todoList.methods.toggleCompleted(id).send({ from : this.state.account })
    .once('receipt', (receipt) => {
      console.log(receipt);

      this.setState({ loading : false, message : "Done!"});
    })
  }

  FriendSignInWithPortis = () => {
    const portis = new Portis('faad537b-c4a3-428f-b24e-6c1767c4e624', 'maticMumbai');
 
    const web3 = new Web3(portis.provider);

    this.friendCall(portis, web3);
}

FriendSignInWithMetamask = () => {
  const portis = "metamask";
  const web3 = new Web3(window.ethereum);

  window.ethereum.enable().then(() => {
    this.friendCall(portis, web3);
  })
  .catch(error => {
      // User denied account access
      console.log(error)
  })

}

  // friendVerify(id, address) {
  //   this.setState({ loading : true}); 

  //   this.state.todoList.methods.friendAddress(id, address)
  // }

  async friendCall(portis, web3) {
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);

    this.setState({todoList})

    console.log("friend", this.state.todoList);

    if (portis == "metamask") {
      this.setState({
        login : true
      })
    }

    else {
      portis.isLoggedIn().then(({ error, result }) => {
        // console.log(error, "rsults" + result);
        this.setState({
          login : result
        })
      });
    }

    web3.eth.getAccounts()
    .then(data => {

      console.log(data[0]);

      this.setState({
        account : data[0]
      })
    })


  }



  render() {
    return (
      <div> 
        <Router>
        <Navbar bg="light" className="doug">
          <Navbar.Brand href="#home">
            <img
            src={Logo}
            width="120"
            height="120"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            />
          </Navbar.Brand>


          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {this.state.login ? <button className="connected__true" active>Connected</button> : <Button className="connected__status" active>Not connected</Button>}
              
            </Navbar.Text>
          </Navbar.Collapse>
          
        
        </Navbar>




        <Switch>
          <Route path="/friend">
            <div> 
              {
                this.state.login ? <Friend deleteTask={this.deleteTask} message={this.state.message}/> : <Container> 
                
                <button className="todo__submit" onClick={this.FriendSignInWithPortis}> Portis </button> 
                <button className="todo__submit" onClick={this.FriendSignInWithMetamask}> Metamask</button> 

                </Container>
              }
            
            </div>

          </Route>

          <Route path="/user">
            <div> 
            {this.state.login ? <Main state={this.state} addTask= {this.addTask} deleteTask={this.deleteTask}/>  : <Container> 
        <div className="web3__wallet"> 
        <Row>
        <Col> <button className="web3__wallet__button" onClick={this.signInPortis} active> Login with Portis</button> </Col> 
        <Col> <button className="web3__wallet__button" onClick={this.signInWithMetamask} active> Metamask </button> </Col>
        </Row>
        </div> 
        </Container> }
            </div>
          </Route>

          <Route path="/">
          {this.state.login ? <Main state={this.state} addTask= {this.addTask} deleteTask={this.deleteTask}/>  : <Container> 
        <div className="web3__wallet"> 
        <Row>
        <Col> <button className="web3__wallet__button" onClick={this.signInPortis} active> Login with Portis</button> </Col> 
        <Col> <button className="web3__wallet__button" onClick={this.signInWithMetamask} active> Metamask </button> </Col>
        </Row>
        </div> 
        </Container> }
          </Route>

        </Switch>

        </Router>
      </div>

    );
  }



}

export default App;
