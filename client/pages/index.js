import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import LoadingOverlay from "../components/LoadingOverlay";
import StatsDisplay from "../components/StatsDisplay";
import StoryDisplay from "../components/StoryDisplay";

const Container = styled.div`
  background-color: #0d0d0d;
  background-image: url("/background.jpg");
  background-size: cover;
  background-position: center;
  color: #00ff00;
  font-family: "Courier New", monospace;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #00ff00;
  font-size: 48px;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.h2`
  color: #00ff00;
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const StartButton = styled.button`
  background-color: #00ff00;
  color: #0d0d0d;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  transition: transform 0.3s;
  margin-bottom: 40px;

  &:hover {
    transform: scale(1.1);
  }
`;

const StatsContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const MACIOverlay = styled(LoadingOverlay)`
  cursor: pointer;
`;

const FrogAscii = styled.pre`
  color: #00ff00;
  font-size: 12px;
  margin-top: 20px;
  white-space: pre-wrap;
`;

const Home = () => {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [chosenPath, setChosenPath] = useState(null);
  const [started, setStarted] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8000/ws");
    socketRef.current.onmessage = handleMessage;
    return () => {
      socketRef.current.close();
    };
  }, []);

  const [showMACIOverlay, setShowMACIOverlay] = useState(false);
  const [statsHistory, setStatsHistory] = useState([]);
  const [showOverlayContent, setShowOverlayContent] = useState(true);

  const handleStart = () => {
    setStarted(true);
    socketRef.current.send(JSON.stringify({ start: true }));
  };

  const handleMessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "story") {
      setStory((prevStory) => prevStory + data.content);
    } else if (data.type === "storyEnd") {
      setStory((prevStory) => prevStory + "\n\n");
    } else if (data.type === "choices") {
      setShowMACIOverlay(true);
    } else if (data.type === "stats") {
      setStatsHistory((prevHistory) => [
        ...prevHistory,
        { stats: data.stats, choice: data.choice },
      ]);
      setShowMACIOverlay(false);
      socketRef.current.send(JSON.stringify({ choice: data.choice }));
    }
  };

  const handleMACIOverlayMouseDown = () => {
    setShowOverlayContent(false);
  };

  const handleMACIOverlayMouseUp = () => {
    setShowOverlayContent(true);
  };

  return (
    <Container>
      <Title>EtherTale</Title>
      <Subtitle>Weave Stories Together. Forever.</Subtitle>
      {!started ? (
        <StartButton onClick={handleStart}>Start Your Story</StartButton>
      ) : (
        <>
          <StoryDisplay story={story} />
          {statsHistory.map((entry, index) => (
            <StatsContainer key={index}>
              <StatsDisplay stats={entry.stats} choice={entry.choice} />
            </StatsContainer>
          ))}
          {showMACIOverlay && (
            <MACIOverlay
            showContent={showOverlayContent}
            onMouseDown={handleMACIOverlayMouseDown}
            onMouseUp={handleMACIOverlayMouseUp}
            >
              <FrogAscii>
                {`
             o  o   o  o
             |\\/ \\^/ \\/|
             |,-------.|
           ,-.|(|)   (|),-.
           \\_*._ ' '_.* _/
            /\`-.\`--' .-'\`\\
       ,--./    \`---'    \\,--.
       \\   |(  )     (  )|   /
        \\  | ||       || |  /
         \\ | /|\\     /|\\ | /
         /  \\-._     _,-/  \\
        //| \\\\  \`---'  // |\\\\
       /,-.,-.\       /,-.,-.\
            `}
              </FrogAscii>
            </MACIOverlay>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
