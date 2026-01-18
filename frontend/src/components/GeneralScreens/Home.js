import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import SkeletonStory from "../Skeletons/SkeletonStory";
import CardStory from "../StoryScreens/CardStory";
import NoStories from "../StoryScreens/NoStories";
import Pagination from "./Pagination";
import { AuthContext } from "../../Context/AuthContext";
import SearchForm from "./SearchForm";
import styled from "styled-components";

const Home = () => {
  const bool = localStorage.getItem("authToken") ? true : false;
  const [auth, setAuth] = useState(bool);
  const search = useLocation().search;
  const searchKey = new URLSearchParams(search).get("search");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const handleStoryUpdate = (updatedStory) => {
    setStories(prevStories => 
      prevStories.map(story => 
        story._id === updatedStory._id || story.slug === updatedStory.slug 
          ? updatedStory 
          : story
      )
    );
  };

  useEffect(() => {
    setAuth(bool);
    setTimeout(() => {
      setLoading(false);
    }, 1600);
  }, [bool]);

  useEffect(() => {
    const getStories = async () => {
      setLoading(true);
      try {
        let url = `https://global-logistics-isu8.onrender.com/story/getAllStories?page=${page}`;
        if (searchKey) {
          url += `&search=${searchKey}`;
        }
        const { data } = await axios.get(url);

        setStories(data.data || []);
        setPages(data.pages || 1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setStories([]);
        setPages(1);
        setLoading(false);
      }
    };
    getStories();
  }, [searchKey, page]);

  useEffect(() => {
    setPage(1);
  }, [searchKey]);

  return (
    <HomeContainer>
      <SearchForm />
      {loading ? (
        <SkeletonContainer>
          {[...Array(6)].map(() => (
            <SkeletonStory key={uuidv4()} />
          ))}
        </SkeletonContainer>
      ) : (
        <ContentWrapper>
          {auth ? (
            <>
              {stories.length !== 0 ? (
                <StoriesGrid>
                  {stories.map((story) => (
                    <CardStory key={uuidv4()} story={story} onUpdate={handleStoryUpdate} />
                  ))}
                </StoriesGrid>
              ) : (
                <NoStories />
              )}
              {stories.length > 0 && (
                <Pagination page={page} pages={pages} changePage={setPage} />
              )}
            </>
          ) : (
            <>
              {searchKey ? (
                stories.length > 0 ? (
                  <StoriesGrid>
                    <CardStory story={stories[0]} onUpdate={handleStoryUpdate} />
                  </StoriesGrid>
                ) : (
                  <NoStories />
                )
              ) : (
                <EmptyState>
                  <EmptyStateIcon>📦</EmptyStateIcon>
                  <EmptyStateTitle>Track Your Package</EmptyStateTitle>
                  <EmptyStateText>
                    Enter your tracking ID in the search form above to view your package details and current location.
                  </EmptyStateText>
                </EmptyState>
              )}
            </>
          )}
        </ContentWrapper>
      )}
    </HomeContainer>
  );
};

export default Home;

// Styled Components
const theme = {
  darkGreen: "#1b4d3e",
  darkGreenHover: "#2a6b5a",
  lightGreen: "#7CB342",
  lightGreenHover: "#8BC34A",
  textLight: "#ffffff",
  textDark: "#2c3e50",
  textGray: "#5a6c7d",
  white: "#ffffff",
  shadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  shadowMedium: "0 8px 16px rgba(0, 0, 0, 0.15)",
  shadowLarge: "0 12px 24px rgba(0, 0, 0, 0.2)",
};

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 40px;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 60px 40px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 4px;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: 30px 20px;
    max-width: 1200px;
  }

  @media (min-width: 992px) {
    padding: 40px 20px;
  }
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
  margin-bottom: 30px;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    gap: 30px;
    margin-bottom: 40px;
  }

  @media (min-width: 992px) {
    gap: 40px;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
  background-color: ${theme.white};
  border-radius: 16px;
  box-shadow: ${theme.shadow};
  max-width: 600px;
  margin: 0 auto;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.8;
`;

const EmptyStateTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.textDark};
  margin-bottom: 15px;
  letter-spacing: -0.5px;

  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

const EmptyStateText = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${theme.textGray};
  font-weight: 400;
  max-width: 500px;

  @media (min-width: 768px) {
    font-size: 1.15rem;
  }
`;
