/// <reference path="../managers/asset.ts" />

/**
    Author: Peter Smith
    Last Modified by: Peter Smith
    Last Modified: November 15, 2014
    Description: The land the player walks on
**/
module objects {
    // land Class
    export class background {
        image: createjs.Bitmap;
        stage: createjs.Stage;
        game: createjs.Container;
        width: number;
        height: number;
        constructor(stage: createjs.Stage, game: createjs.Container) {
            this.stage = stage;
            this.game = game;
            this.image = new createjs.Bitmap(managers.Assets.loader.getResult("intro"));
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            game.addChild(this.image);
        }
    }

}