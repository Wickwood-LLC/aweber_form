<?php

namespace AWeber\WebForm;

define('APP_ID', '96d89a0a');
define('AUTH_URL', 'https://auth.aweber.com/1.0/oauth/authorize_app/');
define('URL_PATH', file_create_url(drupal_get_path('module', 'aweber_webform')));


/**
 * Creates the form that prompts for
 * account authorization
 */
function get_Auth_Key_Form($form, &$form_state) {
  $form['aweber_webform_authkey'] = array(
    '#type'          => 'textarea',
    '#title'         => t('Authorization Key'),
    '#default_value' => t(''),
    '#cols'          => 30,
    '#rows'          => 2,
    '#maxlength'     => 200,
    '#description'   => t(''),
    '#required'      => TRUE,
    '#suffix'        => '&nbsp;<a href="' . AUTH_URL . APP_ID . '" target="_blank">Click here to obtain an authorization key and copy it into the box above.</a><br>',
  );

  $form['submit2'] = submitButtonFake();

  return system_settings_form($form);
}

/**
 * Creates the form that prompts for
 * user to create a web form
 */
function get_Null_Form($form, &$form_state) {
  $form['aweber_webform_null_text'] = array(
    '#prefix' => 'This AWeber account does not currently have any completed web forms.<br>',
    '#suffix' => 'Please <a href="https://www.aweber.com/users/web_forms/index" target="_blank">create a web form</a> in order to place it on your blog.<br><div id="aweber_webform_null">',
  );

  $form['aweber_webform_null'] = array(
    '#prefix' => '</div>',
    '#weight' => 1001,
    '#suffix' => '<br>',
  );

  $form['refresh']  = refreshButton();
  $form['deauth']   = deauthorizeButton();
  $form['refresh2'] = refreshButtonFake();
  $form['deauth2']  = deauthorizeButtonFake();

  return system_settings_form($form);
}

/**
 * Deauthorizes AWeber account by
 * emptying the table
 */
function deauthorize() {
  db_update('aweber_webform')
    ->fields(array(
      'consumer_key'     => '',
      'consumer_secret'  => '',
      'access_key'       => '',
      'access_secret'    => '',
      'js_url'           => '',
      'lists'            => '',
      'web_forms'        => '',
      'split_tests'      => '',
      'timestamp'        => '0',
    ))->execute();
}

/**
 * Refreshs the page with a fresh API call
 * by setting timestamp to 0,
 * timing out the latest API call
 */
function refresh() {
  db_update('aweber_webform')
    ->fields(array(
      'timestamp' => '0',
    ))->execute();
}

/**
 * Add a button to refresh the page
 */
function refreshButton() {
  return array(
    '#prefix' => '<div class="aweber_webform_refresh">',
    '#type'   => 'submit',
    '#value'  => t('Refresh Lists'),
    '#name'   => 'refresh',
    '#suffix' => '<img class="aweber_webform_help" id="aweber_webform_helpRefresh" src="'
    . URL_PATH . '/questionmark.png" alt=""></div>',
  );
}

/**
 * Add a fake refresh button with the changed text
 * so the form state will recognize the pressed button
 */
function refreshButtonFake() {
  return array(
    '#prefix' => '<div class="aweber_webform_fakebutton">',
    '#type'   => 'submit',
    '#value'  => t('Refreshing...'),
    '#name'   => 'refresh',
    '#suffix' => '</div>',
  );
}

/**
 * Add a button to deauthorize the AWeber account
 */
function deauthorizeButton() {
  return array(
    '#prefix' => '<div class="aweber_webform_deauthorize">',
    '#type'   => 'submit',
    '#value'  => t('Deauthorize Account'),
    '#name'   => 'deauth',
    '#suffix' => '<img class="aweber_webform_help" id="aweber_webform_helpDeauth" src="' 
    . URL_PATH . '/questionmark.png" alt=""></div>',
  );
}

/**
 * Add a fake deauth button with the changed text
 * so the form state will recognize the pressed button
 */
function deauthorizeButtonFake() {
  return array(
    '#prefix' => '<div class="aweber_webform_fakebutton">',
    '#type'   => 'submit',
    '#value'  => t('Deauthorizing...'),
    '#name'   => 'deauth',
    '#suffix' => '</div>',
  );
}

/**
 * Add a fake submit button with the changed text
 * so the form state will recognize the pressed button
 */
function submitButtonFake() {
  return array(
    '#prefix' => '<div class="aweber_webform_fakebutton">',
    '#type'   => 'submit',
    '#value'  => t('Saving...'),
    '#name'   => 'op',
    '#suffix' => '</div>',
  );
}

