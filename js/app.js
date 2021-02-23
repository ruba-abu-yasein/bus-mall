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
const MallProductsNames =[];
const MallProductsVotes =[];
const MallProductsViews =[];
let show=[];
let chances = 25;

function MallProducts(name){
    this.name = name ;
    this.path = `./img/${name}.jpg`
    this.votes = 0;
    this.views = 0;
    
    MallProducts.all.push(this);

    
}

MallProducts.all = [];
console.log(MallProducts.all);
for (let i = 0; i < names.length; i++) {
    new MallProducts(names[i]);
}

function retrieve(){
  
  if(localStorage.length >0) {
    MallProducts.all = JSON.parse(localStorage.getItem('information'));
    
    render();
  }
}


function render(){
    console.log( randomNumber(0, MallProducts.all.length - 1),MallProducts.all.length - 1);
    let leftIndex = randomNumber(0, MallProducts.all.length - 1);
    let middleIndex = randomNumber(0, MallProducts.all.length - 1);
    let rightIndex = randomNumber(0, MallProducts.all.length - 1);
    show.push(leftIndex);
    show.push(middleIndex);
    show.push(rightIndex);
    while(leftIndex===middleIndex || middleIndex===rightIndex || leftIndex===rightIndex || show.includes(leftIndex) || show.includes(middleIndex) || show.includes(rightIndex)){
        leftIndex = randomNumber(0, MallProducts.all.length - 1);
        middleIndex = randomNumber(0, MallProducts.all.length - 1);
        rightIndex = randomNumber(0, MallProducts.all.length - 1);
    }
    show=[],
    show.push(leftIndex);
    show.push(middleIndex);
    show.push(rightIndex);
    console.log(show);
    
    MallProducts.all[leftIndex].views++;
    MallProducts.all[middleIndex].views++;
    MallProducts.all[rightIndex].views++;
    
    leftImage.src = MallProducts.all[leftIndex].path;
    leftImage.title = MallProducts.all[leftIndex].name;
    leftImage.alt = MallProducts.all[leftIndex].name;
    
    middleImage.src = MallProducts.all[middleIndex].path;
    middleImage.title = MallProducts.all[middleIndex].name;
    middleImage.alt = MallProducts.all[middleIndex].name;
    
    rightImage.src = MallProducts.all[rightIndex].path;
    rightImage.title = MallProducts.all[rightIndex].name;
    rightImage.alt = MallProducts.all[rightIndex].name;

   console.log(MallProducts.all);
    localStorage.setItem('information',JSON.stringify(MallProducts.all));

}

imagesSection.addEventListener('click', handleClick);
function handleClick(event){
    if (event.target.id !== 'images-section') {
        for (let i = 0;  i< MallProducts.all.length; i++) {
            if(MallProducts.all[i].name === event.target.title){
                
                MallProducts.all[i].votes++;
                
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
    
    for (let i = 0; i < MallProducts.all.length; i++) {
        let liEl = document.createElement('li');
        resultsSection.appendChild(liEl)
        liEl.textContent = `${MallProducts.all[i].name}: view =>${MallProducts.all[i].views}, vote=>${MallProducts.all[i].votes}`
    }
    for (let i = 0; i < MallProducts.all.length; i++) {
        MallProductsNames.push(MallProducts.all[i].name);
        MallProductsVotes.push(MallProducts.all[i].votes);
        MallProductsViews.push(MallProducts.all[i].views);
        
    }
    
    
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        
        // The data for our dataset
        data: {
            labels:  MallProductsNames,
            datasets: [
                {
                    label: 'product vote',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data:MallProductsVotes,
                },
                {
                    label: 'product view',
                    backgroundColor: 'rgb(25, 99,122)',
                    borderColor: 'rgb(25, 90, 13)',
                    data:MallProductsViews,
                }
            ]
        },
        
        // Configuration options go here
        options: {}
    });
    
    
}
//render();


function randomNumber(min, max){
    return Math.floor(Math.random() * (max-min + 1)) + min
}
retrieve();