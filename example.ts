import {
  ImageMagick,
  initializeImageMagick,
  MagickFormat,
  MagickImage,
} from "./mod.ts";
import { serve } from "https://deno.land/x/sift@0.2.0/mod.ts";
await initializeImageMagick(); // make sure to initialize first!

serve({
  "/": async (request) => {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    if (!url) {
      return new Response("doesn't work - pass url");
    }

    console.time("fetch");
    const image = await fetch(url);
    const bytes = new Uint8Array(await image.arrayBuffer());
    await Deno.writeFile("fetched.jpg", bytes);
    console.timeEnd("fetch");
    return new Promise((resolve, reject) => {
      console.time("resize");
      ImageMagick.read(bytes, (img: MagickImage) => {
        img.resize(200, 200);

        img.write(async (data: Uint8Array) => {
          const respBlob = new Blob([data.buffer]);
          resolve(
            new Response(await respBlob.arrayBuffer(), {
              headers: {
                "content-type": "image/jpeg",
                "content-length": String(respBlob.size),
              },
            }),
          );

          console.timeEnd("resize");
        }, MagickFormat.Jpeg);
      });
    });
  },
});
