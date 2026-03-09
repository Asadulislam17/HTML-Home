
var incr=0;
function reset(){
    var inc=document.getElementById("increment");
    incr=0;
    inc.innerHTML =incr;
    inc.style.backgroundColor="red";
    inc.style.color="white";
}
function incre(){
    var inc=document.getElementById("increment");
    incr++;
    inc.innerHTML =incr;
    inc.style.backgroundColor="red";
    inc.style.color="white";
}
function dec(){
    var inc=document.getElementById("increment");
    if(1<=incr){
        incr--;
    }
    
    inc.innerHTML =incr;
    inc.style.backgroundColor="red";
    inc.style.color="white";
}


//  function student(name,roll,cgpa){
//      this.name=name;
//      this.roll=roll;
//      this.cgpa=cgpa;
//      this.display= function(){
//          console.log(this.name);
//          console.log(this.roll);
//          console.log(this.cgpa);
//      }
     
//  }
//  var student1= new student("Asadul Islam",40,3.88);
//  var student2= new student("Rakibul Islam",14,3.50);
//  student1.display();
//  student2.display();