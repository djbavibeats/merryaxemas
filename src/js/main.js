var audio;

window.onfocus = function () {
  var mute = localStorage.getItem("mute") == "true" ? true : false;
  if (!mute) {
    $(".foreground .sound-btn").removeClass("off");
    $(".foreground .sound-btn").addClass("on");
    audio.muted = false;
    audio.play();
  } else {
    $(".foreground .sound-btn").removeClass("on");
    $(".foreground .sound-btn").addClass("off");
    audio.muted = true;
    audio.pause();
    this.audio.currentTime = 0;
  }
};

window.onblur = function () {
  audio.muted = true;
};

$(document).ready(function () {
  // Local storage init
  localStorage.setItem("mute", false);
  // Background sound play
  audio = new Audio("./src/sounds/menu_bg.mp3");
  audio.muted = false;
  audio.loop = true;
  var audioPromise = audio.play();

  if (audioPromise !== undefined) {
    audioPromise
      .then(_ => {
        // Automatic playback started!
        // Show playing UI.
        console.log("end");
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
        console.log(error);
        $(".foreground .sound-btn").removeClass("on");
        $(".foreground .sound-btn").addClass("off");
        localStorage.setItem("mute", true);
        audio.muted = true;
        audio.pause();
        audio.currentTime = 0;

      });
  }

  $(".foreground .play-btn").on("click", function () {
    // window.open(window.location.href.replace(/\/$/, "") + "/levels/");
    let newURL = window.location.href.replace(/\/$/, "").replace("/index.html", "") + "/levels/";
    window.location.href = newURL;
  });
  $(".foreground .playBtn").on("click", function () {
    // window.open(window.location.href.replace(/\/$/, "") + "/levels/");
    let newURL = window.location.href.replace(/\/$/, "").replace("/index.html", "") + "/levels/";
    window.location.href = newURL;
  });


  $(".foreground .sound-btn").on("click", function () {
    let element = $(this);
    if (element.hasClass("on")) {
      element.removeClass("on");
      element.addClass("off");
      audio.muted = true;
      localStorage.setItem("mute", true);
      audio.pause();
      audio.currentTime = 0;
    } else {
      element.removeClass("off");
      element.addClass("on");
      audio.muted = false;
      localStorage.setItem("mute", false);
      audio.play();
    }
  });
});

particlesJS("particles-js", {
  particles: {
    number: {
      value: 400,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "image",
      stroke: {
        width: 3,
        color: "#fff"
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src:
          "http://www.dynamicdigital.us/wp-content/uploads/2013/02/starburst_white_300_drop_2.png",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.7,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: false,
        speed: 20,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: false,
      distance: 50,
      color: "#ffffff",
      opacity: 0.6,
      width: 1
    },
    move: {
      enable: true,
      speed: 5,
      direction: "bottom",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 300,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      onclick: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 150,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 150,
        size: 30,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.2
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});
