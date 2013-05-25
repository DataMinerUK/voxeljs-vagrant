class nvm {

  package {
    'git-core': ensure => latest;
    'curl': ensure => latest;
  }


  exec { 'default-node-version':
    command => "/bin/bash -c \"source /home/vagrant/nvm/nvm.sh && nvm alias default v0.8.23\"",
    require => Exec["install-node-version"],
  }

  exec { 'install-node-version':
    command => "/bin/bash -c \"source /home/vagrant/nvm/nvm.sh && nvm install v0.8.23\"",
    require => Exec["clone-nvm"],
  }

  exec { 'clone-nvm':
    command => "/usr/bin/git clone git://github.com/creationix/nvm.git /home/vagrant/nvm",
    user => "vagrant",
    group => "vagrant",
    creates => "/home/vagrant/nvm/nvm.sh",
    require => Package["git-core"],
  }

  exec { 'source-nvm':
    command => "/bin/echo 'source /home/vagrant/nvm/nvm.sh' >> /home/vagrant/.bashrc",
  }
}