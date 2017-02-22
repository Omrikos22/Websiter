import pymysql


class MysqlAdapter:
    def __init__(self, host, user, password, db):
        self.host = host
        self.user = user
        self.password = password
        self.db = db
        self.connect()
        self.conn = None
        self.cur = None

    def connect(self):
        self.conn = pymysql.connect(host=self.host, user=self.user, password=self.password, db=self.db, charset='utf8')
        self.cur = self.conn.cursor()

    def execute_query(self, query):
        results = []
        try:
            self.cur.execute(query)
            self.conn.commit()
            for row in self.cur.fetchall():
                results.append(row)
        except Exception as e:
            self.connect()
            self.cur.execute(query)
            self.conn.commit()
        return results
