import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../components/action'
import AddTodo from '../components/AddTodo' // 展示组件
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

class App extends Component {
  render() {
    // Injected by connect() call:
    //（加）为提高性能，减少渲染次数，做法是构建几个无状态的组件，在这之上构建一个有状态和用户和
   //服务交互，然后通过props来传递给无状态的组件
    const { dispatch, visibleTodos, visibilityFilter } = this.props
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))   //改变内部state的唯一方法就是dispatch一个action
          } />
        <TodoList
          todos={visibleTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
      </div>
    )
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.


function select(state) {//mapStateToProps的作用；建立一个外部的state对象，到ui组件的props对象的映射关系
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter), 
    visibilityFilter: state.visibilityFilter 
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 容器组件中；
export default connect(select)(App)
// export default App
// 连接react组件和redux stroe，连接操作不会改变原来的组件类，返回一个新的已与redux store连接的组件类；

//connect([mapStateToProps],[mapDispatchToProps],[mergeProps],[options])
/*
1.mapStateToProps:函数的作用是确定哪些Redux全局的state是我们组件想要通过props获取的——输入逻辑
2.mapDispatchToProps:哪些action创建函数是我们想要通过props获取的——输出逻辑
*/

/*
1.App是ui组件；
2.connect()(App)就是一个空容器组件，；
ui组件负责视图呈现，容器组件负责管理数据和逻辑；
3.为了定义业务逻辑，需给出以下信息：输入逻辑和输出逻辑
*/