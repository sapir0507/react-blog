import BlogList from "./BlogList";
import Pending from "./Pending";
import useFetch from "./useFetch";


const Home = () => {
    const {data:blogs, isPending, isError} = useFetch('http://localhost:8000/blogs');
    
    return ( 
        <div className="Home">
            {isPending && <Pending/>}
            {isError && <div><h1>{isError}</h1></div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs!"/>}
        </div>
     );
}
 
export default Home;