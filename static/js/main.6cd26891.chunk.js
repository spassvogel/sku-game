(this["webpackJsonpsku-game"]=this["webpackJsonpsku-game"]||[]).push([[0],{38:function(e,t,n){e.exports=n(65)},43:function(e,t,n){},44:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){},64:function(e,t,n){},65:function(e,t,n){"use strict";n.r(t);var a,r,c,o=n(1),i=n.n(o),u=n(34),l=n.n(u),s=(n(43),n(10)),d=(n(44),n(19)),m=n(11),f=n(36);!function(e){e.tilelayer="tilelayer",e.objectgroup="objectgroup"}(a||(a={})),function(e){e.orthagonal="orthagonal",e.isometric="isometric",e.staggered="staggered",e.hexagonal="hexagonal"}(r||(r={})),function(e){e.rightUp="right-up",e.rightDown="right-down",e.leftUp="left-up",e.leftDown="left-down"}(c||(c={}));var p=n(7);window.PIXI=p;var g,h=Object(m.PixiComponent)("RectTileLayer",{create:function(e){return n(33),new window.PIXI.tilemap.CompositeRectTileLayer(0,[e.texture])},applyProps:function(e,t,n){var a=n.layer,r=n.tileset,c=n.horizontalTiles,o=n.spritesheet;if(a.data)for(var i=0;i<a.data.length;i++){var u=r.tilewidth,l=r.tileheight,s=i%c*u,d=Math.floor(i/c)*l;if(a.data[i]>0){var m="".concat(r.name,"-").concat(a.data[i]);e.addFrame(o.textures[m],s,d)}}}}),b=function(e){var t=e.basePath,n=e.data,r=e.setObjects,c=e.setWallLocations,u=Object(o.useState)(),l=Object(s.a)(u,2),d=l[0],f=l[1],g=Object(o.useState)(),h=Object(s.a)(g,2),b=h[0];h[1];return Object(o.useEffect)((function(){var e=j(n),o=v(n),i=p.Texture.from("".concat(t,"/").concat(o.image)),u=p.BaseTexture.from("".concat(t,"/").concat(o.image)),l=new p.Spritesheet(u,e),s=[];l.parse((function(){var e=n.layers.filter((function(e){return e.visible})).map((function(e){return e.properties&&e.properties.some((function(e){return"wall"===e.name&&!0===e.value}))&&O(s,e,e.width),y(e,i,n.width,o,l)})),t=n.layers.find((function(e){return e.type===a.objectgroup}));if(t){var u=t.objects.reduce((function(e,t){var a=t.x,r=t.y,c=[a/n.tilewidth,r/n.tileheight-1];return e["".concat(c[0],",").concat(c[1])]=t,e}),{});r(u)}c(s),f(e)}))}),[t,n,r,c]),i.a.createElement(m.Container,null,d,b)},v=function(e){if(!e.tilesets.length)throw new Error("No tilesets found! Can't continue");if(e.tilesets.length>1&&console.warn("Found more than one tileset. But we currently only support one."),e.tilesets[0].source)throw new Error("Please embed tilemaps in Tiled! Can't continue");return e.tilesets[0]},y=function(e,t,n,a,r){return i.a.createElement(h,{key:e.name,texture:t,layer:e,horizontalTiles:n,tileset:a,spritesheet:r})},j=function(e){for(var t=v(e),n=t.columns,a={},r=0;r<t.tilecount;r++){var c=t.tilewidth,o=t.tileheight,i=r%n*c,u=Math.floor(r/n)*o;a["".concat(t.name,"-").concat(r+1)]={frame:{x:i,y:u,w:c,h:o},spriteSourceSize:{x:i,y:u,w:c,h:o},rotated:!1,trimmed:!1,sourceSize:{w:c,h:o}}}return{frames:a,meta:{image:t.image,size:{w:t.imagewidth,h:t.imageheight},scale:1}}},O=function(e,t,n){t.data.reduce((function(e,t,a){if(t>0){var r=a%n,c=Math.floor(a/n);e.push([r,c])}return e}),e)};!function(e){e.A="A",e.B="B",e.C="C",e.D="D"}(g||(g={}));var x,w=[{category:g.A,productCode:"IRN 590",description:"Clothes iron"},{category:g.A,productCode:"CAM 679",description:"Digital camera"},{category:g.A,productCode:"SMK 019",description:"Smoke detector",pair:"BAT 917"},{category:g.A,productCode:"BAT 917",description:"Battery charger",pair:"SMK 019"},{category:g.B,productCode:"VRL 444",description:"VR headset"},{category:g.B,productCode:"PTV 555",description:"Plasma TV",pair:"SPK 876"},{category:g.B,productCode:"SPK 876",description:"Speaker system",pair:"PTV 555"},{category:g.C,productCode:"WSH 322",description:"Washing machine"},{category:g.C,productCode:"RFG 411",description:"Refrigerator"},{category:g.C,productCode:"SMX 041",description:"Stand mixer"},{category:g.D,productCode:"TPH 255",description:"Telephone"},{category:g.D,productCode:"CST 964",description:"Cassette player"}],E=n(37),S=n(14),k=function(e,t){switch(t.type){case"startPicking":return e.map((function(e){return e.orderNo===t.orderNo?Object(S.a)(Object(S.a)({},e),{},{guy:t.guy}):e}));case"completeProductPick":return e.map((function(e){return e.orderNo===t.orderNo?Object(S.a)(Object(S.a)({},e),{},{pickedProducts:[].concat(Object(E.a)(e.pickedProducts||[]),[t.productCode])}):e}));case"completeOrder":return e.map((function(e){return e.orderNo===t.orderNo?Object(S.a)(Object(S.a)({},e),{},{complete:!0}):e}));case"restart":return e.map((function(e){return Object(S.a)(Object(S.a)({},e),{},{guy:void 0,complete:!1,pickedProducts:[]})}));default:return e}},C=n(24),P={boxes:function(){var e=w.map((function(e){return e.productCode}));return e.sort((function(){return.5-Math.random()})),e.reduce((function(e,t,n){return e[t]={location:[8+n,1]},e}),{})}()},B=function(e,t){switch(t.type){case"placeBox":var n=t.location,a=t.zone,r=Object(S.a)(Object(S.a)({},e.boxes),{},Object(C.a)({},t.productCode,Object(S.a)(Object(S.a)({},e.boxes[t.productCode]),{},{location:n,zone:a})));return Object(S.a)(Object(S.a)({},e),{},{boxes:r});case"restart":return P;default:return e}};!function(e){e[e.placingBoxes=0]="placingBoxes",e[e.pickingBoxes=1]="pickingBoxes",e[e.complete=2]="complete"}(x||(x={}));var N=function(e,t){switch(t.type){case"startPicking":return x.pickingBoxes;case"completeGame":return x.complete;case"restart":return x.placingBoxes;default:return e}},M={statusText:"",gameState:x.placingBoxes,wms:w,pickingLists:[["IRN 590","CAM 679"],["CAM 679","VRL 444","IRN 590"],["RFG 411","IRN 590","CAM 679"],["VRL 444","SMK 019","BAT 917","SPK 876","PTV 555"],["SMX 041","PTV 555","SPK 876","CAM 679"],["BAT 917","SMK 019","IRN 590","WSH 322"]].map((function(e){return{orderNo:Math.random().toString().slice(2,9),products:e}})),warehouse:P,muted:"true"===localStorage.getItem("muted"),time:0},T=function(e,t){switch(t.type){case"setStatusText":return t.text;default:return e}},I=function(e,t){switch(t.type){case"setMuted":return localStorage.setItem("muted",t.value?"true":"false"),t.value;default:return e}},L=function(e,t){switch(t.type){case"tick":return performance.now()-t.start;default:return e}},R=Object(o.createContext)({state:M,dispatch:function(){return null}}),A=function(e,t){return{gameState:N(e.gameState,t),statusText:T(e.statusText,t),wms:e.wms,pickingLists:k(e.pickingLists,t),warehouse:B(e.warehouse,t),muted:I(e.muted,t),time:L(e.time,t)}},z=function(e){var t=e.children,n=Object(o.useReducer)(A,M),a=Object(s.a)(n,2),r=a[0],c=a[1];return i.a.createElement(R.Provider,{value:{state:r,dispatch:c}},t)},F=n(66),D=n(16);F.a.registerPIXI(p),D.a.registerPlugin(F.a);var W,V=function(e){var t=e.location,n=void 0===t?[0,0]:t,a=e.tileWidth,r=void 0===a?0:a,c=e.tileHeight,u=void 0===c?0:c,l=e.behindWall,s=e.selected,d=Object(o.useRef)(null),f=Object(o.useRef)(null),g=Object(o.useRef)(null),h=Object(o.useRef)(),b=Object(o.useRef)(),v=Object(o.useMemo)((function(){return{x:n[0]*r,y:n[1]*u}}),[n,r,u]),y=v.x,j=v.y,O=function(t){b.current=t.data,t.currentTarget.zIndex=6,t.stopPropagation(),e.onClick&&e.onClick(t),h.current=b.current.getLocalPosition(d.current),f.current.visible=!1,g.current.visible=!0},x=function(t){e.behindWall?t.currentTarget.zIndex=3:t.currentTarget.zIndex=1,b.current=void 0,e.onReleased&&e.onReleased(t),f.current.visible=!0,g.current.visible=!1},w=function(t){if(b.current&&d.current){var n=b.current.getLocalPosition(d.current.parent),a=new p.Point(n.x-h.current.x,n.y-h.current.y);d.current.position=a,e.onDragged&&e.onDragged(t)}},E="".concat("/sku-game","/images/box1").concat(e.behindWall?"b":"",".png");return i.a.createElement(m.Container,Object.assign({},e,{x:y,y:j,ref:d,zIndex:e.behindWall?3:1,mousedown:O,touchstart:O,mouseup:x,mouseupoutside:x,mousemove:w,touchmove:w}),s&&i.a.createElement(m.Graphics,{draw:function(e){e.clear(),e.lineStyle(2,16763904),l?e.drawRect(2,u/2-1,r-4,u/2+2):e.drawRect(2,-u/2-1,r-4,u+2),e.endFill()}}),i.a.createElement(m.Sprite,{anchor:l?[0,-.5]:[0,.5],image:E,ref:f}),i.a.createElement(m.Sprite,{name:"ghost",anchor:l?[0,-.5]:[0,.5],alpha:.9,image:"".concat("/sku-game","/images/box1.png"),ref:g,visible:!1}))},H=Object(m.PixiComponent)("SpriteAnimated",{create:function(e){var t=e.textures;return new p.AnimatedSprite(t||[],!0)},applyProps:function(e,t,n){Object(m.applyDefaultProps)(e,t,n),e.gotoAndPlay(0)}});!function(e){e.front="front",e.left="left",e.right="right",e.back="back"}(W||(W={}));var K=Object(o.forwardRef)((function(e,t){var n=e.atlas,a=e.carryBox,r=Object(d.a)(e,["atlas","carryBox"]),c=Object(o.useState)(null),u=Object(s.a)(c,2),l=u[0],f=u[1],g=Object(o.useState)(W.right),h=Object(s.a)(g,2),b=h[0],v=h[1],y=Object(m.useApp)(),j=Object(o.useRef)();if(Object(m.useTick)((function(){if(t&&t.current){var e=t.current.position,n=j.current;if(n&&!n.equals(e)){var a=Math.atan2(e.y-n.y,e.x-n.x);a>=Math.PI/-4&&a<=0||a>=0&&a<=Math.PI/4?v(W.right):a>=Math.PI/4&&a<=.75*Math.PI?v(W.front):a>.75*Math.PI||a<-.75*Math.PI?v(W.left):v(W.back)}j.current=e.clone()}})),Object(o.useEffect)((function(){y.loader.onComplete.once((function(){var e=y.loader.resources[n].data.frames,t=Object.keys(e).reduce((function(e,t){var n=t.substring(0,t.length-1);return e[n]||(e[n]=[]),e[n].push(p.Texture.from(t)),e}),{});f(t)})),y.loader.loading||y.loader.add(n).load()}),[y.loader,y.loader.loading,n,e.name]),!l)return null;var O=l["".concat(b).concat(a?"-box":"")];return i.a.createElement(m.Container,Object.assign({ref:t,zIndex:2},r),i.a.createElement(H,{animationSpeed:.15,isPlaying:!0,textures:O,anchor:[0,.1]}),!1)})),X=Object(o.memo)(K),G=n(5);F.a.registerPIXI(p),D.a.registerPlugin(F.a);var q=function(e){return{x:e[0],y:e[1]}},U=Object(o.memo)((function(e){var t=e.dispatch,n=e.pickingList,a=e.aStar,r=e.homeLocation,c=e.tileSize,u=e.getProductLocation,l=Object(d.a)(e,["dispatch","pickingList","aStar","homeLocation","tileSize","getProductLocation"]),m=Object(o.useRef)(null),f=Object(o.useState)(!1),p=Object(s.a)(f,2),g=p[0],h=p[1],b=Object(o.useRef)(r),v=Object(o.useRef)();return Object(o.useEffect)((function(){if(m.current&&n){var e=n.orderNo,o=n.products.find((function(e){return!(n.pickedProducts||[]).includes(e)})),i=o||"home";if(!v.current||v.current!==i){v.current=o||i,D.a.killTweensOf(m.current);var l=D.a.timeline(),s=q(b.current||r);if(o){var d=u(o),f=d.location,p=d.far,g=(null===a||void 0===a?void 0:a.findPath(s,q(f)))||[];g.forEach((function(e){l.to(m.current,{ease:G.b.easeNone,pixi:{x:e[0]*c,y:e[1]*c},duration:.2+(p?.035:0)})})),l.to(m.current,{delay:p?.2:0,onComplete:function(){h(!0),t({type:"completeProductPick",productCode:o,orderNo:e});var n=g[g.length-1];b.current=n}})}else{((null===a||void 0===a?void 0:a.findPath(s,q(r)))||[]).forEach((function(e){l.to(m.current,{ease:G.b.easeNone,pixi:{x:e[0]*c,y:e[1]*c},duration:.2})})),l.to(m.current,{onComplete:function(){h(!1),b.current=r,t({type:"completeOrder",orderNo:e})}})}}}}),[a,t,u,r,n,c,e.name]),i.a.createElement(X,Object.assign({atlas:"".concat("/sku-game","/images/sprites/guy/guy.json"),x:r[0]*c,y:r[1]*c,carryBox:g},l,{ref:m}))})),J=n(17);n(33);F.a.registerPIXI(p),D.a.registerPlugin(F.a),window.PIXI=p;var Y=function(e){var t=e.tilemap,n=e.width,a=e.height,r=Object(d.a)(e,["tilemap","width","height"]),c=Object(o.useContext)(R),u=c.state,l=c.dispatch,g=u.warehouse,h=Object(o.useState)(),v=Object(s.a)(h,2),y=v[0],j=v[1],O=Object(o.useState)(),w=Object(s.a)(O,2),E=w[0],S=w[1],k=Object(o.useState)([]),C=Object(s.a)(k,2),P=C[0],B=C[1],N=Object(o.useState)(),M=Object(s.a)(N,2),T=M[0],I=M[1],L=Object(o.useRef)(null),A="".concat("/sku-game","/").concat(t);Object(o.useEffect)((function(){(new p.Loader).add(A).load((function(e){var t=e.resources[A].data;j(t)}))}),[A]);var z=A.substr(0,A.lastIndexOf("/"));Object(o.useEffect)((function(){J.a.add("snap","".concat("/sku-game","/sound/snap.wav")),J.a.add("whoosh","".concat("/sku-game","/sound/whoosh.mp3")),J.a.add("bennyHill","".concat("/sku-game","/sound/BennyHill.mp3"))}),[]),Object(o.useEffect)((function(){u.gameState!==x.pickingBoxes||u.muted?J.a.stop("bennyHill"):J.a.play("bennyHill")}),[u.gameState,u.muted]);var F=Object(o.useCallback)((function(e){return null===E||void 0===E?void 0:E["".concat(e[0],",").concat(e[1])]}),[E]),W=(Object(o.useCallback)((function(e){var t,n=F(e);if(null===n||void 0===n||null===(t=n.properties)||void 0===t?void 0:t.some((function(e){return"rack"===e.name&&e.value})))return n}),[F]),Object(o.useCallback)((function(e){var t,n=F(e);if(null===n||void 0===n||null===(t=n.properties)||void 0===t?void 0:t.some((function(e){return"dock"===e.name&&e.value})))return n}),[F]),function(e){return{location:u.warehouse.boxes[e].location,far:!1}}),H=Object(o.useCallback)((function(e){return(null===y||void 0===y?void 0:y.tilewidth)&&y.tileheight?[Math.floor(e.x/(null===y||void 0===y?void 0:y.tilewidth)),Math.floor(e.y/(null===y||void 0===y?void 0:y.tileheight))]:[0,0]}),[y]),K=function(e){var t=Object.entries(g.boxes).find((function(t){var n=Object(s.a)(t,2),a=(n[0],n[1]);return a.location[0]===e[0]&&a.location[1]===e[1]}));if(t)return t[0]},X=Object(o.useCallback)((function(e){return P.some((function(t){return t[0]===e[0]&&t[1]===e[1]}))}),[P]),G=Object(o.useMemo)((function(){if(!y||!P.length)return null;for(var e=[],t=0;t<y.height;t++){for(var n=[],a=0;a<y.width;a++){var r=X([a,t]);n.push(r?1:0)}e.push(n)}return new f.AStarFinder({grid:{matrix:e},diagonalAllowed:!1,includeStartNode:!1,heuristic:"Manhatten",weight:0})}),[y,X,P]),q=Object(o.useState)(),Y=Object(s.a)(q,2),Z=Y[0],_=Y[1],ee=Object(o.useState)(),te=Object(s.a)(ee,2),ne=te[0],ae=te[1],re=Object(o.useState)(),ce=Object(s.a)(re,2),oe=ce[0],ie=ce[1];Object(o.useEffect)((function(){if(u.gameState===x.pickingBoxes){I(void 0);var e=u.pickingLists.find((function(e,t){return!e.complete&&t%3===0}));_(e);var t=u.pickingLists.find((function(e,t){return!e.complete&&t%3===1}));ae(t);var n=u.pickingLists.find((function(e,t){return!e.complete&&t%3===2}));ie(n),e||t||n||l({type:"completeGame"})}}),[l,u.gameState,u.pickingLists]);return i.a.createElement(m.Stage,{width:n,height:a},i.a.createElement(m.Container,Object.assign({ref:L,interactive:!0,hitArea:new p.RoundedRectangle(0,0,n,a,0),sortableChildren:!0},r),y&&i.a.createElement(i.a.Fragment,null,i.a.createElement(b,{basePath:z,data:y,setObjects:S,setWallLocations:B}),i.a.createElement(i.a.Fragment,null,i.a.createElement(m.Sprite,{x:127,y:383,image:"".concat("/sku-game","/images/sprites/floor/inbound.png")}),i.a.createElement(m.Sprite,{x:544,y:383,image:"".concat("/sku-game","/images/sprites/floor/outbound.png")})),y&&P.length?Object.entries(g.boxes).map((function(t){var n=Object(s.a)(t,2),a=n[0],r=n[1];return i.a.createElement(V,{location:r.location,tileWidth:y.tilewidth,tileHeight:y.tileheight,selected:a===T,onClick:function(t){return n=a,e.onProductClick(n),void I(n);var n},onDragged:function(e){return function(e,t){var n=t.data.global,a=H(n),r=F(a),c=16777215;if("rack"===(null===r||void 0===r?void 0:r.type)){var o=K(a);c=o&&o!==e?16724736:65328}$(t.currentTarget,c)}(a,e)},onReleased:function(e){return function(e,t){var n=t.data.global,a=H(n);$(t.currentTarget,16777215);var r=F(a);if(r){var c=K(a);if(!c||c===e){var o,i;c===e||u.muted||J.a.play("snap");var s=null===r||void 0===r||null===(o=r.properties)||void 0===o||null===(i=o.find((function(e){return"zone"===e.name})))||void 0===i?void 0:i.value;return void l({type:"placeBox",productCode:e,location:a,zone:s})}}var d=g.boxes[e],m=d.location[0]*y.tilewidth,f=d.location[1]*y.tileheight;u.muted||J.a.play("whoosh"),D.a.to(t.currentTarget,{duration:.5,ease:"bounce.out",pixi:{x:m,y:f}})}(a,e)},key:a,behindWall:Q(r.location,P),interactive:u.gameState===x.placingBoxes})})):null,G?i.a.createElement(i.a.Fragment,null,i.a.createElement(U,{name:"guy1",pickingList:Z,homeLocation:[17,12],tileSize:y.tilewidth,getProductLocation:W,dispatch:l,aStar:G,visible:u.gameState===x.pickingBoxes}),i.a.createElement(U,{name:"guy2",pickingList:ne,homeLocation:[18,12],tileSize:y.tilewidth,getProductLocation:W,dispatch:l,aStar:G,visible:u.gameState===x.pickingBoxes}),i.a.createElement(U,{name:"guy3",pickingList:oe,homeLocation:[19,12],tileSize:y.tilewidth,getProductLocation:W,dispatch:l,aStar:G,visible:u.gameState===x.pickingBoxes})):null)))},$=function(e,t){var n=e.children.find((function(e){return"ghost"===e.name}));n&&(n.tint=t)},Q=function(e,t){return t.some((function(t){return t[0]===e[0]&&t[1]===e[1]+1}))},Z=(n(60),function(e){var t=Object(o.useRef)(null),n=Object(o.useContext)(R).state.wms;Object(o.useEffect)((function(){if(t.current){var n=t.current;return n.querySelectorAll('tr[data-code="'.concat(e.selectedProduct,'"]')).forEach((function(e){e.classList.add("highlight"),e.scrollIntoView({block:"end"})})),function(){n.querySelectorAll(".highlight").forEach((function(e){e.classList.remove("highlight")}))}}}),[e.selectedProduct]);var a=function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement("tr",{key:e.productCode,"data-code":e.productCode},i.a.createElement("td",null,e.productCode),i.a.createElement("td",null,e.description)),e.pair&&i.a.createElement("tr",{key:"".concat(e.productCode,"-pair"),"data-code":e.productCode},i.a.createElement("td",{colSpan:2,className:"pair"}," Frequently sold with ".concat(e.pair))))};return i.a.createElement(i.a.Fragment,null,i.a.createElement("h2",null,"SKU velocity profile"),i.a.createElement("table",{ref:t},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{colSpan:2,className:"category-header-a"},"A. Fast-moving")),n.filter((function(e){return e.category===g.A})).map((function(e){return a(e)})),i.a.createElement("tr",null,i.a.createElement("td",{colSpan:2,className:"category-header-b"},"B. Medium-moving")),n.filter((function(e){return e.category===g.B})).map((function(e){return a(e)})),i.a.createElement("tr",null,i.a.createElement("td",{colSpan:2,className:"category-header-c"},"C. Slow-moving")),n.filter((function(e){return e.category===g.C})).map((function(e){return a(e)})),i.a.createElement("tr",null,i.a.createElement("td",{colSpan:2,className:"category-header-d"},"D. Not-moving")),n.filter((function(e){return e.category===g.D})).map((function(e){return a(e)})))))}),_=function(){var e=Object(o.useContext)(R).state,t=e.pickingLists,n=e.wms.reduce((function(e,t){return e[t.productCode]||(e[t.productCode]=t.description),e}),{}),a=function(e){return i.a.createElement("table",null,i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{colSpan:3},"Order no: ",e.orderNo)),e.products.map((function(t){return r(e,t)}))))},r=function(e,t){var a,r=null===(a=e.pickedProducts)||void 0===a?void 0:a.some((function(e){return e===t}));return i.a.createElement("tr",{key:t,className:r?"completed":""},i.a.createElement("td",null),i.a.createElement("td",null,t),i.a.createElement("td",null,n[t]))};return i.a.createElement(i.a.Fragment,null,i.a.createElement("h2",null,"Picking lists"),t.map((function(e){return i.a.createElement("div",{key:e.orderNo},a(e))})))},ee=function(e){var t=Object(o.useContext)(R).state.gameState;return i.a.createElement("div",{className:"ipad"},i.a.createElement("div",{className:"content"},function(){switch(t){case x.placingBoxes:return i.a.createElement(Z,{selectedProduct:e.selectedProduct});case x.pickingBoxes:case x.complete:return i.a.createElement(_,null)}}()))},te=(n(61),function(){var e=Object(o.useContext)(R),t=e.state,n=e.dispatch;switch(t.gameState){case x.placingBoxes:return i.a.createElement("button",{onClick:function(){switch(t.gameState){case x.placingBoxes:if(!!Object.values(t.warehouse.boxes).some((function(e){return!e.zone})))return void n({type:"setStatusText",text:"First place all goods in the warehouse!"});n({type:"startPicking"});break;case x.complete:location.reload()}},className:"start-button"},i.a.createElement("h1",null,"Start"));default:return null}}),ne=(n(62),function(){var e=Object(o.useContext)(R),t=e.state,n=e.dispatch,a=t.statusText,r=t.time;if(Object(o.useEffect)((function(){var e,a=performance.now();if(t.gameState===x.pickingBoxes){e=setInterval((function(){n({type:"tick",start:a})}),100)}return function(){clearTimeout(e)}}),[n,t.gameState]),t.gameState===x.pickingBoxes){var c=Math.min(r/45e3,1),u=r>3e4?"#f63a0f":"#86e01e";return i.a.createElement("div",{className:"status"},i.a.createElement("div",{className:"progress"},i.a.createElement("div",{className:"progress-bar",style:{width:"".concat(100*c,"%"),backgroundColor:u}}),i.a.createElement("div",{className:"text"},ae(r))))}return i.a.createElement("div",{className:"status"},a)}),ae=function(e){var t=e/1e3,n=Math.floor(t/3600);t%=3600;var a=Math.floor(t/60);return t%=60,n>0?"".concat(re(n),":").concat(re(a),":").concat(t.toFixed(1).padStart(4,"0")):"".concat(re(a),":").concat(t.toFixed(1).padStart(4,"0"))},re=function(e){return"".concat(e).padStart(2,"0")},ce=(n(63),function(){var e=Object(o.useContext)(R),t=e.state,n=e.dispatch;return i.a.createElement("div",{className:"settings"},i.a.createElement("input",{type:"checkbox",onChange:function(e){n({type:"setMuted",value:!e.target.checked})},checked:!1===t.muted}),i.a.createElement("label",null,"Sound on"))}),oe=(n(64),Object(o.memo)((function(){var e=Object(o.useContext)(R),t=e.state,n=e.dispatch,a=Object(o.useState)(!1),r=Object(s.a)(a,2),c=r[0],u=r[1];Object(o.useEffect)((function(){t.gameState===x.pickingBoxes&&setTimeout(u,700,!0)}),[t.gameState]);var l=0,d=Object(o.useMemo)((function(){return t.wms.filter((function(e){return e.pair})).reduce((function(e,t){var n=e.find((function(e){return e.indexOf(t.pair)>-1}));return n?n[1]=t.productCode:e.push([t.productCode,""]),e}),[])}),[t.wms]);if(!c)return null;var m=function(e,n){var a=0,r=0;t.wms.forEach((function(e){e.category===n&&(r++,t.warehouse.boxes[e.productCode].zone===n.toString()&&a++)}));var c=1*a;return l+=c,i.a.createElement("li",null,"".concat(e," products placed correct = ").concat(c,"/").concat(1*r," points"))};return i.a.createElement("div",{className:"gameover-screen"},i.a.createElement("div",{className:"text"},i.a.createElement("h1",null,"Complete!"),i.a.createElement("ul",null,d.map((function(e){return function(e){var n=t.warehouse.boxes[e[0]].location,a=t.warehouse.boxes[e[1]].location,r=0;return 1===Math.abs(n[0]-a[0])&&n[1]===a[1]?(l+=r=3,i.a.createElement("li",null,"Product pair (".concat(e,") placed near to each other = ").concat(r,"/3 points"))):i.a.createElement("li",null,"Product pair (".concat(e,") not placed near to each other = ").concat(r,"/3 points"))}(e)})),m("Fast moving",g.A),m("Medium moving",g.B),m("Slow moving",g.C),function(){var e=0;return t.wms.filter((function(e){return e.category===g.D})).forEach((function(n){t.warehouse.boxes[n.productCode].zone!==g.D.toString()&&(e-=5)})),t.wms.filter((function(e){return e.category!==g.D})).forEach((function(n){t.warehouse.boxes[n.productCode].zone===g.D.toString()&&(e-=5)})),l+=e,i.a.createElement("li",null,"(only) non moving products placed in bin = ".concat(e,"/0 points"))}()),"Your time: ",ae(t.time),i.a.createElement("div",null,"Total score: ".concat(l,"/").concat(16)),i.a.createElement("div",{className:"button"},i.a.createElement("button",{onClick:function(){u(!1),n({type:"restart"})}},"Try again?"))))})));window.PIXI=p;var ie=function(){var e=Object(o.useState)(),t=Object(s.a)(e,2),n=t[0],a=t[1];return i.a.createElement(z,null,i.a.createElement("div",{className:"App"},i.a.createElement(ce,null),i.a.createElement(Y,{tilemap:"scenes/level2.json",width:672,height:416,onProductClick:a}),i.a.createElement(ee,{selectedProduct:n}),i.a.createElement(te,null),i.a.createElement(ne,null),i.a.createElement(oe,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(ie,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,1,2]]]);
//# sourceMappingURL=main.6cd26891.chunk.js.map