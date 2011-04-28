jQuery(document).ready(function($){

    var $ = jQuery,
        $listDropDown       = $('#edit-aweber-webform-list'),
        $previewLink        = $('#aweber_webform-form-preview'),
        $webformDropdowns   = $('.aweber_webform_webform_dropdowns'),
        $webformSelectLabel = $('#edit-aweber-webform-webform-select-label');

    var hideFormSelectors = function hideFormSelectors() {
        $webformDropdowns.hide();
        $webformSelectLabel.hide();
    }

    var currentFormDropDown = function currentFormDropDown() {
        var list = $listDropDown.val();
        return (list != "") ?
            $('#edit-aweber-webform-webform-' + list) : undefined;
    }

    var currentFormDropDownDiv = function currentFormDropDownDiv() {
        var list = $listDropDown.val();
        return (list != "") ?
            $('#aweber_webform_webform_dropdown_' + list) : undefined;
    }

    var updateViewableFormSelector = function updateViewableFormSelector() {
        hideFormSelectors();
        var $dropdown = currentFormDropDownDiv();
        if ($dropdown != undefined) $dropdown.show();
    }

    var updatePreviewLink = function updatePreviewLink() {
        var formUrl       = "",
            list          = $listDropDown.val(),
            $formDropdown = currentFormDropDown();

        if ($formDropdown != undefined) {
            formUrl = $formDropdown.val().split(' ')[0];
        }
        if (formUrl == "") {
            $previewLink.attr('href', '#').hide();
        } else {
            formUrl = formUrl.split('/');
            var formId   = formUrl.pop(),
                formType = formUrl.pop();

            if (formType == 'web_form_split_tests') {
                $previewLink.attr('href', '#').hide();
            } else {
                var hash = formId % 100;
                hash = ((hash < 10) ? '0' : '') + hash;
                $previewLink.attr('href', 'http://forms.aweber.com/form/'+
                    hash + '/' + formId + '.html').show();
            }
        }
    }

    var updateWebformSelectLabel = function updateWebformSelectLabel() {
        ($listDropDown.val()) ?
            $webformSelectLabel.show() :
            $webformSelectLabel.hide();
    }

    if ($listDropDown.get(0)) {
        updateViewableFormSelector();
        updateWebformSelectLabel();
        updatePreviewLink();
    }

    $listDropDown.live('change', function() {
        updateViewableFormSelector();
        var $formDropdown = currentFormDropDown();
        if ($formDropdown != undefined) {
            $formDropdown.val('');
            updateWebformSelectLabel();
        }
        updatePreviewLink();
    });

    $('div.aweber_webform_webform_dropdowns select').live('change',
        updatePreviewLink);

    $('div.aweber_webform_button_loading').hide();

    //Hide save button on null form
    $('#aweber_webform_null #edit-submit').hide();

    $('input[name="op"]').live('click', function() {
        $('#aweber_webform-loading-save').show();
    });

    $('input[name="refresh"]').live('click', function() {
        $('#aweber_webform-loading-refresh').show();
    });

    $('input[name="deauth"]').live('click', function() {
        $('#aweber_webform-loading-deauth').show();
    });

    $('#helpRefresh').qtip({
        content:'This will check AWeber for any recent web forms you may have added and load them into the dropdowns above.',
        position: {
            corner: {
                target: 'topRight',
                tooltip: 'bottomLeft'
            }
        },
        style: {
            name: 'dark'
        },
        show: 'mouseover',
        hide: 'mouseout',
    });

    $('#helpDeauth').qtip({
        content:'This will deauthorize your AWeber account for this application, allowing you to authorize and use another account.',
        position: {
            corner: {
                target: 'bottomRight',
                tooltip: 'topLeft'
            }
        },
        style: {
            name: 'dark'
        },
        show: 'mouseover',
        hide: 'mouseout',
    });

});
