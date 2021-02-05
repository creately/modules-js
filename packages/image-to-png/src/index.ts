import * as bmp from '@vingle/bmp-js';
import { Base64Encode } from 'base64-stream';
const gifFrames = require('gif-frames');
const sharp = require('sharp');
const icoToPng = require('ico-to-png');
const { PNG } = require('pngjs');

/**
 * Image to PNG
 * This service will convert different format of images into
 * PNG format
 *
 * This takes base64 as input and returns base64 PNG image.
 * If unsupport images is provided, it will return an error.
 */
export class ImageToPng {
  /**
   * Convert given image format to png base64.
   * @param image - Image in base64 which needs
   * to be converted to png.
   */
  public async toPNG(image: string): Promise<any> {
    if (image && image.includes('data:image')) {
      let convertedImage = '';
      if (image.includes('/png')) {
        convertedImage = await this.convertInterlaceToPNG(image);
      } else if (image.includes('/gif')) {
        convertedImage = await this.convertGIFtoPNG(image);
      } else if (image.includes('/svg+xml')) {
        convertedImage = await this.convertSVGtoPNG(image);
      } else if (image.includes('/bmp')) {
        convertedImage = await this.convertBMPtoPNG(image);
      } else if (image.includes('/vnd.microsoft.icon') || image.includes('/x-icon')) {
        convertedImage = await this.convertICOtoPNG(image);
      }

      if (convertedImage) {
        return convertedImage;
      } else {
        return Error('Provided image format is not supported.');
      }
    }
    return Error('Provided image is not in base64 format.');
  }

  /**
   * This function converts the SVG base64 image
   * to PNG base64 image.
   * @param image - SVG base64
   * @return - PNG base64
   */
  private async convertSVGtoPNG(image: string) {
    const base64 = image.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');
    const data = await sharp(buffer)
      .png()
      .toBuffer();
    return 'data:image/png;base64,' + Buffer.from(data).toString('base64');
  }

  /**
   * This function converts the bitmap image into PNG.
   * @param image - Bitmap Image Base64
   * @return - PNG base64
   */
  private async convertBMPtoPNG(image: string) {
    const base64 = image.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');
    const bitmap = bmp.decode(buffer, true);
    const svg = Buffer.from(bitmap.data);
    let value = await sharp(svg, {
      raw: {
        width: bitmap.width,
        height: bitmap.height,
        channels: 4,
      },
    })
      .png()
      .toBuffer();
    return 'data:image/png;base64,' + Buffer.from(this.changePNGcolorType(value)).toString('base64');
  }

  /**
   * This function converts the ICO image into PNG.
   * @param image - Bitmap Image Base64
   * @return - PNG base64
   */
  private async convertICOtoPNG(image: string) {
    const base64 = image.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');
    const value = await icoToPng(buffer, 128);
    return 'data:image/png;base64,' + Buffer.from(value).toString('base64');
  }

  /**
   * This function converts the GIF base64 image
   * to PNG base64 image.
   * @param image - GIF base64
   * @returns - PNG base64
   */
  private async convertGIFtoPNG(image: string) {
    const base64 = image.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');
    const stream = await gifFrames({
      url: buffer,
      frames: 0,
      outputType: 'png',
      cumulative: true,
    });
    const png = await this.getPngBase64(stream[0].getImage());
    return 'data:image/png;base64,' + png;
  }

  /**
   * Genereates a base64 representation of the png image.
   * @return Promise which resolves to the base64 string.
   */
  private getPngBase64(image: any): Promise<string> {
    return new Promise<string>(resolve => {
      const stream = image.pipe(new Base64Encode());
      let pngBase64 = '';
      stream.on('data', (chunk: any) => {
        pngBase64 += chunk;
      });
      // TODO: Catch errors
      stream.on('end', () => {
        let buffer = Buffer.from(pngBase64, 'base64');
        resolve(Buffer.from(this.changePNGcolorType(buffer)).toString('base64'));
      });
    });
  }

  /**
   * This function converts PNG Interlaced files to PNG
   * If the PNG is not interlaced 
   * it will return the
   * original PNG image as it is.
   * @param image - PNG base64
   * @returns - PNG base64
   */
  private convertInterlaceToPNG(image: string) {
    try {
      const base64 = image.split(',')[1];
      let buffer = Buffer.from(base64, 'base64');
      const png = PNG.sync.read(buffer);
      if ( png.interlace ) {
        buffer = PNG.sync.write(png, { interlace: false });
      }
      return 'data:image/png;base64,' + Buffer.from(this.changePNGcolorType(buffer)).toString('base64');
    } catch {
      return image;
    }
  }

  /**
   * This function buffer to png and check png color type
   * If color type is not type 2, it will convert to type 2
   * @param buffer image buffer
   */
  private changePNGcolorType(buffer: Buffer) {
    try {
      const png = PNG.sync.read(buffer);
      if ( png.colorType != 2 ) {
        buffer = PNG.sync.write(png, { colorType: 2 });
      }
      return buffer;
    } catch {
      return buffer;
    }
  }
}
