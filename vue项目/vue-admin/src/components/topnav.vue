<template>
  <!-- top navigation -->
    <div class="top_nav">
      <div class="nav_menu">
        <nav>
          <div class="nav toggle">
              <a id="menu_toggle" @click='changeNav()'><i class="fa fa-bars"></i></a>
          </div>
        </nav>
      </div>
    </div>
  <!-- /top navigation -->
</template>

<script>

export default {
  name: 'collapse',
  data () {
    return {
     bodyname:true
    }
  },
  methods:{
    changeNav:function() {
      this.bodyname=!this.bodyname;
      console.log(1,this.bodyname)
      this.$emit('bodyname',this.bodyname)
    }
      
  }
 
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.top_nav {
    display: block;
    margin-left: 230px;
}
.nav-sm .top_nav {
    display: block;
    margin-left: 70px;
    z-index: 2;
}
.nav_menu {
    float: left;
    background: #EDEDED;
    border-bottom: 1px solid #D9DEE4;
    margin-bottom: 10px;
    width: 100%;
    position: relative;
}
@media (min-width: 480px)
.nav_menu {
    position: static;
}
.toggle {
    float: left;
    margin: 0;
    padding: 16px 0;
    width: 70px;
}
.toggle a {
    padding: 15px 15px 0;
    margin: 0;
    cursor: pointer;
    color: #5A738E;
}
.toggle a i {
    font-size: 26px;
}

</style>
