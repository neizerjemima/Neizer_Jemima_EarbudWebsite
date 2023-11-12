//Hamburger Menu
(() => {
  (function () {
      "use strict";
      console.log("fired");
  

      let button = document.querySelector("#button");
      let burgerMenu = document.querySelector("#burger-con");

      function hamburgerMenu() {
          burgerMenu.classList.toggle("slide-toggle");
          button.classList.toggle("expanded");
      }

      button.addEventListener("click", hamburgerMenu, false);
  })();
})();

(() => {
  const earbud = document.querySelector("#earbud");
  const hotspots = document.querySelectorAll(".Hotspot");

 const earbudInfo = [
    { 
      text: "Sensitive touch for control and an intelligent 360 Audio. The 360 uses enhanced head tracking making every movement stay in sync. The sound feels more realistic",
      image: "images/touch-id.svg"
    },

    { 
      text: "Fast Charging - Get up to 8 hours of continuous playtime with ANC on and up to 20 hours in the cradle",
      image: "images/battery.svg"
    },

    { 
      text: "Made to feel as good as they sound, with a silicone rubber and cushion plug that molds to your ears",
      image: "images/comfortable-fit.svg"
    },
    
    { 
      text: "Enjoy a  comfortable fit crafted to sit comfortably in your ears - just twist and push options included to get the right fit",
      image: "images/fit.svg"
    },

    { 
      text: "Audio is crisp and clear across all levels with the earbuds getting nicee and loud at top end. Yajbuds ticks every box.",
      image: "images/sound.svg"
    },   

    
  ];

  //Function

  function earbudLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });

    loadearbudInfo();
  }

  function loadearbudInfo() {
    earbudInfo.forEach((_earbudinfo, index) => {
      let selectedHotspot = document.querySelector (`#hotspot-${index + 2}`);

      let earbudText = document.createElement("h3");
      earbudText.textContent = _earbudinfo.text;
      
      let earbudimage = document.createElement("img");
      earbudimage.src = _earbudinfo.image;
      earbudimage.classList.add("earbudImages");

      selectedHotspot.appendChild(earbudText);
      selectedHotspot.appendChild(earbudimage);
    });

    
  }




  function showInfo(e) {
    let selected = document.querySelector(`button[slot="${e.currentTarget.slot}"] > div`);
    gsap.to(selected, 1, { autoAlpha:1});
    console.log ("Mouse enter")
  }

  function hideInfo(e) {
    let selected = document.querySelector(`button[slot="${e.currentTarget.slot}"] > div`);
    gsap.to(selected, 1, { autoAlpha:0});
    console.log ("Mouse left")
  }

  //Event Listener
  earbud.addEventListener("load", earbudLoaded);


  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
  });
})();


//This for the hamburger menu

// In this version, the event listeners use regular functions instead of arrow functions, so the "this" keyword inside the event listeners will refer to the DOM element that triggered the event.

//This is for the slide reveal

(() => {
  let imageCon = document.querySelector("#imageCon"),
    drag = document.querySelector(".image-drag"),
    left = document.querySelector(".image-left"),
    dragging = false,
    min = 0,
    max = imageCon.offsetWidth;

  function onDown() {
    dragging = true;
    console.log("Set to true");
  }

  function onUp() {
    dragging = false;
    console.log("Set to false");
  }

  function onMove(event) {
    // console.log("on move called");
    if (dragging === true) {
      //   console.log("dragging");
      let x = event.clientX - imageCon.getBoundingClientRect().left;
      console.log(x);

      if (x < min) {
        x = min;
      } else if (x>max) {
        x = max-9;
      }

      drag.style.left = x + "px";
      left.style.width = x + "px";
    }
  }

  drag.addEventListener("mousedown", onDown);
  document.body.addEventListener("mouseup", onUp);
  document.body.addEventListener("mousemove", onMove);
})();


//This is for the scroll animation
(() => {
  gsap.registerPlugin(ScrollTrigger);

  const canvas = document.querySelector("#scrollAnim");
  const context = canvas.getContext("2d");
  canvas.width = 1920;
  canvas.height = 1080;
  const frameCount = 714; 
  const images = []; 
  const earbuds = {
      frame: 0,
  };

  //run a for loop to populate our images arrary
  for(let i=0; i<frameCount; i++) 
  {
      //console.log(i)
      const img = new Image();
      img.src = `images/anim/earBuds_1${(i+1).toString().padStart(3,'0')}.jpg`;
      images.push(img);
  }

   gsap.to(earbuds, {
      frame:713,
      snap: "frame",
      scrollTrigger: {
          trigger: ".scrollAnim",
          pin: ".scrollWrap",
          scrub: 1,
          markers: false,
          start: "top top"
      },
      onUpdate: render
  })

  images[0].addEventListener("onload", render());

  function render() {
      context.clearRect(0,0, canvas.width, canvas.height);
      context.drawImage(images[earbuds.frame],0,0);
  }
  //The end of the scroll animation

  //Start of the panel//
  var panels = gsap.utils.toArray(".panel");

panels.pop(); // get rid of the last one (don't need it in the loop)
panels.forEach((panel, i) => {
  let time = gsap.timeline({
    scrollTrigger:{
      trigger: panel,
      start: "bottom bottom",
      pinSpacing: false,
      pin: true,
      scrub: true,
      // set the transformOrigin so that it's in the center vertically of the viewport when the element's bottom hits the bottom of the viewport
      onRefresh: () => gsap.set(panel, {transformOrigin: "center " + (panel.offsetHeight - window.innerHeight / 2) + "px"})
    }
  });
  
  time.fromTo(panel, 1, {y:0, rotate:0, scale:1, opacity:1}, {y:0, rotateX:0, scale:0.5, opacity:0.5}, 0)
    .to(panel, 0.1, {opacity:0})
    
});
})();

