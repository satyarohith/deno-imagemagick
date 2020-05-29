/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { describe, it } from "../../../utils.ts";
import { expect } from "../../../deps.ts";
import {
  initializeImageMagick,
} from "../../../../lib/image-magick.ts";
import { MagickImage } from "../../../../lib/magick-image.ts";
import { PixelCollection } from "../../../../lib/pixels/pixel-collection.ts";

await initializeImageMagick();

describe("PixelCollection#toByteArray", () => {
  it("should return array with the correct size", () => {
    const image = new MagickImage();
    image.read("logo:");
    const pixels = PixelCollection._create(image);
    const data = pixels.toByteArray(0, 0, 2, 3, "rgb");
    expect(data).not.toBeNull();
    expect(data!.length).toEqual(18);
    image.dispose();
    pixels.dispose();
  });
});
