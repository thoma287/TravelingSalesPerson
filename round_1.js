var cities = [];
var totalCities = 4;
var recordDistance;
var bestScore;
var order = [];

function setup() {
  createCanvas(400, 600);
  for(var i = 0; i < totalCities; i++){
    var v = createVector(random(width),random(height/2));
    cities[i] = v;
    order[i] = i;
  }
  
  var d = calcDistance(cities);
  recordDistance = d;
  bestScore = cities.slice();
}

function draw() {
  background(0);
  fill(255);
  for(var i = 0; i < cities.length; i++){
    ellipse(cities[i].x,cities[i].y, 8,8);
  }
  
  stroke(255);
  strokeWeight(1);
  noFill(20);
  beginShape();
  for(var i = 0; i < cities.length; i++){
    vertex(cities[i].x,cities[i].y);
  }
  endShape();
  
  stroke(106,0,106);
  strokeWeight(4);
  noFill();
  
  beginShape();
  for(var i = 0; i < cities.length; i++){
    vertex(bestScore[i].x,bestScore[i].y);
  }
  endShape();  
  
  var i = floor(random(cities.length));
  var j = floor(random(cities.length));
  swap(cities,i,j);
  
  var d = calcDistance(cities);
  if(d < recordDistance){
    recordDistance = d;
    bestScore = cities.slice();
    console.log(recordDistance);
  }
  textSize(64);
  var s = '';
  for (var i = 0; i < order.length; i++){
    s+=order[i];
  }

  fill(255);
  text(s, 20, height-50);
  
  
}

//Swapping arrays options
function swap(a,i,j){
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points){
  var sum = 0;
  for(var i = 0; i < points.length-1; i++){
    //Calculate distance between point and next point
    var d = dist(points[i].x,points[i].y, points[i+1].x,points[i+1].y);
    sum +=d;
  }
  return sum;
}








function nextOrder(){
//Lexicographic ordering
  var largestI = -1;
  for(var i = 0; i < order.length -1; i++){
    if (order[i] < order[i+1]){
      largestI = i;
    }
  }
  if ( largestI == -1){
    noLoop();
    console.log('finished');
  }
  //Finds the last "smallestj in reference to largestI"
    //the last number that's smaller than the largest
  var largestJ = -1;
  for(var j = 0; j < order.length; j++){
    if(order[largestI] < order[j]){
      largestJ = j; 
    }
  }
  swap(order, largestI, largestJ);
  
  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
  background(0);
  textSize(64);
  var s = '';
  for (var i = 0; i < order.length; i++){
    s+=order[i];
  }

  fill(255);
  text(s, 20, height/2);
}
















var vals = [0,1,2,3,4,5,6,7,8,9];

function setup(){
  createCanvas(400,300);
  
  
}


function draw(){
  //Lexicographic ordering
  var largestI = -1;
  for(var i = 0; i < vals.length -1; i++){
    if (vals[i] < vals[i+1]){
      largestI = i;
    }
  }
  if ( largestI == -1){
    noLoop();
    console.log('finished');
  }
  //Finds the last "smallestj in reference to largestI"
    //the last number that's smaller than the largest
  var largestJ = -1;
  for(var j = 0; j < vals.length; j++){
    if(vals[largestI] < vals[j]){
      largestJ = j; 
    }
  }
  swap(vals, largestI, largestJ);
  
  var endArray = vals.splice(largestI + 1);
  endArray.reverse();
  vals = vals.concat(endArray);
  background(0);
  textSize(64);
  var s = '';
  for (var i = 0; i < vals.length; i++){
    s+=vals[i];
  }

  fill(255);
  text(s, 20, height/2);

  
}

//Swapping arrays options
function swap(a,i,j){
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}