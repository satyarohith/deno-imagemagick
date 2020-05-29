/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */
/* Copyright Leonel Vieyra https://github.com/leonelv/deno-imagemagick */

import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { Quantum } from "../../../lib/quantum.ts";

await initializeImageMagick();

describe("Quantum#depth", () => {
  it("should return the correct value", () => {
    expect(Quantum.depth).toEqual(8);
  });
});
