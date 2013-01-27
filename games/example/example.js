var createGame = require('voxel-engine')
var texturePath = require('painterly-textures')

var game = createGame({texturePath: texturePath})
var container = document.body
game.appendTo(container)

container.addEventListener('click', function() {
    game.requestPointerLock(container)
})