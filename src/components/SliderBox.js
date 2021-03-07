import React  from 'react';

const SliderBox = (p) => {

  let val="val"+p.props.title
  let obj =[];
  const HandleChange = (e) =>{
    document.getElementById(val).innerHTML = e.target.value

    let newname = e.target.name;
    let value = "100-"+e.target.value; 
    obj = { id : newname,name : value }
        p.props.callbackfun(newname,obj)   
      
  }

	return(
			<div className="rang">
        <div className="rangeslider">
          <p>{p.props.title} </p>
            <input className="min" name={p.props.type} type="range" min="100" max="300" onChange={ (e) => { HandleChange(e) }} />
            
            <span className="range_min light left">100</span>
            <span className="range_min light center"> 100 - <span  id={val}> 101</span></span>
            <span className="range_max light right">300</span>
        </div>
			</div>
		
);
  }
export default SliderBox
