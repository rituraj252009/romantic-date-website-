import React, { useState } from 'react';
import { Calendar, Clock, Heart, Sparkles, Check, MessageSquare, Copy } from 'lucide-react';
import { ROMANTIC_DATA, type DateOption } from '../config/romanticData';
import { soundEngine } from '../audio/soundEffects';

interface DatePlannerSectionProps {
  onScrollToFooter: () => void;
}

export const DatePlannerSection: React.FC<DatePlannerSectionProps> = ({ onScrollToFooter }) => {
  const [selectedDateId, setSelectedDateId] = useState<string>('coffee');
  const [selectedDay, setSelectedDay] = useState<string>(ROMANTIC_DATA.dayOptions[0]);
  const [selectedTime, setSelectedTime] = useState<string>(ROMANTIC_DATA.timeOptions[0]);
  const [customNote, setCustomNote] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const selectedOption: DateOption =
    ROMANTIC_DATA.dateOptions.find((opt) => opt.id === selectedDateId) ||
    ROMANTIC_DATA.dateOptions[0];

  const handleSelectCard = (id: string) => {
    soundEngine.playChime();
    setSelectedDateId(id);
  };

  const handleConfirmPlan = () => {
    soundEngine.playSparkle();
    soundEngine.playCelebrationSound();
    setShowSummary(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyInvitation = () => {
    soundEngine.playChime();
    const textToCopy = `🌹 Our Little Romantic Date Plan for Asmita ❤️\n\n✨ Date Idea: ${selectedOption.title} (${selectedOption.icon})\n📅 Day: ${selectedDay}\n⏰ Time: ${selectedTime}\n💌 Note: ${customNote || 'Sirf tumhari smile dekhni hai!'}\n\n☕ Coffee meri taraf se, smile aapki taraf se!`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20 z-10 select-none">
      {/* Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/25 text-rose-300 text-xs sm:text-sm font-medium mb-3">
          <Calendar className="w-4 h-4 text-rose-400" />
          <span>Curate Our Special Evening</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide text-glow-rose">
          Interactive Date Planner ☕🌹
        </h2>
        <p className="text-slate-300/80 text-sm sm:text-base mt-2 max-w-lg mx-auto">
          Madam ji, apni favorite date choose kijiye... Jo aap kahengi, wahi final hoga!
        </p>
      </div>

      {!showSummary ? (
        <div className="max-w-5xl w-full mx-auto space-y-12">
          {/* Step 1: 3D Date Idea Cards */}
          <div>
            <h3 className="text-rose-200 text-lg sm:text-xl font-medium mb-6 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-xs font-bold text-rose-300">
                1
              </span>
              <span>Choose Your Dream Date Idea:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ROMANTIC_DATA.dateOptions.map((opt) => {
                const isSelected = selectedDateId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectCard(opt.id)}
                    className={`group cursor-pointer relative p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1.5 ${
                      isSelected
                        ? 'glass-panel-glow border-2 border-rose-400 shadow-[0_10px_35px_rgba(244,63,94,0.4)] scale-[1.02]'
                        : 'glass-panel hover:border-rose-400/50 hover:shadow-lg'
                    }`}
                  >
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{opt.icon}</span>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                          isSelected
                            ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300'
                        }`}
                      >
                        {opt.badge}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-semibold text-white mb-2 group-hover:text-rose-200 transition-colors">
                      {opt.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-4">
                      {opt.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-rose-500/15 text-xs">
                      <span className="text-amber-300/90 font-medium">{opt.vibe}</span>
                      {isSelected ? (
                        <span className="flex items-center gap-1 text-rose-400 font-bold">
                          <Check className="w-4 h-4" /> Selected
                        </span>
                      ) : (
                        <span className="text-slate-400 group-hover:text-rose-300">
                          Select →
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2 & 3: Day, Time & Sweet Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl glass-panel-glow border border-rose-500/30">
            {/* Day & Time Selection */}
            <div className="space-y-6">
              <div>
                <h4 className="text-rose-200 text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>2. Preferred Day:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ROMANTIC_DATA.dayOptions.map((day) => (
                    <button
                      key={day}
                      onClick={() => {
                        soundEngine.playChime();
                        setSelectedDay(day);
                      }}
                      className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium border text-left transition-all ${
                        selectedDay === day
                          ? 'bg-rose-600/50 border-rose-400 text-white shadow-md'
                          : 'bg-slate-900/50 border-slate-700/60 text-slate-300 hover:border-rose-400/40'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-rose-200 text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>3. Suitable Time:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ROMANTIC_DATA.timeOptions.map((time) => (
                    <button
                      key={time}
                      onClick={() => {
                        soundEngine.playChime();
                        setSelectedTime(time);
                      }}
                      className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium border text-left transition-all ${
                        selectedTime === time
                          ? 'bg-rose-600/50 border-rose-400 text-white shadow-md'
                          : 'bg-slate-900/50 border-slate-700/60 text-slate-300 hover:border-rose-400/40'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4: Optional Sweet Note for Motku Ji */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-rose-200 text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-300" />
                  <span>4. Optional Message From Asmita:</span>
                </h4>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Agar koi khaas demand ya baat kehni ho... (e.g. 'Coffee extra hot honi chahiye!' ☕😉)"
                  className="w-full h-32 p-4 rounded-xl bg-slate-950/60 border border-rose-500/25 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all resize-none"
                />
              </div>

              {/* Confirm Plan Button */}
              <button
                onClick={handleConfirmPlan}
                onMouseEnter={() => soundEngine.playChime()}
                className="w-full py-4 rounded-full font-bold text-base sm:text-lg text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 shadow-[0_0_30px_rgba(244,63,94,0.6)] transition-all transform hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Finalize Our Date Selection 🌹</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Confirmation & Invitation Card Summary */
        <div className="max-w-xl w-full mx-auto animate-fade-in">
          <div className="relative p-8 sm:p-12 rounded-3xl glass-panel-glow border-2 border-amber-300/50 shadow-[0_20px_70px_rgba(244,63,94,0.4)] text-center">
            {/* VIP Golden Stamp */}
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/50 text-amber-200 text-xs font-bold tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Date Invitation Pass</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2 text-glow-rose">
              It's a Date, Asmita Ji! 🌹
            </h3>
            <p className="font-handwriting text-2xl text-rose-300 mb-8">
              Sirf tum aur main... ek khoobsurat shaam ❤️
            </p>

            {/* Summary Details Box */}
            <div className="space-y-4 text-left p-6 rounded-2xl bg-black/40 border border-rose-500/20 text-sm sm:text-base">
              <div className="flex items-center justify-between pb-3 border-b border-rose-500/10">
                <span className="text-slate-400 flex items-center gap-2">
                  <span>{selectedOption.icon}</span> Date Plan:
                </span>
                <span className="font-semibold text-rose-200">{selectedOption.title}</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-rose-500/10">
                <span className="text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-300" /> Preferred Day:
                </span>
                <span className="font-semibold text-white">{selectedDay}</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-rose-500/10">
                <span className="text-slate-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-300" /> Preferred Time:
                </span>
                <span className="font-semibold text-white">{selectedTime}</span>
              </div>

              {customNote && (
                <div className="pt-2">
                  <span className="text-slate-400 block text-xs uppercase mb-1">
                    Madam Ji's Note:
                  </span>
                  <span className="text-rose-200 italic font-casual text-lg">
                    "{customNote}"
                  </span>
                </div>
              )}
            </div>

            {/* Privacy note */}
            <p className="text-[11px] text-slate-400/80 mt-4 leading-normal">
              🔒 Note: Ye choices tumhare browser mein private hain. Tum is invitation card ko copy karke save ya share kar sakti ho!
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleCopyInvitation}
                className="w-full sm:w-1/2 py-3 px-6 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-green-300" />
                    <span>Copied With Love! 💌</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Date Pass 💌</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowSummary(false)}
                className="w-full sm:w-1/2 py-3 px-6 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                Change Choices ↺
              </button>
            </div>

            <div className="mt-8">
              <button
                onClick={onScrollToFooter}
                className="text-xs text-rose-300 hover:text-white underline underline-offset-4 transition-colors"
              >
                Scroll to the special closing note for Motku Ji ↓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
