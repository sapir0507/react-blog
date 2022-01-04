import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isPending, isError } = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();
    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
        method: "DELETE"
        }).then(()=>{
            history.push('/');
        })
    }
    return ( 
        <div className="blog-details"> 
            {isPending && <div> Is Loading... </div>}
            {isError && <div> {isError} </div>}
            {blog && 
                <article>
                    <h1> {blog.title} </h1> 
                    <p> -  Written By { blog.author } </p>
                    <div> <h2>{ blog.contant }</h2> </div>
                    <button onClick={handleClick}>delete</button>
                    
                </article>
            }
        </div>
     );
}
 
export default BlogDetails;