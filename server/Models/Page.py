class Page:
    def __init__(self, db_page_column):
        self.id = db_page_column[0]
        self.name = db_page_column[1]
        self.content = db_page_column[2]
        self.path = db_page_column[3]
        self.photo = db_page_column[4]
        self.permanent = db_page_column[5]
