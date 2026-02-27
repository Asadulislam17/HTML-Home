
var incr=0;
function reset(){
    var inc=document.getElementById("increment");
    incr=0;
    inc.innerHTML =incr;
}
function incre(){
    var inc=document.getElementById("increment");
    incr++;
    inc.innerHTML =incr;
}
function dec(){
    var inc=document.getElementById("increment");
    if(1<=incr){
        incr--;
    }
    
    inc.innerHTML =incr;
}