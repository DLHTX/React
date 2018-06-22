import React, { Component } from 'react';

class TodoInput extends Component {
  render(){
    return <input type="text" value={this.props.content} 
    onChange={this.changeTitle.bind(this)}
    onKeyPress={this.submit.bind(this)}/>
  }
  submit(e){
      if(e.key === 'Enter'){
          console.log('按了回车')
          this.props.onSubmit(e)
      }
  }

  changeTitle(e){
        this.props.onChange(e)
      }
}
export default TodoInput