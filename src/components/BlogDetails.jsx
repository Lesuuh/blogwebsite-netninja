import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const {
    data: blog,
    error,
    isLoading,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const handleDelete = () => {
    setIsPending(true);
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      setIsPending(false);
      navigate("/");
    });
  };

  return (
    <>
      <div className="blog-details">
        {isLoading && <p>Loading...</p>}
        {error && <div>{error}</div>}
        {blog && (
          <article>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <div>{blog.body}</div>
            {isPending ? (
              <button disabled>Loading...</button>
            ) : (
              <button onClick={handleDelete}>Delete</button>
            )}
          </article>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
