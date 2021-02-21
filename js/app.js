const names = [
    'bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dog-duck',
    'dragon',
    'pen',
    'pet-sweep',
    'scissors',
    'shark',
    'sweep',
    'tauntaun',
    'unicorn',
    'usb',
    'water-can',
    'wine-glass',
];

const leftImage = document.getElementById('left-image');
const rightImage = document.getElementById('right-image');
const middleImage = document.getElementById('middle-image');
const imagesSection = document.getElementById('images-section');
const resultsSection = document.getElementById('result-section');
let chances = 25;

function mallProducts(name){
    this.name = name ;
    this.path = `./img/${name}.jpg`
    this.votes = 0;
    this.views = 0;
    
    mallProducts.all.push(this);
}
mallProducts.all = [];
for (let i = 0; i < names.length; i++) {
    new mallProducts(names[i]);
}
function render(){
    console.log( randomNumber(0, mallProducts.all.length - 1),mallProducts.all.length - 1);
    let leftIndex = randomNumber(0, mallProducts.all.length - 1);
    let middleIndex = randomNumber(0, mallProducts.all.length - 1);
    let rightIndex = randomNumber(0, mallProducts.all.length - 1);
    while(leftIndex===middleIndex || middleIndex===rightIndex || leftIndex===rightIndex){
        
        leftIndex = randomNumber(0, mallProducts.all.length - 1);
        middleIndex = randomNumber(0, mallProducts.all.length - 1);
        rightIndex = randomNumber(0, mallProducts.all.length - 1);
    }
    mallProducts.all[leftIndex].views++;
    mallProducts.all[middleIndex].views++;
    mallProducts.all[rightIndex].views++;
    
    leftImage.src = mallProducts.all[leftIndex].path;
    leftImage.title = mallProducts.all[leftIndex].name;
    leftImage.alt = mallProducts.all[leftIndex].name;
    
    middleImage.src = mallProducts.all[middleIndex].path;
    middleImage.title = mallProducts.all[middleIndex].name;
    middleImage.alt = mallProducts.all[middleIndex].name;
    
  rightImage.src = mallProducts.all[rightIndex].path;
  rightImage.title = mallProducts.all[rightIndex].name;
  rightImage.alt = mallProducts.all[rightIndex].name;
}

 imagesSection.addEventListener('click', handleClick);
 function handleClick(event){
     if (event.target.id !== 'images-section') {
         for (let i = 0;  i< mallProducts.all.length; i++) {
             if(mallProducts.all[i].name === event.target.title){

                 mallProducts.all[i].votes++;

                } 
            }
if(chances===0){
    imagesSection.removeEventListener('click',handleClick);
}else{
    chances--
    render()
    const buttonResults = document.getElementById('button');
    buttonResults.addEventListener('click',end);
}
}
}
function end(){
    const ulElement= document.createElement('ul')
    resultsSection.appendChild(ulElement);
    
    for (let i = 0; i < mallProducts.all.length; i++) {
        let liEl = document.createElement('li');
        resultsSection.appendChild(liEl)
        liEl.textContent = `${mallProducts.all[i].name}: view =>${mallProducts.all[i].views}, vote=>${mallProducts.all[i].votes}`
    }
}

    render();


function randomNumber(min, max){
    return Math.floor(Math.random() * (max-min + 1)) + min
}