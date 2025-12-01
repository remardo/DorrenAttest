import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, Award, RefreshCw, BookOpen, Layers, ShieldCheck, Briefcase } from 'lucide-react';
import { TOPICS } from './constants';
import { QuizState, Topic, Question, Option } from './types';

// Icons mapping for topics
const TopicIcons = {
  'block1': BookOpen,
  'block2': Layers,
  'block3': ShieldCheck,
  'block4': Briefcase
};

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentScreen: 'welcome',
    activeTopicIndex: null,
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    isFinished: false
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  // --- Helpers ---

  const currentTopic = quizState.activeTopicIndex !== null ? TOPICS[quizState.activeTopicIndex] : null;
  const currentQuestion = currentTopic ? currentTopic.questions[quizState.currentQuestionIndex] : null;

  const startQuiz = (topicIndex: number) => {
    setQuizState({
      currentScreen: 'quiz',
      activeTopicIndex: topicIndex,
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      isFinished: false
    });
  };

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  const submitAnswer = () => {
    if (!currentQuestion || !selectedOption) return;

    setShowFeedback(true);
    const isCorrect = selectedOption === currentQuestion.correctOptionId;

    setQuizState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: { ...prev.answers, [currentQuestion.id]: selectedOption }
    }));
  };

  const nextQuestion = () => {
    if (!currentTopic) return;
    
    setShowFeedback(false);
    setSelectedOption(null);

    if (quizState.currentQuestionIndex < currentTopic.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        currentScreen: 'results',
        isFinished: true
      }));
    }
  };

  const resetQuiz = () => {
    setQuizState({
      currentScreen: 'topics',
      activeTopicIndex: null,
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      isFinished: false
    });
    setShowFeedback(false);
    setSelectedOption(null);
  };

  // --- Screens ---

  const WelcomeScreen = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-2xl mx-auto px-6"
    >
      <div className="mb-12 border-b border-white pb-8 w-full">
        <h1 className="text-4xl md:text-6xl font-thin tracking-ultra uppercase mb-2">Dorren</h1>
        <p className="text-dorren-lightBlue tracking-widest text-sm md:text-base uppercase mt-4">Управление проёмами</p>
      </div>
      
      <h2 className="text-2xl font-light mb-6 tracking-wide">Система Аттестации</h2>
      <p className="text-gray-400 mb-12 font-light leading-relaxed">
        Добро пожаловать в официальную систему проверки знаний продукции и стандартов Dorren. 
        Пожалуйста, выберите модуль для начала тестирования.
      </p>

      <button 
        onClick={() => setQuizState(prev => ({ ...prev, currentScreen: 'topics' }))}
        className="group relative px-10 py-4 overflow-hidden rounded-none border border-white/30 text-white transition-all hover:bg-white/5"
      >
        <span className="relative z-10 font-light tracking-widest uppercase text-sm flex items-center gap-3">
          Начать
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </button>
    </motion.div>
  );

  const TopicsScreen = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto w-full px-6 py-12"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-thin tracking-widest uppercase mb-4">Выберите модуль</h2>
        <div className="h-px w-24 bg-dorren-lightBlue mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOPICS.map((topic, index) => {
          const Icon = TopicIcons[topic.id as keyof typeof TopicIcons] || Layers;
          return (
            <button
              key={topic.id}
              onClick={() => startQuiz(index)}
              className="group flex flex-col items-start p-8 border border-white/10 hover:border-dorren-lightBlue hover:scale-[1.02] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 text-left"
            >
              <div className="mb-6 p-3 rounded-full bg-white/5 group-hover:bg-dorren-darkBlue transition-colors duration-300">
                <Icon className="w-6 h-6 text-dorren-lightBlue" />
              </div>
              <h3 className="text-xl font-light tracking-wide mb-3 group-hover:text-dorren-lightBlue transition-colors">
                {topic.title}
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                {topic.description}
              </p>
              <div className="mt-6 flex items-center text-xs tracking-widest uppercase text-gray-500 group-hover:text-white transition-colors">
                {topic.questions.length} Вопросов <ChevronRight className="w-3 h-3 ml-2" />
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );

  const QuestionScreen = () => {
    if (!currentQuestion || !currentTopic) return null;

    const progress = ((quizState.currentQuestionIndex + 1) / currentTopic.questions.length) * 100;

    return (
      <motion.div 
        key="question-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-3xl mx-auto w-full px-6 py-8 md:py-12 flex flex-col min-h-screen"
      >
        {/* Header with Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <span className="text-xs tracking-widest uppercase text-dorren-lightBlue">
              {currentTopic.title}
            </span>
            <span className="text-xl font-thin text-white/50">
              <span className="text-white">{quizState.currentQuestionIndex + 1}</span>
              <span className="text-sm mx-1">/</span>
              <span className="text-sm">{currentTopic.questions.length}</span>
            </span>
          </div>
          <div className="h-0.5 w-full bg-white/10">
            <motion.div 
              className="h-full bg-dorren-lightBlue"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="flex-grow">
          <motion.h3 
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl font-light leading-snug mb-10"
          >
            {currentQuestion.text}
          </motion.h3>

          <div className="space-y-4">
            <AnimatePresence mode='wait'>
            {currentQuestion.options.map((option) => {
              let stateClasses = "border-white/10 hover:border-white/30 text-gray-300";
              
              if (showFeedback) {
                if (option.id === currentQuestion.correctOptionId) {
                  stateClasses = "border-green-500/50 bg-green-500/10 text-white";
                } else if (option.id === selectedOption) {
                  stateClasses = "border-red-500/50 bg-red-500/10 text-white";
                } else {
                  stateClasses = "border-white/5 text-gray-500 opacity-50";
                }
              } else if (selectedOption === option.id) {
                stateClasses = "border-dorren-lightBlue bg-dorren-lightBlue/10 text-white";
              }

              return (
                <motion.button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={showFeedback}
                  className={`w-full p-6 text-left border transition-all duration-200 flex items-start group ${stateClasses}`}
                  whileHover={!showFeedback ? { scale: 1.01 } : {}}
                  whileTap={!showFeedback ? { scale: 0.99 } : {}}
                >
                  <span className={`mr-4 font-mono text-xs mt-1 ${showFeedback && option.id === currentQuestion.correctOptionId ? 'text-green-400' : 'text-gray-500'}`}>
                    {option.id}
                  </span>
                  <span className="font-light text-sm md:text-base">{option.text}</span>
                  {showFeedback && option.id === currentQuestion.correctOptionId && (
                    <Check className="ml-auto w-5 h-5 text-green-500" />
                  )}
                  {showFeedback && option.id === selectedOption && option.id !== currentQuestion.correctOptionId && (
                    <X className="ml-auto w-5 h-5 text-red-500" />
                  )}
                </motion.button>
              );
            })}
            </AnimatePresence>
          </div>

          {/* Actions - Moved closer to question options */}
          <div className="mt-4 flex justify-end">
            {!showFeedback ? (
               <button
               onClick={submitAnswer}
               disabled={!selectedOption}
               className={`px-8 py-3 text-sm tracking-widest uppercase border transition-all ${
                 selectedOption 
                   ? 'bg-white text-black border-white hover:bg-gray-200' 
                   : 'border-white/10 text-white/30 cursor-not-allowed'
               }`}
             >
               Ответить
             </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-8 py-3 text-sm tracking-widest uppercase bg-dorren-lightBlue text-black border border-dorren-lightBlue hover:bg-white hover:border-white transition-all flex items-center gap-2"
              >
                {quizState.currentQuestionIndex < currentTopic.questions.length - 1 ? 'Далее' : 'Завершить'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </motion.div>
    );
  };

  const ResultsScreen = () => {
    if (!currentTopic) return null;
    
    const percentage = Math.round((quizState.score / currentTopic.questions.length) * 100);
    const isPassed = percentage >= 80;

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen text-center max-w-2xl mx-auto px-6"
      >
        <div className="mb-8 p-6 rounded-full border border-white/10 bg-white/5">
          <Award className={`w-12 h-12 ${isPassed ? 'text-dorren-lightBlue' : 'text-gray-400'}`} />
        </div>

        <h2 className="text-3xl font-thin uppercase tracking-widest mb-2">
          {isPassed ? 'Аттестация пройдена' : 'Попробуйте снова'}
        </h2>
        <p className="text-gray-400 mb-8 font-light">
          {currentTopic.title}
        </p>

        <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 mb-12 w-full max-w-md">
          <div className="bg-black p-6 flex flex-col items-center">
            <span className="text-4xl font-light text-white mb-1">{quizState.score}</span>
            <span className="text-xs uppercase tracking-widest text-gray-500">Верно</span>
          </div>
          <div className="bg-black p-6 flex flex-col items-center">
            <span className={`text-4xl font-light mb-1 ${isPassed ? 'text-green-400' : 'text-red-400'}`}>
              {percentage}%
            </span>
            <span className="text-xs uppercase tracking-widest text-gray-500">Результат</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
          <button
            onClick={resetQuiz}
            className="flex-1 px-8 py-4 border border-white/20 hover:border-white text-white transition-colors uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4" />
            К модулям
          </button>
          <button
            onClick={() => startQuiz(quizState.activeTopicIndex!)}
            className="flex-1 px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Повторить
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-dorren-lightBlue selection:text-black font-sans">
      {/* Background Elements for Architecture Feel */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-12 w-px h-full bg-white/5 hidden md:block"></div>
        <div className="absolute top-0 right-12 w-px h-full bg-white/5 hidden md:block"></div>
        <div className="absolute top-12 left-0 w-full h-px bg-white/5 hidden md:block"></div>
        <div className="absolute bottom-12 left-0 w-full h-px bg-white/5 hidden md:block"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Simple Nav */}
        <header className="p-6 md:px-12 md:py-8 flex justify-between items-center bg-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
          <div 
            className="text-xl font-thin tracking-ultra uppercase cursor-pointer select-none"
            onClick={() => quizState.currentScreen !== 'quiz' && setQuizState(prev => ({ ...prev, currentScreen: 'welcome' }))}
          >
            DORREN
          </div>
          {quizState.currentScreen !== 'welcome' && (
             <div className="text-xs tracking-widest text-gray-500 uppercase">
                Аттестация
             </div>
          )}
        </header>

        <main className="flex-grow flex flex-col justify-center">
          <AnimatePresence mode='wait'>
            {quizState.currentScreen === 'welcome' && <WelcomeScreen key="welcome" />}
            {quizState.currentScreen === 'topics' && <TopicsScreen key="topics" />}
            {quizState.currentScreen === 'quiz' && <QuestionScreen key="quiz" />}
            {quizState.currentScreen === 'results' && <ResultsScreen key="results" />}
          </AnimatePresence>
        </main>

        <footer className="p-6 md:p-8 text-center text-xs text-white/20 tracking-widest uppercase">
          &copy; 2024 Dorren. Internal Use Only.
        </footer>
      </div>
    </div>
  );
};

export default App;