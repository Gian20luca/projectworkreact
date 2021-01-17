import React, { useEffect, useState } from 'react';
import { Service } from '../../../service/Service';
import axios from 'axios';
import './LegendComponent.css';
import { HashRouter, Route } from "react-router-dom";

export const LegendComponent = (props) => {
    const [dbSoglie, setDbSoglie] = useState();
    useEffect(() => {
        let service = new Service.getInstance();
        return service.getGeojsonANDMyDb().then(axios.spread(function (data1, data2, data3) {
            //setto lo stato del dbSoglie
            setDbSoglie(predbsoglie => predbsoglie = data3.data);

        }));
    }, [])

    return (
        <HashRouter>
            <Route exact path="/">
                <div className='divLegendAll'>
                    {dbSoglie && <div className='divMaxLegend'>
                        <div className='divLegendSmall' style={{ borderColor: dbSoglie[0].minColor }}><small>Zona basso rischio {'0% - ' + dbSoglie[0].minThresholds + '%'}</small></div>
                        <div className='divLegendSmall' style={{ borderColor: dbSoglie[0].mediumColor }}><small>Zona medio rischio {dbSoglie[0].minThresholds + 1 + '% - ' + dbSoglie[0].maxThresholds + '%'}</small></div>
                        <div className='divLegendSmall' style={{ borderColor: dbSoglie[0].maxColor }}><small>Zona alto rischio {dbSoglie[0].maxThresholds + 1 + '% -   100%'} </small></div>
                    </div>}
                    {dbSoglie && <div className='divMaxLegend'>
                        <div className='divLegend' style={{ backgroundColor: dbSoglie[0].minColor, width: dbSoglie[0].minThresholds + '%' }}></div>
                        <div className='divLegend' style={{ backgroundColor: dbSoglie[0].mediumColor, width: dbSoglie[0].maxThresholds - dbSoglie[0].minThresholds + '%' }}></div>
                        <div className='divLegend' style={{ backgroundColor: dbSoglie[0].maxColor, width: (100 - dbSoglie[0].maxThresholds) + '%' }} ></div>
                    </div>}
                </div>
            </Route>

            <Route exact path="/mapDeaths">
                <div className='divLegendAll'>
                    {dbSoglie && <div className='divMaxLegend'>
                        <div className='divLegendSmall' style={{ borderColor: dbSoglie[1].minColor, }}><small>Bassa densità decessi {'0% - ' + dbSoglie[1].minThresholds + '%'}</small></div>
                        <div className='divLegendSmall' style={{ borderColor: dbSoglie[1].mediumColor, }}><small>Media densità decessi {dbSoglie[1].minThresholds + 1 + '% - ' + dbSoglie[1].maxThresholds + '%'}</small></div>
                        <div className='divLegendSmall' style={{ borderColor: dbSoglie[1].maxColor, }}><small>Alta densità decessi {dbSoglie[1].maxThresholds + 1 + '% -   100%'} </small></div>
                    </div>}
                    {dbSoglie && <div className='divMaxLegend'>
                        <div className='divLegend' style={{ backgroundColor: dbSoglie[1].minColor, width: dbSoglie[0].minThresholds + '%' }}></div>
                        <div className='divLegend' style={{ backgroundColor: dbSoglie[1].mediumColor, width: dbSoglie[0].maxThresholds - dbSoglie[0].minThresholds + '%' }}></div>
                        <div className='divLegend' style={{ backgroundColor: dbSoglie[1].maxColor, width: (100 - dbSoglie[0].maxThresholds) + '%' }} ></div>
                    </div>}
                </div>
            </Route>

            <Route exact path="/mapAsymptomatic">
                <div className='divLegendAll'>
                    {dbSoglie && <div className='divMaxLegend'>
                        <div className='divLegendSmall' style={{ borderColor: dbSoglie[2].minColor }}><small>Zona basso rischio {'0% - ' + dbSoglie[2].minThresholds + '%'}</small></div>
                        <div className='divLegendSmall' style={{ borderColor: dbSoglie[2].mediumColor }}><small>Zona medio rischio {dbSoglie[2].minThresholds + 1 + '% - ' + dbSoglie[2].maxThresholds + '%'}</small></div>
                        <div className='divLegendSmall' style={{ borderColor: dbSoglie[2].maxColor }}><small>Zona alto rischio {dbSoglie[2].maxThresholds + 1 + '% -   100%'} </small></div>
                    </div>}
                    {dbSoglie && <div className='divMaxLegend'>
                        <div className='divLegend' style={{ backgroundColor: dbSoglie[2].minColor, width: dbSoglie[0].minThresholds + '%' }}></div>
                        <div className='divLegend' style={{ backgroundColor: dbSoglie[2].mediumColor, width: dbSoglie[0].maxThresholds - dbSoglie[0].minThresholds + '%' }}></div>
                        <div className='divLegend' style={{ backgroundColor: dbSoglie[2].maxColor, width: (100 - dbSoglie[0].maxThresholds) + '%' }} ></div>
                    </div>}
                </div>
            </Route>
        </HashRouter>
    )
}