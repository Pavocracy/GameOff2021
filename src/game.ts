import 'phaser'

class Title extends Phaser.Scene
{
    constructor ()
    {
        super({
            key: "title",
            active: true
        });
    }

    preload ()
    {

    }

    create ()
    {

    }

    update ()
    {
        if(this.input.activePointer.isDown){
            this.scene.start("game");
        }
    }
}

class Game extends Phaser.Scene
{
    player;

    constructor ()
    {
        super({
            key: "game",
            active: false
        });
    }

    preload ()
    {
        this.load.image('player', 'assets/player.png');
    }

    create ()
    {
        this.player = this.add.image(400, 300, 'player');
    }

    update ()
    {
        if (this.input.activePointer.isDown){
            if (this.input.activePointer.x > this.player.x){
                this.player.x +=5;
            }
            else if (this.input.activePointer.x < this.player.x){
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
    scene: [Title, Game]
};

const game = new Phaser.Game(config);
