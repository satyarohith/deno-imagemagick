/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { describe, it } from "../../utils.ts";
import { expect, TestFiles } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { MagickImage } from "../../../lib/magick-image.ts";

await initializeImageMagick();

describe("MagickImage#read", () => {
  it("should read built-in image", () => {
    const image = new MagickImage();
    image.read("logo:");
    expect(image.width).toEqual(640);
    expect(image.height).toEqual(480);
    image.dispose();
  });

  it("should read image from array", async () => {
    const image = new MagickImage();
    const data = await Deno.readFile(TestFiles.imageMagickJpg);
    image.read(data);
    expect(image.width).toEqual(123);
    expect(image.height).toEqual(118);
    image.dispose();
  });
});
