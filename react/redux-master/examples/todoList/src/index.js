import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux' //react-redux自动生成的容器组件
import App from './containers/app'  //容器组件
import todoApp from './reducers/reducers'
//todoApp是真正处理action修改state的地方；触发action的dispatch写在组件里；
let store = createStore(todoApp) //创建唯一stroe树（自己的理解）
//creatStore接收Reducer作为参数，生成一个新的store。以后每当store.dispatch发送过来一个新的aciton，就会自动调用Reducer，得到新的state
//全局唯一的store，是有个对象，有3个方法：dispatch/subscribe/getstate
let rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)