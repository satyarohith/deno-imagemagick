/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { MagickImage } from "../../../lib/magick-image.ts";

await initializeImageMagick();

describe("MagickImage#constructor", () => {
  it("should set the instance as unitialized", () => {
    const image = new MagickImage();
    expect(() => {
      image.resize(1, 1);
    }).toThrow("no image has been read");
    image.dispose();
  });
});
