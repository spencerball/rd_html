function barchartObject(e,t,r,a,n,o,u,i,l){var c=_.clone(e),s=c.shift();return isSimpleBarchart(r)?barchartSingleObject(s,c,t,a,n,o,u,i,l):barchartDoubleObject(s,c,t,r,a,n,o,u,i,l)}function isSimpleBarchart(e){return"[None]"===e||null===e}function barchartSingleObject(e,t,r,a,n,o,u,i,l){var c=getIndices(e,r,null,a,n),s=uniqueCategories(t,c.category,c.order),d=_.map(s,function(e){return valueForCategory(t,c.category,c.value,c.parent,e)}),p=[];return null!==c.parent&&(p=_.unique(_.map(t,function(e){return e[c.parent]}))),{type:"bar",title:{text:o},parent_child:null!==c.parent,xAxis:{title:{text:u},categories:s},yAxis:{title:{text:i}},series:[{name:r,data:d}],number_format:l,parents:p,version:VERSION}}function barchartDoubleObject(e,t,r,a,n,o,u,i,l,c){var s=getIndices(e,r,a,n,o),d=uniqueCategories(t,s.category,s.order),p=[];return uniqueDataInColumnMaintainOrder(t,s.secondary).forEach(function(e){var r=_.filter(t,function(t){return t[s.secondary]===e}),a=[];_.forEach(d,function(e){a.push(valueForCategory(r,s.category,s.value,s.parent,e))}),p.push({name:e,data:a})}),{type:"bar",title:{text:u},xAxis:{title:{text:i},categories:d},yAxis:{title:{text:l}},series:sortChartSeries(p),number_format:c,version:VERSION}}function panelBarchartObject(e,t,r,a,n,o,u,i,l){var c=_.clone(e),s=getIndices(c.shift(),t,r,null,i,l),d=uniqueCategories(c,s.category,s.order),p=null,f=(p=isUndefinedOrNull(l)||"[None]"===l?uniqueDataInColumnMaintainOrder(c,s.secondary):uniqueDataInColumnOrdered(c,s.secondary,s.custom)).map(function(e){var r=_.filter(c,function(t){return t[s.secondary]===e}),a=d.map(function(e){return valueForCategory(r,s.category,s.value,s.parent,e)});return{type:"small_bar",title:{text:e},xAxis:{title:{text:n},categories:d},yAxis:{title:{text:o}},series:[{name:t,data:a}],number_format:u}});return{type:"panel_bar_chart",title:{text:a},xAxis:{title:{text:n},categories:d},yAxis:{title:{text:o}},panels:f,version:VERSION}}function linechartObject(e,t,r,a,n,o,u,i){var l=_.clone(e),c=getIndices(l.shift(),t,r,null,null,"[None]"===i?null:i),s=uniqueDataInColumnMaintainOrder(l,c.category),d=uniqueDataInColumnMaintainOrder(l,c.secondary),p=c.secondary,f=c.custom;if(f){var m=_.map(d,function(e){var t=_.findIndex(l,function(t){return t[p]===e});return l[t][f]});d=_.map(_.sortBy(_.zip(d,m),function(e){return e[1]}),function(e){return e[0]})}var h=[];return _.forEach(d,function(e){var t=[];_.forEach(s,function(r){t.push(valueForCategoryAndSeries(l,c.category,r,c.secondary,e,c.value))}),h.push({name:e,data:t})}),{type:"line",title:{text:a},xAxis:{title:{text:n},categories:s},yAxis:{title:{text:o}},series:sortChartSeries(h),number_format:u,version:VERSION}}function panelLinechartObject(e,t,r,a,n,o,u,i){var l=_.clone(e),c=getIndices(l.shift(),r,t,null,null,i),s=null;s=isUndefinedOrNull(i)||"[None]"===i?uniqueDataInColumnMaintainOrder(l,c.category):uniqueDataInColumnOrdered(l,c.category,c.custom);var d=uniqueDataInColumn(l,c.secondary);return{type:"panel_line_chart",title:{text:a},panels:_.map(s,function(e){var t=_.map(d,function(t){return valueForCategoryAndSeries(l,c.secondary,t,c.category,e,c.value)});return{type:"line",title:{text:e},xAxis:{title:{text:n},categories:d},yAxis:{title:{text:o}},series:[{name:e,data:t}],number_format:u}}),number_format:u,version:VERSION}}function componentChartObject(e,t,r,a,n,o,u,i,l){var c=_.clone(e),s=getIndices(c.shift(),t,r,null,i,l),d=null;d=isUndefinedOrNull(i)||"[None]"===i?uniqueDataInColumnMaintainOrder(c,s.category):uniqueDataInColumnOrdered(c,s.category,s.order);var p=null,f=(p=isUndefinedOrNull(l)||"[None]"===l?uniqueDataInColumnMaintainOrder(c,s.secondary).reverse():uniqueDataInColumnOrdered(c,s.secondary,s.custom).reverse()).map(function(e){var t=d.map(function(t){return valueForCategoryAndSeries(c,s.category,t,s.secondary,e,s.value)});return{name:e,data:t}});return{type:"component",title:{text:a},xAxis:{title:{text:n},categories:d},yAxis:{title:{text:o}},series:f,number_format:u,version:VERSION}}function uniqueCategories(e,t,r){return r?uniqueDataInColumnOrdered(e,t,r):uniqueDataInColumnMaintainOrder(e,t)}function valueForCategory(e,t,r,a,n){var o=e.filter(function(e){return e[t]===n});if(0===o.length)return{y:0,category:n};var u=o[0];if(u[t]===n){var i=isNumber(u[r]);if(a){var l=u[a],c={is_parent:l===n,is_child:l!==n,parent:l};return c.is_parent?{y:i?parseFloat(u[r]):0,relationships:c,category:u[t],color:defaultParentColor,text:i?"number":u[r]}:{y:i?parseFloat(u[r]):0,relationships:c,category:u[t],color:defaultChildColor,text:i?"number":u[r]}}return{y:i?parseFloat(u[r]):0,category:u[t],text:i?"number":u[r]}}}function isNumber(e){return!isNaN(parseFloat(e))}function valueForCategoryAndSeries(e,t,r,a,n,o){var u=_.filter(e,function(e){return e[t]===r&&e[a]===n});return u.length>0?parseFloat(u[0][o]):0}function sortChartSeries(e){return e.filter(function(e){return isNaN(toNumberSortValue(e.name))}).length>0?e:(e.forEach(function(e){e.name_value=toNumberSortValue(e.name)}),_.sortBy(e,function(e){return e.name_value}))}function toNumberSortValue(e){var t=parseFloat(e);return isNaN(t)?parseFloat(e.substring(1)):t}function isUndefinedOrNull(e){return void 0===e||null===e}function getIndices(e,t,r,a,n,o){var u=_.map(e,function(e){return e.toLowerCase()}),i=isUndefinedOrNull(t)?null:u.indexOf(t.toLowerCase()),l=isUndefinedOrNull(n)?i:u.indexOf(n.toLowerCase()),c=isUndefinedOrNull(a)?null:u.indexOf(a.toLowerCase()),s=isUndefinedOrNull(r)?null:u.indexOf(r.toLowerCase()),d=isUndefinedOrNull(o)?null:u.indexOf(o.toLowerCase());return{category:i>=0?i:null,order:l>=0?l:null,secondary:s>=0?s:null,value:u.indexOf("value"),parent:c>=0?c:null,custom:d>=0?d:null}}function buildTableObject(e,t,r,a,n,o,u,i,l,c,s,d){var p=null;return p=u&&"[None]"!==u?groupedTable(e,t,r,a,n,o,u,l,i,c,s,d):simpleTable(e,t,r,a,n,o,l,i,c,s),preProcessTableObject(p)}function simpleTable(e,t,r,a,n,o,u,i,l,c){var s=_.clone(e),d=s.shift(),p=d.indexOf(n),f=_.map(u,function(e){return d.indexOf(e)}),m=p,h=!1;if(o&&"[None]"!==o&&(m=d.indexOf(o),h=!0),i&&"[None]"!==i)var v=d.indexOf(i);var b=_.map(s,function(e,t){var r={is_parent:!1,is_child:!1,parent:e[p]};if(h){var a=e[m],n=e[p];r={is_parent:a===n,is_child:a!==n,parent:a}}var o=_.map(f,function(t){return e[t]}),u=_.map(o,function(e){return numVal(e)});return v?{category:e[p],relationships:r,order:e[v],values:o,sort_values:u}:{category:e[p],relationships:r,order:t,values:o,sort_values:u}});return b=_.sortBy(b,function(e){return e.order}),{type:"simple",parent_child:h,header:t,subtitle:r,footer:a,category:n,columns:l,data:b,category_caption:null==c?n:c}}function groupedTable(e,t,r,a,n,o,u,i,l,c,s,d){var p=_.clone(e),f=p.shift(),m=f.indexOf(n),h=_.map(i,function(e){return f.indexOf(e)}),v=f.indexOf(u),b=uniqueDataInColumnMaintainOrder(p,v);if(d&&"[None]"!==d){var g=f.indexOf(d),y=_.map(b,function(e){var t=_.findIndex(p,function(t){return t[v]===e});return p[t][g]});b=_.map(_.sortBy(_.zip(b,y),function(e){return e[1]}),function(e){return e[0]})}var O=-2;null===l?O=m:"[None]"!==l&&(O=f.indexOf(l));var x=m,C=!1;o&&"[None]"!==o&&(x=f.indexOf(o),C=!0);var T=_.map(b,function(e){var t=_.filter(p,function(t){return t[v]===e}),r=_.map(t,function(e,t){var r={is_parent:!1,is_child:!1,parent:e[m]};if(C){var a=e[x],n=e[m];r={is_parent:a===n,is_child:a!==n,parent:a}}var o=-2===O?t:e[O],u=_.map(h,function(t){return e[t]}),i=_.map(u,function(e){return numVal(e)});return{category:e[m],relationships:r,order:o,values:u,sort_values:i}});return{group:e,data:r}}),N={type:"grouped",category:n,title:{text:"Grouped Table"},header:t,columns:c,groups:T},I=[""];_.forEach(N.groups,function(e){I.push(e.group)});var D=[],j=_.map(N.groups[0].data,function(e){return e.category});return _.forEach(j,function(e){var t=[],r="",a="",n={};_.forEach(N.groups,function(o){var u=_.findWhere(o.data,{category:e});r=u.order,a=u.parent,n=u.relationships,_.forEach(u.values,function(e){t.push(e)})});var o=[];_.forEach(t,function(e){o.push(numVal(e))}),D.push({category:e,relationships:n,parent:a,order:r,values:t,sort_values:o})}),D=_.sortBy(D,function(e){return e.order}),T=_.map(T,function(e){return e.data=_.sortBy(e.data,function(e){return e.order}),e}),{group_columns:I,type:"grouped",category:n,group_column:u,columns:c,data:D,header:t,subtitle:r,footer:a,groups:T,parent_child:C,category_caption:null==s?n:s}}function columnDecimalPlaces(e){var t=[];for(var r in e.data[0].values){var a=_.map(e.data,function(e){return e.values[r]});t.push(seriesDecimalPlaces(a))}return t}function columnCouldBeAYear(e){var t=[];for(var r in e.data[0].values){var a=_.map(e.data,function(e){return e.values[r]});t.push(seriesCouldBeYear(a))}return t}function groupedTableDecimalPlaces(e){var t=[];for(var r in e.groups[0].data[0].values){var a=_.flatten(_.map(e.groups,function(e){return _.map(e.data,function(e){return e.values[r]})}));t.push(seriesDecimalPlaces(a))}return t}function groupedTableCouldBeAYear(e){var t=[];for(var r in e.groups[0].data[0].values){var a=_.flatten(_.map(e.groups,function(e){return _.map(e.data,function(e){return e.values[r]})}));t.push(seriesCouldBeYear(a))}return t}function preProcessTableObject(e){return"simple"===e.type?preProcessSimpleTableObject(e):"grouped"===e.type&&preProcessGroupedTableObject(e),e}function preProcessSimpleTableObject(e){var t=columnDecimalPlaces(e),r=columnCouldBeAYear(e);e.data=_.map(e.data,function(e){return e.values=_.map(_.zip(e.values,t,r),function(e){return!1===e[2]?formatNumberWithDecimalPlaces(e[0],e[1]):e[0]}),e})}function preProcessGroupedTableObject(e){var t=groupedTableDecimalPlaces(e),r=groupedTableCouldBeAYear(e);e.groups=_.map(e.groups,function(e){return e.data=_.map(e.data,function(e){return e.values=_.map(_.zip(e.values,t,r),function(e){return!1===e[2]?formatNumberWithDecimalPlaces(e[0],e[1]):e[0]}),e}),e}),e.data=[];for(var a in e.groups[0].data){var n=_.clone(e.groups[0].data[a]);n.values=_.flatten(_.map(e.groups,function(e){return e.data[a].values})),n.sort_values=_.flatten(_.map(e.groups,function(e){return e.data[a].sort_values})),e.data.push(n)}var o=_.sortBy(e.groups[0].data,function(e){return e.order}),u=_.map(o,function(e){return e.category});_.forEach(u,function(a){var n="<tr><th>"+a+"</th>";_.forEach(e.groups,function(e){var o=_.findWhere(e.data,{category:a});_.forEach(_.zip(o.values,t,r),function(e){n=e[2]?n+"<td>"+e[0]+"</td>":n+"<td>"+formatNumberWithDecimalPlaces(e[0],e[1])+"</td>"})})})}function numVal(e,t){var r=String(e).replace(/\,/g,""),a=Number(r);return a||e}function drawTable(e,t){return preProcessTableObject(t),console.log(t),"simple"===t.type?simpleHtmlTable(e,t):"grouped"===t.type?groupedHtmlTable(e,t):void 0}function simpleHtmlTable(e,t){var r="";return r=appendTableTitle(r,t),r=appendTableSubtitle(r,t),r+="<table class='table table-sm'>",r=appendSimpleTableHeader(r,t),r=appendSimpleTableBody(r,t),r+="</table>",$("#"+e).html(r),!0}function groupedHtmlTable(e,t){var r="";return r=appendTableTitle(r,t),r=appendTableSubtitle(r,t),r+="<table class='table table-sm'>",r=appendGroupTableHeader(r,t),r=appendGroupedTableBody(r,t),r+="</table>",r=insertTableFooter(r,t),$("#"+e).html(r),!0}function appendSimpleTableBody(e,t){var r="<tbody>";return _.forEach(t.data,function(e){r+="<tr>",t.parent_child?e.relationships.is_parent?r+='<th class="parent_row">':r+='<th class="child_row">':r+="<th>",r=r+e.category+"</th>",_.forEach(e.values,function(e){r=r+"<td>"+e+"</td>"}),r+="</tr>"}),r+="</tbody>",e+r}function appendGroupedTableBody(e,t){var r="<tbody>",a=_.sortBy(t.groups[0].data,function(e){return e.order});return _.forEach(a,function(e){var a=e.category,n="<tr>";t.parent_child?e.relationships.is_parent?n+='<th class="parent_row">':n+='<th class="child_row">':n+="<th>",n=n+a+"</th>",_.forEach(t.groups,function(e){var t=_.findWhere(e.data,{category:a});_.forEach(t.values,function(e){n=n+"<td>"+e+"</td>"})}),r+=n+="</tr>"}),r+="</tbody>",e+r}function appendTableTitle(e,t){return t.header&&""!==t.header?e+"<div class='table-title heading-small'>"+t.header+"</div>":e}function insertTableFooter(e,t){return t.footer&&""!==t.footer?e+"<div class='table-footer'>"+t.footer+"</div>":e}function appendTableSubtitle(e,t){return t.subtitle&&""!==t.subtitle?e+"<div class='table-subtitle'>"+t.subtitle+"</div>":e}function appendSimpleTableHeader(e,t){var r="";return r=null==t.category_caption?"<thead><tr><th></th>":"<thead><tr><th>"+t.category_caption+"</th>",_.forEach(t.columns,function(e){r=r+"<th>"+e+"</th>"}),r+="</tr></thead>",e+r}function appendGroupTableHeader(e,t){var r="";r=null==t.category_caption?"<thead><tr><th></th>":"<thead><tr><th>"+t.category_caption+"</th>",_.forEach(t.groups,function(e){r+=multicell(e.group,t.columns.length)}),r+="</tr>";var a=!1;return _.forEach(t.columns,function(e){""!==e&&(a=!0)}),a&&(r+="<tr><td></td>",_.forEach(t.groups,function(e){_.forEach(t.columns,function(e){r=r+"<td>"+e+"</td>"})}),r+="</tr>"),r+="</thead>",e+r}function multicell(e,t){return"<td colspan="+t+">"+e+"</td>"}var defaultParentColor="#2B8CC4",defaultChildColor="#B3CBD9",VERSION="1.1";if("undefined"!=typeof exports){var _=require("../charts/vendor/underscore-min"),uniqueDataInColumnMaintainOrder=(dataTools=require("../charts/rd-data-tools")).uniqueDataInColumnMaintainOrder;exports.barchartObject=barchartObject,exports.linechartObject=linechartObject,exports.componentChartObject=componentChartObject,exports.panelLinechartObject=panelLinechartObject,exports.panelBarchartObject=panelBarchartObject}if("undefined"!=typeof exports){var _=require("../charts/vendor/underscore-min"),dataTools=require("../charts/rd-data-tools"),uniqueDataInColumnMaintainOrder=dataTools.uniqueDataInColumnMaintainOrder,seriesDecimalPlaces=dataTools.seriesDecimalPlaces,seriesCouldBeYear=dataTools.seriesCouldBeYear,formatNumberWithDecimalPlaces=dataTools.formatNumberWithDecimalPlaces;exports.buildTableObject=buildTableObject,exports.simpleTable=simpleTable,exports.groupedTable=groupedTable}$(document).ready(function(){var e=$(".sticky-js");$.each(e,function(){var e=parseInt($(this).position().top);$(window).scroll(function(){$(window).scrollTop()>=e?$(this).addClass("sticky-js-fixed"):$(this).removeClass("sticky-js-fixed")}.bind(this))})});
//# sourceMappingURL=cms.js.map
