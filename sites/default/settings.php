<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all envrionments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to insure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}

$settings['hash_salt'] = 'c1Luva8cclI8ixxKSHToOmoRGmEbUwpsnoFF26YjkM8JrBJJvYRA6XzrgPh3f4XyJOFlfRAJ0Q';

if (isset($_SERVER['PANTHEON_ENVIRONMENT']) && php_sapi_name() != 'cli') {
  // Redirect to https://$primary_domain/ in the Live environment
  if ($_ENV['PANTHEON_ENVIRONMENT'] === 'live'):
    /** Replace www.example.com with your registered domain name */
    $primary_domain = 'www.lightupthemap.com';
  else:
    // Redirect to HTTPS on every Pantheon environment.
    $primary_domain = $_SERVER['HTTP_HOST'];
  endif;
  if ($_SERVER['HTTP_HOST'] != $primary_domain
    || !isset($_SERVER['HTTP_X_SSL'])
    || $_SERVER['HTTP_X_SSL'] != 'ON' ) {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: '. 'https://'. $primary_domain . $_SERVER['REQUEST_URI']);
    exit();
  }
  // Drupal 8 Trusted Host Settings
  if (is_array($settings)) {
    $settings['trusted_host_patterns'] = array('^'. preg_quote($primary_domain) .'$');
  }
}