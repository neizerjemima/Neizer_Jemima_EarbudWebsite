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

  const canvas = document.querySelector("#scrollAnim");
  const context = canvas.getContext("2d");
  canvas.width = 1920;
  canvas.height = 1080;
  const frameCount = 425; //how many still frames do we have?
  const images = []; //array to hold all the images

  //object literal, that has a property called frame, and a value

  const earbuds = {
      frame: 0,
  };

  //run a for loop to populate our images arrary
  for(let i=0; i<frameCount; i++) 
  {
      //console.log(i)
      const img = new Image();
      img.src = `images/anim/earbud${(i+1).toString().padStart(4,"0")}.jpg`;
      images.push(img);
  }

  // console.table(images);

  //we are not actually animating a DOM element, but rather an object
  //which contains a frame count, as the user scrolls we increase the
  //value by 1. We tell GreenSock there is a tool of 449 frames to cycle
  //though, so it know when to stop. GreenSock scrolling uses decimals, so
  //we use "snap" to give us whole numbers 1 vs 0.
  gsap.to(earbuds, {
      frame:424,
      snap: "frame",
      scrollTrigger: {
          trigger: "#scrollAnim",
          pin: true,
          scrub: .1,
          markers: true,
          start: "top top"
      },
      onUpdate: render
  })

  images[0].addEventListener("onload", render());

  function render() {
      // console.log(buds.frame);
      context.clearRect(0,0, canvas.width, canvas.height);
      context.drawImage(images[earbuds.frame],0,0);
  }

})();
