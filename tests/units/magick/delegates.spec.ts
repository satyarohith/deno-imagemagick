/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { Magick } from "../../../lib/magick.ts";

await initializeImageMagick();

describe("Magick#delegates", () => {
  it("should return the delegates", () => {
    expect(Magick.delegates).toEqual(
      "freetype heic jng jp2 jpeg lcms png raw tiff webp xml zlib",
    );
  });
});
