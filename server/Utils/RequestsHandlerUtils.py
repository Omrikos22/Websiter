import os
from server.Consts import PRODUCTS_IMAGE_ROOT_DIR, CONTENT_PAGES_IMAGE_ROOT_DIR, CONTENT_PAGE_TYPE_STRING
import cv2


class RequestHandlerUtils:
    def __init__(self):
        pass

    @staticmethod
    def upload_image(image_file, img_type=None):
        if img_type == CONTENT_PAGE_TYPE_STRING:
            image_root_dir = CONTENT_PAGES_IMAGE_ROOT_DIR
        else:
            image_root_dir = PRODUCTS_IMAGE_ROOT_DIR
        image_filename = image_file.filename
        try:
            image_buffer = image_file.read()
            image = cv2.imread(image_buffer)
            cv2.imwrite(os.path.join(image_root_dir, image_filename), image)
        except:
            return False
