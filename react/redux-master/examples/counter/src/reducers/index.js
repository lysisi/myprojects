export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
/*reducer就是一个纯函数，接收旧的state和action ，返回新的state*/
