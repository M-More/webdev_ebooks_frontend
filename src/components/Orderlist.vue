<template>
  <div id="app">
    <div id="heading">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <p id="title">e-Book</p>
        <p id="subtitle">我的订单</p>
        <el-button type="text" class="head_nav_button"><a href="/logout">退出登录</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/orderlist">我的订单</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/cart">购物车</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/booklist">书籍浏览</a></el-button>
        <el-button type="text" class="head_nav_button"><a href="/user/home">首页</a></el-button>
      </el-menu>
      <div class="line"></div>
    </div>

    <br/>

    <div class="block">
      <el-date-picker
        v-model="timevalue"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        :picker-options="pickerOptions"
        value-format="timestamp">
      </el-date-picker>
    </div>

    <el-button type="primary" class="block_button" @click="rangeSearch">查询时间范围内的订单</el-button>
    <el-button class="block_button" @click="showOrder">显示全部订单</el-button>

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
      orderDetailData: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      timevalue: ''
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
    rangeSearch () {
      console.log(typeof this.timevalue[0])
      this.$axios.get('/order/findRange', {
        params: {
          startTime: this.timevalue[0],
          endTime: this.timevalue[1]
        }
      })
        .then((response) => {
          this.orderData = response.data
        })
    }
  }
}
</script>

<style>
  @import "../assets/css/index.css";
</style>
