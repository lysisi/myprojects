
<template>
  <div>
    <ul class="nav side-menu">
      <li :class='dex==curindex?isActive:""'  @click='navClick($event)' :id='dex'>
        <a href='javascript:;'><i class="fa fa-home"></i> {{lists.title}} <span class="fa fa-chevron-down"></span></a>
       <ul class="nav child_menu" >
         <li class=''  v-for='list in lists.con'>
           <router-link :to="setPath(list.link)">{{list.text}}</router-link>
           <!-- replace 会调用router.replace而不是router.push,于是导航不会留下history记录 -->
         </li>
       </ul>
      </li>
     
    </ul>
  </div>
</template>

<script>
export default {
  name: 'collapse',
  props:['lists','dex'],
    data () {
    return {
      show:false,
      nowindex:0,
      isActive:'active ',

    }
  },
  computed:{
    curindex:function(){
      console.log(this.nowindex)
      return this.nowindex
    }
  },
  methods:{
    navClick:function(e){
      this.nowindex=e.currentTarget.id;
      console.log(this.nowindex)
        if(this.isActive=='active'){
          this.isActive=''
        }else{
          this.isActive='active'
        }

    },
    setPath (path) {
      return path
    }
  },
  mounted:function(){

    
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.nav.side-menu>li .child_menu{
  opacity:1;
  height: 0;
  overflow-y: hidden;
}
.nav.side-menu>li.active .child_menu{
  opacity:1;
  height: auto;
 -webkit-transition: all 2s cubic-bezier(0, 1, 0.5, 1);
  transition: all 2s cubic-bezier(0, 1, 0.5, 1);

}

</style>
