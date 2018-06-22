import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'
import * as localStore from './localStore'
import AV from 'leancloud-storage'

var APP_ID = 'F8DDEWdPz5mw4UzTSIW56nFN-gzGzoHsz';
var APP_KEY = 'Fn2PUJ6OC5TqoQO7oH5QcxRq';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

 var TestObject = AV.Object.extend('TestObject')
 var testObject = new TestObject()
 testObject.save({
   words: 'Hello World!'
 }).then(function(object) {
   alert('LeanCloud Rocks!')
 })
 

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo:'',
      todoList: localStore.load('todoList') ||[]
      //在localstore中读取todolist
    }
  }
  render() {
    
    let todos = this.state.todoList.filter((item)=>!item.deleted).map((item,index)=>{
      return ( // 为什么这里要加个括号？这是动手题3 
               <li key={index}>
                 <TodoItem todo={item} onToggle={this.toggle.bind(this)}
                  onDelete={this.delete.bind(this)}/>
               </li>
             )
    })
    console.log(todos)

    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
        <TodoInput content={this.state.newTodo} 
         onChange={this.changeTitle.bind(this)}   
         onSubmit={this.addTodo.bind(this)}/>
         </div>
         <ol className='todoList' >
          {todos}
        </ol>
      </div>
    );
  }

  componentDidUpdate(){
        localStore.save('todoList', this.state.todoList)
      }// componentDidUpdate 会在组件更新之后调用将相同代码放入钩子中

      
  delete(event, todo){
        todo.deleted = true
        this.setState(this.state) 
        // localStore.save('todoList', this.state.todoList)//保存删除状态
      }

  toggle(e,todo){
        todo.status = todo.status === 'completed' ? '' : 'completed'
        this.setState(this.state) 
        // localStore.save('todoList', this.state.todoList)//保存完成状态
   
      }

  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
     // localStore.save('todoList', this.state.todoList)//保存完成状态
  }


  addTodo(event){
       this.state.todoList.push({
         id:idMaker(),
         title:event.target.value,
         status:null,
         deleted:false
       })
       this.setState({
         newTodo:'',
         todoList:this.state.todoList
       })
      //  localStore.save('todoList', this.state.todoList)//保存todolist
      }


}

export default App;

let id = 0
function idMaker(){
  id+=1
  return id
}
