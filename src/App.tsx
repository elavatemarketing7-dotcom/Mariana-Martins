import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Instagram,
  MapPin,
  Clock,
  Sparkles,
  Award,
  Shield,
  Heart,
  Smile,
  Check,
  Play,
  Volume2,
  X,
  Phone,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";
import InteractiveQuiz from "./components/InteractiveQuiz";
import {
  EXPERT_INFO,
  BEFORE_AFTER_IMAGES,
  GREEN_HEARTS_IMAGES,
  BASTIDORES_IMAGES,
  DIFFERENTIALS,
  CONSULTATION_STEPS
} from "./data";

export default function App() {
  const [showQuiz, setShowQuiz] = useState(true);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleWhatsappCTA = (customText?: string) => {
    const text = customText
      ? encodeURIComponent(customText)
      : encodeURIComponent("Olá Dra. Mariana! Gostaria de agendar uma avaliação para harmonização.");
    window.open(`${EXPERT_INFO.whatsappUrl}&text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#11130e] text-zinc-100 font-sans selection:bg-gold-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* 1. INTERACTIVE QUIZ OVERLAY (Shown by default, can be skipped) */}
      <AnimatePresence>
        {showQuiz && (
          <InteractiveQuiz
            onClose={() => setShowQuiz(false)}
            expertWhatsapp={EXPERT_INFO.whatsappUrl}
          />
        )}
      </AnimatePresence>

      {/* 2. INFINITE TICKER / LOGRADOURO (Passando devagar no topo) */}
      <div className="bg-[#161814]/90 backdrop-blur-md border-b border-[#2a2d26]/60 sticky top-0 z-40">
        <div className="w-full overflow-hidden whitespace-nowrap py-3 relative flex items-center">
          {/* Faded edges to give premium depth */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#11130e] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#11130e] to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-infinite-scroll shrink-0">
            {/* First sequence */}
            {[
              { label: "SOBRE MIM", id: "sobre-mim" },
              { label: "PROVA VISUAL", id: "prova-visual" },
              { label: "HARMONIZAÇÃO DE 💚", id: "harmonizacao-coracao" },
              { label: "ONDE NOS ENCONTRAR", id: "onde-encontrar" },
              { label: "AGENDAR CONSULTA", id: "contato" }
            ].map((item, idx) => (
              <button
                key={`ticker-1-${idx}`}
                onClick={() => scrollToSection(item.id)}
                className="mx-6 text-[11px] font-bold tracking-widest text-zinc-400 hover:text-gold-400 transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <Sparkles className="w-3 h-3 text-gold-500/80" />
                {item.label}
              </button>
            ))}
            {/* Duplicate sequence for infinite looping animation */}
            {[
              { label: "SOBRE MIM", id: "sobre-mim" },
              { label: "PROVA VISUAL", id: "prova-visual" },
              { label: "HARMONIZAÇÃO DE 💚", id: "harmonizacao-coracao" },
              { label: "ONDE NOS ENCONTRAR", id: "onde-encontrar" },
              { label: "AGENDAR CONSULTA", id: "contato" }
            ].map((item, idx) => (
              <button
                key={`ticker-2-${idx}`}
                onClick={() => scrollToSection(item.id)}
                className="mx-6 text-[11px] font-bold tracking-widest text-zinc-400 hover:text-gold-400 transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <Sparkles className="w-3 h-3 text-gold-500/80" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FIXED HEADER WITH LOGO & QUICK CALL FOR HIGH CONVERSION */}
      <header className="px-6 py-4 flex justify-between items-center bg-[#1a1d16]/40 border-b border-[#2a2d26]/40 max-w-7xl mx-auto">
        <div className="flex flex-col">
          <span className="font-serif text-lg font-bold tracking-wider text-white">
            DRA. MARIANA MARTINS
          </span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-[#c5a367]">
            Harmonização Facial & Dental
          </span>
        </div>
        <button
          onClick={() => handleWhatsappCTA()}
          className="text-xs font-semibold px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full hover:bg-emerald-500 hover:text-zinc-950 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 fill-current" />
          WhatsApp
        </button>
      </header>

      {/* 3. HERO SECTION (Dobra Principal - Foco no expert) */}
      <section id="hero" className="relative pt-10 pb-16 md:py-24 px-6 overflow-hidden max-w-7xl mx-auto">
        {/* Soft elegant mesh gradient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Portrait Image container first for Mobile-First layout */}
          <div className="lg:col-span-5 flex justify-center order-first lg:order-last">
            <div className="relative group w-full max-w-[340px] md:max-w-[400px]">
              {/* Back border decorations */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-gold-500/20 to-zinc-800/10 blur-xl"></div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-gold-400/20 rounded-2xl pointer-events-none"></div>
              
              {/* Main Photo Card */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#1a1d16] border border-[#2a2d26]">
                <img
                  src="https://i.imgur.com/gomyM5K.png"
                  alt="Dra. Mariana Martins"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:scale-102 transition-transform duration-700"
                />
                
                {/* Embedded badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#161814]/85 backdrop-blur-md border border-[#2a2d26]/80 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-white text-xs font-bold font-sans">Dra. Mariana Martins</p>
                    <p className="text-[10px] text-zinc-400 font-medium">Harmonização Facial e Dental</p>
                  </div>
                  <span className="text-[9px] px-2 py-1 bg-[#c5a367]/20 border border-[#c5a367]/30 rounded text-[#c5a367] font-bold uppercase tracking-wider">
                    {EXPERT_INFO.cro}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Headline Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 bg-[#1a1d16] border border-[#2a2d26] rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] text-zinc-300 font-semibold uppercase tracking-wider">
                Atendimento Exclusivo em Barra do Garças MT
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Eu sou a <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400">Dra. Mariana Martins</span>. Transformo faces e sorrisos com arte, sensibilidade e naturalidade absoluta.
            </h1>

            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans max-w-xl">
              Esqueça resultados artificiais ou padronizados. Meu método de Harmonização Facial e Dental foi estruturado para valorizar os contornos e as proporções únicas do seu rosto, assegurando que sua beleza real seja realçada com segurança e requinte.
            </p>

            <div className="flex flex-col space-y-3 pt-2">
              <button
                onClick={() => handleWhatsappCTA()}
                className="w-full sm:w-auto px-8 py-4.5 bg-gradient-to-r from-gold-500 via-[#c5a367] to-gold-600 text-zinc-950 font-bold rounded-xl shadow-lg shadow-[#c5a367]/10 hover:brightness-110 hover:shadow-[#c5a367]/20 transition-all text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                Agendar Consulta no WhatsApp
              </button>
              
              <p className="text-center sm:text-left text-xs text-zinc-500 font-medium tracking-wide">
                ✦ Primeira consulta de avaliação sem compromisso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VIDEO PRESENTATION SECTION (Procedimento destacado no começo) */}
      <section className="bg-[#161814]/60 py-16 px-6 border-y border-[#2a2d26]/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a367]">Procedimento Exclusivo</span>
            <h2 className="text-2xl font-serif font-bold text-white mt-1">Sinta a Diferença do Método</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Video Box */}
            <div className="md:col-span-7">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#1a1d16] border border-[#2a2d26] shadow-2xl group">
                <video
                  src="https://i.imgur.com/ZcXAxl6.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                />
                
                {/* Gradient overlay for premium depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161814]/30 via-transparent to-transparent pointer-events-none"></div>



                {/* Floating sound control button at the bottom-right corner */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 right-4 flex items-center justify-center p-2.5 bg-[#161814]/90 hover:bg-[#2a2d26] backdrop-blur-md border border-[#2a2d26]/60 rounded-full text-zinc-200 transition-all hover:text-white cursor-pointer select-none active:scale-95 z-10"
                  title={isMuted ? "Ativar som" : "Desativar som"}
                >
                  {isMuted ? (
                    <Volume2 className="w-4.5 h-4.5 text-zinc-400 line-through" />
                  ) : (
                    <Volume2 className="w-4.5 h-4.5 text-[#c5a367] animate-pulse" />
                  )}
                </button>
              </div>
            </div>

            {/* Content Beside the Video */}
            <div className="md:col-span-5 flex flex-col justify-center space-y-4">
              <div className="w-12 h-0.5 bg-[#c5a367]/60 rounded"></div>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-serif text-justify">
                "Descubra como a beleza pode ser realçada com técnica, sensibilidade e propósito. Resultados naturais e transformadores. Assista ao procedimento acima e sinta a diferença de ser cuidada por quem entende que sua beleza é única, e merece atenção especial."
              </p>
              
              <button
                onClick={() => handleWhatsappCTA("Gostaria de marcar uma avaliação e entender melhor o método mostrado no vídeo.")}
                className="mt-2 text-xs font-bold text-[#c5a367] hover:text-gold-100 flex items-center gap-1 self-start group cursor-pointer"
              >
                Quero conhecer este procedimento
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUEM SOU EU (Autoridade Pessoal) */}
      <section id="sobre-mim" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio Image */}
          <div className="lg:col-span-5">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute -inset-1.5 bg-gradient-to-br from-[#c5a367]/20 to-transparent rounded-2xl blur-lg"></div>
              <div className="relative rounded-2xl overflow-hidden border border-[#2a2d26] aspect-[4/5] bg-[#1a1d16] shadow-xl">
                <img
                  src="https://i.imgur.com/Tsjyg5p.png"
                  alt="Dra. Mariana Martins"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a367]">Autoridade & Propósito</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              A Arte de Esculpir Expressões sem Perder Identidades
            </h2>
            
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Diferente de grandes clínicas onde o paciente é apenas mais um na fila, eu acredito no <strong>atendimento artesanal</strong>. Cada traço facial e cada dente formam uma composição integrada e única. Com o registro profissional <strong>{EXPERT_INFO.cro}</strong>, busco combinar a maestria técnica de anos de aperfeiçoamento com um olhar atento e detalhista.
            </p>

            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              O meu compromisso em Barra do Garças é com a sofisticação e segurança: usar produtos de excelência global, analisar as proporções áureas de cada rosto e intervir de forma cirúrgica para que o resultado pareça seu, livre de exageros.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3 items-start">
                <div className="p-1.5 bg-[#c5a367]/10 rounded-lg text-[#c5a367]">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Análise Facial 3D</h4>
                  <p className="text-xs text-zinc-400">Estudo fotográfico e anatômico detalhado antes de tocar no seu rosto.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-1.5 bg-[#c5a367]/10 rounded-lg text-[#c5a367]">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Próteses & Odontologia Nobre</h4>
                  <p className="text-xs text-zinc-400">Integração funcional perfeita entre o sorriso dos sonhos e a face harmônica.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-1.5 bg-[#c5a367]/10 rounded-lg text-[#c5a367]">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Insumos de Alta Pureza</h4>
                  <p className="text-xs text-zinc-400">Uso estrito de ácido hialurônico e toxina de marcas líderes globais.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-1.5 bg-[#c5a367]/10 rounded-lg text-[#c5a367]">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Acompanhamento Rigoroso</h4>
                  <p className="text-xs text-zinc-400">Consultas de retorno e suporte integral ao pós-procedimento.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BLOCO "RESULTADOS REAIS" (Prova Visual Forte - Antes e Depois) */}
      <section id="prova-visual" className="py-20 px-6 bg-[#161814]/40 scroll-mt-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a367]">Resultados e Transformações</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight mt-1">
                Elegância Evidenciada
              </h2>
              <p className="text-zinc-400 text-sm mt-2 max-w-xl">
                Veja o antes e depois de pacientes reais que passaram pelo método de harmonização facial e dental da Dra. Mariana Martins. Clique nas imagens para ampliar.
              </p>
            </div>
            
            <p className="text-[10px] text-zinc-500 font-medium italic border border-[#2a2d26] bg-[#1a1d16]/40 px-4 py-2 rounded-lg self-start md:self-auto">
              ⚠️ Resultados podem variar de pessoa para pessoa.
            </p>
          </div>

          {/* Infinite Auto-scrolling Gallery */}
          <div className="relative w-full overflow-hidden py-4 -mx-6 px-6">
            {/* Faded edges to give premium depth */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#11130e] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#11130e] to-transparent z-10 pointer-events-none"></div>

            <div className="flex animate-gallery-slow pause-on-hover gap-4 w-max">
              {/* Double array for infinite scrolling */}
              {[...BEFORE_AFTER_IMAGES, ...BEFORE_AFTER_IMAGES].map((imgUrl, idx) => (
                <div
                  key={`ba-${idx}`}
                  onClick={() => setActiveLightboxImg(imgUrl)}
                  className="relative group w-[220px] sm:w-[280px] md:w-[320px] aspect-square rounded-xl overflow-hidden bg-[#1a1d16] border border-[#2a2d26] cursor-pointer shadow-lg hover:border-[#c5a367]/40 transition-all shrink-0 select-none"
                >
                  <img
                    src={imgUrl}
                    alt={`Caso Clínico Mariana Martins ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 pointer-events-none"
                  />
                  
                  {/* Expand overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-2 bg-[#1a1d16]/90 border border-[#2a2d26]/50 rounded-full text-[#c5a367]">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. SEÇÃO "HARMONIZAÇÃO DE 💚" (Dental-facial Integrada e Carinho) */}
      <section id="harmonizacao-coracao" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-14">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a367]">Arte & Harmonização de Coração</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight mt-1 flex items-center justify-center gap-2">
            Harmonização de <span className="text-emerald-400">💚</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Casos clínicos e fotos de bastidores selecionados com carinho, demonstrando a sensibilidade estética e técnica fina da Dra. Mariana.
          </p>
        </div>

        {/* Gallery Slider/Grid for "de Coração" */}
        <div className="relative w-full overflow-hidden py-4 -mx-6 px-6">
          {/* Faded edges to give premium depth */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#11130e] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#11130e] to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-gallery-medium pause-on-hover gap-4 w-max">
            {/* Double array for infinite scrolling */}
            {[...GREEN_HEARTS_IMAGES, ...GREEN_HEARTS_IMAGES].map((imgUrl, idx) => (
              <div
                key={`heart-${idx}`}
                onClick={() => setActiveLightboxImg(imgUrl)}
                className="relative w-[220px] sm:w-[280px] md:w-[320px] aspect-square rounded-2xl overflow-hidden border border-[#2a2d26] bg-[#1a1d16] hover:border-[#c5a367]/40 transition-all cursor-pointer shadow-lg group shrink-0 select-none"
              >
                <img
                  src={imgUrl}
                  alt={`Harmonização de Coração Mariana Martins ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 pointer-events-none"
                />
                {/* Overlay with a heart symbol */}
                <div className="absolute top-3 right-3 bg-[#161814]/80 backdrop-blur-sm p-1.5 rounded-full border border-[#2a2d26] text-emerald-400">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-[10px] text-zinc-300 font-semibold tracking-wider uppercase">Visualizar Caso</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. POR QUE CONFIAR EM MIM (Bloco Diferenciais) */}
      <section className="py-20 px-6 bg-[#161814]/60 border-y border-[#2a2d26]/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a367]">Segurança & Excelência</span>
            <h2 className="text-3xl font-serif font-bold text-white mt-1">Por Que Confiar Em Mim?</h2>
            <p className="text-zinc-400 text-sm mt-2">
              Seu rosto merece o cuidado de quem estuda cada milímetro e prioriza a sua tranquilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIFFERENTIALS.map((diff, idx) => {
              const icons = [Award, Shield, Heart, Smile];
              const IconComp = icons[idx] || Award;
              
              return (
                <div
                  key={`diff-${idx}`}
                  className="bg-[#1a1d16] border border-[#2a2d26] p-6 rounded-2xl shadow-xl hover:border-[#c5a367]/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#c5a367]/10 border border-[#c5a367]/20 flex items-center justify-center text-[#c5a367] mb-5">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white font-sans leading-tight mb-2">
                      {diff.title}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. CTA INTERMEDIÁRIO */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-b from-[#1a1d16] to-[#161814] border border-[#2a2d26] p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#c5a367]/5 rounded-full blur-2xl pointer-events-none"></div>

          <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight max-w-lg mx-auto">
            Ainda na dúvida se o seu caso tem indicação?
          </h3>
          <p className="text-zinc-400 text-xs md:text-sm mt-3 mb-8 max-w-md mx-auto">
            Converse diretamente comigo de forma amigável e descontraída via WhatsApp para tirar suas dúvidas básicas e analisar se o método é ideal para você.
          </p>

          <button
            onClick={() => handleWhatsappCTA("Olá Dra. Mariana, gostaria de tirar uma dúvida sem compromisso sobre harmonização facial.")}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 mx-auto active:scale-98 cursor-pointer"
          >
            <MessageSquare className="w-4.5 h-4.5 fill-current" />
            Falar no WhatsApp sem Compromisso
          </button>
        </div>
      </section>

      {/* 10. COMO FUNCIONA A PRIMEIRA CONSULTA */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a367]">Jornada da Paciente</span>
          <h2 className="text-3xl font-serif font-bold text-white mt-1">Como Funciona a Primeira Consulta</h2>
          <p className="text-zinc-400 text-sm mt-2">
            Passo a passo transparente para que você se sinta segura e acolhida desde o primeiro contato.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONSULTATION_STEPS.map((step, idx) => (
            <div key={`step-${idx}`} className="relative bg-[#1a1d16]/60 border border-[#2a2d26]/40 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-3xl font-bold font-serif text-[#c5a367]/20 block mb-4">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="w-10 h-0.5 bg-[#c5a367]/40 rounded mt-6"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. MAIS PROVAS (Expert + Bastidores) */}
      <section className="py-20 px-6 bg-[#161814]/40 border-t border-[#2a2d26]/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a367]">Nossa Rotina</span>
            <h2 className="text-3xl font-serif font-bold text-white mt-1">Atendimento & Bastidores</h2>
            <p className="text-zinc-400 text-sm mt-2">
              Conheça a infraestrutura de dedicação e sofisticação preparada para receber você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BASTIDORES_IMAGES.map((item, idx) => (
              <div key={`bastidor-${idx}`} className="bg-[#1a1d16] border border-[#2a2d26] rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-video bg-[#161814] overflow-hidden relative">
                  <img
                    src={item.url}
                    alt="Atendimento Dra. Mariana Martins"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#161814]/80 backdrop-blur-sm rounded-md border border-[#2a2d26]">
                    <span className="text-[10px] text-[#c5a367] font-semibold uppercase tracking-wider">
                      Bastidores {idx + 1}
                    </span>
                  </div>
                </div>
                <div className="p-5 border-t border-[#2a2d26]/40">
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. ONDE NOS ENCONTRAR (Mapa da Clínica no Rodapé) */}
      <section id="onde-encontrar" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#2a2d26]/40 scroll-mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Informações de Localização */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a367]">Localização Privilegiada</span>
            <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
              Venha Conhecer Nosso Espaço
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Nosso consultório foi estruturado com máximo conforto, privacidade e assepsia para que a sua sessão seja um momento de relaxamento e cuidado de alto padrão.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-[#c5a367] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Endereço</h4>
                  <p className="text-sm text-zinc-300 font-medium">
                    Barra do Garças - MT
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Estacionamento fácil e localização central reservada.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Award className="w-5 h-5 text-[#c5a367] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Registro e Conselho</h4>
                  <p className="text-sm text-zinc-300 font-medium">
                    Conselho Regional de Odontologia: {EXPERT_INFO.cro}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Clock className="w-5 h-5 text-[#c5a367] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Atendimento</h4>
                  <p className="text-sm text-zinc-300 font-medium">
                    Segunda a Sexta • Sob agendamento prévio individualizado
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Iframe */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-[#2a2d26] shadow-2xl aspect-video bg-[#1a1d16]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15383.184313262847!2d-52.2618957489569!3d-15.893081079555193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x937be1e6e969d27f%3A0xa196f7c5e807bf11!2sBarra%20do%20Gar%C3%A7as%2C%20MT!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Dra. Mariana Martins em Barra do Garças MT"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 13. CTA FINAL (Decisão) */}
      <section id="contato" className="py-20 px-6 max-w-4xl mx-auto text-center scroll-mt-14">
        <div className="inline-flex mx-auto p-3 bg-[#161814] border border-[#c5a367]/10 rounded-full mb-6">
          <Sparkles className="w-6 h-6 text-[#c5a367] animate-pulse" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
          Pronta para dar o primeiro passo em direção à sua melhor versão?
        </h2>
        
        <p className="text-zinc-300 text-sm md:text-base mt-4 mb-8 max-w-xl mx-auto leading-relaxed">
          Reserve agora a sua vaga para uma Avaliação Personalizada. Vou analisar as características exclusivas do seu rosto para desenharmos uma proposta natural e sofisticada de harmonização.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleWhatsappCTA()}
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-gold-500 via-[#c5a367] to-gold-600 text-zinc-950 font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            Agendar Primeira Avaliação Gratuita
          </button>

          <a
            href={EXPERT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-5 bg-[#1a1d16] hover:bg-[#2a2d26] text-zinc-200 border border-[#2a2d26] font-semibold rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
          >
            <Instagram className="w-5 h-5 text-rose-400" />
            Ver Casos no Instagram
          </a>
        </div>

        <p className="text-zinc-500 text-xs mt-6 font-medium">
          ✦ Sem compromisso de fechamento • 100% focado no seu bem-estar
        </p>
      </section>

      {/* 14. SIMPLE FOOTER WITH HAND-WRITTEN SIGNATURE */}
      <footer className="bg-[#161814] border-t border-[#11130e] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          
          <div className="space-y-2">
            {/* Elegant Calligraphy Signature */}
            <div className="text-3xl font-signature text-[#c5a367] tracking-wide select-none">
              Mariana Martins
            </div>
            <p className="text-xs text-zinc-400 font-sans tracking-wide">
              {EXPERT_INFO.profession} • {EXPERT_INFO.cro}
            </p>
            <p className="text-[11px] text-zinc-500">
              Barra do Garças, MT - Todos os direitos reservados.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <button
              onClick={() => setShowQuiz(true)}
              className="text-xs text-zinc-400 hover:text-[#c5a367] font-semibold border border-[#2a2d26] px-4 py-2 rounded-full bg-[#1a1d16]/60 transition-colors cursor-pointer"
            >
              Refazer Avaliação Quiz
            </button>
            <a
              href={EXPERT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <Instagram className="w-4.5 h-4.5 text-pink-400" />
              Siga @dramarianamaos
            </a>
          </div>
        </div>
      </footer>

      {/* 15. FLOATING WHATSAPP HIGH CONVERSION TRIGGER */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => handleWhatsappCTA("Olá Dra. Mariana, vim pelo site e gostaria de agendar uma consulta.")}
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-zinc-950 shadow-2xl hover:scale-108 active:scale-95 transition-all cursor-pointer relative group"
          title="Fale Conosco"
        >
          {/* Ring pulse effect */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none"></span>
          <MessageSquare className="w-7 h-7 fill-current" />
        </button>
      </div>

      {/* LIGHTBOX MODAL FOR IMAGES */}
      <AnimatePresence>
        {activeLightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setActiveLightboxImg(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-6 right-6 p-2 bg-[#1a1d16] border border-[#2a2d26] rounded-full text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-[#2a2d26] bg-[#161814] flex items-center justify-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeLightboxImg}
                alt="Resultado Ampliado"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              {/* Discrete Lightbox footer */}
              <div className="absolute bottom-0 inset-x-0 bg-[#161814]/95 border-t border-[#11130e] p-4 text-center">
                <p className="text-[10px] text-zinc-400 font-medium">
                  Dra. Mariana Martins • Harmonização Facial e Dental de Excelência
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
