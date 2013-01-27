class voxeljs::nginx {

  require common

  package {
    'nginx': ensure => installed;
  }

  file {
    '/etc/nginx/sites-available/default':
      source => 'puppet:///modules/voxeljs/etc/nginx/sites-available/default',
      owner  => root,
      group  => root,
      mode   => '0644',
      notify => Service[nginx]
  }

  service {
    'nginx':
      ensure => running,
      enable => true;
  }

  Package[nginx] ->
    File['/etc/nginx/sites-available/default'] ->
    Service[nginx]

}
