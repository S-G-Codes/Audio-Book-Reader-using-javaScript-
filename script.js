console.log('Hii there!');

// grabbing our video tag and pre element tag
const video = document.querySelector("video")
const textElement = document.querySelector("[data-text]")

// this setup fn allows our js to access the user web camera and hook it up to our video tag in html and display on the screen

async function setup(){
    const stream = await navigator.mediaDevices.getUserMedia({video: true})
    video.srcObject = stream;
  
video.addEventListener('playing' , async() =>{
    const worker = Tesseract.createWorker()
    await worker.load();
    await worker.loadLanguage("eng")
    await worker.initialize("eng");    //till here we have initalize the worker which is coming from the cdn or tessarcat from html and after that loaded the worker and then told them which language we are using and initalize it
    // console.log(worker);
    
// to get the image text we will create a canvas and will set the same width and height as video

// Canvas tag Def - 
// The <canvas> tag is used to draw graphics, on the fly, via scripting (usually JavaScript).
// The <canvas> tag is transparent, and is only a container for graphics, you must use a script to actually draw the graphics.


const canvas = document.createElement('canvas');
canvas.width = video.width;
canvas.height = video.height;

// When user presses the space bar it start recognize the text
document.addEventListener("keypress" , async e =>{
    if(e.code !== "Space") return
    
    // setting our current video frame as our canvas frame
    canvas.getContext("2d").drawImage(video , 0 , 0 , video.width, video.height)

    // recognize is an inbuilt fn in tessarcat library

    // deconstructing 
  const {data : {text} ,} = await worker.recognize(canvas)
//   console.log(text);

// Reading the text by using speechSynthesis methof and replacing the extraa spaces with a single space
//    /\s\g is just an regular expression for extraa spaces 
speechSynthesis.speak(new SpeechSynthesisUtterance(text.replace(/\s/g, " ")))

// setting our textElement or pre tag from html to write in whatever it has recgonize
textElement.textContent = text
  
})




})

}

setup();
