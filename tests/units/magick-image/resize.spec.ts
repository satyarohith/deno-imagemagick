/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */
/* Copyright Leonel Vieyra https://github.com/leonelv/deno-imagemagick */

import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { MagickImage } from "../../../lib/magick-image.ts";
import { MagickGeometry } from "../../../lib/types/magick-geometry.ts";

await initializeImageMagick();

describe("MagickImage#resize", () => {
  it("should change the width of the image", () => {
    const image = new MagickImage();
    image.read("logo:");
    image.resize(400, 0);
    expect(image.width).toEqual(400);
    expect(image.height).toEqual(300);
    image.dispose();
  });

  it("should change the height of the image", () => {
    const image = new MagickImage();
    image.read("logo:");
    image.resize(0, 400);
    expect(image.width).toEqual(533);
    expect(image.height).toEqual(400);
    image.dispose();
  });

  it("with geometry should change the width of the image", () => {
    const image = new MagickImage();
    image.read("logo:");
    image.resize(new MagickGeometry(300, 0));
    expect(image.width).toEqual(300);
    expect(image.height).toEqual(225);
    image.dispose();
  });

  it("with geometry should change the height of the image", () => {
    const image = new MagickImage();
    image.read("logo:");
    image.resize(new MagickGeometry(0, 300));
    expect(image.width).toEqual(400);
    expect(image.height).toEqual(300);
    image.dispose();
  });
});
