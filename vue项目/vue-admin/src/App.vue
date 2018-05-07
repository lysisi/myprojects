<template>
  <div id="app" >
    <div :class='ismd?"":"nav-sm"'>
      <side-Bar></side-Bar>
      <top-Nav  v-on:bodyname='changeClass'></top-Nav>
      <div class="Rcontent">
        <keep-alive>
          <router-view class="fadeView">
            
          </router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from '@/components/sidebar';
import topNav from '@/components/topnav';
export default {
  name: 'app',
  components:{
    sideBar,
    topNav,
  },
  data(){
    return{
      ismd:true,

    }
  },
  created(){//测试接口数据——案例
    this.getData()
  },
  methods:{
    changeClass:function(data){

      this.ismd=data
      console.log(data)
    },
    getData:function(){
      this.$api.get('topics',null,r=>{
        console.log(r)
      })
    }

  },
 
  mounted:function (argument) {
  }
}
</script>

<style>
#app {
    color: #73879C;
    background: #2A3F54;
    font-family: "Helvetica Neue",Roboto,Arial,"Droid Sans",sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.471;
}
*, :after, :before {
    box-sizing: border-box;
}
a{
  text-decoration: none;
}
.Rcontent {
    display: block;
    margin-left: 230px;
    height:100%;
}
.nav-sm .Rcontent {
    display: block;
    margin-left: 70px;
    z-index: 2;
}

</style>
