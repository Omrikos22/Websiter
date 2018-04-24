mainApp.factory('CRUDService', function ($http, Upload, $q, $localStorage) {
    return {
        GetPages: function () {
            var deferred = $q.defer();
            $http.get('/GetPages').then(
            function success(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            }, function error(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });
            return deferred.promise;
        },
        GetAllProducts: function () {
            var deferred = $q.defer();
            $http.get('/GetAllProducts').then(
            function success(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            }, function error(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });
            return deferred.promise;
        },
        Login: function (username, password) {
            var deferred = $q.defer();
            $http({method: 'POST', url:'/Login', params: {"username": username, "password": password}}).then(
            function success(data, status, headers, config) {
                $localStorage.currentUser = { username: data.data['username'], token: data.data['token'] };
                deferred.resolve(data, status, headers, config);
            }, function error(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });
            return deferred.promise;
        },
        GetUserDetails: function (username) {
            var deferred = $q.defer();
            $http({method: 'GET', url:'/GetUserDetails', params: {"username": username}}).then(
            function success(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            }, function error(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });
            return deferred.promise;
        },
        UpdateUserDetails: function (username, password, id) {
            var deferred = $q.defer();
            $http({method: 'POST', url:'/UpdateUserDetails', params: {"username": username, "password": password, "id": id}}).then(
            function success(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            }, function error(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });
            return deferred.promise;
        },
         AddContentPage: function (page_name, page_content, page_image) {
            var deferred = $q.defer();
            var fd = new FormData()
            fd.append('file', page_image)
            $http({method: 'POST', headers: {'Content-Type': undefined}, url:'/AddContentPage', data: {"name": page_name, "content": page_content, "image": page_image}, transformRequest: function (data, headersGetter, product_image) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });
                        return formData;
                    }}).then(
            function success(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            }, function error(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });
            return deferred.promise;
        },
        AddProduct: function (product_name, product_content, product_image) {
            var deferred = $q.defer();
            var fd = new FormData()
            fd.append('file', product_image)
            $http({method: 'POST', headers: {'Content-Type': undefined}, url:'/AddProduct', data: {"name": product_name, "content": product_content, "image": product_image}, transformRequest: function (data, headersGetter, product_image) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });
                        return formData;
                    }}).then(
            function success(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            }, function error(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });
            return deferred.promise;
        },
        UpdateProduct: function (product_id, product_content, product_image) {
            var deferred = $q.defer();
            var fd = new FormData()
            fd.append('file', product_image)
            $http({method: 'POST', headers: {'Content-Type': undefined}, url:'/UpdateProduct', data: {"id": product_id, "content": product_content, "image": product_image}, transformRequest: function (data, headersGetter, product_image) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });
                        return formData;
                    }}).then(
            function success(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            }, function error(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });
            return deferred.promise;
        },
        UpdatePageContent: function (page_id, page_content, page_image) {
            var deferred = $q.defer();
            var fd = new FormData()
            fd.append('file', page_image)
            $http({method: 'POST', headers: {'Content-Type': undefined}, url:'/UpdatePageContent', data: {"id": page_id, "content": page_content, "image": page_image}, transformRequest: function (data, headersGetter, page_image) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });
                        return formData;
                    }}).then(
            function success(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            }, function error(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });
            return deferred.promise;
        },
        DeleteProduct: function (id) {
            var deferred = $q.defer();
            $http({method: 'POST', url:'/DeleteProduct', params: {"id": id}}).then(
            function success(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            }, function error(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });
            return deferred.promise;
        },
        DeletePageContent: function (id) {
            var deferred = $q.defer();
            $http({method: 'POST', url:'/DeletePageContent', params: {"id": id}}).then(
            function success(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            }, function error(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });
            return deferred.promise;
        },
        ContactUs: function (name, mail, phone, city, subject, message) {
            var deferred = $q.defer();
            $http({method: 'POST', url:'/ContactUs', params: {"name": name, "mail": mail, "phone": phone, "city": city, "subject": subject, "message": message}}).then(
            function success(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            }, function error(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });
            return deferred.promise;
        },
    }
});