objects = [];
video = "";
Status = "";
function preload(){
video = createVideo("video.mp4");
video.hide()
}

function setup(){
   canvas = createCanvas(420,320);
   canvas.center();
}

function draw(){
 image(video,0,0,420,320);
 if(Status != ""){
    objectDetecor.detect(video,gotResults);   

    for(i = 0; i < objects.length ; i++){
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("no_of_objects").innerHTML = "No of objects Detected are: "+objects.length;

        fill("#fc0303");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" ,objects[i].x+20,objects[i].y+20);
        noFill();
        stroke("#fc0303");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
 }
}

function start(){
    objectDetecor = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}
function modelLoaded(){
    console.log("model is loaded.");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error,results){
    if(error){
        console.error(error);

    }
    else{
        console.log(results);
        objects = results;
    }
}
