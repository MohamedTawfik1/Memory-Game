//initializing four arrays  
/* ----------------------------------------------------------------------------------------- */
//An array that holds the values of the game(the cards)
 let memory_arr = ['guess', 'guess', 'how', 'how', 'Lovely', 'Lovely', 'is', 'is',
            'html', 'html', 'css', 'css', 'and', 'and', 'Js', 'Js']; 
/* ----------------------------------------------------------------------------------------- */
//An empty array, to store the memory values 
let memory_values = []; 

//Another empty array stores the card's ID 
let memory_tile_id = []; 

//initialzing an arr to keep track of how many cards have been flipped 
let tile_flipped = 0; 
/* -------------------------------------------------------------------------------------------- */
/*adding a shuffle method to the array, 
EXPLINATION: Because by default arraies don't have shuffle method that we can easlily access*/
// this is to shuffle all the cards at any time we need it to within the program
// prototype helps to associate a new method of a class  
/* -------------------------------------------------------------------------------------------- */
 Array.prototype.memory_card_shuffle = function () {
/* --------------------------------------------------------------------------------------------- */
// creating a varible (i and j) that our loop is going to req
// keyword (this) is our memory_arr, 
//j is going to repersent our random number each time the loop passes 
// temp is going to hold on the temp value to do the swapping 
    let i = this.length, j, temp;
//--i is to decremant the array's length  
    while (--i > 0) { 
// math.floor returns the largest integer less then or = to a given number
// math.random to generate random value in different ranges(in our memory_arr[])
        j = Math.floor(Math.random() * (i + 1)); // generate a random number between 0 and i 
        // these lines do the swapping 
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
} 
/* ----------------------------------------------------------------------------------------------------- */
//adding a function for generating a new memory board
function newBoard() {
    tile_flipped = 0;
    let outPut = ''; 
// this is the line whenever we like to shuffle this array 
    memory_arr.memory_card_shuffle();
    //runing a for loop over the length of the arr 
    for (let i = 0; i < memory_arr.length; i++) {
        //this creates litile cards, with ids and class adddbackG img if onclick it runs on the if statement 
        // when we click on the img the memoryFlipCard is called
        outPut += '<div id="card_'+i+' " class=addbackGroung onclick="memoryFlipCard(this, \''+memory_arr[i]+'\') "></div>';
   }
   document.getElementById('memory_board').innerHTML = outPut;
}
function memoryFlipCard(theCard, val) {
    if (theCard.innerHTML == "" && memory_values.length < 2) {
        theCard.style.backgroundColor = '#FFF';
        // we're removing the the class addbackGround img, 
        theCard.classList.remove("addbackGroung");
        theCard.innerHTML = val;
        if (memory_values.length == 0) {
            memory_values.push(val);
            let id = theCard.getAttribute('id');   
            memory_tile_id.push(id);
        } else if (memory_values.length == 1) {
            memory_values.push(val);
            let id = theCard.getAttribute('id');
            memory_tile_id.push(id);
            if (memory_values[0] == memory_values[1]) {
                tile_flipped += 2; 
                //clear both arrays
                memory_values = [];
                memory_tile_id = []; 
                //check to see if the whole board is cleared to print out an alert 
                if (tile_flipped == memory_arr.length) {
                    alert("YOU HAVE MATCHED ALL THE CARD IN THE GAME ");
                    //set a timeout to start a new game 
                    setTimeout(function(){
                        document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                    }, 10000);
                    
                    }
                } else {
                    //this is a new function to flipe back the 
                    console.log(memory_tile_id);
                    function flippedToBack() { 

                        //this is to flipp the card back over
                       let cardNum1 = document.getElementById(memory_tile_id[0]);
                        let cardNum2 = document.getElementById(memory_tile_id[1]); 
                        
                        // adding the img to the card after being compaered 
                        cardNum1.classList.add("addbackGroung"); 
                         cardNum1.innerHTML="";

                         cardNum2.classList.add("addbackGroung");
                         cardNum2.innerHTML="";
                        
                         
                         memory_values = [];
                        memory_tile_id = [];
                    }
                    setTimeout(flippedToBack, 500);
                }
            }
        }
    }
 
