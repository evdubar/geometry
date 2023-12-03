/* eslint-disable no-undef, no-unused-vars */

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  isEqu(b){
    if(this.x == b.x && this.y == b.y){
      console.log(this.x, b.x, this.y, b.y);
      return true;
    }
    
  else return false;
  }
  substract(p){
    this.x -=p.x;
    this.y -=p.y;
  }
  isinArray(arr){
    for (let i = 0; i< arr.length ;i++){
      if (this.x == arr[i].x && this.y == arr[i].y )
      return true;
    }
    return false;
  }
}

class Split{
 

  constructor(ptBeg, ptEnd, pArray, ptBridge){
    this.ptBeg=ptBeg;
    this.ptEnd=ptEnd;
    this.ptBridge=ptBridge;
    this.pArray=pArray;
  }

  setpointBridge(ptBridge){
    this.ptBridge=ptBridge;
  }
}

class SplitTree extends Split{
  constructor(ptBeg, ptEnd, pArray, ptBridge, parent, child){
    super(ptBeg, ptEnd, pArray, ptBridge);
    this.parent = parent;
    this.child = child;
  }
  setChild(child){
    this.child= child;
  }

}

var points = [];
var points2 = [];
var points3 = [];
var pts = [];
var hull = [];
var splited = [];
var tree = [];
var treeScaled = [];
var lineInt = [];
var segmenInt = [];
var step = 0;
var lineS = 0;
var bool = 0;
var b = [];
var psplit = [];
var ponline = [];
var sp = 0;
var area = 0;
var bends = 0;
var length = 0;
var treeVal=0;

var pnts=[];
var choose = 0;
var pt1 = [300, 250, 300, 290, 330, 290, 420, 290, 420, 340, 490, 340, 490, 390, 420, 390, 330, 390, 330, 420, 495, 420, 495, 430, 
  670, 430, 670, 410, 700, 410, 700, 360,650, 360, 590, 360, 590, 300, 650, 300, 650, 190, 600, 190, 600, 250, 
  600, 280, 550, 280, 550, 250 ];
var pt2 = [300, 250, 300, 290, 330, 290,330, 270, 330, 260, 350, 260, 360, 260, 360, 270, 350, 270,  350, 290, 350, 310, 330, 310, 330, 320,340, 320, 355, 320, 355, 330,  340, 330, 340, 350, 345, 350, 359, 350,
359, 369, 345, 369, 345, 396,  450, 396, 450, 450, 460, 450, 460, 420, 460, 400, 490, 400, 490, 420, 500, 420, 500, 401, 500, 321, 520, 321, 520, 401, 540, 401,
540, 375, 526, 375, 526, 360, 540, 360, 573, 360, 573, 340, 558, 340, 558, 323, 573, 323, 586, 323, 586, 300, 362, 300, 362, 290, 586, 290, 600, 290, 600, 280, 456,
280, 456, 267, 600, 267, 620, 267,620, 240, 590, 240, 590, 220, 620, 220, 630, 220, 630, 200, 621, 200, 621, 190, 600, 190, 600, 198, 400, 198, 400, 210, 400, 280, 
380, 280, 380, 210, 340, 210, 340, 250];

var pt3 = [300 , 450,300 , 460,335 , 460,335 , 485,345 , 485,345 , 460,375 , 460,375 , 485,385 , 485,385 , 460,495 , 460,495 , 485,505 , 485,505 , 460,505 , 450,445 , 450,445 , 400,505 , 400,575 , 400,575 , 450,575 , 460,665 , 460,665 , 450,655 , 450,585 , 450,585 , 425,585 , 370,655 , 370,655 , 425,665 , 425,665 , 360,635 , 360,575 , 360,575 , 390,565 , 390,555 , 390,505 , 390,505 , 360,505 , 335,505 ,
   300,505 , 280,505 , 250,555 , 250,595 , 250,595 , 280,635 , 280,635 , 300,595 , 300,555 , 300,555 , 335,565 , 335,565 , 310,575 , 310,635 , 310,635 , 335,635 , 340,665 , 340,680 , 340,680 , 330,645 , 330,645 , 280,680 , 280,680 , 270,645 , 270,645 , 250,680 , 250,685 , 250,685 , 215,675 , 215,675 , 240,645 , 240,645 , 215,645 , 210,600 , 210,600 , 220,605, 220,635 , 220,635 , 240,635 , 270,605 , 270,605 , 
   240,600 , 240,495 , 240,495 , 270,465 , 270,465 , 240,445 , 240,445 , 210,400 , 210,400 , 220,435 , 220,435 , 240,400 , 240,355 , 240,355 , 270,325 , 270,325 , 240,325 , 220,315 , 220,315 , 280,335 , 280,365 , 280,365 , 270,365 , 250,415 , 250,455 , 250,455 , 270,415 , 270,415 , 280,415 , 300,365 , 300,335 , 300,335 , 330,315 , 330,315 , 340,340 , 340,345 , 340,345 , 310,380 , 310,415 , 310,415 ,
    340,415 , 345,380 , 345,380 , 355,385 , 355,400 , 355,415 , 355,415 , 365,425 , 365,425 , 280,495 , 280,495 , 365,495 , 390,425 , 390,415 , 390,400 , 390,400 , 400,435 , 400,435 , 420,435 , 450,400 , 450,385 , 450,385 , 420,345,420,340 , 420,340 , 430,375 , 430,375 , 450,340 , 450,315 , 450];


    var ptnul = new Point(0, 0);

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke('black');
  background(220);
  calc = createButton("Next Step");
  calc.position(115, 65);
  calc.mousePressed(nextStep);
  prev = createButton("Next Bridge");
  prev.position(15, 65);
  prev.mousePressed(prevStep);
  star = createButton("Start Over");
  star.position(200, 65);
  star.mousePressed(startOver);

  
  fill(250);
  rect(10, 100, windowWidth - 20, windowHeight - 110);
  
  
}

function draw() {
  stroke('black');
  background(220);
  fill(250);
  rect(10, 100, windowWidth - 20, windowHeight - 110);
  if (step == 0) {
    fill(0);
    stp0();

    
  }
 
  if(step>=1){
    //stroke("black");
    noStroke();
    fill(0);
    text("bounding box", 30, 50);
    text("step:", 130, 50);
    text(step, 160, 50);
    stroke("black");
    fill(218, 255, 218);
    strokeWeight(4);
    stroke("blue");
    strokeWeight(1);
    fill('red');
    if(step>2){
      
    for (i in hull){
      
      if(i>0){
        line(hull[i - 1].x, hull[i - 1].y, hull[i].x, hull[i].y);
        
      }
    }

    line(hull[0].x, hull[0].y, hull[hull.length-1].x, hull[psplit.length-1].y);}
  }
 

 
  drawPoly(points);



  if (step > 0) {
    strokeWeight(2);
    len = points.length;
    line(points[len - 1].x, points[len - 1].y, points[0].x, points[0].y);
    strokeWeight(1);
  }
  fill('red');
  if(step>2){ for (i in psplit) ellipse(psplit[i].x, psplit[i].y, 4, 4);}
  let arr = [];
  
if(step>2){
  drwCurSplit();
}

drawRectHull();
//drawRecursTree();




if(step>=4){
  strokeWeight(2);
  for( i = 0; i<pnts.length-1; i++){
    stroke("blue");
  }
  strokeWeight(1);
  noStroke();
  fill("black");
  //textSize(20);
  text("area: ",50,  340);
  text(area, 80, 340);
  text("bends: ",50,  360);
  text(bends, 80, 360);
  text("length: ",50,  380);
  text(length, 80, 380);
}

  
}


///****NEXT STEP */
function nextStep() {
  if(step>0)
  step += 1;
  if(step == 2) boundingBox();
  if(step == 3) {
    splitB();
   // boundingBox2();
    createSplit();
   // nextSplit2();
  }
  if(step>=4){
    //  nextSplit2();
      nextSplit3();
      areaCalc();
    }
}

function prevStep() {
  sp += 1;
  sp = sp%tree.length;
  
}
function startOver(){
   points = [];
 points2 = [];
 points3 = [];
 pts = [];
 hull = [];
 splited = [];
 tree = [];
 treeScaled = [];
 lineInt = [];
 segmenInt = [];
 step = 0;
 lineS = 0;
 bool = 0;
 b = [];
 psplit = [];
 ponline = [];
 sp = 0;
 area = 0;
 bends = 0;
 length = 0;
 treeVal=0;

 pnts=[];
 choose = 0;
}

function closePoly(){
  if(abs(points[points.length-1].x - points[points.length-2].x) < abs(points[points.length-1].y - points[points.length-2].y)){
    points.push(new Point(points[0].x, points[points.length-1].y));
  }
  else points.push( new Point(points[points.length-1].x, points[0].y));

}

function boundingBox(){
  let ptsX = [];
  let ptsY = [];
  
  for(var i = 0; i< points.length; i++){
    ptsX.push(points[i].x);
    ptsY.push(points[i].y);
  }
   
   b.push(min(ptsX));
   b.push(max(ptsX));
   b.push(min(ptsY));
   b.push(max(ptsY));

   hull.push(new Point(b[0], b[2]));
   hull.push(new Point(b[0], b[3]));
   hull.push(new Point(b[1], b[3]));
   hull.push(new Point(b[1], b[2]));
    
}



function boundingBox2(){
  let pArray=[];
  let ptBeg = ptnul;
  let ptBridge = ptnul;
  let pEnd = ptnul;
  let start = 0;
  
  for (i in points){
    if(points[i].isinArray(psplit)){
      if (start == 0) start = i;
      if (ptBeg == ptnul) {
        ptBeg = points[i];
        pArray = [];}
      else {
        ptEnd = points[i];
        if(new Point(ptBeg.x, ptEnd.y).isinArray(hull)){ 
          ptBridge = new Point(ptBeg.x, ptEnd.y);}
        else if (new Point(ptEnd.x, ptBeg.y).isinArray(hull)) {
          ptBridge = new Point(ptEnd.x, ptBeg.y);}
        tree.push(new SplitTree(ptBeg, ptEnd, pArray, ptBridge, -1, -1));
        ptBeg = ptEnd;
        pArray=[];
      }
    }
    else
    pArray.push(points[i]);
    
  }
  pEnd = points[start];
  console.log(pEnd, start);
  if(start!=0){
  for(let i = 0; i<start; i++){
    pArray.push(points[i]);
  }
  if(new Point(ptBeg.x, ptEnd.y).isinArray(hull)) ptBridge = new Point(ptBeg.x, ptEnd.y);
  else if (new Point(ptEnd.x, ptBeg.y).isinArray(hull)) ptBridge = new Point(ptEnd.x, ptBeg.y);
  tree.push(new SplitTree(ptBeg, ptEnd, pArray, ptBridge, -1, -1));}

console.log(hull);
}

function createPoly(pt, ptOutp, a, scale, vert){
  
  //points.push(new Point(50, 150));*/
  for(let i = 0; i<pt.length; i+=2){
    ptOutp.push(new Point(scale*pt[i]+a, scale*pt[i+1]+vert ));
  }
}


function splitB(){
  let x1= [];
  let x2 = [];
  let y1 = [];
  let y2 = [];
  

  for (i in points){
    if(!points[i].isinArray(hull)){
    if(points[i].x==b[0])
      x1.push(points[i].y);
    else if(points[i].x==b[1])
      x2.push(points[i].y);
    if(points[i].y==b[2])
      y1.push(points[i].x);
    else if(points[i].y==b[3])
      y2.push(points[i].x);
  }}
  psplit.push(new Point(b[0], min(x1)));
  psplit.push(new Point(min(y2), b[3]));
  psplit.push(new Point(b[1],max(x2)));
  psplit.push(new Point(max(y1), b[2]));
  
}

function createSplit(){
  
  let p = [];
  let init = 0;
  let j = 1;
  let k = 0;
  let ptb = points[0];
  let pte;
  for(let i = 1; i< points.length; i++){
      if(psplit[j].x==points[i].x && psplit[j].y==points[i].y){
        pte = points[i];
        k=0;
        init = 1;
        splited.push(new Split(ptb, pte, p, ptnul));
        tree.push(new SplitTree(ptb, pte, p, ptnul, -1, -1));
        
        //console.log(i, points[i]);
        p=[];
        ptb=pte;
        j++ ;
        j = j % psplit.length;
        console.log(j);
      }
      else p.push(points[i]);
  }
  splited.push(new Split(ptb, points[0], p, ptnul));
  tree.push(new SplitTree(ptb, points[0], p, ptnul, -1, -1));
  
  
  for (i in splited){
    for (j in hull){
      if(splited[i].ptBeg.x == hull[j].x && splited[i].ptEnd.y==hull[j].y){
        splited[i].setpointBridge(hull[j]);
        tree[i].setpointBridge(hull[j]);
        

      }
      else if(splited[i].ptBeg.y == hull[j].y && splited[i].ptEnd.x==hull[j].x){
        splited[i].setpointBridge(hull[j]);
        tree[i].setpointBridge(hull[j]);
        
      }
    }
  }

}


function ptOnLine(lineBeg, lineEnd, point){
  if(isVert(lineBeg, lineEnd)){
    if(point.x==lineBeg.x){
      console.log("ptx linbegx")
      if((lineBeg.y<point.y && lineEnd.y>point.y)||(lineBeg.y>point.y && lineEnd.y<point.y)){
      return true;}
      else return false;
    }
    else return false;
  }
  else if(point.y == lineBeg.y){
    if((lineBeg.x<point.x && lineEnd.x>point.x)||(lineBeg.x>point.x && lineEnd.x<point.x))
      return true;else return false;
    }
    else return false;

}

function nextSplit2(){
  let spl=[];
  let p1 = [];
  let p2 = [];
  let pbr;
  let pbr2;

  let v1; 
  let v2;
  let k=0;
  for(i in splited){
    /** CASE 1: if the split part is exactly the hull part, for 2 or 3 vertices */
    if((splited[i].pArray.length==0) || (splited[i].pArray.length==1 && linePoint(splited[i].pArray[0], splited[i].ptBridge))){
      console.log(i, "case1");
      spl.push(splited[i]);
    }
    /** CASE 2: if the first point on the point array is on the  hull */
    else if(ptOnLine(splited[i].ptBeg, splited[i].ptBridge, splited[i].pArray[0])){
      console.log(i, "case2");
      p1 = splited[i].pArray.slice(0, 1);
      p2 = splited[i].pArray.slice(2, splited[i].pArray.length);
      if(isVert(splited[i].ptBeg, splited[i].ptBridge)){
        pbr = new Point(splited[i].pArray[1].x, splited[i].ptBridge.y);
        }
      else 
      pbr = new Point(splited[i].ptBridge.x, splited[i].pArray[1].y);


      spl.push(new Split(splited[i].ptBeg, splited[i].pArray[1], p1, splited[i].pArray[0]));
      spl.push(new Split(splited[i].pArray[1],splited[i].ptEnd, p2, pbr));
      }

    
    else {
      let c = 0;
      console.log(i, "case3");
      k=0;
      for(let j = 1; j<splited[i].pArray.length; j++){

        k++;
        console.log(k);
        if(ptOnLine(splited[i].ptBeg, splited[i].ptBridge, splited[i].pArray[j])){
          c=1;
          console.log(i, "case3.1")
          p1 = splited[i].pArray.slice(0, k);
          p2 = splited[i].pArray.slice(k+1, splited[i].pArray.length);
          

        spl.push(new Split(splited[i].ptBeg, splited[i].pArray[k], p1, splited[i].pArray[k]));
        spl.push(new Split(splited[i].pArray[k],splited[i].ptEnd, p2, splited[i].ptBridge));
        break;
        }
      }


      if(c!=1){
        console.log("case3.2");
        k=0;
        v1 = normVec(splited[i].ptBeg, splited[i].ptBridge);
        let firstP=0;
        
        for(let j = 0; j<splited[i].pArray.length;j++){
          //console.log("j", j);
          if(!linePoint(splited[i].ptBeg, splited[i].ptBridge,splited[i].pArray[j])){
            firstP=j;
            break;
          }
        }
        //let maxi = 0;
      for(let j = 1; j<splited[i].pArray.length; j++){
        
        console.log(k);
        v2 = normVec(splited[i].pArray[firstP], splited[i].pArray[j]);
        
        console.log(k, v1, v2);
        if(samePoint(v1, v2)) {
          k = j;
          
          
        }
        else if(k!=0 && k==j-1) break;
        
      }
      console.log(k);
      p1 = splited[i].pArray.slice(0, k);
      p2 = splited[i].pArray.slice(k+1, splited[i].pArray.length);
      if(isVert(splited[i].ptBeg, splited[i].ptBridge)){
        pbr2 = new Point(splited[i].pArray[k].x,splited[i].ptBeg.y);
        pbr = new Point(splited[i].pArray[firstP].x, splited[i].ptBridge.y);
        }
      else {pbr = new Point(splited[i].ptBridge.x, splited[i].pArray[firstP].y);
      pbr2 = new Point(splited[i].ptBeg.x, splited[i].pArray[k].y);}

      spl.push(new Split(splited[i].ptBeg, splited[i].pArray[k], p1, pbr2));
      spl.push(new Split(splited[i].pArray[k],splited[i].ptEnd, p2, pbr));
      }

      
      
    }
  }
  splited = spl;
  console.log(splited);
}

function nextSplit3(){
  let spl=[];
  let p1 = [];
  let p2 = [];
  let pbr;
  let pbr2;

  let v1; 
  let v2;
  let k=0;
  
  console.log("nextSplit3");
  for(i in tree){
    let ptBeg =  tree[i].ptBeg;
  let ptBridge = tree[i].ptBridge;
  let ptEnd = tree[i].ptEnd;
    console.log(tree[i].child, tree[i].child<0);
    if(tree[i].child<0){
      console.log("nS3: ", i, tree[i].ptBeg);

    /** CASE 1: if the split part is exactly the hull part, for 2 or 3 vertices */
    if((tree[i].pArray.length==0) || (tree[i].pArray.length==1 && linePoint(tree[i].ptBeg,tree[i].pArray[0], tree[i].ptBridge))){
      console.log(i, "case1");
      continue;
     // spl.push(splited[i]);
    }
    /**case?? */
    //else if (orientDet(tree[i].ptBeg, tree[i].ptBridge, tree[i].ptEnd)&& )
    else {
      if(samePoint(tree[i].ptBeg, tree[i].ptBridge)) {
        ptBridge=ptEnd;
        tree[i].ptBridge = tree[i].ptEnd;
        console.log("changed ptbridge");
      }
    /*  if(orientDet(tree[i].ptBeg, tree[i].ptBridge, tree[i].ptEnd)!=0){

      }*/

let a = 0;
let c = 0;
      
      
      let first=0;
      console.log(i, "case3 : if a point is on the line, different case is it is the first or another one");
      k=0;
      for(let j = 1; j<tree[i].pArray.length; j++){

        k++;
        console.log(k);
        if(ptOnLine(tree[i].ptBeg, tree[i].ptBridge, tree[i].pArray[j])){
         
          
          c=1;
          console.log(i, "case3.1")
          p1 = tree[i].pArray.slice(0, k);
          p2 = tree[i].pArray.slice(k+1, tree[i].pArray.length);
          

        tree.push(new SplitTree(tree[i].ptBeg, tree[i].pArray[k], p1, tree[i].pArray[k], i, -1));
        tree.push(new SplitTree(tree[i].pArray[k],tree[i].ptEnd, p2, tree[i].ptBridge, i, -1));
        tree[i].setChild([tree.length-2, tree.length-1]);
        break;}
        
        
      }
      if(c!=1){
        if(ptOnLine(tree[i].ptBeg, tree[i].ptBridge, tree[i].pArray[0])){
          console.log(i, "case2");
          p1 = tree[i].pArray.slice(0, 1);
          p2 = tree[i].pArray.slice(2, tree[i].pArray.length);
          if(isVert(tree[i].ptBeg, tree[i].ptBridge)){
            pbr = new Point(tree[i].pArray[1].x, tree[i].ptBridge.y);
            }
          else 
          pbr = new Point(tree[i].ptBridge.x, tree[i].pArray[1].y);
    
    
          tree.push(new SplitTree(tree[i].ptBeg, tree[i].pArray[1], p1, tree[i].pArray[0], i, -1));
          tree.push(new SplitTree(tree[i].pArray[1],tree[i].ptEnd, p2, pbr, i, -1));
          tree[i].setChild([tree.length-2, tree.length-1]);
          }

        
    /*  else if(linePoint(tree[i].ptBeg, tree[i].ptBridge,tree[i].pArray[0])
       && !linePoint(tree[i].ptBeg, tree[i].ptBridge, tree[i.ptEnd])){
        console.log("case n?, if bridge perp just change it");
        v1 =normVec(tree[i].ptBridge, tree[i].ptEnd);

      }*/


      else{
        console.log("case3.2: L");
        if(true){//!linePoint(tree[i].ptEnd, tree[i].ptBridge,tree[i].ptEnd)) {
        k=0;
        let minI;
        let minD;
        let vert = false;
        if(isVert(tree[i].ptBeg, tree[i].ptBridge)) vert = true;
        minD = Infinity;
        minI = 0;

        for(let j = 0; j<tree[i].pArray.length; j++){
          if(under(tree[i].ptBeg, tree[i].ptBridge, tree[i].pArray[j])){
          if(vert){
            if(abs(tree[i].ptBridge.x-tree[i].pArray[j].x)<minD)
            
           {   minI = j; minD = abs(tree[i].ptBridge.x-tree[i].pArray[j].x);
          console.log("minD found in x distance");}
            
          }
          else{
            if(abs(tree[i].ptBridge.y-tree[i].pArray[j].y)<minD){
              minI = j; minD =abs(tree[i].ptBridge.y-tree[i].pArray[j].y);
              console.log("minD found in y distance");
            }

          }
        }}
        console.log("min ", minD, minI, tree[i].pArray[minI]);
      console.log(k);
      k = minI;
      p1 = tree[i].pArray.slice(0, k);
      p2 = tree[i].pArray.slice(k+1, tree[i].pArray.length);
      if(vert){
        pbr2 = new Point(tree[i].pArray[k].x,tree[i].ptBeg.y);
        pbr = new Point(tree[i].pArray[k].x, tree[i].ptEnd.y);
        }
      else {
      pbr = new Point(tree[i].ptEnd.x, tree[i].pArray[k].y);
      pbr2 = new Point(tree[i].ptBeg.x, tree[i].pArray[k].y);}

      tree.push(new SplitTree(tree[i].ptBeg, tree[i].pArray[k], p1, pbr2, i, -1));
      tree.push(new SplitTree(tree[i].pArray[k],tree[i].ptEnd, p2, pbr, i, -1));
      tree[i].setChild([tree.length-2, tree.length-1]);
      }
   /* else{

      console.log("3.2 but line");
      let vert = false;
      if()

    }*/
  }
    
    
    //}

      
      
    }}
  }
}}



function normVec(a,b){
  let vx = b.x-a.x;
  let vy = b.y-a.y;
  let no = sqrt(vx**2+vy**2);
  return new Point(vx/no, vy/no);
}

function linePoint(a,b,c){
  res = a.x * (b.y - c.y) - a.y * (b.x - c.x) + (b.x * c.y - b.y * c.x);
  if(res == 0){
    return true;
  }
  else return false;
}
function sameLine(a,b){
  if(a.x == b.x || a.y == b.y)
  return true;
  else return false; 
}
 function isVert(a, b){
  if(a.x==b.x)
  return true; 
  else return false;
 }

 function under(a,b,c){
  if(isVert(a,b)){
    if((a.y<=c.y && c.y<=b.y)||(a.y>=c.y && c.y>=b.y) ) return true;
    else return false;
  }
  if((a.x<=c.x && c.x<=b.x)||(a.x>=c.x && c.x>=b.x) ) return true;
    else return false;
 }

function samePoint(a, b){
  if(a.x==b.x && a.y==b.y) return true; else return false;
}

function areaRect(ptArray){
  let area = 0;
  let pA = [ptArray[0], ptArray[1]];
  ptArray.splice(0, 2);
  let minx = ptArray[0].x;
  let mini = 0;
  
  while (ptArray.length >0){
    let minx = ptArray[0].x;
    let mini = 0;
    for(j in ptArray){
      if (ptArray[j].x<minx){
        minx = ptArray[j].x
        mini = j;
      }
    }
    area+=(abs(pA[0].y-pA[1].y)*abs(minx-pA[0].x));
    console.log(area, ptArray[mini], ptArray[mini+1]);
    pA = [ptArray[mini], ptArray[mini+1]];
    ptArray.splice(mini, 2);



  }
  return area;

}

function stp0(){
  noStroke();
  textSize(10);
  text("choose polygon", 300, 150);
  let scale = windowWidth/(3*500);
  createPoly(pt1, points, -250*scale, scale, 100/scale);
    createPoly(pt2, points2,250*scale, scale, 100/scale);
    createPoly(pt3, points3,680*scale ,scale, 100/scale);
    drawPoly(points);
    drawPoly(points2);
    drawPoly(points3);
    if(choose==1){
      points=[];
      createPoly(pt1, points,0, 1, 0);
      points2=[];
      step=1;
      
    }
    else if (choose==2) 

    { points=[];
      points3=[];
      createPoly(pt2, points,0, 1, 0);
      step=1;}
    
    else if(choose ==3){
      points = [];
      points2=[];
      createPoly(pt3, points,0, 1, 0);
      step=1;
    }
    
  
    

}
function mousePressed(){
  console.log("mousePressed", mouseX, mouseY, choose, 2*windowWidth/3);
  
  if(step==0){
    console.log("ste");
    if(mouseX<windowWidth/3 && mouseY>110){
      console.log("mousexx");
      choose=1;
      console.log(choose);
    }
    else if(mouseX>=windowWidth/3 && mouseX<(2*windowWidth/3) && mouseY>110) choose = 2;
    else if(mouseX>=(2*windowWidth/3) && mouseY>110) choose = 3;
  }
}
function drawPoly(pt){
  if(step>0) strokeWeight(2);
  for (i in pt) {
    textSize(10);
    fill("white");
    stroke("black");
    
    if (i > 0) {
      line(pt[i - 1].x, pt[i - 1].y, pt[i].x, pt[i].y);
    }
    fill("white");
    ellipse(pt[i].x, pt[i].y, 4, 4);
  }
}

function drwCurSplit(){
  noStroke();
  fill("black");
  text("Current bridge :", 1000, 150);
  let poxX = abs(tree[sp].ptBeg.x-tree[sp].ptEnd.x);
  let a = min(tree[sp].ptBeg.x, tree[sp].ptEnd.x);
  let displ = 1100 - poxX - a;
  stroke('black');
  strokeWeight(2);
  for(let i=0; i<tree[sp].pArray.length-1; i++){
    line(tree[sp].pArray[i].x + displ,  tree[sp].pArray[i].y, tree[sp].pArray[i+1].x + displ, tree[sp].pArray[i+1].y);

  }
  if(tree[sp].pArray.length>0){
    line(tree[sp].pArray[0].x + displ,  tree[sp].pArray[0].y, tree[sp].ptBeg.x + displ, tree[sp].ptBeg.y);
    line(tree[sp].pArray[tree[sp].pArray.length-1].x + displ,  tree[sp].pArray[tree[sp].pArray.length-1].y, tree[sp].ptEnd.x + displ, tree[sp].ptEnd.y);


  }
  strokeWeight(1);
  fill('red');
  stroke("red");
  ellipse(tree[sp].ptBeg.x + displ, tree[sp].ptBeg.y, 6, 6);
  ellipse(tree[sp].ptEnd.x + displ, tree[sp].ptEnd.y, 6, 6);
  if(tree[sp].ptBridge.x!=0){
    ellipse(tree[sp].ptBridge.x + displ, tree[sp].ptBridge.y, 6, 6);
    line(tree[sp].ptBeg.x + displ,  tree[sp].ptBeg.y, tree[sp].ptBridge.x + displ, tree[sp].ptBridge.y);
    line(tree[sp].ptEnd.x + displ,  tree[sp].ptEnd.y, tree[sp].ptBridge.x + displ, tree[sp].ptBridge.y);
  }
  else{
    line(tree[sp].ptEnd.x + displ,  tree[sp].ptEnd.y, tree[sp].ptBeg.x + displ, tree[sp].ptBeg.y);

  }
  
  fill('green');

}


function areaCalc(){
  pnts=[];

  pnts.push(tree[0].ptBeg);
  for(let i =0; i<tree.length; i++){
    if(tree[i].child==-1){
    
    if(!pnts[pnts.length-1].isEqu(tree[i].ptBeg) && pnts[0]!=tree[i].ptBeg){ 
      
      pnts.push(tree[i].ptBeg);
    }
    if(!pnts[pnts.length-1].isEqu(tree[i].ptBridge) && !pnts[0].isEqu(tree[i].ptBridge))
    { pnts.push(tree[i].ptBridge);
    }
     if(!pnts[pnts.length-1].isEqu(tree[i].ptEnd) && !pnts[0].isEqu(tree[i].ptEnd)){
      pnts.push(tree[i].ptEnd);
     } 
     
  }}
 area = 0;
 bends = 0;
 length = 0;

let oP;
let nP;
console.log(pnts);
for(i=0; i<pnts.length; i++){
    let j = (i+1)%pnts.length; 
    let k = (i+2)%pnts.length;
    oP = pnts[i];
    nP = pnts[j];
    area+=( nP.x * oP.y)-(oP.x * nP.y);
    

    length+=sqrt((pnts[j].x-pnts[i].x)**2 + (pnts[j].y-pnts[i].y)**2);
    
    if(orientDet(pnts[i], pnts[j], pnts[k])!=0) bends++;
    
    
}
area/=2;
}


function getMinX(arr)
    {
        
        let min;
        let minArr;
        let n = arr.length;
        if (n == 1) {
            min = arr[0].x;
            return min;
        }
        if (arr[0].x > arr[1].x) {
            min = arr[1].x;
        } else {
            min = arr[0].x;
        }
 
        for (i = 2; i < n; i++) {
         // console.log(" min",  arr[i].x, min)
          if (arr[i].x < min) {
                min = arr[i].x;
            }
        }

        
        return min;
    }

    function getY(arr, minX){
      let arrY=[]
      for(let i = 0; i<arr.length; i++){
        if(arr[i].x==minX){
          arrY.push([arr[i], i]);
        }
      }
      return arrY;
    }


    function orientDet(a, b, c) {
      res = a.x * (b.y - c.y) - a.y * (b.x - c.x) + (b.x * c.y - b.y * c.x);
      return res;
    }




    function drawRectHull(){
      for(i in tree){
        if(tree[i].child==-1){
          fill('red');
          stroke('red');
          ellipse(tree[i].ptBeg.x,tree[i].ptBeg.y, 4, 4);
          ellipse(tree[i].ptEnd.x,tree[i].ptEnd.y, 4, 4);
          ellipse(tree[i].ptBridge.x,tree[i].ptBridge.y, 4, 4);
          line(tree[i].ptBeg.x,tree[i].ptBeg.y, tree[i].ptBridge.x,tree[i].ptBridge.y);
          line(tree[i].ptEnd.x,tree[i].ptEnd.y, tree[i].ptBridge.x,tree[i].ptBridge.y);
        }
      }
    }

   function calcRecursTree(){
    let posX = 100;
    let posY = 120;
    let it = 0;
    let center;

    
    for(i in tree){
      center = calcCenter(pArray[i]);
      
    }

   }

   function calcCenter(array){
    let minx = array.x[0];
    let maxx = array.x[0];
    let miny = array.y[0];
    let maxy = array.y[0];

    for(i in array){
      if(minx>array.x[i]) minx = array.x[i];
      else if(maxx<array.x[i]) maxx = array.x[i];
      if(miny>array.y[i]) miny = array.y[i];
      else if(maxy<array.y[i]) maxy = array.y[i];
    }
    return new Point((minx+maxx)/2, (miny+maxy)/2);

   }

   function drawArr(array){
    for (let i=0; i<array.length-1; i++){
      line(array[i].x, array[i].y, array[i+1].x, array[i+1].y);
    }
   }