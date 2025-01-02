import React, { useState, useEffect } from "react";
import { getCurrentBallotApi, getCurrentBallotVotesApi } from '../../api/voteApi';
import he from 'he';
import { Player, PlayerData } from "../types/playerDataTypes";
import PlayerDisplay from "../common/PlayerDisplay";
import UnknownPlayerDisplay from "../common/UnknownPlayerDisplay";

interface HostDisplayBallotProps {
  gameId: string;
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

const HostDisplayBallot: React.FC<HostDisplayBallotProps> = ({ gameId, displayingVotes }) => {
  const [answers, setAnswers] = useState<AnswerDisplay[]>([]);
  const [question, setQuestion] = useState<QuestionDisplay | null>(null);
  const [votes, setVotes] = useState<VoteDisplay[]>([]);

  useEffect(() => {
    const fetchBallotData = async () => {
      const currentBallot = await getCurrentBallotApi(gameId);
      setQuestion(currentBallot.question);
      setAnswers(currentBallot.answers);
      console.log(currentBallot);

      if (displayingVotes) {
        const currentBallotVotes = await getCurrentBallotVotesApi(gameId);
        setVotes(currentBallotVotes);
      }
    };

    fetchBallotData();
  }, [gameId, displayingVotes]); // Add dependencies to ensure fresh data is fetched

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

  const renderPlayerOrUnknown = (isQuestion: boolean, entity: { player?: Player }) => {
    if (displayingVotes && entity.player) {
      return <PlayerDisplay player={entity.player} />;
    }
    return <UnknownPlayerDisplay purpose={isQuestion ? "QUESTION" : "ANSWER"} />;
  };

  const renderAnswerContent = (answer: AnswerDisplay) => {
    return answer.userSubmitted ?
      <h2>{he.decode(answer.content)}</h2> :
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
    <div className="container invisible-container">
      <p className="game-flow">Vote for the best answer:</p>
      <div className="conversation-card question game-flow slide-in-from-left">
        {renderPlayerOrUnknown(true, { player: question?.player })}
        <div className="question-display">
          {question && <h2>{he.decode(question.content)}</h2>}
        </div>
      </div>
      <div className="answer-grid">
        {answers.map((answer) => (
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
  );
};

export default HostDisplayBallot;

