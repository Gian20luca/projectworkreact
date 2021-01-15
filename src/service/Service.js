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

    getGeojsonANDMyDb() {
        return axios.all([
            axios.get('https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson'),
            axios.get('http://localhost:3001/regione'),
            axios.get('http://localhost:3001/soglie/'),
        ])
    }

    getRegionModal() {
        return axios({
            method: 'get',
            url: 'http://localhost:3001/regione',
            responseType: 'stream'
        })
    }

    patchJsonPositive(value, id) {
        return axios({
            method: 'Patch',
            url: 'http://localhost:3001/regione/' + id,
            data: {
                positive: value
            }
        });
    }
    patchJsonAsinto(value, id) {
        return axios({
            method: 'Patch',
            url: 'http://localhost:3001/regione/' + id,
            data: {
                asymptomatic: value
            }
        });
    }
    patchJsonDeaths(value, id) {
        return axios({
            method: 'Patch',
            url: 'http://localhost:3001/regione/' + id,
            data: {
                deaths: value
            }
        });
    }


}