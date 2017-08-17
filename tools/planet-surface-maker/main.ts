import {IPlanetSurface} from "../../src/genPlanetSurfaceImageData";
const imageInput = document.getElementById("image-input") as HTMLInputElement;
const sourceImage = document.getElementById("image-file") as HTMLImageElement;

const backgroundColorInput = document.getElementById("background-color") as HTMLInputElement;
const widthInput = document.getElementById("width") as HTMLInputElement;
const heightInput = document.getElementById("height") as HTMLInputElement;

const layerSelectInput = document.getElementById("layer-select") as HTMLSelectElement;
const addLayerButton = document.getElementById("add-layer") as HTMLButtonElement;
const deleteCurrentLayerButton = document.getElementById("del-layer") as HTMLButtonElement;
const numberOfLinesInput = document.getElementById("number-of-lines") as HTMLInputElement;
const layerColorInput = document.getElementById("layer-color") as HTMLInputElement;

const editorCanvas = document.getElementById("editor") as HTMLCanvasElement;

/* tslint:disable prefer-const */
let outputObject: IPlanetSurface = {
  background: "#000000",
  layers: [],
};
/* tslint:enable pre-const */

function updateUI() {
  backgroundColorInput.value = outputObject.background;
  const layerCount = layerSelectInput.children.length;
  if (layerCount < outputObject.layers.length) {
    for (let i = layerCount; i < outputObject.layers.length; ++i) {
      const e = document.createElement("option");
      e.innerHTML = "" + i;
      layerSelectInput.appendChild(e);
    }
  } else {
    for (let i = layerCount; i > outputObject.layers.length; --i) {
      layerSelectInput.removeChild(layerSelectInput.lastChild);
    }
    layerSelectInput.selectedIndex = outputObject.layers.length - 1;
  }

  const layerId = layerSelectInput.selectedIndex;
  if (layerId !== -1) {
    const d = outputObject.layers[layerId];
    numberOfLinesInput.value = "" + d.data.length;
    layerColorInput.value = d.color;
  }
}

function rerender() {
  const ectx = editorCanvas.getContext("2d");
  const w = +widthInput.value;
  const h = +heightInput.value;
  ectx.clearRect(0, 0, w, h);
  ectx.drawImage(sourceImage, 0, 0, w, h);
}

imageInput.onchange = (e: Event) => {
  const file = imageInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    sourceImage.src = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};
sourceImage.onload = rerender;

function onChangeSize() {
  const list = document.getElementsByTagName("canvas");
  /* tslint:disable prefer-for-of */
  for (let i = 0; i < list.length; ++i) {
    list[i].width = +widthInput.value;
    list[i].height = +heightInput.value;
  }
  /* tslint:enable prefer-for-of */
  rerender();
}

widthInput.onchange = heightInput.onchange = onChangeSize;

addLayerButton.onclick = () => {
  outputObject.layers.push({
    color: "#000000",
    data: [[]],
  });
  updateUI();
  layerSelectInput.selectedIndex = outputObject.layers.length - 1;
  console.log(outputObject);
};

deleteCurrentLayerButton.onclick = () => {
  const layerId = layerSelectInput.selectedIndex;
  if (layerId === -1) {
    return;
  }
  outputObject.layers.splice(layerId, 1);
  updateUI();
  console.log(outputObject);
};

// main
document.onreadystatechange = () => {
  onChangeSize();
};
