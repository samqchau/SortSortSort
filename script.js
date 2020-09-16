const numberOfArrayItems = 50;
const arrayDiv = document.querySelector('.array');
let array = [];
const sortSelector = document.querySelector('.sort-selector');
let childNodesArray;
let time = 5;


const generateArrayButton = document.querySelector('.generate-array-button');
generateArrayButton.addEventListener('click', generateNewArray);
const testButton = document.querySelector('.test-button');
testButton.addEventListener('click', testing);
const sortButton = document.querySelector('.sort-button');
sortButton.addEventListener('click', sort);
sortButton.disabled = true;

//colors
let red = '#ff0149';//red
let green = '#c0ff01';//green
let purple = '#bb01ff' //purple
let white = 'rgb(256,256,256)';

function testing(){ 
    array = mergeSort(array);
    /*console.log(array);
    childNodesArray.map(function(childNode, index){
        childNode.style.height = `${array[index]}px`;
    });*/
}

function shiftNewElement(){
    let div = document.createElement('div');
    div.classList.add('array-item');
    div.style.height = `200px`;
    arrayDiv.insertBefore(div,arrayDiv.children[3]);
    childNodesArray = arrayDiv.childNodes;
    console.log(childNodesArray);
}

function generateNewArray(){
    
    //this section of code generates 10 descending bars for testing

    // removeAllChildNodes(arrayDiv);
    // childNodesArray = [];
    // array = [];
    // for(let i = 10; i>0; i--){
    //     //generate height value
    //     let num = (i+1)*20;
    //     //create array item div
    //     let div = document.createElement('div');
    //     //array item div height = height value
    //     div.style.height = `${num}px`;
    //     //set class array-item on div
    //     div.classList.add('array-item');
    //     //add height value to array
    //     array.push(num);
    //     //append array item to .array
    //     arrayDiv.appendChild(div);
    //     childNodesArray = arrayDiv.childNodes;
    // }
    // sortButton.disabled = false;

    

    //this section is the actually generatearray function
    //remove all children from .array div
    removeAllChildNodes(arrayDiv);
    childNodesArray = [];
    //empty array
    array = [];

    for(let i = 0; i < numberOfArrayItems; i++){
        //generate height value
        let num = randomNumberInRange(10, 600);
        //create array item div
        let div = document.createElement('div');
        //array item div height = height value
        div.style.height = `${num}px`;
        //set class array-item on div
        div.classList.add('array-item');
        //add height value to array
        array.push(num);
        //append array item to .array
        arrayDiv.appendChild(div);
    }
    childNodesArray = arrayDiv.childNodes;
    childNodesArray = Array.from(childNodesArray);
    sortButton.disabled = false;
    
}

function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function sort(){
    generateArrayButton.disabled = true;
    if(sortSelector.value === 'selection'){
        selectionSort(array);
    }

    if(sortSelector.value === 'bubble'){
        bubbleSort(array);
    }

    if(sortSelector.value === 'insertion'){
        insertionSort(array);
    }

    if(sortSelector.value === 'merge'){
        console.log('merge sort');
    }

    if(sortSelector.value === 'heap'){
        console.log('heap sort');
    }

    if(sortSelector.value === 'quick'){
        console.log('quick sort');
    }
}

function selectionSort(arr){
    sortButton.disabled = true;
    time = 3;
    let animations = [];
    let len = arr.length;
    let temp;


    //for every element in the array
    for(let i = 0; i < len; i++){
        let minIndex = i;
        //turn every bar except the ones we have passed white
        animations.push(function(){
            for(let k = i; k < childNodesArray.length; k++){
                childNodesArray[k].style.backgroundColor = white;
            }
        });

        //turn the ith bar red indicating comparison
        animations.push(function(){childNodesArray[i].style.backgroundColor = red;});
        for(let j = i+1; j < len; j++){
            //turn every jth bar purple indicating it has been passed
            let newMinIndex = minIndex;
            animations.push(function(){childNodesArray[j].style.backgroundColor = purple;});

            if(arr[j] < arr[newMinIndex]){
                if(newMinIndex !== i){                    
                    
                    let colorChange = j;
                    newMinIndex = j;
                    colorChange = j;
                    animations.push(function(){childNodesArray[colorChange].style.backgroundColor = red;});
                }
                //newMinIndex = j;
                minIndex = j;

            }
        }

        if(minIndex !== i){
            for(let i = 0; i < 200; i++){
                animations.push(function(){childNodesArray[minIndex].style.backgroundColor = green;});
            }
            temp = arr[i];            
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }

        //turn the ith bar green indicating it is now correct
        animations.push(function(){
            let tempHeight = childNodesArray[i].offsetHeight;
            childNodesArray[i].style.height = `${arr[i]}px`;
            childNodesArray[minIndex].style.height = `${tempHeight}px`;
            /*
            childNodesArray[i].style.height = `${arr[i]}px`;
            childNodesArray[minIndex].style.height = `${arr[minIndex]}px`;*/
        });
        animations.push(function(){childNodesArray[i].style.backgroundColor = green;});
    }
    animations.push(()=>sortButton.disabled = false);
    animations.push(()=>generateArrayButton.disabled = false);
    animateAnimationsArray(animations);
}

function animateAnimationsArray(animArray) {
    for(let i = 0; i < animArray.length; i++){
        setTimeout(()=>animArray[i](),time*i);
    }
}

function bubbleSort(arr){
    let animations = [];
    let len = arr.length;
    let tempArrSwap;
    let tempChildNodeHeightSwap;
    let k = 0;
    time = 6;

    generateArrayButton.disabled = true;
    sortButton.disabled = true;

    //this for loop tells us how many times to run bubble sort procedure
    for(let i = 0; i < len-1; i++){
        //animations.push(function(){});

        //this loop iterates through the array and swaps the the element if the proceeding element is smaller than the ith element
        for(let j = 0 ; j < len-1-k; j++){
            //color comparison bars here done
            animations.push(function(){
                childNodesArray[j].style.backgroundColor = red;
                childNodesArray[j+1].style.backgroundColor = red;
            });
            if(arr[j+1] < arr[j]){
                //array swap happens here
                
                animations.push(function(){
                    tempChildNodeHeightSwap = childNodesArray[j].style.height;
                    childNodesArray[j].style.height = `${childNodesArray[j+1].style.height}`;
                    childNodesArray[j+1].style.height = `${tempChildNodeHeightSwap}`
                    childNodesArray[j+1].style.backgroundColor = green;
                });

                tempArrSwap = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tempArrSwap;
                
            }
            //color jth bar back to purple
            animations.push(function(){
                childNodesArray[j].style.backgroundColor = purple;
            });

            //check to see if [i+1] === len-1-k, if it is color childNode[i+1] green
            if(j+1 === len-1-k){
                for(let m = 0; m < 50; m++){
                    animations.push(function(){
                        childNodesArray[j+1].style.backgroundColor = green;
                    });
                }

                //color every bar white except the sorted
                let lenMinusK = len-1-k;
                animations.push(function(){
                    for(let q = 0; q < lenMinusK; q++){
                        childNodesArray[q].style.backgroundColor = white;
                    }
                });
            }
        }
        k++;
    }

    /*
    what do we want to animate in bubble sort?
    1. color ith childNode red for comparison
    2. color i+1 childNode red for comparison

    3. if childNode[i+1] is smaller then swap height
    4. color childNode[i] purple
    5. check to see if [i+1] === len-1-k, if it is, color childNode[i+1] green;

    1. color childNode[0] green
    */

   animations.push(function(){
       childNodesArray[0].style.backgroundColor = green;
        sortButton.disabled = false;
        generateArrayButton.disabled = false;
    });
   animateAnimationsArray(animations);
}

function insertionSort(arr){
    /*
        Animations
    */
    let len = arr.length;
    let animations = [];

    time = 30;
    animations.push(function(){
        generateArrayButton.disabled = true;
        sortButton.disabled = true;
    });

    //color 1st bar green
    animations.push(function(){childNodesArray[0].style.backgroundColor = green;});

    //for every element in the array starting at the second because the first is already "sorted"
    for(let i = 1; i < len; i++){
        //remember the current element
        let temp = arr[i];
        //let j = the first sorted element on the right
        let j = i-1;

        //color ith bar red
        for(let o = 0; o < 10; o++){
            animations.push(function(){childNodesArray[i].style.backgroundColor = red;});
        }
        //shrink ith bar
        animations.push(function(){
            childNodesArray[i].style.height = `0px`;
        });
        //color ith bar green
        animations.push(function(){childNodesArray[i].style.backgroundColor = green;});

        //while j >= 0 and the current value is smaller than the jth sorted element starting from the right, elements will copy their left neighbor
        while((j > -1) && (temp < arr[j])){
            arr[j+1] = arr[j];
            j--;
        }

        for(let o = i-1; o > j; o--){
            animations.push(function(){childNodesArray[o].style.backgroundColor = purple;});
        }
        
        //every bar up to and including childNodesArray[i] takes childNodesArray[i-1].style.height
        animations.push(function(){
            for(let m = i; m > j+1; m--){
                childNodesArray[m].style.height = childNodesArray[m-1].style.height;
            }
        });

        //childNodesArray[j+1].style.height = 0;
        animations.push(function(){
            childNodesArray[j+1].style.height = `0px`;
        })
        //color every bar up to childNodesArray[i] green
        animations.push(function(){
            for(let n = 0; n < i; n++){
                childNodesArray[n].style.backgroundColor = green;
            }
        });
        
        //childNodesArray[j+1].style.backgroundColor = red;
        animations.push(function(){
            childNodesArray[j+1].style.backgroundColor = red;
        });
        //childNodesArray[j+1] grow until it is temp value;
        for(let o = 0; o < 10; o++){
            animations.push(function(){
                childNodesArray[j+1].style.height = `${temp}px`;
            });
        }
        
        //childNodesArray.style.backgroundColor = green;
        animations.push(function(){
            childNodesArray[j+1].style.backgroundColor = green;
        });
        //after every element copies their left neighbor, set j+1 to the stored value
        arr[j+1] = temp;
    }

    animations.push(function(){
        childNodesArray[len-1].style.backgroundColor = green;
    });

    animations.push(function(){
        generateArrayButton.disabled = false;
        sortButton.disabled = false;
    });
    animateAnimationsArray(animations);
}

function mergeSort(arr){
    if(arr.length < 2){
        return arr;
    }

    let mid = Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0,mid));
    let right = mergeSort(arr.slice(mid));

    return merge(left,right);
}

function merge(arr1, arr2){
    let result = [];
    while(arr1.length > 0 && arr2.length > 0){
        if(arr1[0] < arr2[0]){
            result.push(arr1.shift());
        } else{
            result.push(arr2.shift());
        }
    }

    let bool = arr1.length;
    if(bool){
        result = result.concat(arr1);
    } else{
        result = result.concat(arr2);
    }
    return result;
}

generateNewArray();
