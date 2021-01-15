import React, { useEffect, useState } from 'react';
import { Service } from '../../service/Service';
import axios from 'axios';

export function ModalComponent() {
    const [geojson, setGeojson] = useState();
  const [dbRegione, setDbRegione] = useState();
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
          //risposta geojson
          console.log(data1.data)
          //Risposta db regioni
          console.log(data2.data)
          //Risposta db soglie
          console.log(data3.data)
        }));
      }, [])


      

    return (
        <div>
            <div className="">
                <div className="modal-dialog ">
                    <div className="modal-content ">
                        <div className="modal-header">
                            immagine
          <h2 className="modal-title">{dbRegione[0].name}</h2>
                            <button type="button" className="close">
          <img src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/cross-512.png" height="16px" width="16px;" />
        </button>
                        </div>
                        <div className="modal-body">
                            <p>Popolazione:</p>
                            <p>Positivi: </p>
                            <p>Positivi su popolazione:</p>
                        </div>
                        <div className="modal-footer ">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


