(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{"20360158cdb7216c76f8":function(e,t,a){"use strict";a.r(t);var o,n=a("8af190b70a6bc55c6f1b"),r=a.n(n),i=a("e95a63b25fb92ed15721"),c=(a("bd183afcc37eabd79225"),a("0d7f0986bcd2f33d8a2a")),d=a("7286e4d32da69e8d8af9"),s=a("ab039aecd4a1d4fedc0e"),l="boilerplate.containers.DashboardPage",u="boilerplate.containers.BankDashboardPage",f=Object(s.defineMessages)({box1:{id:"".concat(l,".box1"),defaultMessage:""},box2:{id:"".concat(l,".box2"),defaultMessage:""},box3:{id:"".concat(l,".box3"),defaultMessage:""},box4:{id:"".concat(l,".box4"),defaultMessage:""},box5:{id:"".concat(l,".box5"),defaultMessage:""},box6:{id:"".concat(l,".box6"),defaultMessage:""},box7:{id:"".concat(l,".box7"),defaultMessage:""},box8:{id:"".concat(l,".box8"),defaultMessage:""},bbox1:{id:"".concat(u,".box1"),defaultMessage:""},bbox5:{id:"".concat(u,".box5"),defaultMessage:""}}),b=a("5eab5618c2f7cb367580"),p=a("d8177b52ec3b30c23986"),v=a("b9a4675f3a31731e3871"),h=a("80305d31256481b97990"),g=a("041021065ead6515c7e1"),x=a("0b036161fbb62d587aed"),m=a("edda6002988d22cf0116"),y=a("50a40e72b8533e6391f0"),M=a("e8dc0c42b7e4d57650ea");a("18fd55adb10446515347");function w(e){return(w="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e,t,a,n){o||(o="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&r)for(var c in r)void 0===t[c]&&(t[c]=r[c]);else t||(t=r||{});if(1===i)t.children=n;else if(i>1){for(var d=new Array(i),s=0;s<i;s++)d[s]=arguments[s+3];t.children=d}return{$$typeof:o,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function S(e,t,a,o,n,r,i){try{var c=e[r](i),d=c.value}catch(e){return void a(e)}c.done?t(d):Promise.resolve(d).then(o,n)}function k(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function j(e,t){return(j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function z(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"default",function(){return J}),d.toast.configure({position:"bottom-right",autoClose:4e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0});var A=localStorage.getItem("bankLogged"),F=O(g.a,{fullPage:!0}),N=O(i.Redirect,{to:"/bank"}),_=O(c.Helmet,{},void 0,O("meta",{charSet:"utf-8"}),O("title",{},void 0,"Dashboard | BANK | E-WALLET")),B=O(p.a,{active:"dashboard"}),W=O(y.a,{}),V=O("div",{className:"cardValue"},void 0,"0"),D=O("div",{className:"cardValue"},void 0,"0"),C=O("br",{}),R=O("span",{},void 0,"\xa0"),L=O("div",{className:"cardValue"},void 0,"0"),T=O("div",{className:"cardValue"},void 0,"0"),H=O("div",{className:"cardValue"},void 0,"0"),J=function(e){function t(){var e,a,o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,o=P(t).call(this),e=!o||"object"!==w(o)&&"function"!==typeof o?E(a):o,z(E(e),"success",function(){return d.toast.success(e.state.notification)}),z(E(e),"error",function(){return d.toast.error(e.state.notification)}),z(E(e),"warn",function(){return d.toast.warn(e.state.notification)}),e.state={otp:"",showOtp:!1,loading:!0,redirect:!1,totalBanks:0,notification:"",popup:!1},e.success=e.success.bind(E(e)),e.error=e.error.bind(E(e)),e.warn=e.warn.bind(E(e)),e}var a,o,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&j(e,t)}(t,n["Component"]),a=t,(o=[{key:"componentDidMount",value:function(){var e,t=(e=regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(M.b)("getBankDashStats",A,{});case 2:0===(t=e.sent).data.data.status?d.toast.error(t.data.data.message):this.setState({loading:!1,totalBranches:t.data.data.totalBranches,totalMerchants:t.data.data.totalMerchants});case 4:case"end":return e.stop()}},e,this)}),function(){var t=this,a=arguments;return new Promise(function(o,n){var r=e.apply(t,a);function i(e){S(r,o,n,i,c,"next",e)}function c(e){S(r,o,n,i,c,"throw",e)}i(void 0)})});return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.loading,a=e.redirect;e.popup;return t?F:a?N:O(b.a,{from:"bank"},void 0,_,B,O(v.a,{verticalMargin:!0},void 0,W,O(x.a,{},void 0,O("div",{className:"clr"},void 0,O(h.a,{href:"/bank/branches",float:"left"},void 0,O(m.a,{horizontalMargin:"7px",cardWidth:"151px",textAlign:"center",col:!0},void 0,O("h4",{},void 0,r.a.createElement(s.FormattedMessage,f.bbox1)),O("div",{className:"cardValue"},void 0,this.state.totalBranches))),O(m.a,{horizontalMargin:"7px",cardWidth:"151px",textAlign:"center",col:!0},void 0,O("h4",{},void 0,r.a.createElement(s.FormattedMessage,f.box2)),O("div",{className:"cardValue"},void 0,this.state.totalMerchants)),O(m.a,{horizontalMargin:"7px",cardWidth:"151px",textAlign:"center",col:!0},void 0,O("h4",{},void 0,r.a.createElement(s.FormattedMessage,f.box3)),V),O(m.a,{horizontalMargin:"7px",cardWidth:"151px",textAlign:"center",col:!0},void 0,O("h4",{},void 0,r.a.createElement(s.FormattedMessage,f.box4)),D)),O("div",{className:"clr mt10"},void 0,O(m.a,{horizontalMargin:"7px",cardWidth:"151px",h4FontSize:"16px",textAlign:"center",col:!0},void 0,O("h4",{},void 0,r.a.createElement(s.FormattedMessage,f.bbox5),C,R),L),O(m.a,{horizontalMargin:"7px",cardWidth:"151px",h4FontSize:"16px",textAlign:"center",col:!0},void 0,O("h4",{},void 0,r.a.createElement(s.FormattedMessage,f.box6)),T),O(m.a,{horizontalMargin:"7px",cardWidth:"151px",h4FontSize:"16px",textAlign:"center",col:!0},void 0,O("h4",{},void 0,r.a.createElement(s.FormattedMessage,f.box7)),H)))))}}])&&k(a.prototype,o),i&&k(a,i),t}()}}]);