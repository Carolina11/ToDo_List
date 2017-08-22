/*
 *
 * Home
 *
 */


import React from 'react';
import Helmet from 'react-helmet';
import FaCheck from 'react-icons/lib/fa/check';

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

  componentDidMount () {
    this.todoInput.focus();
  }

  submitForm = (event) => {
    if(event.keyCode == 13){
       // submit
       this.storeItem();
     }
  };

  handleItem = (event) => {
    this.setState({
      inputItem:event.target.value
    })
  }

  storeItem = () => {
    var listItems = this.state.listItems;
    var inputItem = this.state.inputItem;

    if(inputItem !== "") {
      let newItem = {
        itemText:inputItem,
        toggle:{display:'none'}
      }

      listItems.push(newItem);

      this.setState ({
        listItems: listItems,
        inputItem: ""
      })
    }
  }
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
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>

        <div className="inputContainer">
          <input type="text" className="todoInput" id="todoInput" ref={(todoInput) => {this.todoInput = todoInput;}} placeholder="(Type here)" value={this.state.inputItem} onChange={this.handleItem} onKeyDown={this.submitForm} />
          <input type="submit" className="todoButton" value="Add to list" onClick={this.storeItem} />
        </div>
        <div className="todoList">
          {this.state.listItems.map((item, index) => (
            <div className="listItem" key={index}  onClick={(event) => this.strikeThrough(event, index)}>
              <FaCheck className="checkMark" style={item.toggle}></FaCheck> {item.itemText}
            </div>
          ))};
        </div>
      </div>
    );
  };
}

Home.contextTypes = {
  router: React.PropTypes.object
};
