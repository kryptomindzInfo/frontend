(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{b1654f03678028849cd3:function(t,o,e){"use strict";e.r(o);var i,a=e("8af190b70a6bc55c6f1b"),n=e.n(a),d=e("bd183afcc37eabd79225"),r=e.n(d),s=e("0d7f0986bcd2f33d8a2a"),l=e("7286e4d32da69e8d8af9"),c=e("0b3cb19af78752326f59"),p=e("ab039aecd4a1d4fedc0e"),u="boilerplate.containers.BankPage",v=Object(p.defineMessages)({search:{id:"".concat("boilerplate.containers.All",".search"),defaultMessage:""},addbank:{id:"".concat(u,".addbank"),defaultMessage:""},title:{id:"".concat(u,".title"),defaultMessage:""},subtitle:{id:"".concat(u,".subtitle"),defaultMessage:""},th1:{id:"".concat(u,".th1"),defaultMessage:""},th2:{id:"".concat(u,".th2"),defaultMessage:""},th3:{id:"".concat(u,".th3"),defaultMessage:""},th4:{id:"".concat(u,".th4"),defaultMessage:""},th5:{id:"".concat(u,".th5"),defaultMessage:""},menu1:{id:"".concat(u,".menu1"),defaultMessage:""},menu2:{id:"".concat(u,".menu2"),defaultMessage:""},menu3:{id:"".concat(u,".menu3"),defaultMessage:""},popup1:{id:"".concat(u,".popup1"),defaultMessage:""},popup2:{id:"".concat(u,".popup2"),defaultMessage:""},popup3:{id:"".concat(u,".popup3"),defaultMessage:""},popup4:{id:"".concat(u,".popup4"),defaultMessage:""},popup5:{id:"".concat(u,".popup5"),defaultMessage:""},popup6:{id:"".concat(u,".popup6"),defaultMessage:""},popup7:{id:"".concat(u,".popup7"),defaultMessage:""},popup8:{id:"".concat(u,".popup8"),defaultMessage:""},popup9:{id:"".concat(u,".popup9"),defaultMessage:""},popup10:{id:"".concat(u,".popup10"),defaultMessage:""},verify:{id:"".concat(u,".verify"),defaultMessage:""},otp:{id:"".concat(u,".otp"),defaultMessage:""}}),f=e("5eab5618c2f7cb367580"),h=e("d8177b52ec3b30c23986"),m=e("f157524b28decf6db1f9"),b=e("b9a4675f3a31731e3871"),g=e("fa2ce0da44cf966bc1d9"),y=e("8cf36991e8affaa36e2c"),S=e("0b036161fbb62d587aed"),k=(e("c62184e16136b13faf11"),e("80305d31256481b97990"),e("edda6002988d22cf0116")),B=e("0d02ea6f9c8f088e4ee6"),w=e("3cfc5fe5ae5fc3fb28ab"),C=e("a5a6067b351c18817e3b"),M=e("d4645642fe31e65af398"),I=(e("b7427a1bef7d4198bad2"),e("1338cbe09bd1ccd2eec5")),N=e("2ef0388ad848e10584a5"),P=e("041021065ead6515c7e1"),F=e("fcb99a06256635f70435");e("18fd55adb10446515347");function E(t){return(E="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function L(t,o,e,a){i||(i="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=t&&t.defaultProps,d=arguments.length-3;if(o||0===d||(o={children:void 0}),o&&n)for(var r in n)void 0===o[r]&&(o[r]=n[r]);else o||(o=n||{});if(1===d)o.children=a;else if(d>1){for(var s=new Array(d),l=0;l<d;l++)s[l]=arguments[l+3];o.children=s}return{$$typeof:i,type:t,key:void 0===e?null:""+e,ref:null,props:o,_owner:null}}function _(t,o){for(var e=0;e<o.length;e++){var i=o[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function T(t){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function O(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function z(t,o){return(z=Object.setPrototypeOf||function(t,o){return t.__proto__=o,t})(t,o)}function A(t,o,e){return o in t?Object.defineProperty(t,o,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[o]=e,t}e.d(o,"default",function(){return da}),l.toast.configure({position:"bottom-right",autoClose:4e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0});c.c.div.withConfig({displayName:"BankBranchInfo__Tab",componentId:"l013dr-0"})(["background:#417505;width:194px;padding:15px;float:left;border:1px solid  #417505;color:#fff;font-size:20px;"]),c.c.div.withConfig({displayName:"BankBranchInfo__Tab2",componentId:"l013dr-1"})(["float:left;width:194px;border:1px solid  #417505;color:#417505;font-size:20px;padding:15px;"]);var x=localStorage.getItem("bankLogged"),R=localStorage.getItem("bankId"),U=localStorage.getItem("bankName"),D=L(P.a,{fullPage:!0}),G=L(s.Helmet,{},void 0,L("meta",{charSet:"utf-8"}),L("title",{},void 0,"Branch | INFRA | E-WALLET")),q=L(N.a,{className:"infoLeft"},void 0,"Branch Name"),j=L(N.a,{className:"infoLeft"},void 0,"Bank Code"),K=L(N.a,{className:"infoLeft"},void 0,"Bank User ID"),H=L(N.a,{className:"infoLeft"},void 0,"Address"),V=L(N.a,{className:"infoLeft"},void 0,"State"),W=L(N.a,{className:"infoLeft"},void 0,"Zip Code"),J=L(N.a,{className:"infoLeft"},void 0,"Country Code"),Y=L(N.a,{className:"infoLeft"},void 0,"Country"),Z=L(N.a,{className:"infoLeft"},void 0,"Email"),$=L(N.a,{className:"infoLeft"},void 0,"Phone Number"),Q=L("h1",{},void 0,"Edit Branch"),X=L("label",{},void 0,"Branch Name*"),tt=L("label",{},void 0,"Bank ID*"),ot=L("label",{},void 0,"Branch Admin: User ID*"),et=L("label",{},void 0,"Credit Limit"),it=L("label",{},void 0,"Address*"),at=L("option",{title:"",value:""},void 0,"Select Country*"),nt=L("option",{title:"+213"},void 0,"Algeria"),dt=L("option",{title:"+376"},void 0,"Andorra"),rt=L("option",{title:"+244"},void 0,"Angola"),st=L("option",{title:"+1264"},void 0,"Anguilla"),lt=L("option",{title:"+1268"},void 0,"Antigua & Barbuda"),ct=L("option",{title:"+54"},void 0,"Argentina"),pt=L("option",{title:"+374"},void 0,"Armenia"),ut=L("option",{title:"+297"},void 0,"Aruba"),vt=L("option",{title:"+61"},void 0,"Australia"),ft=L("option",{title:"+43"},void 0,"Austria"),ht=L("option",{title:"+994"},void 0,"Azerbaijan"),mt=L("option",{title:"+1242"},void 0,"Bahamas"),bt=L("option",{title:"+973"},void 0,"Bahrain"),gt=L("option",{title:"+880"},void 0,"Bangladesh"),yt=L("option",{title:"+1246"},void 0,"Barbados"),St=L("option",{title:"+375"},void 0,"Belarus"),kt=L("option",{title:"+32"},void 0,"Belgium"),Bt=L("option",{title:"+501"},void 0,"Belize"),wt=L("option",{title:"+229"},void 0,"Benin"),Ct=L("option",{title:"+1441"},void 0,"Bermuda"),Mt=L("option",{title:"+975"},void 0,"Bhutan"),It=L("option",{title:"+591"},void 0,"Bolivia"),Nt=L("option",{title:"+387"},void 0,"Bosnia Herzegovina"),Pt=L("option",{title:"+267"},void 0,"Botswana"),Ft=L("option",{title:"+55"},void 0,"Brazil"),Et=L("option",{title:"+673"},void 0,"Brunei"),Lt=L("option",{title:"+359"},void 0,"Bulgaria"),_t=L("option",{title:"+226"},void 0,"Burkina Faso"),Tt=L("option",{title:"+257"},void 0,"Burundi"),Ot=L("option",{title:"+855"},void 0,"Cambodia"),zt=L("option",{title:"+237"},void 0,"Cameroon"),At=L("option",{title:"+1"},void 0,"Canada"),xt=L("option",{title:"+238"},void 0,"Cape Verde Islands"),Rt=L("option",{title:"+1345"},void 0,"Cayman Islands"),Ut=L("option",{title:"+236"},void 0,"Central African Republic"),Dt=L("option",{title:"+56"},void 0,"Chile"),Gt=L("option",{title:"+86"},void 0,"China"),qt=L("option",{title:"+57"},void 0,"Colombia"),jt=L("option",{title:"+269"},void 0,"Comoros"),Kt=L("option",{title:"+242"},void 0,"Congo"),Ht=L("option",{title:"+682"},void 0,"Cook Islands"),Vt=L("option",{title:"+506"},void 0,"Costa Rica"),Wt=L("option",{title:"+385"},void 0,"Croatia"),Jt=L("option",{title:"+53"},void 0,"Cuba"),Yt=L("option",{title:"+90392"},void 0,"Cyprus North"),Zt=L("option",{title:"+357"},void 0,"Cyprus South"),$t=L("option",{title:"+42"},void 0,"Czech Republic"),Qt=L("option",{title:"+45"},void 0,"Denmark"),Xt=L("option",{title:"+253"},void 0,"Djibouti"),to=L("option",{title:"+1809"},void 0,"Dominica"),oo=L("option",{title:"+1809"},void 0,"Dominican Republic"),eo=L("option",{title:"+593"},void 0,"Ecuador"),io=L("option",{title:"+20"},void 0,"Egypt"),ao=L("option",{title:"+503"},void 0,"El Salvador"),no=L("option",{title:"+240"},void 0,"Equatorial Guinea"),ro=L("option",{title:"+291"},void 0,"Eritrea"),so=L("option",{title:"+372"},void 0,"Estonia"),lo=L("option",{title:"+251"},void 0,"Ethiopia"),co=L("option",{title:"+500"},void 0,"Falkland Islands"),po=L("option",{title:"+298"},void 0,"Faroe Islands"),uo=L("option",{title:"+679"},void 0,"Fiji"),vo=L("option",{title:"+358"},void 0,"Finland"),fo=L("option",{title:"+33"},void 0,"France"),ho=L("option",{title:"+594"},void 0,"French Guiana"),mo=L("option",{title:"+689"},void 0,"French Polynesia"),bo=L("option",{title:"+241"},void 0,"Gabon"),go=L("option",{title:"+220"},void 0,"Gambia"),yo=L("option",{title:"+7880"},void 0,"Georgia"),So=L("option",{title:"+49"},void 0,"Germany"),ko=L("option",{title:"+233"},void 0,"Ghana"),Bo=L("option",{title:"+350"},void 0,"Gibraltar"),wo=L("option",{title:"+30"},void 0,"Greece"),Co=L("option",{title:"+299"},void 0,"Greenland"),Mo=L("option",{title:"+1473"},void 0,"Grenada"),Io=L("option",{title:"+590"},void 0,"Guadeloupe"),No=L("option",{title:"+671"},void 0,"Guam"),Po=L("option",{title:"+502"},void 0,"Guatemala"),Fo=L("option",{title:"+224"},void 0,"Guinea"),Eo=L("option",{title:"+245"},void 0,"Guinea - Bissau"),Lo=L("option",{title:"+592"},void 0,"Guyana"),_o=L("option",{title:"+509"},void 0,"Haiti"),To=L("option",{title:"+504"},void 0,"Honduras"),Oo=L("option",{title:"+852"},void 0,"Hong Kong"),zo=L("option",{title:"+36"},void 0,"Hungary"),Ao=L("option",{title:"+354"},void 0,"Iceland"),xo=L("option",{title:"+91"},void 0,"India"),Ro=L("option",{title:"+62"},void 0,"Indonesia"),Uo=L("option",{title:"+98"},void 0,"Iran"),Do=L("option",{title:"+964"},void 0,"Iraq"),Go=L("option",{title:"+353"},void 0,"Ireland"),qo=L("option",{title:"+972"},void 0,"Israel"),jo=L("option",{title:"+39"},void 0,"Italy"),Ko=L("option",{title:"+1876"},void 0,"Jamaica"),Ho=L("option",{title:"+81"},void 0,"Japan"),Vo=L("option",{title:"+962"},void 0,"Jordan"),Wo=L("option",{title:"+7"},void 0,"Kazakhstan"),Jo=L("option",{title:"+254"},void 0,"Kenya"),Yo=L("option",{title:"+686"},void 0,"Kiribati"),Zo=L("option",{title:"+850"},void 0,"Korea North"),$o=L("option",{title:"+82"},void 0,"Korea South"),Qo=L("option",{title:"+965"},void 0,"Kuwait"),Xo=L("option",{title:"+996"},void 0,"Kyrgyzstan"),te=L("option",{title:"+856"},void 0,"Laos"),oe=L("option",{title:"+371"},void 0,"Latvia"),ee=L("option",{title:"+961"},void 0,"Lebanon"),ie=L("option",{title:"+266"},void 0,"Lesotho"),ae=L("option",{title:"+231"},void 0,"Liberia"),ne=L("option",{title:"+218"},void 0,"Libya"),de=L("option",{title:"+417"},void 0,"Liechtenstein"),re=L("option",{title:"+370"},void 0,"Lithuania"),se=L("option",{title:"+352"},void 0,"Luxembourg"),le=L("option",{title:"+853"},void 0,"Macao"),ce=L("option",{title:"+389"},void 0,"Macedonia"),pe=L("option",{title:"+261"},void 0,"Madagascar"),ue=L("option",{title:"+265"},void 0,"Malawi"),ve=L("option",{title:"+60"},void 0,"Malaysia"),fe=L("option",{title:"+960"},void 0,"Maldives"),he=L("option",{title:"+223"},void 0,"Mali"),me=L("option",{title:"+356"},void 0,"Malta"),be=L("option",{title:"+692"},void 0,"Marshall Islands"),ge=L("option",{title:"+596"},void 0,"Martinique"),ye=L("option",{title:"+222"},void 0,"Mauritania"),Se=L("option",{title:"+269"},void 0,"Mayotte"),ke=L("option",{title:"+52"},void 0,"Mexico"),Be=L("option",{title:"+691"},void 0,"Micronesia"),we=L("option",{title:"+373"},void 0,"Moldova"),Ce=L("option",{title:"+377"},void 0,"Monaco"),Me=L("option",{title:"+976"},void 0,"Mongolia"),Ie=L("option",{title:"+1664"},void 0,"Montserrat"),Ne=L("option",{title:"+212"},void 0,"Morocco"),Pe=L("option",{title:"+258"},void 0,"Mozambique"),Fe=L("option",{title:"+95"},void 0,"Myanmar"),Ee=L("option",{title:"+264"},void 0,"Namibia"),Le=L("option",{title:"+674"},void 0,"Nauru"),_e=L("option",{title:"+977"},void 0,"Nepal"),Te=L("option",{title:"+31"},void 0,"Netherlands"),Oe=L("option",{title:"+687"},void 0,"New Caledonia"),ze=L("option",{title:"+64"},void 0,"New Zealand"),Ae=L("option",{title:"+505"},void 0,"Nicaragua"),xe=L("option",{title:"+227"},void 0,"Niger"),Re=L("option",{title:"+234"},void 0,"Nigeria"),Ue=L("option",{title:"+683"},void 0,"Niue"),De=L("option",{title:"+672"},void 0,"Norfolk Islands"),Ge=L("option",{title:"+670"},void 0,"Northern Marianas"),qe=L("option",{title:"+47"},void 0,"Norway"),je=L("option",{title:"+968"},void 0,"Oman"),Ke=L("option",{title:"+680"},void 0,"Palau"),He=L("option",{title:"+507"},void 0,"Panama"),Ve=L("option",{title:"+675"},void 0,"Papua New Guinea"),We=L("option",{title:"+595"},void 0,"Paraguay"),Je=L("option",{title:"+51"},void 0,"Peru"),Ye=L("option",{title:"+63"},void 0,"Philippines"),Ze=L("option",{title:"+48"},void 0,"Poland"),$e=L("option",{title:"+351"},void 0,"Portugal"),Qe=L("option",{title:"+1787"},void 0,"Puerto Rico"),Xe=L("option",{title:"+974"},void 0,"Qatar"),ti=L("option",{title:"+262"},void 0,"Reunion"),oi=L("option",{title:"+40"},void 0,"Romania"),ei=L("option",{title:"+7"},void 0,"Russia"),ii=L("option",{title:"+250"},void 0,"Rwanda"),ai=L("option",{title:"+378"},void 0,"San Marino"),ni=L("option",{title:"+239"},void 0,"Sao Tome & Principe"),di=L("option",{title:"+966"},void 0,"Saudi Arabia"),ri=L("option",{title:"+221"},void 0,"Senegal"),si=L("option",{title:"+381"},void 0,"Serbia"),li=L("option",{title:"+248"},void 0,"Seychelles"),ci=L("option",{title:"+232"},void 0,"Sierra Leone"),pi=L("option",{title:"+65"},void 0,"Singapore"),ui=L("option",{title:"+421"},void 0,"Slovak Republic"),vi=L("option",{title:"+386"},void 0,"Slovenia"),fi=L("option",{title:"+677"},void 0,"Solomon Islands"),hi=L("option",{title:"+252"},void 0,"Somalia"),mi=L("option",{title:"+27"},void 0,"South Africa"),bi=L("option",{title:"+34"},void 0,"Spain"),gi=L("option",{title:"+94"},void 0,"Sri Lanka"),yi=L("option",{title:"+290"},void 0,"St. Helena"),Si=L("option",{title:"+1869"},void 0,"St. Kitts"),ki=L("option",{title:"+1758"},void 0,"St. Lucia"),Bi=L("option",{title:"+249"},void 0,"Sudan"),wi=L("option",{title:"+597"},void 0,"Suriname"),Ci=L("option",{title:"+268"},void 0,"Swaziland"),Mi=L("option",{title:"+46"},void 0,"Sweden"),Ii=L("option",{title:"+41"},void 0,"Switzerland"),Ni=L("option",{title:"+963"},void 0,"Syria"),Pi=L("option",{title:"+886"},void 0,"Taiwan"),Fi=L("option",{title:"+7"},void 0,"Tajikstan"),Ei=L("option",{title:"+66"},void 0,"Thailand"),Li=L("option",{title:"+228"},void 0,"Togo"),_i=L("option",{title:"+676"},void 0,"Tonga"),Ti=L("option",{title:"+1868"},void 0,"Trinidad & Tobago"),Oi=L("option",{title:"+216"},void 0,"Tunisia"),zi=L("option",{title:"+90"},void 0,"Turkey"),Ai=L("option",{title:"+7"},void 0,"Turkmenistan"),xi=L("option",{title:"+993"},void 0,"Turkmenistan"),Ri=L("option",{title:"+1649"},void 0,"Turks & Caicos Islands"),Ui=L("option",{title:"+688"},void 0,"Tuvalu"),Di=L("option",{title:"+256"},void 0,"Uganda"),Gi=L("option",{title:"+44"},void 0,"UK"),qi=L("option",{title:"+380"},void 0,"Ukraine"),ji=L("option",{title:"+971"},void 0,"United Arab Emirates"),Ki=L("option",{title:"+598"},void 0,"Uruguay"),Hi=L("option",{title:"+1"},void 0,"USA"),Vi=L("option",{title:"+7"},void 0,"Uzbekistan"),Wi=L("option",{title:"+678"},void 0,"Vanuatu"),Ji=L("option",{title:"+379"},void 0,"Vatican City"),Yi=L("option",{title:"+58"},void 0,"Venezuela"),Zi=L("option",{title:"+84"},void 0,"Vietnam"),$i=L("option",{title:"+84"},void 0,"Virgin Islands - British"),Qi=L("option",{title:"+84"},void 0,"Virgin Islands - US"),Xi=L("option",{title:"+681"},void 0,"Wallis & Futuna"),ta=L("option",{title:"+969"},void 0,"Yemen"),oa=L("option",{title:"+967"},void 0,"Yemen"),ea=L("option",{title:"+260"},void 0,"Zambia"),ia=L("option",{title:"+263"},void 0,"Zimbabwe"),aa=L(B.a,{filledBtn:!0,marginTop:"10px",disabled:!0},void 0,L(P.a,{})),na=L(B.a,{filledBtn:!0,marginTop:"10px"},void 0,L("span",{},void 0,"Update Branch")),da=function(t){function o(){var t,e,i;return function(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}(this,o),e=this,i=T(o).call(this),t=!i||"object"!==E(i)&&"function"!==typeof i?O(e):i,A(O(t),"success",function(){return l.toast.success(t.state.notification)}),A(O(t),"error",function(){return l.toast.error(t.state.notification)}),A(O(t),"warn",function(){return l.toast.warn(t.state.notification)}),A(O(t),"countryChange",function(o){var e,i=o.target,a=i.value,n=i.name,d=o.target.options[o.target.selectedIndex].title;t.setState((A(e={},n,a),A(e,"ccode",d),e))}),A(O(t),"handleInputChange",function(o){var e=o.target,i=e.value,a=e.name;t.setState(A({},a,i))}),A(O(t),"getBanks",function(){r.a.post("".concat(F.a,"/getOne"),{page:"branch",type:"bank",token:x,page_id:t.state.branch_id}).then(function(o){200==o.status&&(console.log(o.data),t.setState({otpEmail:o.data.row.email,otpMobile:o.data.row.mobile,bankName:o.data.row.name,dbcode:o.data.row.bcode}))}).catch(function(t){})}),A(O(t),"editBank",function(o){o.preventDefault(),null==t.state.logo||""==t.state.logo?t.setState({notification:"You need to upload a logo"},function(){t.error()}):null==t.state.contract||""==t.state.contract?t.setState({notification:"You need to upload a contract"},function(){t.error()}):(t.setState({editBankLoading:!0}),t.setState({showOtp:!0},function(){t.generateOTP(),t.setState({editBankLoading:!1})}))}),A(O(t),"showEditPopup",function(o){t.setState({editPopup:!0})}),A(O(t),"blockBranch",function(){if(1==t.state.status)var o=-1;else o=1;O(t);r.a.post("".concat(F.a,"/branchStatus"),{token:x,branch_id:t.state.branch_id,status:o}).then(function(e){if(200!=e.status)throw new Error(e.data.error);if(e.data.error)throw e.data.error;var i=1==o?"Unblocked":"Blocked";t.setState({notification:"Branch "+i}),t.success(),t.getBranches()}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString()}),t.error()})}),A(O(t),"startTimer",function(){var o=O(t),e=setInterval(function(){if(o.state.timer<=0)clearInterval(e),o.setState({resend:!0});else{var t=Number(o.state.timer)-1;o.setState({timer:t})}},1e3)}),A(O(t),"generateOTP",function(){t.setState({resend:!1,timer:30}),t.startTimer(),r.a.post("".concat(F.a,"/generateOTPBank"),{name:t.state.name,email:t.state.email,mobile:t.state.mobile,bcode:t.state.bcode,page:"editBank",username:t.state.username,token:x}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({otpId:o.data.id,showEditOtp:!0,notification:"OTP Sent"}),t.success()}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString()}),t.error()})}),A(O(t),"closePopup",function(){t.setState({editPopup:!1})}),A(O(t),"editBranch",function(o){t.setState({editBranchLoading:!0}),o.preventDefault(),r.a.post("".concat(F.a,"/editBranch"),{name:t.state.name,bcode:t.state.bcode,username:t.state.username,credit_limit:t.state.credit_limit,address1:t.state.address1,state:t.state.state,zip:t.state.zip,country:t.state.country,ccode:t.state.ccode,email:t.state.email,mobile:t.state.mobile,branch_id:t.state.branch_id,token:x}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({notification:"Bank updated successfully!"},function(){this.success(),this.closePopup(),this.getBranches()}),t.setState({editBranchLoading:!1})}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString(),editBranchLoading:!1}),t.error()})}),A(O(t),"showMiniPopUp",function(o){t.setState({popup:!0});var e=o.target.getAttribute("data-id"),i=o.target.getAttribute("data-d");console.log(e);var a=i.split("^");t.setState({popname:a[0],poptype:a[1],poprange:a[2],poppercent:a[3],sid:e})}),A(O(t),"closeMiniPopUp",function(){t.setState({popup:!1,name:"",address1:"",state:"",zip:"",ccode:"",country:"",email:"",mobile:"",logo:null,contract:null,otp:"",showOtp:!1})}),A(O(t),"logout",function(){localStorage.removeItem("logged"),localStorage.removeItem("name"),t.setState({redirect:!0})}),A(O(t),"addBank",function(o){o.preventDefault(),r.a.post("".concat(F.a,"/generateOTP"),{name:t.state.name,mobile:t.state.mobile,page:"addBank",token:x}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({showEditOtp:!0,notification:"OTP Sent"}),t.success()}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString()}),t.error()})}),A(O(t),"approve",function(o){o.preventDefault(),r.a.post("".concat(F.a,"/approveFee"),{id:t.state.sid,token:x}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({notification:"Approved"}),t.success()}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString()}),t.error()})}),A(O(t),"decline",function(o){o.preventDefault(),r.a.post("".concat(F.a,"/declineFee"),{id:t.state.sid,token:x}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({notification:"Declined"}),t.success()}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString()}),t.error()})}),A(O(t),"showWallet",function(t){t.preventDefault()}),A(O(t),"verifyOTP",function(o){o.preventDefault(),r.a.post("".concat(F.a,"/addBank"),{name:t.state.name,address1:t.state.address1,state:t.state.state,zip:t.state.zip,country:t.state.country,ccode:t.state.ccode,email:t.state.email,mobile:t.state.mobile,logo:t.state.logo,contract:t.state.contract,otp:t.state.otp,token:x}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({notification:"Bank added successfully!"}),t.success(),t.closeMiniPopUp(),t.getBranches()}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString()}),t.error()})}),A(O(t),"removeFile",function(o){t.setState(A({},o,null))}),A(O(t),"triggerBrowse",function(t){document.getElementById(t).click()}),A(O(t),"getBranches",function(){r.a.post("".concat(F.a,"/getBranch"),{token:x,branch_id:t.state.branch_id}).then(function(o){200==o.status&&t.setState({loading:!1,banks:o.data.branches,name:o.data.branches.name,bcode:o.data.branches.bcode,credit_limit:o.data.branches.credit_limit,username:o.data.branches.username,address1:o.data.branches.address1,state:o.data.branches.state,zip:o.data.branches.zip,country:o.data.branches.country,ccode:o.data.branches.ccode,mobile:o.data.branches.mobile,email:o.data.branches.email,branch_id:o.data.branches._id,status:o.data.branches.status})}).catch(function(t){})}),A(O(t),"getRules",function(){r.a.post("".concat(F.a,"/getBankRules"),{bank_id:t.state.bank}).then(function(o){200==o.status&&t.setState({loading:!1,rules:o.data.rules})}).catch(function(t){})}),A(O(t),"edit",function(){console.log("edit triggered")}),A(O(t),"block",function(){console.log("block triggered")}),A(O(t),"showPopup",function(){t.setState({popup:!0})}),A(O(t),"verifyEditOTP",function(o){t.setState({verifyLoading:!0}),o.preventDefault(),r.a.post("".concat(F.a,"/editBankBank"),{name:t.state.name,address1:t.state.address1,state:t.state.state,zip:t.state.zip,bank_id:t.state.bank_id,country:t.state.country,ccode:t.state.ccode,bcode:t.state.bcode,email:t.state.email,mobile:t.state.mobile,logo:t.state.logo,contract:t.state.contract,otp:t.state.otp,otp_id:t.state.otpId,token:x}).then(function(o){if(200!=o.status)throw new Error(o.data.error);if(o.data.error)throw o.data.error;t.setState({notification:"Bank updated successfully!"}),t.success(),t.closePopup(),t.getBranches(),t.setState({verifyLoading:!1})}).catch(function(o){t.setState({notification:o.response?o.response.data.error:o.toString(),verifyLoading:!1}),t.error()})}),t.state={sid:"",bank:R,name:"",address1:"",popname:"",poprange:"",poptype:"",poppercent:"",state:"",zip:"",country:"",ccode:"",mobile:"",email:"",bname:U,logo:null,contract:null,loading:!0,redirect:!1,totalBanks:0,notification:"Welcome",popup:!1,user_id:x,banks:[],rules:[],otp:"",showOtp:!1},t.success=t.success.bind(O(t)),t.error=t.error.bind(O(t)),t.warn=t.warn.bind(O(t)),t.showMiniPopUp=t.showMiniPopUp.bind(O(t)),t.onChange=t.onChange.bind(O(t)),t.fileUpload=t.fileUpload.bind(O(t)),t}var e,i,d;return function(t,o){if("function"!==typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(o&&o.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),o&&z(t,o)}(o,a["Component"]),e=o,(i=[{key:"onChange",value:function(t){t.target.files&&null!=t.target.files[0]&&this.fileUpload(t.target.files[0],t.target.getAttribute("data-key"))}},{key:"fileUpload",value:function(t,o){var e=this;this.setState(A({},o,"main/loader.gif"));var i=new FormData;i.append("file",t);var a="fileUpload";"contract"==o&&(a="ipfsUpload"),r.a.post("".concat(F.a,"/").concat(a,"?token=").concat(x),i,{headers:{"content-type":"multipart/form-data"}}).then(function(t){if(200!=t.status)throw t.data.error;if(t.data.error)throw t.data.error;e.setState(A({},o,t.data.name))}).catch(function(t){e.setState(A({notification:t.response?t.response.data.error:t.toString()},o,"")),e.error()})}},{key:"componentDidMount",value:function(){var t=this;this.setState({bank:this.state.bank_id}),this.setState({branch_id:this.props.match.params.branch},function(){void 0!==x&&null!==x&&(t.getBanks(),t.getBranches())})}},{key:"render",value:function(){function t(t){t.target.parentElement.querySelector("label").classList.add("focused")}function o(t){var o=t.target;""==o.value&&o.parentElement.querySelector("label").classList.remove("focused")}console.log(this.props);var e=this.state,i=e.loading,a=e.redirect;if(i)return D;if(a)return null;return L(f.a,{from:"bank"},void 0,G,L(h.a,{page:"branch",middleTitle:this.state.name,goto:"/bank/branches/"}),L(b.a,{verticalMargin:!0},void 0,L(y.a,{active:"info",branchId:this.props.match.params.branch,blockTxt:this.state.status,edit:this.showEditPopup.bind(this),block:this.blockBranch.bind(this),bankName:this.state.name}),L(S.a,{},void 0,L(m.a,{branchId:this.props.match.params.branch,bCode:this.state.dbcode,bankName:this.state.bname}),L(k.a,{bigPadding:!0,bordered:!0},void 0,L("div",{className:"cardBody"},void 0,L(I.a,{},void 0,q,L(N.a,{className:"infoRight"},void 0,this.state.name)),L(I.a,{},void 0,j,L(N.a,{className:"infoRight"},void 0,this.state.bcode)),L(I.a,{},void 0,K,L(N.a,{className:"infoRight"},void 0,this.state.username)),L(I.a,{},void 0,H,L(N.a,{className:"infoRight"},void 0,this.state.address1)),L(I.a,{},void 0,V,L(N.a,{className:"infoRight"},void 0,this.state.state)),L(I.a,{},void 0,W,L(N.a,{className:"infoRight"},void 0,this.state.zip)),L(I.a,{},void 0,J,L(N.a,{className:"infoRight"},void 0,this.state.ccode)),L(I.a,{},void 0,Y,L(N.a,{className:"infoRight"},void 0,this.state.country)),L(I.a,{},void 0,Z,L(N.a,{className:"infoRight"},void 0,this.state.email)),L(I.a,{},void 0,$,L(N.a,{className:"infoRight"},void 0,this.state.mobile)))))),this.state.editPopup?L(g.a,{close:this.closePopup.bind(this),accentedH1:!0},void 0,this.state.showEditOtp?null:L("div",{},void 0,Q,L("form",{action:"",method:"post",onSubmit:this.editBranch},void 0,L(w.a,{},void 0,X,L(C.a,{type:"text",name:"name",onFocus:t,onBlur:o,value:this.state.name,onChange:this.handleInputChange,autoFocus:!0,required:!0})),L(w.a,{},void 0,tt,L(C.a,{type:"text",name:"bcode",onFocus:t,onBlur:o,value:this.state.bcode,onChange:this.handleInputChange,autoFocus:!0,required:!0})),L(w.a,{},void 0,ot,L(C.a,{type:"text",name:"username",onFocus:t,onBlur:o,value:this.state.username,onChange:this.handleInputChange,autoFocus:!0,required:!0})),L(w.a,{},void 0,et,L(C.a,{type:"text",name:"credit_limit",onFocus:t,onBlur:o,value:this.state.credit_limit,onChange:this.handleInputChange,autoFocus:!0})),L(w.a,{},void 0,it,L(C.a,{type:"text",name:"address1",onFocus:t,onBlur:o,value:this.state.address1,onChange:this.handleInputChange,required:!0,autoFocus:!0})),L(I.a,{},void 0,L(N.a,{},void 0,L(w.a,{},void 0,L("label",{},void 0,n.a.createElement(p.FormattedMessage,v.popup3),"*"),L(C.a,{type:"text",name:"state",onFocus:t,onBlur:o,value:this.state.state,onChange:this.handleInputChange,required:!0,autoFocus:!0}))),L(N.a,{},void 0,L(w.a,{},void 0,L("label",{},void 0,n.a.createElement(p.FormattedMessage,v.popup4),"*"),L(C.a,{type:"text",name:"zip",onFocus:t,onBlur:o,value:this.state.zip,onChange:this.handleInputChange,required:!0,autoFocus:!0})))),L(I.a,{},void 0,L(N.a,{},void 0,L(w.a,{},void 0,L(M.a,{type:"text",name:"country",value:this.state.country,onChange:this.countryChange,required:!0,autoFocus:!0},void 0,at,nt,dt,rt,st,lt,ct,pt,ut,vt,ft,ht,mt,bt,gt,yt,St,kt,Bt,wt,Ct,Mt,It,Nt,Pt,Ft,Et,Lt,_t,Tt,Ot,zt,At,xt,Rt,Ut,Dt,Gt,qt,jt,Kt,Ht,Vt,Wt,Jt,Yt,Zt,$t,Qt,Xt,to,oo,eo,io,ao,no,ro,so,lo,co,po,uo,vo,fo,ho,mo,bo,go,yo,So,ko,Bo,wo,Co,Mo,Io,No,Po,Fo,Eo,Lo,_o,To,Oo,zo,Ao,xo,Ro,Uo,Do,Go,qo,jo,Ko,Ho,Vo,Wo,Jo,Yo,Zo,$o,Qo,Xo,te,oe,ee,ie,ae,ne,de,re,se,le,ce,pe,ue,ve,fe,he,me,be,ge,ye,Se,ke,Be,we,Ce,Me,Ie,Ne,Pe,Fe,Ee,Le,_e,Te,Oe,ze,Ae,xe,Re,Ue,De,Ge,qe,je,Ke,He,Ve,We,Je,Ye,Ze,$e,Qe,Xe,ti,oi,ei,ii,ai,ni,di,ri,si,li,ci,pi,ui,vi,fi,hi,mi,bi,gi,yi,Si,ki,Bi,wi,Ci,Mi,Ii,Ni,Pi,Fi,Ei,Li,_i,Ti,Oi,zi,Ai,xi,Ri,Ui,Di,Gi,qi,ji,Ki,Hi,Vi,Wi,Ji,Yi,Zi,$i,Qi,Xi,ta,oa,ea,ia))),L(N.a,{},void 0,L(w.a,{},void 0,L("label",{},void 0,n.a.createElement(p.FormattedMessage,v.popup8),"*"),L(C.a,{type:"email",name:"email",autoFocus:!0,onFocus:t,onBlur:o,value:this.state.email,onChange:this.handleInputChange,required:!0})))),L(I.a,{},void 0,L(N.a,{cW:"20%",mR:"2%"},void 0,L(w.a,{},void 0,L(C.a,{type:"text",name:"ccode",readOnly:!0,value:this.state.ccode,onChange:this.handleInputChange,required:!0,autoFocus:!0}))),L(N.a,{cW:"78%"},void 0,L(w.a,{},void 0,L("label",{},void 0,n.a.createElement(p.FormattedMessage,v.popup7),"*"),L(C.a,{type:"text",pattern:"[0-9]{10}",title:"10 Digit numeric value",name:"mobile",onFocus:t,onBlur:o,value:this.state.mobile,onChange:this.handleInputChange,required:!0,autoFocus:!0})))),this.state.editBranchLoading?aa:na))):null)}}])&&_(e.prototype,i),d&&_(e,d),o}()}}]);