import{f as e}from"./index-8c48cd14.js";import{c as r,a as t}from"./service-01e4d977.js";import{b as s}from"./index-8ef4fab8.js";const i=e({id:"app-general",state:()=>({projectList:r("PROJECT_ALL")?JSON.parse(r("PROJECT_ALL")||"[]"):[],currentProjectId:r("PROJECT_ID")||"",refreshTimer:null,manualRefresh:!1}),getters:{getProjectList(){return this.projectList},getCurrentProjectId(){return this.currentProjectId},getManualRefresh(){return this.manualRefresh}},actions:{setCurrentProject(e){this.currentProjectId=e,t("PROJECT_ID",e)},setProjectList(e){var s;this.projectList=e,t("PROJECT_ALL",JSON.stringify(e));let i=null==(s=e[0])?void 0:s.monitorAppId;i&&!r("PROJECT_ID")&&(this.currentProjectId=i,t("PROJECT_ID",i))},async getValidProject(){let e=await s();e.success&&this.setProjectList(e.model)},setManualRefresh(){this.refreshTimer||(this.manualRefresh=!0,this.refreshTimer=setTimeout((()=>{this.manualRefresh=!1,this.refreshTimer=null,clearTimeout(this.refreshTimer)}),100))}}});export{i as u};
//# sourceMappingURL=general-7755038a.js.map