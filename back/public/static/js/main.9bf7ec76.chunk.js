(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,t,n){},113:function(e,t,n){},160:function(e,t){},163:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(64),o=n.n(c),i=(n(72),n(112),n(11)),u=n(13),s=n(15),l=n(14),h=n(16),m=(n(113),n(168)),d=n(167),p=n(21),f=n(22),b=n(165),v=n(164),g=n(65),E=n.n(g),O=function e(){var t=this;Object(i.a)(this,e),this.logout=function(){return t.service.get("/logout").then(function(e){return e.data})},this.loggedin=function(){return t.service.get("/loggedin").then(function(e){return e.data})},this.login=function(e,n){return t.service.post("/login",{username:e,password:n}).then(function(e){return e.data})},this.signup=function(e,n){return t.service.post("/signup",{username:e,password:n}).then(function(e){return e.data})},this.service=E.a.create({baseURL:"".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_API_URL:"http://192.168.20.138:5000",REACT_APP_SOCKET_PORT:"http://192.168.20.138:5001"}).API_URL,"/auth")})},w=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(l.a)(t).call(this,e))).handleFormSubmit=function(e){e.preventDefault();var t=n.state.username,a=n.state.password;n.service.login(t,a).then(function(e){n.setState({username:t,password:a,error:!1,redirect:!0})}).catch(function(e){return console.log(e)})},n.handleChange=function(e){var t=e.target,a=t.name,r=t.value;n.setState(Object(f.a)({},n.state,Object(p.a)({},a,r)))},n.state={username:"",password:"",redirect:!1},n.service=new O,n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,this.state.redirect?r.a.createElement(b.a,{to:"/home"}):"",r.a.createElement("form",{onSubmit:this.handleFormSubmit},r.a.createElement("input",{type:"text",name:"username",value:this.state.username,onChange:function(t){return e.handleChange(t)}}),r.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:function(t){return e.handleChange(t)}}),r.a.createElement("button",null,"Log In")),r.a.createElement(v.a,{to:"/signup"},r.a.createElement("button",null,"Sign Up")))}}]),t}(a.Component),j=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(l.a)(t).call(this,e))).handleFormSubmit=function(e){e.preventDefault();var t=n.state.username,a=n.state.password;n.service.signup(t,a).then(function(e){n.setState({username:t,password:a,error:!1,redirect:!0})}).catch(function(e){return console.log(e)})},n.handleChange=function(e){var t=e.target,a=t.name,r=t.value;n.setState(Object(f.a)({},n.state,Object(p.a)({},a,r)))},n.state={username:"",password:"",redirect:!1},n.service=new O,n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,this.state.redirect?r.a.createElement(b.a,{to:"/home"}):"",r.a.createElement("form",{onSubmit:this.handleFormSubmit},r.a.createElement("input",{type:"text",name:"username",value:this.state.username,onChange:function(t){return e.handleChange(t)}}),r.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:function(t){return e.handleChange(t)}}),r.a.createElement("button",null,"Sign Up")))}}]),t}(a.Component),C=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(v.a,{to:"/feria"},r.a.createElement("button",null,"feria")),r.a.createElement(v.a,{to:"/basket"},r.a.createElement("button",null,"basket")),r.a.createElement(v.a,{to:"/robo"},r.a.createElement("button",null,"robo")),r.a.createElement(v.a,{to:"/pesca"},r.a.createElement("button",null,"pesca")),r.a.createElement(v.a,{to:"/funam"},r.a.createElement("button",null,"funam")))}}]),t}(a.Component),y=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null)}}]),t}(a.Component),k=n(66),x=n.n(k)()("".concat("http://192.168.20.138:5000"));function S(e){var t=e.ctx,n=e.x,a=e.y,r=e.width,c=e.height;t.fillRect(n,a,r,c)}var R=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(l.a)(t).call(this,e))).state={username:"",password:"",redirect:!1},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"handleClick",value:function(e){var t,n=this;t=function(e,t){console.log(t),t&&n.setState(Object(f.a)({},n.state,{a:!0}))},x.emit("clicked"),x.on("clicked",function(e){return t(null,e)})}},{key:"componentDidMount",value:function(){this.updateCanvas()}},{key:"updateCanvas",value:function(){var e=this.refs.canvas.getContext("2d");e.clearRect(0,0,300,300),S({ctx:e,x:100,y:100,width:50,height:50}),S({ctx:e,x:160,y:100,width:50,height:50}),S({ctx:e,x:100,y:160,width:50,height:50}),S({ctx:e,x:160,y:160,width:50,height:50})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("button",{onClick:function(t){return e.handleClick(t)}},"click me"),this.state.a?r.a.createElement("p",null,"Hola"):r.a.createElement("p",null,"Adios"),r.a.createElement("canvas",{ref:"canvas",width:window.innerWidth,height:window.innerHeight}))}}]),t}(a.Component),_=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(m.a,null,r.a.createElement(d.a,{exact:!0,path:"/",component:w}),r.a.createElement(d.a,{exact:!0,path:"/signup",component:j}),r.a.createElement(d.a,{exact:!0,path:"/home",component:C}),r.a.createElement(d.a,{exact:!0,path:"/feria",component:y}),r.a.createElement(d.a,{exact:!0,path:"/basket",component:R})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var A=n(166);o.a.render(r.a.createElement(A.a,null,r.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},67:function(e,t,n){e.exports=n(163)}},[[67,1,2]]]);
//# sourceMappingURL=main.9bf7ec76.chunk.js.map