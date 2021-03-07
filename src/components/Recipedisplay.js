import React from "react"
import Pagination from "./Pagination";

function RecipeDisplay(props) {
    let Recipeinfo = props.recipe.hits;
    let Count = props.recipe.count;

   // console.log(Recipeinfo)


    let alldetails = [];
    if(Count > 0){
        for (var k in Recipeinfo) {
            let dishType = 'N/A';
            let cuisineType = 'N/A';
            let totalTime = 'Quick Recipe';

            //console.log(Recipeinfo[k].recipe.dishType)
            if ("dishType" in Recipeinfo[k].recipe) { dishType = Recipeinfo[k].recipe.dishType[0] }
            if ("cuisineType" in Recipeinfo[k].recipe) { cuisineType = Recipeinfo[k].recipe.cuisineType[0] }
            if (Recipeinfo[k].recipe.totalTime > 0 ){ totalTime = Recipeinfo[k].recipe.totalTime +' min'}

            let lable = {
                'lable': Recipeinfo[k].recipe.label,
                'calories': Recipeinfo[k].recipe.calories,
                'image': Recipeinfo[k].recipe.image,
                'dishType': dishType,
                'cuisineType': cuisineType,
                'link': Recipeinfo[k].recipe.url,
                'time': totalTime,
                'ingredients' : Recipeinfo[k].recipe.ingredients,
                'healthLabels' : Recipeinfo[k].recipe.healthLabels,
            }
            alldetails.push(lable)
        }
    }


    
    return (
        <>
            <div  className="search-box-line"> {props.title} </div>
            
            { /*<Pagination total={Count} /> */}
            { (Count > 0) ?
            <div>
                {alldetails.map(item => (
                    <div className="container" key={Math.random()}>
                        <div className="col-sm-12 col-md-12" key={Math.random()}>
                            <div className="card horizontal" key={Math.random()}>
                                <div className="card-image" style={{ backgroundImage: `url(${item.image})` }} key={Math.random()} > 
                                </div>
                                <div className="card-stacked" key={Math.random()}>
                                    <div className="card-content" key={Math.random()}>
                                        <span className="card-title" key={Math.random()}>{item.lable} </span>
                                        <article key={Math.random()}>
                                            <h3 key={Math.random()}>{item.dishType}</h3>
                                            <ul key={Math.random()} >
                                                <li key={Math.random()}><span className="icon icon-users"></span><span className="item">{item.cuisineType} </span></li>
                                                <li key={Math.random()}><span className="icon icon-clock"></span><span className="item">{item.time} </span></li>
                                                <li key={Math.random()}><span className="icon icon-calories"></span><span className="item">{item.calories}</span></li>
                                            </ul>

                                            <p key={Math.random()} className="ingredients hide"><span>Ingredients:&nbsp;</span>
                                            {item.ingredients.map(i => (
                                                <span key={Math.random()}>{i.text}</span>
                                            ))} 
                                            </p>
                                            <p key={Math.random()} className="ingredients"><span>Health Labels:&nbsp;</span>
                                            {item.healthLabels.map(i => (
                                                <span key={Math.random()} className="hell">{i} </span>
                                            ))}.</p>
                                        </article>
                                    </div>
                                    <div key={Math.random()} className="card-action">
                                        <a rel="noopener noreferrer" key={Math.random()} target="_blank" href={item.link}>Get Recipe</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div> : 
            <div> No Recipes Avaliable....     </div>
                                            }
        </>
    )
}

export default RecipeDisplay;