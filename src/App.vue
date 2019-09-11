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
          <el-button @click="handleImport">导入</el-button>
          <el-button @click="handleExport">导出</el-button>
          <el-button type="info" @click="dialogVisible = true">查看帮助</el-button>

          <el-dialog title="帮助文档" :visible.sync="dialogVisible">
            <p>点击数据即可选中节点，选中的节点会高亮显示。</p>
            <ul>
              <li>若有选中节点，则添加的节点为子节点。</li>
              <li>若无选中节点，则添加的节点为根节点。</li>
            </ul>
            <p>鼠标移动到路径上，会出现“复制”按钮，方便复制路径</p>
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
        <el-table-column prop="fullPath" label="路径">
          <template slot-scope="scope">
            <div class="cell-fullPath">
              <span>{{scope.row.fullPath}}</span>
              <el-button size="small" @click="copyText(scope.row.fullPath)">复制</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-for="lang in languages" :key="lang" :label="lang">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.children.length === 0"
              v-model="scope.row.languages[lang]"
              :class="{'is-invalid':  !scope.row.languages[lang] }"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="danger" @click="handleRemove(scope.row)">移除</el-button>
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
    // 选择文件导入
    handleImport() {
      let input = document.createElement('input')
      input.type = 'file'
      input.accept = 'application/json'
      input.onchange = e => {
        let { files } = e.target
        this.importByFile(files)
      }
      input.click()
    },
    // 导出
    handleExport() {
      let b = new Blob([this.formatText])

      let a = document.createElement('a')
      a.download = 'messages.json'
      a.href = window.URL.createObjectURL(b)
      a.click()
    },
    // 拖放导入
    handleDrop(e) {
      let { files } = e.dataTransfer

      this.importByFile(files)
    },
    // 从文件导入数据，二次编辑
    importByFile(files) {
      if (files.length === 0) return

      let file = files[0]

      let reader = new FileReader()
      reader.onload = event => {
        let json = JSON.parse(event.target.result)

        // 先解析出语言
        this.languages = Object.keys(json)

        let values = Object.values(json)

        // 从第一个语言提取出结构来
        let firstLanguage = values[0]
        this.list = Object.keys(firstLanguage).map(
          key => new Node(key, firstLanguage[key], json)
        )
      }
      reader.readAsText(file)
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    // 复制文字
    copyText(text) {
      let input = document.createElement('textarea')
      input.value = text
      input.style.position = 'fixed'
      input.style.top = 0
      input.style.opacity = 0
      document.body.appendChild(input)
      input.select()
      if (document.execCommand('copy')) {
        this.$message(`文字 ${text} 已复制`)
      }
      document.body.removeChild(input)
    },
    handleRemove(node) {
      if (node.parent) node.remove()
      else this.list = this.list.filter(n => n.key !== node.key)
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
<style lang="scss">
.cell-fullPath {
  display: flex;
  justify-content: space-between;

  .el-button {
    visibility: hidden;
  }

  &:hover .el-button {
    visibility: visible;
  }
}

.el-input.is-invalid {
  .el-input__inner {
    border-color: #f56c6c;
  }
}
</style>