/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { MagickImage } from "../../../lib/magick-image.ts";
import { MagickFormat } from "../../../lib/magick-format.ts";

await initializeImageMagick();

describe("MagickImage#write", () => {
  it("should save the image to an array async", async () => {
    const image = new MagickImage();
    image.read("wizard:");
    await image.write(async (data) => {
      expect(data.length).toEqual(80796);
    }, MagickFormat.Jpeg);
    image.dispose();
  });

  it("should save the image to an array", () => {
    const image = new MagickImage();
    image.read("logo:");
    image.write((data) => {
      expect(data.length).toEqual(27398);
    }, MagickFormat.Png);
    image.dispose();
  });
});
