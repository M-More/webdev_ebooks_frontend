<template>
  <div id="usermanage">
    <div id="heading">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <p id="title">e-Book</p>
        <p id="subtitle">用户管理</p>
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
      placeholder="输入用户关键字搜索用户">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>

    <el-table
      :data="userData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="UID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="邮箱"
        prop="email">
      </el-table-column>
      <el-table-column
        label="权限"
        prop="kind">
      </el-table-column>
      <el-table-column
        align="right" label="用户状态管理">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="正常"
            inactive-text="禁用"
            @change="handleChange(scope.$index, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: [],
      search: ''
    }
  },
  mounted: function () {
    this.showUser()
  },
  methods: {
    showUser () {
      this.$axios.get('/users/showAll')
        .then((response) => {
          this.userData = response.data
        })
    },
    handleChange (index, row) {
      if (row.kind === '管理员') {
        this.$message({
          message: '无法禁用管理员！',
          type: 'warning'
        })
      } else {
        if (row.status === true) {
          this.$axios.get('/users/update', {
            params: {
              userId: row.id,
              userStatus: true
            }
          })
        } else {
          this.$axios.get('/users/update', {
            params: {
              userId: row.id,
              userStatus: false
            }
          })
        }
      }
    }
  }
}
</script>

<style>
  @import "../assets/css/index.css";
</style>
