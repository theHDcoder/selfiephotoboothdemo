const videoPlayer = document.querySelector("#player");
const canvasElement = document.querySelector("#canvas");
const captureButton = document.querySelector("#captureButton");
const context = canvasElement.getContext("2d");
var str = document.getElementById("username").innerHTML;

var xForCanvasText = ["440", "440", "25", "33"];
var yForCanvasText = ["705", "650", "580", "550"];
var fillStyleColor = ["white", "yellow", "red", "red"];
var fontFamilyText = [
  "35px Lato-Bold",
  "35px Amber-Pearl",
  "35px Lato-Bold",
  "35px Amber-Pearl",
];
var textAlignFont = ["right", "right", "left", "left"];
//var maxWidthForCanvasText = [];
var imageNum = 0;
var username = null;
var imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].src = "Assets/RenaProfile.png";

const startMedia = () => {
  //document.getElementById('Scene-3').style.visibility = "visible";
  //document.getElementById('Scene-4').style.visibility = "hidden";
  if (!("mediaDevices" in navigator)) {
    navigator.mediaDevices = {};
  }

  if (!("getUserMedia" in navigator.mediaDevices)) {
    navigator.mediaDevices.getUserMedia = (constraints) => {
      const getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      if (!getUserMedia) {
        return Promise.reject(new Error("getUserMedia is not supported"));
      } else {
        return new Promise((resolve, reject) =>
          getUserMedia.call(navigator, constraints, resolve, reject)
        );
      }
    };
  }

  navigator.mediaDevices
    .getUserMedia({
      video: true,
    })
    .then((stream) => {
      //$(".Scene-3").show();
      videoPlayer.srcObject = stream;
      videoPlayer.style.display = "block";
    })
    .catch((err) => {
      //something if camera not working
    });
};

function capture() {
  // Draw the image from the video player on the canvas
  document.getElementById("Scene-3").style.display = "none";
  document.getElementById("Scene-4").style.display = "block";

  canvasElement.style.display = "block";
  //context.drawImage(videoPlayer, 0, 0, 467, 825);
  context.drawImage(videoPlayer, 0, 0, 1080, 720);
  videoPlayer.srcObject.getVideoTracks().forEach((track) => {
    track.stop();
  });
  //context.globalAlpha = 0.5;
  Merger();
}

function Merger() {
  //Merge magazineCover and text here
  context.drawImage(imgArray[imageNum], -100, 137, 744, 583);
  context.font = fontFamilyText[imageNum];
  context.fillStyle = fillStyleColor[imageNum];
  context.textAlign = textAlignFont[imageNum];

  context.fillText(
    str,
    xForCanvasText[imageNum],
    yForCanvasText[imageNum],
    400
  );
  canvasElement.style.visibility = "visible";
}

function retry() {
  document.getElementById("Scene-3").style.display = "block";
  document.getElementById("Scene-4").style.display = "none";
  canvasElement.style.visibility = "hidden";
  startMedia();
}

function next() {
  if (imageNum != imgArray.length - 1) {
    $("#templates").attr("src", imgArray[++imageNum].src);
    $("#previousButton").show();
  }
  if (imageNum === imgArray.length - 1) {
    $("#nextButton").hide();
  }
}

function previous() {
  if (imageNum != 0) {
    $("#templates").attr("src", imgArray[--imageNum].src);
    $("#nextButton").show();
  }
  if (imageNum === 0) {
    $("#previousButton").hide();
    $("#nextButton").show();
  }
}

function download() {
  var link = document.createElement("a");
  link.download = "test.png";
  link.href = document.getElementById("canvas").toDataURL();
  link.click();
  document.body.removeChild(link);
  delete link;
}
document.getElementById("templates").src = imgArray[imageNum].src;
$("#previousButton").hide();
//startMedia();
