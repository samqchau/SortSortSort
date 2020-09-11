const numberOfArrayItems = 100;
const arrayDiv = document.querySelector('.array');
let array = [];
const sortSelector = document.querySelector('.sort-selector');
let childNodesArray;
let time = 3;


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
    testSelectionSort();
}

function generateNewArray(){
    removeAllChildNodes(arrayDiv);
    childNodesArray = [];
    array = [];
    /*for(let i = 10; i>0; i--){
        //generate height value
        let num = (i+1)*10;
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
        childNodesArray = arrayDiv.childNodes;
    }
    sortButton.disabled = false;*/

    
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
    if(sortSelector.value === 'selection'){
        selectionSort(array);
    }

    if(sortSelector.value === 'bubble'){
        console.log('bubble sort');
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
    //sortButton.disabled = true;
    console.log(arr);
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
    
    for(let i = 0; i < animations.length; i++){
        setTimeout(()=>animations[i](),time*i);
    }
    sortButton.disabled = false;
}
