class Product:
    def __init__(self, db_product_column):
        self.id = db_product_column[0]
        self.name = db_product_column[1]
        self.photo_src = db_product_column[2]
        self.content = db_product_column[3]
