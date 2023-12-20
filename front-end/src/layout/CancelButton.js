import { React } from "react";
import { useHistory } from "react-router-dom";



function CancelButton(){


    const history = useHistory();
    return(
        <button type="button" onClick={()=>history.push('/')}>Cancel</button>


    )




}


export default CancelButton;