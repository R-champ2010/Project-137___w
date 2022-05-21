status = "";
video = "";
objects = [];

function preload(){
}


function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}


function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }

    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){

        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Stataus : Objects Detected";
    
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name){
                console.log("rithwik");
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML=object_name+"found";
                synth=window.SpeechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+"found");
                synth.speak(utterThis);
            }
            else {
                document.getElementById("object_status").innerHTML=object_name+"not found";
            }
        }
        }
}

