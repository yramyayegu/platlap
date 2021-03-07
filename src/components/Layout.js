import React, { useState ,useEffect } from "react";
import Dropdown from "./Dropdown";
import SearchBox from "./SearchBox";
import {Dite, Health, cuisineType, mealType, dishType} from "../utilities/Constants";
import RecipeDisplay from "./Recipedisplay";
import SliderBox from "./SliderBox";


function Layout() {

    const [recipe , setrecipe] = useState();
    const [loading,setloading] = useState(false)
    const [obj,setobj] = useState([])
    const [newurl,setnewurl] = useState([]);
    const [lastsearch,setlastsearch] = useState([]);
    const [title,settitle] = useState('');

    
/** Fetch data from API */
    const my_async_fn = async (data) => {      
            const app_id="cfafced5";
            const app_key ="fd2d71cd7a3e2016f3e22f44b87d6886";
            let URL = 'https://api.edamam.com/search?app_id='+app_id+'&app_key='+app_key;            
            for (var k in data) {
            URL += '&'+data[k].id+'='+data[k].name;  
                if(data[k].id === 'q')
                {
                    var name_exist = lastsearch.findIndex(item => item === data[k].name);
                    if(name_exist >= 0) { lastsearch.splice(name_exist, 1);  setlastsearch([...lastsearch, data[k].name]) }else{ setlastsearch([...lastsearch, data[k].name]) }
                }
            }
            if(URL !== newurl)
            {     
                try{
                await fetch(URL)
                .then(response => response.json())
                .then(recivedData => setrecipe(recivedData));
                setloading(true)
                }
                catch (e){
                    console.log(e)  
                }
                setnewurl(URL);
            }else{
                setloading(true)
            }
      }
/** Fetch data from API */


/**   UPDATING DATA OBJECT WITH ALL PARAMETERS */
    const HandlesearchQuery = (key,data)=>{
    var AdvanceSearch_name_exist = obj.findIndex(item => item.name === data.name);
    if(AdvanceSearch_name_exist < 0) {
        var item = obj.findIndex(item => item.id === 'q');
        if(key === 'q'){
            if(item >= 0) { obj.splice(item, 1); setobj([...obj, data]) }else{  setobj([...obj, data]); }
           let tit = "Result for "+data.name;
            settitle(tit) 
        }else if(key === 'calories'){
            var item1 = obj.findIndex(item => item.id === 'calories');
            if(item1 >= 0) { obj.splice(item1, 1); setobj([...obj, data]) }else{  setobj([...obj, data]); }
        }
        else if(key === 'time'){
            var item2 = obj.findIndex(item => item.id === 'time');
            if(item2 >= 0) { obj.splice(item2, 1); setobj([...obj, data]) }else{  setobj([...obj, data]); }
        }
        else if(key === 'delq'){
            if(item >= 0) { // obj.splice(item, 1);  
            }
        }
        else{
            setobj([...obj, data]);
        }
        forceUpdate(Math.random())
    }


    }
/**   CALLING ENDPOINT/  */
    const HandleRecipe = () =>{
        var element = document.getElementById("search-bar");
        var item = obj.findIndex(item => item.id === 'q');
        let flag = (item >= 0) ?  true : false;
        if(flag)
        {
            setloading(false)
            my_async_fn(obj);  
            
        }else{
            element.classList.add("requried");
        }
    }

    const [, forceUpdate] = useState();
    useEffect(() => {
      setTimeout(forceUpdate, 2000);
    }, []);
/**   REMOVINGEXTRA INFORMATION/  */
    const remove = (name) =>{
        console.log(obj)
        var item = obj.findIndex(item => item.name === name);
        if(item >= 0) {  obj.splice(item, 1); }
        setobj(obj)
        forceUpdate(Math.random())
    }
       const Propsdata = {
        "Dite" : { 
            "title" : "Dite",
             "type" : "Dite",
             "options" : Dite,
             "callbackfun" : HandlesearchQuery,
        },
        "Health" : { 
            "title" : "Health",
             "type" : "Health",
             "options" : Health,
             "callbackfun" : HandlesearchQuery,
        },
        "cuisineType" : { 
            "title" : "Cuisine Type",
             "type" : "cuisineType",
             "options" : cuisineType,
             "callbackfun" : HandlesearchQuery,
        },
        "mealType" : { 
            "title" : "Meal Type",
             "type" : "mealType",
             "options" : mealType,
             "callbackfun" : HandlesearchQuery,
        },
        "dishType" : { 
            "title" : "Dish Type",
             "type" : "dishType",
             "options" : dishType,
             "callbackfun" : HandlesearchQuery,
        },"Calories" : { 
            "title" : "Calories",
             "type" : "calories",
             "callbackfun" : HandlesearchQuery,
        },"Time" : { 
            "title" : "Time",
             "type" : "time",
             "callbackfun" : HandlesearchQuery,
        }
       } 
    return (
        <main>
            <h1>Recipe Search Box</h1>
            <div className="container">
             
                <SearchBox lastsearch={lastsearch} handlesearchQuery={HandlesearchQuery} handleRecipe={HandleRecipe} />
                <div className="collapse" id="collapseExample">
                    <div className="row advance">
                        <div className="col-12 col-md-8">Advance Search</div>
                    </div>

                    <div className="row">
                        <div className="col-md-8  col-sm-12"><Dropdown props={Propsdata.Dite} /></div>
                        <div className="col-md-4  col-sm-12"><Dropdown props={Propsdata.Health} /></div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-12"><Dropdown props={Propsdata.cuisineType}  /></div>
                        <div className="col-md-4 col-sm-12"><Dropdown props={Propsdata.mealType} /></div>
                        <div className="col-md-4 col-sm-12"><Dropdown props={Propsdata.dishType} /></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-12"> <SliderBox props={Propsdata.Calories} /> </div>
                        <div className="col-md-6 col-sm-12"> <SliderBox props={Propsdata.Time} /> </div>
                    </div>
        
                    <div className="container">
                        <div>

                            {obj.map(item => (
                                
                                item.id !== 'q' ? 
                                  <button key={Math.random()} id={item.name} onClick={()=>{remove(item.name)}} className="card-notify-badge capcase">{item.id} : {item.name}  <span className="card-notify-year">X</span> </button> : null
                            
                            ))}
                        </div>
                        <div className="text-right">
                        <button type="button" className="btn btn-primary" onClick={() => HandleRecipe()}>Search Recipes</button>
                        </div>
                    </div>
                </div>
            </div>

            { (recipe) ? 
            <div className="container">
                {(loading) ? <RecipeDisplay recipe={recipe}  title={title}/>  : <div className="load"><span> Loading... </span></div> }
            </div>
            : null }
        </main>
    );
};

export default React.memo(Layout);