(this["webpackJsonpsmart-cart"]=this["webpackJsonpsmart-cart"]||[]).push([[0],{27:function(e,t,a){e.exports=a(46)},34:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(24),l=a.n(c),o=(a(34),a(12)),s=a(4),i=a(49),u=a(21),m=a(7),d=a(11);a(47);const p=Object(u.a)({apiKey:"AIzaSyAb8R9GWFTKyffqyVbCEBMHsq4I-doBn7Y",authDomain:"smart-cart-sign-up.firebaseapp.com",projectId:"smart-cart-sign-up",storageBucket:"smart-cart-sign-up.appspot.com",messagingSenderId:"411064186344",appId:"1:411064186344:web:4193c9acb9f9ab78b7e05d",measurementId:"G-FDJD5J5M5Y"},"inventoryApp"),E=(Object(m.g)(p),Object(d.f)(p)),g=Object(u.a)({apiKey:"AIzaSyBPI5gNtHZUesmXe0C4J_fBs7P_n4zZgv4",authDomain:"smart-cart-orders.firebaseapp.com",projectId:"smart-cart-orders",storageBucket:"smart-cart-orders.appspot.com",messagingSenderId:"1087581861652",appId:"1:1087581861652:web:ae1900dd655944f4613401",measurementId:"G-B6B11EQT8P"},"ordersApp"),b=Object(d.f)(g),h=Object(m.g)(g);var f=e=>{let{updateCart:t}=e;const a=Object(n.useRef)(null),[c,l]=Object(n.useState)(!1);return Object(n.useEffect)(()=>{(async()=>{try{const e=await navigator.mediaDevices.getUserMedia({video:!0});a.current.srcObject=e,a.current.play(),l(!0)}catch(e){console.error("Error accessing webcam:",e)}})()},[]),Object(n.useEffect)(()=>{if(!c)return;const e=setInterval(async()=>{const e=document.createElement("canvas");e.width=a.current.videoWidth,e.height=a.current.videoHeight;e.getContext("2d").drawImage(a.current,0,0,e.width,e.height);const n=e.toDataURL("image/jpeg");try{const e=await Object(i.a)({method:"POST",url:"https://detect.roboflow.com/billing-system/2",params:{api_key:"CSC6NWlRmHGQf2qUVPIL"},data:n,headers:{"Content-Type":"application/x-www-form-urlencoded"}});console.log(e.data);e.data.predictions;const a=[{x:320.5,y:246.5,width:631,height:467,confidence:.43707746267318726,class:"kissan-tomatoketchup-200",class_id:136,detection_id:"496f170b-26dc-413a-9f17-d76ce0375f58"},{x:320.5,y:246.5,width:631,height:467,confidence:.43707746267318726,class:"lemon",class_id:136,detection_id:"496f170b-26dc-413a-9f17-d76ce0375f58"},{x:320.5,y:246.5,width:631,height:467,confidence:.43707746267318726,class:"lemon",class_id:136,detection_id:"496f170b-26dc-413a-9f17-d76ce0375f58"}],r=(await Promise.all(a.map(async e=>{try{const t=Object(d.g)(Object(d.b)(E,"products"),Object(d.h)("class","==",e.class)),a=await Object(d.e)(t);if(a.empty)return console.warn("Product matching class value ".concat(e.class," not found in Firestore")),null;return a.docs[0].data()}catch(t){return console.error("Error fetching product details for class ".concat(e.class,":"),t),null}}))).filter(e=>null!==e);t(r),console.log("Detected objects with details:",r)}catch(r){console.error("Error detecting objects:",r.message)}},1e4);return()=>clearInterval(e)},[c]),r.a.createElement("div",null,r.a.createElement("video",{ref:a,style:{width:"100%"}}))};a(38);var y=e=>{let{items:t,totalPrice:a}=e;return r.a.createElement("div",{className:"cart"},r.a.createElement("h2",null,"Shopping Cart"),t.length>0?r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Product"),r.a.createElement("th",null,"Price"),r.a.createElement("th",null,"Product Number"),r.a.createElement("th",null,"Quantity"))),r.a.createElement("tbody",null,t.map((e,t)=>r.a.createElement("tr",{key:t},r.a.createElement("td",null,e.class),r.a.createElement("td",null,"$",e.price),r.a.createElement("td",null,e.productNumber),r.a.createElement("td",null,e.quantity))))):r.a.createElement("p",null,"Your cart is empty."),r.a.createElement("div",{className:"total-price"},r.a.createElement("h3",null,"Total Price: $",a.toFixed(2))))};a(39);var v=()=>{const e=Object(s.p)(),[t,a]=Object(n.useState)([]),[c,l]=Object(n.useState)(0);return r.a.createElement("div",{className:"home",style:{display:"flex"}},r.a.createElement("div",{style:{flex:1}},r.a.createElement("h1",null,"Welcome to the Smart Cart App!"),r.a.createElement("button",{onClick:async()=>{try{await Object(m.p)(h),e("/signin")}catch(t){console.error("Error signing out:",t)}}},"Log Out"),r.a.createElement(f,{updateCart:e=>{const t=e.reduce((e,t)=>{const a=t.class;return e[a]||(e[a]={...t,quantity:0}),e[a].quantity+=1,e},{}),n=Object.values(t),r=n.reduce((e,t)=>e+t.price*t.quantity,0);l(r),a(n)}})),r.a.createElement("div",{style:{flex:1}},r.a.createElement(y,{items:t,totalPrice:c}),r.a.createElement("button",{onClick:async()=>{try{const a=h.currentUser,n=Object(d.b)(b,"orders"),r=await Object(d.a)(n,{userEmail:a.email,items:t,totalAmount:c,timestamp:new Date});e("/thankyou/".concat(r.id))}catch(a){console.error("Error during payment:",a)}}},"Pay Now")))};a(40);var j=()=>{const[e,t]=Object(n.useState)(""),[a,c]=Object(n.useState)(""),l=Object(s.p)();return r.a.createElement("div",{className:"signin-container"},r.a.createElement("form",{onSubmit:async t=>{t.preventDefault();try{await Object(m.m)(h,e,a),l("/")}catch(n){console.error("Error signing in:",n)}}},r.a.createElement("h2",null,"Sign In"),r.a.createElement("input",{type:"email",placeholder:"Email",value:e,onChange:e=>t(e.target.value),required:!0}),r.a.createElement("input",{type:"password",placeholder:"Password",value:a,onChange:e=>c(e.target.value),required:!0}),r.a.createElement("button",{type:"submit"},"Sign In")),r.a.createElement("p",null,"Don't have an account? ",r.a.createElement(o.b,{to:"/signup"},"Sign Up")))};a(41);var O=()=>r.a.createElement("div",{className:"sign-in-page"},r.a.createElement(j,null));a(42);var w=()=>{const[e,t]=Object(n.useState)(""),[a,c]=Object(n.useState)(""),l=Object(s.p)();return r.a.createElement("div",{className:"signup-container"},r.a.createElement("form",{onSubmit:async t=>{t.preventDefault();try{await Object(m.f)(h,e,a),l("/signin")}catch(n){console.error("Error signing up:",n)}}},r.a.createElement("h2",null,"Sign Up"),r.a.createElement("input",{type:"email",placeholder:"Email",value:e,onChange:e=>t(e.target.value),required:!0}),r.a.createElement("input",{type:"password",placeholder:"Password",value:a,onChange:e=>c(e.target.value),required:!0}),r.a.createElement("button",{type:"submit"},"Sign Up")),r.a.createElement("p",null,"Have an account? ",r.a.createElement(o.b,{to:"/signin"},"Sign In")))};a(43);var S=()=>r.a.createElement("div",{className:"sign-up-page"},r.a.createElement(w,null)),I=(a(44),a(25)),k=a(26);a(45);var C=()=>{const{orderId:e}=Object(s.r)(),t=Object(s.p)(),[a,c]=Object(n.useState)(null);Object(n.useEffect)(()=>{(async()=>{const t=await Object(d.d)(Object(d.c)(b,"orders",e));t.exists()?c(t.data()):console.error("No such order!")})()},[e]);return r.a.createElement("div",{className:"thank-you"},r.a.createElement("h1",null,"Thank You for Your Purchase!"),a&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"order-details"},r.a.createElement("h2",null,"Order Details"),r.a.createElement("ul",null,a.items.map((e,t)=>r.a.createElement("li",{key:t},e.class," - $",e.price," x ",e.quantity))),r.a.createElement("p",null,"Total Amount: $",a.totalAmount)),r.a.createElement("div",{className:"qr-code"},r.a.createElement("h2",null,"Scan to Pay  $",a.totalAmount),r.a.createElement(k.a,{value:"upi://pay?pa=hutagikarvinuta@okhdfcbank&pn=Vinut Hutagikar&am=".concat(a.totalAmount,"&cu=INR")}))),r.a.createElement("button",{onClick:()=>{t("/home")}},"Go to Home"))};var P=function(){const[e,t,a]=Object(I.a)(h);return t?r.a.createElement("div",null,"Loading..."):a?r.a.createElement("div",null,"Error: ",a.message):r.a.createElement(o.a,null,r.a.createElement(s.d,null,r.a.createElement(s.b,{path:"/signin",element:r.a.createElement(O,null)}),r.a.createElement(s.b,{path:"/signup",element:r.a.createElement(S,null)}),r.a.createElement(s.b,{path:"/thankyou/:orderId",element:r.a.createElement(C,null)}),r.a.createElement(s.b,{path:"/",element:e?r.a.createElement(v,null):r.a.createElement(s.a,{to:"/signin"})}),r.a.createElement(s.b,{path:"*",element:r.a.createElement(s.a,{to:"/signin"})})))};var N=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,50)).then(t=>{let{getCLS:a,getFID:n,getFCP:r,getLCP:c,getTTFB:l}=t;a(e),n(e),r(e),c(e),l(e)})};l.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(P,null))),N()}},[[27,1,2]]]);
//# sourceMappingURL=main.0bbb69ea.chunk.js.map