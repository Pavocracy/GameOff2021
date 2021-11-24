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
        this.title = this.add.image(game.canvas.width * 0.5, game.canvas.height * 0.5, 'title');
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
    gameWidth = game.canvas.width;
    gameHeight = game.canvas.height;
    roadScaledHeight = 0;

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
        this.load.image('car', 'assets/car.png');
        this.load.image('road', 'assets/road.png');
        this.load.image('road-side', 'assets/road-side.png');
    }

    create ()
    {
        var roadWidth = this.textures.get("road").getSourceImage().width;
        var roadHeight = this.textures.get("road").getSourceImage().height;
        var tiles = this.gameWidth / roadWidth;
        var widthScale = tiles / Math.floor(tiles);
        var heightScale = 1;

        if(this.gameHeight > roadHeight){
            heightScale = (this.gameHeight / roadHeight) * 1.01;
        };

        this.roadScaledHeight = roadHeight * heightScale

        for(let i = 0; i < tiles; i++){
            if(i == 0){
                this.roads.push(this.add.image((roadWidth * widthScale) * i, 0, 'road-side').setScale(widthScale, heightScale).setOrigin(0, 0));
                this.roads.push(this.add.image((roadWidth * widthScale) * i, -(roadHeight * heightScale), 'road-side').setScale(widthScale, heightScale).setOrigin(0, 0))
            }
            else if(i == Math.floor(tiles)-1){
                this.roads.push(this.add.image((roadWidth * widthScale) * i, 0, 'road-side').setScale(widthScale, heightScale).setFlipX(true).setOrigin(0, 0));
                this.roads.push(this.add.image((roadWidth * widthScale) * i, -(roadHeight * heightScale), 'road-side').setScale(widthScale, heightScale).setFlipX(true).setOrigin(0, 0))
            }
            else{
                this.roads.push(this.add.image((roadWidth * widthScale) * i, 0, 'road').setScale(widthScale, heightScale).setOrigin(0, 0));
                this.roads.push(this.add.image((roadWidth * widthScale) * i, -(roadHeight * heightScale), 'road').setScale(widthScale, heightScale).setOrigin(0, 0))
            }
        };

        var playerWidth = this.textures.get("player").getSourceImage().width;
        var playerHeight = this.textures.get("player").getSourceImage().height;
        var playerScale = (roadWidth / 2) / playerWidth;
        this.player = this.add.image(this.gameWidth * 0.5, this.gameHeight - ((playerHeight * playerScale) / 2), 'player').setScale(playerScale, playerScale);
    }

    update ()
    {
        for(let i = 0; i < this.roads.length; i++){
            if(this.roads[i].y > this.gameHeight){
                this.roads[i].y = -this.roadScaledHeight;
            }
            else{
                this.roads[i].y += 1;    
            }

        };

        if(this.input.activePointer.isDown){
            if(this.input.activePointer.x > this.player.x + 25){
                this.player.x += 5;
            }
            else if(this.input.activePointer.x < this.player.x - 25){
                this.player.x -= 5;
            }
        };
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#f700ff',
    width: window.innerWidth - (window.innerWidth * 0.03),
    height: window.innerHeight - (window.innerHeight * 0.03),
    scene: [Title, Game]
};

const game = new Phaser.Game(config);
