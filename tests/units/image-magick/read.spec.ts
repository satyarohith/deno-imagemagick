/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { describe, it } from "../../utils.ts";
import { expect, TestFiles } from "../../deps.ts";
import {
  ImageMagick,
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { MagickImage } from "../../../lib/magick-image.ts";

await initializeImageMagick();

describe("ImageMagick#read", () => {
  it("should read built-in image async", async () => {
    await ImageMagick.read("logo:", async (image: MagickImage) => {
      expect(image.width).toEqual(640);
      expect(image.height).toEqual(480);
    });
  });

  it("should read built-in image", () => {
    ImageMagick.read("wizard:", (image) => {
      expect(image.width).toEqual(480);
      expect(image.height).toEqual(640);
    });
  });

  it("should read image from array async", async () => {
    const data = await Deno.readFile(TestFiles.imageMagickJpg);
    await ImageMagick.read(data, (image) => {
      expect(image.width).toEqual(123);
      expect(image.height).toEqual(118);
    });
  });

  it("should read image from array", async () => {
    const data = await Deno.readFile(TestFiles.imageMagickJpg);
    ImageMagick.read(data, (image) => {
      expect(image.width).toEqual(123);
      expect(image.height).toEqual(118);
    });
  });
});
