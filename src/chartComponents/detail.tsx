import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import Flexbox from 'flexbox-react';
import { MyContext, MySendChartContext} from "../Contextos";

import "react-datepicker/dist/react-datepicker.css";

export const Detail:React.FC = () => {
    const mycontext = React.useContext(MyContext)
    const mySendChartContext = React.useContext(MySendChartContext)

    const [select, setSelection] = React.useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'idss', headerName: 'IDs', width: 70 },
        { field: 'state', headerName: 'State', width: 130 },
        { field: 'price', headerName: 'Price €', width: 130 }];

    const handleSelection = (e:number[]) => {
        setSelection(e);
        mySendChartContext.setPrecio(e.reduce((p,product) => p + mycontext.lista[product-1].price,0))
        mycontext.lista.map(ele=>{
          let ss = ele.id
          if (e.includes(ss)){
            ele.state = "active";
          }else(ele.state ="pending")
        })
    }
    React.useEffect(() => {
        mySendChartContext.setStatus((select.length * 100)/mycontext.lista.length)
    }, [select]);

    return(
      <Flexbox>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
          rows={mycontext.lista}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection 
          onSelectionModelChange={handleSelection}
         />
        </div>
     </Flexbox> 
    )
}