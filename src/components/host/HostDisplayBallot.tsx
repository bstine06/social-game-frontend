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
        {answerVotes.map((vote, index) => (
          <div key={`${vote.player.name}-${index}`} className="vote">{vote.player.name}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h2>Vote for the best answer:</h2>
      <div className="conversation-card">
        {renderPlayerOrUnknown(true, { player: question?.player })}
        <div className="question-display">
          {question && <h2>{he.decode(question.content)}</h2>}
        </div>
      </div>
      <div className="answer-grid">
        {answers.map((answer) => (
          <div className={`conversation-card ${answer.userSubmitted ? '' : 'failure'}`} key={answer.answerId || answer.player.playerId}>
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

