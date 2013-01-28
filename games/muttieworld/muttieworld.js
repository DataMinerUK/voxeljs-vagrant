/*
    var MODULE = (function () {
        var my = {},
            privateVariable = 1;

        function privateMethod() {
            // ...
        }

        my.moduleProperty = 1;
        my.moduleMethod = function () {
            // ...
        };
    }
*/


var world = (function () {
    var modules = {
        skin: require('minecraft-skin'),
        aabb: require('aabb-3d')
    }

    var self = {
        cubeSize: 25,
        chunkSize: 32,
        chunkDistance: 4,
        worldOrigin: [0,0,0],

        textures: './assets/textures/',

        controlOptions: { jump: 6 },

        avatar: 'assets/skins/hamster.png',
        avatarScale: 0.05
    }


    self.player = function(game) {
        var player = modules.skin(game.THREE, self.avatar, 1).createPlayerObject()

        player.scale.x = self.avatarScale
        player.scale.y = self.avatarScale
        player.scale.z = self.avatarScale

        player.position = game.startingPosition

        game.spatial.on(
            'position',
            modules.aabb(
                [-Infinity, -Infinity, -Infinity],
                [Infinity, Infinity, Infinity]
            ),
            function(position) {
                // TODO: Orientate based on direction of travel.
                // (player.position - position)

                player.position.copy(position)
                // TODO: Jitter based on orientation
                player.position.x += 2
                player.position.z += 2
        })

        return player;
    }


    // TODO: Add digging

    return self
}());


var level1 = (function (world) {
    var modules = {
        createGame: require('voxel-engine'),
        terrain: require('voxel-heightmap-terrain')
    }

    var self = {
        level: 1
    }

    self.materials = [['grass', 'dirt', 'grass_dirt'], 'brick', 'diamond', 'obsidian']
    self.startingPosition = [1024, 2048, 1024]

    // Heightmap terrain generation
    var heightmap = require('./assets/heightmaps/1.json')
    var terrain = function(x, y, z) {
         return modules.terrain(x, y, z, heightmap);
    }

    // Autoterrain generation
    //self.seed = 1234
    //var generateVoxelChunk: require('voxel-simplex-terrain')({
    //    seed: self.seed,
    //    scaleFactor: 10,
    //    chunkDistance: self.chunkDistance
    //}),

    self.create = function() {
        var game = modules.createGame({
            // TODO: use world object with extentions...

            generate: terrain,

            texturePath: world.textures,
            materials: self.materials,

            cubeSize: world.cubeSize,
            chunkSize: world.chunkSize,
            chunkDistance: world.chunkDistance,

            // Uncomment for sky
            //fogDisabled: true,
            //lightsDisabled: true,

            startingPosition: self.startingPosition,
            worldOrigin: world.worldOrigin,

            controlOptions: world.controlOptions
        })

        // Add some trees
        //var createTree = require('voxel-forest')
        //for (var i = 0; i < 20; i++) {
        //    createTree(game, { bark: 4, leaves: 3 })
        //}

        // Make a sky
        //var createSky = require('voxel-sky')(game)
        //var sky = createSky(600)
        //game.on('tick', sky)

        // Point camera down initially
        game.controls.pitchObject.rotation.x = -1.5

        // Add the player avatar
        var player = world.player(game)
        game.scene.add(player)

        return game;
    }

    return self
}(world));


var game = level1.create()

// Attach to the container element and request pointer lock
var container = document.getElementById('game-container')
game.appendTo(container);
container.addEventListener('click', function() {
    game.requestPointerLock(container)
})

//console.log(game);
