(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{a3fb5a5293822abbeaea:function(e,t,o){"use strict";o.r(t),o.d(t,"default",function(){return B});var a,n=o("8af190b70a6bc55c6f1b"),r=o.n(n),i=o("0d7f0986bcd2f33d8a2a"),c=o("7286e4d32da69e8d8af9"),f=o("bd183afcc37eabd79225"),s=o.n(f),u=o("ab039aecd4a1d4fedc0e"),l=o("cf50c4bdbb012a899db8"),d=o("5eab5618c2f7cb367580"),b=o("8ac34887ece117b1abe9"),p=o("365f1f0df0c7eb1c6a39"),y=o("6fa8358498da34119718"),m=o("c0da21c8c30564c60a72"),v=o("4a58ef70613a2768a6b0"),h=o("3cfc5fe5ae5fc3fb28ab"),g=o("a5a6067b351c18817e3b"),w=o("c6ab63ffe46a1a0d4ebc"),S=o("cdaeeb3fcdd7b59dc673"),O=o("80305d31256481b97990"),k=o("041021065ead6515c7e1"),P=o("fcb99a06256635f70435");o("18fd55adb10446515347");function E(e){return(E="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _(e,t,o,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&r)for(var c in r)void 0===t[c]&&(t[c]=r[c]);else t||(t=r||{});if(1===i)t.children=n;else if(i>1){for(var f=new Array(i),s=0;s<i;s++)f[s]=arguments[s+3];t.children=f}return{$$typeof:a,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}function L(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function j(e){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function T(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function F(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}c.toast.configure({position:"bottom-right",autoClose:4e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0});var I=localStorage.getItem("bankPhone"),M=_(i.Helmet,{},void 0,_("meta",{charSet:"utf-8"}),_("title",{},void 0,"Verify OTP | BANK | E-WALLET")),V=_(b.a,{from:"bank"}),q=_(O.a,{href:"/bank/forgot-password",float:"left"},void 0,_(S.a,{className:"material-icons"},void 0,"keyboard_backspace")),A=_(w.a,{disabled:!0},void 0,_(k.a,{})),B=function(e){function t(){var e,o,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,a=j(t).call(this),e=!a||"object"!==E(a)&&"function"!==typeof a?T(o):a,F(T(e),"success",function(){return c.toast.success(e.state.notification)}),F(T(e),"error",function(){return c.toast.error(e.state.notification)}),F(T(e),"warn",function(){return c.toast.warn(e.state.notification)}),F(T(e),"handleInputChange",function(t){var o=t.target,a=o.value,n=o.name;e.setState(F({},n,a))}),F(T(e),"otpVerify",function(t){e.setState({otpLoading:!0}),t.preventDefault(),s.a.post("".concat(P.a,"/verifyOTP"),e.state).then(function(t){if(200!=t.status)throw t.data.error;localStorage.setItem("bankLogged",t.data.token),e.setState({notification:"OTP Verified!"},function(){e.success();var t=e.props.history;setTimeout(function(){t.push("/bank/setup")},1e3)}),e.setState({otpLoading:!1})}).catch(function(t){e.setState({notification:t.response?t.response.data.error:t.toString(),otpLoading:!1}),e.error()})}),e.state={mobile:I,otp:"",notification:""},e.error=e.error.bind(T(e)),e}var o,a,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(t,n["Component"]),o=t,(a=[{key:"render",value:function(){return _(d.a,{},void 0,M,V,_(p.a,{},void 0,_(y.a,{},void 0,q,r.a.createElement(u.FormattedMessage,l.a.pagetitle)),_(m.a,{},void 0,r.a.createElement(u.FormattedMessage,l.a.title)," ",this.state.mobile),_("form",{action:"",method:"POST",onSubmit:this.otpVerify},void 0,_(v.a,{},void 0,_(h.a,{},void 0,_("label",{},void 0,r.a.createElement(u.FormattedMessage,l.a.pagetitle)),_(g.a,{type:"password",name:"otp",onFocus:function(e){e.target.parentElement.querySelector("label").classList.add("focused")},onBlur:function(e){var t=e.target;""==t.value&&t.parentElement.querySelector("label").classList.remove("focused")},value:this.state.otp,onChange:this.handleInputChange,required:!0}))),this.state.otpLoading?A:_(w.a,{},void 0,r.a.createElement(u.FormattedMessage,l.a.submit)))))}}])&&L(o.prototype,a),i&&L(o,i),t}()}}]);