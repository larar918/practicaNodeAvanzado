'use strict';

const { Responder } = require('cote');
const jimp = require('jimp');


main().catch(err => console.log('Hubo un error', err));

async function main() {
  try {

    const responder = new Responder({ name: 'servicio de creación de thumbnails' });

    responder.on('createThumbnail', async (req, done) => {
        try {
            const { imagePath } = req;
            const path = `${__dirname}/thumbnails/thumbnail_${Date.now()}.jpg`;
            
            const thumbnail = await jimp.read(imagePath);
            await thumbnail.resize(100, 100).write(path, (err) => {
                if (err) {
                    console.error('Error al escribir el thumbnail:', err);
                    done();
                } else {
                    console.log('Thumbnail creado con éxito en:', path);
                    done();
                }
            });

          done();

        } catch (error) {
          console.error('Error al crear el thumbnail:', error.message);
          done({ message: err.message });
        }
      });

  } catch (error) {
        console.log('error')
        done({ message: err.message });
  }

}
