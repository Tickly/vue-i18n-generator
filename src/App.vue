<template>
  <el-container style="height: 100%">
    <el-header height="auto">
      <el-dialog title="帮助文档" :visible.sync="dialogVisible">
        <ol>
          <li>新文档就先新增根节点再添加语言</li>
          <li>已有文档就点导入或者拖到下方文本框</li>
          <li>鼠标移动到节点路径上，会出现“复制”按钮，方便复制节点路径</li>
          <li>双击节点名称可以进行修改</li>
          <li>双击语言内容可以进行修改</li>
        </ol>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary" @click="dialogVisible = false"
          >确 定</el-button>
        </span>
      </el-dialog>

      <el-row>
        <el-col :span="12">
          <el-button-group>
            <el-button type="primary" @click="handleImport">
              {{ $t('actions.import') }}
            </el-button>
            <el-button type="primary" @click="handleExport">
              {{ $t('actions.export') }}
            </el-button>
          </el-button-group>
        </el-col>
        <el-col :span="12" class="text-right flex gap-4 justify-end">
          <a href="https://support.qq.com/product/607712" target="_blank">
            <el-button>
              {{ $t('actions.feedback') }}
            </el-button>
          </a>
          <el-button type="info" @click="dialogVisible = true">
            {{ $t('actions.tips') }}
          </el-button>
          <el-radio-group v-model="$i18n.locale">
            <el-radio-button label="zh-CN">中文</el-radio-button>
            <el-radio-button label="en">English</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <p>
        <el-button type="primary" @click="handleAppendRoot">
          {{ $t('actions.addRootNode') }}
        </el-button>
        <el-button type="success" @click="addLanguage">
          {{ $t('actions.addLanguage') }}
        </el-button>
      </p>
      <el-table
        ref="singleTable"
        height="400"
        highlight-current-row
        :data="list"
        row-key="fullPath"
        border
        @cell-dblclick="handleCellDbClick"
      >
        <el-table-column type="index" align="center" />
        <el-table-column prop="key" :label="$t('columns.nodeName')" />
        <el-table-column prop="fullPath" :label="$t('columns.nodePath')">
          <template slot-scope="scope">
            <div class="cell-fullPath">
              <span>{{ scope.row.fullPath }}</span>
              <el-button size="mini" @click="copyText(scope.row.fullPath)">
                {{ $t('actions.copy') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-for="lang in languages"
          :key="lang"
          :prop="`lang-${lang}`"
          :label="lang"
        >
          <template slot-scope="scope">
            <div
              v-if="scope.row.children.length === 0"
              :key="scope.row.children.length"
              class="cell-lang-value"
            >
              {{ scope.row.languages[lang] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('columns.actions')" width="250">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              @click="handleRemove(scope.row)"
            >
              {{ $t('actions.remove') }}
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handleAppend(scope.row)"
            >
              {{ $t('actions.addSubNode') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <div class="flex justify-between items-center">
          <p>{{ $t('prompt.drag') }}</p>
          <el-button-group>
            <el-button type="primary" @click="onCopyJson">
              {{ $t('actions.copy') }}
            </el-button>
            <el-button disabled type="primary" @click="onPasteJson">
              {{ $t('actions.paste') }}
            </el-button>
          </el-button-group>
        </div>
        <el-input
          class="message-input"
          type="textarea"
          :rows="3"
          :value="formatText"
          resize="none"
          @drop.native.prevent="handleDrop"
        />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Node from './models/Node.js'

export default {
  name: 'App',
  data() {
    return {
      filename: 'message.json',
      dialogVisible: false,
      list: [],
      languages: [],
    }
  },
  computed: {
    formatText() {
      let json = {}

      this.languages.forEach((lang) => {
        json[lang] = this.list.reduce((p, c) => {
          let m = c.getLang(lang)

          return Object.assign(p, m)
        }, {})
      })

      return JSON.stringify(json)
    },
  },
  created() {
    this.parseJson({
      en: {
        Account: {
          Username: 'Username',
          Password: 'Password',
        },
      },
      'zh-CN': {
        Account: {
          Username: '姓名',
          Password: '密码',
        },
      },
    })
  },
  methods: {
    addKey(parent) {
      this.$prompt('请输入新的节点名', '新增')
        .then(({ value }) => {
          if (!value) return

          let node = new Node(value)

          if (parent) parent.append(node)
          else this.list.push(node)
        })
        .catch(() => {})
    },
    addLanguage() {
      this.$prompt('', '请输入语言名称').then(({ value }) => {
        if (value) this.languages.push(value)
      })
    },

    // 选择文件导入
    handleImport() {
      let input = document.createElement('input')
      input.type = 'file'
      input.accept = 'application/json'
      input.onchange = (e) => {
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
      if (files.length !== 1) {
        return
      }

      let file = files[0]

      // 解析出文件名，方便导出的时候直接使用原来的文件名
      this.filename = file.name

      let reader = new FileReader()
      reader.onload = (event) => {
        let json = JSON.parse(event.target.result)

        this.parseJson(json)
      }
      reader.readAsText(file)
    },
    parseJson(json) {
      // 先解析出语言
      this.languages = Object.keys(json)

      let values = Object.values(json)

      // 从第一个语言提取出结构来
      let firstLanguage = values[0]
      this.list = Object.keys(firstLanguage).map(
        (key) => new Node(key, firstLanguage[key], json)
      )
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
        this.$message.success('复制成功')
      }
      document.body.removeChild(input)
    },
    // 移除节点
    handleRemove(node) {
      this.$confirm(`确定要移除节点 ${node.fullPath} 吗？`, '确认')
        .then(() => {
          if (node.parent) node.remove()
          else this.list = this.list.filter((n) => n.key !== node.key)
        })
        .catch(() => {})
    },
    // 添加子节点
    handleAppend(node) {
      this.addKey(node)
    },
    // 添加根节点
    handleAppendRoot() {
      this.addKey()
    },
    handleCellDbClick(row, column, cell, event) {
      console.log(row, column)

      if (column.property === 'key') {
        this.$prompt('请输入新的节点名', '修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[a-zA-Z][a-zA-Z0-9]*$/,
          inputErrorMessage: '目前只允许输入字母与数字，且必须是字母开头',
          inputValue: row.key,
        })
          .then(({ value }) => {
            row.key = value
          })
          .catch(() => {})
      }

      // 如果是lang-开头的列，表示是语言值
      if (column.property.indexOf('lang-') === 0) {
        // 如果不包含子节点了，则可以修改值
        if (row.children.length === 0) {
          let lang = column.property.slice(5)
          let value = row.languages[lang]

          this.$prompt('请输入新的内容', '修改', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue: value,
          })
            .then(({ value }) => {
              row.setContent(lang, value)
            })
            .catch(() => {})
        }
      }
    },

    onCopyJson() {
      this.copyText(this.formatText)
      // this.$message.success()
    },
    onPasteJson() {},
  },
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
.flex {
  display: flex;
}
.justify-end {
  justify-content: flex-end;
}
.justify-between {
  justify-content: space-between;
}
.items-center {
  align-items: center;
}
.gap-4 {
  gap: 1rem;
}
.text-right {
  text-align: right;
}
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

.message-input textarea {
  border-width: 3px;
  border-style: dashed;
}
</style>
