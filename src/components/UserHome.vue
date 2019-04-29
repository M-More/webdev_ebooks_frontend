<template>
  <div id="home">
    <div id="heading">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <p id="title">e-Book</p>
        <el-button type="text" class="head_nav_button"><a href="/logout">退出登录</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/orderlist">我的订单</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/cart">购物车</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/booklist">书籍浏览</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/userhome">首页</a></el-button>
      </el-menu>
      <div class="line"></div>
    </div>

    <div id="left_nav">
      <el-row>
        <el-col :span="20">
          <h3>图书分类</h3>
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <span>教育</span>
              </template>
              <el-menu-item index="1-1">教材</el-menu-item>
              <el-menu-item index="1-2">外语</el-menu-item>
              <el-menu-item index="1-3">考试</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <span slot="title">小说</span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <span>文艺</span>
              </template>
              <el-menu-item index="3-1">文学</el-menu-item>
              <el-menu-item index="3-2">传记</el-menu-item>
              <el-menu-item index="3-3">艺术</el-menu-item>
            </el-submenu>
            <el-menu-item index="4">
              <span slot="title">励志</span>
            </el-menu-item>
            <el-menu-item index="5">
              <span slot="title">青春文学</span>
            </el-menu-item>
            <el-submenu index="6">
              <template slot="title">
                <span>人文社科</span>
              </template>
              <el-menu-item index="6-1">历史</el-menu-item>
              <el-menu-item index="6-2">古籍</el-menu-item>
              <el-menu-item index="6-3">哲学/宗教</el-menu-item>
              <el-menu-item index="6-4">文化</el-menu-item>
              <el-menu-item index="6-5">社会科学</el-menu-item>
            </el-submenu>
            <el-menu-item index="7">
              <span slot="title">经管</span>
            </el-menu-item>
            <el-menu-item index="8">
              <span slot="title">生活</span>
            </el-menu-item>
            <el-menu-item index="9">
              <span slot="title">科技</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>

    <div id="content">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="新书上架 New Arrival" name="1">
          <div class="book_content">
            <ul>
              <li><a href="#"><img src="../assets/images/newbook/1.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/newbook/2.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/newbook/3.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/newbook/4.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/newbook/5.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/newbook/6.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/newbook/7.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/newbook/8.jpg"></a></li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="人气榜 Hot Rank" name="2">
          <div class="book_content">
            <ul>
              <li><a href="#"><img src="../assets/images/hot/1.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/hot/2.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/hot/3.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/hot/4.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/hot/5.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/hot/6.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/hot/7.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/hot/8.jpg"></a></li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="读者推荐 Recommendation" name="3">
          <div class="book_content">
            <ul>
              <li><a href="#"><img src="../assets/images/reco/1.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/reco/2.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/reco/3.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/reco/4.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/reco/5.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/reco/6.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/reco/7.jpg"></a></li>
              <li><a href="#"><img src="../assets/images/reco/8.jpg"></a></li>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        activeNames: ['1', '2', '3', '4']
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style>
  @import "../assets/css/index.css";
</style>
