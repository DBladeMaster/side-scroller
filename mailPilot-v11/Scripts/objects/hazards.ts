/// <reference path="../managers/asset.ts" />
/// <reference path="lifeOrb.ts" />

/**
    Author: Peter Smith
    Last Modified by: Peter Smith
    Last Modified: November 15, 2014
    Description: A stone hazard object
**/
module objects {
    // Cloud class
    export class Hazards {
        image: createjs.Sprite;
        images = [];
        name;
        stage: createjs.Stage;
        game: createjs.Container;
        width: number;
        height: number;
        dx: number;
        constructor(stage: createjs.Stage, game: createjs.Container) {
            this.images[0] = "stones";
            this.images[1] = "hor pit";
            this.images[2] = "vert pit";
            this.images[3] = "hor firepit";
            this.images[4] = "vert firepit";
            this.image = new createjs.Sprite(managers.Assets.hazards, (this.name = this.images[Math.floor(Math.random() * 5)]));
            this.stage = stage;
            this.game = game;
            //this.image = new createjs.Sprite(managers.Assets.hazards, "stones");
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.reset();

            this.dx = 5;

            game.addChild(this.image);
        }

        update() {
            this.image.x -= this.dx;
            if (this.image.x < 0) {
                this.reset();
            }
        }

        reset() {
            game.removeChild(this.image);
            this.image = new createjs.Sprite(managers.Assets.hazards, (this.name = this.images[Math.floor(Math.random() * 5)]));
            this.image.y = constants.COORDINATES[Math.floor(Math.random() * 6)];
            this.image.x = this.stage.canvas.width + constants.COORDINATES[Math.floor(Math.random() * 6)];
            game.addChild(this.image);
        }

        destroy() {
            game.removeChild(this.image);
        }
    }
}