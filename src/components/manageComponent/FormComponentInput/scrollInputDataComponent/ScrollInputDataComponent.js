import React, { useEffect, useState } from 'react';
import { Service } from '../../../../service/Service';
import axios from "axios";
import './ScrollInputDataComponent.css';

export const ScrollInputDataComponent = (props) => {
    const [regione, setRegione] = useState();
    useEffect(() => {
        let call = new Service.getInstance();

        call.getGeojsonANDMyDb().then(
            axios.spread(function (data1, data2, data3) {
                console.log(data2.data);
                setRegione((predbregione) => (predbregione = data2.data));
            })
        );
    }, []);

    return (
        <div>
            {regione && regione.map((region, index) => <div className='divCard' style={{ padding: '10px', marginBottom: '15px' }}>
                <ul>
                    <li style={{ fontSize: '18px', fontWeight: '500', marginLeft: '-20px' }} data-toggle="collapse" href={'#' + region.id.toString()} role="button" aria-expanded="false" aria-controls={region.id.toString()}>{regione[index].name}</li>
                </ul>
                {props.collapseInput && region.id.toString() === props.collapseInput ? <div className="collapse show" id={region.id.toString()}>
                    <div style={{ marginBottom: '20px' }}>
                        <p style={{ marginBottom: '-2px' }}>Popolazione: {regione[index].population}</p>
                        <p style={{ marginBottom: '-2px' }}>Positivi: {regione[index].positive}</p>
                        <p style={{ marginBottom: '-2px' }}>Decessi: {regione[index].deaths}</p>
                        <p >Asintomatici: {regione[index].asymptomatic}</p>
                    </div>
                </div> : <div className="collapse" id={region.id.toString()}>
                        <div style={{ marginBottom: '20px' }}>
                            <p style={{ marginBottom: '-2px' }}>Popolazione: {regione[index].population}</p>
                            <p style={{ marginBottom: '-2px' }}>Positivi: {regione[index].positive}</p>
                            <p style={{ marginBottom: '-2px' }}>Decessi: {regione[index].deaths}</p>
                            <p >Asintomatici: {regione[index].asymptomatic}</p>
                        </div>
                    </div>}
            </div>)}
        </div>
    )
}