/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */
/* Copyright Leonel Vieyra https://github.com/leonelv/deno-imagemagick */

import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { Magick } from "../../../lib/magick.ts";

await initializeImageMagick();

describe("Magick#supportedFormats", () => {
  it("should return the supported formats", () => {
    const formats = Magick.supportedFormats;

    expect(formats).not.toBeNull();
    expect(formats.length).toEqual(245);
  });
});
