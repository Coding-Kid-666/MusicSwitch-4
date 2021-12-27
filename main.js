status_song1 = "";
status_song2 = "";

score_LeftWrist = 0;

leftWrist_X = 0;
leftWrist_Y = 0;

rightWrist_X = 0;
rightWrist_Y = 0;

var song_1 = "";
var song_2 = "";

function preload(){
    song_1 = loadSound("song1.mp3");
    song_2 = loadSound("song2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    status_song1 = song_1.isPlaying();
    status_song2 = song_2.isPlaying();

    if(score_LeftWrist > 0.2)
    {
    stroke('#ff0000');
    fill('#ff0000');
    circle(leftWrist_X, leftWrist_Y, 20);

    song_2.stop();
    if(status_song1 == false){
        song_1.play();
        document.getElementById("Current_Song").innerHTML = "Now Playing - Arcade";
    }
    }

}
function modelLoaded(){
    console.log("PoseNet has successfully been set up.");
}
function gotPoses(results){
    if(results.length > 0){

        leftWrist_X = results[0].pose.leftWrist.x;
        leftWrist_Y = results[0].pose.leftWrist.y;

        rightWrist_X = results[0].pose.rightWrist.x;
        rightWrist_Y = results[0].pose.rightWrist.y;

        score_LeftWrist = results[0].pose.keypoints[9].score;


        console.log("Left wrist X = " + leftWrist_X + " left wrist Y = " + leftWrist_Y);
        console.log("Right wrist X = " + rightWrist_X + " right wrist Y = " + rightWrist_Y);

        console.log("Left wrist score = " + score_LeftWrist);



    }
}
