import{J as e,j as a}from"./jsHoursEchart-da5208bf.js";import{t as l}from"./index-733efa5e.js";import{u as r}from"./usePagination-8cf4a98b.js";import{D as t}from"./detailPopup-2fcb0990.js";import{i as o,R as n,Q as p,_ as s,r as i,o as d,a as u,k as c,l as g,d as m,e as h,y as f,b as D}from"./index-79304586.js";import"./index-36d9c146.js";import"./validate-f5786776.js";import"./service-d7e6e336.js";import"./index-f12dd43e.js";const C={class:"app-container"},b={class:"table-wrapper"},v={class:"pager-wrapper"};const U=s({components:{JsHoursEchart:e,DetailPopup:t},setup(){const e=o([]),t=o({pageUrl:"",simpleUrl:"",errorMsg:"",data:l({format:["00:00:00","23:59:59"]})}),{paginationData:s,handleCurrentChange:i,handleSizeChange:d}=r((()=>{u()})),u=async()=>{let l={pageUrl:t.value.pageUrl,errorMsg:t.value.errorMsg,startTime:t.value.data[0],endTime:t.value.data[1],page:s.currentPage,pageSize:s.pageSize},r=await a(l);r.success&&(s.total=r.model.count,e.value=r.model.list)},c=()=>{u()},g=o({});return n((()=>{c()})),{searchData:t,paginationData:s,handleCurrentChange:i,handleSizeChange:d,tableData:e,resetSearch:()=>{t.value={pageUrl:"",simpleUrl:"",errorMsg:"",data:l({format:["00:00:00","23:59:59"]})},s.currentPage=1},initQuery:c,handleDetail:e=>{g.value={},p((()=>g.value=e))},perfNode:g}}},[["render",function(e,a,l,r,t,o){const n=i("el-input"),p=i("el-form-item"),s=i("el-date-picker"),U=i("el-button"),_=i("el-form"),y=i("el-card"),z=i("JsHoursEchart"),j=i("el-table-column"),V=i("el-table"),S=i("el-pagination"),k=i("DetailPopup");return d(),u("div",C,[c(y,{shadow:"never",class:"search-wrapper"},{default:g((()=>[c(_,{ref:"searchFormRef",inline:!0,model:r.searchData},{default:g((()=>[c(p,{prop:"pageUrl",label:"页面链接"},{default:g((()=>[c(n,{modelValue:r.searchData.pageUrl,"onUpdate:modelValue":a[0]||(a[0]=e=>r.searchData.pageUrl=e),placeholder:"请输入页面链接"},null,8,["modelValue"])])),_:1}),c(p,{prop:"simpleUrl",label:"页面链接"},{default:g((()=>[c(n,{modelValue:r.searchData.simpleUrl,"onUpdate:modelValue":a[1]||(a[1]=e=>r.searchData.simpleUrl=e),placeholder:"请输入带*的页面链接"},null,8,["modelValue"])])),_:1}),c(p,{prop:"url",label:"错误信息"},{default:g((()=>[c(n,{modelValue:r.searchData.errorMsg,"onUpdate:modelValue":a[2]||(a[2]=e=>r.searchData.errorMsg=e),placeholder:"请输入错误信息"},null,8,["modelValue"])])),_:1}),c(p,{prop:"phone",label:"日期"},{default:g((()=>[c(s,{modelValue:r.searchData.data,"onUpdate:modelValue":a[3]||(a[3]=e=>r.searchData.data=e),type:"datetimerange","range-separator":"-","start-placeholder":"开始时间","end-placeholder":"结束时间"},null,8,["modelValue"])])),_:1}),c(p,null,{default:g((()=>[c(U,{type:"primary",onClick:r.initQuery},{default:g((()=>[f("查询")])),_:1},8,["onClick"]),c(U,{onClick:r.resetSearch},{default:g((()=>[f("重置")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])])),_:1}),c(y,{shadow:"never"},{default:g((()=>[c(z,{params:r.searchData},null,8,["params"])])),_:1}),c(y,{shadow:"never",class:"mt20"},{default:g((()=>[D("div",b,[c(V,{border:"",data:r.tableData},{default:g((()=>[c(j,{prop:"type",label:"错误类型",align:"center"}),c(j,{prop:"errorMsg",label:"错误内容",align:"center"}),c(j,{prop:"simpleUrl",label:"上报页面",align:"center"}),c(j,{prop:"happenTime",label:"上报时间",align:"center"}),c(j,{prop:"uuId",label:"上报人",align:"center"}),c(j,{label:"操作",fixed:"right",align:"center"},{default:g((({row:e})=>[c(U,{type:"text",onClick:a=>r.handleDetail(e)},{default:g((()=>[f(" 查看详情 ")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])]),D("div",v,[c(S,{background:"",layout:r.paginationData.layout,"page-sizes":r.paginationData.pageSizes,total:r.paginationData.total,"page-size":r.paginationData.pageSize,currentPage:r.paginationData.currentPage,onSizeChange:r.handleSizeChange,onCurrentChange:r.handleCurrentChange},null,8,["layout","page-sizes","total","page-size","currentPage","onSizeChange","onCurrentChange"])])])),_:1}),r.perfNode.type?(d(),m(k,{key:0,perfNode:r.perfNode},null,8,["perfNode"])):h("",!0)])}],["__scopeId","data-v-8368ad5c"]]);export{U as default};
//# sourceMappingURL=list-a026b592.js.map
