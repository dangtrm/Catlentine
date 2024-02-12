const content = document.querySelector(".content");
const noBtn = document.querySelector(".no");
const yesBtn = document.querySelector(".yes");
const gif = document.querySelector("#gif");
const gif2 = document.querySelector("#gif2");

let audio;

const contentRect = content.getBoundingClientRect();
const noBtnRect = noBtn.getBoundingClientRect();

let isSoundPlaying = false;
let currentIndex = 0;

const cats = [
  {
    img: "images/orange-cat.gif",
    sound: "sounds/talking-orange-cat.mp3",
  },
  {
    img: "images/sad-cat.gif",
    sound: "sounds/cat-sad.mp3",
    text: "Are you sureeeeeee?",
  },
  {
    img: "images/happy-cat.gif",
    sound: "sounds/cat-happy.mp3",
    text: "Let's go to BBQ chicken!!!!! (Meowww)",
  },
];

let scream = false;
let screamCount = 0;
const catScream = {
  img: "images/cat-scream.gif",
  sound: "sounds/cat-scream.mp3",
  text: "Meowwwww (I'm hungry)",
};

gif.addEventListener("click", () => {
  if (!isSoundPlaying) {
    // Set isSoundPlaying to true to prevent multiple sounds playing simultaneously
    isSoundPlaying = true;

    audio = new Audio(scream ? catScream.sound : cats[currentIndex].sound);

    // Event listener to handle the end of audio playback
    audio.addEventListener("ended", () => {
      // Set isSoundPlaying to false when the audio playback ends
      isSoundPlaying = false;
    });

    // Play the audio
    audio.play();
  }
});

noBtn.addEventListener("click", () => {
  if (audio && !scream) {
    audio.pause();
    isSoundPlaying = false;
  }
  const randomX =
    Math.floor(Math.random() * (contentRect.width - noBtnRect.width)) + 1;
  const randomY =
    Math.floor(Math.random() * (contentRect.height - noBtnRect.height)) + 1;
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
  gif.style.opacity = scream ? "1" : "0";
  scream = true;
  setTimeout(() => {
    gif.src = catScream.img;
    document.querySelector(".text").innerHTML = catScream.text;

    // Fade in the new image
    gif.style.opacity = "1";
  }, 500);
  gif2.style.display = "none";
});

yesBtn.addEventListener("click", () => {
  // Fade out the current image
  if (audio) {
    audio.pause();
    isSoundPlaying = false;
  }
  gif.style.opacity = "0";

  scream = false;
  currentIndex = (currentIndex + 1) % cats.length;
  // Change the image source after the transition ends
  setTimeout(() => {
    
    gif.src = cats[currentIndex].img;

    if (currentIndex > 0) {
      document.querySelector(".text").innerHTML = cats[currentIndex].text;
    }

    // Fade in the new image
    gif.style.opacity = "1";
  }, 500); // Adjust the timeout to match the transition duration

  if (currentIndex === 2) {
    gif2.style.display = "block";
    gif2.addEventListener("click", () => {
      if (audio) {
        audio.pause();
        isSoundPlaying = false;
      }
      if (!isSoundPlaying) {
        // Set isSoundPlaying to true to prevent multiple sounds playing simultaneously
        isSoundPlaying = true;

        audio = new Audio("sounds/cat-dance1.mp3");

        // Event listener to handle the end of audio playback
        audio.addEventListener("ended", () => {
          // Set isSoundPlaying to false when the audio playback ends
          isSoundPlaying = false;
        });

        // Play the audio
        audio.play();
      }
    });
  }

  noBtn.style.left = "initial";
  noBtn.style.top = "initial";
});
