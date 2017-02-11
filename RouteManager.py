from translate import translator
import json
from flask import Flask
from flask import request
from uuid import uuid4
from Fooder.server.Models.Product import Product
from Fooder.server.MysqlAdapter import MysqlAdapter
from flask import send_file
from Fooder.server.Models.Page import Page
from Fooder.server.Models.User import User
from Fooder.server.Utils.RequestsHandlerUtils import RequestHandlerUtils
from Fooder.server.Consts import GET_CONTENT_PAGES_QUERY, GET_PRODUCTS_QUERY, LOGIN_QUERY, GET_USER_DETAILS_QUERY,\
    UPDATE_USER_DETAILS_QUERY, UPDATE_PRODUCT_DETAILS_QUERY, DELETE_PRODUCT_QUERY, INSERT_PRODUCT_DETAILS_QUERY, CONTENT_PAGES_ROOT_PATH, \
    INSERT_CONTENT_PAGE_QUERY

app = Flask(__name__)
db = MysqlAdapter("localhost", "root", "", "Fooder")


class Routes:
    def __init__(self):
        self.is_auth = False
        self.token = None

    @staticmethod
    def index():
        return send_file('static/Pages/Index.HTML')

    @staticmethod
    def get_content_pages():
        results = db.execute_query(GET_CONTENT_PAGES_QUERY)
        return json.dumps([Page(ob).__dict__ for ob in results])

    @staticmethod
    def get_all_products():
        results = db.execute_query(GET_PRODUCTS_QUERY)
        return json.dumps([Product(ob).__dict__ for ob in results])

    def login(self):
        self.is_auth = False
        username = request.args["username"]
        password = request.args["password"]
        results = db.execute_query(LOGIN_QUERY.format(username, password))
        if results:
            self.is_auth = True
            self.token = str(uuid4())
        return json.dumps({'is_auth': self.is_auth, 'username':  username, 'token': self.token})

    @staticmethod
    def get_user_details():
        username = request.args["username"]
        results = db.execute_query(GET_USER_DETAILS_QUERY.format(username))
        try:
            return json.dumps(User(results[0]).__dict__)
        except:
            return json.dumps({"success": False})

    @staticmethod
    def update_user_details():
        username = request.args["username"]
        password = request.args["password"]
        user_id = request.args["id"]
        try:
            db.execute_query(UPDATE_USER_DETAILS_QUERY.format(username, password, user_id))
            return json.dumps({"success": True})
        except:
            return json.dumps({"success": False})

    @staticmethod
    def add_content_page():
        page_name = request.form["name"]
        page_name_english = translator('iw', 'en', page_name)
        page_content = request.form["content"].encode('utf-8')
        page_path = CONTENT_PAGES_ROOT_PATH + page_name_english
        image_file = request.files['image']
        image_filename = image_file.filename
        try:
            RequestHandlerUtils().upload_image(image_file)
            db.execute_query(INSERT_CONTENT_PAGE_QUERY.format(page_name, page_content, page_path, image_filename),
                             commit=True)
            return json.dumps({"success": True})
        except Exception as e:
            return json.dumps({"success": False})

    @staticmethod
    def add_product():
        product_name = request.form["name"].encode('utf-8')
        product_content = request.form["content"].encode('utf-8')
        image_file = request.files['image']
        image_filename = image_file.filename
        try:
            RequestHandlerUtils().upload_image(image_file)
            db.execute_query(INSERT_PRODUCT_DETAILS_QUERY.format(product_name, product_content, image_filename), commit=True)
            return json.dumps({"success": True})
        except Exception as e:
            return json.dumps({"success": False})

    @staticmethod
    def update_product():
        product_id = request.form["id"]
        product_content = request.form["content"].encode('utf-8')
        image_file = request.files['image']
        image_filename = image_file.filename
        try:
            RequestHandlerUtils().upload_image(image_file)
            db.execute_query(UPDATE_PRODUCT_DETAILS_QUERY.format(product_content, image_filename, product_id))
            return json.dumps({"success": True})
        except:
            return json.dumps({"success": False})

    @staticmethod
    def delete_product():
        product_id = request.args["id"]
        try:
            db.execute_query(DELETE_PRODUCT_QUERY.format(product_id), commit=True)
            return json.dumps({"success": True})
        except:
            return json.dumps({"success": False})


def run_server(port):
    app.add_url_rule('/', view_func=Routes().index)
    app.add_url_rule('/GetPages', view_func=Routes().get_content_pages, methods=['POST'])
    app.add_url_rule('/GetAllProducts', view_func=Routes().get_all_products, methods=['POST'])
    app.add_url_rule('/Login', view_func=Routes().login, methods=['POST'])
    app.add_url_rule('/GetUserDetails', view_func=Routes().get_user_details, methods=['POST'])
    app.add_url_rule('/UpdateUserDetails', view_func=Routes().update_user_details, methods=['POST'])
    app.add_url_rule('/AddContentPage', view_func=Routes().add_content_page, methods=['POST'])
    app.add_url_rule('/AddProduct', view_func=Routes().add_product, methods=['POST'])
    app.add_url_rule('/UpdateProduct', view_func=Routes().update_product, methods=['POST'])
    app.add_url_rule('/DeleteProduct', view_func=Routes().delete_product, methods=['POST'])
    app.run(host="0.0.0.0", port=port)