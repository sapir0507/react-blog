import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('choose title');
    const [contant, setBody] = useState('Some text');
    const [author, setAuthor] = useState('mario');
    const [summery, setSummery] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, summery, contant, author};
        setIsPending(true);
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(()=>{
            console.log('New Blog Added');
            setIsPending(false);
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title</label>
                <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <label>Blog Body:</label>
                <textarea 
                    required
                    value={contant}
                    onChange={(e) => 
                        {
                            setBody(e.target.value);
                            setSummery(contant.substring(0,20));
                        }
                    }
                ></textarea>
                 <label>Blog Author:</label>
                 <select
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                 >
                     <option value="Mario">Mario</option>
                     <option value="Yoshi">Yoshi</option>
                     <option value="Rita Skitter">Rita Skitter</option>
                 </select>
                 {!isPending && <button>
                     Add Blog
                 </button>}
                 {isPending && <button disabled>
                     Adding Blog...
                 </button>}
            </form>
            <div className="preview">
                <br></br>
                <h2>Post Preview</h2>
                <div className="post-preview">
                    <h2> - {title} - </h2>
                    <p>Body: {contant}</p>
                    <br></br>
                    <p>Author: {author}</p>
                </div>
            </div>
          
        </div>
     );
}
 
export default Create;