/*
 *
 * Home
 *
 */


import React from 'react';
import Helmet from 'react-helmet';
import FaCheck from 'react-icons/lib/fa/check';
import TIDeleteOutline from 'react-icons/lib/ti/delete-outline';

import './style.css';
import './styleM.css';

export default class Home extends React.PureComponent {
  constructor() {
    super();
    /* listItems have been turned into objects with 2 properties */
    this.state = {
      listItems:[],
      inputItem:'',
    }
  };

  componentWillMount() {
    this.getTasks();
  };

  componentDidMount () {
    this.todoInput.focus();
  };

  getTasks = () => {
    fetch('http://localhost:8000/api/getTasks', {
      method:'GET'
    })
    .then(function(response){
    return response.json();
    })
    .then(function(json) {
      this.setState({
        listItems:json.tasks
      })
    }.bind(this))
  };

  storeTask = () => {
    let data = new FormData();
    data.append('taskContent', this.state.inputItem);

    fetch('http://localhost:8000/api/storeTask', {
      method: 'POST',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let listItems = this.state.listItems;
      listItems.push(json.task);
      this.setState({
        listItems:listItems
      })
      this.forceUpdate();
    }.bind(this))
  };

  destroyOne = (id, index) => {
    fetch('http://localhost:8000/api/destroyOne/' + id, {
      method:'POST',
      mode: 'no cors'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let listItems = this.state.listItems;
      listItems.splice(index, 1);
      this.setState({
        listItems:listItems
      })
      this.forceUpdate();
    }.bind(this))
  }

  submitForm = (event) => {
    if(event.keyCode == 13){
       // submit
       this.storeTask();
     }
  };

  handleItem = (event) => {
    this.setState({
      inputItem:event.target.value
    })
  };

  strikeThrough = (event, index) => {
    let listItems = this.state.listItems;
    let item = event.target;
    item.style.textDecoration = 'line-through';
    item.style.fontStyle = 'italic';
    item.style.color = '#666';

    listItems[index].toggle = {display:'inline'};
    this.setState({
      listItems:listItems
    })
    this.forceUpdate();
  };

  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>

        <div className="inputContainer">
          <input type="text" className="todoInput" id="todoInput" ref={(todoInput) => {this.todoInput = todoInput;}} placeholder="(Type here)" value={this.state.inputItem} onChange={this.handleItem} onKeyDown={this.submitForm} />
          <input type="submit" className="todoButton" value="Add to list" onClick={this.storeTask} />
        </div>
        <div className="todoList">
          {this.state.listItems.map((item, index) => (
            <div className="listBox">
              <div className="listItem" key={index}  onClick={(event) => this.strikeThrough(event, index)}>
                <FaCheck className="checkMark" style={item.toggle}></FaCheck>
                {item.taskContent}</div>
                <TIDeleteOutline className="deleteButton" onClick={() => this.destroyOne(item.id, index)}></TIDeleteOutline>
            </div>
          ))}
        </div>
      </div>
    );
  };
};

Home.contextTypes = {
  router: React.PropTypes.object
};
