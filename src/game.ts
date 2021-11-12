import 'phaser'

export default class Game extends Phaser.Scene
{
    pointer;
    player;

    constructor ()
    {
        super('game');
    }

    preload ()
    {
        this.pointer = this.game.input.activePointer;
        this.load.image('player', 'assets/player.png');
    }

    create ()
    {
        this.player = this.add.image(400, 300, 'player');
    }

    update ()
    {
        if (this.pointer.isDown){
            if (this.pointer.x > this.player.x){
                this.player.x +=5;
            }
            else if (this.pointer.x < this.player.x){
                this.player.x -=5;
            }
        }
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
