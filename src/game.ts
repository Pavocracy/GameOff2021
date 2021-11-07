import 'phaser'

export default class Game extends Phaser.Scene
{
    constructor ()
    {
        super('game');
    }

    preload ()
    {
        
    }

    create ()
    {

    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#808080',
    width: 800,
    height: 600,
    scene: Game
};

const game = new Phaser.Game(config);
