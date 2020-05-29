/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */
import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { AlphaOption } from "../../../lib/alpha-option.ts";
import { MagickImage } from "../../../lib/magick-image.ts";

await initializeImageMagick();

describe("MagickImage#alpha", () => {
  it("should enable alpha channel", () => {
    let image = new MagickImage();
    image.read("logo:");
    image.alpha(AlphaOption.On);
    expect(image.channelCount).toEqual(5);
    expect(image.hasAlpha).toEqual(true);
    image.dispose();
  });
});
