/// <reference path="../objects/hazards.ts" />
/// <reference path="../objects/crystal.ts" />
/// <reference path="../objects/lifeOrb.ts" />
/// <reference path="../objects/player.ts" />
/// <reference path="../objects/scoreboard.ts" />

/**
    Author: Peter Smith
    Last Modified by: Peter Smith
    Last Modified: November 15, 2014
    Description: The collision manager that subtracts life from player and "tries" to prevent object overlapping
**/
module managers {
    // Collision Manager Class
    export class Collision {
        // class variables
        private player: objects.player;
        private crystal: objects.Crystal;
        private lifeOrb: objects.lifeOrb;
        private hazards = [];
        private scoreboard: objects.Scoreboard;

        constructor(player: objects.player, crystal: objects.Crystal, lifeOrb: objects.lifeOrb, hazards, scoreboard: objects.Scoreboard) {
            this.player = player;
            this.crystal = crystal;
            this.lifeOrb = lifeOrb;
            this.hazards = hazards;
            this.scoreboard = scoreboard;
        }

        // Utility method - Distance calculation between two points
        private distance(p1: createjs.Point, p2: createjs.Point): number {
            var result: number = 0;
            var xPoints: number = 0;
            var yPoints: number = 0;

            xPoints = p2.x - p1.x;
            xPoints = xPoints * xPoints;

            yPoints = p2.y - p1.y;
            yPoints = yPoints * yPoints;

            result = Math.sqrt(xPoints + yPoints);

            return result;
        }

        //check for overlap between items
        private overlap() {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            var p3: createjs.Point = new createjs.Point();
            p1.x = this.crystal.image.x;
            p1.y = this.crystal.image.y;
            p3.x = this.lifeOrb.image.x;
            p3.y = this.lifeOrb.image.y;
            for (var i = 0; i < this.hazards.length; i++) {
                p2.x = this.hazards[i].image.x;
                p2.y = this.hazards[i].image.y;
                if (this.distance(p1, p2) < ((this.crystal.width / 2) + (this.hazards[i].width / 2)) || this.distance(p1, p2) < ((this.crystal.height / 2) + (this.hazards[i].height / 2))) {
                    this.crystal.reset();
                }
                else if (this.distance(p2, p3) < ((this.lifeOrb.width / 2) + (this.hazards[i].width / 2)) || this.distance(p2, p3) < ((this.lifeOrb.height / 2) + (this.hazards[i].height / 2))) {
                    this.lifeOrb.reset();
                }
            }
        }

        // checks if 1 hazards are overlapping
        private hazardCheck(hazards: objects.Hazards) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = hazards.image.x;
            p1.y = hazards.image.y;
            for(var i = 0; i < this.hazards.length; i++)
            {
                p2.x = this.hazards[i].image.x;
                p2.y = this.hazards[i].image.y;
                if (this.hazards[i] != hazards)
                {
                    if (this.distance(p1, p2) < ((this.hazards[i].width / 2) + (hazards.width / 2)) || this.distance(p1, p2) < ((this.hazards[i].height / 2) + (hazards.height / 2))) {
                        this.hazards[i].reset();
                        hazards.reset();
                    }
                }
            }
        }

        // checks the collision betwen player and hazards
        private playerAndHazard(hazards: objects.Hazards) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.player.image.x;
            p1.y = this.player.image.y;
            p2.x = hazards.image.x;
            p2.y = hazards.image.y;
            if (this.distance(p1, p2) < ((this.player.width / 2) + (hazards.width / 2))) {
                createjs.Sound.play("hurt");
                if(hazards.name == "stones")
                    this.scoreboard.lives -= 1;
                else if (hazards.name == "vert pit")
                    this.scoreboard.lives -= 2;
                else if (hazards.name == "hor pit")
                    this.scoreboard.lives -= 2;
                else if (hazards.name == "vert firepit")
                    this.scoreboard.lives -= 3;
                else if (hazards.name == "hor firepit")
                    this.scoreboard.lives -= 3;
                hazards.reset();
            }
        }

        // check collision between player and crystal
        private playerAndCrystal() {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.player.image.x;
            p1.y = this.player.image.y;
            p2.x = this.crystal.image.x;
            p2.y = this.crystal.image.y;
            if (this.distance(p1, p2) < ((this.player.width / 2) + (this.crystal.width / 2))) {
                createjs.Sound.play("score");
                this.scoreboard.score += 100;
                this.crystal.reset();
            }
        }

        // check collision between player and lifeOrb
        private playerAndLifeorb() {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.player.image.x;
            p1.y = this.player.image.y;
            p2.x = this.lifeOrb.image.x;
            p2.y = this.lifeOrb.image.y;
            if (this.distance(p1, p2) < ((this.player.width / 2) + (this.lifeOrb.width / 2))) {
                createjs.Sound.play("life");
                this.scoreboard.lives += 1;
                this.lifeOrb.reset();
            }
        }

        // Utility Function to Check Collisions
        update() {
            for (var count = 0; count < constants.HAZARDS_NUM; count++) {
                this.playerAndHazard(this.hazards[count]);
                this.overlap();
                this.hazardCheck(this.hazards[count]);
            }
            this.playerAndCrystal();
            this.playerAndLifeorb();
        }
    }
} 