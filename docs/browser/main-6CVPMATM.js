import{b as A,c as M}from"./chunk-TB5KNIGN.js";import{a as I}from"./chunk-3N5IBKZV.js";import{$ as C,O as v,V as w,W as D,X as b,Z as S,_ as y,aa as k,c as h,da as j,e as m,f as d,fa as s,q as u,z as g}from"./chunk-4W2TA7YY.js";import{a as c,j as f}from"./chunk-3EYC4JTX.js";var x=(()=>{let o=class o{constructor(r,e){this.api=r,this.routage=e}canActivate(r,e){return f(this,null,function*(){var t=yield this.api.get_token();return console.log("token on guard= ",t),t!=null&&t!=null?(console.log("Utilisateur connect\xE9"),yield this.api.update_data_from_token(),!0):(console.log("Utilisateur non connect\xE9"),this.routage.navigate(["/public/login"],{queryParams:{returnUrl:e.url}}),!1)})}};o.\u0275fac=function(e){return new(e||o)(m(s),m(k))},o.\u0275prov=h({token:o,factory:o.\u0275fac,providedIn:"root"});let i=o;return i})();var O=[{path:"",pathMatch:"full",redirectTo:"public"},{path:"home",component:A,children:[{path:"",loadChildren:()=>import("./chunk-QXEH22QO.js").then(i=>i.HomeModule)}],canActivate:[x]},{path:"public",component:I,children:[{path:"",loadChildren:()=>import("./chunk-BKA2L7DL.js").then(i=>i.PublicModule)}]}];var R={providers:[j(O),y(),D(b())]};var U=(()=>{let o=class o{constructor(r,e){this.api=r,this.wsService=e,this.wsURL="ws://localhost:1880/ws/sensor",this.title="angular-GreatWallAng"}ngOnInit(){this.wsService.connect(this.wsURL).subscribe(e=>{let t=JSON.parse(e.data);this.api.sensorData.push(t),this.api.latestSensorData=t,this.api.motionDetected=t.motion==="motion detected"||t.motion==="motion stoped",this.api.alertSmoke=t.smoke==="alert"||t.smoke==="stoped",this.api.alertWater=t.water==="alert"||t.water==="stoped",console.log("from node-red: ",this.api.latestSensorData)},e=>console.error(e),()=>console.log("complete"))}prepareData(r){if(console.log("dernier element : ",this.api.sensorData[this.api.sensorData.length-1]),console.log("nouveau element : ",r),this.api.sensorData.length>=1){let e=this.api.sensorData[this.api.sensorData.length-1],t=Object.entries(r),F=Object.entries(e),l=[];for(let[a,p]of F){let n=!1;for(let[H,V]of t)if(a===H){n=!0;break}n||l.push([a,p])}console.log("difference : ",l),t=l.reduce((a,[p,n])=>(a[p]=n,a),{}),this.newData=c(c({},t),r),console.log("api.sensorData : ",this.api.sensorData),console.log("newData : ",this.newData)}}};o.\u0275fac=function(e){return new(e||o)(u(s),u(M))},o.\u0275cmp=d({type:o,selectors:[["app-root"]],standalone:!0,features:[v],decls:1,vars:0,template:function(e,t){e&1&&g(0,"router-outlet")},dependencies:[w,C]});let i=o;return i})();S(U,R).catch(i=>console.error(i));
