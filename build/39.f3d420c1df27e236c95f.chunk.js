(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{a70e69abcbba12a78b2a:function(e,t,o){"use strict";o.r(t);var a,n=o("8af190b70a6bc55c6f1b"),r=o.n(n),i=o("e95a63b25fb92ed15721"),c=o("bd183afcc37eabd79225"),d=o.n(c),l=o("0d7f0986bcd2f33d8a2a"),s=o("7286e4d32da69e8d8af9"),u=o("ab039aecd4a1d4fedc0e"),f="boilerplate.containers.DashboardPage",b=Object(u.defineMessages)({box1:{id:"".concat(f,".box1"),defaultMessage:""},box2:{id:"".concat(f,".box2"),defaultMessage:""},box3:{id:"".concat(f,".box3"),defaultMessage:""},box4:{id:"".concat(f,".box4"),defaultMessage:""},box5:{id:"".concat(f,".box5"),defaultMessage:""},box6:{id:"".concat(f,".box6"),defaultMessage:""},box7:{id:"".concat(f,".box7"),defaultMessage:""},box8:{id:"".concat(f,".box8"),defaultMessage:""}}),p=o("5eab5618c2f7cb367580"),v=o("f318ce6ba0668e624433"),g=o("b9a4675f3a31731e3871"),h=o("80305d31256481b97990"),m=o("0b036161fbb62d587aed"),x=o("edda6002988d22cf0116"),y=o("041021065ead6515c7e1"),M=(o("867bd7dc0e9995982195"),o("fcb99a06256635f70435"));o("18fd55adb10446515347");function S(e){return(S="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t,o,n){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&r)for(var c in r)void 0===t[c]&&(t[c]=r[c]);else t||(t=r||{});if(1===i)t.children=n;else if(i>1){for(var d=new Array(i),l=0;l<i;l++)d[l]=arguments[l+3];t.children=d}return{$$typeof:a,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}function O(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function k(e){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function z(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o.d(t,"default",function(){return R}),s.toast.configure({position:"bottom-right",autoClose:4e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0});var A=localStorage.getItem("logged"),N=w(y.a,{fullPage:!0}),P=w(i.Redirect,{to:"/"}),W=w(l.Helmet,{},void 0,w("meta",{charSet:"utf-8"}),w("title",{},void 0,"Dashboard | INFRA | E-WALLET")),j=w(v.a,{active:"dashboard"}),_=w("div",{className:"cardValue"},void 0,"0"),V=w("div",{className:"cardValue"},void 0,"0"),B=w("div",{className:"cardValue"},void 0,"0"),C=w("div",{className:"cardValue"},void 0,"0"),D=w("div",{className:"cardValue"},void 0,"0"),I=w("div",{className:"cardValue"},void 0,"0"),L=w("div",{className:"cardValue"},void 0,"0"),R=function(e){function t(){var e,o,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,a=k(t).call(this),e=!a||"object"!==S(a)&&"function"!==typeof a?E(o):a,z(E(e),"success",function(){return s.toast.success(e.state.notification)}),z(E(e),"error",function(){return s.toast.error(e.state.notification)}),z(E(e),"warn",function(){return s.toast.warn(e.state.notification)}),z(E(e),"logout",function(){localStorage.removeItem("logged"),localStorage.removeItem("name"),e.setState({redirect:!0})}),e.state={loading:!0,redirect:!1,totalBanks:0,notification:"",popup:!1},e.success=e.success.bind(E(e)),e.error=e.error.bind(E(e)),e.warn=e.warn.bind(E(e)),e}var o,a,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(t,n["Component"]),o=t,(a=[{key:"componentDidMount",value:function(){var e=this;void 0!==A&&null!==A?d.a.post("".concat(M.a,"/getDashStats"),{token:A}).then(function(t){200==t.status?e.setState({loading:!1,totalBanks:t.data.totalBanks}):e.setState({loading:!1,redirect:!0})}).catch(function(t){e.setState({notification:t.response?t.response.data.error:t.toString()}),e.error()}):(alert("Login to continue"),this.setState({loading:!1,redirect:!0}))}},{key:"render",value:function(){var e=this.state,t=e.loading,o=e.redirect;e.popup;return t?N:o?P:w(p.a,{},void 0,W,j,w(g.a,{verticalMargin:!0},void 0,w(m.a,{fullWidth:!0},void 0,w("div",{className:"clr"},void 0,w(h.a,{href:"/banks",float:"left"},void 0,w(x.a,{horizontalMargin:"7px",cardWidth:"151px",textAlign:"center",col:!0},void 0,w("h4",{},void 0,r.a.createElement(u.FormattedMessage,b.box1)),w("div",{className:"cardValue"},void 0,this.state.totalBanks))),w(x.a,{horizontalMargin:"7px",cardWidth:"151px",textAlign:"center",col:!0},void 0,w("h4",{},void 0,r.a.createElement(u.FormattedMessage,b.box2)),_),w(x.a,{horizontalMargin:"7px",cardWidth:"151px",textAlign:"center",col:!0},void 0,w("h4",{},void 0,r.a.createElement(u.FormattedMessage,b.box3)),V),w(x.a,{horizontalMargin:"7px",cardWidth:"151px",textAlign:"center",col:!0},void 0,w("h4",{},void 0,r.a.createElement(u.FormattedMessage,b.box4)),B)),w("div",{className:"clr mt10"},void 0,w(x.a,{horizontalMargin:"7px",cardWidth:"151px",h4FontSize:"16px",textAlign:"center",col:!0},void 0,w("h4",{},void 0,r.a.createElement(u.FormattedMessage,b.box5)),C),w(x.a,{horizontalMargin:"7px",cardWidth:"151px",h4FontSize:"16px",textAlign:"center",col:!0},void 0,w("h4",{},void 0,r.a.createElement(u.FormattedMessage,b.box6)),D),w(x.a,{horizontalMargin:"7px",cardWidth:"151px",h4FontSize:"16px",textAlign:"center",col:!0},void 0,w("h4",{},void 0,r.a.createElement(u.FormattedMessage,b.box7)),I),w(x.a,{horizontalMargin:"7px",cardWidth:"151px",h4FontSize:"16px",textAlign:"center",col:!0},void 0,w("h4",{},void 0,r.a.createElement(u.FormattedMessage,b.box8)),L)))))}}])&&O(o.prototype,a),i&&O(o,i),t}()}}]);