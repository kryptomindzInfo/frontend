(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{d764f064742ecea93062:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return V});var o,n=a("8af190b70a6bc55c6f1b"),r=a.n(n),i=(a("bd183afcc37eabd79225"),a("e95a63b25fb92ed15721")),s=a("0d7f0986bcd2f33d8a2a"),c=a("7286e4d32da69e8d8af9"),d=a("ab039aecd4a1d4fedc0e"),l=a("7b9702807589922aac12"),u=a("5eab5618c2f7cb367580"),f=a("8ac34887ece117b1abe9"),b=a("365f1f0df0c7eb1c6a39"),p=a("6fa8358498da34119718"),m=a("c0da21c8c30564c60a72"),g=a("14565c619a2b4ffb4425"),v=a("4a58ef70613a2768a6b0"),h=a("3cfc5fe5ae5fc3fb28ab"),y=a("a5a6067b351c18817e3b"),w=a("c6ab63ffe46a1a0d4ebc"),k=a("1338cbe09bd1ccd2eec5"),S=a("2ef0388ad848e10584a5"),I=a("80305d31256481b97990"),O=a("041021065ead6515c7e1"),P=a("e8dc0c42b7e4d57650ea"),E=a("9f100a413d2aaf9e0ca5"),_=a.n(E),C=a("fe0b34a58afc62cf66c2"),L=a.n(C),M=a("c7fd554010f79f6c0ef8"),j=a.n(M);a("fcb99a06256635f70435"),a("18fd55adb10446515347");function x(e){return(x="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function R(e,t,a,n){o||(o="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&r)for(var s in r)void 0===t[s]&&(t[s]=r[s]);else t||(t=r||{});if(1===i)t.children=n;else if(i>1){for(var c=new Array(i),d=0;d<i;d++)c[d]=arguments[d+3];t.children=c}return{$$typeof:o,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function F(e,t,a,o,n,r,i){try{var s=e[r](i),c=s.value}catch(e){return void a(e)}s.done?t(c):Promise.resolve(c).then(o,n)}function q(e){return function(){var t=this,a=arguments;return new Promise(function(o,n){var r=e.apply(t,a);function i(e){F(r,o,n,i,s,"next",e)}function s(e){F(r,o,n,i,s,"throw",e)}i(void 0)})}}function T(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function N(e){return(N=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function B(e,t){return(B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function U(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}c.toast.configure({position:"bottom-right",autoClose:4e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0});var D=localStorage.getItem("bankLogged"),H=R(O.a,{fullPage:!0}),J=R(i.Redirect,{to:"/dashboard"}),W=R(s.Helmet,{},void 0,R("meta",{charSet:"utf-8"}),R("title",{},void 0,"E-WALLET | BANK | SIGNUP")),$=R(f.a,{from:"bank"}),G=R(_.a,{}),K=R(L.a,{}),z=R(w.a,{disabled:!0},void 0,R(O.a,{})),Q=R(S.a,{}),V=function(e){function t(){var e,a,o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,o=N(t).call(this),e=!o||"object"!==x(o)&&"function"!==typeof o?A(a):o,U(A(e),"success",function(){return c.toast.success(e.state.notification)}),U(A(e),"error",function(){return c.toast.error(e.state.notification)}),U(A(e),"warn",function(){return c.toast.warn(e.state.notification)}),U(A(e),"handleInputChange",function(t){var a=t.target,o=a.value,n=a.name;e.setState(U({},n,o.trim()))}),U(A(e),"loginRequest",function(){var t=q(regeneratorRuntime.mark(function t(a){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:a.preventDefault(),e.setState({loginLoading:!0},q(regeneratorRuntime.mark(function t(){var a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(P.b)("bankLogin",D,e.state);case 2:a=t.sent,localStorage.setItem("bankLogged",a.data.data.token),localStorage.setItem("bankName",a.data.data.name),localStorage.setItem("bankUserName",a.data.data.username),localStorage.setItem("bankContract",a.data.data.contract),localStorage.setItem("bankLogo",a.data.data.logo),localStorage.setItem("bankId",a.data.data.id),localStorage.setItem("bankPhone",a.data.data.mobile),console.log(localStorage.getItem("bankLogged")),console.log(a),0==a.data.data.status&&"Incorrect username or password"===a.data.data.message?c.toast.error(a.data.data.message):a.data.data.initial_setup?a.data.data.status&&0!=a.data.data.status&&""!=a.data.data.status?window.location.href="/bank/dashboard":window.location.href="/bank/activate":window.location.href="/bank/setup";case 13:case"end":return t.stop()}},t)})));case 2:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()),e.state={username:"",password:"",notification:"",loading:!0,redirect:!1,passwordtype:"password",visiblity:!1},e.error=e.error.bind(A(e)),e}var a,o,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&B(e,t)}(t,n["Component"]),a=t,(o=[{key:"componentDidMount",value:function(){this._isMounted=!0,this._isMounted&&this.setState({loading:!1})}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var e=this;var t=this.state,a=t.loading,o=t.redirect;return a?H:o?J:R(u.a,{},void 0,W,$,R(b.a,{},void 0,R(p.a,{},void 0,r.a.createElement(d.FormattedMessage,l.a.pagetitle)),R(m.a,{},void 0,r.a.createElement(d.FormattedMessage,l.a.title)),R(g.a,{},void 0,r.a.createElement(d.FormattedMessage,l.a.subtitle2)),R("form",{action:"",method:"POST",onSubmit:this.loginRequest},void 0,R(v.a,{},void 0,R(h.a,{},void 0,R("label",{},void 0,r.a.createElement(d.FormattedMessage,l.a.userid),"*"),R(y.a,{type:"text",name:"username",onFocus:function(e){e.target.parentElement.querySelector("label").classList.add("focused")},onBlur:function(e){var t=e.target;""==t.value&&t.parentElement.querySelector("label").classList.remove("focused")},value:this.state.username,onChange:this.handleInputChange,required:!0})),R(h.a,{},void 0,R("div",{style:{backgroundColor:""}},void 0,R(j.a,{name:"password",label:"Password",style:{width:"100%"},value:this.state.password,type:this.state.visiblity?"text":"password",margin:"normal",variant:"outlined",onChange:this.handleInputChange,required:!0}),R("span",{onClick:function(){e.setState({visiblity:!e.state.visiblity})},style:{position:"relative",top:"-40px",left:"90%"}},void 0,R("i",{},void 0,this.state.visiblity?G:K))))),this.loginLoading?z:R(w.a,{},void 0,r.a.createElement(d.FormattedMessage,l.a.pagetitle))),R(k.a,{marginTop:!0},void 0,Q,R(S.a,{textRight:!0},void 0,R(I.a,{href:"/bank/forgot-password"},void 0,r.a.createElement(d.FormattedMessage,l.a.forgotpassword))))))}}])&&T(a.prototype,o),i&&T(a,i),t}()}}]);