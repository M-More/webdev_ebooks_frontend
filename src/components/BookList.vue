<template>
  <div id="booklist">
    <div id="heading">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <p id="title">e-Book</p>
        <p id="subtitle">书籍列表</p>
        <el-button type="text" class="head_nav_button"><a href="#">退出登录</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="#">我的订单</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="#">购物车</a></el-button>
        <el-button type="text" class="head_nav_button"><a @click="show">书籍浏览</a></el-button>
      </el-menu>
      <div class="line"></div>
    </div>

    <br/>

    <el-input
      v-model="search"
      size="medium"
      clearable
      placeholder="输入书名关键字搜索书籍">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>

    <el-table
      :data="bookData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <!--<el-table-column label="封面">-->
        <!--<template slot-scope="scope">-->
          <!--<img :src="scope.row.cover" class="head_pic" width="120px"/>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        label="书名"
        sortable
        prop="bookname">
      </el-table-column>
      <el-table-column
        label="作者"
        sortable
        prop="author">
      </el-table-column>
      <el-table-column
        label="ISBN"
        sortable
        prop="isbn">
      </el-table-column>
      <el-table-column
        label="库存"
        sortable
        prop="inventory">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">加入购物车</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        name: '解忧杂货店',
        author: '[日]东野圭吾',
        isbn: '9787544270878',
        cover: require('../assets/images/list/1.jpg'),
        storage: 1000
      }, {
        name: '摆渡人',
        author: '[英]克莱儿·麦克福尔',
        isbn: '9787550013247',
        cover: require('../assets/images/list/2.jpg'),
        storage: 1001
      }, {
        name: '人间失格',
        author: '[日]太宰治',
        isbn: '9787544270878',
        cover: require('../assets/images/list/3.jpg'),
        storage: 100
      }, {
        name: '月亮和六便士',
        author: '[英]毛姆',
        isbn: '9787544270878',
        cover: require('../assets/images/list/4.jpg'),
        storage: 999
      }, {
        name: '百年孤独',
        author: '加西亚·马尔克斯',
        isbn: '9787544291170',
        cover: require('../assets/images/list/5.jpg'),
        storage: 994
      }, {
        name: '苏菲的世界',
        author: '[挪威]乔斯坦·贾德',
        isbn: '9787506394864',
        cover: require('../assets/images/list/6.jpg'),
        storage: 995
      }, {
        name: '追风筝的人',
        author: '[美]卡勒德·胡赛尼',
        isbn: '9787208061644',
        cover: require('../assets/images/list/7.jpg'),
        storage: 993
      }],
      bookData: [],
      search: ''
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    show () {
      this.$axios.get('/books/showAll')
        .then((response) => {
          this.bookData = response.data
        })
    }
  }
}
</script>

<style>
  @import "../assets/css/index.css";
</style>
