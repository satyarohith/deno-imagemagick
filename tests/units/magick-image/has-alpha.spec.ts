/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */
/* Copyright Leonel Vieyra https://github.com/leonelv/deno-imagemagick */

import { describe, it } from "../../utils.ts";
import { expect, TestFiles } from "../../deps.ts";
import { initializeImageMagick } from "../../../lib/image-magick.ts";
import { MagickImage } from "../../../lib/magick-image.ts";

await initializeImageMagick();

let image: MagickImage;

describe("MagickImage#hasAlpha", () => {
  it("should return true when image has alpha channel", async () => {
    image = new MagickImage();
    const data = await Deno.readFile(TestFiles.redPng);
    image.read(data);
    expect(image.hasAlpha).toEqual(true);
    image.dispose();
  });

  it("should should disable the alpha channel", async () => {
    image = new MagickImage();
    const data = await Deno.readFile(TestFiles.redPng);
    image.read(data);
    image.hasAlpha = false;

    expect(image.hasAlpha).toEqual(false);
    image.dispose();
  });
});
