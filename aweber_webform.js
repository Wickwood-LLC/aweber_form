jQuery(document).ready(function($){

    var $ = jQuery,
        $listDropDown       = $('#edit-aweber-webform-list'),
        $webformRadioTables   = $('.aweber_webform_webform_radiotables'),
        $webformSelectLabel = $('#edit-aweber-webform-webform-select-label');

    /**
     * Hide tables for web forms and
     * the web form label
     */
    var hideFormSelectors = function hideFormSelectors() {
        $webformRadioTables.hide();
        $webformSelectLabel.hide();
    }

    /**
     * Get current list selected
     */
    var currentFormDropDown = function currentFormDropDown() {
        var list = $listDropDown.val();
        return (list != "") ?
            $('#aweber_webform_webform_' + list) : undefined;
    }

    /**
     * Get div of currently selected list's web forms
     */
    var currentFormDropDownDiv = function currentFormDropDownDiv() {
        var list = $listDropDown.val();
        return (list != "") ?
            $('#aweber_webform_webform_radiotable_' + list) : undefined;
    }

    /**
     * Hides everything, then shows web forms
     * for the currently selected list
     */
    var updateViewableFormSelector = function updateViewableFormSelector() {
        hideFormSelectors();
        var $dropdown = currentFormDropDownDiv();
        if ($dropdown != undefined) $dropdown.show();
    }

    /**
     * Hides the web form select label if
     * no list is currently selected
     */
    var updateWebformSelectLabel = function updateWebformSelectLabel() {
        ($listDropDown.val()) ?
            $webformSelectLabel.show() :
            $webformSelectLabel.hide();
    }

    /**
     * If page has already loaded,
     * update viewable components
     */
    if ($listDropDown.get(0)) {
        updateViewableFormSelector();
        updateWebformSelectLabel();
    }

    /**
     * On list dropdown change,
     * update viewable components
     */
    $listDropDown.live('change', function() {
        updateViewableFormSelector();
        var $formDropdown = currentFormDropDown();
        if ($formDropdown != undefined) {
            $formDropdown.val('');
            updateWebformSelectLabel();
        }
    });

    $('div.aweber_webform_button_loading').hide();

    //Hide save button on null form
    $('#aweber_webform_null #edit-submit').hide();

    $('input[name="op"]').live('click', function() {
        $(this).val('Saving...');
    });

    $('input[name="refresh"]').live('click', function() {
        $(this).val('Refreshing...');
    });

    $('input[name="deauth"]').live('click', function() {
        $(this).val('Deauthorizing...');
    });

    $('.aweber_webform_fakebutton').hide();

    function myqtip($item, $text, $target, $tooltip, $width) {
        $item.qtip({
        content: $text,
        position: {
            corner: {
                target: $target,
                tooltip: $tooltip
            }
        },
        style: {
            name: 'dark',
            width: $width,
            tip: $tooltip
        },
        show: 'mouseover',
        hide: 'mouseout',
        });
    }

    myqtip($('.aweber_webform_table_splittest_name'), 'Split Test Name', 'topMiddle', 'bottomMiddle', 150);

    myqtip($('.aweber_webform_table_webform_name'), 'Web Form Name', 'topMiddle', 'bottomMiddle', 150);

    myqtip($('.aweber_webform_table_weight'), 'The percent probability that this web form will be displayed versus the other web forms in the split.', 'topMiddle', 'bottomMiddle', 200);

    myqtip($('.aweber_webform_table_displays'), 'The number of times this web form has been displayed as a part of this split test.', 'topMiddle', 'bottomMiddle', 200);

    myqtip($('.aweber_webform_table_submissions'), 'The number of new subscribers that have been generated thru this web form split test.', 'topMiddle', 'bottomMiddle', 200);

    myqtip($('.aweber_webform_table_conv'), 'The ratio of new subscribers divided by total displays.  ie) your conversion rate.', 'topMiddle', 'bottomMiddle', 200);

    myqtip($('.aweber_webform_table_unique_displays'), 'The number of times this web form has been displayed to unique visitors in this split test.', 'topMiddle', 'bottomMiddle', 200);

    myqtip($('.aweber_webform_table_unique_conv'), 'The ratio of new subscribers divided by the unique visitors who saw this web form.  Shows your unique conversion rate.', 'topMiddle', 'bottomMiddle', 200);

    myqtip($('.aweber_webform_table_preview'), 'Click this link to preview what your web form will look like on your website.', 'topMiddle', 'bottomMiddle', 200);

    myqtip($('.aweber_webform_table_type'), 'Displays the type of web form; pop-over (hover pop), pop-up, pop-under, exit pop, inline (embeded into the webpage like a standard form).', 'topMiddle', 'bottomMiddle', 200);

    myqtip($('#aweber_webform_helpRefresh'), 'Don\'t see the list or form you want? Click this to display any recently created lists or web forms.', 'rightMiddle', 'leftMiddle', 300);

    myqtip($('#aweber_webform_helpDeauth'), 'This will deauthorize your AWeber account for this application, allowing you to authorize and use another account.', 'bottomLeft', 'topRight', 300);

});

