/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from "../image-magick.ts";
import { MagickFormat } from "../magick-format.ts";
import { NativeInstance } from "../native-instance.ts";
import { withString } from "../util/string.ts";

/** @internal */
export class NativeMagickSettings extends NativeInstance {
  constructor(settings: MagickSettings) {
    const instance = ImageMagick._api._MagickSettings_Create();
    const disposeMethod = ImageMagick._api._MagickSettings_Dispose;
    super(instance, disposeMethod);

    if (settings._fileName !== undefined) {
      withString(settings._fileName, (filenamePtr) => {
        ImageMagick._api._MagickSettings_SetFileName(
          this._instance,
          filenamePtr,
        );
      });
    }

    if (settings.format !== undefined) {
      withString(settings.format, (formatPtr) => {
        ImageMagick._api._MagickSettings_Format_Set(this._instance, formatPtr);
      });
    }
  }
}

export class MagickSettings {
  /** @internal */
  _fileName?: string;

  format?: MagickFormat;

  /** @internal */
  _use<TReturnType>(
    func: (settings: NativeMagickSettings) => TReturnType,
  ): TReturnType {
    const settings = new NativeMagickSettings(this);
    try {
      return func(settings);
    } finally {
      settings.dispose();
    }
  }
}
