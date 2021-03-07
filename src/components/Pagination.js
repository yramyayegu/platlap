import  React from "react"


const Pagination = (p) =>{

console.log(p.total/10)
let count = p.total/10
let pageno = []
for(let i=1; i<count;i=i+10)
{
    pageno.push(i)
}
console.log(pageno)

    return(
        <div className="pagination right">
  <a rel="noopener noreferrer" href="/#">&laquo;</a>
  <a rel="noopener noreferrer" href="/#">1</a>
  <a rel="noopener noreferrer" className="active" href="/#">2</a>
  <a rel="noopener noreferrer" href="/#">3</a>
  <a rel="noopener noreferrer" href="/#">&raquo;</a>
</div>
    )
}

export default Pagination;