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
  const [answers, setAnswers] = useState<AnswerDisplay[]>([]); // Initialize the state as an empty array
  const [question, setQuestion] = useState<QuestionDisplay | null>(null);
  const [votes, setVotes] = useState<VoteDisplay[]>([]);

  useEffect(() => {
    const getCurrentBallot = async (gameId: string) => {
      const currentBallot = await getCurrentBallotApi(gameId);
      setQuestion(currentBallot.question);
      setAnswers(currentBallot.answers);
    };

    const getCurrentBallotVotes = async (gameId: string) => {
      const currentBallotVotes = await getCurrentBallotVotesApi(gameId);
      setVotes(currentBallotVotes);
    }

    getCurrentBallot(gameId);
    if (displayingVotes) getCurrentBallotVotes(gameId);
  }, []);
  
  const votesByAnswerId = votes.reduce((acc, vote) => {
    if (!acc[vote.answerId]) {
      acc[vote.answerId] = [];
    }
    acc[vote.answerId].push(vote.playerName);
    return acc;
  }, {} as Record<string, string[]>);

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
                    {answerVotes.map(vote => (
                      <div key={vote.playerName} className="vote">{vote.playerName}</div>
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
