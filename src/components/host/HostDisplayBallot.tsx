import React, { useState, useEffect } from "react";
import { getCurrentBallotApi, getCurrentBallotVotesApi } from '../../api/voteApi';
import he from 'he';
import { Player, PlayerData } from "../types/playerDataTypes";
import PlayerDisplay from "../common/PlayerDisplay";
import UnknownPlayerDisplay from "../common/UnknownPlayerDisplay";
import Timer from "../common/Timer";
import { GameData } from "../types/GameDataTypes";

interface HostDisplayBallotProps {
  gameData: GameData;
  displayingVotes: boolean;
}

interface AnswerDisplay {
  content: string;
  answerId: string;
  player: Player;
  userSubmitted: boolean;
}

interface QuestionDisplay {
  content: string;
  questionId: string;
  player: Player;
}

interface VoteDisplay {
  player: Player;
  answerId: string;
}

const HostDisplayBallot: React.FC<HostDisplayBallotProps> = ({ gameData, displayingVotes }) => {
  const [answers, setAnswers] = useState<AnswerDisplay[]>([]);
  const [question, setQuestion] = useState<QuestionDisplay | null>(null);
  const [votes, setVotes] = useState<VoteDisplay[]>([]);

  useEffect(() => {
    const fetchBallotData = async () => {
      const currentBallot = await getCurrentBallotApi(gameData.gameId);
      setQuestion(currentBallot.question);
      setAnswers(currentBallot.answers);
      console.log(currentBallot);

      if (displayingVotes) {
        const currentBallotVotes = await getCurrentBallotVotesApi(gameData.gameId);
        setVotes(currentBallotVotes);
      }
    };

    fetchBallotData();
  }, [gameData.gameId, displayingVotes]); // Add dependencies to ensure fresh data is fetched

  useEffect(() => {
          const rootElement = document.getElementById("root");
          if (rootElement) {
                      rootElement.classList.add('no-dots');
          }
          return () => {
              if (rootElement) {
                  rootElement.classList.remove('no-dots');
              }
          };
      }, []);

  const applyHyphenation = (text: string) => {
    const words = text.split(' ');

    // Apply soft hyphen to words longer than a threshold (e.g., 10 characters)
    const newText = words.map(word => {
      if (word.length > 15) {
        return word.split('').join('\u00AD'); // Add soft hyphen after each letter
      }
      return word;
    }).join(' ');

    return newText;
  };

  const renderPlayerOrUnknown = (isQuestion: boolean, entity: { player?: Player }) => {
    if (displayingVotes && entity.player) {
      return <PlayerDisplay player={entity.player} />;
    }
    return <UnknownPlayerDisplay purpose={isQuestion ? "QUESTION" : "ANSWER"} />;
  };

  const renderAnswerContent = (answer: AnswerDisplay) => {
    return answer.userSubmitted ?
      <h2>{applyHyphenation(he.decode(answer.content))}</h2> :
      <h2>oops. no answer submitted</h2>;
  };

  const renderVotes = (answer: AnswerDisplay) => {
    const answerVotes = votes.filter(vote => vote.answerId === answer.answerId);
    return answerVotes.length > 0 && (
      <div className="votes">
        voted for by:
        {answerVotes.map((vote, index) => (
          <PlayerDisplay key={`${vote.player.name}-${index}`} player={vote.player}/>
        ))}
      </div>
    );
  };

  return (
    <>
    <div className="absolute-top-left appear-after-2s">
        <Timer gameData={gameData}/>
    </div>
    <div className="container invisible-container">
      
      <p className="game-flow slide-in-from-left shrink text-glow">Pick the best answer</p>
      <div className="conversation-card question game-flow slide-in-from-left">
        {renderPlayerOrUnknown(true, { player: question?.player })}
        <div className="question-display">
          {question && <h2>{applyHyphenation(he.decode(question.content))}</h2>}
        </div>
      </div>
      <div className="answer-grid">
        {answers.map((answer, i) => (
          <div className={`conversation-card answer game-flow slide-in-from-left ${answer.userSubmitted ? '' : 'failure'}`} key={answer.answerId || answer.player.playerId}>
            {renderPlayerOrUnknown(false, { player: answer.player })}
            <div className="answer-display">
              {renderAnswerContent(answer)}
              {renderVotes(answer)}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default HostDisplayBallot;

