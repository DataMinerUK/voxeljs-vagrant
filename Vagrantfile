Vagrant::Config.run do |config|

  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  config.vm.host_name = "voxeljs"
  config.vm.customize [ "modifyvm", :id, "--name", "voxeljs" ]

  config.vm.forward_port 80, 8080

  config.vm.provision :puppet,
    :options => "--modulepath=/vagrant/puppet/modules" do |puppet|
    puppet.manifests_path = "puppet"
    puppet.manifest_file = "site.pp"
  end
end
