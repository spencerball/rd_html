/*
    Functionality of tablebuilder including the main methods that run each stage


    On open **initialiseForm()**
    - grab current_settings from dimension.table_2_source_data if such a thing exists
    - if current_settings doesn't exist open with the data area open.
    - otherwise set the current_settings from file, paste data into the data panel and run the On new data routine below

    On new data (changing data in the data panel area and clicking Okay) **handleNewData()**
    - use an AJAX call to the /get-valid-presets-for-data endpoint to add extra values **buildDataWithPreset()**
    - populate the table builder dropdowns with correct values **populateTableOptions(), populateEthnicityPresets()**
    - if any settings currently exist apply as many as are still relevant **setupTablebuilderWithSettings()**

    On settings changes
    - validate they will make a viable table **getTips()**
    - if so use the rd table object factory and renderer to display a preview **preview()**
    - otherwise display an error and tip to fix it **displayTips()**

    On save
    - build a table object with the rd-table-object factory **buildTableObject()**
    - create a table_settings lump of json **getTablePageSettings()**
    - post both to <dimension>/create-table endpoint **postTableObject()**

 */

// The main working data variables
var presets = [];
var table_data = null;

// Variables that needs to be maintained when the user makes changes to the text data
var current_data = "";
var current_settings = null;

var unselectedOptionString = "Please select";

function getEthnicityColumn(headers) {
    for (var index = 0; index < headers.length; index++) {
        var cleanHeader = headers[index].toLowerCase().trim();
        if (cleanHeader.indexOf('ethnic') >= 0) {
            return index
        }
    }
    return -1;
}

function getEthnicityValues(data) {
    var all_data = _.clone(data);
    var headers = all_data.shift();

    var column = getEthnicityColumn(headers);
    if (column >= 0) {
        return _.pluck(all_data, column);
    }
    return [];
}

function getIsSimpleData(data) {
    var values = getEthnicityValues(data);
    values = _.uniq(values);
    return values.length === data.length - 1
}

$(document).ready(function () {

    // add events to buttons
    $('#preview').click(preview);
    $('#confirm-data').click(setTableData);
    $('#edit-data').click(editTableData);
    $('#cancel-edit-data').click(cancelEditData);
    $('#save').click(saveTable);
    $('#exit').click(back);

    function back(evt) {
        window.location.replace(url_edit_dimension);
    }

    /*
        Events from the DATA ENTRY PANEL
     */

    function setTableData(evt) {
        handleNewData(function () {
            if (current_settings) {
                setupTablebuilderWithSettings(current_settings)
            }
            preview()
        });
        $('#data-panel').hide();
        $('#edit-panel').show();
    }

    function editTableData(evt) {
        current_data = $('#data_text_area').val();
        current_settings = getTablePageSettings();
        $('#data-panel').show();
        $('#data_text_area').focus();
        $('#edit-panel').hide();
    }

    function cancelEditData(evt) {
        $('#data_text_area').val(current_data);
        $('#data-panel').hide();
        $('#edit-panel').show();
    }


    /*
        Initialise the main editor after DATA ENTRY PANEL change
    */

    function handleNewData(on_success) {

        // get the data
        var tabbedData = $("#data_text_area").val();

        // set the DATA DISPLAY content
        table_data = textToData(tabbedData);
        if (table_data.length > 0) {
            message = table_data.length - 1 + ' rows by ' + table_data[0].length + ' columns'
        }
        $('#data-description').html(message);

        // update options in drop-downs
        var headers = table_data[0];
        populateTableOptions(headers);

        // call the backend to do the presets heavy lifting
        var ethnicity_data = getEthnicityValues(table_data);
        $.ajax({
            type: "post",
            url: url_get_classifications,
            dataType: 'json',
            data: JSON.stringify({ 'data': ethnicity_data }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                // upon heavy lifting complete

                // populate the ethnicity presets from the response
                presets = response['presets'];
                populateEthnicityPresets(presets);

                // show the presets (step 2) and table type (step 3) section
                $('#ethnicity_settings_section').show();

                if (getIsSimpleData(table_data)) {
                    $('#simple_table_options').show();
                    $('#complex_table_options').hide();
                } else {
                    $('#simple_table_options').hide();
                    $('#complex_table_options').show();
                }

                // any further processing
                if (on_success) {
                    on_success();
                }
            },
            failure: function () {
                console.log('failure');
            },
            error: function (err) {
                console.log(err);
            }
        });
    }


    /*
        SETUP
    */

    function populateTableOptions(headers) {
        var listWithNone = dropdownHtmlWithDefault(headers, 'none', '[None]');
        var listWithSquareNone = dropdownHtmlWithDefault(headers, '[None]', '[None]');
        var listWithRequired = dropdownHtmlWithDefault(headers, unselectedOptionString, unselectedOptionString);

        $('#ethnicity-as-row__columns').html(listWithRequired);
        $('#ethnicity-as-row__column-order').html(listWithSquareNone);
        $('#ethnicity-as-column__rows').html(listWithRequired);
        $('#ethnicity-as-column__row-order').html(listWithSquareNone);

        $('#table_column_1').html(listWithRequired);
        $('#table_column_2').html(listWithNone);
        $('#table_column_3').html(listWithNone);
        $('#table_column_4').html(listWithNone);
        $('#table_column_5').html(listWithNone);

        $('#index_column_name').val('Ethnicity')
    }

    function selectDropdown(dropdown_id, value) {
        var dropdown = document.getElementById(dropdown_id);
        for (var i = 0; i < dropdown.length; i++) {
            dropdown[i].selected = (dropdown[i].value === value)
        }
    }


    function populateEthnicityPresets(presets) {
        var html = '';
        for (var p in presets) {
            var preset = presets[p]['preset']['name'];
            var code = presets[p]['preset']['code'];
            if (p === 0) {
                html = html + '<option value="' + code + '" selected>' + preset + '</option>';
            } else {
                html = html + '<option value="' + code + '" >' + preset + '</option>';
            }
        }
        $('#ethnicity_settings').html(html);
    }

    function strippedHeaders(headers) {
        var exclude = [];
        var stripped = [];
        for (h in headers) {
            var header = headers[h];
            if (exclude.indexOf(header) < 0) {
                stripped.push(header);
            }
        }
        return stripped;
    }

    function dropdownHtmlWithDefault(headers, defaultValue, defaultLabel) {
        var html = '<option value="' + defaultValue + '" selected>' + defaultLabel + '</option>';
        var stripped = strippedHeaders(headers);
        for (var h in stripped) {
            var header = stripped[h];
            html = html + '<option value="' + header + '">' + header + '</option>';
        }
        return html;
    }

    /*
        PREVIEW
        Render the table as a preview using drawTable() from rd-graph.js
        (this the exact same method that is used front-end)
    */

    function dataColumnChange(evt, columnName) {
        if ($('#' + this.id + '_name').val() === "") {
            $('#' + this.id + '_name').val($('#' + this.id + ' option:selected').val());
        };

        preview(evt);
    }

    function preview(evt) {
        var tips = getTips();
        if (tips.length > 0) {
            displayTips(tips);
        } else {
            displayTable();
        }
    }

    function displayTips(tips) {
        $('#tips_container').show();
        $('#preview_container').hide();

        $("#notes_container").hide();
        $("#errors_container").hide();

        $("#tip-list").children().hide();

        if (tipsOfType(tips, MISSING_FIELD_ERROR).length > 0) {
            $("#notes_container").show();
        }
        if (tipsOfType(tips, ETHNICITY_ERROR).length > 0) {
            $("#errors_container").show();
            $('#tip__ethnicity-column').show();
        }
        if (tipsOfType(tips, RECTANGLE_ERROR).length > 0) {
            $("#errors_container").show();
            $('#tip__rectangular-data').show();
        }
        if (tipsOfType(tips, DATA_ERROR_DUPLICATION).length > 0) {
            $("#errors_container").show();
            $('#tip__duplicate-data').show();
        }
        if (tipsOfType(tips, DATA_ERROR_MISSING_DATA).length > 0) {
            $("#errors_container").show();
            $('#tip__missing-data').show();
        }

    }

    function tipsOfType(tips, errorType) {
        return _.filter(tips, function (tip) {
            return tip.errorType === errorType;
        })
    }

    function displayTable() {
        $('#tips_container').hide();
        $('#preview_container').show();

        var tableObject = innerBuildTableObject();
        if (tableObject) {
            if (tableObject.title && tableObject.title.text) {
                $('#title-container').html('<h3 class="heading-small">' + tableObject.title.text + '</h3>');
            }
            tableObject.title = '';
            drawTable('container', tableObject);

            $('#save_section').show();
        }
    }

    /*
        SAVE
        Save the table by building a tableObject and bundling up all the setting then sending it to the backend
    */

    function saveTable(evt) {

        $('#save').attr('disabled', 'disabled');

        var tableObject = innerBuildTableObject();
        var tableBuilderSettings = getTablePageSettings();
        if (tableObject) {
            postTableObject(tableObject, tableBuilderSettings);
        }
    }

    function postTableObject(tableObject, src) {
        if (tableObject) {
            // adjust for null data
            $.each(tableObject.series, function () {
                for (var i = 0; i < this.data.length; i++) {
                    if (isNaN(this.data[i].y)) {
                        this.data[i].y = 0;
                    }
                }
            });

            $.ajax({
                type: "POST",
                url: url_save_table_to_page,
                dataType: 'json',
                data: JSON.stringify({ 'tableObject': tableObject, 'source': src, 'tableBuilderVersion': 2 }),
                contentType: 'application/json',
                success: function () {
                    location.reload();
                }
            });
        }
    }

    function getTablePageSettings() {
        // get the data
        var tabbedData = $("#data_text_area").val();
        return {
            'data': textToData(tabbedData),
            'preset': getPresetCode(),
            'tableOptions': getTableTypeOptions(),
            'tableValues': getTableValues(),
            'version': '2.0'
        }
    }

    function getTableTypeOptions() {
        if (getIsSimpleData(table_data)) {
            return {};
        }
        else {
            var dataStyle = $('#complex-table__data-style').val();

            var selection = dataStyle === 'ethnicity_as_row' ? $('#ethnicity-as-row__columns').val() : $('#ethnicity-as-column__rows').val();
            var order = dataStyle === 'ethnicity_as_row' ? $('#ethnicity-as-row__column-order').val() : $('#ethnicity-as-column__row-order').val();

            return {
                'data_style': $('#complex-table__data-style').val(),
                'selection': selection,
                'order': order,
            }
        }
    }

    function getTableValues() {
        return {
            'table_title': $('#table_title').val(),
            'table_column_1': $('#table_column_1').val(),
            'table_column_1_name': $('#table_column_1_name').val(),
            'table_column_2': $('#table_column_2').val(),
            'table_column_2_name': $('#table_column_2_name').val(),
            'table_column_3': $('#table_column_3').val(),
            'table_column_3_name': $('#table_column_3_name').val(),
            'table_column_4': $('#table_column_4').val(),
            'table_column_4_name': $('#table_column_4_name').val(),
            'table_column_5': $('#table_column_5').val(),
            'table_column_5_name': $('#table_column_5_name').val(),
            'table_index_column_name': $('#index_column_name').val(),
        }
    }

    function getPresetCode() {
        return $('#ethnicity_settings').val();
    }
    
    function notNullOrNone(val) {  // We ingest some weird/inconsistent data from table builder v1 so this check helps prevent errors.
        return val !== null & val != 'none'
    }

    function buildTableColumns() {
        var columns = []
        $('.column_option_picker').each(function (idx) { if (notNullOrNone($(this).val())) { columns.push($(this).val()); }; });
        return columns
    }

    function buildEthnicityByRowColumns() {
        var columns = [$('#ethnicity-as-row__columns').val()]
        if (notNullOrNone($('#ethnicity-as-row__column-order').val())) {
            columns.push($('#ethnicity-as-row__column-order').val())
        }
        return columns
    }

    function buildEthnicityByColumnColumns() {
        var columns = [$('#ethnicity-as-column__rows').val()]
        if (notNullOrNone($('#ethnicity-as-column__row-order').val())) {
            columns.push($('#ethnicity-as-column__row-order').val())
        }
        return columns
    }

    // This function examines the HTML page and returns an array of headings for columns
    // being used.
    //
    // Note that a column may have no header, and that this is represented by a empty string,
    // eg ['']. This is important as the length of this array is also used to determine the
    // number of columns in use.
    function buildTableColumnNames() {
        var columns = []

        $('.column_option_picker').each(function(index) {

            if($(this).val() !== 'none') {
                columns.push($('.column_option_picker_name')[index].value)
            }

        })

        return columns
    }


    function innerBuildTableObject() {
        var tableObject = null;
        var preset = getPresetWithCode($('#ethnicity_settings').val());
        if (getIsSimpleData(table_data)) {
            tableObject = buildTableObject(buildDataWithPreset(preset, table_data, buildTableColumns()),
                $('#table_title').val(),
                '',
                '',
                'Ethnicity',
                'Ethnicity-parent',
                '[None]',
                'Ethnicity-order',
                buildTableColumns(),
                buildTableColumnNames(),
                $('#index_column_name').val(),
                '[None]');
        } else {
            if ($('#complex-table__data-style').val() === 'ethnicity_as_row') {
                var all_table_columns = buildTableColumns().concat(buildEthnicityByRowColumns());
                tableObject = buildTableObject(buildDataWithPreset(preset, table_data, all_table_columns),
                    $('#table_title').val(),
                    '',
                    '',
                    'Ethnicity',
                    'Ethnicity-parent',
                    $('#ethnicity-as-row__columns').val(),
                    'Ethnicity-order',
                    buildTableColumns(),
                    buildTableColumnNames(),
                    $('#index_column_name').val(),
                    $('#ethnicity-as-row__column-order').val());
            } else {
                var all_table_columns = buildTableColumns().concat(buildEthnicityByColumnColumns());
                tableObject = buildTableObject(buildDataWithPreset(preset, table_data, all_table_columns),
                    $('#table_title').val(),
                    '',
                    '',
                    $('#ethnicity-as-column__rows').val(),
                    '',
                    'Ethnicity',
                    $('#ethnicity-as-column__row-order').val(),
                    buildTableColumns(),
                    buildTableColumnNames(),
                    $('#index_column_name').val(),
                    'Ethnicity-order');
            }
        }
        return tableObject;
    }

    function buildDataWithPreset(preset, data, columns) {
        var rows = [['Ethnicity', 'Ethnicity-parent', 'Ethnicity-order'].concat(columns)];

        var body = _.clone(data);
        var headers = body.shift();
        var lowHeaders = _.map(headers, function (header) {
            return header.toLowerCase().trim()
        });
        var indices = _.map(columns, function (col) {
            var lowCol = col.toLowerCase().trim();
            return lowHeaders.indexOf(lowCol);
        });

        for (var r in preset['data']) {
            var item = preset['data'][r];
            var row = [item['preset'], item['parent'], item['order']];
            row = row.concat(_.map(indices, function (index) {
                return index === -1 ? '' : body[r][index]
            }));
            rows = rows.concat([row])
        }

        return rows;
    }

    function getPresetWithCode(code) {
        for (p in presets) {
            if (presets[p].preset.code === code) {
                return presets[p];
            }
        }
        return null;
    }


    /*
        EVENT HANDLERS
    */
    // Switch TABLE_OPTIONS panels
    $('#ethnicity_settings').change(preview);

    function selectPreset(preset) {
        $('#ethnicity_settings').val(preset);
    }

    /*
        TABLE PANEL events
    */

    // COMPLEX TABLE events
    $('#complex-table__data-style').change(function () {
        selectDataStyle();
        modifyIndexColumnNameAndPreview();
    });
    $('#ethnicity-as-row__columns').change(modifyIndexColumnNameAndPreview);
    $('#grouped-bar__bar_order').change(preview);
    $('#ethnicity-as-column__rows').change(modifyIndexColumnNameAndPreview);
    $('#grouped-bar__groups_order').change(preview);

    $('#table_column_1_name').change(preview);
    $('#table_column_1').change(dataColumnChange);
    $('#table_column_2_name').change(preview);
    $('#table_column_2').change(dataColumnChange);
    $('#table_column_3_name').change(preview);
    $('#table_column_3').change(dataColumnChange);
    $('#table_column_4_name').change(preview);
    $('#table_column_4').change(dataColumnChange);
    $('#table_column_5_name').change(preview);
    $('#table_column_5').change(dataColumnChange);

    $('#index_column_name').change(preview);

    function selectDataStyle() {
        if ($('#complex-table__data-style').val() === "ethnicity_as_row") {
            $('#complex-table__ethnicity-is-row').show();
            $('#complex-table__ethnicity-is-column').hide();
        } else {
            $('#complex-table__ethnicity-is-row').hide();
            $('#complex-table__ethnicity-is-column').show();
        }
    }


    // Show-hide NUMBER-FORMAT__OTHER panel
    $('#number_format').change(function () {
        if ($(this).val() === 'other') {
            $('#other_number_format').show()
        } else {
            $('#other_number_format').hide()
        }
        preview();
    });

    function modifyIndexColumnNameAndPreview(evt) {
        var indexColumnName = $('#index_column_name').val()
        var headers = table_data[0]

        // If index_column_name has not been modified change if possible
        if(headers.indexOf(indexColumnName) >= 0 || indexColumnName === unselectedOptionString) {
            if ($('#complex-table__data-style').val() === "ethnicity_as_column") {
                $('#index_column_name').val($('#ethnicity-as-column__rows').val())
            } else {
                $('#index_column_name').val('Ethnicity')
            }
        }

        preview(evt)
    }

    function initialiseForm() {
        if (settings.data) {
            var data_text = _.map(settings.data, function (d) {
                return d.join('\t')
            }).join('\n');
            $('#data_text_area').val(data_text);

            handleNewData(function () {
                $('#data-panel').hide();
                $('#edit-panel').show();
                setupTablebuilderWithSettings(settings);
                preview()
            })
        }
    };

    function setupTablebuilderWithSettings(settings) {
        if (settings.preset) {
            selectPreset(settings.preset);
        }

        $('#table_title').val(settings.tableValues.table_title);
        document.getElementById('table_title').dispatchEvent(new Event("input"));
        
        $('#complex-table__data-style').val(settings.tableOptions.data_style);

        if (settings.tableOptions.data_style === 'ethnicity_as_row') {
            $('#ethnicity-as-row__columns').val(settings.tableOptions.selection);
            $('#ethnicity-as-row__column-order').val(settings.tableOptions.order);
        } else {
            $('#ethnicity-as-column__rows').val(settings.tableOptions.selection);
            $('#ethnicity-as-column__row-order').val(settings.tableOptions.order);
        }

        selectDataStyle();

        $('#table_column_1').val(settings.tableValues.table_column_1);
        $('#table_column_1_name').val(settings.tableValues.table_column_1_name);
        $('#table_column_2').val(settings.tableValues.table_column_2);
        $('#table_column_2_name').val(settings.tableValues.table_column_2_name);
        $('#table_column_3').val(settings.tableValues.table_column_3);
        $('#table_column_3_name').val(settings.tableValues.table_column_3_name);
        $('#table_column_4').val(settings.tableValues.table_column_4);
        $('#table_column_4_name').val(settings.tableValues.table_column_4_name);
        $('#table_column_5').val(settings.tableValues.table_column_5);
        $('#table_column_5_name').val(settings.tableValues.table_column_5_name);

        $('#index_column_name').val(settings.tableValues.table_index_column_name);
    }

    initialiseForm();
});

/*
 Custom number format is far more complicated than it needs to be
 However it is viable to just use this function to grab it until it becomes a problem
*/

function getNumberFormat() {
    var format = $('#number_format').val();
    if (format === 'none') {
        return { 'multiplier': 1.0, 'prefix': '', 'suffix': '', 'min': '', 'max': '' }
    } else if (format === 'percent') {
        return { 'multiplier': 1.0, 'prefix': '', 'suffix': '%', 'min': 0.0, 'max': 100.0 }
    } else if (format === 'other') {
        return {
            'multiplier': 1.0,
            'prefix': $('#number_format_prefix').val(),
            'suffix': $('#number_format_suffix').val(),
            'min': $('#number_format_min').val(),
            'max': $('#number_format_max').val()
        }
    }
}

function getTips() {

    // 1. Basics
    var basicErrors = validateTable(table_data);
    if (basicErrors.length !== 0) {
        return basicErrors;
    }

    // 2. Required fields
    var missingFields = checkRequiredFields();
    if (missingFields.length !== 0) {
        return missingFields
    }

    // 3. Data errors
    var ethnicityColumn = getEthnicityColumnHeader();
    var secondaryColumn = getSecondaryColumnHeader();

    var dataErrors = validateData(table_data, ethnicityColumn, secondaryColumn);
    return dataErrors;
}

var MISSING_FIELD_ERROR = 'Missing field error';

function checkRequiredFields() {
    if (getIsSimpleData(table_data) === false) {
        if ($('#complex-table__data-style').val() === 'ethnicity_as_row') {
            if ($('#ethnicity-as-row__columns').val() === unselectedOptionString) {
                return [{ 'errorType': MISSING_FIELD_ERROR, 'field': 'ethnicity-as-row__columns' }]
            };
        } else {
            if ($('#ethnicity-as-column__rows').val() === unselectedOptionString) {
                return [{ 'errorType': MISSING_FIELD_ERROR, 'field': 'ethnicity-as-column__rows' }]
            };
        }
    }

    if ($('#table_column_1').val() === unselectedOptionString) {
        return [{ 'errorType': MISSING_FIELD_ERROR, 'field': 'table_column_1' }]
    }

    return [];
}

function getEthnicityColumnHeader() {
    for (var i in table_data[0]) {
        var lower = table_data[0][i].toLowerCase();
        if (lower.search('ethnic') >= 0) {
            return table_data[0][i]
        }
    }
    return null
}

function getSecondaryColumnHeader() {
    if (getIsSimpleData(table_data)) {
        return null;
    } else {
        if ($('#complex-table__data-style').val() === 'ethnicity_as_row') {
            return $('#ethnicity-as-row__columns').val()
        } else {
            return $('#ethnicity-as-column__rows').val()
        }
    }
}

/*
    Helper for selenium tests
*/

function pasteJson(json) {
    var data_text_area = document.getElementById('data_text_area');

    data_text_area.value = _.map(json, function (row) {
        return row.join('\t');
    }).join('\n');
    data_text_area.dispatchEvent(new Event("keyup"));
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
var DATA_ERROR_COMPLEX_DATA = "complex data";


// ---------------------------------------------------------------------------
// PUBLIC
// ---------------------------------------------------------------------------


function validateData(data, categoryColumn, groupColumn) {
    var errors = [];
    var dataRows = _.clone(data);
    var headerRow = dataRows.shift();
    var lowerHeaderRow = _.map(headerRow, function (m) {
        return m.trim().toLowerCase()
    })

    var categoryIndex = index_of_column_named(lowerHeaderRow, categoryColumn);
    if (categoryIndex === null) {
        return [{
            'error': 'could not find data column',
            'column': categoryColumn,
            'errorType': DATA_ERROR_SETTINGS_ERROR
        }]
    }
    if (groupColumn !== null) {
        var groupIndex = index_of_column_named(lowerHeaderRow, groupColumn);
        if (groupIndex === null) {
            return [{
                'error': 'could not find data column',
                'column': groupColumn,
                'errorType': DATA_ERROR_SETTINGS_ERROR
            }]
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
    var lowerHeaderRow = _.map(headerRow, function (m) {
        return m.trim().toLowerCase();
    });
    var categoryIndex = index_of_column_named(lowerHeaderRow, categoryColumn);

    if (categoryIndex === null) {
        return [{'error': 'could not find data column', 'column': categoryColumn}]
    }
    if (groupColumn !== null) {
        var groupIndex = index_of_column_named(lowerHeaderRow, groupColumn);

        if (groupIndex === null) {
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

    var uniqueCategories = _.uniq(_.map(data, function (row) {
        return row[categoryIndex];
    }));

    if (uniqueCategories.length === data.length) {
        return [];
    } else if (data.length % uniqueCategories.length === 0) {
        return [{'errorType': DATA_ERROR_COMPLEX_DATA}]
    } else {
        var dict = {};
        _.forEach(data, function (row) {
            var value = row[categoryIndex];
            if (value in dict) {
                // wrap in if to make sure we don't add multiple error messages
                if (dict[value] !== 'added to errors') {
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
    var rowItems = _.uniq(_.map(data, function (item) {
        return item[categoryIndex];
    }));
    var columnItems = _.uniq(_.map(data, function (item) {
        return item[groupIndex];
    }));
    var errors = [];

    var mapOfPairs = _.object(_.map(rowItems, function (item) {
        return [item, _.map(_.filter(data, function (row) {
            return row[categoryIndex] === item
        }), function (row) {
            return row[groupIndex];
        })];
    }));

    _.forEach(rowItems, function (row) {
        _.forEach(columnItems, function (col) {
            if (!_.contains(mapOfPairs[row], col)) {
                errors.push({
                    'error': 'missing data',
                    'category': row,
                    'group': col,
                    'categoryColumn': categoryColumn,
                    'groupColumn': groupColumn,
                    'errorType': DATA_ERROR_MISSING_DATA
                })
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
        if (categoryValue in groupValuesUsedByCategory) {
            if (groupValue in groupValuesUsedByCategory[categoryValue]) {
                errors.push({
                    'error': 'duplicate data',
                    'category': row[categoryIndex],
                    'group': row[groupIndex],
                    'categoryColumn': categoryColumn,
                    'groupColumn': groupColumn,
                    'errorType': DATA_ERROR_DUPLICATION
                })
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
            if ('group' in error) {
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
if (typeof exports !== 'undefined') {
    var _ = require('../charts/vendor/underscore-min');
    var dataTools = require('../charts/rd-data-tools');
    var index_of_column_named = dataTools.index_of_column_named;

    exports.validateSimpleData = validateSimpleData;
    exports.validateGroupedData = validateGroupedData;
    exports.validateData = validateData;
    exports.DATA_ERROR_DUPLICATION = DATA_ERROR_DUPLICATION;
    exports.DATA_ERROR_MISSING_DATA = DATA_ERROR_MISSING_DATA;
    exports.DATA_ERROR_COMPLEX_DATA = DATA_ERROR_COMPLEX_DATA;
    exports.DATA_ERROR_SETTINGS_ERROR = DATA_ERROR_SETTINGS_ERROR;
}

/**
 * Created by Tom.Ridd on 08/05/2017.
 */

function filterData(data, filter) {

    var indexFilter = textFilterToIndexFilter(data, filter);
    return applyFilter(data, indexFilter);
}

function numerateColumns(data, columns) {
    _.forEach(columns, function (column) {
        numerateColumn(data, column);
    });
}

function numerateColumn(data, column) {
    var index = data[0].indexOf(column);
    for (row = 1; row < data.length; row++) {
        row[index] = row[index].toFloat();
    }
}

function textFilterToIndexFilter(data, textFilter) {
    var indexFilter = {};
    var headers = data[0];

    for (var key in textFilter) {
        var i = headers.indexOf(key);
        indexFilter[i] = textFilter[key];
    }

    return indexFilter;
}

function applyFilter(data, indexFilter) {
    var data2 = _.clone(data);

    var headerRow = data2.shift();
    var filteredRows = [];

    for (var d in data2) {
        var datum = data2[d];
        if (itemPassesFilter(datum, indexFilter)) {
            filteredRows.push(datum);
        }
    }

    filteredRows.unshift(headerRow);
    return filteredRows;
}

function itemPassesFilter(item, filter) {
    if (item[0] === '') { return false; }

    for (var index in filter) {
        if (item[index] !== filter[index]) {
            return false;
        }
    }
    return true;
}

function formatNumber(numStr) {
    var number = numStr.replaceAll("%", "");
    var formatted = (number * 1).toLocaleString("en-uk");
    if (formatted === "NaN") {
        return number;
    } else {
        return formatted;
    }
}



function formatNumberWithDecimalPlaces(value, dp) {

    var number = "" + value;

    // Only do formatting if the string contains some digits
    if (number.match(/\d/)) {
        try {
            number = number.replace("%", "");
        } finally {
            var formatted = (number * 1).toLocaleString("en-uk", { minimumFractionDigits: dp, maximumFractionDigits: dp });
            if (formatted !== "NaN") {
                return formatted;
            }
        }
    }
    return number;
}

function seriesDecimalPlaces(series) {
    var maxDp = 0;
    for (var s in series) {
        var dp = decimalPlaces(series[s]);
        if (dp > maxDp) {
            maxDp = dp;
        }
    }
    return maxDp;
}

function seriesCouldBeYear(series) {
    for (var s in series) {
        var val = series[s];
        if (decimalPlaces(val) > 0 || val < 1950 || val > 2050) {
            return false;
        }
    }
    return true;
}

function decimalPlaces(valueStr) {

    // We only want to match digits following the first
    // full stop, ignoring any trailing zeros.
    var decimalPlacesRegex = /\.(\d*[1-9])/;

    var numStr = valueStr ? String(valueStr) : "";

    var decimalFigureMatch = numStr.match(decimalPlacesRegex);

    if (decimalFigureMatch) {
        return decimalFigureMatch[1].length
    } else {
        return 0
    }
}

function uniqueDataInColumn(data, index) {
    var values = _.map(data.slice(start = 0), function (item) {
        return item[index];
    });
    return _.uniq(values).sort();
}

function uniqueDataInColumnOrdered(data, index, order_column) {
    // Sort by the specified column
    var sorted = _.sortBy(data, function (item) {
        return item[order_column];
    });
    // Pull out unique items
    var values = _.map(sorted, function (item) { return item[index]; });
    return _.uniq(values);
}

function uniqueDataInColumnMaintainOrder(data, index) {
    var values = [];
    var used = {};
    _.forEach(data, function (item) {
        if (!(item[index] in used)) {
            values.push(item[index]);
            used[item[index]] = 1;
        }
    });
    return values;
}


function textToData(textData) {
    var cleanData = textData.trim();
    if (cleanData.search('\t') >= 0) {
        return _.map(cleanData.split('\n'), function (line) { return line.split('\t') });
    } else {
        return _.map(cleanData.split('\n'), function (line) { return line.split('|') });
    }
}

var ETHNICITY_ERROR = 'Ethnicity column error';
var VALUE_ERROR = 'Value column error';
var RECTANGLE_ERROR = 'Data table error';

function validateChart(data) {
    var errors = [];
    if (hasHeader('ethnic', data) === false) { errors.push({ 'errorType': ETHNICITY_ERROR }); }
    if (hasHeader('value', data) === false) { errors.push({ 'errorType': VALUE_ERROR }); }
    if (isRectangular(data) === false) { errors.push({ 'errorType': RECTANGLE_ERROR }); }

    return errors;
}

function validateTable(data) {
    var errors = [];
    if (hasHeader('ethnic', data) === false) { errors.push({ 'errorType': ETHNICITY_ERROR }); }
    return errors;
}

function hasHeader(header, data) {
    var headers = data[0];
    var found = false;
    _.forEach(headers, function (str) {
        var lower = str.toLowerCase();
        if (lower.search(header) >= 0) { found = true; }
    });
    return found;
}

function isRectangular(data) {
    var size = data[0].length;
    for (var i = 1; i < data.length; i++) {
        if (data[i].length !== size) { return false; }
    }
    return true;
}

function nonNumericData(data, columns) {
    var nonNumeric = [];
    var values = data.slice(1);

    _.forEach(values, function (row) {
        _.forEach(columns, function (column) {
            var item = row[column];
            if (isNaN(item)) {
                nonNumeric.push(item);
            }
        });
    });
    return nonNumeric;
}

function index_of_column_named(headers, column) {
    if (!column || column === '') {
        return null
    } else {
        var index = headers.indexOf(column.trim().toLowerCase());
        if (index === -1) {
            return null;
        } else {
            return index;
        }
    }
}

// If we're running under Node - required for testing
if (typeof exports !== 'undefined') {
    var _ = require('./vendor/underscore-min');

    exports.hasHeader = hasHeader;
    exports.decimalPlaces = decimalPlaces;
    exports.seriesDecimalPlaces = seriesDecimalPlaces;
    exports.seriesCouldBeYear = seriesCouldBeYear;
    exports.formatNumberWithDecimalPlaces = formatNumberWithDecimalPlaces;

    exports.uniqueDataInColumn = uniqueDataInColumn;
    exports.uniqueDataInColumnOrdered = uniqueDataInColumnOrdered;
    exports.uniqueDataInColumnMaintainOrder = uniqueDataInColumnMaintainOrder;

    exports.validateChart = validateChart;
    exports.textToData = textToData;

    exports.nonNumericData = nonNumericData;

    exports.index_of_column_named = index_of_column_named;

    exports.ETHNICITY_ERROR = ETHNICITY_ERROR;
    exports.VALUE_ERROR = VALUE_ERROR;
}

//# sourceMappingURL=tablebuilder2.js.map
