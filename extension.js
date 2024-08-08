const vscode = require('vscode');
const path = require('path');

function activate(context) {
    console.log('Color Picker Extension is now active!');

    let disposable = vscode.commands.registerCommand('extension.openColorPicker', () => {
        console.log('Open Color Picker command invoked');

        const panel = vscode.window.createWebviewPanel(
            'colorPicker',
            'Color Picker',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        panel.webview.html = getWebviewContent();
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent() {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Color Picker</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <style>
      * {
        margin: 0;
        padding: 0;
        font: 16px sans-serif;
        box-sizing: border-box;
      }

      body {
        width: 100%;
        height: 100vh;

        background-color: rgba(82, 120, 20, 0.4);

        display: grid;
        place-content: center;
      }

      h1 {
        margin: auto;

        font-size: 25px;
        padding: 10px;
        color: #111;
      }

      .container {
        margin: auto;
        padding: 20px;

        border-radius: 600px;
        background-color: #111;
        box-shadow: -10px 15px 15px rgba(0, 0, 0, 0.3);
      }

      .display {
        width: 200px;
        height: 200px;

        border-radius: 50%;
        background-color: rgba(82, 120, 20, 1);
        box-shadow: inset -10px 10px 10px rgba(0, 0, 0, 0.35),
          inset 10px -10px 10px rgba(255, 255, 255, 0.1);
      }

      .box-range {
        width: 200px;
        height: 230px;
        padding: 10px 0px;

        display: flex;
        flex-direction: column;
        gap: 5px;

        color: #fff;
      }

      .rgba input[type="range"] {
        appearance: none;

        width: 100%;
        height: 5px;

        border-radius: 10px;
      }

      input[type="range"]::-webkit-slider-thumb {
        appearance: none;

        width: 15px;
        height: 15px;

        border: none;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 3px -1px 3px rgba(0, 0, 0, 0.4);
      }

      #red {
        background: linear-gradient(
          90deg,
          rgba(82, 0, 0, 0.7) 32.15%,
          #fff 32.15%
        );
      }

      #green {
        background: linear-gradient(
          90deg,
          rgba(0, 120, 0, 0.7) 47.05%,
          #fff 47.05%
        );
      }

      #blue {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 255, 0.7) 7.84%,
          #fff 7.84%
        );
      }

      .values {
        width: 130px;
        margin: auto;

        border-radius: 50px;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }

      .box-values > input[type="text"] {
        appearance: none;
        border: none;

        height: 32px;
        width: 50px;

        border-radius: 50px;
        background-color: #fff;
        box-shadow: inset -2px 2px 2px rgba(0, 0, 0, 0.5);

        text-align: center;
        color: #333;
      }

      #hex {
        width: 110px;
      }

      #hexa {
        appearance: none;
        border: none;

        height: 32px;
        width: 95px;

        border-radius: 50px;
        background-color: #fff;
        box-shadow: inset -2px 2px 2px rgba(0, 0, 0, 0.5);

        text-align: center;
        color: #333;
      }
    </style>
  </head>
  <body>
    <h1>LeeCode PICKER</h1>
    <div class="container" id="container">
      <div class="display" id="display"></div>

      <div class="box-range" id="box-range">
        <div class="rgba">
          <label for="red">Red</label>
          <input id="red" type="range" min="0" max="255" value="82" />
        </div>

        <div class="rgba">
          <label for="green">Green</label>
          <input id="green" type="range" min="0" max="255" value="120" />
        </div>

        <div class="rgba">
          <label for="blue">Blue</label>
          <input id="blue" type="range" min="0" max="255" value="20" />
        </div>

        <div class="values" id="values">
          <div class="box-values">
            <input type="text" id="red-value" min="0" max="255" value="82" />
          </div>
          <div class="box-values">
            <input type="text" id="green-value" min="0" max="255" value="120" />
          </div>
          <div class="box-values">
            <input type="text" id="blue-value" min="0" max="255" value="20" />
          </div>
        </div>

        <div class="values" id="hex">
          <input id="hexa" type="text" value="#527814" />
        </div>
      </div>
    </div>
   <script>
    document
        .getElementById("container")
        .addEventListener("input", function (e) {
            // Function to update the HEX value and display
            function updateValues() {
                var red = document.getElementById("red").value;
                var green = document.getElementById("green").value;
                var blue = document.getElementById("blue").value;

                var hex = "#" +
                    parseInt(red).toString(16).toUpperCase().padStart(2, '0') +
                    parseInt(green).toString(16).toUpperCase().padStart(2, '0') +
                    parseInt(blue).toString(16).toUpperCase().padStart(2, '0');

                document.getElementById("hexa").value = hex;
                document.getElementById("display").style.backgroundColor = "rgb(" + red + ", " + green + ", " + blue + ")";
                document.querySelector("body").style.backgroundColor = "rgba(" + red + ", " + green + ", " + blue + ", 0.4)";
            }

            // Handle red input
            if (e.target.id == "red") {
                document.getElementById("red-value").value = e.target.value;
                e.target.style.background = "linear-gradient(90deg, rgba(" + e.target.value + ", 0, 0, 0.8) " + (parseInt(e.target.value) / 2.55) + "%, #fff " + (parseInt(e.target.value) / 2.55) + "%)";

                updateValues();
            }

            if (e.target.id == "red-value") {
                document.getElementById("red").value = e.target.value;
                document.getElementById("red").style.background = "linear-gradient(90deg, rgba(" + e.target.value + ", 0, 0, 0.8) " + (parseInt(e.target.value) / 2.55) + "%, #fff " + (parseInt(e.target.value) / 2.55) + "%)";

                updateValues();
            }

            // Handle green input
            if (e.target.id == "green") {
                document.getElementById("green-value").value = e.target.value;
                e.target.style.background = "linear-gradient(90deg, rgba(0, " + e.target.value + ", 0, 0.8) " + (parseInt(e.target.value) / 2.55) + "%, #fff " + (parseInt(e.target.value) / 2.55) + "%)";

                updateValues();
            }

            if (e.target.id == "green-value") {
                document.getElementById("green").value = e.target.value;
                document.getElementById("green").style.background = "linear-gradient(90deg, rgba(0, " + e.target.value + ", 0, 0.8) " + (parseInt(e.target.value) / 2.55) + "%, #fff " + (parseInt(e.target.value) / 2.55) + "%)";

                updateValues();
            }

            // Handle blue input
            if (e.target.id == "blue") {
                document.getElementById("blue-value").value = e.target.value;
                e.target.style.background = "linear-gradient(90deg, rgba(0, 0, " + e.target.value + ", 0.8) " + (parseInt(e.target.value) / 2.55) + "%, #fff " + (parseInt(e.target.value) / 2.55) + "%)";

                updateValues();
            }

            if (e.target.id == "blue-value") {
                document.getElementById("blue").value = e.target.value;
                document.getElementById("blue").style.background = "linear-gradient(90deg, rgba(0, 0, " + e.target.value + ", 0.8) " + (parseInt(e.target.value) / 2.55) + "%, #fff " + (parseInt(e.target.value) / 2.55) + "%)";

                updateValues();
            }

            // Handle HEX input
            if (e.target.id == "hexa") {
                if (e.target.value.length == 7) {
                    var hRed = e.target.value.slice(1, 3);
                    var hGreen = e.target.value.slice(3, 5);
                    var hBlue = e.target.value.slice(5, 7);

                    document.getElementById("red").value = parseInt(hRed, 16);
                    document.getElementById("red-value").value = parseInt(hRed, 16);
                    document.getElementById("red").style.background = "linear-gradient(90deg, rgba(" + parseInt(hRed, 16) + ", 0, 0, 0.8) " + (parseInt(hRed, 16) / 2.55) + "%, #fff " + (parseInt(hRed, 16) / 2.55) + "%)";

                    document.getElementById("green").value = parseInt(hGreen, 16);
                    document.getElementById("green-value").value = parseInt(hGreen, 16);
                    document.getElementById("green").style.background = "linear-gradient(90deg, rgba(0, " + parseInt(hGreen, 16) + ", 0, 0.8) " + (parseInt(hGreen, 16) / 2.55) + "%, #fff " + (parseInt(hGreen, 16) / 2.55) + "%)";

                    document.getElementById("blue").value = parseInt(hBlue, 16);
                    document.getElementById("blue-value").value = parseInt(hBlue, 16);
                    document.getElementById("blue").style.background = "linear-gradient(90deg, rgba(0, 0, " + parseInt(hBlue, 16) + ", 0.8) " + (parseInt(hBlue, 16) / 2.55) + "%, #fff " + (parseInt(hBlue, 16) / 2.55) + "%)";
                }

                if (e.target.value.length == 4) {
                    var hRed = e.target.value.slice(1, 2) + e.target.value.slice(1, 2);
                    var hGreen = e.target.value.slice(2, 3) + e.target.value.slice(2, 3);
                    var hBlue = e.target.value.slice(3, 4) + e.target.value.slice(3, 4);

                    document.getElementById("red").value = parseInt(hRed, 16);
                    document.getElementById("red-value").value = parseInt(hRed, 16);
                    document.getElementById("red").style.background = "linear-gradient(90deg, rgba(" + parseInt(hRed, 16) + ", 0, 0, 0.8) " + (parseInt(hRed, 16) / 2.55) + "%, #fff " + (parseInt(hRed, 16) / 2.55) + "%)";

                    document.getElementById("green").value = parseInt(hGreen, 16);
                    document.getElementById("green-value").value = parseInt(hGreen, 16);
                    document.getElementById("green").style.background = "linear-gradient(90deg, rgba(0, " + parseInt(hGreen, 16) + ", 0, 0.8) " + (parseInt(hGreen, 16) / 2.55) + "%, #fff " + (parseInt(hGreen, 16) / 2.55) + "%)";

                    document.getElementById("blue").value = parseInt(hBlue, 16);
                    document.getElementById("blue-value").value = parseInt(hBlue, 16);
                    document.getElementById("blue").style.background = "linear-gradient(90deg, rgba(0, 0, " + parseInt(hBlue, 16) + ", 0.8) " + (parseInt(hBlue, 16) / 2.55) + "%, #fff " + (parseInt(hBlue, 16) / 2.55) + "%)";
                }

                if (e.target.value[0] != "#") {
                    e.target.value = "#" + e.target.value;
                }
            }
        });
</script>
<script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"
></script>
  </body>
</html>`;
}


function deactivate() {}

module.exports = {
    activate,
    deactivate
};
