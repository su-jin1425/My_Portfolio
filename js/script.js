gsap.registerPlugin(Draggable);
gsap.registerPlugin(ScrollTrigger);

var timelineSquare1 = gsap
  .timeline({ repeat: -1 })
  .to(".square1", {
    top: "50px",
    left: "0px",
    duration: 0.5,
    ease: "power1.inOut",
  })
  .to(".square1", {
    left: "50px",
    duration: 0.5,
    ease: "power1.inOut",
  });

var timelineSquare4 = gsap
  .timeline({ repeat: -1 })
  .to(".square4", {
    bottom: "50px",
    right: "0px",
    duration: 0.5,
    ease: "power1.inOut",
  })
  .to(".square4", {
    right: "50px",
    duration: 0.5,
    ease: "power1.inOut",
  });

var startTime = Date.now();

$(window).on("load", function () {
  var elapsedTime = Date.now() - startTime;
  var delay = Math.max(0, 1000 - elapsedTime);

  setTimeout(function () {
    gsap.to(".loader", {
      duration: 0.5,
      opacity: 0,
      onComplete: function () {
        timelineSquare1.kill();
        timelineSquare4.kill();
        $(".loader").css("display", "none");
      },
    });

    gsap.to("body", {
      duration: 0.5,
      opacity: 1,
    });
  }, delay);
});

document.addEventListener("DOMContentLoaded", function () {
  function sliderAnim() {
    var tween = gsap.to(".slider_text", {
      xPercent: -200,
      repeat: -1,
      duration: 10,
      ease: "linear",
    });

    gsap.set(".slider", { xPercent: 0 });

    document.querySelectorAll(".download").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        tween.pause();
      });

      element.addEventListener("mouseleave", () => {
        tween.resume();
      });
    });
  }
  sliderAnim();

  function containerAnim() {
    Draggable.create(".shape_1, .shape_3, .shape_5, .shape_7", {
      bounds: ".shape_container",
    });
    Draggable.create(".shape_2, .shape_8", {
      type: "rotation",
    });
    Draggable.create(".shape_4", {
      type: "x",
      bounds: ".shape_container",
    });
    Draggable.create(".shape_6", {
      type: "y",
      bounds: ".shape_container",
    });
  }
  containerAnim();

  function btnAnim() {
    const container = document.querySelector(".line_btn_container");
    const line = document.querySelector(".btn_line");
    const moveDistance = line.offsetWidth + 40;

    const tween = gsap.to(".btn_line", {
      x: () => -moveDistance + "px",
      repeat: -1,
      duration: 30,
      ease: "linear",
    });

    container.addEventListener("mouseenter", () => {
      tween.pause();
    });

    container.addEventListener("mouseleave", () => {
      tween.resume();
    });

    gsap.set(container, { xPercent: 0 });
  }
  btnAnim();

  function attachScrollAnimation(selector, targetY, offsetY = 120) {
    document.querySelectorAll(selector).forEach((element) => {
      element.onclick = () =>
        gsap.to(window, {
          duration: 0.6,
          scrollTo: { y: targetY, offsetY: offsetY },
        });
    });
  }

  attachScrollAnimation(".target_about", "#");
  attachScrollAnimation(".target_project", "#");
  attachScrollAnimation(".target_contact", "#");
  attachScrollAnimation(".scroll_text", "#");
  attachScrollAnimation(".logo", 0, 0);

  const themeToggleButtons = document.querySelectorAll(".theme_btn");
  const loader = document.querySelector(".loader");
  const logos = document.querySelectorAll(".logo img");

  const timelineSquare1 = gsap.timeline({ paused: true });
  const timelineSquare4 = gsap.timeline({ paused: true });

  themeToggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      loader.style.display = "block";
      gsap.to(loader, {
        duration: 0.5,
        opacity: 1,
        onStart: function () {
          timelineSquare1.restart();
          timelineSquare4.restart();
        },
      });

      setTimeout(() => {
        if (document.documentElement.getAttribute("data-theme") === "dark") {
          document.documentElement.removeAttribute("data-theme");
          logos.forEach((logo) => {
            logo.src = "images/apple.svg";
          });
        } else {
          document.documentElement.setAttribute("data-theme", "dark");
          logos.forEach((logo) => {
            logo.src = "images/android.svg";
          });
        }

        setTimeout(() => {
          gsap.to(loader, {
            duration: 0.5,
            opacity: 0,
            onComplete: function () {
              loader.style.display = "none";
              timelineSquare1.pause();
              timelineSquare4.pause();
            },
          });
        }, 500);
      }, 500);
    });
  });

  document.querySelectorAll(".download").forEach((element) => {
    element.addEventListener("click", () => {
      gsap.to(element, {
        duration: 0.2,
        opacity: 0,
        onComplete: () => {
          element.style.display = "none";
        },
      });
    });
  });

  gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

  let xTo = gsap.quickTo(".cursor", "x", { duration: 0.6, ease: "power3" }),
    yTo = gsap.quickTo(".cursor", "y", { duration: 0.6, ease: "power3" });

  window.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  const spanContainers = document.querySelectorAll(".link");

  spanContainers.forEach((item) => {
    const s1 = item.querySelector(".s1 span");
    const s2 = item.querySelector(".s2 span");

    if (s1 && s2) {
      const letters1 = s1.textContent.split("");
      const letters2 = s2.textContent.split("");

      s1.innerHTML = "";
      s2.innerHTML = "";

      letters1.forEach((el, index) => {
        s1.innerHTML += `<span style="transition-delay: ${
          0.07 * index
        }s">${el}</span>`;
      });

      letters2.forEach((el, index) => {
        s2.innerHTML += `<span style="transition-delay: ${
          0.07 * index
        }s">${el}</span>`;
      });
    }
  });

  gsap.delayedCall(1.5, function () {
    const elements = document.querySelectorAll(".s2_title");
    const goofyLines = document.querySelectorAll(".goofy_line");

    elements.forEach(function (element, index) {
      setTimeout(function () {
        if (index === elements.length - 1) {
          goofyLines.forEach(function (goofyLine, goofyIndex) {
            setTimeout(function () {
              goofyLine.classList.add("goofy_line_expend");
            }, goofyIndex * 500);

            if (goofyIndex === goofyLines.length - 1) {
              setTimeout(function () {
                element.classList.add("s2_title_slide");
              }, 800); 
            }
          });
        } else {
          element.classList.add("s2_title_slide");
        }
      }, index * 300); 
    });
  });

  const burgerMenu = document.querySelector(".burger_menu");
  const burgerSlider = document.querySelector(".burger_slider");

  burgerMenu.addEventListener("click", () => {
    if (burgerSlider.classList.contains("sliding_burger")) {
      burgerSlider.classList.remove("sliding_burger");
      burgerMenu.classList.remove("burger_rotate");
    } else {
      burgerSlider.classList.add("sliding_burger");
      burgerMenu.classList.add("burger_rotate");
    }
  });
  
  gsap.to(".about_title_2", {
    duration: 0.6,
    top: "0%",
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".about",
      start: "top center",
      end: "top center",
    },
  });
});
