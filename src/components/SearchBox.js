import React, { useState } from "react";

function SearchBox(props) {

    const [searchbtn, setSearchbtn] = useState(true);
    const [search, setSearch] = useState([]);
    let lastsearch = props.lastsearch;
    let obj = {}
/**  USER LAST 5 SEARCHES */
    if(lastsearch.length === 6){
        lastsearch.shift();
    }
/**HANDELINHLING SEARCH DATA  */    
    const Handlesearch = (e) => {
        var element = document.getElementById("search-bar");
        let value = e.target.value.trim();
        if (value !== '') {
            obj = { id: 'q', name: value }
            props.handlesearchQuery('q', obj)
            setSearch(obj)
            element.classList.remove("requried");
        } else {
            element.value = '';
            element.classList.add("requried");
            props.handlesearchQuery('delq', obj)
        }
    }
/** CALLING API ONCLICK OF MAGNIFING BTN  */
    function Handleshortsearch() {
        if (search) {
            console.log(search)
            props.handleRecipe('q', search)
        }
    }
/**CALLIN API ONCLICK OF USER LAST SERCH DATA BTN   */
    function reUsesearch(sear) {
        console.log(sear.item)
        obj = { id: 'q', name: sear.item }
        document.getElementById("search-bar").value = sear.item;
        console.log(obj)
            props.handlesearchQuery('q', obj)
            props.handleRecipe()
    }

    return (
        <>
            <div className="row search-box-line">
                <div className="col-12 col-md-12">
                    <input id="search-bar" placeholder="Search by : Chicken, Spaghetti" name="q" onChange={(e) => Handlesearch(e)} />
                    {(searchbtn) ? <button className="fas fa-search btn" id="search-btn" onClick={() => Handleshortsearch()}></button> : null}
                </div>


                <div className="col-md-9" >

{lastsearch.map(item => (
    <button key={Math.random()} onClick={() => { reUsesearch({item}) }} className="card-notify-badge capcase"> {item}  </button>
))
}
</div>
                <div className="col-md-3 align-last" >

                    <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" onClick={() => setSearchbtn(!searchbtn)}>
                        Advance Search  </a>
                </div>
            </div>
        </>
    )
}
export default SearchBox;