var cities = [];
var totalCities = 20;
var popsize = 100;
var recordDistance = Infinity;
var bestScore;
var currentBest;
// var order = [];

var population = [];
var fitness = [];
// var totalPerms;
// var count = 1;

function setup() {
  createCanvas(800, 400);
  var order = []
  for(var i = 0; i < totalCities; i++){
    var v = createVector(random(width),random(height/2));
    cities[i] = v;
    order[i] = i;
  }

  for (var i=0; i< popsize; i++){
    population[i] = shuffle(order);
  }



}



function draw() {
  background(0);

  calcFitness();
  normalizeFitness();
  nextGeneration();
  
    fill(255);
  for(var i = 0; i < cities.length; i++){
    ellipse(cities[i].x,cities[i].y, 8,8);
    textSize(12);
    
    text(i,cities[i].x,cities[i].y);
  }

  
  textSize(32);
  var s = calcDistance(cities, bestScore);
  var k = bestScore
  fill(100);
  text("best score: "+s, 20, height-60);
  text("order: "+k, 20, height-10);
  

  

  stroke(106,0,106);
  strokeWeight(4);
  noFill();
  

  beginShape();
    for(var i = 0; i < bestScore.length; i++){
    var n = bestScore[i];
    vertex(cities[n].x,cities[n].y);
  }
  endShape();
  
  fill(255);
  for(var i = 0; i < cities.length; i++){
    ellipse(cities[i].x,cities[i].y, 8,8);
    textSize(12);
    
    text(i,cities[i].x,cities[i].y);
  }

  translate(0,height/2)

  stroke(255);
  strokeWeight(1);
  noFill(20);
  beginShape();
  for(var i = 0; i < currentBest.length; i++){
    var n = currentBest[i];
    vertex(cities[n].x,cities[n].y);
    ellipse(cities[i].x,cities[i].y, 8,8);
  }
  endShape();



  // var d = calcDistance(cities, order);
  // if(d < recordDistance){
  //   recordDistance = d;
  //   bestScore = order.slice();
  //   // console.log(recordDistance);
  // }
  // var s = '';
  // for (var i = 0; i < order.length; i++){
  //   s+=order[i];
  // }

  // fill(255);
  // textSize(32);

  // text(s, 60, height/2-50);
  // var percent = 100* (count/totalPerms);
  // text(nf(percent, 0, 4) + "% completed",20,height/2-10)

  // nextOrder();


}

function shuffle(a,num){
  for (var i = 0; i < num; i++){
    var indexA = floor(random(a.length));
    var indexB = floor(random(a.length));
    swap(a, indexA, indexB);
  }
}

//Swapping arrays options
function swap(a,i,j){
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order){
  var sum = 0;
  for(var i = 0; i < order.length-1; i++){
    //Calculate distance between point and next point
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i+1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x,cityA.y, cityB.x,cityB.y);
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
  count++;

}

function factorial(n){
  if(n==1){
    return 1;
  }
  else{
    return n * factorial(n-1);
  }
}
