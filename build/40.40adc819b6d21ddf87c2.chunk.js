(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{a70e69abcbba12a78b2a:function(t,e,a){"use strict";a.r(e);var o,r=a("8af190b70a6bc55c6f1b"),n=a.n(r),i=a("e95a63b25fb92ed15721"),c=(a("bd183afcc37eabd79225"),a("0d7f0986bcd2f33d8a2a")),s=a("7286e4d32da69e8d8af9"),d=a("ab039aecd4a1d4fedc0e"),l=a("5eab5618c2f7cb367580"),u=a("f318ce6ba0668e624433"),f=a("b9a4675f3a31731e3871"),b=a("80305d31256481b97990"),h=a("0b036161fbb62d587aed"),p=a("edda6002988d22cf0116"),v=a("041021065ead6515c7e1"),g=(a("867bd7dc0e9995982195"),"boilerplate.containers.DashboardPage"),m=Object(d.defineMessages)({box1:{id:"".concat(g,".box1"),defaultMessage:""},box2:{id:"".concat(g,".box2"),defaultMessage:""},box3:{id:"".concat(g,".box3"),defaultMessage:""},box4:{id:"".concat(g,".box4"),defaultMessage:""},box5:{id:"".concat(g,".box5"),defaultMessage:""},box6:{id:"".concat(g,".box6"),defaultMessage:""},box7:{id:"".concat(g,".box7"),defaultMessage:""},box8:{id:"".concat(g,".box8"),defaultMessage:""}}),x=a("e8dc0c42b7e4d57650ea");a("18fd55adb10446515347");function y(t){return(y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function M(t,e,a,r){o||(o="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=t&&t.defaultProps,i=arguments.length-3;if(e||0===i||(e={children:void 0}),e&&n)for(var c in n)void 0===e[c]&&(e[c]=n[c]);else e||(e=n||{});if(1===i)e.children=r;else if(i>1){for(var s=new Array(i),d=0;d<i;d++)s[d]=arguments[d+3];e.children=s}return{$$typeof:o,type:t,key:void 0===a?null:""+a,ref:null,props:e,_owner:null}}function w(t,e,a,o,r,n,i){try{var c=t[n](i),s=c.value}catch(t){return void a(t)}c.done?e(s):Promise.resolve(s).then(o,r)}function S(t,e){for(var a=0;a<e.length;a++){var o=e[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function k(t){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function O(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function P(t,e){return(P=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function E(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}a.d(e,"default",function(){return W}),s.toast.configure({position:"bottom-right",autoClose:4e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0});var F=localStorage.getItem("logged"),z=M(v.a,{fullPage:!0}),A=M(i.Redirect,{to:"/"}),B=M(c.Helmet,{},void 0,M("meta",{charSet:"utf-8"}),M("title",{},void 0,"Dashboard | INFRA | E-WALLET")),N=M(u.a,{active:"dashboard"}),j=M("div",{className:"cardValue"},void 0,"0"),W=function(t){function e(){var t,a,o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),a=this,o=k(e).call(this),t=!o||"object"!==y(o)&&"function"!==typeof o?O(a):o,E(O(t),"success",function(){return s.toast.success(t.state.notification)}),E(O(t),"error",function(){return s.toast.error(t.state.notification)}),E(O(t),"warn",function(){return s.toast.warn(t.state.notification)}),E(O(t),"logout",function(){localStorage.removeItem("logged"),localStorage.removeItem("name"),t.setState({redirect:!0})}),t.state={loading:!0,redirect:!1,totalBanks:0,totalMerchants:0,totalUsers:0,totalCashiers:0,totalBranches:0,totalMerchantBranches:0,totalPartners:0,notification:"",popup:!1},t.success=t.success.bind(O(t)),t.error=t.error.bind(O(t)),t.warn=t.warn.bind(O(t)),t}var a,o,i;return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&P(t,e)}(e,r["Component"]),a=e,(o=[{key:"componentDidMount",value:function(){var t,e=(t=regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0===F||null===F){t.next=7;break}return t.next=3,Object(x.b)("getDashStats",F,{});case 3:0===(e=t.sent).data.data.status?s.toast.error(e.data.data.message):this.setState({loading:!1,totalBanks:e.data.data.totalBanks,totalMerchants:e.data.data.totalMerchants,totalUsers:e.data.data.totalusers,totalCashiers:e.data.data.totalcashiers,totalBranches:e.data.data.totalbranches,totalMerchantBranches:e.data.data.totalmerchantbranches,totalPartners:e.data.data.totalpartners}),t.next=9;break;case 7:alert("Login to continue"),this.setState({loading:!1,redirect:!0});case 9:case"end":return t.stop()}},t,this)}),function(){var e=this,a=arguments;return new Promise(function(o,r){var n=t.apply(e,a);function i(t){w(n,o,r,i,c,"next",t)}function c(t){w(n,o,r,i,c,"throw",t)}i(void 0)})});return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var t=this.state,e=t.loading,a=t.redirect;t.popup;return e?z:a?A:M(l.a,{},void 0,B,N,M(f.a,{verticalMargin:!0},void 0,M(h.a,{fullWidth:!0},void 0,M("div",{className:"clr"},void 0,M(b.a,{href:"/banks",float:"left"},void 0,M(p.a,{horizontalMargin:"7px",cardWidth:"151px",textAlign:"center",col:!0},void 0,M("h4",{},void 0,n.a.createElement(d.FormattedMessage,m.box1)),M("div",{className:"cardValue"},void 0,this.state.totalBanks))),M(p.a,{horizontalMargin:"7px",cardWidth:"151px",textAlign:"center",col:!0},void 0,M("h4",{},void 0,n.a.createElement(d.FormattedMessage,m.box2)),M("div",{className:"cardValue"},void 0,this.state.totalMerchants)),M(p.a,{horizontalMargin:"7px",cardWidth:"151px",textAlign:"center",col:!0},void 0,M("h4",{},void 0,n.a.createElement(d.FormattedMessage,m.box3)),M("div",{className:"cardValue"},void 0,this.state.totalUsers)),M(p.a,{horizontalMargin:"7px",cardWidth:"151px",textAlign:"center",col:!0},void 0,M("h4",{},void 0,n.a.createElement(d.FormattedMessage,m.box4)),M("div",{className:"cardValue"},void 0,this.state.totalCashiers))),M("div",{className:"clr mt10"},void 0,M(p.a,{horizontalMargin:"7px",cardWidth:"151px",h4FontSize:"16px",textAlign:"center",col:!0},void 0,M("h4",{},void 0,n.a.createElement(d.FormattedMessage,m.box5)),M("div",{className:"cardValue"},void 0,this.state.totalBranches)),M(p.a,{horizontalMargin:"7px",cardWidth:"151px",h4FontSize:"16px",textAlign:"center",col:!0},void 0,M("h4",{},void 0,n.a.createElement(d.FormattedMessage,m.box6)),M("div",{className:"cardValue"},void 0,this.state.totalMerchantBranches)),M(p.a,{horizontalMargin:"7px",cardWidth:"151px",h4FontSize:"16px",textAlign:"center",col:!0},void 0,M("h4",{},void 0,n.a.createElement(d.FormattedMessage,m.box7)),M("div",{className:"cardValue"},void 0,this.state.totalPartners)),M(p.a,{horizontalMargin:"7px",cardWidth:"151px",h4FontSize:"16px",textAlign:"center",col:!0},void 0,M("h4",{},void 0,n.a.createElement(d.FormattedMessage,m.box8)),j)))))}}])&&S(a.prototype,o),i&&S(a,i),e}()}}]);