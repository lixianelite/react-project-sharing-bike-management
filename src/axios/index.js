import JsonP from 'jsonp';
import axios from 'axios';
import Utils from './../utils/utils';


export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                params: 'callback'
            }, function(err, response) {
                if(response.cod === 200) {
                    resolve(response);
                }else{
                    reject(response.message);
                }
            })
        })
    }

    static ajax(options){

        let loading;

        if(options.data && options.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }

        let baseUrl = 'http://0.0.0.0:7300/mock/5b537146f27be30e5e5cc155/mockApi';

        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseUrl,
                timeout: 10000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {

                if(options.data && options.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }

                if(response.status === 200 && response.data.code === 0) {
                    let res = response.data;
                    if(res.code === 0) {
                        resolve(res);
                    }else{
                        console.error('error!');
                    }
                    
                }else{
                    reject(response.data);
                }
            })
        })
    }

    static requestList(_this, url, params) {
        var data = {
            params: params
        }

        this.ajax({
            url: url,
            data: data
        }).then((data) => {
            if(data && data.result) {
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }
}