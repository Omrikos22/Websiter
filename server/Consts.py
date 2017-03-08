GET_CONTENT_PAGES_QUERY = "Select * from contentpages"
GET_PRODUCTS_QUERY = "Select * from products"
LOGIN_QUERY = "Select * from users where username='{0}' and password='{1}'"
GET_USER_DETAILS_QUERY = "Select * from users where username='{0}'"
UPDATE_USER_DETAILS_QUERY = "UPDATE users SET username='{0}', password='{1}' WHERE Id='{2}'"
INSERT_CONTENT_PAGE_QUERY = "INSERT INTO contentpages (PageName, PageContent, HtmlPath, PhotoPath) VALUES ('{0}', " \
                            "'{1}', '{2}', '{3}') "
UPDATE_CONTENT_PAGE_QUERY = "UPDATE contentpages SET PageContent='{0}', PhotoPath='{1}' WHERE Id='{2}'"
INSERT_PRODUCT_QUERY = "INSERT INTO products (Name, Content, PhotoPath) VALUES ('{0}', '{1}', '{2}')"
UPDATE_PRODUCT_QUERY = "UPDATE products SET Content='{0}', PhotoPath='{1}' WHERE Id='{2}'"
DELETE_PRODUCT_QUERY = "DELETE FROM products WHERE Id='{0}'"
DELETE_PAGE_CONTENT_QUERY = "DELETE FROM contentpages WHERE Id='{0}'"
PRODUCTS_IMAGE_ROOT_DIR = r"static/images/products"
CONTENT_PAGES_IMAGE_ROOT_DIR = r"static/images/pages"
CONTENT_PAGES_ROOT_PATH = "#/pages/"
TRANSLATE_RESULTS_INDEX = 0
TRANSLATE_SPECIFIC_RESULT_INDEX = 0
TRANSLATED_WORD_INDEX = 0
CONTENT_PAGE_TYPE_STRING = "ContentPage"

