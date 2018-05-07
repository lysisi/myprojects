import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from '../components/action'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp

//combineReducers实现原理；

// const combineReducers = ( reducers ) => {
//     return ( state = {}, action ) => {

//         return Object.keys(reducers).reduce(
//             ( nextState, key ) => {
//                 nextState[key] = reducers[key](
//                     state[key],
//                     action
//                 );
//                 return nextState;
//             },
//             {}
//         );
//     };
// };




// export default combineReducers;//形成新的reducer后，传入任何action和status就会返回一个明确的状态树

// reduce()实现数组求和的作用；
// var arr = [1,2,3,4,5,6]; 
// Array.prototype.sum = function (){
//  var sumResult = 0;
//  return this.reduce(function (preValue, curValue) { 
//   return sumResult = preValue + curValue;
//    }); 
//  return sumResult; } 
//  arr.sum(); 


/*
Redux  三大原则：
1.单一数据源。
2. state是只读的，唯一改变state的方法就是触发action，action只是表达想要修改的意图，所有的修改都被集中化处理。
3.使用纯函数reducers来执行修改：它接收先前的state和action，并返回新的state。


*/