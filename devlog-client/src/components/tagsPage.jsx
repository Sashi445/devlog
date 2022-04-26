import React, { useState, useEffect } from "react";
import PostView from "./PostView.jsx";
import Loader from "./Loader.jsx";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import serverConfig from "./../app/ServerConfig";

const TagsPageComponent = () => {
  const [posts, setPosts] = useState([]);

  const [tags, setTags] = useState([]); // ["react", "example", "post"]);
  const [selectedTags, setSelectedTags] = useState([]); // ["react"]);

  const [loading, setLoading] = useState(true);

  const fetchAllTags = () => {
    axios
      .get(`${serverConfig.proxyUrl}/tags/all`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllTags();
  }, []);

  useEffect(() => {
    if (selectedTags.length > 0) {
      axios
        .get(
          `${serverConfig.proxyUrl}/tags?selected=${encodeURI(
            selectedTags.reduce((prev, curr) => prev + "|" + curr)
          )}`,
          {
            headers: {
              accept: "application/json",
            },
          }
        )
        .then((res) => {
          setLoading(false);
          setPosts([...res.data]);
        });
    }
  }, [selectedTags]);

  const addTag = (tag) => {
    setLoading(true)
    !selectedTags.includes(tag) && setSelectedTags([...selectedTags, tag]);
  };

  const removeTag = (tag) => {
    setLoading(true)
    selectedTags.includes(tag) &&
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    setPosts([...posts.filter((p) => p.tags.includes(tag) === false)]);
  };

  console.log(selectedTags.length)

  return (
    <div className="container py-2">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h3>Tags</h3>
          {tags.map(({ id, value }) => (
            <span
              role="button"
              onClick={() => addTag(value)}
              className="badge bg-warning mx-1"
              key={id}
            >
              {value}
            </span>
          ))}
          <hr />
          {selectedTags.length === 0 ? (
            <h3>Select tags to get relevant posts</h3>
          ) : (
            <h3>Posts Tagged with</h3>
          )}
          {selectedTags.map((value, index) => (
            <span className="badge bg-primary mx-1" key={index}>
              {value}
              <AiFillCloseCircle
                role="button"
                onClick={() => removeTag(value)}
                style={{ marginLeft: "5px", marginTop: "-2px" }}
              />
            </span>
          ))}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {selectedTags.length !== 0 && (loading ? (
            <div className="container text-center py-3">
              <Loader />
            </div>
          ) : (
            <div>
              {posts.length !== 0 ? posts.map((post) => (
                <PostView key={post.id} post={post} />
              )) : (
                <h3 className="text-center mt-3">No posts found</h3>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsPageComponent;
