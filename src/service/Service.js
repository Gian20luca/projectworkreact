import axios from 'axios';
var instance = null;

export class Service {

// creazione o utilizzo istanza esistente
    static getInstance() {
        if (instance === null) {
            instance = new Service();
        }
        return instance;
    }

//settaggio dell'istanza
    static setInstance(_instance) {
        instance = _instance;
    }

//recupero risposte di tutte le chiamate
    getGeojsonANDMyDb() {
        return axios.all([
            axios.get('https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson'),
            axios.get('http://localhost:3001/regione'),
            axios.get('http://localhost:3001/soglie/'),
        ])
    }

// patch delle 3 sezioni positivi decessi e asintomatici
    patchJsonPositive(value, id) {
        return axios({
            method: 'Patch',
            url: 'http://localhost:3001/regione/' + id,
            data: {
                positive: parseInt(value),
                data:(this.data.getDate()+"/"+(this.data.getMonth()+1)+"/"+this.data.getFullYear()+"  ora: "+this.data.getHours()+":"+this.data.getMinutes()),
                motivazione:("Aggiornamento positivi: " + value)
            }
        });
    }
    patchJsonAsinto(value, id) {
        return axios({
            method: 'Patch',
            url: 'http://localhost:3001/regione/' + id,
            data: {
                asymptomatic: parseInt(value),
                data:(this.data.getDate()+"/"+(this.data.getMonth()+1)+"/"+this.data.getFullYear()+"  ora: "+this.data.getHours()+":"+this.data.getMinutes()),
                motivazione:("Aggiornamento asintomatici: " + value)
            }
        });
    }
    patchJsonDeaths(value, id) {
        return axios({
            method: 'Patch',
            url: 'http://localhost:3001/regione/' + id,
            data: {
                deaths: parseInt(value),
                data:(this.data.getDate()+"/"+(this.data.getMonth()+1)+"/"+this.data.getFullYear()+"  ora: "+this.data.getHours()+":"+this.data.getMinutes()),
                motivazione:("Aggiornamento decessi: " + value)
            }
        });
    }
    
    //patch sulle soglie e i colori
    patchColor(min, max, maxcolor, mincolor, mediumcolor, id) {
        return axios({
            method: 'Patch',
            url: 'http://localhost:3001/soglie/' + id,
            data: {
                minThresholds: parseInt(min),
                maxThresholds: parseInt(max),
                minColor: mincolor,
                mediumColor: mediumcolor,
                maxColor: maxcolor,
                data:(this.data.getDate()+"/"+(this.data.getMonth()+1)+"/"+this.data.getFullYear()+"  ora: "+this.data.getHours()+":"+this.data.getMinutes()),
                motivazione:("Aggiornamento soglie o colori: " )
            }
        });
    }
}
