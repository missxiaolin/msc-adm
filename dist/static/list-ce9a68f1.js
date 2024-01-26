import{b as e}from"./index-2e00b83f.js";import{r as a}from"./service-d7e6e336.js";import{u as l}from"./usePagination-8cf4a98b.js";import{g as r,R as t,_ as o,r as n,o as u,d as i,l as d,b as s,k as p,y as m,z as g,i as c,K as y,a as h,e as f,F as b,A as C}from"./index-79304586.js";const S={class:"table-wrapper"},v={class:"pager-wrapper mt20 justify-end"};const V={components:{AlertHistoryTabel:o({props:{alarmId:{type:[String,Number],default:()=>""}},setup(e,{emit:o}){let n=r({isShowPorjectPop:!0,tableData:[]});const{paginationData:u,handleCurrentChange:i,handleSizeChange:d}=l((()=>{p()})),{alarmId:s}=e,p=async()=>{let e={alarmId:s,page:u.currentPage,pageSize:u.pageSize},l=await function(e){return a({url:"/adm/alert/history/list",method:"post",data:e})}(e);l.success&&(n.tableData=l.model.list,u.total=l.model.count)};t((()=>{p()}));return{data:n,handleClose:()=>{o("handleClose")},paginationData:u,handleCurrentChange:i,handleSizeChange:d}}},[["render",function(e,a,l,r,t,o){const c=n("el-table-column"),y=n("el-table"),h=n("el-pagination"),f=n("el-dialog");return u(),i(f,{modelValue:r.data.isShowPorjectPop,"onUpdate:modelValue":a[0]||(a[0]=e=>r.data.isShowPorjectPop=e),title:"告警历史",width:"60%","before-close":r.handleClose},{default:d((()=>[s("div",S,[p(y,{border:"",data:r.data.tableData},{default:d((()=>[p(c,{prop:"id",label:"ID",align:"center"}),p(c,{prop:"sendContent",label:"发送内容",align:"center"}),p(c,{prop:"isSuccess",label:"发送结果",align:"center"},{default:d((({row:e})=>[m(g(0==e.isSuccess?"失败":"成功"),1)])),_:1}),p(c,{prop:"errorMsg",label:"错误",align:"center"}),p(c,{prop:"updateTime",label:"发送时间",align:"center"})])),_:1},8,["data"])]),s("div",v,[p(h,{background:"",layout:r.paginationData.layout,"page-sizes":r.paginationData.pageSizes,total:r.paginationData.total,"page-size":r.paginationData.pageSize,currentPage:r.paginationData.currentPage,onSizeChange:r.handleSizeChange,onCurrentChange:r.handleCurrentChange},null,8,["layout","page-sizes","total","page-size","currentPage","onSizeChange","onCurrentChange"])])])),_:1},8,["modelValue","before-close"])}]])},setup(){let o=r({isShowPorjectPop:!1,projects:[],errorTypeOption:[{name:"JS告警",value:"JS_ERROR"},{name:"网络请求错误告警",value:"HTTP_LOG"},{name:"页面PV告警",value:"PAGE_PV"},{name:"页面UV告警",value:"PAGE_UV"},{name:"资源告警",value:"RESOURCE_ERROR"},{name:"PROMISE告警",value:"PROMISE_ERROR"}],tableData:[],serviceType:[{name:"等于",value:"="},{name:"小于",value:"<"},{name:"大于",value:">"}],whereTypeOption:[],alarmId:""});const n=c(),u=r({id:0,errorType:"",errorName:"",serviceType:"",whereType:"",timeRangeS:"",maxErrorCount:"",alarmIntervalS:"",isEnable:1,note:"",startHour:"",endHour:"",alertType:[],dingConfig:""}),i=r({errorType:[{required:!0,message:"请选择错误类型",trigger:"blur"}],errorName:[{required:!0,message:"请输入错误名称",trigger:"blur"}],serviceType:[{required:!0,message:"请选择参数",trigger:"blur"}],whereType:[{required:!0,message:"请选择参数",trigger:"blur"}],timeRangeS:[{required:!0,message:"请输入报警时间",trigger:"blur"}],maxErrorCount:[{required:!0,message:"请输入报警阈值",trigger:"blur"}],alarmIntervalS:[{required:!0,message:"请输入报警时间间隔",trigger:"blur"}],startHour:[{required:!0,message:"请选择起始时间",trigger:"change"}],endHour:[{required:!0,message:"请选择结束时间",trigger:"change"}]}),d=()=>{o.isShowPorjectPop=!1,u.id=0,u.errorType="",u.errorName="",u.timeRangeS="",u.maxErrorCount="",u.alarmIntervalS="",u.isEnable=1,u.note="",u.startHour="",u.endHour="",u.serviceType="",u.whereType="",u.alertType=[],o.whereTypeOption=[],u.dingConfig=""},{paginationData:s,handleCurrentChange:p,handleSizeChange:m}=l((()=>{g()})),g=async()=>{const e={page:s.currentPage,pageSize:s.pageSize},l=await function(e){return a({url:"/adm/alert/list",method:"post",data:e})}(e);l.success&&(o.tableData=l.model.list,s.total=l.model.count)},h=e=>{o.whereTypeOption="PAGE_PV"==e||"PAGE_UV"==e?[{name:"求和",value:"sum"}]:[{name:"求和",value:"sum"},{name:"单个",value:"single"}]};return t((()=>{(async()=>{let a=await e();a.success&&(o.projects=a.model)})(),g()})),{data:o,handleClose:d,ruleForm:u,rules:i,ruleFormRef:n,submitForm:async e=>{e&&await e.validate((async(e,l)=>{if(e){let e=u,l=await function(e){return a({url:"/adm/alert/save",method:"post",data:e})}(e);l.success?(y({message:"保存成功",type:"success"}),d(),g()):y({message:l.errorMessage,type:"error"})}}))},resetForm:e=>{e&&e.resetFields()},showHandleDetail:e=>{u.id=e.id,u.errorType=e.errorType,u.errorName=e.errorName,u.timeRangeS=e.timeRangeS,u.maxErrorCount=e.maxErrorCount,u.alarmIntervalS=e.alarmIntervalS,u.isEnable=e.isEnable,u.note=e.note,u.startHour=e.startHour,u.endHour=e.endHour,u.alertType=e.alertType,u.serviceType=e.serviceType,u.whereType=e.whereType,u.dingConfig=e.dingConfig||"",h(e.errorType),o.isShowPorjectPop=!0},paginationData:s,handleCurrentChange:p,handleSizeChange:m,errorTypeChange:h,clickHistory:e=>{o.alarmId=e.id},historyHandleClose:()=>{o.alarmId=""}}}},T={class:"app-container"},_={class:"flex"},w={class:"table-wrapper"},F={class:"pager-wrapper mt20 justify-end"},P={class:"flex"},x=s("span",null,"最近N秒内：",-1),H=s("span",{style:{margin:"0 5px 0 5px"}},"次",-1),z=s("span",{style:{padding:"0 10px 0 10px"}},"-",-1);const E=o(V,[["render",function(e,a,l,r,t,o){const c=n("el-button"),y=n("el-table-column"),S=n("el-table"),v=n("el-pagination"),V=n("el-card"),E=n("el-option"),R=n("el-select"),D=n("el-form-item"),k=n("el-input"),I=n("el-input-number"),U=n("QuestionFilled"),j=n("el-icon"),O=n("el-tooltip"),q=n("el-radio"),N=n("el-radio-group"),A=n("el-time-picker"),G=n("el-checkbox"),M=n("el-checkbox-group"),J=n("el-form"),L=n("el-dialog"),$=n("AlertHistoryTabel");return u(),h("div",T,[s("div",_,[p(c,{type:"primary",onClick:a[0]||(a[0]=e=>r.data.isShowPorjectPop=!0)},{default:d((()=>[m("新增告警")])),_:1})]),p(V,{class:"mt20"},{default:d((()=>[s("div",w,[p(S,{border:"",data:r.data.tableData},{default:d((()=>[p(y,{prop:"name",label:"项目名称",align:"center"}),p(y,{prop:"errorType",label:"错误类型",align:"center"}),p(y,{prop:"errorName",label:"错误名称",align:"center"}),p(y,{prop:"timeRangeS",label:"报警时间范围",align:"center"}),p(y,{prop:"maxErrorCount",label:"报警错误阈值",align:"center"}),p(y,{prop:"alarmIntervalS",label:"报警时间间隔",align:"center"}),p(y,{label:"是否开启",align:"center"},{default:d((({row:e})=>[m(g(0==e.isEnable?"禁用":"开启"),1)])),_:1}),p(y,{label:"告警时间段",align:"center"},{default:d((({row:e})=>[m(g(`${e.startHour}-${e.endHour}`),1)])),_:1}),p(y,{prop:"updateTime",label:"修改时间",align:"center"}),p(y,{label:"操作",align:"center"},{default:d((({row:e})=>[p(c,{type:"text",onClick:a=>r.showHandleDetail(e)},{default:d((()=>[m(" 修改 ")])),_:2},1032,["onClick"]),p(c,{type:"text",onClick:a=>r.clickHistory(e)},{default:d((()=>[m(" 查看历史告警记录 ")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])]),s("div",F,[p(v,{background:"",layout:r.paginationData.layout,"page-sizes":r.paginationData.pageSizes,total:r.paginationData.total,"page-size":r.paginationData.pageSize,currentPage:r.paginationData.currentPage,onSizeChange:r.handleSizeChange,onCurrentChange:r.handleCurrentChange},null,8,["layout","page-sizes","total","page-size","currentPage","onSizeChange","onCurrentChange"])])])),_:1}),p(L,{modelValue:r.data.isShowPorjectPop,"onUpdate:modelValue":a[16]||(a[16]=e=>r.data.isShowPorjectPop=e),title:"告警设置",width:"60%","before-close":r.handleClose},{default:d((()=>[s("div",P,[p(J,{ref:"ruleFormRef",model:r.ruleForm,rules:r.rules,"label-width":"120px",size:"default","status-icon":"",class:"pop-form"},{default:d((()=>[p(D,{label:"错误类型",prop:"errorType"},{default:d((()=>[p(R,{modelValue:r.ruleForm.errorType,"onUpdate:modelValue":a[1]||(a[1]=e=>r.ruleForm.errorType=e),onChange:r.errorTypeChange},{default:d((()=>[(u(!0),h(b,null,C(r.data.errorTypeOption,((e,a)=>(u(),i(E,{key:a,label:e.name,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue","onChange"])])),_:1}),p(D,{label:"错误名称",prop:"errorName"},{default:d((()=>[p(k,{modelValue:r.ruleForm.errorName,"onUpdate:modelValue":a[2]||(a[2]=e=>r.ruleForm.errorName=e)},null,8,["modelValue"])])),_:1}),p(D,{label:"规则",required:""},{default:d((()=>[x,p(D,{prop:"timeRangeS"},{default:d((()=>[p(k,{style:{width:"120px"},modelValue:r.ruleForm.timeRangeS,"onUpdate:modelValue":a[3]||(a[3]=e=>r.ruleForm.timeRangeS=e)},null,8,["modelValue"])])),_:1}),p(D,{prop:"whereType",style:{margin:"0 0 0 5px"}},{default:d((()=>[p(R,{modelValue:r.ruleForm.whereType,"onUpdate:modelValue":a[4]||(a[4]=e=>r.ruleForm.whereType=e),style:{"margin-right":"5px",width:"140px"}},{default:d((()=>[(u(!0),h(b,null,C(r.data.whereTypeOption,((e,a)=>(u(),i(E,{key:a,label:e.name,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),p(D,{prop:"serviceType"},{default:d((()=>[p(R,{modelValue:r.ruleForm.serviceType,"onUpdate:modelValue":a[5]||(a[5]=e=>r.ruleForm.serviceType=e),style:{"margin-right":"5px",width:"140px"}},{default:d((()=>[(u(!0),h(b,null,C(r.data.serviceType,((e,a)=>(u(),i(E,{key:a,label:e.name,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),p(D,{prop:"maxErrorCount"},{default:d((()=>[p(k,{style:{width:"120px"},modelValue:r.ruleForm.maxErrorCount,"onUpdate:modelValue":a[6]||(a[6]=e=>r.ruleForm.maxErrorCount=e)},null,8,["modelValue"])])),_:1}),H])),_:1}),p(D,{label:"报警时间间隔",prop:"alarmIntervalS"},{default:d((()=>[p(I,{modelValue:r.ruleForm.alarmIntervalS,"onUpdate:modelValue":a[7]||(a[7]=e=>r.ruleForm.alarmIntervalS=e),min:1,max:3600},null,8,["modelValue"]),p(O,{class:"box-item",effect:"dark",content:"报警后如果未恢复正常，间隔多久重新触发一次告警（最低3600s）",placement:"bottom-start"},{default:d((()=>[p(j,{style:{"margin-left":"20px"}},{default:d((()=>[p(U)])),_:1})])),_:1})])),_:1}),p(D,{label:"是否使用",prop:"isEnable"},{default:d((()=>[p(N,{modelValue:r.ruleForm.isEnable,"onUpdate:modelValue":a[8]||(a[8]=e=>r.ruleForm.isEnable=e)},{default:d((()=>[p(q,{label:1},{default:d((()=>[m("使用")])),_:1}),p(q,{label:0},{default:d((()=>[m("禁用")])),_:1})])),_:1},8,["modelValue"])])),_:1}),p(D,{label:"配置说明",prop:"note"},{default:d((()=>[p(k,{modelValue:r.ruleForm.note,"onUpdate:modelValue":a[9]||(a[9]=e=>r.ruleForm.note=e)},null,8,["modelValue"])])),_:1}),p(D,{label:"发送时间段",required:""},{default:d((()=>[p(D,{prop:"startHour"},{default:d((()=>[p(A,{"value-format":"HH:mm:ss",modelValue:r.ruleForm.startHour,"onUpdate:modelValue":a[10]||(a[10]=e=>r.ruleForm.startHour=e),placeholder:"发送开始时间",style:{width:"100%"}},null,8,["modelValue"])])),_:1}),z,p(D,{prop:"endHour"},{default:d((()=>[p(A,{"value-format":"HH:mm:ss",modelValue:r.ruleForm.endHour,"onUpdate:modelValue":a[11]||(a[11]=e=>r.ruleForm.endHour=e),placeholder:"发送结束时间",style:{width:"100%"}},null,8,["modelValue"])])),_:1})])),_:1}),p(D,{label:"告警方式",prop:"alertType"},{default:d((()=>[p(M,{modelValue:r.ruleForm.alertType,"onUpdate:modelValue":a[12]||(a[12]=e=>r.ruleForm.alertType=e)},{default:d((()=>[p(G,{label:1},{default:d((()=>[m("钉钉")])),_:1})])),_:1},8,["modelValue"])])),_:1}),r.ruleForm.alertType.indexOf(1)>-1?(u(),i(D,{key:0,label:"钉钉配置URL",prop:"dingConfig"},{default:d((()=>[p(k,{modelValue:r.ruleForm.dingConfig,"onUpdate:modelValue":a[13]||(a[13]=e=>r.ruleForm.dingConfig=e)},null,8,["modelValue"])])),_:1})):f("",!0),p(D,null,{default:d((()=>[p(c,{type:"primary",onClick:a[14]||(a[14]=e=>r.submitForm(r.ruleFormRef))},{default:d((()=>[m(g(r.ruleForm.id&&0!=r.ruleForm.id?"修改":"添加"),1)])),_:1}),p(c,{onClick:a[15]||(a[15]=e=>r.resetForm(r.ruleFormRef))},{default:d((()=>[m("重置")])),_:1})])),_:1})])),_:1},8,["model","rules"])])])),_:1},8,["modelValue","before-close"]),r.data.alarmId?(u(),i($,{key:0,alarmId:r.data.alarmId,onHandleClose:r.historyHandleClose},null,8,["alarmId","onHandleClose"])):f("",!0)])}]]);export{E as default};
//# sourceMappingURL=list-ce9a68f1.js.map
