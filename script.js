const numberOfArrayItems = 100;
const arrayDiv = document.querySelector('.array');
let array = [];
let animations = [];
const sortSelector = document.querySelector('.sort-selector');
let childNodesArray;
let time;
let auxArray = [];
let numsIndexObj = {};


const generateArrayButton = document.querySelector('.generate-array-button');
generateArrayButton.addEventListener('click', generateNewArray);
//const testButton = document.querySelector('.test-button');
//testButton.addEventListener('click', testing);
const sortButton = document.querySelector('.sort-button');
sortButton.addEventListener('click', sort);
sortButton.disabled = true;

//colors
let red = '#ff0149';//red
let green = '#c0ff01';//green
let purple = '#bb01ff' //purple
let white = 'rgb(256,256,256)';

function testing(){ 
    
}


/*
function shiftNewElement(){
    let div = document.createElement('div');
    div.classList.add('array-item');
    div.style.height = `200px`;
    arrayDiv.insertBefore(div,arrayDiv.children[3]);
    childNodesArray = arrayDiv.childNodes;
    console.log(childNodesArray);
}
*/

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
    auxArray = [];

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
        //add indices to aux array
        auxArray.push(i);
        //append array item to .array
        arrayDiv.appendChild(div);
    }
    //add array and auxArray to numsIndexObj
    numsIndexObj.nums = array;
    numsIndexObj.indexArray = auxArray;
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
        mergeSortHelper();
    }

    if(sortSelector.value === 'heap'){
        console.log('heap sort');
    }

    if(sortSelector.value === 'quick'){
        console.log('quick sort');
    }
}

function animateAnimationsArray(animArray) {
    for(let i = 0; i < animArray.length; i++){
        setTimeout(()=>animArray[i](),time*i);
    }
}

function selectionSort(arr){
    sortButton.disabled = true;
    time = .5;
    animations = [];
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
            for(let i = 0; i < 100; i++){
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

function bubbleSort(arr){
    animations = [];
    let len = arr.length;
    let tempArrSwap;
    let tempChildNodeHeightSwap;
    let k = 0;
    time = .7;

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
    animations = [];
    time = 5;
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

function mergeSort(obj){

    if(obj.nums.length < 2){
        return obj;
    }

    let mid = Math.floor(obj.nums.length/2);

    let leftNums = obj.nums.slice(0,mid);
    let leftIndices = obj.indexArray.slice(0,mid);
    let leftObj = {nums: leftNums, indexArray: leftIndices};

    let rightNums = obj.nums.slice(mid);
    let rightIndices = obj.indexArray.slice(mid);
    let rightObj = {nums: rightNums, indexArray: rightIndices};

    let left = mergeSort(leftObj);
    let right = mergeSort(rightObj);

    return merge(left,right);
}

function merge(arr1, arr2){
    let resultNums = [];
    let resultIndices = [];

    let arr1Nums = arr1.nums;
    let arr2Nums = arr2.nums;
    let arr1Indices = arr1.indexArray;
    let arr2Indices = arr2.indexArray;
    let loopNumber = 0;

    time = 10;

    animations.push(function(){
        for(let i = 0; i < arr2.indexArray.length; i++){
            let index = arr2Indices[i];
            childNodesArray[index].style.backgroundColor = red;
        }
    })

    while(arr1Nums.length > 0 && arr2Nums.length > 0){
        if(arr1Nums[0] < arr2Nums[0]){
            resultNums.push(arr1Nums.shift());
        } else{
            resultNums.push(arr2Nums.shift());
        }

        if(arr1Indices[0] < arr2Indices[0]){
            resultIndices.push(arr1Indices.shift());
        } else{
            resultIndices.push(arr2Indices.shift());            
        }

        let num = resultIndices[loopNumber];
        let height = resultNums[loopNumber];

        animations.push(function(){
            childNodesArray[num].style.height = `${height}px`;
        })

        let heightMap = resultNums.concat(arr1Nums.concat(arr2Nums));
        let indexMap = resultIndices.concat(arr1Indices.concat(arr2Indices));
        animations.push(function(){
            for(let i = 0; i < heightMap.length; i++){
                childNodesArray[indexMap[i]].style.height = `${heightMap[i]}px`;
            }
        })
        loopNumber++;
    }

    let numsBool = arr1Nums.length;
    if(numsBool){
        resultNums = resultNums.concat(arr1Nums);
    } else{
        resultNums = resultNums.concat(arr2Nums);
    }
    let indicesBool = arr1Indices.length;
    if(indicesBool){
        resultIndices = resultIndices.concat(arr1Indices);
    } else{
        resultIndices = resultIndices.concat(arr2Indices);
    }

    animations.push(function(){
        for(let i = 0; i < resultIndices.length; i++){
            let index = resultIndices[i];
            let value = resultNums[i];
            childNodesArray[index].style.height = `${value}px`;
        }
    })


    let result = {nums: resultNums, indexArray: resultIndices};
    return result;
}

function mergeSortHelper(){
    animations = [];
    animations.push(function(){sortButton.disabled = true;});
    animations.push(function(){generateArrayButton.disabled = true;});
    array = mergeSort(numsIndexObj).nums;
    animations.push(function(){
        for(let i = 0; i < childNodesArray.length; i++){
            childNodesArray[i].style.backgroundColor = green;
        }
    })
    animations.push(function(){sortButton.disabled = false;});
    animations.push(function(){generateArrayButton.disabled = false;});
    animateAnimationsArray(animations);
}

generateNewArray();
