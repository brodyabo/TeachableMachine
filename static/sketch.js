let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Rv_KDWgjp/';
let video;
let flippedVideo;
let label = "";
let typingText = "";
let lastUpdateTime = 0;
let videoIsOn = true;
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(400, 320);
  video = createCapture(VIDEO);
  video.size(400, 300);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}

function draw() {
  background(0);
  if(videoIsOn) {
    stroke(255);
    strokeWeight(8);
    rect(0, 0, width, height);
    image(flippedVideo, 4, 4, width - 8, height - 8);

    fill(0, 150);
    noStroke();
    rectMode(CENTER);
    rect(width / 2, height - 30, 200, 40, 20);


    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(typingText, width / 2, height - 30);

  }
  else {
    background(50)
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Click To Start", width / 2, height - 30);
  }
}
function mousePressed(){
  videoIsOn = !videoIsOn
  if(videoIsOn) video.play();
  else video.stop();
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}
let lastSpaceTime = 0;

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;

  // Check if the label has changed
  if (label !== typingText) {
    // Update the typingText only if the label is not "No Sign"
    if (label !== "No Sign") {
      typingText = label;
      // Reset the timer
      lastUpdateTime = millis();
    } else {

      typingText = "Sign not recognized";

      lastUpdateTime = millis();
    }


    if (label === "Space" && typingText !== " " && millis() - lastSpaceTime >= 1000) {
      document.getElementById("output-text").value += ' ';
      lastSpaceTime = millis();
    }
  } else {
    if (millis() - lastUpdateTime >= 1000) {
      // Add the letter to the text box (you can customize this part as needed)
      // For simplicity, I'm just appending the detected letter to the existing text
      document.getElementById("output-text").value += typingText;
      // Reset the typingText
      typingText = "";
    }
  }

  // Classify again!
  classifyVideo();
}
