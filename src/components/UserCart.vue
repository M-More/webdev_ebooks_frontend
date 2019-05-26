<template>
  <div id="app">
    <div id="heading">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <p id="title">e-Book</p>
        <p id="subtitle">购物车</p>
        <el-button type="text" class="head_nav_button"><a href="/logout">退出登录</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/user/orderlist">我的订单</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/user/cart">购物车</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/user/booklist">书籍浏览</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/user/home">首页</a></el-button>
      </el-menu>
      <div class="line"></div>
    </div>

    <br/>

    <el-table
      :data="cartData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <!--<el-table-column label="封面">-->
        <!--<template slot-scope="scope">-->
          <!--<img :src="scope.row.cover" class="head_pic" width="120px"/>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        label="书名"
        prop="bookname">
      </el-table-column>
      <el-table-column
        label="ISBN"
        prop="isbn">
      </el-table-column>
      <el-table-column label="数量">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.amount" controls-position="right" @change="handleChange(scope.$index, scope.row)" :max="scope.row.inventory"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="line"></div>
    <div id="summary">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <div id="sumprice" style="float: right">
          <el-button type="primary" @click="buy">购买</el-button>
        </div>
      </el-menu>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      cartData: []
    }
  },
  mounted: function () {
    this.showCart()
  },
  methods: {
    showCart () {
      this.$axios.get('/cart/showAll')
        .then((response) => {
          this.cartData = response.data
        })
    },
    handleDelete (index, row) {
      this.$confirm('确定从购物车中删除该书本?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/cart/delete', {
          params: {
            isbn: row.isbn
          }
        })
        this.cartData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleChange (index, row) {
      this.$axios.get('/cart/update', {
        params: {
          cartName: row.bookname,
          cartIsbn: row.isbn,
          cartInventory: row.inventory,
          cartAmount: row.amount
        }
      })
    },
    buy () {
      this.$confirm('确定购买购物车中的书本?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/orderitem/create')
        location.reload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消购买'
        })
      })
    }
  }
}
</script>

<style>
  @import "../assets/css/index.css";
</style>
