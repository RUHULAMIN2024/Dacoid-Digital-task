import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: { [key: number]: string };
  score: number;
}

const initialState: QuizState = {
  questions: [
    {
      id: 1,
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correctAnswer: "Mercury",
    },
    {
      id: 2,
      question:
        "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correctAnswer: "Queue",
    },
    {
      id: 3,
      question:
        "Which of the following is primarily used for structuring web pages?",
      options: ["Python", "Java", "HTML", "C++"],
      correctAnswer: "HTML",
    },
    {
      id: 4,
      question: "Which chemical symbol stands for Gold?",
      options: ["Au", "Gd", "Ag", "Pt"],
      correctAnswer: "Au",
    },
    {
      id: 5,
      question:
        "Which of these processes is not typically involved in refining petroleum?",
      options: [
        "Fractional distillation",
        "Cracking",
        "Polymerization",
        "Filtration",
      ],
      correctAnswer: "Filtration",
    },
  ],
  currentQuestionIndex: 0,
  selectedAnswers: {},
  score: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    selectAnswer: (
      state,
      action: PayloadAction<{ questionId: number; answer: string }>
    ) => {
      state.selectedAnswers[action.payload.questionId] = action.payload.answer;
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
    calculateScore: (state) => {
      let score = 0;
      state.questions.forEach((q) => {
        if (state.selectedAnswers[q.id] === q.correctAnswer) {
          score += 1;
        }
      });
      state.score = score;
    },
  },
});

export const { selectAnswer, nextQuestion, calculateScore } = quizSlice.actions;
export default quizSlice.reducer;
