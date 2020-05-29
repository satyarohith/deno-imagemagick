import { opine, opineTypes, join, dirname } from "./deps.ts";
import {
  initializeImageMagick,
  ImageMagick,
  MagickImage,
  MagickFormat,
} from "../mod.ts";
const server = opine.opine();

await initializeImageMagick();

const lenaPath = join(
  dirname(import.meta.url.replace("file://", "")),
  "lena.jpg",
);

const lena = await Deno.readFile(lenaPath);

server.get("/", (req: opineTypes.Request, res: opineTypes.Response) => {
  const { w = 200, radius = 20, sigma = 5 } = req.query
  ImageMagick.read(lena, (img: MagickImage) => {
    img.blur(radius, sigma);
    img.resize(w, w);

    img.write((data) => {
      res.type("jpeg");
      res.send(data);
    }, MagickFormat.Jpeg);
  });
});

server.listen(3000);
