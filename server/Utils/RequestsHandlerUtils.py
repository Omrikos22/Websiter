import os
from Fooder.server.Consts import PRODUCTS_IMAGE_ROOT_DIR


class RequestHandlerUtils:
    def __init__(self):
        pass

    @staticmethod
    def upload_image(image_file):
        image_filename = image_file.filename
        try:
            image_buffer = image_file.read()
            with open(os.path.join(PRODUCTS_IMAGE_ROOT_DIR, image_filename), 'wb') as f:
                f.write(image_buffer)
        except:
            return False
