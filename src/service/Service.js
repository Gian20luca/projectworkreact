import axios from 'axios';

var instance = null;

export class Service {


    static getInstance() {
        if (instance === null) {
            instance = new Service();
        }
        return instance;
    }

    static setInstance(_instance) {
        instance = _instance;
    }

    getGeojson() {
        return axios({
            method: 'get',
            url: 'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson',
            responseType: 'stream'
        })
    }

}