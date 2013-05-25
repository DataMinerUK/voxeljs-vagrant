class voxeljs::nodejs {

  require common
  require nvm

  package {
    'nodejs': ensure => latest;
    'npm': ensure => latest;
  }

}
