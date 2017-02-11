class User:
    def __init__(self, db_user_column):
        self.id = db_user_column[0]
        self.first_name = db_user_column[1]
        self.last_name = db_user_column[2]
        self.username = db_user_column[3]
        self.password = db_user_column[4]
