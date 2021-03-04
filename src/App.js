import React, {Component} from 'react';
import './App.css';
import Web3 from 'web3';
import {TODO_LIST_ABI, TODO_LIST_ADDRESS} from './config.js';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import TodoList from './todoList';
import Portis from '@portis/web3';


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
      friend3 : ''
    }

    this.addTask = this.addTask.bind(this);
    this.deleteTask= this.deleteTask.bind(this);

  }



  componentDidMount() {
    


    this.loadBlockchainData();
  }

  async loadBlockchainData() {

    const portis = new Portis('faad537b-c4a3-428f-b24e-6c1767c4e624', 'goerli');
 
    const web3 = new Web3(portis.provider);

    // portis.showPortis();


    // this.setState({portis});

    web3.eth.getAccounts((error, accounts) => {
      console.log(accounts);
    });


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

  // for (let i = 1 ; i <= this.state.taskCount; i++) {

  //   let data = {};

  //   for (let j = 0 ; j < 3 ; j ++ ) {
  //   const status = await todoList.methods.friendAddress(i, this.state.tasks[i - 1]).call();
  //   data[j] = status;
  //   }

  //   this.setState({
  //     status : [...this.state.status, data]
  //   })

  // }

  // console.log(this.state.status);


  this.setState({
    loading : false
  })

  }

  addTask(content, friend1, friend2, friend3){
    this.setState({ loading : true}); 

    const portis = new Portis('faad537b-c4a3-428f-b24e-6c1767c4e624', 'goerli');
 
    const web3 = new Web3(portis.provider);



    this.state.todoList.methods.createTask(content, '0xbbbaaD77908e7143B6b4D5922fd201cd08568f63', '0x4108424e30dfCe6E9cA41e707C2c64FA5704A01A', '0x84AF51e634494D8c4BD4BFCD170C719dCb05dB5a').send({ from:this.state.account, to:TODO_LIST_ADDRESS, value: 30000000000000000 })
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
      this.setState({ loading : false});
    })
  }

  render() {
    return (
      <div className="container">
        <h1> To do list </h1> 

        <p> Your account address : {this.state.account} </p>
        <p> Your network is : {this.state.network} </p>
        <p> Task count : {this.state.taskCount} </p>
        <p> Your Portis Acc. Balance : {this.state.balance} ETH </p>
        <p> <strong> By default amount to be paid is 0.03 ETH </strong></p>

{this.state.loading ? <h1> Loading.. </h1>: <TodoList tasks={this.state.tasks} addTask= {this.addTask} deleteTask={this.deleteTask}/>}


      </div>
    );
  }



}

export default App;
