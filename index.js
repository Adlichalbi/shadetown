const sunglassesOptions = {
  models: [
    {
      name: "aviator",
      price: 300,
      thumbImg: "thumb-aviator.png",
      cssClass: "frame-aviator",
    },
    {
      name: "half-frame",
      price: 200,
      thumbImg: "thumb-half-frame.png",
      cssClass: "frame-half",
    },
    {
      name: "round",
      price: 250,
      thumbImg: "thumb-round.png",
      cssClass: "frame-round",
    },
    {
      name: "wayfarer",
      price: 250,
      thumbImg: "thumb-wayfarer.png",
      cssClass: "frame-wayfarer",
    },
  ],
  lenses: [
    {
      color: "sepia",
      price: 20,
      cssClass: "color-sepia",
    },
    {
      color: "rainbow",
      price: 50,
      cssClass: "color-rainbow",
    },
    {
      color: "iridescent",
      price: 30,
      cssClass: "color-iridescent",
    },
  ],
  frames: [
    {
      color: "charcoal",
      price: 0,
      cssClass: "color-charcoal",
    },
    {
      color: "tan",
      price: 0,
      cssClass: "color-tan",
    },
    {
      color: "rose",
      price: 0,
      cssClass: "color-rose",
    },
  ],
};

const sunglasses = {
  model: {
    name: "aviator",
    price: 300,
    thumbImg: "./images/thumb-aviator.png",
    cssClass: "frame-aviator",
  },
  lenses: {
    color: "sepia",
    price: 20,
    cssClass: "color-sepia",
  },
  frame: {
    color: "charcoal",
    price: 0,
    cssClass: "color-charcoal",
  },
};

const productDetailsEl = document.getElementById("productDetails");
const productImage = document.getElementById("productImage");
const productFrames = document.getElementsByClassName("product-image_frame")[0];
const productLenses = document.getElementsByClassName(
  "product-image_lenses"
)[0];

let sunglassesNew = { ...sunglasses };

const setSunglasses = (newSunglasses) => {
  sunglassesNew = { ...newSunglasses };
};

const render = () => {
  const { model, lenses, frame } = sunglassesNew;
  const price = `$${model.price + lenses.price + frame.price}`;

  productDetailsEl.innerHTML = `
    <h1>${model.name}</h1>
    <p>Custom: ${lenses.color} lenses, ${frame.color} frames</p>
    <p>${price}</p>`;

  // Update the image classes
  productImage.classList.replace(productImage.classList[1], model.cssClass);
  productFrames.classList.replace(productFrames.classList[1], frame.cssClass);
  productLenses.classList.replace(productLenses.classList[1], lenses.cssClass);
};

const addHighlight = (clickedItem) => {
  if (clickedItem.classList.contains("product-thumb")) {
    Array.from(document.getElementsByClassName("product-thumb")).forEach(
      (thumb) => thumb.classList.remove("selected")
    );
  } else if (clickedItem.classList.contains("product-color-swatch")) {
    const siblings = clickedItem.closest("ul").querySelectorAll("button");
    Array.from(siblings).forEach((swatch) =>
      swatch.classList.remove("selected")
    );
  }
  clickedItem.classList.add("selected");
};

document.body.addEventListener("click", (event) => {
  const clickedItem = event.target;

  if (clickedItem.classList.contains("product-thumb")) {
    const modelName = clickedItem.dataset.name;
    const modelOptions = sunglassesOptions.models.find(
      (item) => item.name === modelName
    );

    sunglassesNew = {
      ...sunglassesNew,
      model: {
        ...modelOptions,
      },
    };

    addHighlight(clickedItem);
    setSunglasses(sunglassesNew);
    render();
  }

  if (clickedItem.classList.contains("product-color-swatch")) {
    const currColor = clickedItem.dataset.color;

    if (clickedItem.closest("div").classList.contains("product-lenses")) {
      const lensOptions = sunglassesOptions.lenses.find(
        (item) => item.color === currColor
      );

      sunglassesNew = {
        ...sunglassesNew,
        lenses: {
          ...lensOptions,
        },
      };
    } else if (
      clickedItem.closest("div").classList.contains("product-frames")
    ) {
      const frameOptions = sunglassesOptions.frames.find(
        (item) => item.color === currColor
      );

      sunglassesNew = {
        ...sunglassesNew,
        frame: {
          ...frameOptions,
        },
      };
    }

    addHighlight(clickedItem);
    setSunglasses(sunglassesNew);
    render();
  }
});

render();
