import React, { useState, useEffect } from "react";
import { Tabs, Button, message, Row, Col } from "antd";
import axios from "axios";

import SearchBar from "./SearchBar";
import PhotoGallery from "./PhotoGallery";
import CreatePostButton from "./CreatePostButton";
import { SEARCH_KEY, BASE_URL, TOKEN_KEY } from "../constants";

const { TabPane } = Tabs;

function Home(props) {
  const [activeTab, setActiveTab] = useState("image");
  const [posts, setPosts] = useState([]);
  const [searchOption, setSearchOption] = useState({
    type: SEARCH_KEY.all,
    keyword: "",
  });

  const showPost = (postType) => {
    setActiveTab(postType);
    setTimeout(() => {
      //refresh posts list
      setSearchOption({type : SEARCH_KEY.all, keyword: ""});
    }, 3000);
  }

  const operations = <CreatePostButton onShowPost={showPost} />;

  const fetchPost = (option) => {
    const { type, keyword } = option;
    let url = "";
    if (type === SEARCH_KEY.all) {
      url = `${BASE_URL}/search`;
    } else if (type === SEARCH_KEY.user) {
      url = `${BASE_URL}/search?user=${keyword}`;
    } else {
      url = `${BASE_URL}/search?keywords=${keyword}`;
    }

    const opt = {
      method: "GET",
      url: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    };

    axios(opt)
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data);
        }
      })
      .catch((err) => {
        message.error("Fetch posts failed!");
        console.log("fetch posts failed: ", err.message);
      });
  };

  const handleSearch = (option) => {
    const { type, keyword } = option;
    setSearchOption({ type, keyword });
  };

  useEffect(() => {
    fetchPost(searchOption);
  }, [searchOption]);

  const onChange = (key) => {
    setActiveTab(key);
  };

  const renderPosts = (option) => {
    if (!posts || posts.length === 0) {
      return <div>No Data</div>;
    }
    if (option === "image") {
      //remove all non-image posts
      //add attribute to each image post
      //pass image[] to PhotoGallery
      const imageArr = posts
        .filter((post) => post.type === "image")
        .map((image) => {
          return {
            postId: image.id,
            src: image.url,
            user: image.user,
            caption: image.message,
            thumbnail: image.url,
            thumbnailWidth: 300,
            thumbnailHeight: 200,
          };
        });
      return <PhotoGallery images={imageArr} />;
    } else if (option === "video") {
      return (
        <Row gutter={32}>
          {posts
            .filter((post) => post.type === "video")
            .map((post) => (
              <Col span={8} key={post.url}>
                <video src={post.url} controls={true} className="video-block" />
                <p>
                  {post.user}: {post.message}
                </p>
              </Col>
            ))}
        </Row>
      );
    }
  };

  return (
    <div className="home">
      <SearchBar handleSearch={handleSearch} />
      <div className="display">
        <Tabs
          defaultActiveKey="image"
          activeKey={activeTab}
          onChange={onChange}
          tabBarExtraContent={operations}
        >
          <TabPane tab="Images" key="image">
            {renderPosts("image")}
          </TabPane>
          <TabPane tab="Videos" key="video">
            {renderPosts("video")}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
