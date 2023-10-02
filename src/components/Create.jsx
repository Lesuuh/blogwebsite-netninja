import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("alex");
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const blog = { title, body, author };
    setTimeout(() => {
      fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      }).then(() => {
        setIsPending(false);
        console.log("successfully");
        navigate("/");
      });
    }, 1000);
  };

  return (
    <>
      <div className="create">
        <div>
          <h2>Add a new blog</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">Blog Title:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="">Blog Body</label>
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <label>Blog Author:</label>
            <select value={author} onChange={(e) => setAuthor(e.target.value)}>
              <option value="alex">Alex</option>
              <option value="brian">Brian</option>
              <option value="hecter">Hecter</option>
            </select>
            {isPending ? (
              <button disabled>Loading...</button>
            ) : (
              <button>Add Blog</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
