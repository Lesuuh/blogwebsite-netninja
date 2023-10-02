import Bloglist from "./Bloglist";
import useFetch from "../useFetch";
import useOnlineStatus from "../useOnlineStatus";

const Home = () => {
  const { data, isLoading, error } = useFetch("http://localhost:8000/blogs");
  const online = useOnlineStatus();
  return (
    <div>
      {online ? (
        <p>Reconnecting...</p>
      ) : (
        <>
          {Error && <p>{error}</p>}
          {isLoading ? (
            <p>Loading</p>
          ) : (
            data && (
              <Bloglist
                blogs={data}
                title={"All Blogs"}
                isLoading={isLoading}
              />
            )
          )}
        </>
      )}
    </div>
  );
};

export default Home;
