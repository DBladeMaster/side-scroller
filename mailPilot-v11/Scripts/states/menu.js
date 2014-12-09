/// <reference path="../constants.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/player.ts" />
/// <reference path="../objects/land.ts" />
/// <reference path="../objects/background.ts" />
/// <reference path="../objects/crystal.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/**
Author: Peter Smith
Last Modified by: Peter Smith
Last Modified: November 15, 2014
Description: The main menu state
**/
var states;
(function (states) {
    var gameNameLabel;
    var gameInstructionLabel;
    var instructions;

    function playButtonClicked(event) {
        game.removeAllChildren();
        game.removeAllEventListeners();
        land = new objects.Land(stage, game);
        player = new objects.player(stage, game);

        // Display Game title
        game.addChild(gameNameLabel);
        var easyButton = new objects.Button(stage.canvas.width / 2, 150, "easyButton");
        game.addChild(easyButton);
        easyButton.addEventListener("click", function () {
            constants.HAZARDS_NUM = 4;
            constants.DIFFICULTY = "easy";
            stage.removeChild(game);
            player.destroy();
            game.removeAllChildren();
            game.removeAllEventListeners();
            currentState = constants.PLAY_STATE;
            changeState(currentState);
        });
        var mediumButton = new objects.Button(stage.canvas.width / 2, 250, "mediumButton");
        game.addChild(mediumButton);
        mediumButton.addEventListener("click", function () {
            constants.HAZARDS_NUM = 6;
            constants.DIFFICULTY = "medium";
            stage.removeChild(game);
            player.destroy();
            game.removeAllChildren();
            game.removeAllEventListeners();
            currentState = constants.PLAY_STATE;
            changeState(currentState);
        });
        var hardButton = new objects.Button(stage.canvas.width / 2, 350, "hardButton");
        game.addChild(hardButton);
        hardButton.addEventListener("click", function () {
            constants.HAZARDS_NUM = 8;
            constants.DIFFICULTY = "hard";
            stage.removeChild(game);
            player.destroy();
            game.removeAllChildren();
            game.removeAllEventListeners();
            currentState = constants.PLAY_STATE;
            changeState(currentState);
        });
    }
    states.playButtonClicked = playButtonClicked;

    function menuState() {
        land.update();
        player.update();
    }
    states.menuState = menuState;

    var run = 0;
    function menu() {
        if (run == 1)
            this.dead.stop();
        run = 1;

        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        land = new objects.Land(stage, game);
        player = new objects.player(stage, game);

        // Show Cursor
        stage.cursor = "default";

        // Display Game title
        gameNameLabel = new createjs.Bitmap(managers.Assets.loader.getResult("title"));
        game.addChild(gameNameLabel);

        // display instructions label
        gameInstructionLabel = new objects.Label(stage.canvas.width / 2, 70, "Instructions:");
        game.addChild(gameInstructionLabel);

        // display instructions
        instructions = new objects.Label(stage.canvas.width / 2, 110, "1) Collect crystals");
        game.addChild(instructions);
        instructions = new objects.Label(stage.canvas.width / 2, 150, "2) Collect lifeOrbs");
        game.addChild(instructions);
        instructions = new objects.Label(stage.canvas.width / 2, 190, "3) Survive");
        game.addChild(instructions);
        instructions = new objects.Label(stage.canvas.width / 2, 230, "Avoid: stones -1,");
        game.addChild(instructions);
        instructions = new objects.Label(stage.canvas.width / 2, 270, "pits -2, firepits -3");
        game.addChild(instructions);

        // Display Play Button
        playButton = new objects.Button(stage.canvas.width / 2, 380, "playButton");
        game.addChild(playButton);
        playButton.addEventListener("click", playButtonClicked);

        stage.addChild(game);
    }
    states.menu = menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map
