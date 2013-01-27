class voxeljs {

  require nginx
  require nodejs

  file {
    '/root/voxeljs.setup':
      source => 'puppet:///modules/voxeljs/root/voxeljs.setup',
      owner  => root,
      group  => root,
      mode   => '0744';
  }

  exec {
    'setup-voxeljs':
      cwd     => '/root',
      command => '/root/voxeljs.setup',
      creates => '/root/voxeljs.done';
  }
}
