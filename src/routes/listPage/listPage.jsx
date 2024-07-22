import "./Listpage.scss";
import Filter from "../../components/Filter/Filter";
import Card from "../../components/Card/Card";
import Map from "../../components/Map/Map";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const Listpage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const data = useLoaderData();

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const handleSearch = (query) => {
    setLoading(true);
    navigate({ search: new URLSearchParams(query).toString() });
  };

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter onSearch={handleSearch} />
          {loading ? (
            <div className="loader-container">
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                glassColor="#c0efff"
                color="#e15b64"
              />
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="loader-container">
                  <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="magnifying-glass-loading"
                    glassColor="#c0efff"
                    color="#e15b64"
                  />
                </div>
              }
            >
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error Loading Posts</p>}
              >
                {(postResponse) => {
                  const posts = postResponse.data.posts;
                  if (posts.length === 0) {
                    return <p>No items found for your search</p>;
                  }
                  return posts.map((post) => (
                    <Card key={post.id} item={post} />
                  ));
                }}
              </Await>
            </Suspense>
          )}
        </div>
      </div>
      <div className="mapContainer">
        <Suspense
          fallback={
            <div className="loader-container">
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                glassColor="#c0efff"
                color="#e15b64"
              />
            </div>
          }
        >
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error Loading Map</p>}
          >
            {(postResponse) => <Map items={postResponse.data.posts} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default Listpage;
