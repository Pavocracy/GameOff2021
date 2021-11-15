import 'phaser'

class Title extends Phaser.Scene
{
    title;

    constructor ()
    {
        super({
            key: "title",
            active: true
        });
    }

    preload ()
    {
        this.load.image('title', 'assets/title.png');
    }

    create ()
    {
        this.title = this.add.image(game.canvas.width * 0.5, game.canvas.height * 0.50, 'title');
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
    roads = [];

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
        this.load.image('road', 'assets/road.png');
    }

    create ()
    {
        var width = game.canvas.width;
        var height = game.canvas.height;
        var scale = width / 240 | 0;

        for(let i = 0; i < scale; i++){
            this.roads.push(this.add.image(240 * i, 0, 'road').setOrigin(0, 0));
            this.roads.push(this.add.image(240 * i, -960, 'road').setOrigin(0, 0))
        }

        this.player = this.add.image(width * 0.5, height * 0.75, 'player');
    }

    update ()
    {
        for(let i = 0; i < this.roads.length; i++){
            if(this.roads[i].y > game.canvas.height){
                this.roads[i].y = -960;
            }
            else{
                this.roads[i].y += 1;    
            }

        }

        if(this.input.activePointer.isDown){
            if(this.input.activePointer.x > this.player.x){
                this.player.x += 5;
            }
            else if(this.input.activePointer.x < this.player.x){
                this.player.x -= 5;
            }
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#808080',
    width: window.innerWidth - (window.innerWidth * 0.03),
    height: window.innerHeight - (window.innerHeight * 0.03),
    scene: [Title, Game]
};

const game = new Phaser.Game(config);
