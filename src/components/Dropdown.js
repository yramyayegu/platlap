import React from "react";

function Dropdown(p) {
    //console.log(props)
    const title = p.props.title
    const type  = p.props.type
    const options =[p.props.options][0]
    let dataExist;
    if(options){    dataExist = (Object.keys(options).length > 0) ?  true : false   }
    let  obj= {}
/** SENDING DATA BACK TO PARENT COMPONENT */
    const hd=(e)=>{
        let newname = e.target.name;
        let value = e.target.value; 
        let index = e.nativeEvent.target.selectedIndex;
        let text = e.nativeEvent.target[index].text
        obj =(newname === 'cuisineType' || newname === 'mealType' || newname === 'dishType') ?
                { id : newname,name :text } : 
                { id : newname,name : value }
            p.props.callbackfun('r',obj)   
            
            
        }
    return (
        <div className="col">
            <select id="" className="form-control framework" name={type} onChange={(e) => { hd(e)}}>
            <option>Select {title} </option>
                { (dataExist) ? 
                    Object.entries(options).map((keyName, value) => (
                        <option key={keyName[0]} value={keyName[0]} data-text={keyName[1]}>{keyName[1]}</option> 
                    )): <option>No Options Avalible</option> 
                }
            </select>
        </div>
    );
};

export default Dropdown;