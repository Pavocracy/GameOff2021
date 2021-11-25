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
    };

    preload ()
    {
        this.load.image('title', 'assets/title.png');
    };

    create ()
    {
        this.title = this.add.image(game.canvas.width * 0.5, game.canvas.height * 0.5, 'title');
    };

    update ()
    {
        if(this.input.activePointer.isDown){
            this.scene.start("game");
        };
    };
};

class Game extends Phaser.Scene
{
    gameWidth = game.canvas.width;
    gameHeight = game.canvas.height;
    player;
    roads = [];
    cars = [];
    roadWidth;
    roadHeight;
    tiles;
    widthScale;
    heightScale;
    roadScaledHeight;
    carWidth;
    carHeight;
    carScale;
    playerWidth;
    playerHeight;
    playerScale;

    constructor ()
    {
        super({
            key: "game",
            active: false
        });
    };

    preload ()
    {
        this.load.image('player', 'assets/player.png');
        this.load.image('car', 'assets/car.png');
        this.load.image('road', 'assets/road.png');
        this.load.image('road-side', 'assets/road-side.png');
    };

    create ()
    {
        this.roadWidth = this.textures.get("road").getSourceImage().width;
        this.roadHeight = this.textures.get("road").getSourceImage().height;
        this.tiles = this.gameWidth / this.roadWidth;
        this.widthScale = this.tiles / Math.floor(this.tiles);
        this.heightScale = 1;

        if(this.gameHeight > this.roadHeight){
            this.heightScale = (this.gameHeight / this.roadHeight) * 1.01;
        };

        this.roadScaledHeight = this.roadHeight * this.heightScale;

        for(let i = 0; i < Math.floor(this.tiles); i++){
            if(i == 0){
                this.roads.push(this.add.image((this.roadWidth * this.widthScale) * i, 0, 'road-side').setScale(this.widthScale, this.heightScale).setOrigin(0, 0));
                this.roads.push(this.add.image((this.roadWidth * this.widthScale) * i, -(this.roadHeight * this.heightScale), 'road-side').setScale(this.widthScale, this.heightScale).setOrigin(0, 0));
            }
            else if(i == Math.floor(this.tiles)-1){
                this.roads.push(this.add.image((this.roadWidth * this.widthScale) * i, 0, 'road-side').setScale(this.widthScale, this.heightScale).setFlipX(true).setOrigin(0, 0));
                this.roads.push(this.add.image((this.roadWidth * this.widthScale) * i, -(this.roadHeight * this.heightScale), 'road-side').setScale(this.widthScale, this.heightScale).setFlipX(true).setOrigin(0, 0));
            }
            else{
                this.roads.push(this.add.image((this.roadWidth * this.widthScale) * i, 0, 'road').setScale(this.widthScale, this.heightScale).setOrigin(0, 0));
                this.roads.push(this.add.image((this.roadWidth * this.widthScale) * i, -(this.roadHeight * this.heightScale), 'road').setScale(this.widthScale, this.heightScale).setOrigin(0, 0));
            };
        };

        this.carWidth = this.textures.get("car").getSourceImage().width;
        this.carHeight = this.textures.get("car").getSourceImage().height;
        this.carScale = (this.roadWidth / 2) / this.carWidth;
        var random = Math.floor((Math.random() * this.tiles) + (Math.floor(this.tiles / 2)));

        for(let i = 0; i < random; i++){
            var randomIndex = Math.floor(Math.random() * this.roads.length);

            if(this.roads[randomIndex].texture.key == "road-side"){
                randomIndex = Math.floor(this.roads.length / 2);
            };

            this.cars.push(this.add.image(this.roads[randomIndex].x, Math.floor((Math.random() * -this.gameHeight)), 'car').setScale(this.carScale, this.carScale).setOrigin(0.5, 0));
        };

        this.playerWidth = this.textures.get("player").getSourceImage().width;
        this.playerHeight = this.textures.get("player").getSourceImage().height;
        this.playerScale = (this.roadWidth / 2) / this.playerWidth;
        this.player = this.add.image(this.gameWidth * 0.5, this.gameHeight - ((this.playerHeight * this.playerScale) / 2), 'player').setScale(this.playerScale, this.playerScale);
    };

    update ()
    {
        for(let i = 0; i < this.roads.length; i++){
            if(this.roads[i].y > this.gameHeight){
                this.roads[i].y = -this.roadScaledHeight;
            }
            else{
                this.roads[i].y += 1;    
            };
        };

        for(let i = 0; i < this.cars.length; i++){
            if(this.cars[i].y > this.gameHeight){
                this.cars[i].y = Math.floor((Math.random() * -this.gameHeight)) - (this.carHeight * this.carScale / 2);
                var randomIndex = Math.floor(Math.random() * this.roads.length);
                if(this.roads[randomIndex].texture.key == "road-side"){
                    this.cars[i].x = this.roads[Math.floor(this.roads.length / 2)].x;
                }
                else{
                    this.cars[i].x = this.roads[randomIndex].x;
                }
            }
            else{
                this.cars[i].y += 1;    
            };
        };

        if(this.input.activePointer.isDown){
            if(this.input.activePointer.x > this.player.x + 25){
                this.player.x += 5;
            }
            else if(this.input.activePointer.x < this.player.x - 25){
                this.player.x -= 5;
            };
        };
    };
};

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#f700ff',
    width: window.innerWidth - (window.innerWidth * 0.03),
    height: window.innerHeight - (window.innerHeight * 0.03),
    scene: [Title, Game]
};

const game = new Phaser.Game(config);