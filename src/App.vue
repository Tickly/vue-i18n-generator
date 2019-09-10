<template>
  <el-container style="height:100%;">
    <el-header height="auto">
      <div style="display:flex;justify-content:space-between;">
        <div>
          <el-button type="info" @click="setCurrent()">取消选中</el-button>
          <el-button type="primary" @click="addKey">添加 Key</el-button>
          <el-button type="primary" @click="addLanguage">添加 语言</el-button>
        </div>
        <div>
          <el-button @click="handleExport">导出</el-button>
          <el-button type="info" @click="dialogVisible = true">查看帮助</el-button>

          <el-dialog title="帮助文档" :visible.sync="dialogVisible">
            <p>点击数据即可选中节点，选中的节点会高亮显示。</p>
            <ul>
              <li>若有选中节点，则添加的节点为子节点。</li>
              <li>若无选中节点，则添加的节点为根节点。</li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-table
        ref="singleTable"
        highlight-current-row
        :data="list"
        row-key="fullPath"
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" />
        <el-table-column prop="key" label="key" />
        <el-table-column prop="fullPath" label="fullPath" />
        <el-table-column v-for="lang in languages" :key="lang" :label="lang">
          <template slot-scope="scope">
            <el-input v-if="scope.row.children.length === 0" v-model="scope.row.languages[lang]" />
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer height="auto">
      <p>拖拽文件到文本框，可导入现有数据</p>
      <el-input
        type="textarea"
        @drop.native.prevent="handleDrop"
        :rows="6"
        placeholder="请输入内容"
        :value="formatText"
      ></el-input>
    </el-footer>
  </el-container>
</template>

<script>
import Node from './models/Node.js'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      dialogVisible: false,
      list: [],
      languages: [],
      currentRow: null
    }
  },
  computed: {
    formatText() {
      let json = {}

      this.languages.forEach(lang => {
        json[lang] = this.list.reduce((p, c) => {
          let m = c.getLang(lang)

          return Object.assign(p, m)
        }, {})
      })

      return JSON.stringify(json)
    }
  },
  created() {},
  methods: {
    addKey() {
      this.$prompt('', '请输入Key').then(({ value }) => {
        if (!value) return

        let node = new Node(value)

        if (this.currentRow) {
          this.currentRow.append(node)
        } else {
          this.list.push(node)
        }
      })
    },
    addLanguage() {
      this.$prompt('', '请输入语言包名称').then(({ value }) => {
        if (value) this.languages.push(value)
      })
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handleExport() {
      let b = new Blob([this.formatText])

      let a = document.createElement('a')
      a.download = 'index.js'
      a.href = window.URL.createObjectURL(b)
      a.click()
    },
    handleDrop(e) {
      let { files } = e.dataTransfer

      if (files.length === 0) return

      let file = files[0]

      let reader = new FileReader()
      reader.onload = event => {
        this.import(JSON.parse(event.target.result))
      }
      reader.readAsText(file)
    },
    // 从文件导入数据，二次编辑
    import(json) {
      // 先解析出语言
      this.languages = Object.keys(json)

      let values = Object.values(json)

      // 从第一个语言提取出结构来
      let firstLanguage = values[0]
      this.list = Object.keys(firstLanguage).map(
        key => new Node(key, firstLanguage[key], json)
      )

      // this.list = Object.keys(Object.values(json)[0]).map(key => new Node(key))
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
.el-container {
  padding: 2em;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
