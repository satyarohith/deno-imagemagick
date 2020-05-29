/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { AlphaOption } from "./alpha-option.ts";
import { Channels } from "./channels.ts";
import { ColorSpace } from "./color-space.ts";
import { Exception } from "./exception/exception.ts";
import { ImageMagick } from "./image-magick.ts";
import { MagickGeometry } from "./types/magick-geometry.ts";
import { MagickFormat } from "./magick-format.ts";
import { MagickSettings } from "./settings/magick-settings.ts";
import { NativeInstance } from "./native-instance.ts";
import { PixelCollection } from "./pixels/pixel-collection.ts";
import { withString } from "./util/string.ts";
import { PixelChannel } from "./pixel-channel.ts";
import { Pointer } from "./pointer/pointer.ts";

export class MagickImage extends NativeInstance {
  private readonly settings: MagickSettings;

  constructor() {
    super(-1, ImageMagick._api._MagickImage_Dispose);
    this.settings = new MagickSettings();
  }

  /** @internal */
  static _use<TReturnType>(
    func: (image: MagickImage) => TReturnType,
  ): TReturnType;
  static _use<TReturnType>(
    func: (image: MagickImage) => Promise<TReturnType>,
  ): Promise<TReturnType>;
  static _use<TReturnType>(
    func: (image: MagickImage) => TReturnType | Promise<TReturnType>,
  ): TReturnType | Promise<TReturnType> {
    const image = new MagickImage();
    try {
      return func(image);
    } finally {
      image.dispose();
    }
  }

  get channelCount(): number {
    return ImageMagick._api._MagickImage_ChannelCount_Get(this._instance);
  }

  get colorSpace(): ColorSpace {
    return Exception.usePointer((exception) => {
      return ImageMagick._api._MagickImage_ColorSpace_Get(
        this._instance,
        exception,
      );
    });
  }

  get depth(): number {
    return ImageMagick._api._MagickImage_Depth_Get(this._instance);
  }
  set depth(value) {
    ImageMagick._api._MagickImage_Depth_Set(this._instance, value);
  }

  get format(): string {
    return ImageMagick._api.UTF8ToString(
      ImageMagick._api._MagickImage_Format_Get(this._instance),
    );
  }
  set format(value) {
    withString(
      value,
      (instance) =>
        ImageMagick._api._MagickImage_Format_Set(this._instance, instance),
    );
  }

  get hasAlpha(): boolean {
    return Exception.usePointer((exception) => {
      return this.toBool(
        ImageMagick._api._MagickImage_HasAlpha_Get(this._instance, exception),
      );
    });
  }
  set hasAlpha(value: boolean) {
    Exception.usePointer((exception) => {
      if (value) {
        this.alpha(AlphaOption.Opaque);
      }

      ImageMagick._api._MagickImage_HasAlpha_Set(
        this._instance,
        this.fromBool(value),
        exception,
      );
    });
  }

  get height(): number {
    return ImageMagick._api._MagickImage_Height_Get(this._instance);
  }

  get width(): number {
    return ImageMagick._api._MagickImage_Width_Get(this._instance);
  }

  alpha(value: AlphaOption): void {
    Exception.usePointer((exception) => {
      ImageMagick._api._MagickImage_SetAlpha(this._instance, value, exception);
    });
  }

  blur(): void;
  blur(channels: Channels): void;
  blur(radius: number, sigma: number): void;
  blur(radius: number, sigma: number, channels: Channels): void;
  blur(
    radiusOrChannel?: number | Channels,
    sigma?: number,
    channels?: Channels,
  ): void {
    let radius = 0;
    const sigmaValue = this.valueOrDefault(sigma, 1);
    let channelsValue = this.valueOrDefault(channels, Channels.Composite);

    if (typeof radiusOrChannel === "number") {
      radius = radiusOrChannel;
    } else if (radiusOrChannel !== undefined) {
      channelsValue = radiusOrChannel;
    }

    Exception.use((exception) => {
      const instance = ImageMagick._api._MagickImage_Blur(
        this._instance,
        radius,
        sigmaValue,
        channelsValue,
        exception.ptr,
      );
      this._setInstance(instance, exception);
    });
  }

  brighntessContrast(
    brighntess: number = 0,
    contrast: number = 0,
    channels?: Channels,
  ): void {
    let channelsValue = this.valueOrDefault(channels, Channels.Composite);

    Exception.use((exception) => {
      const instance = ImageMagick._api._MagickImage_BrightnessContrast(
        this._instance,
        brighntess,
        contrast,
        channelsValue,
        exception.ptr,
      );
      this._setInstance(instance, exception);
    });
  }

  channelOffset(pixelChannel: PixelChannel): number {
    if (
      !ImageMagick._api._MagickImage_HasChannel(this._instance, pixelChannel)
    ) {
      return -1;
    }

    return ImageMagick._api._MagickImage_ChannelOffset(
      this._instance,
      pixelChannel,
    );
  }

  pixels<TReturnType>(
    func: (pixels: PixelCollection) => TReturnType,
  ): TReturnType {
    return PixelCollection._use(this, (pixels) => {
      return func(pixels);
    });
  }

  read(fileName: string): void;
  read(array: Uint8Array): void;
  read(fileNameOrArray: string | Uint8Array): void;
  read(fileNameOrArray: string | Uint8Array): void {
    Exception.use((exception) => {
      if (typeof fileNameOrArray === "string") {
        this.settings._fileName = fileNameOrArray;
        this.settings._use((settings) => {
          const instance = ImageMagick._api._MagickImage_ReadFile(
            settings._instance,
            exception.ptr,
          );
          this.settings._fileName = undefined;
          this._setInstance(instance, exception);
        });
      } else {
        this.settings._use((settings) => {
          const length = fileNameOrArray.byteLength;
          let data = 0;
          try {
            data = ImageMagick._api._malloc(length);
            ImageMagick._api.HEAPU8.set(fileNameOrArray, data);
            const instance = ImageMagick._api._MagickImage_ReadBlob(
              settings._instance,
              data,
              0,
              length,
              exception.ptr,
            );
            this._setInstance(instance, exception);
          } finally {
            if (data !== 0) {
              ImageMagick._api._free(data);
            }
          }
        });
      }
    });
  }

  resize(geometry: MagickGeometry): void;
  resize(width: number, height: number): void;
  resize(widthOrGeometry: number | MagickGeometry, height?: number): void {
    const geometry = typeof widthOrGeometry === "number"
      ? new MagickGeometry(widthOrGeometry, height as number)
      : widthOrGeometry;
    Exception.use((exception) => {
      withString(geometry.toString(), (geometryPtr) => {
        const image = ImageMagick._api._MagickImage_Resize(
          this._instance,
          geometryPtr,
          exception.ptr,
        );
        this._setInstance(image, exception);
      });
    });
  }

  toString = (): string =>
    `${this.format} ${this.width}x${this.height} ${this.depth}-bit ${
    ColorSpace[this.colorSpace]
    }`;

  write(func: (data: Uint8Array) => void, format?: MagickFormat): void;
  write(
    func: (data: Uint8Array) => Promise<void>,
    format?: MagickFormat,
  ): Promise<void>;
  write(
    func: (data: Uint8Array) => void | Promise<void>,
    format?: MagickFormat,
  ): void | Promise<void> {
    let bytes = new Uint8Array();

    Exception.use((exception) => {
      Pointer.use((pointer) => {
        if (format !== undefined) {
          this.settings.format = format;
        }

        this.settings._use((settings) => {
          let data = 0;
          try {
            data = ImageMagick._api._MagickImage_WriteBlob(
              this._instance,
              settings._instance,
              pointer.ptr,
              exception.ptr,
            );
            bytes = ImageMagick._api.HEAPU8.subarray(
              data,
              data + pointer.value,
            );
          } catch {
            if (data !== 0) {
              ImageMagick._api._MagickMemory_Relinquish(data);
            }
          }
        });
      });
    });

    return func(bytes);
  }

  /** @internal */
  protected _instanceNotInitialized(): void {
    throw new Error("no image has been read");
  }

  private fromBool(value: boolean): number {
    return value ? 1 : 0;
  }

  private toBool(value: number): boolean {
    return value === 1;
  }

  private valueOrDefault<TType>(
    value: TType | undefined,
    defaultValue: TType,
  ): TType {
    if (value === undefined) {
      return defaultValue;
    }

    return value;
  }
}
