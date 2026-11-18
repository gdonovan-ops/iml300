let drawing = [];
let isDrawing = false;

// Replace with your own web app's Firebase configuration. 
const firebaseConfig = {
  apiKey: "AIzaSyBz6avgpL7zE2nR0b_4mFJTBA89OJx9T5M",
  authDomain: "grace-hi.firebaseapp.com",
  projectId: "grace-hi",
  storageBucket: "grace-hi.firebasestorage.app",
  messagingSenderId: "819455543488",
  appId: "1:819455543488:web:af9d2d2226254de2b94525",
  measurementId: "G-VZ8D9F2LD5"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyA7fORh5abXxv3PTqx24hAc4pDZQ1SBOYU",
//   authDomain: "collective-p5-canvas.firebaseapp.com",
//   projectId: "collective-p5-canvas",
//   storageBucket: "collective-p5-canvas.appspot.com",
//   messagingSenderId: "784384167908",
//   appId: "1:784384167908:web:34fee3e4f6cd4b065041f1"
// };

firebase.initializeApp(firebaseConfig);
database = firebase.database();
let ref = database.ref("words");

//  var data ={
//    name: "q",
//    word: "hello"
//  }
 
// ref.push(data);

ref.on("value", gotData, errData);

var storageRef = firebase.storage().ref("");

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('canvasContainer');
  background(220);
  noStroke();
  
  //add button
  let saveButton = select("#saveButton");
  saveButton.mousePressed(saveDrawing);
  // saveButton.position(20, 100);
  
   var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);
  
  canvas.drop(gotFile); // drop image to the canvas
}


function saveDrawing() {
  var ref = database.ref("words");
  loadPixels();
  const image64 = canvas.toDataURL();
  // console.log(image64);
  var data = {
    picture: image64
  };
  var result = ref.push(data, dataSent);
  // console.log(result.key);

  function dataSent(status) {
    // console.log(status);
  }
}

function errData(err) {
  // console.log("Error");
  console.log(err);
}

function gotData(data) {
  console.log("GOT DATA FUNCTION");
  
   // clear the listing
  var elts = selectAll('.smallImage');
  for (var i = 0; i < elts.length; i++) {
    elts[i].remove();
  }
  
   var ref = database.ref("words");
  // console.log(data.val());
  let drawings = data.val();
  let keys = Object.keys(drawings);
  // console.log(keys);
  // Reverse the keys array to show newest first
  keys.reverse();
  for (var i = 0; i < keys.length; i++) {
    let k = keys[i];
    let picture = drawings[k].picture;
    console.log(picture);
  
    let allImages = createImg(picture, () => {
      // allImages.size(AUTO, 80);
      // allImages.style("margin-top", 15 + "px");
      // allImages.style("margin-left", 15 + "px");
      // allImages.style("margin-right", 15 + "px");
    });
    allImages.class('smallImage');
    allImages.parent('drawingContainer');
        
  }
}

// inside canvas
function mouseDragged() {
  fill(0);
  circle(mouseX, mouseY, 5);
}

function gotFile(file) {
  let img = createImg(file.data, '').hide();
  // image(img, 0, 0, 200, 200);
  image(img, 0, 0, width, height);
}

function clearDrawing() {
  // clear();
  background(220);
  // console.log("CLEAR CANVAS");
}