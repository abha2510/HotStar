 
 function slideShow(){
  const arr=[
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/8295/1328295-h-b05c8156e59a",
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/old_images/MOVIE/3314/1770003314/1770003314-h",
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/6530/1326530-h-f2a7e4e4e3d6"
  ];
  let i=0;
  let div=document.getElementById("slider");
  let img=document.createElement("img");
 img.src=arr[0];

 div.append(img);
 i=i+1;

 setInterval(function(){
     if(i==3){
      i=0;
     }
     img.src=arr[i];
     i=i+1;
     div.append(img);
 },2000)
}
slideShow();
 
 let id;
 async function searchMovies(){
    let query=document.getElementById("query").value;
    let response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=9328ef1b&s=${query}`);
    let data=await response.json();
    console.log(data.Search)
    appendMovies(data.Search)
}
function constructor(title,poster,year){
  this.title=title;
  this.poster=poster;
  this.year=year;
}
let arr=JSON.parse(localStorage.getItem("details"))||[];

function appendMovies(data){
  if(data==undefined){
    return false
  }
    let data_div=document.getElementById("movies");
    data_div.innerHTML=null;

    data.forEach(function(el){
      let div=document.createElement("div");
      let name=document.createElement("p");
      name.innerHTML=`Name:${el.Title}`;
      let year=document.createElement("p");
      year.innerHTML=`Year:${el.Year}`;
      let img=document.createElement("img");
      img.src=el.Poster;
      let btn=document.createElement("button");
      btn.innerHTML="Get Details";
      btn.id="btn"
      btn.addEventListener("click",function(){
        let obj=new constructor(el.Title,el.Poster,el.Year);
        arr.push(obj)
        localStorage.setItem("details",JSON.stringify(arr));

      })

      div.append(img,name,year,btn);
      data_div.append(div);
    })
}


//---------------debouncing-------------------------


async function search(){
   try{
    let query=document.getElementById("query").value;
    let res=await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=9328ef1b&s=${query}`)

    let data=await res.json();
    let actual_data=data.Search;
    appendMovies(actual_data);


   }catch(err){
    console.log(err)

   }
}

function debouncing(func,delay){
  if(id){
    clearTimeout(id)
  }
  id=setTimeout(function(){
    func();
  },delay)
}