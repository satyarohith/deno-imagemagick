/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { MagickImage } from "../../../lib/magick-image.ts";
import { PixelCollection } from "../../../lib/pixels/pixel-collection.ts";

await initializeImageMagick();

describe("MagickImage#pixels", () => {
  it("should dispose pixel instance", () => {
    const image = new MagickImage();
    image.read("logo:");
    let pixels: PixelCollection | undefined = undefined;
    image.pixels((p) => {
      pixels = p;
    });

    expect(pixels).toBeDefined();
    expect(() => {
      pixels!._instance;
    }).toThrow("instance is disposed");
    image.dispose();
  });
});
