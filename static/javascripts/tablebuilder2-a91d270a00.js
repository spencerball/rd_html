var presets=[],table_data=null,current_data="",current_settings=null,unselectedOptionString="Please select";function getEthnicityColumn(e){for(var t=0;t<e.length;t++){if(0<=e[t].toLowerCase().trim().indexOf("ethnic"))return t}return-1}function getEthnicityValues(e){var t=_.clone(e),a=getEthnicityColumn(t.shift());return 0<=a?_.pluck(t,a):[]}function getIsSimpleData(e){var t=getEthnicityValues(e);return(t=_.uniq(t)).length===e.length-1}function getNumberFormat(){var e=$("#number_format").val();return"none"===e?{multiplier:1,prefix:"",suffix:"",min:"",max:""}:"percent"===e?{multiplier:1,prefix:"",suffix:"%",min:0,max:100}:"other"===e?{multiplier:1,prefix:$("#number_format_prefix").val(),suffix:$("#number_format_suffix").val(),min:$("#number_format_min").val(),max:$("#number_format_max").val()}:void 0}function getTips(){var e=validateTable(table_data);if(0!==e.length)return e;var t=checkRequiredFields();if(0!==t.length)return t;var a=getEthnicityColumnHeader(),n=getSecondaryColumnHeader();return validateData(table_data,a,n)}$(document).ready(function(){function t(t){var e=$("#data_text_area").val();0<(table_data=textToData(e)).length&&(message=table_data.length-1+" rows by "+table_data[0].length+" columns"),$("#data-description").html(message);var a,n,r,o,i=table_data[0];n=u(a=i,"none","[None]"),r=u(a,"[None]","[None]"),o=u(a,unselectedOptionString,unselectedOptionString),$("#ethnicity-as-row__columns").html(o),$("#ethnicity-as-row__column-order").html(r),$("#ethnicity-as-column__rows").html(o),$("#ethnicity-as-column__row-order").html(r),$("#table_column_1").html(o),$("#table_column_2").html(n),$("#table_column_3").html(n),$("#table_column_4").html(n),$("#table_column_5").html(n),$("#index_column_name").val("Ethnicity");var l=getEthnicityValues(table_data);$.ajax({type:"post",url:url_get_classifications,dataType:"json",data:JSON.stringify({data:l}),contentType:"application/json; charset=utf-8",success:function(e){(function(e){var t="";for(var a in e){var n=e[a].preset.name,r=e[a].preset.code;t=0===a?t+'<option value="'+r+'" selected>'+n+"</option>":t+'<option value="'+r+'" >'+n+"</option>"}$("#ethnicity_settings").html(t)})(presets=e.presets),$("#ethnicity_settings_section").show(),getIsSimpleData(table_data)?($("#simple_table_options").show(),$("#complex_table_options").hide()):($("#simple_table_options").hide(),$("#complex_table_options").show()),t&&t()},failure:function(){console.log("failure")},error:function(e){console.log(e)}})}function u(e,t,a){var n='<option value="'+t+'" selected>'+a+"</option>",r=function(e){var t=[],a=[];for(h in e){var n=e[h];t.indexOf(n)<0&&a.push(n)}return a}(e);for(var o in r){var i=r[o];n=n+'<option value="'+i+'">'+i+"</option>"}return n}function e(e,t){""===$("#"+this.id+"_name").val()&&$("#"+this.id+"_name").val($("#"+this.id+" option:selected").val()),a(e)}function a(e){var t=getTips();0<t.length?function(e){$("#tips_container").show(),$("#preview_container").hide(),$("#notes_container").hide(),$("#errors_container").hide(),$("#tip-list").children().hide(),0<n(e,MISSING_FIELD_ERROR).length&&$("#notes_container").show();0<n(e,ETHNICITY_ERROR).length&&($("#errors_container").show(),$("#tip__ethnicity-column").show());0<n(e,RECTANGLE_ERROR).length&&($("#errors_container").show(),$("#tip__rectangular-data").show());0<n(e,DATA_ERROR_DUPLICATION).length&&($("#errors_container").show(),$("#tip__duplicate-data").show());0<n(e,DATA_ERROR_MISSING_DATA).length&&($("#errors_container").show(),$("#tip__missing-data").show())}(t):function(){$("#tips_container").hide(),$("#preview_container").show();var e=s();e&&(e.title&&e.title.text&&$("#title-container").html('<h3 class="heading-small">'+e.title.text+"</h3>"),e.title="",drawTable("container",e),$("#save_section").show())}()}function n(e,t){return _.filter(e,function(e){return e.errorType===t})}function o(){return{data:textToData($("#data_text_area").val()),preset:$("#ethnicity_settings").val(),tableOptions:function(){{if(getIsSimpleData(table_data))return{};var e=$("#complex-table__data-style").val(),t="ethnicity_as_row"===e?$("#ethnicity-as-row__columns").val():$("#ethnicity-as-column__rows").val(),a="ethnicity_as_row"===e?$("#ethnicity-as-row__column-order").val():$("#ethnicity-as-column__row-order").val();return{data_style:$("#complex-table__data-style").val(),selection:t,order:a}}}(),tableValues:{table_title:$("#table_title").val(),table_column_1:$("#table_column_1").val(),table_column_1_name:$("#table_column_1_name").val(),table_column_2:$("#table_column_2").val(),table_column_2_name:$("#table_column_2_name").val(),table_column_3:$("#table_column_3").val(),table_column_3_name:$("#table_column_3_name").val(),table_column_4:$("#table_column_4").val(),table_column_4_name:$("#table_column_4_name").val(),table_column_5:$("#table_column_5").val(),table_column_5_name:$("#table_column_5_name").val(),table_index_column_name:$("#index_column_name").val()},version:"2.0"}}function i(e){return null!==e&"none"!=e}function l(){var t=[];return $(".column_option_picker").each(function(e){i($(this).val())&&t.push($(this).val())}),t}function c(){var t=[];return $(".column_option_picker").each(function(e){"none"!==$(this).val()&&t.push($(".column_option_picker_name")[e].value)}),t}function s(){var e,t,a=null,n=function(e){for(p in presets)if(presets[p].preset.code===e)return presets[p];return null}($("#ethnicity_settings").val());if(getIsSimpleData(table_data))a=buildTableObject(m(n,table_data,l()),$("#table_title").val(),"","","Ethnicity","Ethnicity-parent","[None]","Ethnicity-order",l(),c(),$("#index_column_name").val(),"[None]");else if("ethnicity_as_row"===$("#complex-table__data-style").val()){var r=l().concat((t=[$("#ethnicity-as-row__columns").val()],i($("#ethnicity-as-row__column-order").val())&&t.push($("#ethnicity-as-row__column-order").val()),t));a=buildTableObject(m(n,table_data,r),$("#table_title").val(),"","","Ethnicity","Ethnicity-parent",$("#ethnicity-as-row__columns").val(),"Ethnicity-order",l(),c(),$("#index_column_name").val(),$("#ethnicity-as-row__column-order").val())}else{r=l().concat((e=[$("#ethnicity-as-column__rows").val()],i($("#ethnicity-as-column__row-order").val())&&e.push($("#ethnicity-as-column__row-order").val()),e));a=buildTableObject(m(n,table_data,r),$("#table_title").val(),"","",$("#ethnicity-as-column__rows").val(),"","Ethnicity",$("#ethnicity-as-column__row-order").val(),l(),c(),$("#index_column_name").val(),"Ethnicity-order")}return a}function m(e,t,a){var n=[["Ethnicity","Ethnicity-parent","Ethnicity-order"].concat(a)],r=_.clone(t),o=r.shift(),i=_.map(o,function(e){return e.toLowerCase().trim()}),l=_.map(a,function(e){var t=e.toLowerCase().trim();return i.indexOf(t)});for(var u in e.data){var c=e.data[u],s=[c.preset,c.parent,c.order];s=s.concat(_.map(l,function(e){return-1===e?"":r[u][e]})),n=n.concat([s])}return n}function r(){"ethnicity_as_row"===$("#complex-table__data-style").val()?($("#complex-table__ethnicity-is-row").show(),$("#complex-table__ethnicity-is-column").hide()):($("#complex-table__ethnicity-is-row").hide(),$("#complex-table__ethnicity-is-column").show())}function d(e){var t=$("#index_column_name").val();(0<=table_data[0].indexOf(t)||t===unselectedOptionString)&&("ethnicity_as_column"===$("#complex-table__data-style").val()?$("#index_column_name").val($("#ethnicity-as-column__rows").val()):$("#index_column_name").val("Ethnicity")),a()}function f(e){var t;e.preset&&(t=e.preset,$("#ethnicity_settings").val(t)),$("#table_title").val(e.tableValues.table_title),document.getElementById("table_title").dispatchEvent(new Event("input")),$("#complex-table__data-style").val(e.tableOptions.data_style),"ethnicity_as_row"===e.tableOptions.data_style?($("#ethnicity-as-row__columns").val(e.tableOptions.selection),$("#ethnicity-as-row__column-order").val(e.tableOptions.order)):($("#ethnicity-as-column__rows").val(e.tableOptions.selection),$("#ethnicity-as-column__row-order").val(e.tableOptions.order)),r(),$("#table_column_1").val(e.tableValues.table_column_1),$("#table_column_1_name").val(e.tableValues.table_column_1_name),$("#table_column_2").val(e.tableValues.table_column_2),$("#table_column_2_name").val(e.tableValues.table_column_2_name),$("#table_column_3").val(e.tableValues.table_column_3),$("#table_column_3_name").val(e.tableValues.table_column_3_name),$("#table_column_4").val(e.tableValues.table_column_4),$("#table_column_4_name").val(e.tableValues.table_column_4_name),$("#table_column_5").val(e.tableValues.table_column_5),$("#table_column_5_name").val(e.tableValues.table_column_5_name),$("#index_column_name").val(e.tableValues.table_index_column_name)}$("#preview").click(a),$("#confirm-data").click(function(e){t(function(){current_settings&&f(current_settings),a()}),$("#data-panel").hide(),$("#edit-panel").show()}),$("#edit-data").click(function(e){current_data=$("#data_text_area").val(),current_settings=o(),$("#data-panel").show(),$("#data_text_area").focus(),$("#edit-panel").hide()}),$("#cancel-edit-data").click(function(e){$("#data_text_area").val(current_data),$("#data-panel").hide(),$("#edit-panel").show()}),$("#save").click(function(e){$("#save").attr("disabled","disabled");var t=s(),a=o();t&&(r=a,(n=t)&&($.each(n.series,function(){for(var e=0;e<this.data.length;e++)isNaN(this.data[e].y)&&(this.data[e].y=0)}),$.ajax({type:"POST",url:url_save_table_to_page,dataType:"json",data:JSON.stringify({tableObject:n,source:r,tableBuilderVersion:2}),contentType:"application/json",success:function(){location.reload()}})));var n,r}),$("#exit").click(function(e){window.location.replace(url_edit_dimension)}),$("#ethnicity_settings").change(a),$("#complex-table__data-style").change(function(){r(),d()}),$("#ethnicity-as-row__columns").change(d),$("#grouped-bar__bar_order").change(a),$("#ethnicity-as-column__rows").change(d),$("#grouped-bar__groups_order").change(a),$("#table_column_1_name").change(a),$("#table_column_1").change(e),$("#table_column_2_name").change(a),$("#table_column_2").change(e),$("#table_column_3_name").change(a),$("#table_column_3").change(e),$("#table_column_4_name").change(a),$("#table_column_4").change(e),$("#table_column_5_name").change(a),$("#table_column_5").change(e),$("#index_column_name").change(a),$("#number_format").change(function(){"other"===$(this).val()?$("#other_number_format").show():$("#other_number_format").hide(),a()}),function(){if(settings.data){var e=_.map(settings.data,function(e){return e.join("\t")}).join("\n");$("#data_text_area").val(e),t(function(){$("#data-panel").hide(),$("#edit-panel").show(),f(settings),a()})}}()});var MISSING_FIELD_ERROR="Missing field error";function checkRequiredFields(){if(!1===getIsSimpleData(table_data))if("ethnicity_as_row"===$("#complex-table__data-style").val()){if($("#ethnicity-as-row__columns").val()===unselectedOptionString)return[{errorType:MISSING_FIELD_ERROR,field:"ethnicity-as-row__columns"}]}else if($("#ethnicity-as-column__rows").val()===unselectedOptionString)return[{errorType:MISSING_FIELD_ERROR,field:"ethnicity-as-column__rows"}];return $("#table_column_1").val()===unselectedOptionString?[{errorType:MISSING_FIELD_ERROR,field:"table_column_1"}]:[]}function getEthnicityColumnHeader(){for(var e in table_data[0]){if(0<=table_data[0][e].toLowerCase().search("ethnic"))return table_data[0][e]}return null}function getSecondaryColumnHeader(){return getIsSimpleData(table_data)?null:"ethnicity_as_row"===$("#complex-table__data-style").val()?$("#ethnicity-as-row__columns").val():$("#ethnicity-as-column__rows").val()}function pasteJson(e){var t=document.getElementById("data_text_area");t.value=_.map(e,function(e){return e.join("\t")}).join("\n"),t.dispatchEvent(new Event("keyup"))}var DATA_ERROR_DUPLICATION="duplication",DATA_ERROR_MISSING_DATA="missing data",DATA_ERROR_SETTINGS_ERROR="settings",DATA_ERROR_COMPLEX_DATA="complex data";function validateData(e,t,a){var n=_.clone(e),r=n.shift(),o=_.map(r,function(e){return e.trim().toLowerCase()}),i=index_of_column_named(o,t);if(null===i)return[{error:"could not find data column",column:t,errorType:DATA_ERROR_SETTINGS_ERROR}];if(null!==a){var l=index_of_column_named(o,a);return null===l?[{error:"could not find data column",column:a,errorType:DATA_ERROR_SETTINGS_ERROR}]:validateGroupedData(n,i,l,t,a)}return validateSimpleData(n,i,t)}function validateDataDuplicatesOnly(e,t,a){var n=_.clone(e),r=n.shift(),o=_.map(r,function(e){return e.trim().toLowerCase()}),i=index_of_column_named(o,t);if(null===i)return[{error:"could not find data column",column:t}];if(null!==a){var l=index_of_column_named(o,a);return null===l?[{error:"could not find data column",column:a}]:validateGroupedDataDuplicates(n,i,l)}return validateSimpleData(n,i)}function validateSimpleData(e,a,n){var r=[],t=_.uniq(_.map(e,function(e){return e[a]}));if(t.length===e.length)return[];if(e.length%t.length==0)return[{errorType:DATA_ERROR_COMPLEX_DATA}];var o={};return _.forEach(e,function(e){var t=e[a];t in o?"added to errors"!==o[t]&&(r.push({error:"duplicate data",category:t,categoryColumn:n,errorType:DATA_ERROR_DUPLICATION}),o[t]="added to errors"):o[t]="value in dict"}),r}function validateGroupedData(e,t,a,n,r){var o=validateGroupedDataCompleteness(e,t,a,n,r),i=validateGroupedDataDuplicates(e,t,a,n,r);return o.concat(i)}function validateGroupedDataCompleteness(e,a,n,r,o){var t=_.uniq(_.map(e,function(e){return e[a]})),i=_.uniq(_.map(e,function(e){return e[n]})),l=[],u=_.object(_.map(t,function(t){return[t,_.map(_.filter(e,function(e){return e[a]===t}),function(e){return e[n]})]}));return _.forEach(t,function(t){_.forEach(i,function(e){_.contains(u[t],e)||l.push({error:"missing data",category:t,group:e,categoryColumn:r,groupColumn:o,errorType:DATA_ERROR_MISSING_DATA})})}),l}function validateGroupedDataDuplicates(e,n,r,o,i){var l=[],u={};return _.forEach(e,function(e){var t=e[n],a=e[r];t in u?a in u[t]?l.push({error:"duplicate data",category:e[n],group:e[r],categoryColumn:o,groupColumn:i,errorType:DATA_ERROR_DUPLICATION}):u[t][a]=1:(u[t]={},u[t][a]=1)}),l}function errorDescription(e){switch(e.errorType){case DATA_ERROR_SETTINGS_ERROR:return"Column '"+e.column+"' not found";case DATA_ERROR_MISSING_DATA:return"The data is missing a row for "+e.categoryColumn+" = '"+e.category+"' and "+e.groupColumn+" = '"+e.group+"'";case DATA_ERROR_DUPLICATION:return"group"in e?"The data has duplicate entries for the rows with "+e.categoryColumn+" = '"+e.category+"' and "+e.groupColumn+" = '"+e.group+"'":"The data has duplicate entries for "+e.categoryColumn+" = '"+e.category+"'"}}function errorResolutionHint(e){switch(e.errorType){case DATA_ERROR_SETTINGS_ERROR:return"Make sure the column values selected for this table are valid";case DATA_ERROR_MISSING_DATA:return"Add rows to your source spreadsheet and try again";case DATA_ERROR_DUPLICATION:return"Remove data rows in your source spreadsheet and try again"}}if("undefined"!=typeof exports){var _=require("../charts/vendor/underscore-min"),dataTools=require("../charts/rd-data-tools"),index_of_column_named=dataTools.index_of_column_named;exports.validateSimpleData=validateSimpleData,exports.validateGroupedData=validateGroupedData,exports.validateData=validateData,exports.DATA_ERROR_DUPLICATION=DATA_ERROR_DUPLICATION,exports.DATA_ERROR_MISSING_DATA=DATA_ERROR_MISSING_DATA,exports.DATA_ERROR_COMPLEX_DATA=DATA_ERROR_COMPLEX_DATA,exports.DATA_ERROR_SETTINGS_ERROR=DATA_ERROR_SETTINGS_ERROR}function filterData(e,t){return applyFilter(e,textFilterToIndexFilter(e,t))}function numerateColumns(t,e){_.forEach(e,function(e){numerateColumn(t,e)})}function numerateColumn(e,t){var a=e[0].indexOf(t);for(row=1;row<e.length;row++)row[a]=row[a].toFloat()}function textFilterToIndexFilter(e,t){var a={},n=e[0];for(var r in t){a[n.indexOf(r)]=t[r]}return a}function applyFilter(e,t){var a=_.clone(e),n=a.shift(),r=[];for(var o in a){var i=a[o];itemPassesFilter(i,t)&&r.push(i)}return r.unshift(n),r}function itemPassesFilter(e,t){if(""===e[0])return!1;for(var a in t)if(e[a]!==t[a])return!1;return!0}function formatNumber(e){var t=e.replaceAll("%",""),a=(1*t).toLocaleString("en-uk");return"NaN"===a?t:a}function formatNumberWithDecimalPlaces(e,t){var a=""+e;if(a.match(/\d/))try{a=a.replace("%","")}finally{var n=(1*a).toLocaleString("en-uk",{minimumFractionDigits:t,maximumFractionDigits:t});if("NaN"!==n)return n}return a}function seriesDecimalPlaces(e){var t=0;for(var a in e){var n=decimalPlaces(e[a]);t<n&&(t=n)}return t}function seriesCouldBeYear(e){for(var t in e){var a=e[t];if(0<decimalPlaces(a)||a<1950||2050<a)return!1}return!0}function decimalPlaces(e){var t=(e?String(e):"").match(/\.(\d*[1-9])/);return t?t[1].length:0}function uniqueDataInColumn(e,t){var a=_.map(e.slice(start=0),function(e){return e[t]});return _.uniq(a).sort()}function uniqueDataInColumnOrdered(e,t,a){var n=_.sortBy(e,function(e){return e[a]}),r=_.map(n,function(e){return e[t]});return _.uniq(r)}function uniqueDataInColumnMaintainOrder(e,t){var a=[],n={};return _.forEach(e,function(e){e[t]in n||(a.push(e[t]),n[e[t]]=1)}),a}function textToData(e){var t=e.trim();return 0<=t.search("\t")?_.map(t.split("\n"),function(e){return e.split("\t")}):_.map(t.split("\n"),function(e){return e.split("|")})}var ETHNICITY_ERROR="Ethnicity column error",VALUE_ERROR="Value column error",RECTANGLE_ERROR="Data table error";function validateChart(e){var t=[];return!1===hasHeader("ethnic",e)&&t.push({errorType:ETHNICITY_ERROR}),!1===hasHeader("value",e)&&t.push({errorType:VALUE_ERROR}),!1===isRectangular(e)&&t.push({errorType:RECTANGLE_ERROR}),t}function validateTable(e){var t=[];return!1===hasHeader("ethnic",e)&&t.push({errorType:ETHNICITY_ERROR}),t}function hasHeader(t,e){var a=e[0],n=!1;return _.forEach(a,function(e){0<=e.toLowerCase().search(t)&&(n=!0)}),n}function isRectangular(e){for(var t=e[0].length,a=1;a<e.length;a++)if(e[a].length!==t)return!1;return!0}function nonNumericData(e,t){var n=[],a=e.slice(1);return _.forEach(a,function(a){_.forEach(t,function(e){var t=a[e];isNaN(t)&&n.push(t)})}),n}function index_of_column_named(e,t){if(t&&""!==t){var a=e.indexOf(t.trim().toLowerCase());return-1===a?null:a}return null}if("undefined"!=typeof exports){_=require("./vendor/underscore-min");exports.hasHeader=hasHeader,exports.decimalPlaces=decimalPlaces,exports.seriesDecimalPlaces=seriesDecimalPlaces,exports.seriesCouldBeYear=seriesCouldBeYear,exports.formatNumberWithDecimalPlaces=formatNumberWithDecimalPlaces,exports.uniqueDataInColumn=uniqueDataInColumn,exports.uniqueDataInColumnOrdered=uniqueDataInColumnOrdered,exports.uniqueDataInColumnMaintainOrder=uniqueDataInColumnMaintainOrder,exports.validateChart=validateChart,exports.textToData=textToData,exports.nonNumericData=nonNumericData,exports.index_of_column_named=index_of_column_named,exports.ETHNICITY_ERROR=ETHNICITY_ERROR,exports.VALUE_ERROR=VALUE_ERROR}
//# sourceMappingURL=tablebuilder2.js.map
