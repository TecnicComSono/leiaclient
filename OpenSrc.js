(function () {
  "use strict";

  var version = "V2.0.0";

  function OnekoLoad() {
    const GIF_URL =
      "https://cdn.jsdelivr.net/gh/TecnicComSono/Platform-Destroyer-Client/oneko.gif";

    const nekoEl = document.createElement("div");
    let nekoPosX = 32,
      nekoPosY = 32;
    let mousePosX = 0,
      mousePosY = 0;
    let frameCount = 0,
      idleTime = 0;
    let idleAnimation = null,
      idleAnimationFrame = 0;
    const nekoSpeed = 10;

    const spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratch: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    };

    function create() {
      nekoEl.id = "oneko";
      nekoEl.style.width = "32px";
      nekoEl.style.height = "32px";
      nekoEl.style.position = "fixed";
      nekoEl.style.zIndex = "999999";
      nekoEl.style.backgroundImage = `url('${GIF_URL}')`;
      nekoEl.style.imageRendering = "pixelated";
      nekoEl.style.left = "16px";
      nekoEl.style.top = "16px";
      document.body.appendChild(nekoEl);

      document.onmousemove = (event) => {
        mousePosX = event.clientX;
        mousePosY = event.clientY;
      };

      window.onekoInterval = setInterval(frame, 100);
    }

    function setSprite(name, frame) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${
        sprite[1] * 32
      }px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;
      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation == null
      ) {
        idleAnimation = ["sleeping", "scratch"][Math.floor(Math.random() * 2)];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratch":
          setSprite("scratch", idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    create();

    console.log("Oneko cat loaded by marcos10pc");
  }

  function sendToast(text, duration = 5000, gravity = "bottom") {
    Toastify({
      text: text,
      duration: duration,
      gravity: gravity,
      position: "center",
      stopOnFocus: true,
      style: { background: "#000000" },
    }).showToast();
  }

  const playAudio = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  playAudio(
    "https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav"
  );
  OnekoLoad();

  function createToastContainer() {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      container.style.position = "fixed";
      container.style.bottom = "10px";
      container.style.left = "50%";
      container.style.transform = "translateX(-50%)";
      container.style.zIndex = "9999";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "10px";
      container.style.borderRadius = "10px";
      document.body.appendChild(container);
    }
    return container;
  }

  function showToast(message, options = {}) {
    const {
      duration = 3000,
      backgroundColor = "#000000",
      textColor = "#ffffff",
      boxShadow = "0 4px 10px rgba(0, 0, 0, 0.25)",
      icon = "",
      includeNickname = false,
    } = options;

    const container = createToastContainer();

    const toast = document.createElement("div");
    toast.style.padding = "10px 20px";
    toast.style.backgroundColor = backgroundColor;
    toast.style.color = textColor;
    toast.style.boxShadow = boxShadow;
    toast.style.fontFamily = "Arial, sans-serif";
    toast.style.fontSize = "14px";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "10px";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    toast.style.borderRadius = "10px";

    const iconElement = document.createElement("span");
    iconElement.innerHTML = icon;
    iconElement.style.fontSize = "16px";
    iconElement.style.color = textColor;
    toast.appendChild(iconElement);

    const textElement = document.createElement("span");
    textElement.textContent = message;
    toast.appendChild(textElement);

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "1";
    }, 10);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  showToast("Script injetado com sucesso!", {
    icon: "✅",
  });

  showToast("by snow, unknow and titanic.", {
    icon: "❄️",
  });

  (function() {

  const loadingScreen = document.createElement('div');
  loadingScreen.id = 'loadingScreen';
  loadingScreen.style.position = 'fixed';
  loadingScreen.style.top = '0';
  loadingScreen.style.left = '0';
  loadingScreen.style.width = '100vw';
  loadingScreen.style.height = '100vh';
  loadingScreen.style.display = 'flex';
  loadingScreen.style.justifyContent = 'center';
  loadingScreen.style.alignItems = 'center';
  loadingScreen.style.flexDirection = 'column';
  loadingScreen.style.backgroundColor = 'white';
  loadingScreen.style.opacity = '0';
  loadingScreen.style.transition = 'opacity 2s ease';
  loadingScreen.style.zIndex = '9999';
  document.body.appendChild(loadingScreen);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '64');
  svg.setAttribute('height', '67');
  svg.setAttribute('fill', '#57CE78');
  svg.setAttribute('stroke', '#324C5A');
  svg.setAttribute('stroke-width', '6');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.innerHTML = '<path d="M8 58 L56 58 L32 2 Z" />';
  loadingScreen.appendChild(svg);

  const treeTrunk = document.createElement('div');
  treeTrunk.style.width = '12px';
  treeTrunk.style.height = '20px';
  treeTrunk.style.backgroundColor = '#324C5A';
  treeTrunk.style.marginTop = '-10px';
  treeTrunk.style.borderRadius = '4px';
  loadingScreen.appendChild(treeTrunk);

  const snowfall = document.createElement('div');
  snowfall.classList.add('snowfall');
  snowfall.style.width = '100px';
  snowfall.style.height = '70px';
  snowfall.style.position = 'absolute';
  snowfall.style.top = '50%';
  snowfall.style.left = '50%';
  snowfall.style.transform = 'translate(-50%, -80%) rotate(25deg)';
  snowfall.style.animation = 'rotate-snow 5s linear infinite'; 
  loadingScreen.appendChild(snowfall);

  const snowflakes = [];
  for (let i = 0; i < 5; i++) {
    const snow = document.createElement('div');
    snow.classList.add('snow');
    snow.style.width = '15px';
    snow.style.height = '15px';
    snow.style.borderRadius = '50%';
    snow.style.backgroundColor = '#FAFAFA';
    snowflakes.push(snow);
    snowfall.appendChild(snow);
  }

  const text = document.createElement('div');
  text.style.color = '#BDBDBD';
  text.style.marginTop = '20px';
  text.style.fontWeight = '300';
  text.innerText = 'snow.cheats';
  loadingScreen.appendChild(text);

  const style = document.createElement('style');
  style.innerHTML = `
    .snow {
        position: absolute;
        animation: snowfall 3s ease-in-out infinite;
    }

    @keyframes snowfall {
        0% { transform: translate(0px, -100px); opacity: 0.8; }
        50% { transform: translate(100px, 50px); opacity: 1; }
        100% { transform: translate(200px, 100px); opacity: 0; }
    }

    @keyframes rotate-snow {
        0% { transform: translate(-50%, -82%) rotate(0deg); }
        100% { transform: translate(-50%, -82%) rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

    loadingScreen.style.opacity = '1';
  setTimeout(() => {
    loadingScreen.style.opacity = '0'; 
  }, 1500);

  setTimeout(() => {
    document.body.removeChild(loadingScreen);
  }, 4500); 
})();

  var menu = document.createElement("div");
  menu.innerText = "LC";

  menu.style.position = "fixed";
  menu.style.top = "10px";
  menu.style.right = "5px";
  menu.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  menu.style.color = "white";
  menu.style.padding = "5px 10px";
  menu.style.width = "120px";
  menu.style.borderRadius = "5px";
  menu.style.fontSize = "16px";
  menu.style.cursor = "pointer";
  menu.style.fontFamily = "Arial, sans-serif";
  menu.style.zIndex = "9999";
  menu.style.textAlign = "left";
  menu.style.backdropFilter = "blur(2px)";

  var versionText = document.createElement("span");
  versionText.innerText = version;
  versionText.style.fontSize = "8px";
  versionText.style.position = "absolute";
  versionText.style.right = "10px";
  versionText.style.top = "50%";
  versionText.style.transform = "translateY(-50%)";
  versionText.style.color = "white";

  menu.appendChild(versionText);

  var dropdown = document.createElement("div");
  dropdown.style.display = "none";
  dropdown.style.position = "fixed";
  dropdown.style.top = "50px";
  dropdown.style.right = "5px";
  dropdown.style.width = "120px";
  dropdown.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  dropdown.style.borderRadius = "5px";
  dropdown.style.padding = "10px";
  dropdown.style.boxSizing = "border-box";
  dropdown.style.color = "white";
  dropdown.style.backdropFilter = "blur(2px)";
  dropdown.style.zIndex = "9998";

  var notifyLabel = document.createElement("label");
  notifyLabel.style.display = "flex";
  notifyLabel.style.alignItems = "center";
  notifyLabel.style.gap = "5px";
  notifyLabel.style.fontSize = "12px";
  notifyLabel.style.color = "white";
  notifyLabel.style.cursor = "pointer";
  notifyLabel.innerText = "Notificar respostas";

  var notifyCheckbox = document.createElement("input");
  notifyCheckbox.type = "checkbox";
  notifyCheckbox.checked = true;
  notifyCheckbox.style.cursor = "pointer";
  notifyCheckbox.style.width = "15px";
  notifyCheckbox.style.height = "13px";
  notifyCheckbox.style.borderRadius = "3px";
  notifyCheckbox.style.border = "2px solid white";
  notifyCheckbox.style.backgroundColor = "lightgreen";
  notifyCheckbox.style.appearance = "none";
  notifyCheckbox.style.outline = "none";
  notifyCheckbox.style.transition = "background-color 0.3s, border-color 0.3s";

  notifyCheckbox.addEventListener("change", function () {
    if (notifyCheckbox.checked) {
      notifyCheckbox.style.backgroundColor = "lightgreen";
    } else {
      notifyCheckbox.style.backgroundColor = "lightcoral";
    }
  });

  notifyCheckbox.addEventListener("change", () => {
    if (notifyCheckbox.checked) {
      notifyCheckbox.style.backgroundColor = "lightgreen";
      showToast("Resposta: A", {
         icon: "🔺",
      });
    } else {
      notifyCheckbox.style.backgroundColor = "lightgreen";
      showToast("Resposta: B", {
         icon: "🔺",
      });
    }
  });
  notifyLabel.prepend(notifyCheckbox);

  dropdown.appendChild(notifyLabel);

  menu.addEventListener("click", function () {
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  });

  document.body.appendChild(menu);
  document.body.appendChild(dropdown);

  function loadWidgetBot() {
    const script = Object.assign(document.createElement("script"), {
      src: "https://cdn.jsdelivr.net/npm/@widgetbot/crate@3",
      async: true,
      onload: () => {
        const discEmbed = new Crate({
          server: "1296902587861434428",
          channel: "1296954268724756541",
          location: ["bottom", "right"],
          notifications: true,
          indicator: true,
          allChannelNotifications: true,
          defer: false,
          color: "#000000",
        });
        plppdo.on("domChanged", () =>
          window.location.href.includes("leiasp/proffresponse")
            ? discEmbed.show()
            : discEmbed.hide()
        );
      },
    });
    document.body.appendChild(script);
  }

  loadWidgetBot();
})();
