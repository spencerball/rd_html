!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.accessibleAutocomplete=t():e.accessibleAutocomplete=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=1)}([function(e,t,n){!function(){"use strict";function t(){}function n(e,n){var o,r,l,i,u=L;for(i=arguments.length;i-- >2;)D.push(arguments[i]);for(n&&null!=n.children&&(D.length||D.push(n.children),delete n.children);D.length;)if((r=D.pop())&&void 0!==r.pop)for(i=r.length;i--;)D.push(r[i]);else!0!==r&&!1!==r||(r=null),(l="function"!=typeof e)&&(null==r?r="":"number"==typeof r?r=String(r):"string"!=typeof r&&(l=!1)),l&&o?u[u.length-1]+=r:u===L?u=[r]:u.push(r),o=l;var s=new t;return s.nodeName=e,s.children=u,s.attributes=null==n?void 0:n,s.key=null==n?void 0:n.key,void 0!==A.vnode&&A.vnode(s),s}function o(e,t){for(var n in t)e[n]=t[n];return e}function r(e,t){return n(e.nodeName,o(o({},e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}function l(e){!e.__d&&(e.__d=!0)&&1==V.push(e)&&(A.debounceRendering||setTimeout)(i)}function i(){var e,t=V;for(V=[];e=t.pop();)e.__d&&N(e)}function u(e,t,n){return"string"==typeof t||"number"==typeof t?void 0!==e.splitText:"string"==typeof t.nodeName?!e._componentConstructor&&s(e,t.nodeName):n||e._componentConstructor===t.nodeName}function s(e,t){return e.__n===t||e.nodeName.toLowerCase()===t.toLowerCase()}function a(e){var t=o({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var r in n)void 0===t[r]&&(t[r]=n[r]);return t}function p(e,t){var n=t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e);return n.__n=e,n}function c(e){e.parentNode&&e.parentNode.removeChild(e)}function d(e,t,n,o,r){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)n&&n(null),o&&o(e);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof n||(e.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var l in n)l in o||(e.style[l]="");for(var l in o)e.style[l]="number"==typeof o[l]&&!1===T.test(l)?o[l]+"px":o[l]}}else if("dangerouslySetInnerHTML"===t)o&&(e.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1]){var i=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),o?n||e.addEventListener(t,h,i):e.removeEventListener(t,h,i),(e.__l||(e.__l={}))[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e)f(e,t,null==o?"":o),null!=o&&!1!==o||e.removeAttribute(t);else{var u=r&&t!==(t=t.replace(/^xlink\:?/,""));null==o||!1===o?u?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof o&&(u?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):e.setAttribute(t,o))}else e.className=o||""}function f(e,t,n){try{e[t]=n}catch(e){}}function h(e){return this.__l[e.type](A.event&&A.event(e)||e)}function m(){for(var e;e=R.pop();)A.afterMount&&A.afterMount(e),e.componentDidMount&&e.componentDidMount()}function _(e,t,n,o,r,l){q++||(P=null!=r&&void 0!==r.ownerSVGElement,U=null!=e&&!("__preactattr_"in e));var i=v(e,t,n,o,l);return r&&i.parentNode!==r&&r.appendChild(i),--q||(U=!1,l||m()),i}function v(e,t,n,o,r){var l=e,i=P;if(null==t&&(t=""),"string"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||r)?e.nodeValue!=t&&(e.nodeValue=t):(l=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(l,e),g(e,!0))),l.__preactattr_=!0,l;if("function"==typeof t.nodeName)return S(e,t,n,o);if(P="svg"===t.nodeName||"foreignObject"!==t.nodeName&&P,(!e||!s(e,String(t.nodeName)))&&(l=p(String(t.nodeName),P),e)){for(;e.firstChild;)l.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(l,e),g(e,!0)}var u=l.firstChild,a=l.__preactattr_||(l.__preactattr_={}),c=t.children;return!U&&c&&1===c.length&&"string"==typeof c[0]&&null!=u&&void 0!==u.splitText&&null==u.nextSibling?u.nodeValue!=c[0]&&(u.nodeValue=c[0]):(c&&c.length||null!=u)&&y(l,c,n,o,U||null!=a.dangerouslySetInnerHTML),w(l,t.attributes,a),P=i,l}function y(e,t,n,o,r){var l,i,s,a,p=e.childNodes,d=[],f={},h=0,m=0,_=p.length,y=0,b=t?t.length:0;if(0!==_)for(var w=0;w<_;w++){var O=p[w],C=O.__preactattr_,x=b&&C?O._component?O._component.__k:C.key:null;null!=x?(h++,f[x]=O):(C||(void 0!==O.splitText?!r||O.nodeValue.trim():r))&&(d[y++]=O)}if(0!==b)for(var w=0;w<b;w++){s=t[w],a=null;var x=s.key;if(null!=x)h&&void 0!==f[x]&&(a=f[x],f[x]=void 0,h--);else if(!a&&m<y)for(l=m;l<y;l++)if(void 0!==d[l]&&u(i=d[l],s,r)){a=i,d[l]=void 0,l===y-1&&y--,l===m&&m++;break}(a=v(a,s,n,o))&&a!==e&&(w>=_?e.appendChild(a):a!==p[w]&&(a===p[w+1]?c(p[w]):e.insertBefore(a,p[w]||null)))}if(h)for(var w in f)void 0!==f[w]&&g(f[w],!1);for(;m<=y;)void 0!==(a=d[y--])&&g(a,!1)}function g(e,t){var n=e._component;n?I(n):(null!=e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),!1!==t&&null!=e.__preactattr_||c(e),b(e))}function b(e){for(e=e.lastChild;e;){var t=e.previousSibling;g(e,!0),e=t}}function w(e,t,n){var o;for(o in n)t&&null!=t[o]||null==n[o]||d(e,o,n[o],n[o]=void 0,P);for(o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||d(e,o,n[o],n[o]=t[o],P)}function O(e){var t=e.constructor.name;(B[t]||(B[t]=[])).push(e)}function C(e,t,n){var o,r=B[e.name];if(e.prototype&&e.prototype.render?(o=new e(t,n),k.call(o,t,n)):(o=new k(t,n),o.constructor=e,o.render=x),r)for(var l=r.length;l--;)if(r[l].constructor===e){o.__b=r[l].__b,r.splice(l,1);break}return o}function x(e,t,n){return this.constructor(e,n)}function E(e,t,n,o,r){e.__x||(e.__x=!0,(e.__r=t.ref)&&delete t.ref,(e.__k=t.key)&&delete t.key,!e.base||r?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,o),o&&o!==e.context&&(e.__c||(e.__c=e.context),e.context=o),e.__p||(e.__p=e.props),e.props=t,e.__x=!1,0!==n&&(1!==n&&!1===A.syncComponentUpdates&&e.base?l(e):N(e,1,r)),e.__r&&e.__r(e))}function N(e,t,n,r){if(!e.__x){var l,i,u,s=e.props,p=e.state,c=e.context,d=e.__p||s,f=e.__s||p,h=e.__c||c,v=e.base,y=e.__b,b=v||y,w=e._component,O=!1;if(v&&(e.props=d,e.state=f,e.context=h,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(s,p,c)?O=!0:e.componentWillUpdate&&e.componentWillUpdate(s,p,c),e.props=s,e.state=p,e.context=c),e.__p=e.__s=e.__c=e.__b=null,e.__d=!1,!O){l=e.render(s,p,c),e.getChildContext&&(c=o(o({},c),e.getChildContext()));var x,S,k=l&&l.nodeName;if("function"==typeof k){var M=a(l);i=w,i&&i.constructor===k&&M.key==i.__k?E(i,M,1,c,!1):(x=i,e._component=i=C(k,M,c),i.__b=i.__b||y,i.__u=e,E(i,M,0,c,!1),N(i,1,n,!0)),S=i.base}else u=b,x=w,x&&(u=e._component=null),(b||1===t)&&(u&&(u._component=null),S=_(u,l,c,n||!v,b&&b.parentNode,!0));if(b&&S!==b&&i!==w){var D=b.parentNode;D&&S!==D&&(D.replaceChild(S,b),x||(b._component=null,g(b,!1)))}if(x&&I(x),e.base=S,S&&!r){for(var L=e,T=e;T=T.__u;)(L=T).base=S;S._component=L,S._componentConstructor=L.constructor}}if(!v||n?R.unshift(e):O||(m(),e.componentDidUpdate&&e.componentDidUpdate(d,f,h),A.afterUpdate&&A.afterUpdate(e)),null!=e.__h)for(;e.__h.length;)e.__h.pop().call(e);q||r||m()}}function S(e,t,n,o){for(var r=e&&e._component,l=r,i=e,u=r&&e._componentConstructor===t.nodeName,s=u,p=a(t);r&&!s&&(r=r.__u);)s=r.constructor===t.nodeName;return r&&s&&(!o||r._component)?(E(r,p,3,n,o),e=r.base):(l&&!u&&(I(l),e=i=null),r=C(t.nodeName,p,n),e&&!r.__b&&(r.__b=e,i=null),E(r,p,1,n,o),e=r.base,i&&e!==i&&(i._component=null,g(i,!1))),e}function I(e){A.beforeUnmount&&A.beforeUnmount(e);var t=e.base;e.__x=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?I(n):t&&(t.__preactattr_&&t.__preactattr_.ref&&t.__preactattr_.ref(null),e.__b=t,c(t),O(e),b(t)),e.__r&&e.__r(null)}function k(e,t){this.__d=!0,this.context=t,this.props=e,this.state=this.state||{}}function M(e,t,n){return _(n,e,{},!1,t,!1)}var A={},D=[],L=[],T=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,V=[],R=[],q=0,P=!1,U=!1,B={};o(k.prototype,{setState:function(e,t){var n=this.state;this.__s||(this.__s=o({},n)),o(n,"function"==typeof e?e(n,this.props):e),t&&(this.__h=this.__h||[]).push(t),l(this)},forceUpdate:function(e){e&&(this.__h=this.__h||[]).push(e),N(this,2)},render:function(){}});var j={h:n,createElement:n,cloneElement:r,Component:k,render:M,rerender:i,options:A};e.exports=j}()},function(e,t,n){e.exports=n(2)},function(e,t,n){"use strict";function o(e){if(!e.element)throw new Error("element is not defined");if(!e.id)throw new Error("id is not defined");if(!e.source)throw new Error("source is not defined");Array.isArray(e.source)&&(e.source=s(e.source)),(0,l.render)((0,l.createElement)(u.default,e),e.element)}var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},l=n(0),i=n(3),u=function(e){return e&&e.__esModule?e:{default:e}}(i),s=function(e){return function(t,n){n(e.filter(function(e){return-1!==e.toLowerCase().indexOf(t.toLowerCase())}))}};o.enhanceSelectElement=function(e){if(!e.selectElement)throw new Error("selectElement is not defined");if(!e.source){var t=[].filter.call(e.selectElement.options,function(t){return t.value||e.preserveNullOptions});e.source=t.map(function(e){return e.textContent||e.innerText})}if(e.onConfirm=e.onConfirm||function(t){var n=[].filter.call(e.selectElement.options,function(e){return(e.textContent||e.innerText)===t})[0];n&&(n.selected=!0)},e.selectElement.value||void 0===e.defaultValue){var n=e.selectElement.options[e.selectElement.options.selectedIndex];e.defaultValue=n.textContent||n.innerText}void 0===e.name&&(e.name=""),void 0===e.id&&(void 0===e.selectElement.id?e.id="":e.id=e.selectElement.id),void 0===e.autoselect&&(e.autoselect=!0);var l=document.createElement("span");e.selectElement.parentNode.insertBefore(l,e.selectElement),o(r({},e,{element:l})),e.selectElement.style.display="none",e.selectElement.id=e.selectElement.id+"-select"},e.exports=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){}function l(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){"function"!=typeof t&&null!==t||(e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t))}function u(){return!(!navigator.userAgent.match(/(iPod|iPhone|iPad)/g)||!navigator.userAgent.match(/AppleWebKit/g))}function s(e){return e>47&&e<58||32===e||8===e||e>64&&e<91||e>95&&e<112||e>185&&e<193||e>218&&e<223}function a(e){return y?{onInput:e}:g?{onChange:e}:void 0}t.__esModule=!0,t.default=void 0;var p,c,d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},f=n(0),h=n(4),m=o(h),_=n(5),v=o(_),y=!0,g=!1,b={13:"enter",27:"escape",32:"space",38:"up",40:"down"},w=function(){var e=document.createElement("x");return e.style.cssText="pointer-events:auto","auto"===e.style.pointerEvents}(),O=(c=p=function(e){function t(n){r(this,t);var o=l(this,e.call(this,n));return o.elementReferences={},o.state={focused:null,hovered:null,menuOpen:!1,options:n.defaultValue?[n.defaultValue]:[],query:n.defaultValue,selected:null},o.handleComponentBlur=o.handleComponentBlur.bind(o),o.handleKeyDown=o.handleKeyDown.bind(o),o.handleUpArrow=o.handleUpArrow.bind(o),o.handleDownArrow=o.handleDownArrow.bind(o),o.handleEnter=o.handleEnter.bind(o),o.handlePrintableKey=o.handlePrintableKey.bind(o),o.handleOptionBlur=o.handleOptionBlur.bind(o),o.handleOptionClick=o.handleOptionClick.bind(o),o.handleOptionFocus=o.handleOptionFocus.bind(o),o.handleOptionMouseDown=o.handleOptionMouseDown.bind(o),o.handleOptionMouseEnter=o.handleOptionMouseEnter.bind(o),o.handleOptionMouseOut=o.handleOptionMouseOut.bind(o),o.handleInputBlur=o.handleInputBlur.bind(o),o.handleInputChange=o.handleInputChange.bind(o),o.handleInputFocus=o.handleInputFocus.bind(o),o.pollInputElement=o.pollInputElement.bind(o),o.getDirectInputChanges=o.getDirectInputChanges.bind(o),o}return i(t,e),t.prototype.componentDidMount=function(){this.pollInputElement()},t.prototype.componentWillUnmount=function(){clearTimeout(this.$pollInput)},t.prototype.pollInputElement=function(){var e=this;this.getDirectInputChanges(),this.$pollInput=setTimeout(function(){e.pollInputElement()},100)},t.prototype.getDirectInputChanges=function(){var e=this.elementReferences[-1];e&&e.value!==this.state.query&&this.handleInputChange({target:{value:e.value}})},t.prototype.componentDidUpdate=function(e,t){var n=this.state.focused,o=null===n,r=t.focused!==n;r&&!o&&this.elementReferences[n].focus();var l=-1===n,i=r&&null===t.focused;if(l&&i){var u=this.elementReferences[n];u.setSelectionRange(0,u.value.length)}},t.prototype.hasAutoselect=function(){return!u()&&this.props.autoselect},t.prototype.templateInputValue=function(e){var t=this.props.templates&&this.props.templates.inputValue;return t?t(e):e},t.prototype.templateSuggestion=function(e){var t=this.props.templates&&this.props.templates.suggestion;return t?t(e):e},t.prototype.handleComponentBlur=function(e){var t=this.state,n=t.options,o=t.query,r=t.selected,l=void 0;this.props.confirmOnBlur?(l=e.query||o,this.props.onConfirm(n[r])):l=o,this.setState({focused:null,menuOpen:e.menuOpen||!1,query:l,selected:null})},t.prototype.handleOptionBlur=function(e,t){var n=this.state,o=n.focused,r=n.menuOpen,l=n.options,i=n.selected,s=null===e.relatedTarget,a=e.relatedTarget===this.elementReferences[-1],p=o!==t&&-1!==o;if(!p&&s||!p&&!a){var c=r&&u();this.handleComponentBlur({menuOpen:c,query:this.templateInputValue(l[i])})}},t.prototype.handleInputBlur=function(e){var t=this.state,n=t.focused,o=t.menuOpen,r=t.options,l=t.query,i=t.selected;if(-1===n){var s=o&&u(),a=u()?l:this.templateInputValue(r[i]);this.handleComponentBlur({menuOpen:s,query:a})}},t.prototype.handleInputChange=function(e){var t=this,n=this.props,o=n.minLength,r=n.source,l=n.showAllValues,i=this.hasAutoselect(),u=e.target.value,s=0===u.length,a=this.state.query.length!==u.length,p=u.length>=o;this.setState({query:u}),l||!s&&a&&p?r(u,function(e){var n=e.length>0;t.setState({menuOpen:n,options:e,selected:i&&n?0:-1})}):!s&&p||this.setState({menuOpen:!1,options:[]})},t.prototype.handleInputClick=function(e){this.handleInputChange(e)},t.prototype.handleInputFocus=function(e){this.setState({focused:-1})},t.prototype.handleOptionFocus=function(e){this.setState({focused:e,hovered:null,selected:e})},t.prototype.handleOptionMouseEnter=function(e,t){this.setState({hovered:t})},t.prototype.handleOptionMouseOut=function(e,t){this.setState({hovered:null})},t.prototype.handleOptionClick=function(e,t){var n=this.state.options[t],o=this.templateInputValue(n);this.props.onConfirm(n),this.setState({focused:-1,menuOpen:!1,query:o,selected:-1}),this.forceUpdate()},t.prototype.handleOptionMouseDown=function(e){e.preventDefault()},t.prototype.handleUpArrow=function(e){e.preventDefault();var t=this.state,n=t.menuOpen,o=t.selected;-1!==o&&n&&this.handleOptionFocus(o-1)},t.prototype.handleDownArrow=function(e){var t=this;if(e.preventDefault(),this.props.showAllValues&&!1===this.state.menuOpen)e.preventDefault(),this.props.source("",function(e){t.setState({menuOpen:!0,options:e,selected:0,focused:0,hovered:null})});else if(!0===this.state.menuOpen){var n=this.state,o=n.menuOpen,r=n.options,l=n.selected,i=l!==r.length-1,u=i&&o;u&&this.handleOptionFocus(l+1)}},t.prototype.handleSpace=function(e){var t=this;this.props.showAllValues&&!1===this.state.menuOpen&&(e.preventDefault(),this.props.source("",function(e){t.setState({menuOpen:!0,options:e})})),-1!==this.state.focused&&(e.preventDefault(),this.handleOptionClick(e,this.state.focused))},t.prototype.handleEnter=function(e){this.state.menuOpen&&(e.preventDefault(),this.state.selected>=0&&this.handleOptionClick(e,this.state.selected))},t.prototype.handlePrintableKey=function(e){var t=this.elementReferences[-1];e.target===t||t.focus()},t.prototype.handleKeyDown=function(e){switch(b[e.keyCode]){case"up":this.handleUpArrow(e);break;case"down":this.handleDownArrow(e);break;case"space":this.handleSpace(e);break;case"enter":this.handleEnter(e);break;case"escape":this.handleComponentBlur({query:this.state.query});break;default:s(e.keyCode)&&this.handlePrintableKey(e)}},t.prototype.render=function(){var e=this,t=this.props,n=t.cssNamespace,o=t.displayMenu,r=t.id,l=t.minLength,i=t.name,u=t.placeholder,s=t.required,p=t.showAllValues,c=t.tNoResults,h=t.tStatusQueryTooShort,_=t.tStatusNoResults,v=t.tStatusSelectedOption,y=t.tStatusResults,g=t.dropdownArrow,b=this.state,O=b.focused,C=b.hovered,x=b.menuOpen,E=b.options,N=b.query,S=b.selected,I=this.hasAutoselect(),k=-1===O,M=0===E.length,A=0!==N.length,D=N.length>=l,L=this.props.showNoOptionsFound&&k&&M&&A&&D,T=n+"__wrapper",V=n+"__input",R=null!==O,q=R?" "+V+"--focused":"",P=this.props.showAllValues?" "+V+"--show-all-values":" "+V+"--default",U=n+"__dropdown-arrow-down",B=-1!==O&&null!==O,j=n+"__menu",F=j+"--"+o,W=x||L,K=j+"--"+(W?"visible":"hidden"),H=n+"__option",Q=n+"__hint",$=this.templateInputValue(E[S]),z=$&&0===$.toLowerCase().indexOf(N.toLowerCase()),G=z&&I?N+$.substr(N.length):"",J=w&&G,X=void 0;return p&&"string"==typeof(X=g({className:U}))&&(X=(0,f.createElement)("div",{className:n+"__dropdown-arrow-down-wrapper",dangerouslySetInnerHTML:{__html:X}})),(0,f.createElement)("div",{className:T,onKeyDown:this.handleKeyDown,role:"combobox","aria-expanded":x?"true":"false"},(0,f.createElement)(m.default,{length:E.length,queryLength:N.length,minQueryLength:l,selectedOption:this.templateInputValue(E[S]),tQueryTooShort:h,tNoResults:_,tSelectedOption:v,tResults:y}),J&&(0,f.createElement)("span",null,(0,f.createElement)("input",{className:Q,readonly:!0,tabIndex:"-1",value:G})),(0,f.createElement)("input",d({"aria-activedescendant":!!B&&r+"__option--"+O,"aria-owns":r+"__listbox",autoComplete:"off",className:""+V+q+P,id:r,onClick:function(t){return e.handleInputClick(t)},onBlur:this.handleInputBlur},a(this.handleInputChange),{onFocus:this.handleInputFocus,name:i,placeholder:u,ref:function(t){e.elementReferences[-1]=t},type:"text",role:"textbox",required:s,value:N})),X,(0,f.createElement)("ul",{className:j+" "+F+" "+K,id:r+"__listbox",role:"listbox"},E.map(function(t,n){var o=-1===O?S===n:O===n,l=o&&null===C?" "+H+"--focused":"",i=n%2?" "+H+"--odd":"";return(0,f.createElement)("li",{"aria-selected":O===n,className:""+H+l+i,dangerouslySetInnerHTML:{__html:e.templateSuggestion(t)},id:r+"__option--"+n,key:n,onFocusOut:function(t){return e.handleOptionBlur(t,n)},onClick:function(t){return e.handleOptionClick(t,n)},onMouseDown:e.handleOptionMouseDown,onMouseEnter:function(t){return e.handleOptionMouseEnter(t,n)},onMouseOut:function(t){return e.handleOptionMouseOut(t,n)},ref:function(t){e.elementReferences[n]=t},role:"option",tabIndex:"-1"})}),L&&(0,f.createElement)("li",{className:H+" "+H+"--no-results"},c())))},t}(f.Component),p.defaultProps={autoselect:!1,cssNamespace:"autocomplete",defaultValue:"",displayMenu:"inline",minLength:0,name:"input-autocomplete",placeholder:"",onConfirm:function(){},confirmOnBlur:!0,showNoOptionsFound:!0,showAllValues:!1,required:!1,tNoResults:function(){return"No results found"},dropdownArrow:v.default},c);t.default=O},function(e,t,n){"use strict";function o(e,t){}function r(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){"function"!=typeof t&&null!==t||(e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t))}t.__esModule=!0,t.default=void 0;var i,u,s=n(0),a=(u=i=function(e){function t(){var n,l,i;o(this,t);for(var u=arguments.length,s=Array(u),a=0;a<u;a++)s[a]=arguments[a];return n=l=r(this,e.call.apply(e,[this].concat(s))),l.state={bump:!1},i=n,r(l,i)}return l(t,e),t.prototype.componentWillReceiveProps=function(e){e.queryLength!==this.props.queryLength&&this.setState(function(e){return{bump:!e.bump}})},t.prototype.render=function(){var e=this.props,t=e.length,n=e.queryLength,o=e.minQueryLength,r=e.selectedOption,l=e.tQueryTooShort,i=e.tNoResults,u=e.tSelectedOption,a=e.tResults,p=this.state.bump,c=n<o,d=0===t,f=r?u(r,t):"",h=null;return h=c?l(o):d?i():a(t,f),(0,s.createElement)("div",{"aria-atomic":"true","aria-live":"polite",role:"status",style:{border:"0",clip:"rect(0 0 0 0)",height:"1px",marginBottom:"-1px",marginRight:"-1px",overflow:"hidden",padding:"0",position:"absolute",whiteSpace:"nowrap",width:"1px"}},h,(0,s.createElement)("span",null,p?",":",,"))},t}(s.Component),i.defaultProps={tQueryTooShort:function(e){return"Type in "+e+" or more characters for results."},tNoResults:function(){return"No search results."},tSelectedOption:function(e,t){return e+" (1 of "+t+") is selected."},tResults:function(e,t){var n={result:1===e?"result":"results",is:1===e?"is":"are"};return e+" "+n.result+" "+n.is+" available. "+t}},u);t.default=a},function(e,t,n){"use strict";t.__esModule=!0;var o=n(0),r=function(e){var t=e.className;return(0,o.createElement)("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",className:t,focusable:"false"},(0,o.createElement)("g",{stroke:"none",fill:"none","fill-rule":"evenodd"},(0,o.createElement)("polygon",{fill:"#000000",points:"0 0 22 0 11 17"})))};t.default=r}])});


function collapsibleTableBodies(table) {

  var headers = table.querySelectorAll('.header');

  for (var i = 0; i < headers.length; i++) {

    var header = headers[i];

    if (!header.classList.contains('empty')) {
      header.addEventListener('click', function(event) {
        var tbody = event.target.parentElement.parentElement
        tbody.classList.toggle('collapsed')
      })
    }
  }

}



function ethnicityDataValueFields(fieldset) {

  var fieldset = fieldset;

  if (
    'querySelector' in document &&
    'addEventListener' in document &&
    Function.prototype.bind
    ) {

    var ethnicityCategorisationSelect, broadValuesCheckbox;
    setup()
  }

  function setup() {

    if (fieldset) {

      ethnicityCategorisationSelect = fieldset.querySelector('select.ethnicity-categorisation')
      broadValuesCheckbox = fieldset.querySelector('input.broad-values')

      if (ethnicityCategorisationSelect && broadValuesCheckbox) {
        ethnicityCategorisationSelect.addEventListener('change', selectChanged.bind(this));
        updateBroadValuesCheckboxStatus();
      }
    }

  }

  function updateBroadValuesCheckboxStatus() {

    var selectedOption = ethnicityCategorisationSelect.selectedOptions[0];

    if (selectedOption.getAttribute('data-parents') == 'true') {
      broadValuesCheckbox.removeAttribute('disabled')
    } else {
      broadValuesCheckbox.checked = false;
      broadValuesCheckbox.setAttribute('disabled', 'disabled')
    }
  }

  function selectChanged() {
    updateBroadValuesCheckboxStatus();
  }

}

var govukGovernmentOrganisationsAutocomplete = function(options) {

  var sourceSelect = function(query, callback) {

    var optionsWithAValue = [].filter.call(options.selectElement.options, function(option) {
      return option.value != ''
    })

    var orgs = optionsWithAValue.map(function(select) {

      var dataAbbreviations = select.getAttribute('data-abbreviations');
      dataAbbreviations = dataAbbreviations ? dataAbbreviations.split('|') : []

      var dataOtherNames = select.getAttribute('data-other-names');
      dataOtherNames = dataOtherNames ? dataOtherNames.split('|') : []

      return {
        'current_name': select.label,
        'abbreviations': dataAbbreviations,
        'other_names': dataOtherNames
      }
    })

    var regexes = query.trim().split(/\s+/).map(function(word) {
      return new RegExp('\\b' + word, 'i')
    })

    var matches = orgs.map(function(organisation) {

      var allNames = [organisation.current_name]
        .concat(organisation.other_names)
        .concat(organisation.abbreviations)
        .filter(function(name) { return name })

      organisation['resultPosition'] = null


      for (var i = 0; i < allNames.length; i++) {

        var matches = regexes.reduce(function(acc, regex) {

          matchPosition = allNames[i].search(regex)
          if (matchPosition > -1) {
            acc.count += 1

            if (acc.lowestPosition == -1 || matchPosition < acc.lowestPosition) {
              acc.lowestPosition = matchPosition
            }
          }

          return acc;

        }, {'count': 0, 'lowestPosition': -1})


        if (matches.count == regexes.length && (organisation['resultPosition'] == null || matches.lowestPosition < organisation['resultPosition'])) {
          organisation['resultPosition'] = matches.lowestPosition
        }
      }

      return organisation

    })

    var filteredMatches = matches.filter(function(organisation) {
      return (organisation['resultPosition'] != null )
    })

    var sortedFilteredMatches = filteredMatches.sort(function(organisationA, organisationB) {

      if (organisationA['resultPosition'] < organisationB['resultPosition'] ) {
        return -1
      } else if (organisationA['resultPosition'] > organisationB['resultPosition'] ) {
        return 1
      } else {
        return 0
      }
    })

    var results = sortedFilteredMatches.map(function(organisation) { return organisation['current_name'] })

    return callback(results)
  }


  options.source = sourceSelect

  accessibleAutocomplete.enhanceSelectElement(options)

}


/* Show or Hide content controlled by a Radio button or Checkbox */
function showHideControl(element) {

  if (
      document.querySelectorAll &&
      Function.prototype.bind &&
      ('classList' in document.createElement('_'))
    ) {

    var element = element;
    var elementControlled = null;
    setup()

  }

  function setup() {

    var elementControlledId = element.getAttribute('aria-controls')
    var elementName = element.getAttribute('name');

    if (elementControlledId) {
      elementControlled = document.getElementById(elementControlledId);
    }

    if (elementControlled) {

      var allRadioButtonsInSameGroup = document.querySelectorAll('input[name=' + elementName + ']');

      for (var i = allRadioButtonsInSameGroup.length - 1; i >= 0; i--) {
        allRadioButtonsInSameGroup[i].addEventListener('change', inputChanged.bind(this));
      }

    }

    expandOrCollapseTarget(element.checked)
  }

  function expandOrCollapseTarget(expand) {
    if (expand) {
      elementControlled.classList.remove('js-hidden');
    } else {
      elementControlled.classList.add('js-hidden');
    }
  }

  function inputChanged(event) {
    expandOrCollapseTarget(element.checked);
    element.setAttribute('aria-expanded', element.checked);
  }

}



function ukCountriesSelect(element) {

  this.element = element;

  var countryInputs, ukInput;
  setup();

  function setup() {

    if (!(
      this.element &&
      'querySelector' in this.element &&
      'querySelectorAll' in this.element
    )) { return; }

    ukInput = document.createElement('input')
    ukInput.setAttribute('type', 'checkbox')
    ukInput.setAttribute('id', 'uk')

    var ukInputLabel = document.createElement('label')
    ukInputLabel.setAttribute('for', 'uk')
    ukInputLabel.textContent = 'All (United Kingdom)'

    var ukInputContainer = document.createElement('div')
    ukInputContainer.setAttribute('class', 'multiple-choice uk')

    ukInputContainer.appendChild(ukInput)
    ukInputContainer.appendChild(ukInputLabel)

    var legend = this.element.querySelector('legend')

    if (!legend) {
      console.warn('missing legend for UK fieldset');
      return;
    }

    legend.parentElement.insertBefore(ukInputContainer, legend.nextSibling)

    if (ukInput) {
      ukInput.addEventListener('change', ukChanged)

      countryInputs = this.element.querySelectorAll('input.country')

      for (var i = countryInputs.length - 1; i >= 0; i--) {
        countryInputs[i].addEventListener('change', countryChanged)
      }

      countryChanged();

    }

  }

  function countryChanged(event) {

    var checkedCountries = 0;

    for (var i = countryInputs.length - 1; i >= 0; i--) {

      if (countryInputs[i].checked) {
        checkedCountries += 1;
      }

    }

    ukInput.checked = (checkedCountries == countryInputs.length);

  }

  function ukChanged() {

    for (var i = countryInputs.length - 1; i >= 0; i--) {
      countryInputs[i].checked = ukInput.checked;
    }

  }

}
/**
 * Created by Tom.Ridd on 25/02/2018.

rd-builder provides common functions that are required by both the chartbuilder and tablebuilder screens

specifically
- validate that data does not have multiple rows that correspond to a single data point 
- validate that data has coverage of every data point
- provide useful error messages when data is invalid

 */

// Forms of data error
var DATA_ERROR_DUPLICATION = "duplication";
var DATA_ERROR_MISSING_DATA = "missing data";
var DATA_ERROR_SETTINGS_ERROR = "settings";




// ---------------------------------------------------------------------------
// PUBLIC
// ---------------------------------------------------------------------------


function validateData(data, categoryColumn, groupColumn) {
    var errors = [];
    var dataRows = _.clone(data);
    var headerRow = dataRows.shift();
    var lowerHeaderRow = _.map(headerRow, function(m) { return m.trim().toLowerCase()})

    var categoryIndex = index_of_column_named(lowerHeaderRow, categoryColumn);
    if(categoryIndex === null) {
        return [{'error': 'could not find data column', 'column': categoryColumn, 'errorType': DATA_ERROR_SETTINGS_ERROR}]
    }
    if(groupColumn !== null) {
        var groupIndex = index_of_column_named(lowerHeaderRow, groupColumn);
        if(groupIndex === null) {
            return [{'error': 'could not find data column', 'column': groupColumn, 'errorType': DATA_ERROR_SETTINGS_ERROR}]
        } else {
            return validateGroupedData(dataRows, categoryIndex, groupIndex, categoryColumn, groupColumn)
        }
    } else {
        return validateSimpleData(dataRows, categoryIndex, categoryColumn)
    }
}

function validateDataDuplicatesOnly(data, categoryColumn, groupColumn) {
    var errors = [];
    var dataRows = _.clone(data);
    var headerRow = dataRows.shift();
    var lowerHeaderRow = _.map(headerRow, function(m) { return m.trim().toLowerCase(); });
    var categoryIndex = index_of_column_named(lowerHeaderRow, categoryColumn);

    if(categoryIndex === null) {
        return [{'error': 'could not find data column', 'column': categoryColumn}]
    }
    if(groupColumn !== null) {
        var groupIndex = index_of_column_named(lowerHeaderRow, groupColumn);

        if(groupIndex === null) {
            return [{'error': 'could not find data column', 'column': groupColumn}]
        } else {
            return validateGroupedDataDuplicates(dataRows, categoryIndex, groupIndex)
        }
    } else {
        return validateSimpleData(dataRows, categoryIndex)
    }
}





// ---------------------------------------------------------------------------
// SIMPLE DATA (not cross tab, multiseries, panel, etc...)
// ---------------------------------------------------------------------------

function validateSimpleData(data, categoryIndex, categoryColumn) {
    var duplicateErrors = [];

    var dict = {};
    _.forEach(data, function (row) {
       var value = row[categoryIndex];
        if(value in dict){
            // wrap in if to make sure we don't add multiple error messages
           if(dict[value] !== 'added to errors') {
               duplicateErrors.push({
                   'error': 'duplicate data',
                   'category': value,
                   'categoryColumn': categoryColumn,
                   'errorType': DATA_ERROR_DUPLICATION
               });
               dict[value] = 'added to errors'
           }
        } else {
           dict[value] = 'value in dict'
        }
    });

    return duplicateErrors;
}





// ---------------------------------------------------------------------------
// GROUPED DATA VALIDATION (cross tab, multiseries, panel, etc...)
// ---------------------------------------------------------------------------

function validateGroupedData(data, categoryIndex, groupIndex, categoryColumn, groupColumn) {
    var completeErrors = validateGroupedDataCompleteness(data, categoryIndex, groupIndex, categoryColumn, groupColumn);
    var duplicateErrors = validateGroupedDataDuplicates(data, categoryIndex, groupIndex, categoryColumn, groupColumn);

    return completeErrors.concat(duplicateErrors);
}

function validateGroupedDataCompleteness(data, categoryIndex, groupIndex, categoryColumn, groupColumn) {
    var rowItems = _.uniq(_.map(data, function(item) { return item[categoryIndex]; }));
    var columnItems = _.uniq(_.map(data, function(item) { return item[groupIndex]; }));
    var errors = [];

    var mapOfPairs = _.object(_.map(rowItems, function(item) {
       return [item, _.map(_.filter(data, function(row) { return row[categoryIndex] === item}), function (row) {
            return row[groupIndex];
       })];
    }));

    _.forEach(rowItems, function (row) {
        _.forEach(columnItems, function (col) {
            if(!_.contains(mapOfPairs[row], col)) {
                errors.push({'error':'missing data', 'category': row, 'group': col, 'categoryColumn': categoryColumn, 'groupColumn': groupColumn, 'errorType': DATA_ERROR_MISSING_DATA})
            }
        })
    });

    return errors
}

function validateGroupedDataDuplicates(data, categoryIndex, groupIndex, categoryColumn, groupColumn) {
    var errors = [];

    var groupValuesUsedByCategory = {};
    _.forEach(data, function (row) {
        var categoryValue = row[categoryIndex];
        var groupValue = row[groupIndex];
        if(categoryValue in groupValuesUsedByCategory) {
            if(groupValue in groupValuesUsedByCategory[categoryValue]) {
                errors.push({'error':'duplicate data', 'category': row[categoryIndex], 'group':row[groupIndex], 'categoryColumn': categoryColumn, 'groupColumn': groupColumn, 'errorType': DATA_ERROR_DUPLICATION})
            } else {
                groupValuesUsedByCategory[categoryValue][groupValue] = 1;
            }
        } else {
            groupValuesUsedByCategory[categoryValue] = {};
            groupValuesUsedByCategory[categoryValue][groupValue] = 1;
        }
    });

    return errors;
}





// ---------------------------------------------------------------------------
// ERROR REPORTING
// ---------------------------------------------------------------------------

function errorDescription(error) {
    switch (error.errorType) {
      case DATA_ERROR_SETTINGS_ERROR:
        return "Column '" + error.column + "' not found";

      case DATA_ERROR_MISSING_DATA:
        return "The data is missing a row for " + error.categoryColumn + " = '" + error.category + "' and " + error.groupColumn + " = '" + error.group + "'"

      case DATA_ERROR_DUPLICATION:
        if('group' in error) {
            return "The data has duplicate entries for the rows with " + error.categoryColumn + " = '" + error.category + "' and " + error.groupColumn + " = '" + error.group + "'"
        } else {
            return "The data has duplicate entries for " + error.categoryColumn + " = '" + error.category + "'"
        }
    }
}

function errorResolutionHint(error) {
    switch (error.errorType) {
      case DATA_ERROR_SETTINGS_ERROR:
        return "Make sure the column values selected for this table are valid";

      case DATA_ERROR_MISSING_DATA:
        return "Add rows to your source spreadsheet and try again";
        
      case DATA_ERROR_DUPLICATION:
        return "Remove data rows in your source spreadsheet and try again"

    }
}







// If we're running under Node - required for testing
if(typeof exports !== 'undefined') {
    var _ = require('../charts/vendor/underscore-min');
    var dataTools = require('../charts/rd-data-tools');
    var index_of_column_named = dataTools.index_of_column_named;

    exports.validateSimpleData = validateSimpleData;
    exports.validateGroupedData = validateGroupedData;
    exports.validateData = validateData;
    exports.DATA_ERROR_DUPLICATION = DATA_ERROR_DUPLICATION;
    exports.DATA_ERROR_MISSING_DATA = DATA_ERROR_MISSING_DATA;
    exports.DATA_ERROR_SETTINGS_ERROR = DATA_ERROR_SETTINGS_ERROR;
}
/**
 * Created by Tom.Ridd on 05/05/2017.

rd-chart-objects builds a chartObject with input and settings provided in the Chart Builder interface 

- build chartObjects for all supported chart types (bar, line, component, panel bar, panel line)
- store sufficient data rd-graph.js can render a chart


building the chart objects it also does data transforms required by stories in  

specifically...
- sorting data points by a specified order
- sorting series by a specified order


THERE IS INAPPROPRIATE SEPARATION OF POWERS BETWEEN HERE AND rd-graph.js

THE PARENT COLOUR SECTION IS TO DO WITH DISPLAY, NOT DATA CONTENT

 */

var defaultParentColor = '#2B8CC4';
var defaultChildColor = '#B3CBD9';
var VERSION = '1.1'; // panel charts include sort option
var BAR_CHART = 'bar'
var LINE_CHART = 'line'
var COMPONENT_CHART = 'component'
var PANEL_BAR_CHART = 'panel_bar'
var PANEL_LINE_CHART = 'panel_line'




// ---------------------------------------------------------------------------
// CHART OBJECT GENERATORS
// build chart settings into a ChartObject for storage and rendering using rd-graph.js
// ---------------------------------------------------------------------------



function buildChartObject(data, chart_type, value_column, 
    category_column, secondary_column, parent_column, category_order_column, secondary_order_column, 
    chart_title, x_axis_label, y_axis_label, number_format, 
    null_value) {

    // data: an array of data including headers
    // chart_type: a chart type constant (see above)
    // 
    // following arguments should be the string headers of the columns with data
    //
    // value_column: chart values (current defaults to 'value')
    // category_column: the primary chart column (bars, series, component groups)
    // secondary_column (optional): the secondary chart column (sub-bars, time, panels, component items)
    // parent_column (optional): the column item parent values may be kept in
    // category_order_column (optional): to sort categories
    // secondary_order_column (optional): to sort items such as panels or component items
    //
    // other values should be self explanatory

    // case statement to build chart based on type

    var null_column_value = null_value ? null_value : '[None]';
    switch(chart_type.toLowerCase()) {
        case BAR_CHART:
            var dataRows = _.clone(data);
            var headerRow = dataRows.shift();
            if(secondary_column === null_column_value || secondary_column === null) {
                return barchartSingleObject(headerRow, dataRows, category_column, parent_column, category_order_column, chart_title, x_axis_label, y_axis_label, number_format);
            } else {
                return barchartDoubleObject(headerRow, dataRows, category_column, secondary_column, parent_column, category_order_column, chart_title, x_axis_label, y_axis_label, number_format);
            }

        case LINE_CHART:
            return linechartObject(data, category_column, secondary_column, chart_title, x_axis_label, y_axis_label, number_format, category_order_column);

        case COMPONENT_CHART:
            return componentChartObject(data, category_column, secondary_column, chart_title, x_axis_label, y_axis_label, number_format, row_order_column, secondary_order_column) ;
        case PANEL_BAR_CHART:
            return panelBarchartObject(data, category_column, secondary_column, chart_title, x_axis_label, y_axis_label, number_format, category_order_column, secondary_order_column);

        case PANEL_LINE_CHART:
            return panelLinechartObject(data, secondary_column, category_column, chart_title, x_axis_label, y_axis_label, number_format, secondary_order_column) ;
        default:
            return null;
    }
}

// -----------------------------------------------------------------------------------------







// ---------------------------------------------------------------------------
// CHARTOBJECT GENERATORS
// build chart settings into a ChartObject for storage and rendering using rd-graph.js
// ---------------------------------------------------------------------------


// ----------------------------------
// BARCHART
// ----------------------------------

function barchartObject(data, primary_column, secondary_column, parent_column, order_column,
                        chart_title, x_axis_label, y_axis_label, number_format) {
    var dataRows = _.clone(data);
    var headerRow = dataRows.shift();
    if(isSimpleBarchart(secondary_column)) {
        return barchartSingleObject(headerRow, dataRows, primary_column, parent_column, order_column, chart_title, x_axis_label, y_axis_label, number_format);
    } else {
        return barchartDoubleObject(headerRow, dataRows, primary_column, secondary_column, parent_column, order_column, chart_title, x_axis_label, y_axis_label, number_format);
    }
}

function isSimpleBarchart(column_name) {
    return column_name === '[None]' || column_name === null;
}

function barchartSingleObject(headerRow, dataRows, category_column, parent_column, order_column, chart_title, x_axis_label, y_axis_label, number_format) {
    var indices = getIndices(headerRow, category_column, null, parent_column, order_column);

    var categories = uniqueCategories(dataRows, indices['category'], indices['order']);
    var values = _.map(categories, function(category) {
        return valueForCategory(dataRows, indices['category'], indices['value'], indices['parent'], category);
    });

    var parents = [];
    if(indices['parent'] !== null) {
        parents = _.unique(_.map(dataRows, function(row) { return row[indices['parent']]; }));
    }

    return {
        'type':'bar',
        'title':{'text':chart_title},
        'parent_child': indices['parent'] !== null,
        'xAxis':{'title':{'text':x_axis_label}, 'categories':categories},
        'yAxis':{'title':{'text':y_axis_label}},
        'series': [{'name':category_column, 'data': values}],
        'number_format':number_format,
        'parents':parents,
        'version':VERSION
    };
}

function barchartDoubleObject(headerRow, dataRows, category1, category2, parent_column, order_column, chart_title, x_axis_label, y_axis_label, number_format) {
    var indices = getIndices(headerRow, category1, category2, parent_column, order_column);

    var categories = uniqueCategories(dataRows, indices['category'], indices['order']);

    var series = uniqueDataInColumnMaintainOrder(dataRows, indices['secondary']);

    var seriesData = [];
    series.forEach(function(s){
        var seriesRows = _.filter(dataRows, function(row) { return row[indices['secondary']] === s;});
        var values = [];
        _.forEach(categories, function(category) {
            values.push(valueForCategory(seriesRows, indices['category'], indices['value'], indices['parent'], category));
        });
        seriesData.push({'name':s, 'data': values});
    });

    return {
        'type':'bar',
        'title':{'text': chart_title},
        'xAxis':{'title':{'text':x_axis_label}, 'categories':categories},
        'yAxis':{'title':{'text':y_axis_label}},
        'series': sortChartSeries(seriesData),
        'number_format':number_format,
        'version':VERSION
    };
}




// ----------------------------------
// LINE CHART
// ----------------------------------

function linechartObject(data, categories_column, series_column, chart_title, x_axis_label, y_axis_label, number_format, series_order_column) {
    var dataRows = _.clone(data);
    var headerRow = dataRows.shift();
    var series_order_column_name = series_order_column === '[None]' ? null : series_order_column;

    var indices = getIndices(headerRow, categories_column, series_column, null, null, series_order_column_name);
    var categories = uniqueDataInColumnMaintainOrder(dataRows, indices['category']);
    var seriesNames = uniqueDataInColumnMaintainOrder(dataRows, indices['secondary']);

    /*
    This is going to require some major refactoring down line
    For now we are going to compromise with a degree of code ugliness, build tests, and then get to beautification
     */
    var series_index = indices['secondary'];
    var series_order_index = indices['custom'];
    if (series_order_index) {
        var order_values = _.map(seriesNames, function(series) {
            var index = _.findIndex(dataRows, function(row) {
                return row[series_index] === series;
            });
            return dataRows[index][series_order_index];
        });
        seriesNames = _.map(_.sortBy(_.zip(seriesNames, order_values), function(pair) { return pair[1]; }), function(pair) { return pair[0]; });
    }

    var chartSeries = [];
    _.forEach(seriesNames, function(seriesName) {
        var values = [];
        _.forEach(categories, function(category) {
            values.push(valueForCategoryAndSeries(dataRows, indices['category'], category, indices['secondary'], seriesName, indices['value']));
        });
        chartSeries.push({'name':seriesName, 'data':values});
    });

    return {
        'type':'line',
        'title':{'text':chart_title},
        'xAxis':{'title':{'text':x_axis_label}, 'categories':categories},
        'yAxis':{'title':{'text':y_axis_label}},
        'series': sortChartSeries(chartSeries),
        'number_format':number_format,
        'version':VERSION};
}




// ----------------------------------
// COMPONENT CHART
// ----------------------------------

function componentChartObject(data, grouping_column, series_column, chart_title, x_axis_label, y_axis_label, number_format, row_order_column, series_order_column) {

    var dataRows = _.clone(data);
    var headerRow = dataRows.shift();
    var indices = getIndices(headerRow, grouping_column, series_column, null, row_order_column, series_order_column);

    var groups = null;
    if(isUndefinedOrNull(row_order_column) || row_order_column === '[None]') {
        groups = uniqueDataInColumnMaintainOrder(dataRows, indices['category']);
    } else {
        groups = uniqueDataInColumnOrdered(dataRows, indices['category'], indices['order']);
    }

    var seriesNames = null;
    if(isUndefinedOrNull(series_order_column) || series_order_column === '[None]') {
        seriesNames = uniqueDataInColumnMaintainOrder(dataRows, indices['secondary']).reverse();
    } else {
        seriesNames = uniqueDataInColumnOrdered(dataRows, indices['secondary'], indices['custom']).reverse();
    }

    var chartSeries = seriesNames.map(function(seriesName)
    {
        var values = groups.map(function(group) {
            return valueForCategoryAndSeries(dataRows, indices['category'], group, indices['secondary'], seriesName, indices['value'])
        });
        return {'name': seriesName, 'data': values};
    });

    return {
        'type':'component',
        'title':{'text':chart_title},
        'xAxis':{'title':{'text':x_axis_label}, 'categories':groups},
        'yAxis':{'title':{'text':y_axis_label}},
        'series': chartSeries,
        'number_format':number_format,
        'version':VERSION
    };
}



// ----------------------------------
// PANEL BAR CHART
// ----------------------------------

function panelBarchartObject(data, category_column, panel_column, chart_title, x_axis_label, y_axis_label, number_format, category_order_column, panel_order_column) {
    var dataRows = _.clone(data);
    var headerRow = dataRows.shift();

    var indices = getIndices(headerRow, category_column, panel_column, null, category_order_column, panel_order_column);
    var categories = uniqueCategories(dataRows, indices['category'], indices['order']);

    var panelValues = null;
    if(isUndefinedOrNull(panel_order_column) || panel_order_column === '[None]') {
        panelValues = uniqueDataInColumnMaintainOrder(dataRows, indices['secondary']);
    } else {
        panelValues = uniqueDataInColumnOrdered(dataRows, indices['secondary'], indices['custom'])
    }

    var panels = panelValues.map(function(panelValue) {
        var panelRows = _.filter(dataRows, function(row) { return row[indices['secondary']] === panelValue;});

        var values = categories.map(function(category) {
           return valueForCategory(panelRows, indices['category'], indices['value'], indices['parent'], category);
        });

        return {
            'type':'small_bar',
            'title':{'text':panelValue},
            'xAxis':{'title':{'text':x_axis_label}, 'categories':categories},
            'yAxis':{'title':{'text':y_axis_label}},
            'series': [{'name':category_column, 'data': values}],
            'number_format':number_format
        };
    });

    return {
        'type': 'panel_bar_chart',
        'title': {'text': chart_title},
        'xAxis': {'title': {'text': x_axis_label}, 'categories': categories},
        'yAxis': {'title': {'text': y_axis_label}},
        'panels': panels,
        'version':VERSION
    }
}




// ----------------------------------
// PANEL LINE CHART
// ----------------------------------


function panelLinechartObject(data, x_axis_column, panel_column, chart_title, x_axis_label, y_axis_label, number_format, panel_order_column) {
    var dataRows = _.clone(data);
    var headerRow = dataRows.shift();
    var indices = getIndices(headerRow, panel_column, x_axis_column, null, null, panel_order_column);

    var panelNames = null;
    if(isUndefinedOrNull(panel_order_column) || panel_order_column === '[None]') {
        panelNames = uniqueDataInColumnMaintainOrder(dataRows, indices['category']);
    } else {
        panelNames = uniqueDataInColumnOrdered(dataRows, indices['category'], indices['custom'])
    }
    var xAxisNames = uniqueDataInColumn(dataRows, indices['secondary']);

    var panelCharts = _.map(panelNames, function(panelName) {
            var values = _.map(xAxisNames, function(category) {
                 return valueForCategoryAndSeries(dataRows, indices['secondary'], category, indices['category'], panelName, indices['value']);
            });

            return {'type':'line',
                'title':{'text':panelName},
                'xAxis':{'title':{'text':x_axis_label}, 'categories':xAxisNames},
                'yAxis':{'title':{'text':y_axis_label}},
                'series': [{'name':panelName, 'data':values}],
                'number_format':number_format
            };
        });

    return {
        'type':'panel_line_chart',
        'title':{'text':chart_title},
        'panels': panelCharts,
        'number_format':number_format,
        'version':VERSION
    };
}




// ---------------------------------------------------------------------------
// PROCESSING
// ---------------------------------------------------------------------------

function getIndices(headerRow, category_column, secondary_column, parent_column, order_column, custom_column) {
    var headersLower = _.map(headerRow, function(item) { return item.trim().toLowerCase();});

    var category = isUndefinedOrNull(category_column) ? null: index_of_column_named(headersLower, category_column);
    var order = isUndefinedOrNull(order_column) ? category : index_of_column_named(headersLower, order_column);
    var parent = isUndefinedOrNull(parent_column) ? null: index_of_column_named(headersLower, parent_column);
    var secondary = isUndefinedOrNull(secondary_column) ? null: index_of_column_named(headersLower, secondary_column);
    var custom = isUndefinedOrNull(custom_column) ? null: index_of_column_named(headersLower, custom_column);

    return {
        'category': category >= 0 ? category : null,
        'order': order >= 0 ? order : null,
        'secondary': secondary >= 0 ? secondary : null,
        'value': index_of_column_named(headersLower, 'value'),
        'parent': parent >= 0 ? parent : null,
        'custom': custom >= 0 ? custom : null
    };
}

function uniqueCategories(dataRows, categoryIndex, orderIndex) {

    if(orderIndex) {
        return uniqueDataInColumnOrdered(dataRows, categoryIndex, orderIndex);
    } else {
        return uniqueDataInColumnMaintainOrder(dataRows, categoryIndex);
    }
}

function valueForCategory(dataRows, categoryIndex, valueIndex, parentIndex, categoryValue) {

    var rows = dataRows.filter(function(row) { return row[categoryIndex] === categoryValue });
    if(rows.length === 0) {
        return {y: 0, category: categoryValue};
    } else {
        var row = rows[0];
        if(row[categoryIndex] === categoryValue) {
            var valueIsNumeric = isNumber(row[valueIndex]);
            if(parentIndex) {
                var parentValue = row[parentIndex];
                var relationships = {is_parent:parentValue === categoryValue,
                    is_child: parentValue !== categoryValue, parent:parentValue};
                if(relationships['is_parent']){
                    return {
                        y: valueIsNumeric ? parseFloat(row[valueIndex]) : 0,
                        relationships: relationships,
                        category: row[categoryIndex],
                        color: defaultParentColor,
                        text: valueIsNumeric ? 'number' : row[valueIndex]
                    };
                } else {
                    return {
                        y: valueIsNumeric ? parseFloat(row[valueIndex]) : 0,
                        relationships: relationships,
                        category: row[categoryIndex],
                        color: defaultChildColor,
                        text: valueIsNumeric ? 'number' : row[valueIndex]
                    };
                }
            } else {
                return {y: valueIsNumeric ? parseFloat(row[valueIndex]) : 0,
                    category: row[categoryIndex],
                    text: valueIsNumeric ? 'number' : row[valueIndex]};
            }
        }
    }
}


function valueForCategoryAndSeries(dataRows, categoryIndex, categoryValue, seriesIndex, seriesValue, valueIndex) {

    var rows = _.filter(dataRows, function(row) { return row[categoryIndex] === categoryValue && row[seriesIndex] === seriesValue });
    return rows.length > 0 ? parseFloat(rows[0][valueIndex]) : 0;
}

function isNumber(value) {
    return !isNaN(parseFloat(value));
}

function isUndefinedOrNull(value) {
    return value === undefined || value === null;
}



// ---------------------------------------------------------------------------
// SORTING
// ---------------------------------------------------------------------------

function sortChartSeries(serieses) {

    // check if these series are numerically sortable
    var invalidSerieses = serieses.filter(function(series) {
       return isNaN(toNumberSortValue(series.name))
    });
    if(invalidSerieses.length > 0) { return serieses; }

    // if series sortable assign a sort value
    serieses.forEach(function (series) {
        series.name_value = toNumberSortValue(series.name);
    });

    // return the sorted series
    return _.sortBy(serieses, function (series) {
        return series.name_value;
    })
}

function toNumberSortValue(value) {
    var floatVal = parseFloat(value);
    if(isNaN(floatVal)) {
    return parseFloat(value.substring(1));
    } else {
    return floatVal;
    }
}




// If we're running under Node - required for testing
if(typeof exports !== 'undefined') {
    var _ = require('../charts/vendor/underscore-min');
    var dataTools = require('../charts/rd-data-tools');
    var builderTools = require('../cms/rd-builder');

    var index_of_column_named = dataTools.index_of_column_named;
    var uniqueDataInColumnMaintainOrder = dataTools.uniqueDataInColumnMaintainOrder;
    var getColumnIndex = builderTools.getColumnIndex;

    exports.barchartObject = barchartObject;
    exports.linechartObject = linechartObject;
    exports.componentChartObject = componentChartObject;
    exports.panelLinechartObject = panelLinechartObject;
    exports.panelBarchartObject = panelBarchartObject;
}

/**
 * Created by Tom.Ridd on 25/05/2017.

rd-table-objects builds a tableObject with input and settings provided in the Table Builder interface 

- build tableObjects for all supported table types (simple, grouped)
- support tables with multiple value columns
- support parent-child relationships in the tables

building the table objects it also does data transforms required by stories from user research

specifically...
- support sorting both, one of, or neither of rows and columns
- inserting parent data rows where none exist

 */

var NONE_VALUE = '[None]';


// ---------------------------------------------------------------------------
// PUBLIC
// ---------------------------------------------------------------------------

function buildTableObject(data, title, subtitle, footer, row_column, parent_column, group_column, order_column, data_columns, column_captions, first_column_caption, group_order_column) {
    var table = null;
    if(!group_column || group_column === NONE_VALUE) {
        table = simpleTable(data, title, subtitle, footer, row_column, parent_column, data_columns, order_column, column_captions, first_column_caption);
    } else {
        table = groupedTable(data, title, subtitle, footer, row_column, parent_column, group_column, data_columns, order_column, column_captions, first_column_caption, group_order_column);
    }
    return preProcessTableObject(table);
}


// ---------------------------------------------------------------------------
// PREPROCESSING
// ---------------------------------------------------------------------------

function preProcessTableObject(tableObject) {
    if(tableObject.type === 'simple') {
        preProcessSimpleTableObject(tableObject);
    } else if(tableObject.type === 'grouped') {
        preProcessGroupedTableObject(tableObject);
    }
    return tableObject;
}


// ---------------------------------------------------------------------------
// SIMPLE TABLE
// ---------------------------------------------------------------------------

function simpleTable(data, title, subtitle, footer, category_column, parent_column, data_columns, order_column, column_captions, first_column_caption) {
    var dataRows = _.clone(data);
    var headerRow = dataRows.shift();
    var lowHeaders = _.map(headerRow, function(m) { return m.trim().toLowerCase(); })

    // var columnIndex = headerRow.indexOf(category_column);
    var columnIndex = index_of_column_named(lowHeaders, category_column);
    var data_column_indices = _.map(data_columns, function(data_column) { return index_of_column_named(lowHeaders, data_column); });

    var parentIndex = columnIndex;
    var hasParentChild = false;
    if(parent_column && parent_column !== NONE_VALUE) {
        parentIndex = index_of_column_named(lowHeaders, parent_column);
        hasParentChild = true;
    }

    if(order_column && order_column !== NONE_VALUE) {
        var sortIndex = index_of_column_named(lowHeaders, order_column);
    }

    var tableData = _.map(dataRows, function(item, index) {
        var relationships = {
                'is_parent':false,
                'is_child':false,
                'parent':item[columnIndex]
        };
        if(hasParentChild) {
            var parent = item[parentIndex];
            var child = item[columnIndex];
            relationships = {
                'is_parent': parent === child,
                'is_child': parent !== child,
                'parent': parent
            }
        }

        var values = _.map(data_column_indices, function (i) { return item[i]; });
        var sortValues = _.map(values, function (value) { return numVal(value); });

        if(sortIndex) {
            return {
                'category': item[columnIndex],
                'relationships': relationships,
                'order': item[sortIndex],
                'values': values,
                'sort_values': sortValues
            };
        } else {
            return {
                'category': item[columnIndex],
                'relationships': relationships,
                'order': index,
                'values': values,
                'sort_values': sortValues
            };
        }
    });

    tableData = _.sortBy(tableData, function(item) { return item['order'];});

    if(hasParentChild) {
        tableData = adjustSimpleTableDataForParents(tableData);
    }

    var first_column = first_column_caption == null ? category_column : first_column_caption;

    return {
        'type':'simple',
        'parent_child': hasParentChild,
        'header': title,
        'subtitle' :subtitle,
        'footer' :footer,
        'category':category_column,
        'columns': column_captions,
        'data': tableData,
        'category_caption': first_column
    };
}


// ---------------------------------
// PREPROCESSING
// ---------------------------------

function preProcessSimpleTableObject(tableObject) {
    
    var columnDps = columnDecimalPlaces(tableObject);
    var couldBeYear = columnCouldBeAYear(tableObject);

    tableObject.data = _.map(tableObject.data, function(item) {
        item.values = _.map(_.zip(item.values, columnDps, couldBeYear), function(cellTuple) {
            if(cellTuple[2] === false) {
                return formatNumberWithDecimalPlaces(cellTuple[0], cellTuple[1]);
            } else {
                return cellTuple[0];
            }
        });
        return item;
    });
}

function columnDecimalPlaces(tableObject) {
    var dps = [];
    // iterate through columns
    for(var i in tableObject.data[0].values) {

        // gather all the data for that column
        var series = _.map(tableObject.data, function(item) {
            return item.values[i];
        });
        dps.push(seriesDecimalPlaces(series));
    }
    return dps;
}

function columnCouldBeAYear(tableObject) {
    var years = [];

    // iterate through columns
    for(var i in tableObject.data[0].values) {

        // gather all the data for that column
        var series = _.map(tableObject.data, function(item) { return item.values[i]; });
        years.push(seriesCouldBeYear(series));
    }
    return years;
}



// ---------------------------------
// PARENTS
// ---------------------------------

function adjustSimpleTableDataForParents(tableData) {
    var fullData = addMissingSimpleTableParentItems(tableData);
    return reorderSimpleTableDataForParentChild(fullData);
}


function addMissingSimpleTableParentItems(tableData) {

    var parents = _.uniq(_.map(tableData, function (item) {
        return item['relationships']['parent'];
    }));

    var current_categories = _.map(tableData, function (item) {
        return item['category'];
    });
    var missing_parents = _.filter(parents, function (parent) {
        return !_.contains(current_categories, parent);
    });

    var newData = _.clone(tableData);
    var example = tableData[0];
    _.forEach(missing_parents, function (missing_parent) {

        // find order for the new parent by finding the minimum value for it's children and subtracting 1
        var parent_items = _.filter(tableData, function(item) { return item.relationships.parent === missing_parent; });
        var min_order = _.min(_.map(parent_items, function(item) { return item.order; })) - 1;

        var new_data_point = {
            'category': missing_parent,
            'order': min_order,
            'relationships': {'is_child': false, 'is_parent': true, 'parent': missing_parent},
            'sort_values': _.map(example['sort_values'], function (value) {
                return 0;
            }),
            'values': _.map(example.values, function (value) {
                return '';
            })
        };
        newData.push(new_data_point);
    });

    return newData;
}


function reorderSimpleTableDataForParentChild(tableData) {
    var item_dict = _.object(_.map(tableData, function(item) { return [item.category, item]; }));
    var parents = _.uniq(_.map(tableData, function(item) { return item['relationships']['parent']; }));

    var ordered_data = [];
    _.forEach(parents, function(parent) {
        ordered_data.push(item_dict[parent]);
        var parent_children = _.filter(tableData, function(item) { return item['category'] !== parent && item['relationships']['parent'] === parent; });
        ordered_data = ordered_data.concat(parent_children);
    });
    return ordered_data;
}







// ---------------------------------------------------------------------------
// GROUPED TABLE
// ---------------------------------------------------------------------------

function groupedTable(data, title, subtitle, footer,  category_column, parent_column, group_column, data_columns, order_column, column_captions, first_column_caption, group_order_column) {
    var DEFAULT_SORT = -2;
    var data_by_row = _.clone(data);
    var headerRow = data_by_row.shift();
    var lowHeaders = _.map(headerRow, function(m) { return m.trim().toLowerCase(); })


    // ------------------- FIND INDICES FOR THE COLUMNS --------------------------

    var columnIndex = index_of_column_named(lowHeaders, category_column);
    var data_column_indices = _.map(data_columns, function(data_column) { return index_of_column_named(lowHeaders, data_column); });

    var group_column_index = index_of_column_named(lowHeaders, group_column);

    var sortIndex = DEFAULT_SORT;
    if (order_column === null) {
        sortIndex = columnIndex;
    } else if(order_column !== NONE_VALUE) {
        sortIndex = index_of_column_named(lowHeaders, order_column);
    }

    var parentIndex = columnIndex;
    var hasParentChild = false;
    if(parent_column && parent_column !== NONE_VALUE) {
        parentIndex = index_of_column_named(lowHeaders, parent_column);
        hasParentChild = true;
    }

    // ----------------------- CONVERT TO DATA ITEM OBJECTS ----------------------
    var data_by_group = getDataByGroup(data_by_row, group_column_index, group_order_column, headerRow);
    var data_items_by_group = buildDataObjectsByGroup(data_by_group, data_by_row, group_column_index, columnIndex, hasParentChild, parentIndex, sortIndex, DEFAULT_SORT, data_column_indices);


    // ----------------------- ADJUSTMENTS FOR PARENT CHILD ----------------------
    data_items_by_group = adjustGroupedTableDataForParents(data_items_by_group);

    // --------------------- DATA VALUES (Values by row) -------------------------

    var partial_table = templateGroupTable(category_column, title, column_captions, data_items_by_group);

    var group_columns = [''].concat(_.map(partial_table.groups, function (group) { return group.group; } ));

    var row_categories = _.map(partial_table.groups[0].data, function(item) { return item.category; });
    var table_data = _.map(row_categories, function(category) { return dataItemWithCategory(partial_table, category); });
    table_data = _.sortBy(table_data, function(item) { return item['order'];});

    data_items_by_group = _.map(data_items_by_group, function (group) {
        group.data = _.sortBy(group.data, function(item) { return item['order'];});
        return group;
    });


    // --------------------- COMPLETE THE TABLE OBJECT --------------------------
    var first_column = first_column_caption == null ? category_column : first_column_caption;

    return {
        'group_columns': group_columns,
        'type':'grouped',
        'category': category_column,
        'group_column': group_column,
        'columns': column_captions,
        'data': table_data,
        'header':title,
        'subtitle':subtitle,
        'footer':footer,
        'groups': data_items_by_group,
        'parent_child': hasParentChild,
        'category_caption': first_column
    };
}

// ---------------------------------
// PREPROCESSING
// ---------------------------------


function preProcessGroupedTableObject(tableObject) {
    var columnDps = groupedTableDecimalPlaces(tableObject);
    var couldBeYear = groupedTableCouldBeAYear(tableObject);


    tableObject.groups = _.map(tableObject.groups, function(group) {
        group.data = _.map(group.data, function(item) {
           item.values = _.map(_.zip(item.values, columnDps, couldBeYear), function(cellTuple) {
                if(cellTuple[2] === false) {
                    return formatNumberWithDecimalPlaces(cellTuple[0], cellTuple[1]);
                } else {
                    return cellTuple[0];
                }
            });
            return item;
        });
        return group;
    });

    // update tableObject data
    tableObject.data = [];
    // for each row
    for(var rowNo in tableObject.groups[0].data) {
        // grab a prototype cell
        var row = _.clone(tableObject.groups[0].data[rowNo]);
        // fill it with all contents across the groups
        row.values = _.flatten(_.map(tableObject.groups, function(group) {
            return group.data[rowNo].values;
        }));
        row.sort_values = _.flatten(_.map(tableObject.groups, function(group) {
            return group.data[rowNo].sort_values;
        }));
        // add to the data
        tableObject.data.push(row)
    }


    var items = _.sortBy(tableObject.groups[0].data, function(item) { return item.order; });
    var rows = _.map(items, function(item) { return item.category; });
    _.forEach(rows, function(row) {
        var row_html = '<tr><th>' + row + '</th>';
        _.forEach(tableObject.groups, function(group) {
            var row_item = _.findWhere(group.data, {'category':row});
            _.forEach(_.zip(row_item.values, columnDps, couldBeYear), function(cellValues) {
                if(cellValues[2]) {
                    row_html = row_html + '<td>' + cellValues[0] + '</td>';
                } else {
                    row_html = row_html + '<td>' + formatNumberWithDecimalPlaces(cellValues[0], cellValues[1]) + '</td>';
                }
            });
        });
    });
}


function groupedTableDecimalPlaces(tableObject) {
    var dps = [];
    // iterate through columns
    for(var c in tableObject.groups[0].data[0].values) {

        // gather all data for a column
        var series = _.flatten(
            _.map(tableObject.groups, function(group) {
                return _.map(group.data, function(item) {
                    return item.values[c];
            })
        }));
        dps.push(seriesDecimalPlaces(series));
    }
    return dps;
}

function groupedTableCouldBeAYear(tableObject) {
    var years = [];
    // iterate through columns
    for(var c in tableObject.groups[0].data[0].values) {

        // gather all data for a column
        var series = _.flatten(
            _.map(tableObject.groups, function(group) {
                return _.map(group.data, function(item) {
                    return item.values[c];
            })
        }));
        years.push(seriesCouldBeYear(series));
    }
    return years;
}



// ---------------------------------
// DATA BUILDING
// ---------------------------------


function buildDataObjectsByGroup(group_values, dataRows, group_column_index, columnIndex, hasParentChild, parentIndex, sortIndex, DEFAULT_SORT, data_column_indices) {
    return _.map(group_values, function (group) {
        var group_data = _.filter(dataRows, function (item) {
            return item[group_column_index] === group;
        });
        var group_data_items = _.map(group_data, function (item, index) {
            var relationships = {
                'is_parent': false,
                'is_child': false,
                'parent': item[columnIndex]
            };
            if (hasParentChild) {
                var parent = item[parentIndex];
                var child = item[columnIndex];
                relationships = {
                    'is_parent': parent === child,
                    'is_child': parent !== child,
                    'parent': parent
                }
            }
            var sort_val = sortIndex === DEFAULT_SORT ? index : item[sortIndex];
            var values = _.map(data_column_indices, function (i) {
                return item[i]
            });
            var sortValues = _.map(values, function (value) {
                return numVal(value);
            });
            return {
                'category': item[columnIndex],
                'relationships': relationships,
                'order': sort_val,
                'values': values,
                'sort_values': sortValues
            }
        });
        return {'group': group, 'data': group_data_items};
    });
}

function getDataByGroup(data_by_row, group_column_index, group_order_column, headerRow) {
    var group_values = uniqueDataInColumnMaintainOrder(data_by_row, group_column_index);
    if (group_order_column && group_order_column !== NONE_VALUE) {
        var group_order_index = headerRow.indexOf(group_order_column);
        var order_values = _.map(group_values, function (item) {
            var index = _.findIndex(data_by_row, function (row) {
                return row[group_column_index] === item;
            });
            return data_by_row[index][group_order_index];
        });
        group_values = _.map(_.sortBy(_.zip(group_values, order_values), function (pair) {
            return pair[1];
        }), function (pair) {
            return pair[0];
        });
    }
    return group_values;
}

function dataItemWithCategory(partial_table_object, category) {
    var values = [];
    var sortValue = '';
    var parentValue = '';
    var relationships = {};

    _.forEach(partial_table_object.groups, function (group) {
        var category_item = _.findWhere(group.data, {'category': category});
        sortValue = category_item['order'];
        parentValue = category_item['parent'];
        relationships = category_item['relationships'];
        _.forEach(category_item.values, function (cell) {
            values.push(cell);
        })
    });

    var sortValues = _.map(values, function (val) { return numVal(val);});
    
    return {
        'category': category,
        'relationships': relationships,
        'parent': parentValue,
        'order': sortValue,
        'values': values,
        'sort_values': sortValues
    };
}


function templateGroupTable(category_column, title, column_captions, group_series) {
    return {
        'type': 'grouped',
        'category': category_column,
        'title': {'text': 'Grouped Table'},
        'header': title,
        'columns': column_captions,
        'groups': group_series
    };
}




// ---------------------------------
// PARENT-CHILD 
// ---------------------------------


function adjustGroupedTableDataForParents(tableData) {
    var fullData = addMissingGroupedTableParentItems(tableData);
    return reorderGroupedTableDataForParentChild(fullData);
}

function addMissingGroupedTableParentItems(tableData) {

    // Find all existing parents
    var parents = _.uniq(
        _.flatten(
        _.map(tableData, function (column) {
            return _.map(column.data, function(cell) {
               return cell.relationships.parent
            });
        }
        )
    ));

    // Find all existing rows
    var current_categories = _.uniq(
        _.flatten(
        _.map(tableData, function (column) {
            return _.map(column.data, function(cell) {
               return cell.category
            });
        }
        )
    ));

    // Find rows that need to be added
    var missing_parents = _.filter(parents, function (parent) {
        return !_.contains(current_categories, parent);
    });

    // Build the new data items
    var newData = _.clone(tableData);
    var example = tableData[0].data[0];
    _.forEach(missing_parents, function (missing_parent) {

        // find order for the new parent by finding the minimum value for it's children and subtracting 1
        var parent_items = _.filter(_.flatten(_.map(tableData, function(column) { return column.data})), function(item) { return item.relationships.parent === missing_parent; });
        var min_order = _.min(_.map(parent_items, function(item) { return item.order; })) - 1;

        // build the new data points
        _.forEach(newData, function(group) {
            var new_data_point = {
                'category': missing_parent,
                'order': min_order,
                'relationships': {'is_child': false, 'is_parent': true, 'parent': missing_parent},
                'sort_values': _.map(example['sort_values'], function (value) {
                    return 0;
                }),
                'values': _.map(example.values, function (value) {
                    return '';
                })
            };
            group.data.push(new_data_point)
        });
    });

    return newData;
}

function reorderGroupedTableDataForParentChild(tableData) {
    var item_dict = _.object(_.map(tableData, function(item) { return [item.category, item]; }));
    var parents = _.uniq(
        _.flatten(
        _.map(tableData, function (column) {
            return _.map(column.data, function(cell) {
               return cell.relationships.parent
            });
        }
        )
    ));

    _.forEach(tableData, function(group) {
        var item_dict = _.object(_.map(group.data, function(item) { return [item.category, item]; }));
        var ordered_data = [];
        _.forEach(parents, function(parent) {
            ordered_data.push(item_dict[parent]);
            var parent_children = _.filter(group.data, function(item) { return item['category'] !== parent && item['relationships']['parent'] === parent; });
            ordered_data = ordered_data.concat(parent_children);
        });
        group.data = ordered_data;
    });

    return tableData;
}



// ---------------------------------------------------------------------------
// COMMON FUNCTIONS
// ---------------------------------------------------------------------------

function preProcessGroupedTableObject(tableObject) {
    var columnDps = groupedTableDecimalPlaces(tableObject);
    var couldBeYear = groupedTableCouldBeAYear(tableObject);


    tableObject.groups = _.map(tableObject.groups, function(group) {
        group.data = _.map(group.data, function(item) {
           item.values = _.map(_.zip(item.values, columnDps, couldBeYear), function(cellTuple) {
                if(cellTuple[2] === false) {
                    return formatNumberWithDecimalPlaces(cellTuple[0], cellTuple[1]);
                } else {
                    return cellTuple[0];
                }
            });
            return item;
        });
        return group;
    });

    // update tableObject data
    tableObject.data = [];
    // for each row
    for(var rowNo in tableObject.groups[0].data) {
        // grab a prototype cell
        var row = _.clone(tableObject.groups[0].data[rowNo]);
        // fill it with all contents across the groups
        row.values = _.flatten(_.map(tableObject.groups, function(group) {
            return group.data[rowNo].values;
        }));
        row.sort_values = _.flatten(_.map(tableObject.groups, function(group) {
            return group.data[rowNo].sort_values;
        }));
        // add to the data
        tableObject.data.push(row)
    }


    var items = _.sortBy(tableObject.groups[0].data, function(item) { return item.order; });
    var rows = _.map(items, function(item) { return item.category; });
    _.forEach(rows, function(row) {
        var row_html = '<tr><th>' + row + '</th>';
        _.forEach(tableObject.groups, function(group) {
            var row_item = _.findWhere(group.data, {'category':row});
            _.forEach(_.zip(row_item.values, columnDps, couldBeYear), function(cellValues) {
                if(cellValues[2]) {
                    row_html = row_html + '<td>' + cellValues[0] + '</td>';
                } else {
                    row_html = row_html + '<td>' + formatNumberWithDecimalPlaces(cellValues[0], cellValues[1]) + '</td>';
                }
            });
        });
    });
}

function numVal(value, defaultVal) {
    var string = String(value).replace(/\,/g, '')
    var num = Number(string);
    return num ? num : value;
}





// function validateAndAdjust(data, rowIndex, columnIndex, sortIndex, parentIndex, valueIndex) {
//     var missingData = [];
//     var doubleData = [];

//     var rowItems = _.uniq(_.map(data, function(item) { return item[rowIndex]; }));
//     var columnItems = _.uniq(_.map(data, function(item) { return item[columnIndex]; }));

//     var mapOfPairs = _.object(_.map(rowItems, function(item) {
//        return [item, _.map(_.filter(data, function(row) { return row[rowIndex] === item}), function (row) {
//             return row[columnIndex]
//        })];
//     }));

//     _.forEach(rowItems, function (row) {
//         _.forEach(columnItems, function (col) {
//             if(!_.contains(mapOfPairs[row], col)) {
//                 missingData.push({'category': row, 'group': col})
//             }
//         })
//     });

//     if(missingData.length > 0) {
//         _.forEach(missingData, function (item) {
//             var newRow = _.map(_.range(data[0].length), function(i) { return '' });
//             newRow[rowIndex] = item['category'];
//             newRow[columnIndex] = item['group'];
//             data.push(newRow)
//         });
//         return data;
//     }
//     return null
// }



// If we're running under Node - required for testing
if(typeof exports !== 'undefined') {
    var _ = require('../charts/vendor/underscore-min');
    var dataTools = require('../charts/rd-data-tools');
    var builderTools = require('../cms/rd-builder');
    var uniqueDataInColumnMaintainOrder = dataTools.uniqueDataInColumnMaintainOrder;
    var seriesDecimalPlaces = dataTools.seriesDecimalPlaces;
    var seriesCouldBeYear = dataTools.seriesCouldBeYear;
    var formatNumberWithDecimalPlaces = dataTools.formatNumberWithDecimalPlaces;
    var getColumnIndex = builderTools.getColumnIndex;
    var index_of_column_named = dataTools.index_of_column_named;
    
    exports.buildTableObject = buildTableObject;
    exports.simpleTable = simpleTable;
    exports.groupedTable = groupedTable;
}
/**
 * Created by Tom.Ridd on 05/05/2017.

rd-table renders tableObjects according to the requirements that were identified during the ethnicity facts & figures project

specifically...
- rendering methods for all chart types (bar, line, component, panel bar, panel line) 
- render tables with parent-child relationships correctly
    -  in a parent-child table parent rows should be bold and childen light


rd-table is only used to preview tables in the table builder. tables in the static site are rendered using CSS/Html by the templates

 */


// ---------------------------------------------------------------------------
// PUBLIC
// ---------------------------------------------------------------------------

function drawTable(container_id, tableObject) {

    preProcessTableObject(tableObject);

    if(tableObject.type === 'simple') {
        return simpleHtmlTable(container_id, tableObject);
    } else if (tableObject.type === 'grouped') {
        return groupedHtmlTable(container_id, tableObject);
    }
}




// ---------------------------------------------------------------------------
// SIMPLE
// ---------------------------------------------------------------------------

function simpleHtmlTable(container_id, tableObject) {

    var table_html = "";
    table_html = appendTableTitle(table_html, tableObject);
    table_html = appendTableSubtitle(table_html, tableObject, true);

    table_html = table_html + "<table class='table table-sm'>";
    table_html = appendSimpleTableHeader(table_html, tableObject);
    table_html = appendSimpleTableBody(table_html, tableObject);
    table_html = table_html + "</table>";

    $("#" + container_id).html(table_html);

    return true;
}

function appendSimpleTableHeader(table_html, tableObject) {
    var header_html = "";
    if(tableObject['category_caption'] == null) {
        header_html = "<thead><tr><th></th>";
    } else {
        header_html = "<thead><tr><th>" + tableObject.category_caption + "</th>";
    }

    _.forEach(tableObject.columns, function(column) {
        header_html = header_html + '<th>' + column + '</th>';
    });
    header_html = header_html + "</tr></thead>"
    return table_html + header_html;
}

function appendSimpleTableBody(table_html, tableObject) {
    var body_html = "<tbody>";
    _.forEach(tableObject.data, function(item) {
        body_html = body_html + "<tr>";
        if(tableObject.parent_child) {
            if(item.relationships.is_parent) {
                body_html = body_html + '<th class="parent_row">'
            } else {
                body_html = body_html + '<th class="child_row">'
            }
        } else {
            body_html = body_html + '<th>'
        }
        body_html = body_html + item.category + '</th>';

        _.forEach(item.values, function(cellValue) {
            body_html = body_html + '<td>' + cellValue + '</td>';
        });
        body_html = body_html + "</tr>";
    });
    body_html = body_html + "</tbody>";
    return table_html + body_html;
}





// ---------------------------------------------------------------------------
// GROUPED
// ---------------------------------------------------------------------------

function groupedHtmlTable(container_id, tableObject) {

    var table_html = "";
    table_html = appendTableTitle(table_html, tableObject);
    table_html = appendTableSubtitle(table_html, tableObject);

    table_html = table_html + "<table class='table table-sm'>";
    table_html = appendGroupTableHeader(table_html, tableObject);
    table_html = appendGroupedTableBody(table_html, tableObject)
    table_html = table_html + "</table>";

    table_html = insertTableFooter(table_html, tableObject);

    $("#" + container_id).html(table_html);

    return true;
}


function appendGroupedTableBody(table_html, tableObject) {
    var body_html = '<tbody>';

    var items = _.sortBy(tableObject.groups[0].data, function(item) { return item.order; });

    _.forEach(items, function(item) {
        var row = item.category;
        var row_html = '<tr>';
        if(tableObject.parent_child) {
            if(item.relationships.is_parent) {
                row_html = row_html + '<th class="parent_row">'
            } else {
                row_html = row_html + '<th class="child_row">'
            }
        } else {
            row_html = row_html + '<th>'
        }
        row_html = row_html + row + '</th>';

        _.forEach(tableObject.groups, function(group) {
            var row_item = _.findWhere(group.data, {'category':row});
            _.forEach(row_item.values, function(cellValue) {
                row_html = row_html + '<td>' + cellValue + '</td>';
            });
        });
        row_html = row_html + '</tr>';
        body_html = body_html + row_html;
    });
    body_html = body_html + "</tbody>";
    return table_html + body_html;
}


function appendGroupTableHeader(table_html, tableObject) {
    var header_html = '';
    if(tableObject['category_caption'] == null) {
        header_html = "<thead><tr><th></th>";
    } else {
        header_html = "<thead><tr><th>" + tableObject.category_caption + "</th>";
    }

    // Add a row with titles for each group
    _.forEach(tableObject.groups, function (group) {
        header_html = header_html + multicell(group.group, tableObject.columns.length);
    });
    header_html = header_html + '</tr>';

    // Check if we need to add a second row (based if any column headings exist)
    var doSecondRow = false;
    _.forEach(tableObject.columns, function(column) {
        if(column !== '') {
            doSecondRow = true;
        }
    });

    // If a second row is required add it
    if(doSecondRow) {
        header_html = header_html + '<tr><td></td>';
        _.forEach(tableObject.groups, function (group) {
            _.forEach(tableObject.columns, function(column) {
                header_html = header_html + '<td>' + column + '</td>';
            });
        });
        header_html = header_html + '</tr>';
    }

    header_html = header_html + '</thead>';

    return table_html + header_html;
}



// ---------------------------------------------------------------------------
// OTHER
// ---------------------------------------------------------------------------

function appendTableTitle(table_html, tableObject) {
    if(tableObject.header && tableObject.header !== '') {
        return table_html + "<div class='table-title heading-small'>" + tableObject.header + "</div>";
    } else {
        return table_html;
    }
}

function appendTableSubtitle(table_html, tableObject) {
    if(tableObject.subtitle && tableObject.subtitle !== '') {
        return table_html + "<div class='table-subtitle'>" + tableObject.subtitle + "</div>";
    } else {
        return table_html;
    }
}

function insertTableFooter(table_html, tableObject) {
    if(tableObject.footer && tableObject.footer !== '') {
        return table_html + "<div class='table-footer'>" + tableObject.footer + "</div>";
    } else {
        return table_html;
    }
}

function multicell(text, total_cells) {
    return '<td colspan=' + total_cells + '>' + text + '</td>';
}

$(document).ready(function () {
  var $stickies = $(".sticky-js");
  $.each($stickies, function () {
    var stickyPosition = parseInt($(this).position().top);
    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();
      if (scrollTop >= stickyPosition) {
        $(this).addClass('sticky-js-fixed');
      } else {
        $(this).removeClass('sticky-js-fixed');
      }
    }.bind(this));
  });
});
//# sourceMappingURL=cms.js.map
