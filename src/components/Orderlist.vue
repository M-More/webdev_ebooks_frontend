<template>
  <div id="app">
    <div id="heading">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <p id="title">e-Book</p>
        <p id="subtitle">我的订单</p>
        <el-button type="text" class="head_nav_button"><a href="#">退出登录</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/orderlist">我的订单</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/cart">购物车</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/booklist">书籍浏览</a></el-button>
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
        label="订单编号"
        prop="num">
      </el-table-column>
      <el-table-column
        label="下单用户"
        prop="username">
      </el-table-column>
      <el-table-column
        label="下单时间"
        prop="time">
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
    this.showOrder()
  },
  methods: {
    showOrder () {
      this.$axios.get('/order/findByUser')
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
          cartAmount: row.amount
        }
      })
    }
  }
}
</script>

<style>
  @import "../assets/css/index.css";
</style>
