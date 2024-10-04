import React, { useState, useEffect } from "react";
import { getCurrentBallotApi, getCurrentBallotVotesApi } from '../../api/voteApi';
import he from 'he';

interface HostDisplayBallotProps {
  gameId: string;
  displayingVotes: boolean;
}

interface AnswerDisplay {
  content: string;
  answerId: string;
  playerName: string;
}

interface QuestionDisplay {
  content: string;
  questionId: string;
  playerName: string;
}

interface VoteDisplay {
  playerName: string;
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

      if (displayingVotes) {
        const currentBallotVotes = await getCurrentBallotVotesApi(gameId);
        setVotes(currentBallotVotes);
      }
    };

    fetchBallotData();
  }, [gameId, displayingVotes]); // Add dependencies to ensure fresh data is fetched

  return (
    <div className="container">
      {question && <h2>{he.decode(question.content)}</h2>}
      <div className="answer-grid">
        {answers.map((answer) => {
          const answerVotes = votes.filter(vote => vote.answerId === answer.answerId);
          return (
            <div className="answer-display" key={answer.answerId}>
              <div className="answer-content">
                <p>{he.decode(answer.content)}</p>
                {answerVotes.length > 0 && (
                  <div className="votes">
                    {answerVotes.map((vote, index) => (
                      <div key={`${vote.playerName}-${index}`} className="vote">{vote.playerName}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HostDisplayBallot;

