(function(t){function e(e){for(var o,i,s=e[0],u=e[1],c=e[2],l=0,d=[];l<s.length;l++)i=s[l],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&d.push(a[i][0]),a[i]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(t[o]=u[o]);m&&m(e);while(d.length)d.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,i=1;i<n.length;i++){var u=n[i];0!==a[u]&&(o=!1)}o&&(r.splice(e--,1),t=s(s.s=n[0]))}return t}var o={},a={app:0},r=[];function i(t){return s.p+"js/"+({}[t]||t)+"."+{"chunk-2d0d09e9":"e8b7f465"}[t]+".js"}function s(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n=a[t];if(0!==n)if(n)e.push(n[2]);else{var o=new Promise((function(e,o){n=a[t]=[e,o]}));e.push(n[2]=o);var r,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=i(t);var c=new Error;r=function(e){u.onerror=u.onload=null,clearTimeout(l);var n=a[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+o+": "+r+")",c.name="ChunkLoadError",c.type=o,c.request=r,n[1](c)}a[t]=void 0}};var l=setTimeout((function(){r({type:"timeout",target:u})}),12e4);u.onerror=u.onload=r,document.head.appendChild(u)}return Promise.all(e)},s.m=t,s.c=o,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(n,o,function(e){return t[e]}.bind(null,o));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var m=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Header"),n("router-view")],1)},r=[],i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("nav",[o("div",{staticClass:"navBar"},[o("router-link",{attrs:{to:"/"}},[o("h1",[o("img",{attrs:{alt:"gogodutch logo",src:n("c367")}})])]),"/"===this.$route.path?o("button",{staticClass:"navBtn circleBtn",attrs:{type:"button"},on:{click:t.addNewGroup}},[o("font-awesome-icon",{attrs:{icon:"fa-solid fa-plus",size:"lg"}})],1):o("button",{staticClass:"navBtn circleBtn",attrs:{type:"button"},on:{click:t.goPath}},[o("font-awesome-icon",{attrs:{icon:"fa-solid fa-arrow-left-long",size:"lg"}})],1)],1)])},s=[],u=n("2909"),c=(n("d81d"),{data:function(){return{scroll:0,newGroup:{}}},methods:{addShadow:function(){this.scroll=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;var t=document.querySelector("nav");this.scroll>0?t.classList.add("add-shadow"):t.classList.remove("add-shadow")},addNewGroup:function(){var t=JSON.parse(window.localStorage.getItem("HomeData"));if(!t||1===t.length&&0===t[0].member.length)this.$bus.$emit("pushNew");else{var e=t.map((function(t){return t.id}));this.newGroup={id:+Math.max.apply(Math,Object(u["a"])(e))+1,groupName:"新增群組",member:[]},this.$bus.$emit("pushNew",this.newGroup)}},goPath:function(){this.$router.push("/")}},mounted:function(){}}),l=c,m=n("2877"),d=Object(m["a"])(l,i,s,!1,null,null,null),f=d.exports,p={name:"app",components:{Header:f}},h=p,g=(n("034f"),Object(m["a"])(h,a,r,!1,null,null,null)),v=g.exports,b=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"groupBlock"},[n("div",{staticClass:"container"},[n("ul",{staticClass:"groupList",attrs:{"data-aos":"fade-right"}},t._l(t.groupData,(function(e){return n("li",{key:e.id,staticClass:"groupName",class:{unActive:0===e.member.length}},[n("div",{staticClass:"title d-flex justify-content-between"},[n("h2",[t._v(t._s(e.groupName))]),n("button",{attrs:{type:"button"},on:{click:function(n){return t.deleGroup(e)}}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-trash",size:"xl"}})],1)]),n("div",{staticClass:"member d-flex"},[n("p",[t._v("成員：")]),n("ul",{staticClass:"d-flex align-item-center"},t._l(e.member,(function(e,o){return n("li",{key:o},[t._v(t._s(e))])})),0)]),n("div",{staticClass:"goPath",on:{click:function(n){return t.openEdit(e)}}},[0===e.member.length?n("span",[t._v("建立 "),n("font-awesome-icon",{attrs:{icon:"fa-solid fa-arrow-right-long"}})],1):n("span",[t._v("進入 "),n("font-awesome-icon",{attrs:{icon:"fa-solid fa-arrow-right-long"}})],1)])])})),0)]),n("div",{staticClass:"editBlock",class:{show:t.isEdit}},[n("div",{staticClass:"blockHead d-flex justify-content-between align-item-center"},[n("h3",[t._v("新增群組")]),n("button",{staticClass:"editBtn",attrs:{type:"button"},on:{click:t.closeEdit}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-xmark",size:"2x"}})],1)]),n("div",{staticClass:"blockMain"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.temp.groupName,expression:"temp.groupName"}],ref:"autofocus",attrs:{type:"text",placeholder:"群組名稱(不超過10個字)"},domProps:{value:t.temp.groupName},on:{input:function(e){e.target.composing||t.$set(t.temp,"groupName",e.target.value)}}}),n("ul",t._l(t.temp.member,(function(e){return n("li",{key:e.id,staticClass:"d-flex align-item-center justify-content-between"},[n("label",{attrs:{for:e.id}},[t._v("成員")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"i.name"}],attrs:{id:e.id,type:"text"},domProps:{value:e.name},on:{input:function(n){n.target.composing||t.$set(e,"name",n.target.value)}}}),n("button",{staticClass:"editBtn",attrs:{type:"button"},on:{click:function(n){return t.deleMember(e)}}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-minus"}})],1)])})),0)]),n("div",{staticClass:"blockBottom"},[n("button",{staticClass:"circleBtn addNewBtn",attrs:{type:"button"},on:{click:t.addMember}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-plus"}})],1),n("button",{staticClass:"lgBtn",attrs:{type:"button"},on:{click:function(e){return t.doneEdit(t.temp)}}},[t._v("開始記帳")])])]),t._m(0)])},y=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",[n("p",[t._v("©2022 GOGODUTCH//. All Rights Reserved.")])])}],C=(n("e9c4"),n("b0c0"),n("4e82"),n("99af"),n("159b"),n("c740"),n("a434"),{data:function(){return{groupData:[{id:1,groupName:"新增群組",member:[]}],isEdit:!1,temp:{groupName:"",id:0,member:[{id:1,name:""},{id:2,name:""}]}}},methods:{saveStorage:function(){var t=JSON.stringify(this.groupData);localStorage.setItem("HomeData",t)},getStorage:function(){var t=JSON.parse(localStorage.getItem("HomeData"));t&&(this.groupData=t)},goPath:function(t){this.$router.push({name:"Groups",params:{id:t}})},closeEdit:function(){this.isEdit=!1,this.temp={groupName:"",id:0,member:[{id:1,name:""},{id:2,name:""}]}},openEdit:function(t){var e=this;t.member.length>0?this.goPath(t.id):0!==t.member.length&&this.isEdit||(this.temp.id=t.id,this.isEdit=!0,setTimeout((function(){e.$refs.autofocus.focus()}),100))},doneEdit:function(t){var e=this,n=t.member.map((function(t){return t.name})),o=t.member.every((function(t){return""!==t.name}));if(t.groupName)if(t.groupName.length>10)this.$swal.fire({title:"名稱不可超過10個字!",showConfirmButton:!1,timer:1e3});else if(o){for(var a=n.concat().sort(),r=0;r<a.length;r++)if(a[r]===a[r+1])return void this.$swal.fire({title:"使用者名稱重複!",showConfirmButton:!1,timer:1e3});this.groupData.forEach((function(t){t.id===e.temp.id&&(t.groupName=e.temp.groupName,t.member=n,e.goPath(t.id))})),this.saveStorage(),this.closeEdit()}else this.$swal.fire({title:"請輸入使用者名稱!",showConfirmButton:!1,timer:1e3});else this.$swal.fire({title:"請輸入群組名稱!",showConfirmButton:!1,timer:1e3})},addMember:function(){if(this.temp.member.length>=8)this.$swal.fire({title:"最多八名成員!",showConfirmButton:!1,timer:1e3});else{var t=this.temp.member.map((function(t){return t.id}));this.temp.member.push({id:Math.max.apply(Math,Object(u["a"])(t))+1||this.temp.member.length+1,name:""})}},deleMember:function(t){if(this.temp.member.length<=2)this.$swal.fire({title:"最少兩名成員!",showConfirmButton:!1,timer:1e3});else{var e=this.temp.member.findIndex((function(e){return e.id===t.id}));this.temp.member.splice(e,1)}},deleGroup:function(t){var e=this;(this.groupData.length>1||this.groupData[0].member.length>0)&&this.$swal.fire({title:"確定要刪除?",text:"該群組的項目也會同時刪除",icon:"warning",showCancelButton:!0,confirmButtonText:"確定刪除",cancelButtonText:"取消"}).then((function(n){if(n.isConfirmed){var o=e.groupData.findIndex((function(e){return e.id===t.id}));localStorage.removeItem("group".concat(e.groupData[o].id)),e.groupData.splice(o,1),e.$swal.fire({title:"刪除成功",showConfirmButton:!1,timer:1e3}),0===e.groupData.length&&(e.groupData[0]={id:1,groupName:"新增群組",member:[]})}e.saveStorage()}))},pushData:function(t){t?(this.groupData.push(t),this.openEdit(t),this.saveStorage()):this.openEdit(this.groupData[0])}},mounted:function(){this.getStorage(),window.scrollTo(0,0)},created:function(){var t=this;this.$bus.$on("pushNew",(function(e){t.pushData(e)}))},beforeDestroy:function(){this.$bus.$off("pushNew")}}),x=C,_=Object(m["a"])(x,w,y,!1,null,null,null),$=_.exports;o["default"].use(b["a"]);var N=[{path:"/",name:"Home",component:$},{path:"/group/:id",name:"Groups",component:function(){return n.e("chunk-2d0d09e9").then(n.bind(null,"696f"))}}],k=new b["a"]({routes:N}),B=k,E=n("2f62");o["default"].use(E["a"]);var O=new E["a"].Store({state:{},mutations:{},actions:{},modules:{}}),D=n("5887"),S=n.n(D),j=n("f9d5"),P=n.n(j),M=n("f5af"),T=n.n(M),G=(n("e829"),n("ecee")),H=n("c074"),I=n("ad3d");n("4413");o["default"].prototype.$bus=new o["default"],G["c"].add(H["g"],H["a"],H["b"],H["e"],H["c"],H["h"],H["f"],H["d"]),o["default"].component("font-awesome-icon",I["a"]),o["default"].use(S.a,{componentPrefix:"vc"}),o["default"].use(P.a),o["default"].config.productionTip=!1,new o["default"]({created:function(){T.a.init({})},router:B,store:O,render:function(t){return t(v)}}).$mount("#app")},"85ec":function(t,e,n){},c367:function(t,e,n){t.exports=n.p+"img/gogodutch-en-logo.b7cb5a0d.svg"}});
//# sourceMappingURL=app.4c2bb29a.js.map