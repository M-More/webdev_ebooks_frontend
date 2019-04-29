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

    <el-table :data="orderData">
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
            @click="showDetail(scope.$index, scope.row)">查看订单详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="订单详情" :visible.sync="orderDetailDialogVisible">
      <el-table :data="orderDetailData">
        <el-table-column property="itemname" label="书名"></el-table-column>
        <el-table-column property="itemisbn" label="ISBN"></el-table-column>
        <el-table-column property="itemamount" label="数量"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      orderData: [],
      orderDetailDialogVisible: false,
      orderDetailData: []
    }
  },
  mounted: function () {
    this.showOrder()
  },
  methods: {
    showOrder () {
      this.$axios.get('/order/findByUser')
        .then((response) => {
          this.orderData = response.data
        })
    },
    showDetail (index, row) {
      this.orderDetailDialogVisible = true
      this.$axios.get('/orderitem/findByOrderNum', {
        params: {
          orderNum: row.num
        }
      })
        .then((response) => {
          this.orderDetailData = response.data
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
