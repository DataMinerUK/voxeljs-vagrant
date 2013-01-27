Vagrant VM for voxel.js development
====================================
A Vagrant VM for developing [voxel.js] games.


Getting Started
---------------
Install [VirtualBox][virtualbox] and [Vagrant][vagrant] if not already
available.

Create the `voxeljs` VM instance:

    vagrant up

Wait while the VM image in downloaded(first time only) and configured for
[node.js] development.

The VM run a NGINX to serve games, examine the [voxel.js] getting started
example at:

    http://localhost:8080/games/example/


Compiling Your Own Games
------------------------
You can develop your own games on your host machine in the `games` directory
and use the VM to compile and serve them.

To compile a game in `games/new-game`, first ssh to the VM:

    vagrant ssh

Then change to the directory location, shared from your host:

    cd /vagrant/games/new-game

Install any necessary node modules from the `packages.json` description:

    npm install

Then compile the game using [browserify]:

    browserify new-game.js > new-game-compiled.js

HTML files in `games/new-game` will be served from the VM via port forwarding
to your host machine at, e.g.:

   http://localhost:8080/games/new-game/index.html


Export Configured VM Image
--------------------------
You can package and export the configured Vagrant VM into a new VM image:

    vagrant package --output export/voxeljs.box

There is a `Vagrantfile` in `export` that can be used to create new VM instances
from this packaged VM.



[voxel.js]: http://voxeljs.com/
[virtualbox]: https://www.virtualbox.org/wiki/Downloads
[vagrant]: http://vagrantup.com
[node.js]: http://nodejs.org/
[browserify]: http://browserify.org/

