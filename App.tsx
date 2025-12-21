import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, Award, RefreshCw, BookOpen, Layers, ShieldCheck, Briefcase, AlertCircle, FileText, ArrowRight, LayoutGrid } from 'lucide-react';
import { TOPICS } from './constants';
import { QuizState, Topic } from './types';

// Icons mapping for topics
const TopicIcons = {
  'block1': BookOpen,
  'block2': Layers,
  'block3': ShieldCheck,
  'block4': Briefcase,
  'block5': FileText
};

// --- Interfaces ---

interface WelcomeScreenProps {
  onStart: () => void;
}

interface TopicsScreenProps {
  onTopicSelect: (index: number) => void;
}

interface QuestionScreenProps {
  currentTopic: Topic;
  currentQuestionIndex: number;
  selectedOption: string | null;
  showFeedback: boolean;
  onOptionSelect: (id: string) => void;
  onSubmit: () => void;
  onNext: () => void;
  onAbort: () => void;
}

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  topicTitle: string;
  onRetry: () => void;
  onToModules: () => void;
}

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// --- Components ---

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 py-12 md:py-20 relative z-10 text-center flex-grow min-h-full"
  >
    {/* Decorative Logo Area */}
    <div className="mb-12 md:mb-24 relative w-full flex flex-col items-center">
      <div className="w-px h-12 md:h-24 bg-gradient-to-b from-transparent to-white/20 mb-8"></div>
      <div className="relative">
        <h1 className="text-5xl md:text-8xl font-thin tracking-[0.2em] uppercase text-white mb-6 relative z-10 ml-2 md:ml-4">Dorren</h1>
        <div className="absolute -inset-4 blur-2xl bg-dorren-lightBlue/5 rounded-full z-0"></div>
      </div>
      <div className="flex items-center gap-4 text-dorren-lightBlue tracking-[0.4em] text-[10px] md:text-xs uppercase font-medium">
        <div className="h-px w-6 md:w-8 bg-dorren-lightBlue/30"></div>
        Система Аттестации
        <div className="h-px w-6 md:w-8 bg-dorren-lightBlue/30"></div>
      </div>
    </div>
    
    <div className="max-w-xl mx-auto mb-16 md:mb-20 w-full">
      <p className="text-gray-400 font-light leading-loose text-sm md:text-base border-l border-white/10 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
        Добро пожаловать в систему проверки компетенций.
        <span className="block h-2"></span>
        Выберите модуль для подтверждения знаний стандартов, продуктов и идеологии компании.
      </p>
    </div>

    <button 
      onClick={onStart}
      className="group relative px-14 py-6 overflow-hidden bg-white text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] outline-none focus:ring-2 focus:ring-dorren-lightBlue/50"
    >
      <div className="absolute inset-0 bg-dorren-lightBlue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
      <span className="relative z-10 font-medium tracking-[0.25em] uppercase text-xs flex items-center gap-4">
        Начать тестирование
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  </motion.div>
);

const TopicsScreen: React.FC<TopicsScreenProps> = ({ onTopicSelect }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="max-w-6xl mx-auto w-full px-6 py-12 flex-grow flex flex-col justify-start"
  >
    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
      <div>
        <h2 className="text-3xl font-thin tracking-[0.15em] uppercase text-white">Модули</h2>
        <p className="text-gray-500 text-sm mt-3 font-light tracking-wide">Выберите раздел для аттестации</p>
      </div>
      <div className="hidden md:flex items-center gap-2 text-xs text-dorren-lightBlue uppercase tracking-widest">
        <LayoutGrid className="w-4 h-4" />
        {TOPICS.length} доступно
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
      {TOPICS.map((topic, index) => {
        const Icon = TopicIcons[topic.id as keyof typeof TopicIcons] || Layers;
        return (
          <button
            key={topic.id}
            onClick={() => onTopicSelect(index)}
            className="group relative flex flex-col items-start p-8 bg-black hover:bg-white/[0.03] transition-all duration-300 text-left outline-none h-full focus:bg-white/[0.05]"
          >
            {/* Hover Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-dorren-lightBlue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div className="mb-8 flex items-center justify-between w-full">
              <div className="p-3 border border-white/10 rounded-none group-hover:border-dorren-lightBlue/50 transition-colors duration-300">
                 <Icon className="w-5 h-5 text-gray-400 group-hover:text-dorren-lightBlue transition-colors duration-300 stroke-[1.5]" />
              </div>
              <span className="text-xs font-mono text-gray-700 group-hover:text-gray-500 transition-colors">
                M{(index + 1).toString().padStart(2, '0')}
              </span>
            </div>
            
            <h3 className="text-base font-normal tracking-wider mb-4 text-gray-100 group-hover:text-white transition-colors leading-relaxed">
              {topic.title}
            </h3>
            
            <p className="text-xs text-gray-500 font-light leading-relaxed mb-8 flex-grow">
              {topic.description}
            </p>
            
            <div className="w-full flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
              <span className="text-[10px] tracking-widest uppercase text-gray-600 group-hover:text-dorren-lightBlue transition-colors">
                {topic.questions.length} вопросов
              </span>
              <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        );
      })}
    </div>
  </motion.div>
);

const QuestionScreen: React.FC<QuestionScreenProps> = ({ 
  currentTopic, 
  currentQuestionIndex, 
  selectedOption, 
  showFeedback, 
  onOptionSelect, 
  onSubmit, 
  onNext, 
  onAbort 
}) => {
  const currentQuestion = currentTopic.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentTopic.questions.length) * 100;

  return (
    <motion.div 
      key="question-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto w-full px-6 py-8 md:py-12 flex flex-col flex-grow h-full"
    >
      <div className="flex-grow">
        {/* Header with Progress */}
        <div className="mb-10 md:mb-16">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col gap-1 overflow-hidden">
              <span className="text-[10px] tracking-[0.2em] uppercase text-dorren-lightBlue truncate">
                Модуль {(TOPICS.indexOf(currentTopic) + 1).toString().padStart(2, '0')}
              </span>
              <h2 className="text-xs md:text-sm tracking-widest uppercase text-gray-400 truncate font-medium">
                {currentTopic.title}
              </h2>
            </div>
            <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
               <div className="text-right">
                <span className="block text-3xl font-light text-white leading-none">
                  {(currentQuestionIndex + 1).toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-gray-600 tracking-widest">
                  из {currentTopic.questions.length}
                </span>
              </div>
              <button 
                onClick={onAbort}
                className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-red-500 hover:text-red-500 text-gray-500 transition-all bg-black hover:bg-red-500/5 outline-none"
                title="Прервать"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Architectural Progress Bar */}
          <div className="h-px w-full bg-white/10 relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-dorren-lightBlue"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
            <motion.div 
               className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-dorren-lightBlue"
               initial={{ left: 0 }}
               animate={{ left: `${progress}%` }}
               transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-12">
          <motion.h3 
            key={`q-${currentQuestion.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-3xl font-light leading-snug text-white max-w-4xl"
          >
            {currentQuestion.text}
          </motion.h3>
        </div>

        {/* Options */}
        <div className="grid gap-4">
          <AnimatePresence mode='wait'>
          {currentQuestion.options.map((option) => {
            let containerClasses = "border-white/10 text-gray-400 hover:bg-white/5 hover:border-white/30";
            let indicatorClasses = "border-white/20 text-gray-600";
            
            if (showFeedback) {
              if (option.id === currentQuestion.correctOptionId) {
                containerClasses = "border-green-500/50 bg-green-500/5 text-white shadow-[0_0_30px_rgba(34,197,94,0.05)]";
                indicatorClasses = "border-green-500 text-green-500 bg-green-500/10 font-bold";
              } else if (option.id === selectedOption) {
                containerClasses = "border-red-500/50 bg-red-500/5 text-gray-300";
                indicatorClasses = "border-red-500 text-red-500 bg-red-500/10 font-bold";
              } else {
                containerClasses = "border-white/5 text-gray-600 opacity-30 cursor-not-allowed";
                indicatorClasses = "border-white/5 text-gray-700";
              }
            } else if (selectedOption === option.id) {
              containerClasses = "border-dorren-lightBlue bg-dorren-lightBlue/5 text-white shadow-[0_0_20px_rgba(133,206,228,0.1)]";
              indicatorClasses = "border-dorren-lightBlue text-dorren-lightBlue bg-dorren-lightBlue/10 font-bold";
            }

            return (
              <motion.button
                key={option.id}
                onClick={() => onOptionSelect(option.id)}
                disabled={showFeedback}
                className={`group relative w-full p-5 md:p-6 text-left border transition-all duration-200 flex items-start gap-6 outline-none focus:ring-1 focus:ring-dorren-lightBlue/30 ${containerClasses}`}
              >
                <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border text-xs font-mono transition-colors duration-200 ${indicatorClasses}`}>
                  {option.id}
                </span>
                <span className="font-light text-sm md:text-base pt-1.5 leading-relaxed flex-grow tracking-wide break-words">
                  {option.text}
                </span>
                
                {/* Result Status Icon */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  {showFeedback && option.id === currentQuestion.correctOptionId && (
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                      <Check className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                  {showFeedback && option.id === selectedOption && option.id !== currentQuestion.correctOptionId && (
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                      <X className="w-5 h-5 text-red-500" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
          </AnimatePresence>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-12 flex justify-end border-t border-white/5 pt-8 pb-4">
        {!showFeedback ? (
            <button
            onClick={onSubmit}
            disabled={!selectedOption}
            className={`
              px-12 py-5 text-xs tracking-[0.2em] uppercase transition-all duration-300 font-medium outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-dorren-lightBlue
              ${selectedOption 
                ? 'bg-dorren-lightBlue text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'}
            `}
          >
            Подтвердить
          </button>
        ) : (
          <button
            onClick={onNext}
            className="group px-12 py-5 text-xs tracking-[0.2em] uppercase bg-white text-black hover:bg-dorren-lightBlue transition-all flex items-center gap-4 font-medium outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
          >
            {currentQuestionIndex < currentTopic.questions.length - 1 ? 'Далее' : 'Завершить'}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>

    </motion.div>
  );
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, topicTitle, onRetry, onToModules }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassed = percentage >= 80;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center flex-grow w-full max-w-2xl mx-auto px-6 py-12"
    >
      <div className="relative mb-12">
        <div className={`absolute inset-0 blur-3xl opacity-20 rounded-full ${isPassed ? 'bg-dorren-lightBlue' : 'bg-red-500'}`}></div>
        <div className={`relative w-24 h-24 flex items-center justify-center border border-white/10 bg-black/80 backdrop-blur-md ${isPassed ? 'border-dorren-lightBlue/30 shadow-[0_0_30px_rgba(133,206,228,0.1)]' : 'border-red-500/30'}`}>
          <Award className={`w-10 h-10 stroke-[1] ${isPassed ? 'text-dorren-lightBlue' : 'text-red-400'}`} />
        </div>
      </div>

      <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-6">Результаты Аттестации</span>
      <h2 className="text-3xl md:text-5xl font-thin text-white mb-4 text-center">
        {isPassed ? 'Модуль Сдан' : 'Повторите материал'}
      </h2>
      <p className="text-gray-400 mb-16 font-light max-w-md mx-auto text-sm leading-loose border-b border-white/10 pb-8 text-center">
        {topicTitle}
      </p>

      <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 mb-12 w-full max-w-md mx-auto">
        <div className="bg-black p-10 flex flex-col items-center group hover:bg-white/5 transition-colors">
          <span className="text-5xl font-thin text-white mb-3 group-hover:text-dorren-lightBlue transition-colors">{score}</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-600">Верно</span>
        </div>
        <div className="bg-black p-10 flex flex-col items-center group hover:bg-white/5 transition-colors">
          <span className={`text-5xl font-thin mb-3 transition-colors ${isPassed ? 'text-green-400' : 'text-red-400'}`}>
            {percentage}%
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-600">Результат</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
        <button
          onClick={onToModules}
          className="flex-1 px-6 py-5 border border-white/10 hover:border-white text-gray-400 hover:text-white transition-all uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 bg-transparent hover:bg-white/5 outline-none"
        >
          <Layers className="w-4 h-4" />
          В меню
        </button>
        <button
          onClick={onRetry}
          className="flex-1 px-6 py-5 bg-white text-black hover:bg-dorren-lightBlue transition-all uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 border border-transparent font-medium outline-none"
        >
          <RefreshCw className="w-4 h-4" />
          Повторить
        </button>
      </div>
    </motion.div>
  );
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, title, message, onConfirm, onCancel }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/95 backdrop-blur-sm"
          onClick={onCancel}
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-black border border-white/20 p-8 md:p-12 max-w-sm w-full shadow-[0_0_50px_rgba(255,255,255,0.05)] z-10"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 p-4 border border-white/10 rounded-full text-dorren-lightBlue">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-light mb-4 text-white uppercase tracking-widest">{title}</h3>
            <p className="text-gray-400 mb-10 font-light text-sm leading-relaxed">{message}</p>
            
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={onConfirm} 
                className="w-full py-4 text-xs uppercase tracking-widest bg-white text-black hover:bg-dorren-lightBlue transition-all border border-transparent font-medium"
              >
                Подтвердить
              </button>
              <button 
                onClick={onCancel} 
                className="w-full py-4 text-xs uppercase tracking-widest border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all text-gray-400 hover:text-white"
              >
                Отмена
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- Main App Component ---

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
  
  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: (() => void) | null;
  }>({
    isOpen: false,
    title: '',
    message: '',
    action: null
  });

  // --- Helpers ---

  const currentTopic = quizState.activeTopicIndex !== null ? TOPICS[quizState.activeTopicIndex] : null;

  const requestConfirmation = (title: string, message: string, action: () => void) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      action
    });
  };

  const handleConfirm = () => {
    if (confirmModal.action) {
      confirmModal.action();
    }
    setConfirmModal({ isOpen: false, title: '', message: '', action: null });
  };

  const closeConfirm = () => {
    setConfirmModal({ isOpen: false, title: '', message: '', action: null });
  };

  const startQuiz = (topicIndex: number) => {
    setQuizState({
      currentScreen: 'quiz',
      activeTopicIndex: topicIndex,
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      isFinished: false
    });
    setShowFeedback(false);
    setSelectedOption(null);
  };

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  const submitAnswer = () => {
    if (!currentTopic || !selectedOption) return;
    const currentQuestion = currentTopic.questions[quizState.currentQuestionIndex];

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

  const goToWelcome = () => {
    setQuizState(prev => ({ ...prev, currentScreen: 'welcome' }));
  };

  const handleHeaderClick = () => {
    if (quizState.currentScreen === 'welcome') return;

    if (quizState.currentScreen === 'quiz') {
      requestConfirmation(
        'Выход',
        'Прогресс будет утерян. Вы уверены?',
        goToWelcome
      );
    } else if (quizState.currentScreen === 'results') {
       goToWelcome();
    } else {
      goToWelcome();
    }
  };

  return (
    <div className="min-h-[100dvh] bg-dorren-black text-white selection:bg-dorren-lightBlue selection:text-black font-sans flex flex-col overflow-x-hidden">
      {/* Background Architectural Grid - Enhanced */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
        {/* Vertical Lines */}
        <div className="absolute top-0 left-[10%] w-px h-full bg-white/[0.02] hidden lg:block"></div>
        <div className="absolute top-0 right-[10%] w-px h-full bg-white/[0.02] hidden lg:block"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-white/[0.02] hidden md:block"></div>
        
        {/* Horizontal Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/[0.05]"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/[0.05]"></div>
      </div>

      <div className="relative z-10 flex-grow flex flex-col h-full">
        {/* Navigation - Fixed */}
        <header className="px-6 py-5 md:px-12 flex justify-between items-center sticky top-0 z-50 bg-dorren-black/80 backdrop-blur-md border-b border-white/5">
          <button 
            className="group flex items-center gap-4 outline-none focus:ring-1 focus:ring-dorren-lightBlue rounded-sm p-1"
            onClick={handleHeaderClick}
          >
            <div className="w-9 h-9 border border-white/20 flex items-center justify-center group-hover:bg-dorren-lightBlue group-hover:border-dorren-lightBlue transition-all duration-300">
               <span className="font-bold text-sm group-hover:text-black transition-colors">D</span>
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-lg font-light tracking-[0.2em] uppercase leading-none text-white">Dorren</span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1.5 hidden sm:block">Management Systems</span>
            </div>
          </button>
          
          <div className="flex items-center gap-4">
             {quizState.currentScreen !== 'welcome' && (
                <div className="px-4 py-1.5 border border-white/10 text-[9px] uppercase tracking-widest text-gray-400 bg-black/50 backdrop-blur-sm">
                  Аттестация
                </div>
             )}
          </div>
        </header>

        <main className="flex-grow flex flex-col relative w-full">
          <AnimatePresence mode='wait'>
            {quizState.currentScreen === 'welcome' && (
              <WelcomeScreen 
                key="welcome" 
                onStart={() => setQuizState(prev => ({ ...prev, currentScreen: 'topics' }))} 
              />
            )}
            
            {quizState.currentScreen === 'topics' && (
              <TopicsScreen 
                key="topics" 
                onTopicSelect={startQuiz} 
              />
            )}
            
            {quizState.currentScreen === 'quiz' && currentTopic && (
              <QuestionScreen 
                key="quiz"
                currentTopic={currentTopic}
                currentQuestionIndex={quizState.currentQuestionIndex}
                selectedOption={selectedOption}
                showFeedback={showFeedback}
                onOptionSelect={handleOptionSelect}
                onSubmit={submitAnswer}
                onNext={nextQuestion}
                onAbort={() => requestConfirmation('Прервать', 'Текущий прогресс будет утерян.', resetQuiz)}
              />
            )}
            
            {quizState.currentScreen === 'results' && currentTopic && (
              <ResultsScreen 
                key="results"
                score={quizState.score}
                totalQuestions={currentTopic.questions.length}
                topicTitle={currentTopic.title}
                onRetry={() => requestConfirmation('Повторить', 'Результат будет сброшен.', () => startQuiz(quizState.activeTopicIndex!))}
                onToModules={() => resetQuiz()}
              />
            )}
          </AnimatePresence>
        </main>

        <footer className="px-6 py-6 text-center md:text-right text-[9px] text-gray-600 tracking-widest uppercase relative z-10 border-t border-white/5 bg-dorren-black">
          Dorren Systems &copy; 2024
        </footer>
      </div>

      <ConfirmationDialog 
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={handleConfirm}
        onCancel={closeConfirm}
      />
    </div>
  );
};

export default App;
