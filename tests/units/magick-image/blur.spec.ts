/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { describe, it } from "../../utils.ts";
import { expect, pixelColor } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { MagickImage } from "../../../lib/magick-image.ts";
import { Channels } from "../../../lib/channels.ts";

await initializeImageMagick();

let image: MagickImage;

describe("MagickImage#blur", () => {
  it("should change pixels of the image", () => {
    image = new MagickImage();
    image.read("logo:");
    image.blur(5, 5);
    expect(pixelColor(image, 222, 60)).toEqual("#ff6a6a");
    image.dispose();
  });

  it("should only blur the specified channel", () => {
    image = new MagickImage();
    image.read("logo:");
    image.blur(5, 5, Channels.Green);
    expect(pixelColor(image, 222, 60)).toEqual("#ff6a00");
    image.dispose();
  });
});
