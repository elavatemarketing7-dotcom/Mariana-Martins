import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ChevronRight, MessageSquare, ArrowRight, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { QuizQuestion, QuizResponse } from "../types";

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual área do seu sorriso ou rosto você gostaria de valorizar?",
    options: [
      { text: "Sorriso (Alinhamento, dentes mais claros e harmônicos)", value: "sorriso" },
      { text: "Lábios (Volume, contorno e hidratação natural)", value: "labios" },
      { text: "Expressão (Suavizar olheiras, rugas ou linhas de expressão)", value: "expressao" },
      { text: "Harmonização Completa (Equilíbrio entre face e sorriso)", value: "completo" }
    ]
  },
  {
    id: 2,
    question: "Qual o seu maior desejo ao realizar um procedimento?",
    options: [
      { text: "Resultado ultra-natural, sem parecer que fiz procedimentos", value: "naturalidade" },
      { text: "Segurança absoluta, com materiais nobres e técnica precisa", value: "seguranca" },
      { text: "Atendimento exclusivo de ponta a ponta com a própria Dra.", value: "exclusividade" },
      { text: "Recuperar a autoestima e jovialidade de forma elegante", value: "autoestima" }
    ]
  },
  {
    id: 3,
    question: "Você já realizou algum procedimento estético anteriormente?",
    options: [
      { text: "Sim, já realizei e gosto de manter meus cuidados", value: "ja_realizou" },
      { text: "Não, essa seria a minha primeira experiência", value: "primeira_vez" }
    ]
  },
  {
    id: 4,
    question: "Qual o momento ideal para iniciar a sua transformação?",
    options: [
      { text: "O quanto antes, quero agendar minha consulta este mês", value: "imediato" },
      { text: "Estou me planejando para os próximos meses", value: "planejado" },
      { text: "Gostaria de tirar dúvidas em uma avaliação personalizada", value: "duvidas" }
    ]
  }
];

interface InteractiveQuizProps {
  onClose: () => void;
  expertWhatsapp: string;
}

export default function InteractiveQuiz({ onClose, expertWhatsapp }: InteractiveQuizProps) {
  const [stage, setStage] = useState<"welcome" | "quiz" | "analyzing" | "result">("welcome");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);

  // Handle Loading animation
  useEffect(() => {
    let interval: any;
    if (stage === "analyzing") {
      setAnalyzingProgress(0);
      interval = setInterval(() => {
        setAnalyzingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStage("result");
            }, 500);
            return 100;
          }
          return prev + 4; // increment fast enough for good UX but slow enough to look real
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [stage]);

  const handleOptionSelect = (optionText: string) => {
    const newResponses = [
      ...responses,
      {
        questionId: QUESTIONS[currentQuestionIdx].id,
        questionText: QUESTIONS[currentQuestionIdx].question,
        selectedOptionText: optionText,
      },
    ];
    setResponses(newResponses);

    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setStage("analyzing");
    }
  };

  const constructWhatsappMessage = () => {
    let text = `Olá Dra. Mariana Martins! Acabei de realizar a Avaliação Personalizada no seu site e gostaria de agendar uma consulta.\n\n`;
    text += `*MEU PERFIL DE AVALIAÇÃO:*\n`;
    responses.forEach((resp, idx) => {
      text += `*${idx + 1}. ${resp.questionText}*\n👉 _${resp.selectedOptionText}_\n\n`;
    });
    text += `Aguardo seu retorno para agendarmos a minha sessão exclusiva!`;
    return text;
  };

  const handleSendQuizToWhatsapp = () => {
    const text = constructWhatsappMessage();
    const cleanUrl = expertWhatsapp.split("?")[0];
    const targetUrl = `${cleanUrl}?text=${encodeURIComponent(text)}`;
    window.open(targetUrl, "_blank");
  };

  const handleDirectWhatsapp = () => {
    window.open(expertWhatsapp, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 flex items-center justify-center p-3 sm:p-4 md:p-6 backdrop-blur-md">
      {/* Dynamic glow effect background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md bg-[#161814] border border-[#2a2d26] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden my-auto">
        {/* Floating expert thumbnail indicator at top of dialog - Present throughout the entire Quiz */}
        <div className="flex items-center gap-3 border-b border-[#2a2d26] pb-3 sm:pb-4 mb-4 sm:mb-5">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#c5a367] p-0.5 bg-[#1a1d16]">
              <img
                src="https://i.imgur.com/gomyM5K.png"
                alt="Dra. Mariana Martins"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-900 rounded-full"></div>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-100 font-sans">
              Dra. Mariana Martins
            </h4>
            <p className="text-[10px] sm:text-[11px] text-[#c5a367] font-medium uppercase tracking-wider">
              Harmonização Facial e Dental
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STAGE 1: WELCOME SCREEN */}
          {stage === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col text-center"
            >
              <div className="inline-flex mx-auto p-2 sm:p-3 bg-[#2a2d26] border border-[#c5a36733] rounded-full mb-3 sm:mb-4">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#c5a367] animate-pulse" />
              </div>

              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-tight leading-snug">
                Descubra o Tratamento Ideal Para Você
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 sm:mt-2 mb-4 sm:mb-6 leading-relaxed">
                Antes de acessar o site, responda à nossa rápida avaliação personalizada. Leva menos de 1 minuto e ajudará a compreender suas expectativas para um resultado perfeitamente natural.
              </p>

              {/* Main Quiz CTA */}
              <button
                id="btn-start-quiz"
                onClick={() => setStage("quiz")}
                className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-gold-500 via-[#c5a367] to-gold-600 hover:from-gold-600 hover:to-gold-700 text-zinc-950 font-bold rounded-xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mb-2 sm:mb-3 cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
              >
                <span>Começar Avaliação</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Alternative: Direct to WhatsApp */}
              <button
                id="btn-direct-whatsapp-welcome"
                onClick={handleDirectWhatsapp}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-[#1a1d16] hover:bg-[#2a2d26] text-emerald-400 border border-emerald-500/30 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 mb-2.5 sm:mb-3 cursor-pointer text-xs sm:text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Falar Direto no WhatsApp
              </button>

              {/* Alternative: Just view site */}
              <button
                id="btn-skip-quiz-welcome"
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-300 text-[11px] sm:text-xs font-medium py-1 sm:py-2 transition-all underline underline-offset-4 cursor-pointer"
              >
                Prefiro ir direto para o site
              </button>
            </motion.div>
          )}

          {/* STAGE 2: ACTIVE QUIZ */}
          {stage === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col"
            >
              {/* Question indicator & Progress bar */}
              <div className="mb-4 sm:mb-5">
                <div className="flex justify-between items-center text-[10px] sm:text-xs text-zinc-400 mb-1 sm:mb-1.5 font-medium">
                  <span className="text-[#c5a367] font-semibold uppercase tracking-wider">Avaliação Exclusiva</span>
                  <span>{currentQuestionIdx + 1} de {QUESTIONS.length}</span>
                </div>
                <div className="w-full bg-[#2a2d26] h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#c5a367] to-gold-300 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question label */}
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-white mb-4 sm:mb-5 leading-snug min-h-0 sm:min-h-[40px]">
                {QUESTIONS[currentQuestionIdx].question}
              </h3>

              {/* Option cards */}
              <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
                {QUESTIONS[currentQuestionIdx].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option.text)}
                    className="w-full text-left p-3 sm:p-4 bg-[#2a2d26] hover:bg-[#1a1d16]/80 border border-[#c5a36733] hover:border-[#c5a367] rounded-xl transition-all duration-150 group flex items-center justify-between active:scale-[0.99] cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white pr-3">
                      {option.text}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600 group-hover:text-[#c5a367] transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>

              {/* Header/skip bar */}
              <div className="flex justify-between items-center border-t border-[#2a2d26] pt-3 sm:pt-4 mt-1 sm:mt-2">
                <p className="text-[10px] sm:text-[11px] text-zinc-500">Sua privacidade está 100% segura.</p>
                <button
                  onClick={onClose}
                  className="text-zinc-400 hover:text-zinc-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                >
                  Pular
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: ANALYZING LOADING BAR */}
          {stage === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center py-6 sm:py-8"
            >
              <RefreshCw className="w-10 h-10 sm:w-12 sm:h-12 text-[#c5a367] animate-spin mb-4 sm:mb-5" />
              <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight">Analisando suas respostas...</h3>
              <p className="text-zinc-400 text-xs mt-1.5 sm:mt-2 mb-4 sm:mb-6 max-w-xs">
                Processando compatibilidade com o método exclusivo de rejuvenescimento e harmonização da Dra. Mariana Martins.
              </p>
              
              {/* Custom linear progress bar */}
              <div className="w-full bg-[#2a2d26] h-2.5 rounded-full overflow-hidden p-0.5 max-w-sm mb-2">
                <div
                  className="bg-gradient-to-r from-gold-600 via-gold-400 to-[#c5a367] h-1.5 rounded-full transition-all"
                  style={{ width: `${analyzingProgress}%` }}
                ></div>
              </div>
              <span className="text-[#c5a367] font-mono font-medium text-xs">
                {analyzingProgress}% - Analisando
              </span>
            </motion.div>
          )}

          {/* STAGE 4: PERSUASIVE RESULT SCREEN */}
          {stage === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col text-center"
            >
              {/* Custom compact expert headshot container */}
              <div className="relative mx-auto mb-3 sm:mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#c5a367] p-1 bg-gradient-to-b from-[#2a2d26] to-[#161814] shadow-lg">
                  <img
                    src="https://i.imgur.com/Tsjyg5p.png"
                    alt="Dra. Mariana Martins"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#c5a367] text-zinc-950 rounded-full p-0.5 sm:p-1 shadow">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 fill-zinc-950 text-gold-200" />
                </div>
              </div>

              {/* Badges / Header compatibility */}
              <div className="inline-block mx-auto px-3 py-1 bg-[#c5a367]/10 border border-[#c5a367]/30 rounded-full mb-2 sm:mb-3">
                <span className="text-[#c5a367] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Perfil Compatível. Paciente ideal.
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 tracking-tight">
                Método Recomendado
              </h3>

              <p className="text-zinc-300 text-[11px] sm:text-xs leading-relaxed mb-4 sm:mb-5 bg-[#1a1d16]/60 p-3 sm:p-4 border border-[#2a2d26] rounded-xl">
                "Com base nas suas respostas, o Método da <strong className="text-[#c5a367] font-semibold">Dra. Mariana Martins</strong> consegue entregar exatamente a naturalidade e segurança que você procura."
              </p>

              {/* Three action buttons compacted for mobile screen height compatibility */}
              <div className="space-y-2">
                {/* Button 1: Send Assessment to WhatsApp */}
                <button
                  id="btn-send-evaluation-whatsapp"
                  onClick={handleSendQuizToWhatsapp}
                  className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-[#c5a367] via-gold-400 to-gold-600 text-zinc-950 font-bold rounded-xl shadow-lg transition-all hover:brightness-110 active:scale-[0.99] flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wide cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>1 - Enviar avaliação à Dra</span>
                </button>

                {/* Button 2: Call WhatsApp without commitment */}
                <button
                  id="btn-chamar-whatsapp-sem-compromisso"
                  onClick={handleDirectWhatsapp}
                  className="w-full py-2.5 px-3 sm:px-4 bg-[#1a1d16] hover:bg-[#2a2d26] text-emerald-400 border border-emerald-500/30 font-semibold rounded-xl transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wide cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>2 - Chamar no Whatsapp</span>
                </button>

                {/* Button 3: Don't send and continue to site */}
                <button
                  id="btn-nao-enviar-continuar-site"
                  onClick={onClose}
                  className="w-full py-2 px-3 sm:px-4 bg-[#2a2d26] hover:bg-[#1a1d16]/80 text-zinc-400 hover:text-white border border-[#c5a36733] font-semibold rounded-xl transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-[10px] sm:text-xs uppercase tracking-wide cursor-pointer"
                >
                  <span>3 - Continuar no Site</span>
                </button>
              </div>

              <p className="text-[10px] text-zinc-500 mt-3">
                Sua resposta pré-configura prioridade em avaliações.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
