(this["webpackJsonpsku-game"]=this["webpackJsonpsku-game"]||[]).push([[0],{38:function(e,t,n){e.exports=n(63)},43:function(e,t,n){},44:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(34),c=n.n(o),i=(n(43),n(11)),u=(n(44),n(18)),l=n(12),s=n(36),d=n(7);window.PIXI=d;var f,m=Object(l.PixiComponent)("RectTileLayer",{create:function(e){return n(33),new window.PIXI.tilemap.CompositeRectTileLayer(0,[e.texture])},applyProps:function(e,t,n){var r=n.layer,a=n.tileset,o=n.horizontalTiles,c=n.spritesheet;if(r.data)for(var i=0;i<r.data.length;i++){var u=a.tilewidth,l=a.tileheight,s=i%o*u,d=Math.floor(i/o)*l;if(r.data[i]>0){var f="".concat(a.name,"-").concat(r.data[i]);e.addFrame(c.textures[f],s,d)}}}}),p=function(e){var t=e.basePath,n=e.data,o=e.setRackLocations,c=e.setDockLocations,u=e.setWallLocations,s=Object(r.useState)(),f=Object(i.a)(s,2),m=f[0],p=f[1],y=Object(r.useState)(),O=Object(i.a)(y,2),j=O[0];O[1];return Object(r.useEffect)((function(){var e=b(n),r=g(n),a=d.Texture.from("".concat(t,"/").concat(r.image)),i=d.BaseTexture.from("".concat(t,"/").concat(r.image)),l=new d.Spritesheet(i,e),s=[];l.parse((function(){var e,t,i=null===(e=r.tiles)||void 0===e?void 0:e.filter((function(e){var t;return null===(t=e.properties)||void 0===t?void 0:t.some((function(e){return"rack"===e.name&&e.value}))})).map((function(e){return e.id})),d=null===(t=r.tiles)||void 0===t?void 0:t.filter((function(e){var t;return null===(t=e.properties)||void 0===t?void 0:t.some((function(e){return"dock"===e.name&&e.value}))})).map((function(e){return e.id})),f=n.layers.filter((function(e){return e.visible})).map((function(e){return e.properties&&e.properties.some((function(e){return"wall"===e.name&&!0===e.value}))&&v(s,e,e.width),h(e,a,n.width,r,l)})),m=n.layers.find((function(e){var t;return null===(t=e.properties)||void 0===t?void 0:t.some((function(e){return"placeholders"===e.name&&e.value}))}));if(m){var g=[],b=[];m.data.forEach((function(e,t){if(i&&i.some((function(t){return t===e-r.firstgid}))){var n=t%m.width,a=Math.floor(t/m.width);g.push([n,a])}if(d&&d.some((function(t){return t===e-r.firstgid}))){var u=t%m.width,l=Math.floor(t/m.width);b.push([u,l])}o(g),c(b)}))}u(s),p(f)}))}),[t,n,o,c,u]),a.a.createElement(l.Container,null,m,j)},g=function(e){if(!e.tilesets.length)throw new Error("No tilesets found! Can't continue");if(e.tilesets.length>1&&console.warn("Found more than one tileset. But we currently only support one."),e.tilesets[0].source)throw new Error("Please embed tilemaps in Tiled! Can't continue");return e.tilesets[0]},h=function(e,t,n,r,o){return a.a.createElement(m,{key:e.name,texture:t,layer:e,horizontalTiles:n,tileset:r,spritesheet:o})},b=function(e){for(var t=g(e),n=t.columns,r={},a=0;a<t.tilecount;a++){var o=t.tilewidth,c=t.tileheight,i=a%n*o,u=Math.floor(a/n)*c;r["".concat(t.name,"-").concat(a+1)]={frame:{x:i,y:u,w:o,h:c},spriteSourceSize:{x:i,y:u,w:o,h:c},rotated:!1,trimmed:!1,sourceSize:{w:o,h:c}}}return{frames:r,meta:{image:t.image,size:{w:t.imagewidth,h:t.imageheight},scale:1}}},v=function(e,t,n){t.data.reduce((function(e,t,r){if(t>0){var a=r%n,o=Math.floor(r/n);e.push([a,o])}return e}),e)};!function(e){e[e.A=0]="A",e[e.B=1]="B",e[e.C=2]="C",e[e.D=3]="D"}(f||(f={}));var y,O=[{category:f.A,productCode:"IRN 590",description:"Clothes Iron"},{category:f.A,productCode:"CAM 679",description:"Digital Camera"},{category:f.A,productCode:"BAM 223",description:"Baby monitor"},{category:f.A,productCode:"SMK 019",description:"Smoke detector",slotting:"Usually sold with BAT 917"},{category:f.A,productCode:"DLA 413",description:"Desk lamp"},{category:f.A,productCode:"VAC 082",description:"Vacuum cleaner"},{category:f.A,productCode:"BAT 917",description:"Battery charger",slotting:"Usually sold with SMK 019"},{category:f.B,productCode:"VIR 555",description:"Virtual Reality headset"},{category:f.B,productCode:"PTV 555",description:"Plasma TV Set",slotting:"Usually sold with SPK 876"},{category:f.B,productCode:"SPK 876",description:"Home Theatre System/Speaker System",slotting:"Usually sold with PTV 555"},{category:f.B,productCode:"MWO 901",description:"Microwave Oven"},{category:f.B,productCode:"OTV 482",description:"OLED TV Set"},{category:f.C,productCode:"MIC 099",description:"Microphone",slotting:"Usually sold with DSC 743 as a karaoke set"},{category:f.C,productCode:"WSH 322",description:"Washing Machine"},{category:f.C,productCode:"RFG 411",description:"Refrigerator"},{category:f.C,productCode:"SMX 041",description:"Stand Mixer"},{category:f.C,productCode:"DSC 743",description:"Disco Ball",slotting:"Usually sold with MIC 099 as a karaoke set"},{category:f.D,productCode:"TPH 255",description:"Telephone"},{category:f.D,productCode:"CST 964",description:"Cassette Player"}],j=n(37),w=n(14),x=function(e,t){switch(t.type){case"startPicking":return e.map((function(e){return e.orderNo===t.orderNo?Object(w.a)(Object(w.a)({},e),{},{guy:t.guy}):e}));case"completeProductPick":return e.map((function(e){return e.orderNo===t.orderNo?Object(w.a)(Object(w.a)({},e),{},{pickedProducts:[].concat(Object(j.a)(e.pickedProducts||[]),[t.productCode])}):e}));case"completeOrder":return e.map((function(e){return e.orderNo===t.orderNo?Object(w.a)(Object(w.a)({},e),{},{complete:!0}):e}));default:return e}},C=n(23),S={boxes:function(){var e=O.map((function(e){return e.productCode}));return e.sort((function(){return.5-Math.random()})),e.reduce((function(e,t,n){return e[t]={location:[1+n,1]},e}),{})}()},k=function(e,t){switch(t.type){case"placeBox":var n=t.location,r=t.inRack,a=Object(w.a)(Object(w.a)({},e.boxes),{},Object(C.a)({},t.productCode,Object(w.a)(Object(w.a)({},e.boxes[t.productCode]),{},{location:n,inRack:r})));return Object(w.a)(Object(w.a)({},e),{},{boxes:a});default:return e}};!function(e){e[e.placingBoxes=0]="placingBoxes",e[e.pickingBoxes=1]="pickingBoxes"}(y||(y={}));var E=function(e,t){switch(t.type){case"startPicking":return y.pickingBoxes;default:return e}},P={statusText:"",gameState:y.placingBoxes,wms:O,pickingLists:[["MIC 099","MWO 901","DSC 743"],["WSH 322"],["SMX 041","OTV 482","CAM 679"],["SMK 019","BAT 917"],["VAC 082"],["SPK 876","PTV 555","DLA 413"],["IRN 590"]].map((function(e){return{orderNo:Math.random().toString().slice(2,9),products:e}})),warehouse:S},M=function(e,t){switch(t.type){case"setStatusText":return t.text;default:return e}},B=Object(r.createContext)({state:P,dispatch:function(){return null}}),I=function(e,t){return{gameState:E(e.gameState,t),statusText:M(e.statusText,t),wms:e.wms,pickingLists:x(e.pickingLists,t),warehouse:k(e.warehouse,t)}},T=function(e){var t=e.children,n=Object(r.useReducer)(I,P),o=Object(i.a)(n,2),c=o[0],u=o[1];return a.a.createElement(B.Provider,{value:{state:c,dispatch:u}},t)},N=n(64),R=n(16);N.a.registerPIXI(d),R.a.registerPlugin(N.a);var L,A=function(e){var t=e.location,n=void 0===t?[0,0]:t,o=e.tileWidth,c=void 0===o?0:o,i=e.tileHeight,u=void 0===i?0:i,s=e.behindWall,f=Object(r.useRef)(null),m=Object(r.useRef)(null),p=Object(r.useRef)(null),g=Object(r.useRef)(),h=Object(r.useRef)(),b=Object(r.useMemo)((function(){return{x:n[0]*c,y:n[1]*u}}),[n,c,u]),v=b.x,y=b.y,O=function(t){h.current=t.data,t.currentTarget.zIndex=4,t.stopPropagation(),e.onClick&&e.onClick(t),g.current=h.current.getLocalPosition(f.current),m.current.visible=!1,p.current.visible=!0},j=function(t){e.behindWall?t.currentTarget.zIndex=3:t.currentTarget.zIndex=1,h.current=void 0,e.onReleased&&e.onReleased(t),m.current.visible=!0,p.current.visible=!1},w=function(t){if(h.current&&f.current){var n=h.current.getLocalPosition(f.current.parent),r=new d.Point(n.x-g.current.x,n.y-g.current.y);f.current.position=r,e.onDragged&&e.onDragged(t)}},x="".concat("","/images/box1").concat(e.behindWall?"b":"",".png");return a.a.createElement(l.Container,Object.assign({},e,{x:v,y:y,ref:f,zIndex:e.behindWall?3:1,mousedown:O,touchstart:O,mouseup:j,mouseupoutside:j,mousemove:w,touchmove:w}),a.a.createElement(l.Sprite,{anchor:s?[0,-.5]:[0,.5],image:x,ref:m}),a.a.createElement(l.Sprite,{name:"ghost",anchor:s?[0,-.5]:[0,.5],alpha:.9,image:"".concat("","/images/box1.png"),ref:p,visible:!1}))},D=Object(l.PixiComponent)("SpriteAnimated",{create:function(e){var t=e.textures;return new d.AnimatedSprite(t||[],!0)},applyProps:function(e,t,n){Object(l.applyDefaultProps)(e,t,n),e.gotoAndPlay(0)}});!function(e){e.front="front",e.left="left",e.right="right",e.back="back"}(L||(L={}));var W=Object(r.forwardRef)((function(e,t){var n=e.atlas,o=e.carryBox,c=Object(u.a)(e,["atlas","carryBox"]),s=Object(r.useState)(null),f=Object(i.a)(s,2),m=f[0],p=f[1],g=Object(r.useState)(L.right),h=Object(i.a)(g,2),b=h[0],v=h[1],y=Object(l.useApp)(),O=Object(r.useRef)();if(Object(l.useTick)((function(){if(t&&t.current){var e=t.current.position,n=O.current;if(n&&!n.equals(e)){var r=Math.atan2(e.y-n.y,e.x-n.x);r>=Math.PI/-4&&r<=0||r>=0&&r<=Math.PI/4?v(L.right):r>=Math.PI/4&&r<=.75*Math.PI?v(L.front):r>.75*Math.PI||r<-.75*Math.PI?v(L.left):v(L.back)}O.current=e.clone()}})),Object(r.useEffect)((function(){y.loader.add(n).load((function(e,t){var r=t[n].data.frames,a=Object.keys(r).reduce((function(e,t){var n=t.substring(0,t.length-1);return e[n]||(e[n]=[]),e[n].push(d.Texture.from(t)),e}),{});p(a)}))}),[y.loader,n]),!m)return null;var j=m["".concat(b).concat(o?"-box":"")];return a.a.createElement(l.Container,Object.assign({ref:t,zIndex:2},c),a.a.createElement(D,{animationSpeed:.15,isPlaying:!0,textures:j,anchor:[0,.1]}))})),z=n(5);N.a.registerPIXI(d),R.a.registerPlugin(N.a);var V=function(e){return{x:e[0],y:e[1]}},F=function(e){var t=e.dispatch,n=e.pickingList,o=e.aStar,c=e.startLocation,l=e.tileSize,s=e.getProductLocation,d=Object(u.a)(e,["dispatch","pickingList","aStar","startLocation","tileSize","getProductLocation"]),f=Object(r.useRef)(null),m=Object(r.useState)(!1),p=Object(i.a)(m,2),g=p[0],h=p[1],b=Object(r.useRef)(c);return Object(r.useEffect)((function(){if(f.current&&n){R.a.killTweensOf(f.current);var e=n.orderNo,r=R.a.timeline(),a=V(b.current||c),i=n.products.find((function(e){return-1===(n.pickedProducts||[]).indexOf(e)}));if(i){console.log("We need to pick ".concat(i," (").concat(e,"). It's location is ").concat(s(i),". We start at ").concat(a.x,", ").concat(a.y,"}"));var u=(null===o||void 0===o?void 0:o.findPath(a,V(s(i))))||[];console.log("the path to walk is ",u),u.forEach((function(e){r.to(f.current,{ease:z.b.easeNone,pixi:{x:e[0]*l,y:e[1]*l},duration:1/6})})),r.to(f.current,{onComplete:function(){h(!0),t({type:"completeProductPick",productCode:i,orderNo:e}),console.log("completed picking ".concat(i," (").concat(e,")"));var n=u[u.length-1];b.current=n}})}else{console.log("I guess we are done. Time to return to ".concat(c)),((null===o||void 0===o?void 0:o.findPath(a,V(c)))||[]).forEach((function(e){r.to(f.current,{ease:z.b.easeNone,pixi:{x:e[0]*l,y:e[1]*l},duration:1/6})})),r.to(f.current,{onComplete:function(){h(!1),b.current=c,t({type:"completeOrder",orderNo:e})}})}}}),[o,t,s,c,n,l]),a.a.createElement(W,Object.assign({atlas:"".concat("","/images/sprites/guy/guy.json"),x:c[0]*l,y:c[1]*l,carryBox:g},d,{ref:f}))},H=n(27);n(33);N.a.registerPIXI(d),R.a.registerPlugin(N.a),window.PIXI=d;var X=function(e){var t=e.tilemap,n=e.width,o=e.height,c=Object(u.a)(e,["tilemap","width","height"]),f=Object(r.useContext)(B),m=f.state,g=f.dispatch,h=m.warehouse,b=Object(r.useState)(),v=Object(i.a)(b,2),O=v[0],j=v[1],w=Object(r.useState)([]),x=Object(i.a)(w,2),C=x[0],S=x[1],k=Object(r.useState)([]),E=Object(i.a)(k,2),P=E[0],M=E[1],I=Object(r.useState)([]),T=Object(i.a)(I,2),N=T[0],L=T[1],D=Object(r.useRef)(null),W="".concat("","/").concat(t);Object(r.useEffect)((function(){(new d.Loader).add(W).load((function(e){var t=e.resources[W].data;j(t)}))}),[W]);var z=W.substr(0,W.lastIndexOf("/"));Object(r.useEffect)((function(){H.a.add("bennyHill","".concat("","/sound/BennyHill.mp3"))}),[]),Object(r.useEffect)((function(){m.gameState===y.pickingBoxes&&H.a.play("bennyHill")}),[m.gameState]);var V=Object(r.useCallback)((function(e){return C.find((function(t){return t[0]===e[0]&&t[1]===e[1]}))}),[C]),X=Object(r.useCallback)((function(e){return P.find((function(t){return t[0]===e[0]&&t[1]===e[1]}))}),[P]),q=function(e){return m.warehouse.boxes[e].location},J=Object(r.useCallback)((function(e){return(null===O||void 0===O?void 0:O.tilewidth)&&O.tileheight?[Math.floor(e.x/(null===O||void 0===O?void 0:O.tilewidth)),Math.floor(e.y/(null===O||void 0===O?void 0:O.tileheight))]:[0,0]}),[O]),G=function(e){var t=Object.entries(h.boxes).find((function(t){var n=Object(i.a)(t,2),r=(n[0],n[1]);return r.location[0]===e[0]&&r.location[1]===e[1]}));if(t)return t[0]},$=Object(r.useCallback)((function(e){return N.some((function(t){return t[0]===e[0]&&t[1]===e[1]}))}),[N]),Q=Object(r.useMemo)((function(){if(!O||!N.length)return null;for(var e=[],t=0;t<O.height;t++){for(var n=[],r=0;r<O.width;r++){var a=$([r,t]);n.push(a?1:0)}e.push(n)}return new s.AStarFinder({grid:{matrix:e},diagonalAllowed:!1,includeStartNode:!1,heuristic:"Manhatten",weight:0})}),[O,$,N]);return a.a.createElement(l.Stage,{width:n,height:o},a.a.createElement(l.Container,Object.assign({ref:D,interactive:!0,hitArea:new d.RoundedRectangle(0,0,n,o,0),sortableChildren:!0},c),O&&a.a.createElement(a.a.Fragment,null,a.a.createElement(p,{basePath:z,data:O,setRackLocations:S,setDockLocations:M,setWallLocations:L}),O&&N.length?Object.entries(h.boxes).map((function(t){var n=Object(i.a)(t,2),r=n[0],o=n[1];return a.a.createElement(A,{location:o.location,tileWidth:O.tilewidth,tileHeight:O.tileheight,onClick:function(t){return n=r,void e.onProductClick(n);var n},onDragged:function(e){return function(e,t){var n=t.data.global,r=J(n),a=V(r)||X(r),o=16777215;if(a){var c=G(a);o=c&&c!==e?16724736:65328}K(t.currentTarget,o)}(r,e)},onReleased:function(e){return function(e,t){var n=t.data.global,r=J(n);K(t.currentTarget,16777215);var a=V(r),o=X(r),c=a||o;if(c){var i=G(c);if(!i||i===e)return void g({type:"placeBox",productCode:e,location:c,inRack:!!a})}var u=h.boxes[e],l=u.location[0]*O.tilewidth,s=u.location[1]*O.tileheight;R.a.to(t.currentTarget,{duration:.5,ease:"bounce.out",pixi:{x:l,y:s}})}(r,e)},key:r,behindWall:U(o.location,N),interactive:m.gameState===y.placingBoxes})})):null,function(){var e=m.pickingLists.find((function(e){return!e.complete}));return e&&Q?a.a.createElement(F,{pickingList:e,startLocation:[10,12],tileSize:O.tilewidth,getProductLocation:q,dispatch:g,aStar:Q,visible:m.gameState===y.pickingBoxes}):null}())))},K=function(e,t){var n=e.children.find((function(e){return"ghost"===e.name}));n&&(n.tint=t)},U=function(e,t){return t.some((function(t){return t[0]===e[0]&&t[1]===e[1]+1}))},q=(n(60),function(e){var t=Object(r.useRef)(null),n=Object(r.useContext)(B).state.wms;Object(r.useEffect)((function(){if(t.current){var n=t.current,r=n.querySelector('tr[data-code="'.concat(e.selectedProduct,'"]'));return null===r||void 0===r||r.classList.add("highlight"),null===r||void 0===r||r.scrollIntoView({block:"end"}),function(){var e;null===(e=n.querySelector(".highlight"))||void 0===e||e.classList.remove("highlight")}}}),[e.selectedProduct]);var o=function(e){return a.a.createElement("tr",{key:e.productCode,"data-code":e.productCode},a.a.createElement("td",null,e.productCode),a.a.createElement("td",null,e.description),a.a.createElement("td",null,e.slotting||""))};return a.a.createElement(a.a.Fragment,null,a.a.createElement("h2",null,"SKU velocity profile"),a.a.createElement("table",{ref:t},a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",{colSpan:3,className:"category-header-a"},"A. Fast-moving")),n.filter((function(e){return e.category===f.A})).map((function(e){return o(e)})),a.a.createElement("tr",null,a.a.createElement("td",{colSpan:3,className:"category-header-b"},"B. Medium-moving")),n.filter((function(e){return e.category===f.B})).map((function(e){return o(e)})),a.a.createElement("tr",null,a.a.createElement("td",{colSpan:3,className:"category-header-c"},"C. Slow-moving")),n.filter((function(e){return e.category===f.C})).map((function(e){return o(e)})),a.a.createElement("tr",null,a.a.createElement("td",{colSpan:3,className:"category-header-d"},"D. Not-moving")),n.filter((function(e){return e.category===f.D})).map((function(e){return o(e)})))))}),J=function(){var e=Object(r.useContext)(B).state,t=e.pickingLists,n=e.wms.reduce((function(e,t){return e[t.productCode]||(e[t.productCode]=t.description),e}),{}),o=function(e){return a.a.createElement("table",null,a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",{colSpan:3},"Order no: ",e.orderNo)),e.products.map((function(t){return c(e,t)}))))},c=function(e,t){var r,o=null===(r=e.pickedProducts)||void 0===r?void 0:r.some((function(e){return e===t}));return a.a.createElement("tr",{key:t,className:o?"completed":""},a.a.createElement("td",null),a.a.createElement("td",null,t),a.a.createElement("td",null,n[t]))};return a.a.createElement(a.a.Fragment,null,a.a.createElement("h2",null,"Picking lists"),t.map((function(e){return a.a.createElement("div",{key:e.orderNo},o(e))})))},G=function(e){var t=Object(r.useContext)(B).state.gameState;return a.a.createElement("div",{className:"ipad"},a.a.createElement("div",{className:"content"},function(){switch(t){case y.placingBoxes:return a.a.createElement(q,{selectedProduct:e.selectedProduct});case y.pickingBoxes:return a.a.createElement(J,null)}}()))},$=(n(61),function(){var e=Object(r.useContext)(B),t=e.state,n=e.dispatch;t.gameState;return a.a.createElement("button",{onClick:function(){Object.values(t.warehouse.boxes).some((function(e){return!e.inRack}))?n({type:"setStatusText",text:"First place all goods in the warehouse!"}):n({type:"startPicking"})},className:"start-button"},a.a.createElement("h1",null,"Start"))}),Q=(n(62),function(){var e=Object(r.useContext)(B).state,t=e.statusText,n=Object(r.useState)(0),o=Object(i.a)(n,2),c=o[0],u=o[1];return Object(r.useEffect)((function(){var t,n=performance.now();if(e.gameState===y.pickingBoxes){t=setInterval((function(){u((function(e){return e+(performance.now()-n)}))}),100)}return function(){clearTimeout(t)}}),[e.gameState,c]),e.gameState===y.pickingBoxes?a.a.createElement("div",{className:"status"},a.a.createElement("div",{className:"timer"},Y(c))):a.a.createElement("div",{className:"status"},t)}),Y=function(e){var t=e/1e3,n=Math.floor(t/3600);t%=3600;var r=Math.floor(t/60);return t%=60,n>0?"".concat(n,":").concat(r,":").concat(t.toFixed(1)):r>0?"".concat(r,":").concat(t.toFixed(1)):"".concat(t.toFixed(1))};window.PIXI=d;var Z=function(){var e=Object(r.useState)(),t=Object(i.a)(e,2),n=t[0],o=t[1];return a.a.createElement(T,null,a.a.createElement("div",{className:"App"},a.a.createElement(X,{tilemap:"scenes/level1.json",width:672,height:416,onProductClick:o}),a.a.createElement(G,{selectedProduct:n}),a.a.createElement($,null),a.a.createElement(Q,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,1,2]]]);
//# sourceMappingURL=main.be743733.chunk.js.map