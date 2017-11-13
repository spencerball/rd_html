/**
 * Created by Tom.Ridd on 08/05/2017.
 */
var defaultParentColor = '#2B8CC4';
var defaultChildColor = '#B3CBD9';
var VERSION = '1.1'; // panel charts include sort option

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

function isNumber(value) {
    return !isNaN(parseFloat(value));
}

function valueForCategoryAndSeries(dataRows, categoryIndex, categoryValue, seriesIndex, seriesValue, valueIndex) {

    var rows = _.filter(dataRows, function(row) { return row[categoryIndex] === categoryValue && row[seriesIndex] === seriesValue });
    return rows.length > 0 ? parseFloat(rows[0][valueIndex]) : 0;
}

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

function isUndefinedOrNull(value) {
    return value === undefined || value === null;
}

function getIndices(headerRow, category_column, secondary_column, parent_column, order_column, custom_column) {
    var headersLower = _.map(headerRow, function(item) { return item.toLowerCase();});

    var category = isUndefinedOrNull(category_column) ? null: headersLower.indexOf(category_column.toLowerCase());
    var order = isUndefinedOrNull(order_column) ? category : headersLower.indexOf(order_column.toLowerCase());
    var parent = isUndefinedOrNull(parent_column) ? null: headersLower.indexOf(parent_column.toLowerCase());
    var secondary = isUndefinedOrNull(secondary_column) ? null: headersLower.indexOf(secondary_column.toLowerCase());
    var custom = isUndefinedOrNull(custom_column) ? null: headersLower.indexOf(custom_column.toLowerCase());

    return {
        'category': category >= 0 ? category : null,
        'order': order >= 0 ? order : null,
        'secondary': secondary >= 0 ? secondary : null,
        'value': headersLower.indexOf('value'),
        'parent': parent >= 0 ? parent : null,
        'custom': custom >= 0 ? custom : null
    };
}

// If we're running under Node - required for testing
if(typeof exports !== 'undefined') {
    var _ = require('../charts/vendor/underscore-min');
    var dataTools = require('../charts/rd-data-tools');
    var uniqueDataInColumnMaintainOrder = dataTools.uniqueDataInColumnMaintainOrder;

    exports.barchartObject = barchartObject;
    exports.linechartObject = linechartObject;
    exports.componentChartObject = componentChartObject;
    exports.panelLinechartObject = panelLinechartObject;
    exports.panelBarchartObject = panelBarchartObject;
}

/**
 * Created by Tom.Ridd on 25/07/2017.
 */
var NONE_VALUE = '[None]';

function buildTableObject(data, title, subtitle, footer, row_column, parent_column, group_column, order_column, data_columns, column_captions, first_column_caption, group_order_column) {
    var table = null;
    if(!group_column || group_column === NONE_VALUE) {
        table = simpleTable(data, title, subtitle, footer, row_column, parent_column, data_columns, order_column, column_captions, first_column_caption);
    } else {
        table = groupedTable(data, title, subtitle, footer, row_column, parent_column, group_column, data_columns, order_column, column_captions, first_column_caption, group_order_column);
    }
    return preProcessTableObject(table);
}

function simpleTable(data, title, subtitle, footer, category_column, parent_column, data_columns, order_column, column_captions, first_column_caption) {
    var dataRows = _.clone(data);
    var headerRow = dataRows.shift();

    var columnIndex = headerRow.indexOf(category_column);
    var data_column_indices = _.map(data_columns, function(data_column) { return headerRow.indexOf(data_column); });

    var parentIndex = columnIndex;
    var hasParentChild = false;
    if(parent_column && parent_column !== NONE_VALUE) {
        parentIndex = headerRow.indexOf(parent_column);
        hasParentChild = true;
    }

    if(order_column && order_column !== NONE_VALUE) {
        var sortIndex = headerRow.indexOf(order_column);
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

function buildDataObjects(group_values, dataRows, group_column_index, columnIndex, hasParentChild, parentIndex, sortIndex, DEFAULT_SORT, data_column_indices) {
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

function groupedTable(data, title, subtitle, footer,  category_column, parent_column, group_column, data_columns, order_column, column_captions, first_column_caption, group_order_column) {
    var DEFAULT_SORT = -2;
    var data_by_row = _.clone(data);
    var headerRow = data_by_row.shift();


    // ------------------- FIND INDICES FOR THE COLUMNS --------------------------

    var columnIndex = headerRow.indexOf(category_column);
    var data_column_indices = _.map(data_columns, function(data_column) { return headerRow.indexOf(data_column); });

    var group_column_index = headerRow.indexOf(group_column);

    var sortIndex = DEFAULT_SORT;
    if (order_column === null) {
        sortIndex = columnIndex;
    } else if(order_column !== NONE_VALUE) {
        sortIndex = headerRow.indexOf(order_column);
    }

    var parentIndex = columnIndex;
    var hasParentChild = false;
    if(parent_column && parent_column !== NONE_VALUE) {
        parentIndex = headerRow.indexOf(parent_column);
        hasParentChild = true;
    }


    // ----------------------- CONVERT TO DATA ITEM OBJECTS ----------------------
    var data_by_group = getDataByGroup(data_by_row, group_column_index, group_order_column, headerRow);
    var data_items_by_group = buildDataObjects(data_by_group, data_by_row, group_column_index, columnIndex, hasParentChild, parentIndex, sortIndex, DEFAULT_SORT, data_column_indices);


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

function getColumnIndex(headerRow, column_name) {
    if(parent_column && parent_column !== NONE_VALUE) {
        return headerRow.indexOf(column_name);
    } else {
        return null;
    }
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

function preProcessTableObject(tableObject) {
    if(tableObject.type === 'simple') {
        preProcessSimpleTableObject(tableObject);
    } else if(tableObject.type === 'grouped') {
        preProcessGroupedTableObject(tableObject);
    }
    return tableObject;
}

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
function adjustSimpleTableDataForParents(tableData) {
    var fullData = addMissingSimpleTableParentItems(tableData);
    return reorderSimpleTableDataForParentChild(fullData);
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

// If we're running under Node - required for testing
if(typeof exports !== 'undefined') {
    var _ = require('../charts/vendor/underscore-min');
    var dataTools = require('../charts/rd-data-tools');
    var uniqueDataInColumnMaintainOrder = dataTools.uniqueDataInColumnMaintainOrder;
    var seriesDecimalPlaces = dataTools.seriesDecimalPlaces;
    var seriesCouldBeYear = dataTools.seriesCouldBeYear;
    var formatNumberWithDecimalPlaces = dataTools.formatNumberWithDecimalPlaces;

    exports.buildTableObject = buildTableObject;
    exports.simpleTable = simpleTable;
    exports.groupedTable = groupedTable;
}
/**
 * Created by Tom.Ridd on 05/05/2017.
 */

function drawTable(container_id, tableObject) {

    preProcessTableObject(tableObject);

    if(tableObject.type === 'simple') {
        return simpleHtmlTable(container_id, tableObject);
    } else if (tableObject.type === 'grouped') {
        return groupedHtmlTable(container_id, tableObject);
    }
}

function simpleHtmlTable(container_id, tableObject) {

    var table_html = "";
    table_html = appendTableTitle(table_html, tableObject);
    table_html = appendTableSubtitle(table_html, tableObject);

    table_html = table_html + "<table class='table table-sm'>";
    table_html = appendSimpleTableHeader(table_html, tableObject);
    table_html = appendSimpleTableBody(table_html, tableObject);
    table_html = table_html + "</table>";

    $("#" + container_id).html(table_html);

    return true;
}

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

function appendTableTitle(table_html, tableObject) {
    if(tableObject.header && tableObject.header !== '') {
        return table_html + "<div class='table-title heading-small'>" + tableObject.header + "</div>";
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

function appendTableSubtitle(table_html, tableObject) {
    if(tableObject.subtitle && tableObject.subtitle !== '') {
        return table_html + "<div class='table-subtitle'>" + tableObject.subtitle + "</div>";
    } else {
        return table_html;
    }
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
