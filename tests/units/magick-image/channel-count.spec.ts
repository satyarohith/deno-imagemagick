/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */
/* Copyright Leonel Vieyra https://github.com/leonelv/deno-imagemagick */

import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { MagickImage } from "../../../lib/magick-image.ts";

await initializeImageMagick();

describe("MagickImage#channelCount", () => {
  it("should return the number of channels", () => {
    const image = new MagickImage();
    image.read("logo:");
    expect(image.channelCount).toEqual(4);
    image.dispose();
  });
});
