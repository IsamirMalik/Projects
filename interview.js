
 async function fecthdata(){

  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  const data = await response.json();  
  
  let user3 = data.map((element,index)=>{
    if(element.userId == 3){
     return(`${element.title}`);

    }  
  }) 

  let count = 0
  for(let ele of user3){
    if(ele != undefined){
      console.log(`photos of userId 3, title : ${ele}`);
      count++
    }
  }
  console.log(count)

}


async function fetchPhotos(){
  const response = await fetch('https://jsonplaceholder.typicode.com/photos')

  const data = await response.json();

  // return data;
  console.log(`Total number of photos across all albums are ${data.length}`)
}

fecthdata()
fetchPhotos();

// console.log(albums)