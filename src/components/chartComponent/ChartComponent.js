import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Service } from '../../service/Service';
import axios from 'axios';
import { HashRouter,Route } from 'react-router-dom';

export const ChartComponent = () => {
    const [geojson, setGeojson] = useState();
    const [dbRegione, setDbRegione] = useState([]);
    const [dbSoglie, setDbSoglie] = useState();
    useEffect(() => {
        let service = new Service.getInstance();
        return service.getGeojsonANDMyDb().then(axios.spread(function (data1, data2, data3) {
            //setto lo stato del geojson
            setGeojson(pregeojson => pregeojson = data1.data);
            //setto lo stato del dbRegione
            setDbRegione(predbregione => predbregione = data2.data);
            //setto lo stato del dbSoglie
            setDbSoglie(predbsoglie => predbsoglie = data3.data);

        }));
    }, [])

    let myLabels = (dbRegione.map((item) => (item.name)));
    let Positive = (dbRegione.map((item) => (item.positive)));
    let Deaths = (dbRegione.map((item) => (item.deaths)));
    let Asymptomatic = (dbRegione.map((item) => (item.asymptomatic)));

    const getColor = (positivi, popolazione, idsoglie) => {
        return ((positivi / popolazione) * 100) <= dbSoglie[idsoglie].minThresholds ? dbSoglie[idsoglie].minColor :
            ((positivi / popolazione) * 100) > dbSoglie[idsoglie].minThresholds && ((positivi / popolazione) * 100) <= dbSoglie[idsoglie].maxThresholds ? dbSoglie[idsoglie].mediumColor :
                ((positivi / popolazione) * 100) > dbSoglie[idsoglie].maxThresholds ? dbSoglie[idsoglie].maxColor :
                    '#FFEDA0';
    };


    return (

        <HashRouter>
            <Route exact path="/">
                <div>

                    {dbRegione && geojson && dbSoglie && <Bar
                        height={500}
                        data={{
                            labels: myLabels,
                            datasets: [{
                                data: Positive,
                                backgroundColor: [

                                    getColor(dbRegione[0].positive, dbRegione[0].population, 0),
                                    getColor(dbRegione[1].positive, dbRegione[1].population, 0),
                                    getColor(dbRegione[2].positive, dbRegione[2].population, 0),
                                    getColor(dbRegione[3].positive, dbRegione[3].population, 0),
                                    getColor(dbRegione[4].positive, dbRegione[4].population, 0),
                                    getColor(dbRegione[5].positive, dbRegione[5].population, 0),
                                    getColor(dbRegione[6].positive, dbRegione[6].population, 0),
                                    getColor(dbRegione[7].positive, dbRegione[7].population, 0),
                                    getColor(dbRegione[8].positive, dbRegione[8].population, 0),
                                    getColor(dbRegione[9].positive, dbRegione[9].population, 0),
                                    getColor(dbRegione[10].positive, dbRegione[10].population, 0),
                                    getColor(dbRegione[11].positive, dbRegione[11].population, 0),
                                    getColor(dbRegione[12].positive, dbRegione[12].population, 0),
                                    getColor(dbRegione[13].positive, dbRegione[13].population, 0),
                                    getColor(dbRegione[14].positive, dbRegione[14].population, 0),
                                    getColor(dbRegione[15].positive, dbRegione[15].population, 0),
                                    getColor(dbRegione[16].positive, dbRegione[16].population, 0),
                                    getColor(dbRegione[17].positive, dbRegione[17].population, 0),
                                    getColor(dbRegione[18].positive, dbRegione[18].population, 0),
                                    getColor(dbRegione[19].positive, dbRegione[19].population, 0)

                                ],
                                borderWidth: 1,
                                hoverBorderWidth: 1,
                                hoverBorderColor: 'white'
                            }]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            legend: {
                                display: false,
                            },
                            layout: {
                                padding: 70
                            },
                            tooltips: {
                                enabled: true
                            }
                        }}
                    />}
                </div>
            </Route>
            <Route exact path="/mapDeaths">
                <div>

                    {dbRegione && geojson && dbSoglie && <Bar
                        height={500}
                        data={{
                            labels: myLabels,
                            datasets: [{
                                data: Deaths,
                                backgroundColor: [

                                    getColor(dbRegione[0].deaths, dbRegione[0].population, 1),
                                    getColor(dbRegione[1].deaths, dbRegione[1].population, 1),
                                    getColor(dbRegione[2].deaths, dbRegione[2].population, 1),
                                    getColor(dbRegione[3].deaths, dbRegione[3].population, 1),
                                    getColor(dbRegione[4].deaths, dbRegione[4].population, 1),
                                    getColor(dbRegione[5].deaths, dbRegione[5].population, 1),
                                    getColor(dbRegione[6].deaths, dbRegione[6].population, 1),
                                    getColor(dbRegione[7].deaths, dbRegione[7].population, 1),
                                    getColor(dbRegione[8].deaths, dbRegione[8].population, 1),
                                    getColor(dbRegione[9].deaths, dbRegione[9].population, 1),
                                    getColor(dbRegione[10].deaths, dbRegione[10].population, 1),
                                    getColor(dbRegione[11].deaths, dbRegione[11].population, 1),
                                    getColor(dbRegione[12].deaths, dbRegione[12].population, 1),
                                    getColor(dbRegione[13].deaths, dbRegione[13].population, 1),
                                    getColor(dbRegione[14].deaths, dbRegione[14].population, 1),
                                    getColor(dbRegione[15].deaths, dbRegione[15].population, 1),
                                    getColor(dbRegione[16].deaths, dbRegione[16].population, 1),
                                    getColor(dbRegione[17].deaths, dbRegione[17].population, 1),
                                    getColor(dbRegione[18].deaths, dbRegione[18].population, 1),
                                    getColor(dbRegione[19].deaths, dbRegione[19].population, 1)

                                ],
                                borderWidth: 1,
                                hoverBorderWidth: 1,
                                hoverBorderColor: 'white'
                            }]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            legend: {
                                display: false,
                            },
                            layout: {
                                padding: 70
                            },
                            tooltips: {
                                enabled: true
                            }
                        }}
                    />}
                </div>
            </Route>
            <Route exact path="/mapAsymptomatic">
                <div>

                    {dbRegione && geojson && dbSoglie && <Bar
                        height={500}
                        data={{
                            labels: myLabels,
                            datasets: [{
                                data: Asymptomatic,
                                backgroundColor: [

                                    getColor(dbRegione[0].asymptomatic, dbRegione[0].positive, 2),
                                    getColor(dbRegione[1].asymptomatic, dbRegione[1].positive, 2),
                                    getColor(dbRegione[2].asymptomatic, dbRegione[2].positive, 2),
                                    getColor(dbRegione[3].asymptomatic, dbRegione[3].positive, 2),
                                    getColor(dbRegione[4].asymptomatic, dbRegione[4].positive, 2),
                                    getColor(dbRegione[5].asymptomatic, dbRegione[5].positive, 2),
                                    getColor(dbRegione[6].asymptomatic, dbRegione[6].positive, 2),
                                    getColor(dbRegione[7].asymptomatic, dbRegione[7].positive, 2),
                                    getColor(dbRegione[8].asymptomatic, dbRegione[8].positive, 2),
                                    getColor(dbRegione[9].asymptomatic, dbRegione[9].positive, 2),
                                    getColor(dbRegione[10].asymptomatic, dbRegione[10].positive, 2),
                                    getColor(dbRegione[11].asymptomatic, dbRegione[11].positive, 2),
                                    getColor(dbRegione[12].asymptomatic, dbRegione[12].positive, 2),
                                    getColor(dbRegione[13].asymptomatic, dbRegione[13].positive, 2),
                                    getColor(dbRegione[14].asymptomatic, dbRegione[14].positive, 2),
                                    getColor(dbRegione[15].asymptomatic, dbRegione[15].positive, 2),
                                    getColor(dbRegione[16].asymptomatic, dbRegione[16].positive, 2),
                                    getColor(dbRegione[17].asymptomatic, dbRegione[17].positive, 2),
                                    getColor(dbRegione[18].asymptomatic, dbRegione[18].positive, 2),
                                    getColor(dbRegione[19].asymptomatic, dbRegione[19].positive, 2)

                                ],
                                borderWidth: 1,
                                hoverBorderWidth: 1,
                                hoverBorderColor: 'white'
                            }]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            legend: {
                                display: false,
                            },
                            layout: {
                                padding: 70
                            },
                            tooltips: {
                                enabled: true
                            }
                        }}
                    />}
                </div>
            </Route>
        </HashRouter>
    )
}