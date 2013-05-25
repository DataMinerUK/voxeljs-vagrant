class voxeljs::nodejs {

  require common

  package {
    'nodejs': ensure => latest;
    'npm': ensure => latest;
  }

}
