window.menuOpen=false;window.preventMenuExpansion=false;document.addEventListener('DOMContentLoaded',()=>{const{initFoldSequence,initTextMask,initCarousel,initMarquee,initFixedPattern}=window.graphics;const siteMenu=$('.site-menu');const toggleMenu=$('.toggle-menu');if($('#fold'))
initHeaderBackground($('#fold'));const scroll=window.siteScroll=window.components.ScrollControl({pages:[...$all('.view-context, section article')]});window.setActiveMenuItem=function(pageId){const link=$(`[href='#${pageId}']`,siteMenu);if(link){$all('a[href]',siteMenu).forEach(l=>l.classList.remove('active'));link.classList.add('active');siteMenu.classList.remove('visible');document.body.style.overflow='inherit';}}
window.addEventListener('keyup',ev=>{let ret=true;switch(ev.keyCode){case 27:if(window.menuOpen)toggleMenu.click();break;case 38:scroll.previous();ret=false;break;case 40:scroll.next();ret=false;break;}
return ret;})
toggleMenu.addEventListener('click',ev=>{ev.preventDefault();siteMenu.classList.toggle('visible');if(siteMenu.classList.contains('visible')){window.menuOpen=true;setLogoColor('#FCC200','#FFFFFF');document.body.style.overflowY='hidden';setTimeout(()=>{siteMenu.querySelectorAll('li').forEach((item,i)=>{setTimeout(()=>{item.classList.add('visible');},100*i)});},400);}else{window.menuOpen=false;document.body.style.overflowY='inherit';siteMenu.querySelectorAll('li').forEach((item,i)=>{item.classList.remove('visible');});setLogoColor();}});$all('.page-nav').forEach(nav=>{const prev=nav.querySelector('li:first-child');const next=nav.querySelector('li:last-child');let timeout=null;if(next){next.addEventListener('mouseenter',()=>{if(timeout)clearTimeout(timeout);nav.classList.add('page-nav__hover-next');});prev.addEventListener('mouseenter',()=>{if(timeout)clearTimeout(timeout);nav.classList.add('page-nav__hover-prev');})
nav.addEventListener('mouseleave',()=>{nav.classList.remove('page-nav__hover-prev');nav.classList.remove('page-nav__hover-next');toggleClassDelay(nav,'transition-out',300);});}
$all('a',nav).forEach(a=>{a.addEventListener('click',ev=>{if(window.preventMenuExpansion==false){window.preventMenuExpansion=true;$('.site-nav').classList.remove('visible');setTimeout(()=>window.preventMenuExpansion=false,1000);}});});});$all('.background-graphic.fold-sequence').forEach(el=>initFoldSequence(el));$all('.background-graphic.text-mask').forEach(el=>initTextMask(el));$all('.carousel').forEach(el=>new PatternCarousel(el));$all('.background-graphic.marquee').forEach(el=>initMarquee(el));$all('.background-graphic.fixed-pattern').forEach(el=>initFixedPattern(el));let scrollDelta=0;scroll.on('page',data=>{if(!data)return;const{page}=data;switch(page.id){case 'sandboxes':$('.mock',page).classList.add('scroll-in');break;}
data.page.querySelectorAll('[slide-in]').forEach((item,i)=>{setTimeout(()=>{item.classList.add('slideIn');},100*i);});data.page.querySelectorAll('svg, img').forEach(item=>{item.classList.add('fadein');item.classList.remove('fadeout');});});scroll.on('leave',data=>{if(!data)return;const{page}=data;switch(page.id){case 'sandboxes':$('.mock',page).classList.remove('scroll-in');break;}
document.querySelectorAll('svg, img').forEach(item=>{if(item.classList.contains('fadein')){item.classList.add('fadeout');item.classList.remove('fadein');}});});if(window.Headroom&&$('.site-nav')){window.headroom=new Headroom($('.site-nav'),{offset:200});window.headroom.init()}});function initForm(){const view=$('.form');const container=$('.container',view);const form=$('form',view);const activateForm=$('.footer .form-activate');const closeForm=$('.form-close',view);function resetForm(){form.querySelector('button[type="reset"]').click();}
function openForm(){removeMessage();view.classList.remove('hidden');}
function hideForm(){removeMessage();view.classList.add('hidden');}
function fieldError(field){$all('.field',form).forEach(el=>el.classList.remove('is-error'));field.parentNode.classList.add('is-error');return false;}
const ContactMessage=(fields={})=>{const ret={name:null,company:null,email:null,phone:null,message:null};let err=false;for(let field in fields){const f=fields[field];if(f.parentNode.classList.contains('is-required')){if((!f.value.length))
err=f;if(err)
break;}
ret[f.getAttribute('name')]=f.value;}
if(err){$all('.input',form).forEach(f=>f.classList.remove('is-error'));return fieldError(err);}else{return ret;}};function removeMessage(){const msg=form.querySelector('.callback-message');if(msg)
$('.callback-message').parentNode.removeChild(msg);}
function messageSuccess(res={}){const html=new DOMParser().parseFromString(`
      <p class="callback-message">
        ${res.message||'Thank you for your message. We will follow up with you shortly.'}
        <a href="#" class="callback-message-close">Close</a>
      </p>
    `,'text/html').body.firstChild;container.insertBefore(html,container.firstElementChild);html.querySelector('.callback-message-close').addEventListener('click',ev=>{ev.preventDefault();resetForm();hideForm();html.parentNode.removeChild(html);});}
function messageError(res={}){const html=new DOMParser().parseFromString(`
      <p class="callback-message is-error">
        ${res.message||'There was an error. Please try again later'}
        <a href="#" class="callback-message-close">Close</a>
      </p>
    `,'text/html').body.firstChild;container.insertBefore(html,container.firstElementChild);html.querySelector('.callback-message-close').addEventListener('click',ev=>{ev.preventDefault();html.parentNode.removeChild(html);});}
form.addEventListener('submit',ev=>{ev.preventDefault();const message=ContactMessage({name:$('input#form-name',form),company:$('input#form-company',form),email:$('input#form-email',form),phone:$('input#form-phone',form),message:$('textarea#form-message',form)});if(message===false){return false;}
fetch('https://feedback.hatching.io/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(message)}).then(response=>{const{status}=response;if(status==200){messageSuccess();}else{response.json().then(body=>messageError(body));}});});activateForm.addEventListener('click',ev=>{ev.preventDefault();if(view.classList.contains('hidden')){openForm();}else{hideForm();}});closeForm.addEventListener('click',ev=>{ev.preventDefault();hideForm(ev);});window.addEventListener('keyup',ev=>{if(ev.keyCode===27)hideForm();});window.openForm=openForm;window.hideForm=hideForm;window.resetForm=resetForm;}
(function(){const log=msg=>console.log(String.fromCodePoint(128064)+' ',msg);const box=el=>el.getBoundingClientRect();class ScrollCuck{constructor(props={}){this.props={pages:[],current:null,offset:50,init:()=>true,...props};this.callbacks={init:[this.props.init],scroll:[],leave:[],page:[],stop:[],up:[],down:[]};this.map=[];let lastScrollTop=0;let isScrolling;window.addEventListener('scroll',ev=>{isScrolling=clearTimeout(isScrolling);isScrolling=setTimeout(()=>{this.dispatch('stop',this.current);},66);let st=window.scrollY||document.documentElement.scrollTop;if(st>lastScrollTop){this.dispatch('down',window.scrollY);}else{this.dispatch('up',window.scrollY)}
lastScrollTop=st<=0?0:st;this.dispatch('scroll',window.scrollY);});window.addEventListener('resize',ev=>{this.mapPage();});this.on('scroll',scrollY=>{scrollY=scrollY+150;const current=this.map.find(page=>{if(scrollY==0)++scrollY;if(scrollY>(page.top-this.offset)){if(scrollY>((page.top-this.offset)+page.height)){return false;}else{return true;}}else{return false;}});if(!current||this.current==current)
return false;if(this.current!==current)
this.dispatch('leave',this.current);this.current=current;this.dispatch('page',this.current);});this.mapPage();this.dispatch('init');this.dispatch('page',this.current);this.dispatch('page',this.current);}
mapPage(){if(location.pathname.substring(1,5)==='blog'){return;}
this.map=this.pages.map(page=>{let offset=page.offsetTop;let hasChild=false;page.childNodes.forEach(child=>{if(child.tagName&&child.tagName.toLowerCase()==="article"){return;}});if(page.tagName.toLowerCase()==="article"){offset=page.closest('section')?page.closest('section').offsetTop+page.offsetTop:0;}
return{page,top:offset,height:page.clientHeight};}).filter(function(el){return el!=null;});return this.map;}
on(namespace,fn){if(fn instanceof Function){if(!this.callbacks[namespace])
this.callbacks[namespace]=[];this.callbacks[namespace].push(fn);}}
dispatch(name,data={}){if(this.callbacks[name]instanceof Array)
this.callbacks[name].forEach(fn=>fn(data));}
nearest(){if(!this.current)return;const{scrollTop}=window;window.scrollTo(0,this.current.top);}
next(){if(!this.current)return;const next=this.current.page.nextElementSibling;if(next){const y=next.offsetTop;window.scrollTo(0,y);}else{return;}}
previous(){if(!this.current)return;const prev=this.current.page.previousElementSibling;if(prev){const y=prev.offsetTop;window.scrollTo(0,y);}else{return;}}
log(msg){log(msg);}
set page(page){this.pages.push(page);this.mapPage();}
set current(current){this.props.current=current;}
get current(){return this.props.current}
get pages(){return this.props.pages;}
get offset(){return this.props.offset;}}
if(!window.components)window.components={};window.components.ScrollControl=(props={})=>new ScrollCuck(props);}());(function(){function textMask(svg,text,container){const squareColor=(function(){if(container.hasAttribute('data-square-color'))
return container.getAttribute('data-square-color');else
return '#FFFFFF';})();const textColor=(function(){if(container.hasAttribute('data-text-color'))
return container.getAttribute('data-text-color');else
return '#000000';})();const backgroundColor=(function(){if(container.hasAttribute('data-background'))
return container.getAttribute('data-background');else
return '#FFFFFF';})();container.style.background=backgroundColor;const{squareSize,matrixWidth,matrixHeight}=svg;function makeTextNode(t,props={}){const textNode=$svg('text',{className:'text-mask__content',...props});textNode.textContent=t;textNode.setAttribute('fill',textColor);return textNode;}
const group=$svg('g');const textTop=makeTextNode(text,{y:(squareSize+(squareSize/4)-8),x:-(squareSize)});const textBottom=makeTextNode(text,{y:((squareSize*(matrixHeight+1))-((squareSize*2)-(squareSize/4))-8),x:-(squareSize*4)});group.appendChild(textTop);group.appendChild(textBottom);svg.root.insertBefore(group,svg.root.firstChild);const targets=[];const isEven=(n=0)=>(n%2===0)
let y=0;while(y<svg.matrixHeight){let x=0;while(x<svg.matrixWidth){let t=svg.matrix.read(!isEven(y)?x+1:x,y);if(t)targets.push(t);x+=2;}
++y;}
let reposition=(el,extr)=>{if(!el){svg.matrix.each((x,y,point)=>{if(point.square)
reposition(point.square,extr);});}else{const cur=parseInt(el.getAttribute('data-x'))*squareSize;const amount=Math.round(((matrixWidth*squareSize)-window.innerWidth)/2);el.setAttribute('x',cur-amount);}}
targets.forEach(target=>{const{square}=target;reposition();square.setAttribute('fill','transparent');});window.addEventListener('resize',ev=>{reposition();});let ticker=true;let randomTranslate=()=>Math.floor(Math.random()*(textTop.clientWidth/4));textTop.style.transform=`translateX(-${window.innerWidth+1000}px)`;textBottom.style.transform=`translateX(${window.innerWidth+1000}px)`;function moveText(){textTop.style.transform=`translateX(${window.innerWidth+1000}px)`;textBottom.style.transform=`translateX(-${window.innerWidth+1000}px)`;setTimeout(()=>{textTop.classList.add('is-repositioning');textBottom.classList.add('is-repositioning');textTop.style.transform=`translateX(-${window.innerWidth+1000}px)`;textBottom.style.transform=`translateX(${window.innerWidth+1000}px)`;setTimeout(()=>{textTop.classList.remove('is-repositioning');textBottom.classList.remove('is-repositioning');moveText();},100);},10000);}
moveText();}
function initFoldSequence(container){if(!container)throw new Error('Container cannot be nothing.');let foregroundColor='#F5F6F7';if(container.hasAttribute('data-foreground'))
foregroundColor=container.getAttribute('data-foreground');if(container.hasAttribute('data-random-fill'))
randomFill=!(container.getAttribute('data-random-fill')==='false');const svg=new SVGMatrix({container,foregroundColor,fillColor:'transparent',squareSize:90});function getFoldTitleElements(){const elems=$all('#fold .view-context__body > *:not(a)');if(elems.length)
return elems;else
return[];}
function draw(){let selection=[];let ymax=Math.min(7,svg.matrix.y-1)
for(var x=0;x<=svg.matrix.x-1;x++){for(var y=0;y<=ymax;y++){selection.push(svg.matrix.read(x,y));}}
let toremove=[];const foldTitleElements=getFoldTitleElements();foldTitleElements.forEach(el=>{let dimensions=el.getBoundingClientRect();let bottomRightX=dimensions.x+dimensions.width;let offsettop=svg.matrix.read(0,0).square.getBoundingClientRect().y;let bottomRightY=dimensions.y+dimensions.height-offsettop;for(var x=0;x<=Math.floor(bottomRightX/svg.squareSize);x++){for(var y=0;y<=Math.floor(bottomRightY/svg.squareSize);y++){toremove.push(svg.matrix.read(x,y));}}});toremove.push(svg.matrix.read(svg.matrix.x-1,1));toremove.forEach(square=>{if(square&&selection.indexOf(svg.matrix.read(square.x,square.y))!=-1){selection.splice(selection.indexOf(svg.matrix.read(square.x,square.y)),1);}});let totalBlocks=selection.length;let blocksToFill=Math.floor(totalBlocks*0.4+2);var transitionTime=2000;var delay=250;var AvgtransitionTimePerBlock=transitionTime/blocksToFill;var initialTransitionTimePerBlock=2*(AvgtransitionTimePerBlock);var finalTransitionTimePerBlock=0*(AvgtransitionTimePerBlock);let lastBlock;let eligibleBlocks=[];let usedBlocks=[];let random=Math.floor(Math.random()*selection.length);let startingBlock=selection[random];eligibleBlocks.push(startingBlock);for(var i=0;i<blocksToFill;i++){let random=Math.floor(Math.random()*eligibleBlocks.length);let block=eligibleBlocks[random];eligibleBlocks.splice(random,1);usedBlocks.push(block);lastBlock=block;[[-1,1],[0,1],[1,1],[-1,0],[1,0],[-1,-1],[0,-1],[-1,-1]].forEach(xy=>{if(!block||block.x+xy[0]<0||block.x+xy[0]>svg.matrix.x||block.y+xy[1]<0||block.y+xy[1]>svg.matrix.y){return}
let neighbooringBlock=svg.matrix.read(block.x+xy[0],block.y+xy[1]);if(eligibleBlocks.indexOf(neighbooringBlock)!=-1){eligibleBlocks.splice(eligibleBlocks.indexOf(neighbooringBlock),1);}
if(neighbooringBlock&&eligibleBlocks.indexOf(neighbooringBlock)==-1&&usedBlocks.indexOf(neighbooringBlock)==-1&&selection.indexOf(neighbooringBlock)!=-1){eligibleBlocks.push(neighbooringBlock);}});setTimeout(()=>{if(block){block.square.setAttribute('fill','transparent');}},delay);delaySlowStart=400-50*i;normalDelay=usedBlocks.length/blocksToFill*finalTransitionTimePerBlock+(1-usedBlocks.length/blocksToFill)*initialTransitionTimePerBlock;delay+=Math.max(delaySlowStart,normalDelay);}
if(foldTitleElements[1]&&foldTitleElements[1].innerText.includes("Detect")){delay+=500;for(var i=0;i<2;i++){setTimeout(()=>{lastBlock.square.setAttribute('fill','#FCC200');},delay);delay+=250;setTimeout(()=>{lastBlock.square.setAttribute('fill','transparent');},delay);delay+=250}
setTimeout(()=>{lastBlock.square.setAttribute('fill','#FCC200');},delay);}}
draw();let timeout=null;window.addEventListener('resize',()=>{svg.wipeSquares();svg.parseMatrixSize();svg.buildMatrix();svg.buildSquares();if(!timeout){timeout=setTimeout(()=>{draw();timeout=null;},1000);}});}
function initTextMask(container,text='Hibbem Sound System',foreground='#ffffff'){if(!container)throw new Error('Container cannot be nothing.');if(container.hasAttribute('data-square-color'))
foreground=container.getAttribute('data-square-color');const svg=new SVGMatrix({container,foregroundColor:foreground,squareSize:200,matrixHeight:3,matrixWidthOffset:2,fillY:false});if(container.hasAttribute('title'))
text=container.getAttribute('title');textMask(svg,text,container);return svg;}
function initMarquee(container){if(!container)throw new Error('Container cannot be nothing.');const svg=new SVGMatrix({container,foregroundColor:'#0',squareSize:Math.floor(window.innerWidth/32)});const matrix=svg.matrix;const pixelatedDetect=[0,1,4,5,6,8,9,10,12,13,14,17,18,20,21,22,23,25,27,32,35,39,44,46,48,50,51,52,55,58,59,60,62,67,69,71,73,78,81,85,90,92,93,96,97,98,101,104,105,106,109,110,113]
const pixelatedThe=[0,1,2,4,6,8,9,10,12,15,17,19,23,26,27,28,30,31,32,34,37,39,41,45,48,50,52,53,54]
const pixelatedUnknown=[2,4,7,9,12,14,17,19,20,21,23,27,29,34,36,37,39,41,43,46,47,49,51,53,55,59,61,62,66,68,70,71,73,74,78,80,81,83,85,87,91,93,95,98,100,103,105,107,110,113,115,117,119,121,123,125,128,129,132,135,137,140,142,145,147,148,149,152,154,157]
Animation1();function Animation1(){delayedDraw(pixelatedDetect,23,5,6,0)
destroyPattern(1000);delayedDraw(pixelatedThe,11,10,6,2000);destroyPattern(3000);delayedDraw(pixelatedUnknown,32,0,6,4000);destroyPattern(5000);setTimeout(()=>{Animation2();},6500);}
function Animation2(){delayedDraw(pixelatedDetect,23,5,1,1000)
delayedDraw(pixelatedThe,11,10,6,2000);delayedDraw(pixelatedUnknown,32,0,11,3000);setTimeout(()=>{destroyPattern();},5000);setTimeout(()=>{Animation1();},6500);}
function delayedDraw(pixelNumbers,width,offsetX,offsetY,delay){var selection=selectPixels(pixelNumbers,width,offsetX,offsetY);setTimeout(()=>{renderPattern(selection);},delay);}
function selectPixels(pixelNumbers,width,offsetX,offsetY){var selection=[]
for(var i=0;i<pixelNumbers.length;i++){var x=pixelNumbers[i];var y=offsetY;while(x>width-1){y++;x-=width;}
x+=offsetX;selection.push(matrix.read(x,y));}
return selection;}
function renderPattern(selection){let totalBlocks=selection.length
var transitionTime=250;var transitionTimePerBlock=transitionTime/totalBlocks;for(var i=0;i<totalBlocks;i++){let remainingBlocks=selection.length;let random=Math.floor(Math.random()*remainingBlocks);let block=selection[random];selection.splice(random,1);setTimeout(()=>{if(block){block.square.setAttribute('fill','#FFFFFF');block.active=true;}},i*transitionTimePerBlock);}}
function destroyPattern(delay){setTimeout(()=>{var activeBlocks=[];svg.matrix.map.forEach(row=>{row.forEach(block=>{if(block.active){activeBlocks.push(block);}})});let totalBlocks=activeBlocks.length;var transitionTime=250;var transitionTimePerBlock=transitionTime/totalBlocks;for(var i=0;i<totalBlocks;i++){let random=Math.floor(Math.random()*activeBlocks.length);let block=activeBlocks[random];activeBlocks.splice(random,1);setTimeout(()=>{if(block){block.square.setAttribute('fill','#000000');block.active=false;}},i*transitionTimePerBlock);}},delay);}}
function initFixedPattern(container){let sequence;if(!container)throw new Error('Container cannot be nothing.');let foregroundColor='#F5F6F7';if(container.hasAttribute('data-foreground'))
foregroundColor=container.getAttribute('data-foreground');const svg=new SVGMatrix({container,foregroundColor,fillColor:'transparent',squareSize:90});if(windowIsMobile()){sequence=svg.matrix.sequence(0,svg.matrix.y-1,[[1,0],[2,0],[3,0],[-5,1],[1,0],[2,0]])}else{sequence=svg.matrix.sequence(svg.matrix.x-3,0,[[-3,1],[1,1],[1,0],[1,0],[2,0],[-2,1],[1,0],[1,0],[1,0],[-5,1],[1,0],[1,0],[1,0],[0,1],[1,0],[-3,1],[2,0],[2,0],[-3,1],[2,0]]);}
sequence.forEach((p,i)=>{if(p)
p.square.setAttribute('fill','transparent');});}
window.graphics={initFoldSequence,initTextMask,initMarquee,initFixedPattern};}());/*!
* headroom.js v0.11.0 - Give your page some headroom. Hide your header until you need it
* Copyright (c) 2020 Nick Williams - http://wicky.nillia.ms/headroom.js
* License: MIT
*/!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t=t||self).Headroom=n()}(this,function(){"use strict";function t(){return"undefined"!=typeof window}function d(t){return function(t){return t&&t.document&&function(t){return 9===t.nodeType}(t.document)}(t)?function(t){var n=t.document,o=n.body,s=n.documentElement;return{scrollHeight:function(){return Math.max(o.scrollHeight,s.scrollHeight,o.offsetHeight,s.offsetHeight,o.clientHeight,s.clientHeight)},height:function(){return t.innerHeight||s.clientHeight||o.clientHeight},scrollY:function(){return void 0!==t.pageYOffset?t.pageYOffset:(s||o.parentNode||o).scrollTop}}}(t):function(t){return{scrollHeight:function(){return Math.max(t.scrollHeight,t.offsetHeight,t.clientHeight)},height:function(){return Math.max(t.offsetHeight,t.clientHeight)},scrollY:function(){return t.scrollTop}}}(t)}function n(t,s,e){var n,o=function(){var n=!1;try{var t={get passive(){n=!0}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){n=!1}return n}(),i=!1,r=d(t),l=r.scrollY(),a={};function c(){var t=Math.round(r.scrollY()),n=r.height(),o=r.scrollHeight();a.scrollY=t,a.lastScrollY=l,a.direction=l<t?"down":"up",a.distance=Math.abs(t-l),a.isOutOfBounds=t<0||o<t+n,a.top=t<=s.offset,a.bottom=o<=t+n,a.toleranceExceeded=a.distance>s.tolerance[a.direction],e(a),l=t,i=!1}function h(){i||(i=!0,n=requestAnimationFrame(c))}var u=!!o&&{passive:!0,capture:!1};return t.addEventListener("scroll",h,u),c(),{destroy:function(){cancelAnimationFrame(n),t.removeEventListener("scroll",h,u)}}}function o(t,n){n=n||{},Object.assign(this,o.options,n),this.classes=Object.assign({},o.options.classes,n.classes),this.elem=t,this.tolerance=function(t){return t===Object(t)?t:{down:t,up:t}}(this.tolerance),this.initialised=!1,this.frozen=!1}return o.prototype={constructor:o,init:function(){return o.cutsTheMustard&&!this.initialised&&(this.addClass("initial"),this.initialised=!0,setTimeout(function(t){t.scrollTracker=n(t.scroller,{offset:t.offset,tolerance:t.tolerance},t.update.bind(t))},100,this)),this},destroy:function(){this.initialised=!1,Object.keys(this.classes).forEach(this.removeClass,this),this.scrollTracker.destroy()},unpin:function(){!this.hasClass("pinned")&&this.hasClass("unpinned")||(this.addClass("unpinned"),this.removeClass("pinned"),this.onUnpin&&this.onUnpin.call(this))},pin:function(){this.hasClass("unpinned")&&(this.addClass("pinned"),this.removeClass("unpinned"),this.onPin&&this.onPin.call(this))},freeze:function(){this.frozen=!0,this.addClass("frozen")},unfreeze:function(){this.frozen=!1,this.removeClass("frozen")},top:function(){this.hasClass("top")||(this.addClass("top"),this.removeClass("notTop"),this.onTop&&this.onTop.call(this))},notTop:function(){this.hasClass("notTop")||(this.addClass("notTop"),this.removeClass("top"),this.onNotTop&&this.onNotTop.call(this))},bottom:function(){this.hasClass("bottom")||(this.addClass("bottom"),this.removeClass("notBottom"),this.onBottom&&this.onBottom.call(this))},notBottom:function(){this.hasClass("notBottom")||(this.addClass("notBottom"),this.removeClass("bottom"),this.onNotBottom&&this.onNotBottom.call(this))},shouldUnpin:function(t){return"down"===t.direction&&!t.top&&t.toleranceExceeded},shouldPin:function(t){return"up"===t.direction&&t.toleranceExceeded||t.top},addClass:function(t){this.elem.classList.add.apply(this.elem.classList,this.classes[t].split(" "))},removeClass:function(t){this.elem.classList.remove.apply(this.elem.classList,this.classes[t].split(" "))},hasClass:function(t){return this.classes[t].split(" ").every(function(t){return this.classList.contains(t)},this.elem)},update:function(t){t.isOutOfBounds||!0!==this.frozen&&(t.top?this.top():this.notTop(),t.bottom?this.bottom():this.notBottom(),this.shouldUnpin(t)?this.unpin():this.shouldPin(t)&&this.pin())}},o.options={tolerance:{up:0,down:0},offset:0,scroller:t()?window:null,classes:{frozen:"headroom--frozen",pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",bottom:"headroom--bottom",notBottom:"headroom--not-bottom",initial:"headroom"}},o.cutsTheMustard=!!(t()&&function(){}.bind&&"classList"in document.documentElement&&Object.assign&&Object.keys&&requestAnimationFrame),o});function $(selector,base=document){if(selector instanceof HTMLElement){return selector;}else{return base.querySelector(selector);}};function $all(selector,base=document){return[...base.querySelectorAll(selector)];}
function $parent(selector,query){let isSelector=false;isSelector=(['.','#','['].indexOf(query[0])>-1);if(isSelector)selector=$(query);if(!query)
return selector.parentNode;else if(selector.parentNode.tagName=='body'||selector.tagName=='body')
return document.body;else if(selector.parentNode.classList.contains(query.substr(1)))
return selector.parentNode;else if(selector.id==query.substr(1))
return selector.parentNode;else
return $parent($(selector).parentNode,query);}
function toggleClassDelay(element,className,timeout=1000){element.classList.add(className);setTimeout(()=>element.classList.remove(className),timeout);}
const initializedLogoSymbolColor=$('#logo-squares').getAttribute('fill');const initializedLogoTextColor=$('#logo-text').getAttribute('fill');function setLogoColor(squareFill=initializedLogoSymbolColor,textFill=initializedLogoTextColor){const logo=document.querySelector('.logo svg');const squares=logo.querySelector('#logo-squares');const text=logo.querySelector('#logo-text');squares.setAttribute('fill',squareFill);text.setAttribute('fill',textFill);}
function isDarkView(){return(initializedLogoSymbolColor==='#FFFFFF');}
function $svg(tagName,attrs={}){const elem=document.createElementNS('http://www.w3.org/2000/svg',tagName||'g');for(let attr in attrs){let label=attr;if(attr=='className')label='class';elem.setAttribute(label,attrs[attr]);}
return elem;}
function windowIsMobile(){return window.innerWidth<640;}
function initHeaderBackground(fold){if(fold.dataset.keep){setTimeout(()=>$('.image',fold).classList.add('in'),500);return;}
const _default='/static/images/headers/home/11.jpg';const imageSet=fold.dataset.set;let path;if(!imageSet)return;const backgroundMap={'home':1,'about':1,'cuckoo':1,'triage':1,'blog':1,'jobs':1}
const target=backgroundMap[imageSet];if(!target){path=_default;}else{const picked=Math.floor(Math.random()*target);path='/static/images/headers/'+imageSet+'/'+picked+'.jpg';}
$('.image',fold).setAttribute('style','background-image: url('+path+')');setTimeout(()=>$('.image',fold).classList.add('in'),500);}
(function(){function decide(rps=false){const result=Math.floor(Math.random()*2);return result?true:false;}
function transformCoordinates(x,y,maxX,maxY,isRPS){const rps=()=>decide(isRPS);let newX=rps()?(rps()?x+1:x):(rps()?x-1:x);let newY=rps()?(rps()?y+1:y):(rps()?y-1:y);if(newX>maxX||newX<0)return transformCoordinates(x,y,maxX,maxY,isRPS);if(newY>maxY||newY<0)return transformCoordinates(x,y,maxX,maxY,isRPS);return{newX,newY};}
window.Matrix=class Matrix{constructor(x=0,y=0,defaultValue=null){this.map=Matrix.Map(x,y,defaultValue);this.rps=false;this.props={defaultValue};this.callbacks={read:[],write:[],bumpRight:[],bumpLeft:[],error:[]};}
read(x=0,y=0){try{this.emit('read',x,y,this.map[y][x]);return this.map[y][x];}catch(err){this.emit('error',x,y,'Matrix coordinate not found.');return undefined;}}
write(x=0,y=0,value=null){try{let oldValue=''+this.map[y][x];if(value instanceof Function)value=value(x,y);this.map[y][x]=value;this.emit('write',x,y,this.map[y][x],oldValue);}catch(err){this.emit('error',`Matrix coordinate [${x}:${y}] not found.`);}}
bumpLeft(){this.map.forEach((y,yi)=>this.map[yi].push(this.map[yi].shift()));this.emit('bumpLeft');}
bumpRight(){this.map.forEach((y,yi)=>this.map[yi].unshift(this.map[yi].pop()));this.emit('bumpRight');}
spread(value,count=2,x=null,y=null,options={}){if(count==0)return;options={constraints:[],...options};if(x==null)x=Math.floor(Math.random()*this.x);if(y==null)y=Math.floor(Math.random()*this.y);const val=(value instanceof Function)?value(x,y,this.read(x,y)):value;this.write(x,y,val);--count;const{newX,newY}=transformCoordinates(x,y,this.x,this.y,this.rps,options);this.spread(value,count,newX,newY);}
sequence(startX=0,startY=0,sequence=[]){const ret=[];ret.push(this.read(startX,startY));let prevX=startX;let prevY=startY;sequence.forEach(s=>{const transformX=s[0];const transformY=s[1];prevX+=transformX;prevY+=transformY;ret.push(this.read(prevX,prevY));});return ret;}
each(fn,write=false){this.map.forEach((row,yi)=>{row.forEach((cell,xi)=>{if(write===true){this.write(xi,yi,fn(xi,yi,this.read(xi,yi)));}else{fn(xi,yi,this.read(xi,yi));}});})}
on(name,callback){if(!this.callbacks[name]){this.emit('error',`${name}: event not implemented.`);return;}
this.callbacks[name].push(callback);}
emit(name,...args){if(!this.callbacks[name])return;this.callbacks[name].forEach(fn=>fn(...args));}
get x(){return this.map[0]?this.map[0].length-1:0;}
get y(){return this.map.length-1;}
set y(newY){let newMap=Matrix.Map(this.x,newY,this.props.defaultValue);newMap.forEach((row,yi)=>{row.forEach((cell,xi)=>{if(this.read(xi,yi)!==undefined)newMap[yi[xi]]=this.read(xi,yi);});});this.map=newMap;}
set x(newX){let newMap=Matrix.Map(newX,this.y,this.props.defaultValue);newMap.forEach((row,yi)=>{row.forEach((cell,xi)=>{if(this.read(xi,yi)!==undefined)newMap[yi][xi]=this.read(xi,yi);});});this.map=newMap;}
get verbose(){return this._verbose;}
static Map(x=0,y=0,value=null){const map=[];let xCount=0;let yCount=0;let yRange=[];if(value instanceof Function)value=value(x,y);while(yCount<y){while(xCount<x){yRange.push(value);++xCount;}
xCount=0;map.push(yRange);yRange=[];++yCount;}
return map;}}}());(function(){window.PatternCarousel=class PatternCarousel{constructor(el){this.props={el:el,slides:[],timeout:parseInt(el.getAttribute('data-timeout')),index:0,activeSlide:null,textDelay:250,fadingTime:parseInt(el.getAttribute('data-fading-time'))};el.style.background="#000";this.initSlides();this.animateCarousel();}
initSlides(){let clips=this.props.el.querySelectorAll('div');clips.forEach(clip=>{clip.style.opacity=0;this.props.slides.push(new Slide(clip));});}
animateCarousel(){let delay=0;this.props.slides.forEach(slide=>{setTimeout(()=>{this.buildSlide(slide);},delay);delay+=this.props.fadingTime;delay+=this.props.textDelay;setTimeout(()=>{this.addText(slide);},delay);delay+=this.props.textDelay;setTimeout(()=>{this.animateSlide(slide);},delay);delay+=this.props.timeout;delay+=this.props.textDelay;delay+=this.props.textDelay;setTimeout(()=>{this.destroySlide(slide);},delay);delay+=this.props.fadingTime;delay+=500;});setTimeout(()=>{this.animateCarousel()},delay);}
buildSlide(slide){this.activeSlide=slide;let toBeActiveBlocks=[];if(slide.svg.root.parentNode){slide.offsetTop=(window.innerHeight-slide.svgHeight)/2;slide.svg.root.parentNode.setAttribute('style',`padding-top:${slide.offsetTop}px`);}
slide.pattern.split('|')[0].split(',').forEach((row,i)=>{let svgRow=slide.svg.matrix.map[i];svgRow.forEach((sq,sqi)=>{if(row[sqi+3]==="0"){toBeActiveBlocks.push(sq);}});});slide.el.style.opacity="1";let totalBlocks=toBeActiveBlocks.length;if(slide.text=="Scalable"){totalBlocks=totalBlocks/4;let toRemove=[]
toBeActiveBlocks.forEach(block=>{if(block.x%2||block.y%2){toRemove.push(block);}});toRemove.forEach(block=>{toBeActiveBlocks.splice(toBeActiveBlocks.indexOf(block),1);});}
let interval=this.props.fadingTime/totalBlocks;for(var i=0;i<totalBlocks;i++){let randomIndex=Math.floor(Math.random()*toBeActiveBlocks.length);let randomBlock=toBeActiveBlocks[randomIndex];toBeActiveBlocks.splice(randomIndex,1);setTimeout(()=>{randomBlock.square.setAttribute('fill',slide.foreground);if(slide.text=="Scalable"){slide.svg.matrix.read(randomBlock.x+1,randomBlock.y).square.setAttribute('fill',slide.foreground)
slide.svg.matrix.read(randomBlock.x,randomBlock.y+1).square.setAttribute('fill',slide.foreground)
slide.svg.matrix.read(randomBlock.x+1,randomBlock.y+1).square.setAttribute('fill',slide.foreground)}},i*interval);}}
destroySlide(slide){slide.el.setAttribute('data-animate',false);slide.animating=false;let activeBlocks=[];slide.svg.matrix.map.forEach(row=>{row.forEach(block=>{if(block.square.getAttribute('fill')===slide.foreground&slide.el.style.opacity=="1"){activeBlocks.push(block);}})});let totalBlocks=activeBlocks.length;if(slide.text=="Scalable"){totalBlocks=totalBlocks/4;let toRemove=[]
activeBlocks.forEach(block=>{if(block.x%2||block.y%2){toRemove.push(block);}});toRemove.forEach(block=>{activeBlocks.splice(activeBlocks.indexOf(block),1);});}
let interval=this.props.fadingTime/totalBlocks;for(var i=0;i<totalBlocks;i++){let randomIndex=Math.floor(Math.random()*activeBlocks.length);let randomBlock=activeBlocks[randomIndex];activeBlocks.splice(randomIndex,1);setTimeout(()=>{randomBlock.square.setAttribute('fill',slide.background);if(slide.text=="Scalable"){if(slide.svg.matrix.read(randomBlock.x+1,randomBlock.y)){slide.svg.matrix.read(randomBlock.x+1,randomBlock.y).square.setAttribute('fill',slide.background);}
if(slide.svg.matrix.read(randomBlock.x,randomBlock.y+1)){slide.svg.matrix.read(randomBlock.x,randomBlock.y+1).square.setAttribute('fill',slide.background);}
if(slide.svg.matrix.read(randomBlock.x+1,randomBlock.y+1)){slide.svg.matrix.read(randomBlock.x+1,randomBlock.y+1).square.setAttribute('fill',slide.background);}}},i*interval);}
setTimeout(()=>{slide.el.style.opacity="0";},this.props.fadingTime);}
animateSlide(slide){slide.el.setAttribute('data-frame-index',0);let interval=slide.el.getAttribute('data-interval');let iterations=Math.floor(this.props.timeout/interval);let frames=slide.pattern.split('|');for(var i=0;i<iterations;i++){setTimeout(()=>{slide.index=parseInt(slide.el.getAttribute('data-frame-index'))|0;let pattern=frames[slide.index].split(',');pattern.forEach((row,i)=>{let svgRow=slide.svg.matrix.map[i];svgRow.forEach((sq,sqi)=>{if(row[sqi+3]==="1"){sq.square.setAttribute('fill',slide.background);}else{sq.square.setAttribute('fill',slide.foreground);}});});slide.el.setAttribute('data-frame-index',(slide.index+1)%frames.length);},interval*i);}}
addText(slide){let offset={x:300,y:(window.innerHeight/2)}
const textNode=$svg('text',offset);slide.svg.root.appendChild(textNode);textNode.setAttribute('fill',slide.textColor);textNode.setAttribute('font-size',window.innerWidth/8.5);textNode.setAttribute('font-weight',800);textNode.setAttribute('x',window.innerWidth/2);textNode.setAttribute("text-anchor","middle");let split=slide.text.split('|');if(split.length==1){textNode.textContent=split[0];let elHeight=textNode.getBoundingClientRect().height;textNode.setAttribute("y",Math.round(slide.svg.squareSize*(slide.svg.matrixHeight-1)/2+elHeight/3.78)+"px");}else if(split.length==2){textNode.innerHTML=`
          <tspan text-anchor="middle" class="top" x="${window.innerWidth/2}" y="${Math.round(slide.svg.squareSize*((slide.svg.matrixHeight)/2-1))}px">${split[0]}</tspan>
          <tspan text-anchor="middle" class="bottom"x="${window.innerWidth/2}" y="${Math.round(slide.svg.squareSize*((slide.svg.matrixHeight)/2+1))}px">${split[1]}</tspan>
        `;}
setTimeout(()=>{textNode.remove();},this.props.textDelay+this.props.timeout+this.props.textDelay);}}
class Slide{constructor(el){this.el=el;el.stuff=this;if(!el)throw new Error('Container cannot be nothing.');if(el.hasAttribute('data-background'))
this.background=el.getAttribute('data-background');if(el.hasAttribute('data-foreground'))
this.foreground=el.getAttribute('data-foreground');if(el.hasAttribute('data-text-color'))
this.textColor=el.getAttribute('data-text-color');if(el.hasAttribute('data-title'))
this.text=el.getAttribute('data-title');if(el.hasAttribute('data-pattern'))
this.pattern=el.getAttribute('data-pattern');if(el.getAttribute('data-pattern').split('|').length>0)
this.animated=true;let firstFrame=this.pattern.split('|')[0].split(',');this.width=firstFrame[0].trim().length;this.height=firstFrame.length;const svg=new SVGMatrix({container:el,foregroundColor:this.background,squareSize:el.parentNode.getBoundingClientRect().width/this.width,matrixHeight:this.height-1,matrixWidthOffset:0,matrixWidth:this.width,fillY:true,parentHeight:el.parentNode.getBoundingClientRect().height,parentWidth:el.parentNode.getBoundingClientRect().width,});this.svgHeight=svg.squareSize*this.height;this.svg=svg;}}}());(function(){window.SVGMatrix=class SVGMatrix{constructor(props={}){this.props={container:null,matrixWidth:0,matrixHeight:0,matrixWidthOffset:0,matrixHeightOffset:0,parentWidth:0,parentHeight:0,squareSize:100,foregroundColor:'#FFFFFF',fillColor:'#000000',fillX:true,fillY:true,...props};this.root=null;this.matrix=null;this._cache={};this.init();this.bind();}
init(){this.parseMatrixSize();this.buildSVG();this.buildMatrix();this.buildSquares();this.update();}
bind(){window.addEventListener("resize",e=>this.update());}
update(){this.parseMatrixSize();this.buildSVG();this.buildMatrix();this.buildSquares();}
destroy(){if(this.root)
this.root.parentNode.removeChild(root);}
parseMatrixSize(){const dim=this.container.getBoundingClientRect();this.parentWidth=dim.width;this.parentHeight=dim.height;this.matrixWidth=this.matrixWidth||Math.ceil(dim.width/this.squareSize);this.matrixHeight=this.matrixHeight||Math.ceil(dim.height/this.squareSize);if(!this.fillY)
this.parentHeight=this.squareSize*this.matrixHeight;if(!this.fillX)
this.parentWidth=this.squareSize*this.matrixWidth;if(this.matrixWidth*this.squareSize<dim.width){this.matrixWidth+=1;}
if(this.fillY&&this.matrixHeight*this.squareSize<dim.height)
this.matrixHeight+=1;if(this.matrixWidthOffset)this.matrixWidth+=this.matrixWidthOffset;if(this.matrixHeightOffset)this.matrixHeight+=this.matrixHeightOffset;}
buildSVG(){let svg;const{parentWidth,parentHeight}=this;if(this.root instanceof SVGElement){svg=this.root;}else{svg=document.createElementNS("http://www.w3.org/2000/svg","svg");}
svg.setAttribute('viewBox',[0,0,parentWidth,parentHeight].join(' '));svg.setAttribute('width',parentWidth);svg.setAttribute('height',parentHeight);this.container.appendChild(svg);this.root=svg;}
buildMatrix(){if(!this.matrix){this.matrix=new Matrix(this.matrixWidth,this.matrixHeight);}else{}}
buildSquares(){const{squareSize}=this;const svg=this.root;const exists=(x,y)=>{return svg.querySelector(`rect[data-x='${x}'][data-y='${y}']`);}
this.matrix.each((x,y,cell)=>{let square=exists(x,y);if(!square){square=SVGMatrix.Square(squareSize,x,y);square.setAttribute('data-x',x);square.setAttribute('data-y',y);square.setAttribute('shape-rendering','crispEdges');square.setAttribute('fill',this.foregroundColor);svg.appendChild(square);}
return{x,y,square};},true);}
wipeSquares(){const{foregroundColor}=this;this.matrix.each((x,y,cell)=>{if(cell.square)
cell.square.setAttribute('fill',foregroundColor);});}
get container(){return this.props.container;}
get squareSize(){return this.props.squareSize;}
get margin(){return this.props.margin;}
get matrixWidth(){return this.props.matrixWidth;}
get matrixHeight(){return this.props.matrixHeight;}
get matrixWidthOffset(){return this.props.matrixWidthOffset;}
get matrixHeightOffset(){return this.props.matrixHeightOffset;}
get parentWidth(){return this.props.parentWidth;}
get parentHeight(){return this.props.parentHeight;}
get foregroundColor(){return this.props.foregroundColor;}
get fillColor(){return this.props.fillColor;}
get fillX(){return this.props.fillX;}
get fillY(){return this.props.fillY;}
set matrixWidth(w){this.props.matrixWidth=w;}
set matrixHeight(h){this.props.matrixHeight=h;}
set matrixWidthOffset(wo){this.props.matrixWidthOffset=wo;}
set matrixHeightOffset(ho){this.props.matrixHeightOffset=ho;}
set parentWidth(w){this.props.parentWidth=w;}
set parentHeight(h){this.props.parentHeight=h;}
set fillX(f){this.props.fillX=f;}
set fillY(f){this.props.fillY=f}
set rps(bool){this.matrix?this.matrix.rps=bool:false;}
static Square(size=1,x=0,y=0){const square=document.createElementNS("http://www.w3.org/2000/svg","rect");square.setAttribute('width',size);square.setAttribute('height',size);square.setAttribute('x',x*size);square.setAttribute('y',y*size);return square;}}}());