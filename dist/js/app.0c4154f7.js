(function(e){function t(t){for(var a,r,i=t[0],s=t[1],c=t[2],p=0,d=[];p<i.length;p++)r=i[p],Object.prototype.hasOwnProperty.call(l,r)&&l[r]&&d.push(l[r][0]),l[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);u&&u(t);while(d.length)d.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,i=1;i<n.length;i++){var s=n[i];0!==l[s]&&(a=!1)}a&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},l={app:0},o=[];function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var u=s;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"357f":function(e,t,n){},4338:function(e,t,n){},"553b":function(e,t,n){"use strict";n("4338")},"56d7":function(e,t,n){"use strict";n.r(t);var a=n("2b0e"),l=n("a925"),o=n("eba1"),r=n("5c96"),i=n.n(r),s=(n("0fae"),function(){var e=this,t=e._self._c;return t("el-container",{staticStyle:{height:"100%"}},[t("el-header",{attrs:{height:"auto"}},[t("el-dialog",{attrs:{title:"帮助文档",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("ol",[t("li",[e._v("新文档就先新增根节点再添加语言")]),t("li",[e._v("已有文档就点导入或者拖到下方文本框")]),t("li",[e._v("鼠标移动到节点路径上，会出现“复制”按钮，方便复制节点路径")]),t("li",[e._v("双击节点名称可以进行修改")]),t("li",[e._v("双击语言内容可以进行修改")])]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)]),t("el-row",[t("el-col",{attrs:{span:12}},[t("el-button-group",[t("el-button",{attrs:{type:"primary"},on:{click:e.handleImport}},[e._v(" "+e._s(e.$t("actions.import"))+" ")]),t("el-button",{attrs:{type:"primary"},on:{click:e.handleExport}},[e._v(" "+e._s(e.$t("actions.export"))+" ")])],1)],1),t("el-col",{staticClass:"text-right flex gap-4 justify-end",attrs:{span:12}},[t("a",{attrs:{href:"https://support.qq.com/product/607712",target:"_blank"}},[t("el-button",[e._v(" "+e._s(e.$t("actions.feedback"))+" ")])],1),t("el-button",{attrs:{type:"info"},on:{click:function(t){e.dialogVisible=!0}}},[e._v(" "+e._s(e.$t("actions.tips"))+" ")]),t("el-select",{attrs:{placeholder:"选择语言"},model:{value:e.$i18n.locale,callback:function(t){e.$set(e.$i18n,"locale",t)},expression:"$i18n.locale"}},[t("el-option",{attrs:{label:"中文",value:"zh-CN"}}),t("el-option",{attrs:{label:"English",value:"en"}})],1)],1)],1)],1),t("el-main",[t("p",[t("el-button",{attrs:{type:"primary"},on:{click:e.handleAppendRoot}},[e._v(" "+e._s(e.$t("actions.addRootNode"))+" ")]),t("el-button",{attrs:{type:"success"},on:{click:e.addLanguage}},[e._v(" "+e._s(e.$t("actions.addLanguage"))+" ")])],1),t("el-table",{ref:"singleTable",attrs:{height:"400","highlight-current-row":"",data:e.list,"row-key":"fullPath",border:""},on:{"cell-dblclick":e.handleCellDbClick}},[t("el-table-column",{attrs:{type:"index",align:"center"}}),t("el-table-column",{attrs:{prop:"key",label:e.$t("columns.nodeName")}}),t("el-table-column",{attrs:{prop:"fullPath",label:e.$t("columns.nodePath")},scopedSlots:e._u([{key:"default",fn:function(n){return[t("div",{staticClass:"cell-fullPath"},[t("span",[e._v(e._s(n.row.fullPath))]),t("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.copyText(n.row.fullPath)}}},[e._v(" "+e._s(e.$t("actions.copy"))+" ")])],1)]}}])}),e._l(e.languages,(function(n){return t("el-table-column",{key:n,attrs:{prop:"lang-"+n,label:n},scopedSlots:e._u([{key:"default",fn:function(a){return[0===a.row.children.length?t("div",{key:a.row.children.length,staticClass:"cell-lang-value"},[e._v(" "+e._s(a.row.languages[n])+" ")]):e._e()]}}],null,!0)})})),t("el-table-column",{attrs:{label:e.$t("columns.actions"),width:"250"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){return e.handleRemove(n.row)}}},[e._v(" "+e._s(e.$t("actions.remove"))+" ")]),t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleAppend(n.row)}}},[e._v(" "+e._s(e.$t("actions.addSubNode"))+" ")])]}}])})],2),t("div",[t("p",[e._v("拖拽文件到文本框，可导入现有数据")]),t("el-input",{attrs:{type:"textarea",rows:5,placeholder:"请输入内容",value:e.formatText},nativeOn:{drop:function(t){return t.preventDefault(),e.handleDrop.apply(null,arguments)}}})],1)],1)],1)}),c=[];function u(e,t){let n=t.split("."),a=e;do{a=a[n.shift()]}while(n.length);return a}class p{constructor(e,t,n){this.key=e,this.children=[],"object"===typeof t&&Object.keys(t).forEach(e=>{this.append(new p(e,t[e],n))}),this.languages={},n&&setTimeout(()=>{this.languages=Object.keys(n).reduce((e,t)=>{let a=n[t];return e[t]=u(a,this.fullPath),e},{})},0)}getLang(e){let t={};return this.children.length?t[this.key]=this.children.reduce((t,n)=>Object.assign(t,n.getLang(e)),{}):t[this.key]=this.languages[e],t}get fullPath(){return this.parent?`${this.parent.fullPath}.${this.key}`:this.key}append(e){e.parent=this,this.children.push(e)}remove(){this.parent.children=this.parent.children.filter(e=>e.key!==this.key),0===this.parent.children.length&&(this.parent.languages={})}setContent(e,t){this.languages={...this.languages,[e]:t}}}var d={name:"App",data(){return{filename:"message.json",dialogVisible:!1,list:[],languages:[]}},computed:{formatText(){let e={};return this.languages.forEach(t=>{e[t]=this.list.reduce((e,n)=>{let a=n.getLang(t);return Object.assign(e,a)},{})}),JSON.stringify(e)}},created(){this.parseJson({en:{Account:{Username:"Username",Password:"Password"}},"zh-CN":{Account:{Username:"姓名",Password:"密码"}}})},methods:{addKey(e){this.$prompt("请输入新的节点名","新增").then(({value:t})=>{if(!t)return;let n=new p(t);e?e.append(n):this.list.push(n)}).catch(()=>{})},addLanguage(){this.$prompt("","请输入语言名称").then(({value:e})=>{e&&this.languages.push(e)})},handleImport(){let e=document.createElement("input");e.type="file",e.accept="application/json",e.onchange=e=>{let{files:t}=e.target;this.importByFile(t)},e.click()},handleExport(){let e=new Blob([this.formatText]),t=document.createElement("a");t.download="messages.json",t.href=window.URL.createObjectURL(e),t.click()},handleDrop(e){let{files:t}=e.dataTransfer;this.importByFile(t)},importByFile(e){if(1!==e.length)return;let t=e[0];this.filename=t.name;let n=new FileReader;n.onload=e=>{let t=JSON.parse(e.target.result);this.parseJson(t)},n.readAsText(t)},parseJson(e){this.languages=Object.keys(e);let t=Object.values(e),n=t[0];this.list=Object.keys(n).map(t=>new p(t,n[t],e))},copyText(e){let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.top=0,t.style.opacity=0,document.body.appendChild(t),t.select(),document.execCommand("copy")&&this.$message(`节点路径 ${e} 已复制`),document.body.removeChild(t)},handleRemove(e){this.$confirm(`确定要移除节点 ${e.fullPath} 吗？`,"确认").then(()=>{e.parent?e.remove():this.list=this.list.filter(t=>t.key!==e.key)}).catch(()=>{})},handleAppend(e){this.addKey(e)},handleAppendRoot(){this.addKey()},handleCellDbClick(e,t,n,a){if(console.log(e,t),"key"===t.property&&this.$prompt("请输入新的节点名","修改",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^[a-zA-Z][a-zA-Z0-9]*$/,inputErrorMessage:"目前只允许输入字母与数字，且必须是字母开头",inputValue:e.key}).then(({value:t})=>{e.key=t}).catch(()=>{}),0===t.property.indexOf("lang-")&&0===e.children.length){let n=t.property.slice(5),a=e.languages[n];this.$prompt("请输入新的内容","修改",{confirmButtonText:"确定",cancelButtonText:"取消",inputValue:a}).then(({value:t})=>{e.setContent(n,t)}).catch(()=>{})}}}},h=d,f=(n("553b"),n("92c0"),n("2877")),g=Object(f["a"])(h,s,c,!1,null,null,null),m=g.exports;n("357f");a["default"].config.productionTip=!1,a["default"].use(l["a"]),a["default"].use(i.a);const b=new l["a"]({locale:"en",messages:o});new a["default"]({i18n:b,render:e=>e(m)}).$mount("#app")},"92c0":function(e,t,n){"use strict";n("ca6b")},ca6b:function(e,t,n){},eba1:function(e){e.exports=JSON.parse('{"en":{"actions":{"import":"Import","export":"Export","remove":"Remove","copy":"Copy","addLanguage":"Add Language","addRootNode":"Add Root Node","addSubNode":"Add Sub Node","tips":"Tips","feedback":"Feedback"},"columns":{"nodeName":"Node Name","nodePath":"Node Path","actions":"Actions"}},"zh-CN":{"actions":{"import":"导入","export":"导出","remove":"移除","copy":"复制","addLanguage":"添加语言","addRootNode":"添加根节点","addSubNode":"添加子节点","tips":"查看帮助","feedback":"意见反馈"},"columns":{"nodeName":"节点名称","nodePath":"节点路径","actions":"操作"}}}')}});
//# sourceMappingURL=app.0c4154f7.js.map