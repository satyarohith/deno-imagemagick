/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */
/* Copyright Leonel Vieyra https://github.com/leonelv/deno-imagemagick */

import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { MagickImage } from "../../../lib/magick-image.ts";
import { PixelChannel } from "../../../lib/pixel-channel.ts";

await initializeImageMagick();

describe("MagickImage#channelCount", () => {
  it("should return -1 when image does not contain channel", () => {
    const image = new MagickImage();
    image.read("logo:");
    expect(image.channelOffset(PixelChannel.Alpha)).toEqual(-1);
    image.dispose();
  });

  it("should return the index of the channel", () => {
    const image = new MagickImage();
    image.read("logo:");
    expect(image.channelOffset(PixelChannel.Red)).toEqual(0);
    expect(image.channelOffset(PixelChannel.Green)).toEqual(1);
    expect(image.channelOffset(PixelChannel.Blue)).toEqual(2);
    expect(image.channelOffset(PixelChannel.Index)).toEqual(3);
    image.dispose();
  });
});
