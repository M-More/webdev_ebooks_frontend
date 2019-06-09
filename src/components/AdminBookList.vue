<template>
  <div id="booklist">
    <div id="heading">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <p id="title">e-Book</p>
        <p id="subtitle">书籍列表</p>
        <el-button type="text" class="head_nav_button"><a href="/logout">退出登录</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/admin/orderlist">订单统计</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/admin/cart">购物车</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/admin/booklist">书籍浏览</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/admin/bookmanage">书籍管理</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/admin/usermanage">用户管理</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/admin/home">首页</a></el-button>
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
      :data="bookData.filter(data => !search || data.bookname.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column label="封面">
        <template slot-scope="scope">
          <img :src=scope.row.cover class="head_pic" width="120px"/>
        </template>
      </el-table-column>
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
            @click="showDetail(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="addToCart(scope.$index, scope.row)">加入购物车</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="书籍详情" :visible.sync="bookDetailDialogVisible">
      <el-form label-position="right" class="demo-table-expand">
        <el-form-item label="封面">
          <img :src=detailedBook.cover class="head_pic" width="120px"/>
        </el-form-item>
        <el-form-item label="书名">
          <span>{{ detailedBook.bookname }}</span>
        </el-form-item>
        <el-form-item label="作者">
          <span>{{ detailedBook.author }}</span>
        </el-form-item>
        <el-form-item label="ISBN">
          <span>{{ detailedBook.isbn }}</span>
        </el-form-item>
        <el-form-item label="出版社">
          <span>{{ detailedBook.press }}</span>
        </el-form-item>
        <el-form-item label="开本">
          <span>{{ detailedBook.size }}</span>
        </el-form-item>
        <el-form-item label="出版时间">
          <span>{{ detailedBook.pubtime }}</span>
        </el-form-item>
        <el-form-item label="库存">
          <span>{{ detailedBook.inventory }}</span>
        </el-form-item>
        <el-form-item label="简介">
          <span>{{ detailedBook.intro }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      bookData: [],
      userNowId: null,
      search: '',
      bookDetailDialogVisible: false,
      detailedBook: []
    }
  },
  mounted: function () {
    this.show()
  },
  methods: {
    show () {
      this.$axios.get('/books/showAll')
        .then((response) => {
          this.bookData = response.data
        })
    },
    showDetail (index, row) {
      this.bookDetailDialogVisible = true
      this.$axios.get('/books/findOne', {
        params: {
          bookIsbn: row.isbn
        }
      })
        .then((response) => {
          this.detailedBook = response.data
        })
    },
    addToCart (index, row) {
      if (row.inventory === 0) {
        this.$message({
          showClose: true,
          message: '库存不足！',
          type: 'error'
        })
      } else {
        this.$axios.get('/cart/create', {
          params: {
            cartName: row.bookname,
            cartIsbn: row.isbn,
            cartInventory: row.inventory,
            cartAmount: 1
          }
        })
        this.$message({
          showClose: true,
          message: '加入购物车成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style>
  @import "../assets/css/index.css";
</style>
