/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { Magick } from "../../../lib/magick.ts";

await initializeImageMagick();

describe("Magick#features", () => {
  it("should return the correct features", () => {
    expect(Magick.features).toEqual("Cipher");
  });
});
