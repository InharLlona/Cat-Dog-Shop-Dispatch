import React from "react";
import Flexbox from 'flexbox-react';
import { MyContext,MyChartContext } from "./Contextos";
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import {Chart} from './shopComponents/chart'
import {DrawList} from './shopComponents/drawList'
import { catList } from "./Mock";

export const CatPage: React.FC = () =>{
   
    const mychartcontext = React.useContext(MyChartContext)
   
    const handleChartV = () => {
        mychartcontext.setShow(!mychartcontext.show)
    }

    return (
    <div>
        <Flexbox style={{justifyContent:"space-between", padding:"10px"}}>
            <Link to="/dogPage">Dogs</Link> 
            <button onClick={handleChartV}>Show Chart</button>
        </Flexbox>
        <Flexbox style={{justifyContent:"space-between",width:"100vw"}}>
            <DrawList pictureList={catList} />
            <Chart/> 
        </Flexbox>
    </div>
    )
}
