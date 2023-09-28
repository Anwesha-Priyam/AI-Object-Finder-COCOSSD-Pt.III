objects = [];
status = "";

function setup() 
{
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300,300);
    video.hide();
}

function modelLoaded() 
{
    console.log("Model Loaded!");
    status = true;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_name = document.getElementById("Name").value;
}

function gotResult(error, results)
{
   if (error)
   {
       console.log(error);
   }
   console.log(results);
   objects=results;
}

function draw()
{
    image(video, 100, 100, 300, 300);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);

        for(i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML="Status : Models loaded";

            fill("#E0EDF3");

            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();

            stroke("#E0EDF3");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == Name)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status");
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(Name + "Found");
                synth.speak(utterThis);
            }
            else
            {
                dosument.getElementById("status").innerHTML=Name + "Not Found" 
            }
        }
    }
}