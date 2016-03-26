"use strict";
const Memcached = require("memcached"),
    Q = require("q");
let client = new Memcached("127.0.0.1:11211");
module.exports = {
    /**
     * Получает значение по заданному ключу
     * @example curl -v -X GET "http://127.0.0.1:8081/memcached/bar"
     * @param next
     */
    getAction: function * (next){
     let key = this.params.key;
        try{
     this.body = yield new Promise(function(resolve,reject){
         client.get(key, function(err, data){
             if (err) {
                 reject(err)}
             resolve(data);
         });
     });
        }catch(e){
            this.status = 400;
            this.body = {message: "Bad Request"};
        }
     yield next;
    },

    /**
     * Модифицирует значение по заданному ключу
     * @example curl -v -X PUT "http://127.0.0.1:8081/memcached/key" -d '{"key":"bar","value":"new foo","expires":60}' -H "Content-Type: application/json"
     * @param next
     */
    putAction: function * (next){
         function put(key, value, expires){
             return new Promise(function(resolve, reject){
                 client.replace(key, value, expires, function(err, data){
                   if (err){reject(err);
                   } else {resolve(data);}

                                                                        });
                                                        });
                                            }
        try{
            this.status = yield put(this.request.body.key, this.request.body.value, this.request.body.expires).then(
                function (){
                    return 200;
                },
                function (){
                    return 304;
                }
            );
            this.body = this.request.body;
        }catch(e){
            this.body = {message: "Error " + e};
        }
        yield next;
    },

    /**
     * Устанаваливает значение по заданному ключу
     *
     * @example curl -v -X POST "http://127.0.0.1:8081/memcached/key " -d '{"key":"bar","value":"foo","expires":360}' -H "Content-Type: application/json"
     * @param next
     */
    postAction: function * (next){
        try{
            yield Q.npost(client, "set", [this.request.body.key, this.request.body.value, this.request.body.expires]);
            this.status = 201;
            this.body = this.request.body;
        }catch(e){
            this.status = 400;
            this.body = {message: "Bad Request"};
        }
        yield next;
    },

    /**
     * Удаляет значение по заданному ключу
     *
     * @example curl -v -X DELETE "http://127.0.0.1:8081/memcached/key" -d '{"key":"bar"}' -H "Content-Type: application/json"
     * @param next
     */
    deleteAction: function * (next){
        function deleteItem(key){
            return new Promise(function(resolve, reject){
                client.delete(key, function(err, data){
                    if (err){reject(err);
                    } else {resolve(data);}

                });
            });
        }
        try{
            this.status = yield deleteItem(this.request.body.key).then(
                function (){
                    return 200;
                },
                function (){
                    return 204;
                }
            );
            this.body = this.request.body;
        }catch(e){
            this.body = {message: "Error " + e};
        }
        yield next;
    }
};

