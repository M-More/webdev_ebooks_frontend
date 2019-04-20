<template>
  <div id="bookmanage">
    <div id="heading">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <p id="title">e-Book</p>
        <p id="subtitle">书籍管理</p>
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
        <el-form-item label="书名" :label-width="addBookFormLabelWidth">
          <el-input v-model="addBookForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="addBookFormLabelWidth">
          <el-input v-model="addBookForm.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" :label-width="addBookFormLabelWidth">
          <el-input v-model="addBookForm.isbn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" :label-width="addBookFormLabelWidth">
          <el-input v-model="addBookForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="addBookFormLabelWidth">
          <el-input v-model="addBookForm.inventory" autocomplete="off"></el-input>
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
        <el-form-item label="书名" :label-width="editBookFormLabelWidth">
          <el-input v-model="editBookForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="editBookFormLabelWidth">
          <el-input v-model="editBookForm.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" :label-width="editBookFormLabelWidth">
          <el-input v-model="editBookForm.isbn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" :label-width="editBookFormLabelWidth">
          <el-input v-model="editBookForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="editBookFormLabelWidth">
          <el-input v-model="editBookForm.inventory" autocomplete="off"></el-input>
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
        name: '',
        author: '',
        isbn: '',
        price: null,
        inventory: null
      },
      addBookFormLabelWidth: '100px',
      editBookFormVisible: false,
      editBookForm: {
        name: '',
        author: '',
        isbn: '',
        price: null,
        inventory: null
      },
      editBookFormLabelWidth: '100px'
    }
  },
  methods: {
    handleAdd () {
      this.addBookFormVisible = false
      this.$axios.get('/books/create', {
        params: {
          bookName: this.addBookForm.name,
          bookAuthor: this.addBookForm.author,
          bookIsbn: this.addBookForm.isbn,
          bookPrice: this.addBookForm.price,
          bookInventory: this.addBookForm.inventory
        }
      })
    },
    clearBookForm () {
      this.addBookForm.name = ''
      this.addBookForm.author = ''
      this.addBookForm.isbn = ''
      this.addBookForm.price = null
      this.addBookForm.inventory = null
    },
    handleEdit (index, row) {
      this.editBookFormVisible = true
      this.editBookForm.name = row.bookname
      this.editBookForm.author = row.author
      this.editBookForm.isbn = row.isbn
      this.editBookForm.price = row.price
      this.editBookForm.inventory = row.inventory
    },
    updateEdit () {
      this.editBookFormVisible = false
      this.$axios.get('/books/update', {
        params: {
          bookName: this.editBookForm.name,
          bookAuthor: this.editBookForm.author,
          bookIsbn: this.editBookForm.isbn,
          bookPrice: this.editBookForm.price,
          bookInventory: this.editBookForm.inventory
        }
      })
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
        this.bookData.splice(index, 1)
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
    }
  }
}
</script>

<style>
  @import "../assets/css/index.css";
</style>
