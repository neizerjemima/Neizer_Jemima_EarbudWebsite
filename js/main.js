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