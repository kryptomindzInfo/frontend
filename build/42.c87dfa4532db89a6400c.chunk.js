(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{ec908927cd7fd9e41f73:function(e,t,o){"use strict";o.r(t),o.d(t,"default",function(){return B});var a,r=o("8af190b70a6bc55c6f1b"),n=o.n(r),i=o("0d7f0986bcd2f33d8a2a"),c=o("7286e4d32da69e8d8af9"),f=o("bd183afcc37eabd79225"),s=o.n(f),u=o("ab039aecd4a1d4fedc0e"),l=o("481df3b209f68a666f2d"),d=o("80305d31256481b97990"),b=o("5eab5618c2f7cb367580"),p=o("8ac34887ece117b1abe9"),m=o("365f1f0df0c7eb1c6a39"),y=o("6fa8358498da34119718"),g=o("c0da21c8c30564c60a72"),v=o("4a58ef70613a2768a6b0"),h=o("3cfc5fe5ae5fc3fb28ab"),w=o("a5a6067b351c18817e3b"),S=o("c6ab63ffe46a1a0d4ebc"),O=o("cdaeeb3fcdd7b59dc673"),E=o("041021065ead6515c7e1"),P=o("fcb99a06256635f70435");o("18fd55adb10446515347");function _(e){return(_="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function j(e,t,o,r){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&n)for(var c in n)void 0===t[c]&&(t[c]=n[c]);else t||(t=n||{});if(1===i)t.children=r;else if(i>1){for(var f=new Array(i),s=0;s<i;s++)f[s]=arguments[s+3];t.children=f}return{$$typeof:a,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}function k(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function L(e){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function C(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function q(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}c.toast.configure({position:"bottom-right",autoClose:4e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0});var I=j(i.Helmet,{},void 0,j("meta",{charSet:"utf-8"}),j("title",{},void 0,"Forgot Password | BANK | E-WALLET")),M=j(p.a,{from:"infra"}),T=j(d.a,{href:"/",float:"left"},void 0,j(O.a,{className:"material-icons"},void 0,"keyboard_backspace")),A=j(S.a,{disabled:!0},void 0,j(E.a,{})),B=function(e){function t(){var e,o,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,a=L(t).call(this),e=!a||"object"!==_(a)&&"function"!==typeof a?C(o):a,q(C(e),"success",function(){return c.toast.success(e.state.notification)}),q(C(e),"error",function(){return c.toast.error(e.state.notification)}),q(C(e),"warn",function(){return c.toast.warn(e.state.notification)}),q(C(e),"handleInputChange",function(t){var o=t.target,a=o.value,r=o.name;e.setState(q({},r,a))}),q(C(e),"forgotRequest",function(t){e.setState({forgotLoading:!0}),t.preventDefault(),s.a.post("".concat(P.a,"/forgotPassword"),e.state).then(function(t){if(200!=t.status)throw t.data.error;localStorage.setItem("phone",t.data.mobile),localStorage.setItem("username",t.data.username),e.props.history.push("/otp"),e.setState({forgotLoading:!1})}).catch(function(t){e.setState({notification:t.response?t.response.data.error:t.toString(),forgotLoading:!1}),e.error()})}),e.state={mobile:"",notification:""},e.error=e.error.bind(C(e)),e}var o,a,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(t,r["Component"]),o=t,(a=[{key:"render",value:function(){return j(b.a,{},void 0,I,M,j(m.a,{},void 0,j(y.a,{},void 0,T,n.a.createElement(u.FormattedMessage,l.a.pagetitle)),j(g.a,{},void 0,n.a.createElement(u.FormattedMessage,l.a.title)),j("form",{action:"",method:"POST",onSubmit:this.forgotRequest},void 0,j(v.a,{},void 0,j(h.a,{},void 0,j("label",{},void 0,n.a.createElement(u.FormattedMessage,l.a.mobile),"*"),j(w.a,{type:"text",pattern:"[0-9]{10}",title:"10 Digit numeric value",name:"mobile",onFocus:function(e){e.target.parentElement.querySelector("label").classList.add("focused")},onBlur:function(e){var t=e.target;""==t.value&&t.parentElement.querySelector("label").classList.remove("focused")},value:this.state.mobile,onChange:this.handleInputChange,required:!0}))),this.state.forgotLoading?A:j(S.a,{},void 0,n.a.createElement(u.FormattedMessage,l.a.getotp)))))}}])&&k(o.prototype,a),i&&k(o,i),t}()}}]);