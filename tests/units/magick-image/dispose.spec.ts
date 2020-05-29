/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */
/* Copyright Leonel Vieyra https://github.com/leonelv/deno-imagemagick */

import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { MagickImage } from "../../../lib/magick-image.ts";

await initializeImageMagick();

describe("MagickImage#dispose", () => {
  it("should dispose the image", () => {
    const image = new MagickImage();
    image.dispose();
    expect(() => {
      image.resize(1, 1);
    }).toThrow("instance is disposed");
  });
});
