var presets=[],chart_data=null,current_data="",current_settings=null;function getNumberFormat(){var a=$("#number_format").val();return"none"===a?{multiplier:1,prefix:"",suffix:"",min:"",max:""}:"percent"===a?{multiplier:1,prefix:"",suffix:"%",min:0,max:100}:"other"===a?{multiplier:1,prefix:$("#number_format_prefix").val(),suffix:$("#number_format_suffix").val(),min:$("#number_format_min").val(),max:$("#number_format_max").val()}:void 0}function getTips(){var a=validateChart(chart_data);if(0!==a.length)return a;var e=checkRequiredFields();if(0!==e.length)return e;var t=getEthnicityColumnHeader(),r=getSecondaryColumnHeader();return validateData(chart_data,t,r)}$(document).ready(function(){function e(e){var a=$("#data_text_area").val();0<(chart_data=textToData(a)).length&&(message=chart_data.length-1+" rows by "+chart_data[0].length+" columns"),$("#data-description").html(message);var t,r,n,o=chart_data[0];r=l(t=o,"[None]"),n=l(t,"[Required]"),$("#line__x-axis_column").html(n),$("#grouped-bar__bar_column").html(n),$("#grouped-bar__bar_order").html(r),$("#grouped-bar__groups_column").html(n),$("#grouped-bar__groups_order").html(r),$("#component__bar_column").html(n),$("#component__bar_order").html(r),$("#component__section_column").html(n),$("#component__section_order").html(r),$("#panel-bar__panel_column").html(n),$("#panel-bar__panel_order").html(r),$("#panel-bar__bar_column").html(n),$("#panel-bar__bar_order").html(r),$("#panel-line__x-axis_column").html(n);var i=function(a){var e=_.clone(a),t=function(a){for(var e=0;e<a.length;e++){var t=a[e].toLowerCase().trim();if(0<=t.indexOf("ethnic"))return e}return-1}(e.shift());if(0<=t)return _.pluck(e,t);return[]}(chart_data);$.ajax({type:"post",url:url_get_classifications,dataType:"json",data:JSON.stringify({data:i}),contentType:"application/json; charset=utf-8",success:function(a){(function(a){var e="";for(var t in a){var r=a[t].preset.name,n=a[t].preset.code;e=0===t?e+'<option value="'+n+'" selected>'+r+"</option>":e+'<option value="'+n+'" >'+r+"</option>"}$("#ethnicity_settings").html(e)})(presets=a.presets),$("#ethnicity_settings_section").show(),$("#select_chart_type").show(),e&&e()},failure:function(){console.log("failed to get ethnicity classifcations")},error:function(a){console.log(a)}})}function l(a,e){var t='<option value="'+e+'" selected>'+e+"</option>",r=function(a){var e=["Measure","Ethnicity","Ethnic group","Value","Values"],t=[];for(h in a){var r=a[h];e.indexOf(r)<0&&t.push(r)}return t}(a);for(var n in r){var _=r[n];t=t+'<option value="'+_+'">'+_+"</option>"}return t}function t(a){var e=getTips();0<e.length?function(a){$("#tips_container").show(),$("#preview_container").hide(),$("#notes_container").hide(),$("#errors_container").hide(),$("#tip-list").children().hide(),0<r(a,MISSING_FIELD_ERROR).length&&$("#notes_container").show();0<r(a,ETHNICITY_ERROR).length&&($("#errors_container").show(),$("#tip__ethnicity-column").show());0<r(a,VALUE_ERROR).length&&($("#errors_container").show(),$("#tip__value-column").show());0<r(a,RECTANGLE_ERROR).length&&($("#errors_container").show(),$("#tip__rectangular-data").show());0<r(a,DATA_ERROR_COMPLEX_DATA).length&&($("#errors_container").show(),$("#tip__complex-data").show());0<r(a,DATA_ERROR_DUPLICATION).length&&($("#errors_container").show(),$("#tip__duplicate-data").show());0<r(a,DATA_ERROR_MISSING_DATA).length&&($("#errors_container").show(),$("#tip__missing-data").show())}(e):function(){$("#tips_container").hide(),$("#preview_container").show();var a=i();a&&(a.title&&a.title.text&&$("#title-container").html('<h3 class="heading-small">'+a.title.text+"</h3>"),a.title="",drawChart("container",a),$("#save_section").show());document.getElementById("chart_title").dispatchEvent(new Event("input"))}()}function r(a,e){return _.filter(a,function(a){return a.errorType===e})}function o(){var a=$("#data_text_area").val(),e=$("#chart_type_selector").val();return{data:textToData(a),type:e,preset:$("#ethnicity_settings").val(),chartOptions:function(a){switch(a){case"bar_chart":return{};case"line_graph":return{x_axis_column:$("#line__x-axis_column").val()};case"grouped_bar_chart":var e=$("#grouped-bar__data_style").val();return"ethnicity_as_group"===e?{data_style:e,bar_column:$("#grouped-bar__bar_column").val()}:{data_style:e,group_column:$("#grouped-bar__groups_column").val()};case"component_chart":var e=$("#component__data_style").val();return"ethnicity_as_sections"===e?{data_style:e,bar_column:$("#component__bar_column").val(),bar_order:$("#component__bar_order").val()}:{data_style:e,section_column:$("#component__section_column").val(),section_order:$("#component__section_order").val()};case"panel_bar_chart":var e=$("#panel-bar__data_style").val();return"ethnicity_as_panels"===e?{data_style:e,bar_column:$("#panel-bar__bar_column").val(),bar_order:$("#panel-bar__bar_order").val()}:{data_style:e,panel_column:$("#panel-bar__panel_column").val(),panel_order:$("#panel-bar__panel_order").val()};case"panel_line_chart":return{x_axis_column:$("#panel-line__x-axis_column").val()};default:return{}}}(e),chartFormat:{chart_title:$("#chart_title").val(),x_axis_label:$("#x_axis_label").val(),y_axis_label:$("#y_axis_label").val(),number_format:$("#number_format").val(),number_format_prefix:$("#number_format_prefix").val(),number_format_suffix:$("#number_format_suffix").val(),number_format_min:$("#number_format_min").val(),number_format_max:$("#number_format_max").val()},version:"2.0"}}function i(){var a=$("#chart_type_selector").val(),e=null,t=function(a){for(p in presets)if(presets[p].preset.code===a)return presets[p];return null}($("#ethnicity_settings").val());if("bar_chart"===a)e=barchartObject(b(t,chart_data,["value"]),"Ethnicity","[None]","Ethnicity-parent","Ethnicity-order",$("#chart_title").val(),$("#x_axis_label").val(),$("#y_axis_label").val(),getNumberFormat());else if("line_graph"===a){var r=$("#line__x-axis_column").val();e=linechartObject(b(t,chart_data,["value",r]),r,"Ethnicity",$("#chart_title").val(),$("#x_axis_label").val(),$("#y_axis_label").val(),getNumberFormat(),"Ethnicity-order")}else if("grouped_bar_chart"===a)if("ethnicity_as_group"===$("#grouped-bar__data_style").val()){var n=$("#grouped-bar__bar_column").val();e=barchartObject(b(t,chart_data,["value",n]),"Ethnicity",n,"[None]","Ethnicity-order",$("#chart_title").val(),$("#x_axis_label").val(),$("#y_axis_label").val(),getNumberFormat())}else{var _=$("#grouped-bar__groups_column").val();e=barchartObject(b(t,chart_data,["value",_]),_,"Ethnicity","[None]","Ethnicity-order",$("#chart_title").val(),$("#x_axis_label").val(),$("#y_axis_label").val(),getNumberFormat())}else if("component_chart"===a)if("ethnicity_as_bar"===$("#component__data_style").val()){var o=$("#component__section_column").val(),i=$("#component__section_order").val(),l=[];l=b(t,chart_data,i&&"[None]"!==i?["value",o,i]:["value",o]),e=componentChartObject(l,"Ethnicity",o,$("#chart_title").val(),$("#x_axis_label").val(),$("#y_axis_label").val(),getNumberFormat(),"Ethnicity-order",i)}else{_=$("#component__bar_column").val();var c=$("#component__bar_order").val();l=[];l=b(t,chart_data,c&&"[None]"!==c?["value",_,c]:["value",_]),e=componentChartObject(b(t,chart_data,["value",_]),_,"Ethnicity",$("#chart_title").val(),$("#x_axis_label").val(),$("#y_axis_label").val(),getNumberFormat(),c,"Ethnicity-order")}else if("panel_bar_chart"===a)if("ethnicity_as_panel_bars"===$("#panel-bar__data_style").val()){var s=$("#panel-bar__panel_column").val(),u=$("#panel-bar__panel_order").val();l=[];l=b(t,chart_data,u&&"[None]"!==u?["value",s,u]:["value",s]),e=panelBarchartObject(l,"Ethnicity",s,$("#chart_title").val(),"","",getNumberFormat(),"Ethnicity-order",u)}else{var h=$("#panel-bar__bar_column").val(),m=$("#panel-bar__bar_order").val();l=[];l=b(t,chart_data,h&&"[None]"!==m?["value",h,m]:["value",h]),e=panelBarchartObject(l,h,"Ethnicity",$("#chart_title").val(),"","",getNumberFormat(),m,"Ethnicity-order")}else if("panel_line_chart"===a){var d=$("#panel-line__x-axis_column").val();l=b(t,chart_data,["value",d]);e=panelLinechartObject(l,d,"Ethnicity",$("#chart_title").val(),"","",getNumberFormat(),"Ethnicity-order")}return e}function b(a,e,t){var r=[["Ethnicity","Ethnicity-parent","Ethnicity-order"].concat(t)],n=_.clone(e),o=n.shift(),i=_.map(o,function(a){return a.toLowerCase().trim()}),l=_.map(t,function(a){var e=a.toLowerCase().trim();return i.indexOf(e)});for(var c in a.data){var s=a.data[c],u=[s.preset,s.parent,s.order];u=u.concat(_.map(l,function(a){return-1===a?"":n[c][a]})),r=r.concat([u])}return r}function n(a){$("#chart_type_selector").val(a),$(".chart-option-group").hide(),"none"!==a&&($("#"+a+"_options").show(),$("#chart_format_options").show()),$("#preview_section").show()}function c(a){var e;switch($("#chart_type_selector").val(a.type),n(a.type),a.preset&&(e=a.preset,$("#ethnicity_settings").val(e)),$("#chart_title").val(a.chartFormat.chart_title),a.type){case"line_graph":var t=a.chartOptions.x_axis_column;$("#line__x-axis_column").val(t);break;case"grouped_bar_chart":var r=a.chartOptions.data_style;$("#grouped-bar__data_style").val(r),"ethnicity_as_group"===r?($("#grouped-bar__bar_column").val(a.chartOptions.bar_column),$("#grouped-bar__ethnicity_is_group").show(),$("#grouped-bar__ethnicity_is_bar").hide()):($("#grouped-bar__groups_column").val(a.chartOptions.group_column),$("#grouped-bar__ethnicity_is_group").hide(),$("#grouped-bar__ethnicity_is_bar").show());break;case"component_chart":r=a.chartOptions.data_style;$("#component__data_style").val(r),"ethnicity_as_sections"===r?($("#component__bar_column").val(a.chartOptions.bar_column),$("#component__bar_order").val(a.chartOptions.bar_order),$("#component__ethnicity_is_sections").show(),$("#component__ethnicity_is_bar").hide()):($("#component__section_column").val(a.chartOptions.section_column),$("#component__section_order").val(a.chartOptions.section_order),$("#component__ethnicity_is_sections").hide(),$("#component__ethnicity_is_bar").show());break;case"panel_bar_chart":r=a.chartOptions.data_style;$("#panel-bar__data_style").val(r),"ethnicity_as_panels"===r?($("#panel-bar__bar_column").val(a.chartOptions.bar_column),$("#panel-bar__bar_order").val(a.chartOptions.bar_order),$("#panel-bar__ethnicity_as_bar").hide(),$("#panel-bar__ethnicity_as_panels").show()):($("#panel-bar__panel_column").val(a.chartOptions.panel_column),$("#panel-bar__panel_order").val(a.chartOptions.panel_order),$("#panel-bar__ethnicity_as_bar").show(),$("#panel-bar__ethnicity_as_panels").hide());break;case"panel_line_chart":t=a.chartOptions.x_axis_column;$("#panel-line__x-axis_column").val(t)}$("#number_format").val(a.chartFormat.number_format),$("#number_format_prefix").val(a.chartFormat.number_format_prefix),$("#number_format_suffix").val(a.chartFormat.number_format_suffix),$("#number_format_min").val(a.chartFormat.number_format_min),$("#number_format_max").val(a.chartFormat.number_format_max),"other"===a.chartFormat.number_format&&$("#other_number_format").show()}$("#preview").click(t),$("#confirm-data").click(function(a){e(function(){current_settings&&c(current_settings),t()}),$("#data-panel").hide(),$("#edit-panel").show()}),$("#edit-data").click(function(a){current_data=$("#data_text_area").val(),current_settings=o(),$("#data-panel").show(),$("#edit-panel").hide()}),$("#cancel-edit-data").click(function(a){$("#data_text_area").val(current_data),$("#data-panel").hide(),$("#edit-panel").show()}),$("#save").click(function(a){$("#save").attr("disabled","disabled");var e=i(),t=o();e&&(n=t,(r=e)&&($.each(r.series,function(){for(var a=0;a<this.data.length;a++)isNaN(this.data[a].y)&&(this.data[a].y=0)}),$.ajax({type:"POST",url:url_save_chart_to_page,dataType:"json",data:JSON.stringify({chartObject:r,source:n,chartBuilderVersion:2}),contentType:"application/json",success:function(){location.reload()}})));var r,n}),$("#exit").click(function(a){window.location.replace(url_edit_dimension)}),$("#ethnicity_settings").change(t),$("#chart_type_selector").change(function(){n($(this).val()),t()}),$("#line__x-axis_column").change(t),$("#grouped-bar__data_style").change(function(){"ethnicity_as_group"===$(this).val()?($("#grouped-bar__ethnicity_is_group").show(),$("#grouped-bar__ethnicity_is_bar").hide()):($("#grouped-bar__ethnicity_is_group").hide(),$("#grouped-bar__ethnicity_is_bar").show()),t()}),$("#grouped-bar__bar_column").change(t),$("#grouped-bar__bar_order").change(t),$("#grouped-bar__groups_column").change(t),$("#grouped-bar__groups_order").change(t),$("#component__data_style").change(function(){"ethnicity_as_bar"===$(this).val()?($("#component__ethnicity_is_bar").show(),$("#component__ethnicity_is_sections").hide()):($("#component__ethnicity_is_bar").hide(),$("#component__ethnicity_is_sections").show()),t()}),$("#component__section_column").change(t),$("#component__section_order").change(t),$("#component__bar_column").change(t),$("#component__bar_order").change(t),$("#panel-bar__data_style").change(function(){"ethnicity_as_panel_bars"===$(this).val()?($("#panel-bar__ethnicity_as_bar").show(),$("#panel-bar__ethnicity_as_panels").hide()):($("#panel-bar__ethnicity_as_bar").hide(),$("#panel-bar__ethnicity_as_panels").show()),t()}),$("#panel-bar__bar_column").change(t),$("#panel-bar__bar_order").change(t),$("#panel-bar__panel_column").change(t),$("#panel-bar__panel_order").change(t),$("#panel-line__x-axis_column").change(t),$("#number_format").change(function(){"other"===$(this).val()?$("#other_number_format").show():$("#other_number_format").hide(),t()}),function(){if(settings.data){var a=_.map(settings.data,function(a){return a.join("\t")}).join("\n");$("#data_text_area").val(a),e(function(){$("#data-panel").hide(),$("#edit-panel").show(),c(settings),t()})}}()});var MISSING_FIELD_ERROR="Missing field error";function checkRequiredFields(){switch($("#chart_type_selector").val()){case"bar_chart":return[];case"line_graph":if("[Required]"===$("#line__x-axis_column").val())return[{errorType:MISSING_FIELD_ERROR,field:"line__x-axis_column"}];break;case"grouped_bar_chart":if("ethnicity_as_group"===$("#grouped-bar__data_style").val()){if("[Required]"===$("#grouped-bar__bar_column").val())return[{errorType:MISSING_FIELD_ERROR,field:"grouped-bar__bar_column"}]}else if("[Required]"===$("#grouped-bar__groups_column").val())return[{errorType:MISSING_FIELD_ERROR,field:"grouped-bar__groups_column"}];break;case"component_chart":if("ethnicity_as_sections"===$("#component__data_style").val()){if("[Required]"===$("#component__bar_column").val())return[{errorType:MISSING_FIELD_ERROR,field:"component__bar_column"}]}else if("[Required]"===$("#component__section_column").val())return[{errorType:MISSING_FIELD_ERROR,field:"component__section_column"}];break;case"panel_bar_chart":if("ethnicity_as_panels"===$("#panel-bar__data_style").val()){if("[Required]"===$("#panel-bar__bar_column").val())return[{errorType:MISSING_FIELD_ERROR,field:"panel-bar__bar_column"}]}else if("[Required]"===$("#panel-bar__panel_column").val())return[{errorType:MISSING_FIELD_ERROR,field:"panel-bar__panel_column"}];break;case"panel_line_chart":if("[Required]"===$("#panel-line__x-axis_column").val())return[{errorType:MISSING_FIELD_ERROR,field:"panel-line__x-axis_column"}];break;default:return[{errorType:MISSING_FIELD_ERROR,field:"chart_type_selector"}]}return[]}function getEthnicityColumnHeader(){for(var a in chart_data[0]){if(0<=chart_data[0][a].toLowerCase().search("ethnic"))return chart_data[0][a]}return null}function getSecondaryColumnHeader(){switch($("#chart_type_selector").val()){case"bar_chart":return null;case"line_graph":return $("#line__x-axis_column").val();case"grouped_bar_chart":return"ethnicity_as_group"===$("#grouped-bar__data_style").val()?$("#grouped-bar__bar_column").val():$("#grouped-bar__groups_column").val();case"component_chart":return"ethnicity_as_sections"===$("#component__data_style").val()?$("#component__bar_column").val():$("#component__section_column").val();case"panel_bar_chart":return"ethnicity_as_panels"===$("#panel-bar__data_style").val()?$("#panel-bar__bar_column").val():$("#panel-bar__panel_column").val();case"panel_line_chart":return $("#panel-line__x-axis_column").val();default:return null}}function pasteJson(a){var e=document.getElementById("data_text_area");e.value=_.map(a,function(a){return a.join("\t")}).join("\n"),e.dispatchEvent(new Event("keyup"))}
//# sourceMappingURL=chartbuilder2.js.map
