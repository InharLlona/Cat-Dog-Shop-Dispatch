import React from "react";
import Flexbox from 'flexbox-react';
import { MyContext, MySendChartContext} from "../Contextos";
import {uploadContact} from "../Api/apiss"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from '@mui/material/Alert';

const initialState = {
  allConfirmed: false,
  isUserCodeCorrect: false,
  isAlertVisible:false,
  errorTrue:false,
};

const confirmationReducer = (state, action) => {
  switch (action.type) {
    case 'PO_CONFIRMATION_SUCCESS': {
      return {
        ...state,
        allConfirmed: true,
      };
    }
    case 'PO_CONFIRMATION_FAILED': {
      return {
        ...state,
        allConfirmed: false,
      };
    }
    case 'WORKER_CONFIRMATION_SUCCESS': {
      return {
        ...state,
        isUserCodeCorrect: true,
      };
    }
    case 'WORKER_CONFIRMATION_FAILED': {
      return {
        ...state,
        isUserCodeCorrect: false,
      };
    }
    case 'ALERT_VISIBLE': {
      return {
        ...state,
        isAlertVisible:true,
      };
    }
    case 'ALERT_NO_VISIBLE': {
      return {
        ...state,
        isAlertVisible:false,
      };
    }
    case 'ERROR_TRUE': {
      return {
        ...state,
        errorTrue:true,
      };
    }
    case 'ERROR_FALSE': {
      return {
        ...state,
        errorTrue:false,
      };
    }
    default: return state;
  }
}

export const Header:React.FC = () => {
    const myContext =  React.useContext(MyContext)
    const mySendChartContext =  React.useContext(MySendChartContext)

    const [state, dispatch] = React.useReducer(confirmationReducer, initialState);

    const [startDate, setStartDate] = React.useState(new Date());
    const [buttonColor,setbuttonColor] = React.useState("");
    const [inputColor,setinputColor] = React.useState("");
    
    const workerIds = "12345";

    const onWorkerChange = (e) => {
      dispatch({type:'ERROR_FALSE'})
      dispatch({type:'ALERT_NO_VISIBLE'})
        if(e.target.value==workerIds){
          setinputColor("#b2f4bc")
          dispatch({type:'WORKER_CONFIRMATION_SUCCESS'})
        }
        else{
          setinputColor("#f4bbc0")
          dispatch({type:'WORKER_CONFIRMATION_FAILED'})
        }
    }

    const sendProducts = () =>{
      if((state.isUserCodeCorrect)&&(state.allConfirmed)&&(!state.isAlertVisible)){
        dispatch({type:'ALERT_VISIBLE'})
        dispatch({type:'ERROR_FALSE'})
      }else if((state.isUserCodeCorrect)&&(state.allConfirmed)&&(state.isAlertVisible)){
        dispatch({type:'ALERT_NO_VISIBLE'})
        dispatch({type:'ERROR_FALSE'})
      }else{
        dispatch({type:'ERROR_TRUE'})
      }
    }

     React.useEffect(() => {    
         if((state.isUserCodeCorrect)&&(state.allConfirmed)){setbuttonColor("#b2f4bc")}
         else{setbuttonColor("#f4bbc0")}
     },[state.isUserCodeCorrect,state.allConfirmed]);

    React.useEffect(() => {
           dispatch({type:'ERROR_FALSE'})
           dispatch({type:'ALERT_NO_VISIBLE'})
           if(mySendChartContext.statuss==100){dispatch({type:'PO_CONFIRMATION_SUCCESS'})}
           else{dispatch({type:'PO_CONFIRMATION_FAILED'})}
    },[mySendChartContext.statuss]);

    return(
        <div style={{border:"1px solid", borderRadius:"5px", borderColor:"#d1d4d2"}}>
       <Flexbox flexDirection="column">
         <h4>Pedido a proveedor</h4>
         <Flexbox padding="10px" justifyContent="space-between">
           <input type={"number"} title="WW" placeholder="Worker ID" onChange={onWorkerChange} style={{backgroundColor:inputColor}}></input>
           <input type={"text"} placeholder="Client"></input>
              <div> 
              <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} placeholderText="Sending date" />
              </div> 
         </Flexbox>
         <Flexbox padding="10px" justifyContent="space-between">
           <input type={"text"} value={`${mySendChartContext.precio}€`}></input>
           <progress max="100" value={mySendChartContext.statuss}></progress>
           <button onClick={sendProducts} style={{backgroundColor:buttonColor}}>Send</button> 
         </Flexbox>   
         {state.errorTrue && <Alert variant="outlined" severity="error">User code should be correct and all products should be picked! — check it out!</Alert>}
         {state.isAlertVisible && <Alert variant="outlined" severity="success">PO created! — check it out!</Alert>}
     </Flexbox>
     </div>
    )
}