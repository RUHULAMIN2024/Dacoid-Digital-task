import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectAnswer, nextQuestion, calculateScore } from "../redux/quizSlice";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

const Quiz = () => {
  const dispatch = useAppDispatch();
  const { questions, currentQuestionIndex, selectedAnswers, score } =
    useAppSelector((state) => state.quiz);

  const [timeLeft, setTimeLeft] = useState(30);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!questions.length) return <p>Loading...</p>;

  const handleAnswerSelection = (answer: string) => {
    dispatch(
      selectAnswer({ questionId: questions[currentQuestionIndex].id, answer })
    );
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
      setTimeLeft(30);
    } else {
      dispatch(calculateScore());
      setShowModal(true);
    }
  };

  const restartQuiz = () => {
    window.location.reload(); // Simple restart method
  };

  // Calculate correct and incorrect answers so far
  const correctAnswers = questions.filter(
    (q) => q.correctAnswer === selectedAnswers[q.id]
  ).length;
  const incorrectAnswers = currentQuestionIndex + 1 - correctAnswers;

  return (
    <motion.div
      className="max-w-lg mx-auto mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="dark:bg-gray-900 dark:text-white">
        <CardHeader>
          <CardTitle>
            Quiz {currentQuestionIndex + 1} / {questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.h2
            className="text-xl font-semibold"
            key={questions[currentQuestionIndex].id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            {questions[currentQuestionIndex].question}
          </motion.h2>

          <div className="mt-4">
            {questions[currentQuestionIndex].options.map((option) => (
              <motion.button
                key={option}
                className={`block w-full py-2 px-4 my-2 text-left border rounded-lg 
                  ${
                    selectedAnswers[questions[currentQuestionIndex].id] ===
                    option
                      ? "bg-blue-500 text-white dark:bg-blue-600"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  }`}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerSelection(option)}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <Progress
            value={(timeLeft / 30) * 100}
            className="mt-4 dark:bg-gray-700"
          />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Time Left: {timeLeft}s
          </p>

          <motion.button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </motion.button>

          {/* Per-Question Scoreboard */}
          <div className="mt-6 text-center p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
            <h3 className="font-bold text-lg">Scoreboard</h3>
            <p className="text-green-500 font-semibold">
              Correct Answers: {correctAnswers}
            </p>
            <p className="text-red-500 font-semibold">
              Incorrect Answers: {incorrectAnswers}
            </p>
            <p className="font-bold">Current Score: {score}</p>
          </div>
        </CardContent>
      </Card>

      {/* Final Scoreboard Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="dark:bg-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle>Final Scoreboard</DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="text-xl font-bold">
              Total Score: {score} / {questions.length}
            </p>
            <p className="text-green-500 font-semibold">
              Correct Answers: {correctAnswers}
            </p>
            <p className="text-red-500 font-semibold">
              Incorrect Answers: {incorrectAnswers}
            </p>
          </div>
          <Button
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={restartQuiz}
          >
            Restart Quiz
          </Button>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Quiz;
