﻿/// <reference path="../managers/asset.ts" />
/// <reference path="lifeOrb.ts" />
/**
Author: Peter Smith
Last Modified by: Peter Smith
Last Modified: November 15, 2014
Description: A vertical fire Pit
**/
var objects;
(function (objects) {
    // Cloud class
    var vertFirePit = (function () {
        function vertFirePit(stage, game) {
            this.stage = stage;
            this.game = game;
            this.image = new createjs.Sprite(managers.Assets.hazards, "vert firepit");
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.reset();

            this.dx = 5;

            game.addChild(this.image);
        }
        vertFirePit.prototype.update = function () {
            this.image.x -= this.dx;
            if (this.image.x < 0) {
                this.reset();
            }
        };

        vertFirePit.prototype.reset = function () {
            this.image.y = Math.floor(Math.random() * this.stage.canvas.height);
            this.image.x = this.stage.canvas.width + Math.floor(Math.random() * this.stage.canvas.width);
        };

        vertFirePit.prototype.destroy = function () {
            game.removeChild(this.image);
        };
        return vertFirePit;
    })();
    objects.vertFirePit = vertFirePit;
})(objects || (objects = {}));
//# sourceMappingURL=vertFirePit.js.map
