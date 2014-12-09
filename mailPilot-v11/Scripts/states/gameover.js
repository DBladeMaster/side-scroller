/// <reference path="../constants.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/crystal.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/land.ts" />
/// <reference path="../objects/player.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="play.ts" />
/**
Author: Peter Smith
Last Modified by: Peter Smith
Last Modified: November 15, 2014
Description: The gameover state
**/
var states;
(function (states) {
    function gameOverState() {
        land.update();
    }
    states.gameOverState = gameOverState;

    // Restart Game when Try Again Button is clicked
    function tryAgainClicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    }
    states.tryAgainClicked = tryAgainClicked;

    // Restart Game when Try Again Button is clicked
    function mainMenuClicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.MENU_STATE;
        changeState(currentState);
    }
    states.mainMenuClicked = mainMenuClicked;

    // Game Over Scene
    function gameOver() {
        var gameOverLabel;
        var finalScoreLabel;
        var finalScore;
        this.overworld.stop();

        dead:
        createjs.SoundInstance;

        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        land = new objects.Land(stage, game);

        // Show Cursor
        stage.cursor = "default";

        // Display Game Over
        gameOverLabel = new createjs.Bitmap(managers.Assets.loader.getResult("end"));
        gameOverLabel.x = 60;
        game.addChild(gameOverLabel);

        // Display Final Score Label
        finalScoreLabel = new createjs.Bitmap(managers.Assets.loader.getResult("points"));
        finalScoreLabel.x = 60;
        finalScoreLabel.y = 80;
        game.addChild(finalScoreLabel);

        // Display Final Score
        finalScore = new objects.Label(stage.canvas.width / 2, 160, scoreboard.score.toString());
        game.addChild(finalScore);

        // Display Try Again Button
        tryAgain = new objects.Button(stage.canvas.width / 2, 400, "tryAgainButton");
        game.addChild(tryAgain);
        tryAgain.addEventListener("click", tryAgainClicked);

        // Display Try Again Button
        var mainMenu = new objects.Button(stage.canvas.width / 2, 300, "mainMenuButton");
        game.addChild(mainMenu);
        mainMenu.addEventListener("click", mainMenuClicked);

        stage.addChild(game);
        this.dead = createjs.Sound.play('dead', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
    }
    states.gameOver = gameOver;
})(states || (states = {}));
//# sourceMappingURL=gameover.js.map
