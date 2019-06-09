<template>
  <div id="bookmanage">
    <div id="heading">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <p id="title">e-Book</p>
        <p id="subtitle">书籍管理</p>
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
          <el-button
            size="mini"
            type="primary"
            @click="addBookFormVisible = true">新增书籍</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增书籍" :visible.sync="addBookFormVisible">
      <el-form :model="addBookForm">
        <el-upload class="cover_upload" action='' :on-change="getFile" :limit="1" list-type="picture" :auto-upload="false">
          <el-button type="primary">选择封面上传</el-button>
        </el-upload>
        <el-form-item label="书名" :label-width="addBookFormLabelWidth">
          <el-input v-model="addBookForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="addBookFormLabelWidth">
          <el-input v-model="addBookForm.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" :label-width="addBookFormLabelWidth">
          <el-input v-model="addBookForm.isbn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="addBookFormLabelWidth">
          <el-input v-model="addBookForm.press" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开本" :label-width="addBookFormLabelWidth">
          <el-input v-model="addBookForm.booksize" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版时间" :label-width="addBookFormLabelWidth">
          <el-input v-model="addBookForm.pubtime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="addBookFormLabelWidth">
          <el-input v-model="addBookForm.inventory" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="addBookFormLabelWidth">
          <el-input type="textarea" autosize v-model="addBookForm.intro" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBookFormVisible = false">取 消</el-button>
        <el-button @click="clearBookForm">清 空</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑书籍信息" :visible.sync="editBookFormVisible">
      <el-form :model="editBookForm">
        <el-form-item label="封面" :label-width="editBookFormLabelWidth">
          <img :src=editBookForm.cover class="head_pic" width="120px"/>
        </el-form-item>
        <el-upload class="cover_upload" action='' :on-change="changeCover" :limit="1" list-type="picture" :auto-upload="false">
          <el-button type="primary">更改封面图片</el-button>
        </el-upload>
        <el-form-item label="书名" :label-width="editBookFormLabelWidth">
          <el-input v-model="editBookForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="editBookFormLabelWidth">
          <el-input v-model="editBookForm.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" :label-width="editBookFormLabelWidth">
          <el-input v-model="editBookForm.isbn" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="editBookFormLabelWidth">
          <el-input v-model="editBookForm.press" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开本" :label-width="editBookFormLabelWidth">
          <el-input v-model="editBookForm.booksize" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版时间" :label-width="editBookFormLabelWidth">
          <el-input v-model="editBookForm.pubtime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="editBookFormLabelWidth">
          <el-input v-model="editBookForm.inventory" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="editBookFormLabelWidth">
          <el-input type="textarea" autosize v-model="editBookForm.intro" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editBookFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bookData: [],
      search: '',
      addBookFormVisible: false,
      addBookForm: {
        name: null,
        author: null,
        isbn: null,
        press: null,
        booksize: null,
        pubtime: null,
        inventory: null,
        intro: null
      },
      addBookFormLabelWidth: '100px',
      editBookFormVisible: false,
      editBookForm: {
        cover: null,
        name: null,
        author: null,
        isbn: null,
        press: null,
        booksize: null,
        pubtime: null,
        inventory: null,
        intro: null
      },
      editBookFormLabelWidth: '100px',
      imageBase64: ''
    }
  },
  mounted: function () {
    this.show()
  },
  methods: {
    handleAdd () {
      this.addBookFormVisible = false
      this.$axios.get('/books/create', {
        params: {
          bookCover: this.imageBase64,
          bookName: this.addBookForm.name,
          bookAuthor: this.addBookForm.author,
          bookIsbn: this.addBookForm.isbn,
          bookPress: this.addBookForm.press,
          bookSize: this.addBookForm.booksize,
          bookPubtime: this.addBookForm.pubtime,
          bookIntro: this.addBookForm.intro,
          bookInventory: this.addBookForm.inventory
        }
      })
      location.reload()
    },
    clearBookForm () {
      this.addBookForm.name = null
      this.addBookForm.author = null
      this.addBookForm.isbn = null
      this.addBookForm.press = null
      this.addBookForm.booksize = null
      this.addBookForm.pubtime = null
      this.addBookForm.intro = null
      this.addBookForm.inventory = null
    },
    handleEdit (index, row) {
      this.editBookFormVisible = true
      this.editBookForm.cover = row.cover
      this.editBookForm.name = row.bookname
      this.editBookForm.author = row.author
      this.editBookForm.isbn = row.isbn
      this.editBookForm.press = row.press
      this.editBookForm.booksize = row.size
      this.editBookForm.pubtime = row.pubtime
      this.editBookForm.intro = row.intro
      this.editBookForm.inventory = row.inventory
    },
    updateEdit () {
      this.editBookFormVisible = false
      this.$axios.get('/books/update', {
        params: {
          bookCover: this.editBookForm.cover,
          bookName: this.editBookForm.name,
          bookAuthor: this.editBookForm.author,
          bookIsbn: this.editBookForm.isbn,
          bookPress: this.editBookForm.press,
          bookSize: this.editBookForm.booksize,
          bookPubtime: this.editBookForm.pubtime,
          bookIntro: this.editBookForm.intro,
          bookInventory: this.editBookForm.inventory
        }
      })
      location.reload()
    },
    show () {
      this.$axios.get('/books/showAll')
        .then((response) => {
          this.bookData = response.data
        })
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该书本?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/books/delete', {
          params: {
            bookIsbn: row.isbn
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        location.reload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    getFile (file, fileList) {
      this.getBase64(file.raw).then(res => {
        this.imageBase64 = res
      })
    },
    changeCover (file, fileList) {
      this.getBase64(file.raw).then(res => {
        this.editBookForm.cover = res
      })
    }
  }
}
</script>

<style>
  @import "../assets/css/index.css";
</style>
