class FreezeImages {
  constructor(options = {}) {
    // Set default params
    this.selector = options.selector || "freeze"
    this.imgCls = "ff-img";
    this.canvasCls = "ff-canvas";
    this.hover = (options.hover === true || options.hover === "true") ? true : false;
    this.noCSS = (options.no_css === true || options.hover === "true") ? true : false;
    this.smoothing = (options.smoothing === false) ? false : true;

    // Finds all images with selector class and within elements with the selected class
    //  and creates list
    const imgList = document.querySelectorAll(`img.${this.selector}, .${this.selector} img`);
    this.imgList = imgList;

    // Creates <style> tag for new elements
    if (!this.noCSS) {
      const style = document.createElement('style');
      style.textContent = `
        .ff-container {
          display: flex;
          position: relative;
        }

        .ff-container img,
        .ff-container canvas {
          align-self: start;
        }

        .ff-container.ff-hover:hover canvas.ff-active,
        .ff-inactive {
          position: absolute;
          opacity: 0;
        }

        .ff-container.ff-hover:hover img.ff-inactive {
          position: static;
          opacity: 1;
        }

        .ff-canvas {
          pointer-events: none;
        }
      `;
      document.head.appendChild(style);
    }

    // Loops through all images
    for (const img of this.imgList) {
      // Gives <img> the inactive class, which hides GIF by default
      img.className = `${this.imgCls} ff-inactive`;

      // Creates <canvas> of GIF and copies data of first frame of animation
      const canvas = document.createElement("canvas");
      const imgWidth = img.width || img.naturalWidth;
      const imgHeight = img.height || img.naturalHeight;

      canvas.width = imgWidth;
      canvas.height = imgHeight;
      canvas.className = `${this.canvasCls} ff-active`;
      canvas.getContext('2d').imageSmoothingEnabled = this.smoothing;
      canvas.getContext('2d').drawImage(img, 0, 0, imgWidth, imgHeight);

      // Creates container that will hold both <img> and <canvas>
      const wrapper = document.createElement("div");
      wrapper.className = "ff-container";
      if (this.hover) wrapper.classList.add("ff-hover");

      // Inserts container with <img> and <canvas> where <img> originally was
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
      wrapper.appendChild(canvas);
    }
  }

  start() { // Starts animation
    for (const img of this.imgList) {
      img.className = `${this.imgCls} ff-active`;
      img.nextSibling.className = `${this.canvasCls} ff-inactive`;
    }
  }

  stop() { // Stops animation
    for (const img of this.imgList) {
      img.className = `${this.imgCls} ff-inactive`;
      img.nextSibling.className = `${this.canvasCls} ff-active`;
    }
  }

  toggle() { // Toggles animation based on current state
    for (const img of this.imgList) {
      let imgNewCls = (img.className.includes('ff-inactive')) ? "ff-active" : "ff-inactive";
      let canvasNewCls = (img.className.includes('ff-inactive')) ? "ff-inactive" : "ff-active";

      img.className = `${this.imgCls} ${imgNewCls}`;
      img.nextSibling.className = `${this.canvasCls} ${canvasNewCls}`;
    }
  }
}

export function loadFreeze() {
  const f = new FreezeImages({ selector: "freezeframe", hover: true });

  // When .play-gif is clicked, images will play
  $('.play-gif').on('click', () => f.start());

  // When .stop-gif is clicked, images will pause
  $('.stop-gif').on('click', () => f.stop());

  // When .toggle-gif is clicked, images will play or start depending on its current state
  $('.toggle-gif').on('click', () => f.toggle());
}