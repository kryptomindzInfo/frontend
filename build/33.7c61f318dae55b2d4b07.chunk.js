(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{"3e5c894f268c50bc0316":function(t,o,e){"use strict";e.r(o);var i,a=e("8af190b70a6bc55c6f1b"),n=e.n(a),d=e("bd183afcc37eabd79225"),r=e.n(d),l=e("0d7f0986bcd2f33d8a2a"),s=e("7286e4d32da69e8d8af9"),p=e("0b3cb19af78752326f59"),c=e("ab039aecd4a1d4fedc0e"),u="boilerplate.containers.BankPage",v=Object(c.defineMessages)({search:{id:"".concat("boilerplate.containers.All",".search"),defaultMessage:""},addbank:{id:"".concat(u,".addbank"),defaultMessage:""},title:{id:"".concat(u,".title"),defaultMessage:""},subtitle:{id:"".concat(u,".subtitle"),defaultMessage:""},th1:{id:"".concat(u,".th1"),defaultMessage:""},th2:{id:"".concat(u,".th2"),defaultMessage:""},th3:{id:"".concat(u,".th3"),defaultMessage:""},th4:{id:"".concat(u,".th4"),defaultMessage:""},th5:{id:"".concat(u,".th5"),defaultMessage:""},menu1:{id:"".concat(u,".menu1"),defaultMessage:""},menu2:{id:"".concat(u,".menu2"),defaultMessage:""},menu3:{id:"".concat(u,".menu3"),defaultMessage:""},popup1:{id:"".concat(u,".popup1"),defaultMessage:""},popup2:{id:"".concat(u,".popup2"),defaultMessage:""},popup3:{id:"".concat(u,".popup3"),defaultMessage:""},popup4:{id:"".concat(u,".popup4"),defaultMessage:""},popup5:{id:"".concat(u,".popup5"),defaultMessage:""},popup6:{id:"".concat(u,".popup6"),defaultMessage:""},popup7:{id:"".concat(u,".popup7"),defaultMessage:""},popup8:{id:"".concat(u,".popup8"),defaultMessage:""},popup9:{id:"".concat(u,".popup9"),defaultMessage:""},popup10:{id:"".concat(u,".popup10"),defaultMessage:""},verify:{id:"".concat(u,".verify"),defaultMessage:""},otp:{id:"".concat(u,".otp"),defaultMessage:""}}),f=e("5eab5618c2f7cb367580"),g=e("d8177b52ec3b30c23986"),m=e("b9a4675f3a31731e3871"),h=e("fa2ce0da44cf966bc1d9"),b=e("56dae34f294aa29bb48a"),y=e("0b036161fbb62d587aed"),w=e("c62184e16136b13faf11"),k=e("edda6002988d22cf0116"),S=e("0d02ea6f9c8f088e4ee6"),C=e("3cfc5fe5ae5fc3fb28ab"),B=e("a5a6067b351c18817e3b"),M=e("d4645642fe31e65af398"),N=e("b7427a1bef7d4198bad2"),I=e("1338cbe09bd1ccd2eec5"),P=e("2ef0388ad848e10584a5"),E=e("041021065ead6515c7e1"),F=e("e8dc0c42b7e4d57650ea"),O=e("fcb99a06256635f70435"),T=e("89cb728d32f0df1a6b3f"),_=e.n(T);e("18fd55adb10446515347");function x(t){return(x="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function L(t,o,e,a){i||(i="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=t&&t.defaultProps,d=arguments.length-3;if(o||0===d||(o={children:void 0}),o&&n)for(var r in n)void 0===o[r]&&(o[r]=n[r]);else o||(o=n||{});if(1===d)o.children=a;else if(d>1){for(var l=new Array(d),s=0;s<d;s++)l[s]=arguments[s+3];o.children=l}return{$$typeof:i,type:t,key:void 0===e?null:""+e,ref:null,props:o,_owner:null}}function A(t,o,e,i,a,n,d){try{var r=t[n](d),l=r.value}catch(t){return void e(t)}r.done?o(l):Promise.resolve(l).then(i,a)}function z(t){return function(){var o=this,e=arguments;return new Promise(function(i,a){var n=t.apply(o,e);function d(t){A(n,i,a,d,r,"next",t)}function r(t){A(n,i,a,d,r,"throw",t)}d(void 0)})}}function R(t,o){for(var e=0;e<o.length;e++){var i=o[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function U(t){return(U=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function G(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function j(t,o){return(j=Object.setPrototypeOf||function(t,o){return t.__proto__=o,t})(t,o)}function q(t,o,e){return o in t?Object.defineProperty(t,o,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[o]=e,t}e.d(o,"default",function(){return ga}),s.toast.configure({position:"bottom-right",autoClose:4e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0});p.c.div.withConfig({displayName:"BankInfo__Tab",componentId:"m3cbhu-0"})(["background:",";width:194px;padding:15px;float:left;border:1px solid ",";color:#fff;font-size:20px;"],function(t){return t.theme.primary},function(t){return t.theme.primary}),p.c.div.withConfig({displayName:"BankInfo__Tab2",componentId:"m3cbhu-1"})(["float:left;width:194px;border:1px solid ",";color:",";font-size:20px;padding:15px;"],function(t){return t.theme.primary},function(t){return t.theme.primary});var D=localStorage.getItem("bankLogged"),K=localStorage.getItem("bankId");console.log(K);var H=L(E.a,{fullPage:!0}),W=L(l.Helmet,{},void 0,L("meta",{charSet:"utf-8"}),L("title",{},void 0,"Banks | INFRA | E-WALLET")),V=L(g.a,{}),J=L(b.a,{active:"info"}),Y=L("span",{},void 0,"Edit"),Z=L(P.a,{className:"infoLeft"},void 0,"Bank Name"),$=L(P.a,{className:"infoLeft"},void 0,"Bank Code"),Q=L(P.a,{className:"infoLeft"},void 0,"Address"),X=L(P.a,{className:"infoLeft"},void 0,"State"),tt=L(P.a,{className:"infoLeft"},void 0,"Zip Code"),ot=L(P.a,{className:"infoLeft"},void 0,"Country Code"),et=L(P.a,{className:"infoLeft"},void 0,"Country"),it=L(P.a,{className:"infoLeft"},void 0,"Email"),at=L(P.a,{className:"infoLeft"},void 0,"Phone Number"),nt=L("span",{},void 0,"Resend"),dt=L("h1",{},void 0,"Edit Bank"),rt=L("label",{},void 0,"Bank Code*"),lt=L("option",{title:"",value:""},void 0,"Select Country*"),st=L("option",{title:"+213"},void 0,"Algeria"),pt=L("option",{title:"+376"},void 0,"Andorra"),ct=L("option",{title:"+244"},void 0,"Angola"),ut=L("option",{title:"+1264"},void 0,"Anguilla"),vt=L("option",{title:"+1268"},void 0,"Antigua & Barbuda"),ft=L("option",{title:"+54"},void 0,"Argentina"),gt=L("option",{title:"+374"},void 0,"Armenia"),mt=L("option",{title:"+297"},void 0,"Aruba"),ht=L("option",{title:"+61"},void 0,"Australia"),bt=L("option",{title:"+43"},void 0,"Austria"),yt=L("option",{title:"+994"},void 0,"Azerbaijan"),wt=L("option",{title:"+1242"},void 0,"Bahamas"),kt=L("option",{title:"+973"},void 0,"Bahrain"),St=L("option",{title:"+880"},void 0,"Bangladesh"),Ct=L("option",{title:"+1246"},void 0,"Barbados"),Bt=L("option",{title:"+375"},void 0,"Belarus"),Mt=L("option",{title:"+32"},void 0,"Belgium"),Nt=L("option",{title:"+501"},void 0,"Belize"),It=L("option",{title:"+229"},void 0,"Benin"),Pt=L("option",{title:"+1441"},void 0,"Bermuda"),Et=L("option",{title:"+975"},void 0,"Bhutan"),Ft=L("option",{title:"+591"},void 0,"Bolivia"),Ot=L("option",{title:"+387"},void 0,"Bosnia Herzegovina"),Tt=L("option",{title:"+267"},void 0,"Botswana"),_t=L("option",{title:"+55"},void 0,"Brazil"),xt=L("option",{title:"+673"},void 0,"Brunei"),Lt=L("option",{title:"+359"},void 0,"Bulgaria"),At=L("option",{title:"+226"},void 0,"Burkina Faso"),zt=L("option",{title:"+257"},void 0,"Burundi"),Rt=L("option",{title:"+855"},void 0,"Cambodia"),Ut=L("option",{title:"+237"},void 0,"Cameroon"),Gt=L("option",{title:"+1"},void 0,"Canada"),jt=L("option",{title:"+238"},void 0,"Cape Verde Islands"),qt=L("option",{title:"+1345"},void 0,"Cayman Islands"),Dt=L("option",{title:"+236"},void 0,"Central African Republic"),Kt=L("option",{title:"+56"},void 0,"Chile"),Ht=L("option",{title:"+86"},void 0,"China"),Wt=L("option",{title:"+57"},void 0,"Colombia"),Vt=L("option",{title:"+269"},void 0,"Comoros"),Jt=L("option",{title:"+242"},void 0,"Congo"),Yt=L("option",{title:"+682"},void 0,"Cook Islands"),Zt=L("option",{title:"+506"},void 0,"Costa Rica"),$t=L("option",{title:"+385"},void 0,"Croatia"),Qt=L("option",{title:"+53"},void 0,"Cuba"),Xt=L("option",{title:"+90392"},void 0,"Cyprus North"),to=L("option",{title:"+357"},void 0,"Cyprus South"),oo=L("option",{title:"+42"},void 0,"Czech Republic"),eo=L("option",{title:"+45"},void 0,"Denmark"),io=L("option",{title:"+253"},void 0,"Djibouti"),ao=L("option",{title:"+1809"},void 0,"Dominica"),no=L("option",{title:"+1809"},void 0,"Dominican Republic"),ro=L("option",{title:"+593"},void 0,"Ecuador"),lo=L("option",{title:"+20"},void 0,"Egypt"),so=L("option",{title:"+503"},void 0,"El Salvador"),po=L("option",{title:"+240"},void 0,"Equatorial Guinea"),co=L("option",{title:"+291"},void 0,"Eritrea"),uo=L("option",{title:"+372"},void 0,"Estonia"),vo=L("option",{title:"+251"},void 0,"Ethiopia"),fo=L("option",{title:"+500"},void 0,"Falkland Islands"),go=L("option",{title:"+298"},void 0,"Faroe Islands"),mo=L("option",{title:"+679"},void 0,"Fiji"),ho=L("option",{title:"+358"},void 0,"Finland"),bo=L("option",{title:"+33"},void 0,"France"),yo=L("option",{title:"+594"},void 0,"French Guiana"),wo=L("option",{title:"+689"},void 0,"French Polynesia"),ko=L("option",{title:"+241"},void 0,"Gabon"),So=L("option",{title:"+220"},void 0,"Gambia"),Co=L("option",{title:"+7880"},void 0,"Georgia"),Bo=L("option",{title:"+49"},void 0,"Germany"),Mo=L("option",{title:"+233"},void 0,"Ghana"),No=L("option",{title:"+350"},void 0,"Gibraltar"),Io=L("option",{title:"+30"},void 0,"Greece"),Po=L("option",{title:"+299"},void 0,"Greenland"),Eo=L("option",{title:"+1473"},void 0,"Grenada"),Fo=L("option",{title:"+590"},void 0,"Guadeloupe"),Oo=L("option",{title:"+671"},void 0,"Guam"),To=L("option",{title:"+502"},void 0,"Guatemala"),_o=L("option",{title:"+224"},void 0,"Guinea"),xo=L("option",{title:"+245"},void 0,"Guinea - Bissau"),Lo=L("option",{title:"+592"},void 0,"Guyana"),Ao=L("option",{title:"+509"},void 0,"Haiti"),zo=L("option",{title:"+504"},void 0,"Honduras"),Ro=L("option",{title:"+852"},void 0,"Hong Kong"),Uo=L("option",{title:"+36"},void 0,"Hungary"),Go=L("option",{title:"+354"},void 0,"Iceland"),jo=L("option",{title:"+91"},void 0,"India"),qo=L("option",{title:"+62"},void 0,"Indonesia"),Do=L("option",{title:"+98"},void 0,"Iran"),Ko=L("option",{title:"+964"},void 0,"Iraq"),Ho=L("option",{title:"+353"},void 0,"Ireland"),Wo=L("option",{title:"+972"},void 0,"Israel"),Vo=L("option",{title:"+39"},void 0,"Italy"),Jo=L("option",{title:"+1876"},void 0,"Jamaica"),Yo=L("option",{title:"+81"},void 0,"Japan"),Zo=L("option",{title:"+962"},void 0,"Jordan"),$o=L("option",{title:"+7"},void 0,"Kazakhstan"),Qo=L("option",{title:"+254"},void 0,"Kenya"),Xo=L("option",{title:"+686"},void 0,"Kiribati"),te=L("option",{title:"+850"},void 0,"Korea North"),oe=L("option",{title:"+82"},void 0,"Korea South"),ee=L("option",{title:"+965"},void 0,"Kuwait"),ie=L("option",{title:"+996"},void 0,"Kyrgyzstan"),ae=L("option",{title:"+856"},void 0,"Laos"),ne=L("option",{title:"+371"},void 0,"Latvia"),de=L("option",{title:"+961"},void 0,"Lebanon"),re=L("option",{title:"+266"},void 0,"Lesotho"),le=L("option",{title:"+231"},void 0,"Liberia"),se=L("option",{title:"+218"},void 0,"Libya"),pe=L("option",{title:"+417"},void 0,"Liechtenstein"),ce=L("option",{title:"+370"},void 0,"Lithuania"),ue=L("option",{title:"+352"},void 0,"Luxembourg"),ve=L("option",{title:"+853"},void 0,"Macao"),fe=L("option",{title:"+389"},void 0,"Macedonia"),ge=L("option",{title:"+261"},void 0,"Madagascar"),me=L("option",{title:"+265"},void 0,"Malawi"),he=L("option",{title:"+60"},void 0,"Malaysia"),be=L("option",{title:"+960"},void 0,"Maldives"),ye=L("option",{title:"+223"},void 0,"Mali"),we=L("option",{title:"+356"},void 0,"Malta"),ke=L("option",{title:"+692"},void 0,"Marshall Islands"),Se=L("option",{title:"+596"},void 0,"Martinique"),Ce=L("option",{title:"+222"},void 0,"Mauritania"),Be=L("option",{title:"+269"},void 0,"Mayotte"),Me=L("option",{title:"+52"},void 0,"Mexico"),Ne=L("option",{title:"+691"},void 0,"Micronesia"),Ie=L("option",{title:"+373"},void 0,"Moldova"),Pe=L("option",{title:"+377"},void 0,"Monaco"),Ee=L("option",{title:"+976"},void 0,"Mongolia"),Fe=L("option",{title:"+1664"},void 0,"Montserrat"),Oe=L("option",{title:"+212"},void 0,"Morocco"),Te=L("option",{title:"+258"},void 0,"Mozambique"),_e=L("option",{title:"+95"},void 0,"Myanmar"),xe=L("option",{title:"+264"},void 0,"Namibia"),Le=L("option",{title:"+674"},void 0,"Nauru"),Ae=L("option",{title:"+977"},void 0,"Nepal"),ze=L("option",{title:"+31"},void 0,"Netherlands"),Re=L("option",{title:"+687"},void 0,"New Caledonia"),Ue=L("option",{title:"+64"},void 0,"New Zealand"),Ge=L("option",{title:"+505"},void 0,"Nicaragua"),je=L("option",{title:"+227"},void 0,"Niger"),qe=L("option",{title:"+234"},void 0,"Nigeria"),De=L("option",{title:"+683"},void 0,"Niue"),Ke=L("option",{title:"+672"},void 0,"Norfolk Islands"),He=L("option",{title:"+670"},void 0,"Northern Marianas"),We=L("option",{title:"+47"},void 0,"Norway"),Ve=L("option",{title:"+968"},void 0,"Oman"),Je=L("option",{title:"+680"},void 0,"Palau"),Ye=L("option",{title:"+507"},void 0,"Panama"),Ze=L("option",{title:"+675"},void 0,"Papua New Guinea"),$e=L("option",{title:"+595"},void 0,"Paraguay"),Qe=L("option",{title:"+51"},void 0,"Peru"),Xe=L("option",{title:"+63"},void 0,"Philippines"),ti=L("option",{title:"+48"},void 0,"Poland"),oi=L("option",{title:"+351"},void 0,"Portugal"),ei=L("option",{title:"+1787"},void 0,"Puerto Rico"),ii=L("option",{title:"+974"},void 0,"Qatar"),ai=L("option",{title:"+262"},void 0,"Reunion"),ni=L("option",{title:"+40"},void 0,"Romania"),di=L("option",{title:"+7"},void 0,"Russia"),ri=L("option",{title:"+250"},void 0,"Rwanda"),li=L("option",{title:"+378"},void 0,"San Marino"),si=L("option",{title:"+239"},void 0,"Sao Tome & Principe"),pi=L("option",{title:"+966"},void 0,"Saudi Arabia"),ci=L("option",{title:"+221"},void 0,"Senegal"),ui=L("option",{title:"+381"},void 0,"Serbia"),vi=L("option",{title:"+248"},void 0,"Seychelles"),fi=L("option",{title:"+232"},void 0,"Sierra Leone"),gi=L("option",{title:"+65"},void 0,"Singapore"),mi=L("option",{title:"+421"},void 0,"Slovak Republic"),hi=L("option",{title:"+386"},void 0,"Slovenia"),bi=L("option",{title:"+677"},void 0,"Solomon Islands"),yi=L("option",{title:"+252"},void 0,"Somalia"),wi=L("option",{title:"+27"},void 0,"South Africa"),ki=L("option",{title:"+34"},void 0,"Spain"),Si=L("option",{title:"+94"},void 0,"Sri Lanka"),Ci=L("option",{title:"+290"},void 0,"St. Helena"),Bi=L("option",{title:"+1869"},void 0,"St. Kitts"),Mi=L("option",{title:"+1758"},void 0,"St. Lucia"),Ni=L("option",{title:"+249"},void 0,"Sudan"),Ii=L("option",{title:"+597"},void 0,"Suriname"),Pi=L("option",{title:"+268"},void 0,"Swaziland"),Ei=L("option",{title:"+46"},void 0,"Sweden"),Fi=L("option",{title:"+41"},void 0,"Switzerland"),Oi=L("option",{title:"+963"},void 0,"Syria"),Ti=L("option",{title:"+886"},void 0,"Taiwan"),_i=L("option",{title:"+7"},void 0,"Tajikstan"),xi=L("option",{title:"+66"},void 0,"Thailand"),Li=L("option",{title:"+228"},void 0,"Togo"),Ai=L("option",{title:"+676"},void 0,"Tonga"),zi=L("option",{title:"+1868"},void 0,"Trinidad & Tobago"),Ri=L("option",{title:"+216"},void 0,"Tunisia"),Ui=L("option",{title:"+90"},void 0,"Turkey"),Gi=L("option",{title:"+7"},void 0,"Turkmenistan"),ji=L("option",{title:"+993"},void 0,"Turkmenistan"),qi=L("option",{title:"+1649"},void 0,"Turks & Caicos Islands"),Di=L("option",{title:"+688"},void 0,"Tuvalu"),Ki=L("option",{title:"+256"},void 0,"Uganda"),Hi=L("option",{title:"+44"},void 0,"UK"),Wi=L("option",{title:"+380"},void 0,"Ukraine"),Vi=L("option",{title:"+971"},void 0,"United Arab Emirates"),Ji=L("option",{title:"+598"},void 0,"Uruguay"),Yi=L("option",{title:"+1"},void 0,"USA"),Zi=L("option",{title:"+7"},void 0,"Uzbekistan"),$i=L("option",{title:"+678"},void 0,"Vanuatu"),Qi=L("option",{title:"+379"},void 0,"Vatican City"),Xi=L("option",{title:"+58"},void 0,"Venezuela"),ta=L("option",{title:"+84"},void 0,"Vietnam"),oa=L("option",{title:"+84"},void 0,"Virgin Islands - British"),ea=L("option",{title:"+84"},void 0,"Virgin Islands - US"),ia=L("option",{title:"+681"},void 0,"Wallis & Futuna"),aa=L("option",{title:"+969"},void 0,"Yemen"),na=L("option",{title:"+967"},void 0,"Yemen"),da=L("option",{title:"+260"},void 0,"Zambia"),ra=L("option",{title:"+263"},void 0,"Zimbabwe"),la=L("i",{className:"material-icons"},void 0,"cloud_upload"),sa=L("span",{},void 0,"Change Logo"),pa=L("i",{className:"material-icons"},void 0,"cloud_upload"),ca=L("img",{src:_.a,width:"50",height:"50"}),ua=L("span",{className:"tooltiptext"},void 0,"This contract will be uploaded on Blockchain."),va=L("span",{},void 0,"Change Contract"),fa=L(S.a,{filledBtn:!0,marginTop:"10px"},void 0,L("span",{},void 0,"Update Bank")),ga=function(t){function o(){var t,e,i;return function(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}(this,o),e=this,i=U(o).call(this),t=!i||"object"!==x(i)&&"function"!==typeof i?G(e):i,q(G(t),"success",function(){return s.toast.success(t.state.notification)}),q(G(t),"error",function(){return s.toast.error(t.state.notification)}),q(G(t),"warn",function(){return s.toast.warn(t.state.notification)}),q(G(t),"countryChange",function(o){var e,i=o.target,a=i.value,n=i.name,d=o.target.options[o.target.selectedIndex].title;t.setState((q(e={},n,a),q(e,"ccode",d),e))}),q(G(t),"handleInputChange",function(o){var e=o.target,i=e.value,a=e.name;t.setState(q({},a,i))}),q(G(t),"editBank",function(o){o.preventDefault(),null==t.state.logo||""==t.state.logo?t.setState({notification:"You need to upload a logo"},function(){t.error()}):null==t.state.contract||""==t.state.contract?t.setState({notification:"You need to upload a contract"},function(){t.error()}):t.setState({showOtp:!0},function(){t.generateOTP()})}),q(G(t),"startTimer",function(){var o=G(t),e=setInterval(function(){if(o.state.timer<=0)clearInterval(e),o.setState({resend:!0});else{var t=Number(o.state.timer)-1;o.setState({timer:t})}},1e3)}),q(G(t),"generateOTP",function(){t.setState({resend:!1,timer:30}),t.startTimer(),r.a.post("".concat(O.a,"/generateOTPBank"),{name:t.state.name,page:"editBank",username:t.state.username,token:D}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({otpId:o.data.id,showEditOtp:!0,notification:"OTP Sent"}),t.success()}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString()}),t.error()})}),q(G(t),"closePopup",function(){t.setState({popup:!1,showEditOtp:!1,showOtp:!1,otp:""})}),q(G(t),"showMiniPopUp",function(o){t.setState({popup:!0});var e=o.target.getAttribute("data-id"),i=o.target.getAttribute("data-d");console.log(e);var a=i.split("^");t.setState({popname:a[0],poptype:a[1],poprange:a[2],poppercent:a[3],sid:e})}),q(G(t),"closeMiniPopUp",function(){t.setState({popup:!1,name:"",address1:"",state:"",zip:"",ccode:"",country:"",email:"",mobile:"",logo:null,contract:null,otp:"",showOtp:!1})}),q(G(t),"logout",function(){localStorage.removeItem("logged"),localStorage.removeItem("name"),t.setState({redirect:!0})}),q(G(t),"addBank",function(o){o.preventDefault(),r.a.post("".concat(O.a,"/generateOTP"),{name:t.state.name,mobile:t.state.mobile,page:"addBank",token:D}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({showEditOtp:!0,notification:"OTP Sent"}),t.success()}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString()}),t.error()})}),q(G(t),"approve",function(o){o.preventDefault(),r.a.post("".concat(O.a,"/approveFee"),{id:t.state.sid,token:D}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({notification:"Approved"}),t.success()}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString()}),t.error()})}),q(G(t),"decline",function(o){o.preventDefault(),r.a.post("".concat(O.a,"/declineFee"),{id:t.state.sid,token:D}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({notification:"Declined"}),t.success()}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString()}),t.error()})}),q(G(t),"showWallet",function(t){t.preventDefault()}),q(G(t),"verifyOTP",function(o){o.preventDefault(),r.a.post("".concat(O.a,"/addBank"),{name:t.state.name,address1:t.state.address1,state:t.state.state,zip:t.state.zip,country:t.state.country,ccode:t.state.ccode,email:t.state.email,mobile:t.state.mobile,logo:t.state.logo,contract:t.state.contract,otp:t.state.otp,token:D}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({notification:"Bank added successfully!"}),t.success(),t.closeMiniPopUp(),t.getBanks()}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString()}),t.error()})}),q(G(t),"removeFile",function(o){t.setState(q({},o,null))}),q(G(t),"triggerBrowse",function(t){document.getElementById(t).click()}),q(G(t),"getBanks",z(regeneratorRuntime.mark(function o(){var e,i;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Object(F.b)("getOne",D,{type:"bank",page:"bank"});case 2:e=o.sent,console.log(e),200==e.data.status&&t.setState((q(i={loading:!1,banks:e.data.data.row,bcode:e.data.data.row.bcode,working_from:0==e.data.data.row.working_from?"00:00":e.data.data.row.working_from,working_to:0==e.data.data.row.working_to?"00:00":e.data.data.row.working_to,logo:e.data.data.row.logo,name:e.data.data.row.name,address1:e.data.data.row.address1,state:e.data.data.row.state,zip:e.data.data.row.zip,country:e.data.data.row.country,ccode:e.data.data.row.ccode,mobile:e.data.data.row.mobile,email:e.data.data.row.email},"logo",e.data.data.row.logo),q(i,"contract",e.data.data.row.contract),q(i,"username",e.data.data.row.contract),q(i,"bank_id",e.data.data.row._id),q(i,"username",e.data.data.row.username),i));case 5:case"end":return o.stop()}},o)}))),q(G(t),"showPopup",function(){t.setState({popup:!0})}),q(G(t),"verifyEditOTP",function(o){t.setState({verifyLoading:!0}),o.preventDefault(),r.a.post("".concat(O.a,"/editBankBank"),{name:t.state.name,address1:t.state.address1,state:t.state.state,zip:t.state.zip,bank_id:t.state.bank_id,country:t.state.country,ccode:t.state.ccode,bcode:t.state.bcode,working_from:t.state.working_from,working_to:t.state.working_to,email:t.state.email,mobile:t.state.mobile,logo:t.state.logo,contract:t.state.contract,otp:t.state.otp,otp_id:t.state.otpId,token:D}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({notification:"Bank updated successfully!"}),t.success(),t.closePopup(),t.getBanks(),t.setState({verifyLoading:!1})}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString()}),t.error()})}),t.state={sid:"",bank:K,name:"",address1:"",popname:"",poprange:"",poptype:"",poppercent:"",state:"",zip:"",country:"",ccode:"",mobile:"",email:"",logo:null,contract:null,loading:!0,redirect:!1,totalBanks:0,notification:"Welcome",popup:!1,user_id:D,banks:[],otp:"",showOtp:!1},t.success=t.success.bind(G(t)),t.error=t.error.bind(G(t)),t.warn=t.warn.bind(G(t)),t.showMiniPopUp=t.showMiniPopUp.bind(G(t)),t.onChange=t.onChange.bind(G(t)),t.fileUpload=t.fileUpload.bind(G(t)),t}var e,i,d;return function(t,o){if("function"!==typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(o&&o.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),o&&j(t,o)}(o,a["Component"]),e=o,(i=[{key:"onChange",value:function(t){t.target.files&&null!=t.target.files[0]&&this.fileUpload(t.target.files[0],t.target.getAttribute("data-key"))}},{key:"fileUpload",value:function(t,o){var e=this;this.setState(q({},o,"main/loader.gif"));var i=new FormData;i.append("file",t);var a="fileUpload";"contract"==o&&(a="ipfsUpload"),r.a.post("".concat(O.a,"/").concat(a,"?token=").concat(D),i,{headers:{"content-type":"multipart/form-data"}}).then(function(t){if(200!=t.status)throw t.data.error;if(t.data.error)throw t.data.error;e.setState(q({},o,t.data.name))}).catch(function(t){e.setState({notification:t.response?t.response.data.error:t.toString()}),e.error()})}},{key:"componentDidMount",value:function(){this.setState({bank:this.state.bank_id}),void 0!==D&&null!==D&&this.getBanks()}},{key:"render",value:function(){var t=this;function o(t){t.target.parentElement.querySelector("label").classList.add("focused")}function e(t){var o=t.target;""==o.value&&o.parentElement.querySelector("label").classList.remove("focused")}console.log(this.props);var i=this.state,a=i.loading,d=i.redirect;if(a)return H;if(d)return null;return L(f.a,{from:"bank"},void 0,W,V,L(m.a,{verticalMargin:!0},void 0,J,L(y.a,{},void 0,L(w.a,{marginBottom:"33px",inputWidth:"calc(100% - 241px)",className:"clr"},void 0,L("span",{style:{fontSize:"25px"}},void 0,this.state.banks.name),L(S.a,{className:"addBankButton",flex:!0,onClick:this.showPopup},void 0,Y)),L(k.a,{bigPadding:!0,bordered:!0},void 0,L("div",{className:"cardBody"},void 0,L(I.a,{},void 0,Z,L(P.a,{className:"infoRight"},void 0,this.state.banks.name)),L(I.a,{},void 0,$,L(P.a,{className:"infoRight"},void 0,this.state.banks.bcode)),L(I.a,{},void 0,Q,L(P.a,{className:"infoRight"},void 0,this.state.banks.address1)),L(I.a,{},void 0,X,L(P.a,{className:"infoRight"},void 0,this.state.banks.state)),L(I.a,{},void 0,tt,L(P.a,{className:"infoRight"},void 0,this.state.banks.zip)),L(I.a,{},void 0,ot,L(P.a,{className:"infoRight"},void 0,this.state.banks.ccode)),L(I.a,{},void 0,et,L(P.a,{className:"infoRight"},void 0,this.state.banks.country)),L(I.a,{},void 0,it,L(P.a,{className:"infoRight"},void 0,this.state.banks.email)),L(I.a,{},void 0,at,L(P.a,{className:"infoRight"},void 0,this.state.banks.mobile)))))),this.state.popup?L(h.a,{close:this.closePopup.bind(this),accentedH1:!0},void 0,this.state.showEditOtp?L("div",{},void 0,L("h1",{},void 0,n.a.createElement(c.FormattedMessage,v.verify)),L("form",{action:"",method:"post",onSubmit:this.verifyEditOTP},void 0,L(C.a,{},void 0,L("label",{},void 0,n.a.createElement(c.FormattedMessage,v.otp),"*"),L(B.a,{type:"text",name:"otp",onFocus:o,onBlur:e,value:this.state.otp,onChange:this.handleInputChange,required:!0})),L(S.a,{filledBtn:!0,marginTop:"50px"},void 0,L("span",{},void 0,n.a.createElement(c.FormattedMessage,v.verify))),L("p",{className:"resend"},void 0,"Wait for ",L("span",{className:"timer"},void 0,this.state.timer)," ","to"," ",this.state.resend?L("span",{className:"go",onClick:this.generateOTP},void 0,"Resend"):nt))):L("div",{},void 0,dt,L("form",{action:"",method:"post",onSubmit:this.editBank},void 0,L(C.a,{},void 0,L("label",{},void 0,n.a.createElement(c.FormattedMessage,v.popup1),"*"),L(B.a,{type:"text",name:"name",onFocus:o,onBlur:e,value:this.state.name,autoFocus:!0,onChange:this.handleInputChange,required:!0})),L(C.a,{},void 0,rt,L(B.a,{type:"text",name:"bcode",autoFocus:!0,onFocus:o,onBlur:e,value:this.state.bcode,onChange:this.handleInputChange,required:!0})),L(C.a,{},void 0,L("label",{},void 0,n.a.createElement(c.FormattedMessage,v.popup2),"*"),L(B.a,{type:"text",name:"address1",onFocus:o,onBlur:e,autoFocus:!0,value:this.state.address1,onChange:this.handleInputChange,required:!0})),L(I.a,{},void 0,L(P.a,{},void 0,L(C.a,{},void 0,L("label",{},void 0,n.a.createElement(c.FormattedMessage,v.popup3),"*"),L(B.a,{type:"text",name:"state",onFocus:o,onBlur:e,autoFocus:!0,value:this.state.state,onChange:this.handleInputChange,required:!0}))),L(P.a,{},void 0,L(C.a,{},void 0,L("label",{},void 0,n.a.createElement(c.FormattedMessage,v.popup4),"*"),L(B.a,{type:"text",name:"zip",onFocus:o,onBlur:e,autoFocus:!0,value:this.state.zip,onChange:this.handleInputChange,required:!0})))),L(I.a,{},void 0,L(P.a,{},void 0,L(C.a,{},void 0,L(M.a,{type:"text",autoFocus:!0,name:"country",value:this.state.country,onChange:this.countryChange,required:!0},void 0,lt,st,pt,ct,ut,vt,ft,gt,mt,ht,bt,yt,wt,kt,St,Ct,Bt,Mt,Nt,It,Pt,Et,Ft,Ot,Tt,_t,xt,Lt,At,zt,Rt,Ut,Gt,jt,qt,Dt,Kt,Ht,Wt,Vt,Jt,Yt,Zt,$t,Qt,Xt,to,oo,eo,io,ao,no,ro,lo,so,po,co,uo,vo,fo,go,mo,ho,bo,yo,wo,ko,So,Co,Bo,Mo,No,Io,Po,Eo,Fo,Oo,To,_o,xo,Lo,Ao,zo,Ro,Uo,Go,jo,qo,Do,Ko,Ho,Wo,Vo,Jo,Yo,Zo,$o,Qo,Xo,te,oe,ee,ie,ae,ne,de,re,le,se,pe,ce,ue,ve,fe,ge,me,he,be,ye,we,ke,Se,Ce,Be,Me,Ne,Ie,Pe,Ee,Fe,Oe,Te,_e,xe,Le,Ae,ze,Re,Ue,Ge,je,qe,De,Ke,He,We,Ve,Je,Ye,Ze,$e,Qe,Xe,ti,oi,ei,ii,ai,ni,di,ri,li,si,pi,ci,ui,vi,fi,gi,mi,hi,bi,yi,wi,ki,Si,Ci,Bi,Mi,Ni,Ii,Pi,Ei,Fi,Oi,Ti,_i,xi,Li,Ai,zi,Ri,Ui,Gi,ji,qi,Di,Ki,Hi,Wi,Vi,Ji,Yi,Zi,$i,Qi,Xi,ta,oa,ea,ia,aa,na,da,ra))),L(P.a,{},void 0,L(C.a,{},void 0,L("label",{},void 0,n.a.createElement(c.FormattedMessage,v.popup8),"*"),L(B.a,{type:"email",name:"email",onFocus:o,onBlur:e,autoFocus:!0,value:this.state.email,onChange:this.handleInputChange,required:!0})))),L(I.a,{},void 0,L(P.a,{cW:"20%",mR:"2%"},void 0,L(C.a,{},void 0,L(B.a,{type:"text",name:"ccode",readOnly:!0,value:this.state.ccode,onChange:this.handleInputChange,required:!0}))),L(P.a,{cW:"78%"},void 0,L(C.a,{},void 0,L("label",{},void 0,n.a.createElement(c.FormattedMessage,v.popup7),"*"),L(B.a,{type:"text",pattern:"[0-9]{10}",autoFocus:!0,title:"10 Digit numeric value",name:"mobile",onFocus:o,onBlur:e,value:this.state.mobile,onChange:this.handleInputChange,required:!0})))),L(C.a,{},void 0,L(N.a,{bgImg:O.d+this.state.logo},void 0,this.state.logo?L("a",{className:"uploadedImg",href:O.d+this.state.logo,target:"_BLANK"}):" ",L("div",{className:"uploadTrigger",onClick:function(){return t.triggerBrowse("logo")}},void 0,L("input",{type:"file",id:"logo",onChange:this.onChange,"data-key":"logo",accept:"image/jpeg, image/png, image/jpg"}),this.state.logo?" ":la,L("label",{},void 0,""==this.state.logo?n.a.createElement(c.FormattedMessage,v.popup9):sa,"*")))),L(C.a,{},void 0,L(N.a,{bgImg:O.d+"main/pdf-icon.png"},void 0,this.state.contract?L("a",{className:"uploadedImg",href:O.b+this.state.contract,target:"_BLANK"}):" ",L("div",{className:"uploadTrigger",onClick:function(){return t.triggerBrowse("contract")}},void 0,L("input",{type:"file",id:"contract",onChange:this.onChange,"data-key":"contract",accept:".pdf"}),this.state.contract?ca:pa,L("label",{},void 0,L("div",{className:"tooltip"},void 0,L("i",{className:"fa fa-info-circle",style:{margin:"5px"}}),ua),""==this.state.contract?n.a.createElement(c.FormattedMessage,v.popup10):va,"*",L("p",{},void 0,L("span",{style:{color:"red"}},void 0,"*"),"Only PDF allowed"))))),fa))):null)}}])&&R(e.prototype,i),d&&R(e,d),o}()}}]);