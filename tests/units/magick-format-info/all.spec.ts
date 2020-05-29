/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { describe, it } from "../../utils.ts";
import { expect } from "../../deps.ts";
import {
  initializeImageMagick,
} from "../../../lib/image-magick.ts";
import { MagickFormat } from "../../../lib/magick-format.ts";
import { MagickFormatInfo } from "../../../lib/magick-format-info.ts";

await initializeImageMagick();

describe("MagickFormatInfo#all", () => {
  it("should have a format for all values", () => {
    MagickFormatInfo.all.forEach((element) => {
      expect(element.format).not.toEqual(MagickFormat.Unknown);
    });
  });

  it("should set all the descriptions", () => {
    MagickFormatInfo.all.forEach((element) => {
      expect(element.description).not.toBeNull();
    });
  });

  it("should set isReadable to the correct value", () => {
    const jpegFormat = MagickFormatInfo.all.find((formatInfo) =>
      formatInfo.format === MagickFormat.Jpeg
    );
    expect(jpegFormat).not.toBeUndefined();
    expect(jpegFormat!.isReadable).toEqual(true);

    const infoFormat = MagickFormatInfo.all.find((formatInfo) =>
      formatInfo.format === MagickFormat.Info
    );
    expect(infoFormat).not.toBeUndefined();
    expect(infoFormat!.isReadable).toEqual(false);
  });

  it("should set isWritable to the correct value", () => {
    const jpegFormat = MagickFormatInfo.all.find((formatInfo) =>
      formatInfo.format === MagickFormat.Jpeg
    );
    expect(jpegFormat).not.toBeUndefined();
    expect(jpegFormat!.isWritable).toEqual(true);

    const dngFormat = MagickFormatInfo.all.find((formatInfo) =>
      formatInfo.format === MagickFormat.Dng
    );
    expect(dngFormat).not.toBeUndefined();
    expect(dngFormat!.isWritable).toEqual(false);
  });
});
