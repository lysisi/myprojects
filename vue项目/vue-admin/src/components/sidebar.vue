<template>
  <div class='leftnav'>
    <div class='col-md-3 left_col'>
      <div class='left_col scroll-view'>
        <div class="navbar nav_title" style="border: 0;">
          <a href="" class="site_title"><i class="fa fa-paw"></i> <span>Gentelella Alela!</span></a>
        </div>

        <div class="clearfix"></div>

        <!-- menu profile quick info -->
        <div class="profile clearfix">
          <div class="profile_pic">
            <img src="../../src/assets/images/photo.jpg" alt="..." class="img-circle profile_img">
          </div>
          <div class="profile_info">
            <span>Welcome,</span>
            <h2>John Doe</h2>
          </div>
        </div>
        <br>
        <!-- /menu profile quick info -->

        <!-- sidebar menu -->
        <div id="sidebar-menu" class="">
          <div class="menu_section">
            <h3>General</h3>
            <collapse-nav v-for="(item,index) in navList"  :lists='item' :dex='index' ></collapse-nav>
          </div>
        </div>
        <!-- /sidebar menu -->
      </div>
    </div>
  </div>
</template>

<script>
import collapseNav from '@/components/collapse';

export default {
  name: 'sidenav',
  components:{
    collapseNav
  },
  data () {
    return {
      navList:[
      {
        "title":'Home',
        "con":[{text:'Dashboard',link:"/select"},{text:'Dashboard',link:"/point"},{text:'Dashboard',link:"/select"}],
      },{
         "title":'Home',
         "con":[{text:'Dashboard',link:"/select"},{text:'Dashboard',link:"/point"},{text:'Dashboard',link:"/select"}],
      }
      ]
    }
  },
  methods:{
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.leftnav{
  min-height: 100%;
  width: 230px;
  padding: 0;
  position: absolute;
  display: -ms-flexbox;
  display: flex;
  z-index: 1;
}
.nav-sm .leftnav{
  width:70px;
}
.col-md-3.left_col {
    min-height: 100%;
    width:100%;
    padding: 0;
    position: absolute;
    display: -ms-flexbox;
    display: flex;
    z-index: 1;
}

.left_col {
    background: #2A3F54 !important;
}
.menu_section h3 {
    padding-left: 15px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: .5px;
    font-weight: 700;
    font-size: 11px;
    margin-bottom: 0;
    margin-top: 0;
    text-shadow: 1px 1px #000;
}
.nav-sm .menu_section h3{
  display: none;
}
.menu_section>ul {
    margin-top: 10px;
}
.nav {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    margin-top: 10px
}
.nav_title {
    width: 230px;
    float: left;
    background: #2A3F54;
    border-radius: 0;
    height: 57px;
    margin-bottom: 0;
}
.nav-sm .nav_title{
  width:70px;
}
.site_title {
    font-weight: 400;
    font-size: 22px;
    width: 100%;
    line-height: 59px;
    display: block;
    height: 55px;
    margin: 0;
    padding-left: 10px;
}
.navbar-brand, .navbar-nav>li>a, .site_title {
    color: #ECF0F1!important;
    margin-left: 0!important;
    overflow:hidden
}
.nav-sm .site_title i {
    font-size: 27px;
    margin: 13px 0 0 3px;
}
.site_title i {
    border: 1px solid #EAEAEA;
    padding: 5px 6px;
    border-radius: 50%;
}
.nav-sm .site_title span{
  display: none;
}
.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.side-menu .fa {
    width: 26px;
    opacity: .99;
    display: inline-block;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    -moz-osx-font-smoothing: grayscale;
}
.nav-sm .nav.side-menu li a {
    text-align: center!important;
    font-weight: 400;
    font-size: 10px;
    padding: 10px 5px;
}
.nav-sm .side-menu .fa{
    font-size: 25px!important;
    text-align: center;
    width: 100%!important;
    margin-bottom: 5px;
}
.fa-paw:before {
    content: "\f1b0";
}
.nav.side-menu>li.active, .nav.side-menu>li.current-page {
    border-right: 5px solid #1ABB9C;
}
/*.nav-sm .nav.side-menu li.active-sm {
    border-right: 5px solid #1ABB9C;
}*/
.menu_section>ul {
    margin-top: 10px;
}
.sidebar-menu .nav {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}
.sidebar-menu .nav li{
  margin:0
}
ul.nav.child_menu li:hover{
 background:rgba(255,255,255,.05);
 color:#fff;
}
ul.nav.child_menu a:hover{
  background: none;
}
.nav-sm ul.nav.child_menu {
    left: 100%;
    position: absolute;
    top: 0;
    width: 210px;
    z-index: 4000;
    background: #3E5367;
    display: none;
    margin-left: 5px;
}

.nav.child_menu li {
    padding-left: 36px;
}

.nav-sm .active .nav.child_menu {
  display: block;
  margin-top: 0
}
.nav-sm ul.nav.child_menu li a {
    text-align: left!important;
    color:rgba(255,255,255,.75);
}
.nav.side-menu>li.active>a {
    text-shadow: rgba(0,0,0,.25) 0 -1px 0;
    background: linear-gradient(#334556,#2C4257),#2A3F54;
    box-shadow: rgba(0,0,0,.25) 0 1px 0, inset rgba(255,255,255,.16) 0 1px 0;
}
.nav.child_menu>li>a, .nav.side-menu>li>a {
    color: rgba(255,255,255,.75);
    font-weight: 500;
}
.nav.side-menu>li>a {
    margin-bottom: 6px;
}
.nav>li>a {
    padding: 13px 15px 12px;
}
.nav li.current-page {
    background: rgba(255,255,255,.05);
}
.nav.child_menu li {
    padding-left: 36px;
}
.nav-sm .nav.child_menu li{padding: 0 10px;}
.nav>li {
    position: relative;
    display: block;
    margin:0 !important
}
.side-menu span.fa {
    float: right;
    text-align: center;
    margin-top: 5px;
    font-size: 10px;
    min-width: inherit;
    color: #C4CFDA;
}
.active a span.fa {
    text-align: right!important;
    margin-right: 4px;
}
.nav li{
  background: #
}
.nav li.current-page {
    background: rgba(255,255,255,.05);
}
ul.nav.child_menu li:before {
    background: #425668;
    bottom: auto;
    content: "";
    height: 8px;
    left: 23px;
    margin-top: 15px;
    position: absolute;
    right: auto;
    width: 8px;
    z-index: 1;
    border-radius: 50%;
}
 ul.nav.child_menu li:after {
    border-left: 1px solid #425668;
    bottom: 0;
    content: "";
    left: 27px;
    position: absolute;
    top: 0;
}
.nav-sm ul.nav.child_menu li:before,.nav-sm ul.nav.child_menu li:after{
  display: none;
}
.nav.side-menu>li>a:hover, .nav>li>a:focus {
    text-decoration: none;
    background: 0 0;
}
.nav.side-menu li a:hover {
    color: #F2F5F7!important;
}
.nav-sm .menu_section h3, .nav-sm .profile, .nav-sm .menu_section span.fa{
  display: none
}
.profile_pic {
    width: 35%;
    float: left;
}
.profile_pic img {
    width: 70%;
    background: #fff;
    margin-left: 15%;
    z-index: 1000;
    position: inherit;
    margin-top: 20px;
    border: 1px solid rgba(52,73,94,.44);
    padding: 4px;
    border-radius: 50%;
}
.profile_info {
    padding: 25px 10px 10px;
    width: 65%;
    float: left;
}
.profile_info h2 {
    font-size: 14px;
    color: #ECF0F1;
    margin: 0;
    font-weight: 300;
}
.profile_info span {
    font-size: 13px;
    line-height: 30px;
    color: #BAB8B8;
}





@media (max-width: 991px){
  .nav-md .col-md-3.left_col {
      display: none;
  }
  .nav-sm .col-md-3.left_col{
    display: block;
  }
}

</style>
