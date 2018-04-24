import json
import smtplib
from gevent import wsgi
from flask import Flask
from flask import request
from uuid import uuid4
from server.Models.Product import Product
from server.MysqlAdapter import MysqlAdapter
from flask import send_file
from server.Models.Page import Page
from server.Models.User import User
from server.Utils.RequestsHandlerUtils import RequestHandlerUtils
from server.Consts import GET_CONTENT_PAGES_QUERY, GET_PRODUCTS_QUERY, LOGIN_QUERY, GET_USER_DETAILS_QUERY,\
    UPDATE_USER_DETAILS_QUERY, UPDATE_PRODUCT_QUERY, DELETE_PRODUCT_QUERY, INSERT_PRODUCT_QUERY, CONTENT_PAGES_ROOT_PATH, \
    INSERT_CONTENT_PAGE_QUERY, TRANSLATE_RESULTS_INDEX, TRANSLATE_SPECIFIC_RESULT_INDEX, TRANSLATED_WORD_INDEX, \
    UPDATE_CONTENT_PAGE_QUERY, DELETE_PAGE_CONTENT_QUERY, CONTENT_PAGE_TYPE_STRING

app = Flask(__name__)
db = MysqlAdapter("localhost", "root", "Omrikos*22", "Fooder")


class Routes:
    def __init__(self):
        self.is_auth = False
        self.token = None

    @staticmethod
    def index():
        return send_file('static/Pages/Index.html')

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
        page_name = request.form["name"].encode('utf-8')
        #page_name_english = translator('iw', 'en', page_name)[TRANSLATE_RESULTS_INDEX][TRANSLATE_SPECIFIC_RESULT_INDEX][TRANSLATED_WORD_INDEX]
        page_content = request.form["content"].encode('utf-8')
        #page_path = CONTENT_PAGES_ROOT_PATH + page_name_english
        page_path = None
        try:
            if not request.files.__contains__('image'):
                image = request.form['image']
                db.execute_query(INSERT_CONTENT_PAGE_QUERY.format(page_name, page_content, page_path, image))
            else:
                image_file = request.files['image']
                image_filename = image_file.filename
                RequestHandlerUtils().upload_image(image_file, CONTENT_PAGE_TYPE_STRING)
                db.execute_query(INSERT_CONTENT_PAGE_QUERY.format(page_name, page_content, page_path, image_filename))
            return json.dumps({"success": True})
        except Exception as e:
            return json.dumps({"success": False})

    @staticmethod
    def add_product():
        product_name = request.form["name"].encode('utf-8')
        product_content = request.form["content"].encode('utf-8')
        try:
            if not request.files.__contains__('image'):
                image = request.form['image']
                db.execute_query(INSERT_PRODUCT_QUERY.format(product_name, product_content, image))
            else:
                image_file = request.files['image']
                image_filename = image_file.filename
                RequestHandlerUtils().upload_image(image_file)
                db.execute_query(INSERT_PRODUCT_QUERY.format(product_name, product_content, image_filename))
            return json.dumps({"success": True})
        except Exception as e:
            return json.dumps({"success": False})

    @staticmethod
    def update_product():
        product_id = request.form["id"]
        product_content = request.form["content"].encode('utf-8')
        try:
            if not request.files.__contains__('image'):
                image = request.form['image']
                db.execute_query(UPDATE_PRODUCT_QUERY.format(product_content, image, product_id))
            else:
                image_file = request.files['image']
                image_filename = image_file.filename
                RequestHandlerUtils().upload_image(image_file)
                db.execute_query(UPDATE_PRODUCT_QUERY.format(product_content, image_filename, product_id))
            return json.dumps({"success": True})
        except:
            return json.dumps({"success": False})

    @staticmethod
    def update_page_content():
        page_id = request.form["id"]
        page_content = request.form["content"].encode('utf-8')
        try:
            if not request.files.__contains__('image'):
                image = request.form['image']
                db.execute_query(UPDATE_CONTENT_PAGE_QUERY.format(page_content, image, page_id))
            else:
                image_file = request.files['image']
                image_filename = image_file.filename
                RequestHandlerUtils().upload_image(image_file, CONTENT_PAGE_TYPE_STRING)
                db.execute_query(UPDATE_CONTENT_PAGE_QUERY.format(page_content, image_filename, page_id))
            return json.dumps({"success": True})
        except:
            return json.dumps({"success": False})

    @staticmethod
    def delete_product():
        product_id = request.args["id"]
        try:
            db.execute_query(DELETE_PRODUCT_QUERY.format(product_id))
            return json.dumps({"success": True})
        except:
            return json.dumps({"success": False})

    @staticmethod
    def delete_page_content():
        page_content_id = request.args["id"]
        try:
            db.execute_query(DELETE_PAGE_CONTENT_QUERY.format(page_content_id))
            return json.dumps({"success": True})
        except:
            return json.dumps({"success": False})

    @staticmethod
    def contact_us():
        name = request.args["name"]
        mail = request.args["mail"]
        phone = request.args["phone"]
        city = request.args["city"]
        subject = request.args["subject"]
        message = request.args["message"]
        manager_mail = "avrahamfisher@gmail.com"
        try:
            server = smtplib.SMTP('smtp.gmail.com:587')
            server.ehlo()
            server.starttls()
            msg = "\r\n".join([
                "From: user_me@gmail.com",
                "To: user_you@gmail.com",
                "Subject: Just a message",
                "",
                "Why, oh why".format()
            ])
            return json.dumps({"success": True})
        except:
            return json.dumps({"success": False})


def run_server(port):
    app.add_url_rule('/', view_func=Routes().index)
    app.add_url_rule('/GetPages', view_func=Routes().get_content_pages, methods=['GET'])
    app.add_url_rule('/GetAllProducts', view_func=Routes().get_all_products, methods=['GET'])
    app.add_url_rule('/Login', view_func=Routes().login, methods=['POST'])
    app.add_url_rule('/GetUserDetails', view_func=Routes().get_user_details, methods=['GET'])
    app.add_url_rule('/UpdateUserDetails', view_func=Routes().update_user_details, methods=['POST'])
    app.add_url_rule('/AddContentPage', view_func=Routes().add_content_page, methods=['POST'])
    app.add_url_rule('/AddProduct', view_func=Routes().add_product, methods=['POST'])
    app.add_url_rule('/UpdatePageContent', view_func=Routes().update_page_content, methods=['POST'])
    app.add_url_rule('/UpdateProduct', view_func=Routes().update_product, methods=['POST'])
    app.add_url_rule('/DeleteProduct', view_func=Routes().delete_product, methods=['POST'])
    app.add_url_rule('/DeletePageContent', view_func=Routes().delete_page_content, methods=['POST'])
    server = wsgi.WSGIServer(('0.0.0.0', port), app)
    server.serve_forever()
    #app.run(host="0.0.0.0", port=port, threaded=True)