/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from "./image-magick.ts";

export class Quantum {
  static get depth(): number {
    return ImageMagick._api._Quantum_Depth_Get();
  }
}
