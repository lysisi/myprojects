import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ViewA from '@/components/ViewA'
import ViewB from '@/components/ViewB'

Vue.use(Router)

export default new Router({
  hashbang:true,
  history:true,
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Index
    },
    {
    	path:'/select',
      name:"HelloA",
    	component: ViewA
    },
    {
    	path:"/point",
      name:"HelloB",
    	component: ViewB
    }
  ]
});


