// check if there  is local storage coloroption

let mainColors = localStorage.getItem("color-option");
if(mainColors !== null){
    document.documentElement.style.setProperty('--main--color' , localStorage.getItem("color-option") );
    // remove active class from all collors list item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        //add active class on element on data color === local storage  item
        if(element.dataset.color === mainColors){
            //addd active class
            element.classList.add("active");

        }
    });

}

// check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background-option") ;
//check if random background  local storage isnot empty
if(backgroundLocalItem !== null){
    if(backgroundLocalItem === 'true'){
        backgroundoption = true;
    }else{
        backgroundoption = false;
    }
    // remove active from all spans
    document.querySelectorAll(".random-back span").forEach(element => {
        element.classList.remove("active")
    });
    if(backgroundLocalItem === 'true'){
        document.querySelector(".random-back .yes").classList.add("active");
    }else{
        document.querySelector(".random-back .no").classList.add("active");
    }
}


// Togglespin class on icon
document.querySelector(".toggle-setting .fa-gear").onclick = function (){
    // toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin");
    //toggle class  open on main setting box
    document.querySelector(".setting-box").classList.toggle("open");
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
//loop on all list items
colorsLi.forEach(li => {
    //click on every list items
    li.addEventListener("click" , (e) => {
        //set color on root
        document.documentElement.style.setProperty('--main--color' , e.target.dataset.color);
        //set color on local storage
        localStorage.setItem("color-option", e.target.dataset.color );
        handleactive(e);
    });
});



// random background options
let backgroundoption = true;
//variable to control the interval
let backgroundInterval;
const randomBackEL = document.querySelectorAll(".random-back span");
//loop on all spans
randomBackEL.forEach(span => {
    //click on every span 
    span.addEventListener("click" , (e) => {
        
        handleactive(e);

        if(e.target.dataset.background === 'Yes'){
            backgroundoption = true;
            randomizedImg();
            localStorage.setItem("background_option" , true);
        }else{
            backgroundoption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option" , false);
        }
    });
});

//select landing page element
let landingPage  = document.querySelector(".landing-page") ;
// get array of images
let imgsArray = ["a.jpg" ,"d.jpg", "s.jpg" , "x.jpg", "v.jpg" ] ;
//function to randomized images
function randomizedImg (){
    if(backgroundoption === true){
        backgroundInterval = setInterval(() => {
            //get random number 
            let randomNumber = Math.floor(Math.random() * imgsArray.length );
            // change background image url
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + ' ")' ;
        } , 1000);
    };
};


//select our skills

let ourSkills = document.querySelector(".skills");

window.onscroll = function(){

//skills offset top
let skillsoffsettop = ourSkills.offsetTop;

// skills outer height  
let skillsOuterHeight = ourSkills.offsetHeight;

//window height
let windowHeight = this.innerHeight;

//wondow scroll top
let  windowScrolltop = this.pageYOffset; 

if(windowScrolltop > (skillsoffsettop + skillsOuterHeight - windowHeight)){
        let  allskills = document.querySelectorAll(".skill-box .skill-progress span");

        allskills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    }

};


//create popup with two image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click' , (e) => {

        //create overlay element
        let overlay = document.createElement("div");

        //add class tpo ovelay
        overlay.className = 'popup-overlay';

        //append overlay to  body
        document.body.appendChild(overlay);

        //create  the popup
        let popupBox = document.createElement("div");

        //add class to the popup Box
        popupBox.className = 'popup-box' ;

        
        if(img.alt !== null){

            //create heading
            let imageHeading = document.createElement("h3");

            //create text for heading
            let imageText = document.createTextNode(img.alt);

            //append the text to the heading
            imageHeading.appendChild(imageText);

            //append image heading to the popup box
            popupBox.appendChild(imageHeading);

        }

        //create the image
        let popupimage = document.createElement("img");

        //set image source
        popupimage.src = img.src;

        // add image to popup box
        popupBox.appendChild(popupimage);

        //append popup box yo body
        document.body.appendChild(popupBox);

        //create the close span
        let closebutton = document.createElement("span");
        
        //create the close Button Test
        let closeButtonText = document.createTextNode("X");

        //append Test to closebutton
        closebutton.appendChild(closeButtonText);

        //add class to close button
        closebutton.className = 'closebutton';

        //add close button to thr popup box
        popupBox.appendChild(closebutton);
        

    })

});

//close poppup
document.addEventListener("click" , function (e){

    if(e.target.className == 'closebutton'){

        //REMOVE the current popup
        e.target.parentNode.remove();

        //remove overlay
        document.querySelector(".popup-overlay").remove();
    }

});


//select  all bullets
const allbullets = document.querySelectorAll(".nav-bullets .bullet");
//select all links
const alllinks = document.querySelectorAll(".links a");
function scrollsomewhere (elements){
    elements.forEach(ele => {
        ele.addEventListener("click" , (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth' 
            });
        });
    });
}
scrollsomewhere(allbullets);
scrollsomewhere(alllinks);



//handle active state
function handleactive (ev){
    //remove active class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    //add active class of target
    ev.target.classList.add("active");
}


let bulletspan = document.querySelectorAll(".bullets-option span");

let bulletscontainer = document.querySelector(".nav-bullets") ;

let bulletlocalitem = localStorage.getItem("bullets-option");

if(bulletlocalitem !== null){
    bulletspan.forEach(span => {
        span.classList.remove("active");
    });
    if(bulletlocalitem === 'block'){
        bulletscontainer.style.display = 'block' ;
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        bulletscontainer.style.display = 'none' ;
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletspan.forEach(span => {
    span.addEventListener("click" , (e) => {
        if(span.dataset.display === 'show'){
            bulletscontainer.style.display = 'block' ;
            localStorage.setItem("bullets-option" , 'block');
        }else{
            bulletscontainer.style.display = 'none' ;
            localStorage.setItem("bullets-option" , 'none');
        }
        handleactive(e);
    })
})

//reset buttom

document.querySelector(".reset-options").onclick = function () {
    localStorage.removeItem("bullets-option"); 
    localStorage.removeItem("background-option");  
    localStorage.removeItem("color-option"); 
    window.location.reload();
}


// toogle menu
let tooglebuttom = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

tooglebuttom.onclick = function(e){
    //stop propagation
    e.stopPropagation();
    // toggle class " manu-active" on button
    this.classList.toggle("menu-active");
    // toggle class "open" on links
    tlinks.classList.toggle("open");
}

// click any wher out side the menu and toggle button
document.addEventListener("click" , (e) => {
    if(e.target !== tooglebuttom && e.target !== tlinks){
        //check if menu is open
        if(tlinks.classList.contains("open")){
            tooglebuttom.classList.toggle("menu-active");
            tlinks.classList.toggle("open");
        }
    }
});
// stop propagation on links
tlinks.onclick = function(e){
    e.stopPropagation();
}
