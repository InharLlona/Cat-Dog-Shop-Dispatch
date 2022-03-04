export const HeaderB:React.FC = () => {
  
   
    return( 
         <Flexbox padding="10px" justifyContent="space-between">
           <input type={"text"} value={`${mySendChartContext.precio}€`}></input>
           <progress max="100" value={mySendChartContext.statuss}></progress>
           <button onClick={sendProducts} style={{backgroundColor:buttonColor}}>Send</button> 
         </Flexbox>   
         {state.errorTrue && <Alert variant="outlined" severity="error">User code should be correct and all products should be picked! — check it out!</Alert>}
         {state.isAlertVisible && <Alert variant="outlined" severity="success">PO created! — check it out!</Alert>}
    )
}