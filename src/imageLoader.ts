import {celm} from "./canvas";

type Data = [number, number, () => void];
const datas: Array<string | Data> = [];

export const images: HTMLImageElement[] = [];

export function loadPrerender(id: number, w: number, h: number, cb: () => void) {
  datas[id] = [w, h, cb];
}

export function loadImageSrc(id: number, dataURL: string) {
  datas[id] = dataURL;
}

export function onload(cb: () => void) {
  let numloaded = 0;
  const imageOnloadCallback = () => {
    ++numloaded;
    if (numloaded === datas.length) {
      cb();
    }
  };
  for (let i = 0; i < datas.length; ++i) {
    const d = datas[i];
    if (!d) {
      images[i] = null;
      ++numloaded;
      continue;
    }
    images[i] = new Image();
    images[i].onload = imageOnloadCallback;
    if (typeof d === "string") {
      images[i].src = d;
    } else {
      celm.width = d[0];
      celm.height = d[1];
      d[2]();
      images[i].src = celm.toDataURL();
    }
  }
}

export const enum ImagesId {
  gunlv1,
  gunlv2,
  gunlv3,
  UFOHit,
  UFO,
  BigHFOHit = UFO + 20,
  BigUFO,  // there are around 10-20 kind of UFO
  earthSurface = BigUFO + 20,
}
