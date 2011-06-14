<?php

/*
 * This class has functions that are used in aweber_webform.module.
 */
class AWeber_Webform {

  const APP_ID = '96d89a0a';
  const AUTH_URL = 'https://auth.aweber.com/1.0/oauth/authorize_app/';

  /**
   * Creates the form that prompts for account authorization.
   */
  public static function get_Auth_Key_Form($form, &$form_state) {
    $form['aweber_webform_authkey'] = array(
      '#type'          => 'textarea',
      '#title'         => t('Authorization Key'),
      '#default_value' => t(''),
      '#cols'          => 30,
      '#rows'          => 2,
      '#maxlength'     => 200,
      '#description'   => t(''),
      '#required'      => TRUE,
      '#suffix'        => t('&nbsp;<a href="') . self::AUTH_URL . self::APP_ID .
        t('" target="_blank">Click here to obtain an authorization key and copy it into the box above.</a><br />'),
    );

    $form['submit2'] = self::submitButtonFake();

    return system_settings_form($form);
  }

  /**
   * Creates the form that prompts for the user to create a web form.
   */
  public static function get_Null_Form($form, &$form_state) {
    $form['aweber_webform_null_text'] = array(
      '#prefix' => t('This AWeber account does not currently have any completed web forms.<br />'),
      '#suffix' => t('Please <a href="https://www.aweber.com/users/web_forms/index" target="_blank">
        create a web form</a> in order to place it on your blog.<br /><div id="aweber_webform_null">'),
    );

    $form['aweber_webform_null'] = array(
      '#prefix' => t('</div>'),
      '#weight' => 1001,
      '#suffix' => t('<br />'),
    );

    $form['refresh']  = self::refreshButton();
    $form['deauth']   = self::deauthorizeButton();
    $form['refresh2'] = self::refreshButtonFake();
    $form['deauth2']  = self::deauthorizeButtonFake();

    return system_settings_form($form);
  }

  /**
   * Deauthorizes AWeber account by emptying the db table.
   */
  public static function deauthorize() {
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
   * Refreshs the page with a fresh API call by setting timestamp to 0,
   * timing out the latest API call.
   */
  public static function refresh() {
    db_update('aweber_webform')
      ->fields(array(
        'timestamp' => '0',
      ))->execute();
  }

  /**
   * Adds a button to refresh the page.
   */
  public static function refreshButton() {
    return array(
      '#prefix' => t('<div class="aweber_webform_refresh">'),
      '#type'   => 'submit',
      '#value'  => t('Refresh Lists'),
      '#name'   => 'refresh',
      '#suffix' => t('<img class="aweber_webform_help" id="aweber_webform_helpRefresh" src="')
        . file_create_url(drupal_get_path('module', 'aweber_webform')) . t('/questionmark.png" alt=""></div>'),
    );
  }

  /**
   * Adds a fake refresh button.
   */
  public static function refreshButtonFake() {
    return array(
      '#prefix' => t('<div class="aweber_webform_fakebutton">'),
      '#type'   => 'submit',
      '#value'  => t('Refreshing...'),
      '#name'   => 'refresh',
      '#suffix' => t('</div>'),
    );
  }

  /**
   * Adds a button to deauthorize the AWeber account.
   */
  public static function deauthorizeButton() {
    return array(
      '#prefix' => t('<div class="aweber_webform_deauthorize">'),
      '#type'   => 'submit',
      '#value'  => t('Deauthorize Account'),
      '#name'   => 'deauth',
      '#suffix' => t('<img class="aweber_webform_help" id="aweber_webform_helpDeauth" src="')
        . file_create_url(drupal_get_path('module', 'aweber_webform')) . t('/questionmark.png" alt=""></div>'),
    );
  }

  /**
   * Adds a fake deauth button.
   */
  public static function deauthorizeButtonFake() {
    return array(
      '#prefix' => t('<div class="aweber_webform_fakebutton">'),
      '#type'   => 'submit',
      '#value'  => t('Deauthorizing...'),
      '#name'   => 'deauth',
      '#suffix' => t('</div>'),
    );
  }

  /**
   * Adds a fake submit button.
   */
  public static function submitButtonFake() {
    return array(
      '#prefix' => t('<div class="aweber_webform_fakebutton">'),
      '#type'   => 'submit',
      '#value'  => t('Saving...'),
      '#name'   => 'op',
      '#suffix' => t('</div>'),
    );
  }

}
