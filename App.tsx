import React, { useState, useEffect } from 'react';
import { AppState, Ratings } from './types';
import HeartBackground from './components/HeartBackground';
import StarRating from './components/StarRating';
import { generateReaction } from './services/geminiService';

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mregvywk"; 

const Confetti: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: ['#f472b6', '#fbcfe8', '#db2777', '#fce7f3'][Math.floor(Math.random() * 4)],
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
          }}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [step, setStep] = useState<AppState>(AppState.INTRO);
  const [isOpen, setIsOpen] = useState(false);
  const [ratings, setRatings] = useState<Ratings>({
    experience: 0,
    flirting: 0,
    feelings: 0,
    comment: '',
  });
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      setStep(AppState.LETTER);
    }, 1000);
  };

  const sendNotification = async (currentRatings: Ratings) => {
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: "Shraddha replied to your letter! ❤️",
          name: "Shraddha",
          ...currentRatings
        }),
      });
    } catch (err) {
      console.error("Formspree error:", err);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Start generating AI response early for better UX
    const aiPromise = generateReaction(ratings);
    await sendNotification(ratings);
    const response = await aiPromise;
    setAiResponse(response || "Thank you for being part of my journey. You mean the world to me.");
    setStep(AppState.FINAL);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative bg-[#fffafa]">
      <HeartBackground />

      <div className="w-full max-w-lg z-10">
        
        {step === AppState.INTRO && (
          <div className="text-center animate-fade-in flex flex-col items-center">
            <div 
              onClick={handleOpen}
              className={`envelope-wrapper mb-10 group ${isOpen ? 'open' : ''}`}
            >
               <div className={`envelope ${isOpen ? 'open' : ''} flex items-center justify-center relative`}>
                  <div className="z-10 text-pink-300 text-[10px] font-serif tracking-[0.4em] opacity-40 uppercase">To Shraddha</div>
                  
                  {/* Wax Seal */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-pink-100 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-30 seal transition-all duration-500 ${isOpen ? 'opacity-0 scale-50' : 'opacity-100'}`}>
                    <span className="text-2xl">❤️</span>
                  </div>

                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-max text-pink-300 text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to reveal your message
                  </div>
               </div>
            </div>
            
            <h1 className="text-3xl font-romantic text-pink-700 mb-2">You have a special delivery</h1>
            <p className="text-gray-400 font-light italic">A quiet confession for a new beginning</p>
          </div>
        )}

        {step === AppState.LETTER && (
          <div className="glass rounded-3xl shadow-2xl overflow-hidden animate-fade-in border border-pink-100">
            <div className="bg-pink-50/50 px-8 py-4 flex justify-between items-center border-b border-pink-100">
              <span className="text-[10px] font-bold uppercase tracking-widest text-pink-300">From: Soumyajit</span>
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
            </div>

            <div className="p-8 max-h-[65vh] overflow-y-auto custom-scrollbar stationery">
              <h2 className="text-2xl font-serif italic text-gray-800 mb-8 border-b border-pink-100 pb-2">To my crush SHRADDHA,</h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed font-serif text-lg">
                <p>
                  This year was amazing but to be honest ai last month was the best month karon tui chilish amar sathe. 
                  Thankyou for tolerating me, to laugh at my non funny memes to love react at my cringe loveydovey reels. 
                  Ami ai letter ta likhchi to express my second confession that……
                </p>
                
                <p className="text-center py-6">
                  <span className="text-5xl font-romantic text-pink-600 block transform rotate-[-1deg] transition-transform hover:rotate-0 cursor-default">I LOVE YOU</span>
                </p>

                <p>
                  Age ami bolechilam je i liked you but in these past days i realised my love for you. 
                  To be honest ami hoyto bad looking (like not upto your standards), ami hoyto cringe hote pari, 
                  ami hoyto chaotic hote pari, ami hoyto attention seeker hote pari, ami hoyto sometimes ignorant hote pari, 
                  ami hoyto toke ragebait korte pari, ami hoyto monotonous hote pari.
                </p>

                <div className="bg-pink-100/40 p-6 rounded-2xl italic border-l-4 border-pink-400 my-8">
                  <p className="mb-4">But 1 thing which i will never stop doing is <span className="text-pink-600 font-bold">LOVING YOU</span> (untill you reject me).</p>
                  <p>I will provide you stability, i will care for you immensely, i will be your best adviser and toke chara baki shob meye amar bon er shoman.</p>
                </div>

                <p>
                  But ha toke like rush korte hobe na kono decision, take your time. 
                  I am just writing this je like its a new year a new beginning why not confess to the person whom i love the most. 
                  But ha dont share this letter to anyone pls not even your friends karon tor ata cringe mone hote pare but i have put out all my feeling in this plate.
                </p>

                <p>
                  Tor amake khub desperate mone hote pare but trust me ami ato kono meye er jonno khati ni. 
                  And i am putting this much effort karon in my eyes you are worth more than this effort.
                </p>
                
                <p>
                  And ha next page e te akta review system ache to know what you think about me, suggestion box o ache so like kichu lekhar thakle write it there.
                </p>

                <div className="pt-12 text-right">
                  <p className="text-gray-400 text-sm italic">Yours truly,</p>
                  <p className="text-4xl font-romantic text-pink-600 mt-2">Soumyajit</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-pink-50">
              <button
                onClick={() => setStep(AppState.RATING)}
                className="w-full bg-pink-500 text-white py-4 rounded-2xl font-bold hover:bg-pink-600 transition-all shadow-lg hover:shadow-pink-200 active:scale-95"
              >
                Go to the Review System →
              </button>
            </div>
          </div>
        )}

        {step === AppState.RATING && (
          <div className="glass rounded-3xl shadow-2xl p-8 animate-fade-in border-t-8 border-pink-400">
            <h2 className="text-2xl font-romantic text-pink-600 mb-8 text-center text-3xl">What's in your heart?</h2>
            
            <div className="space-y-6">
              <StarRating 
                label="How has your experience with me been?" 
                value={ratings.experience} 
                onChange={(v) => setRatings({...ratings, experience: v})} 
              />
              
              <StarRating 
                label="My flirting skills (be brutal!)" 
                value={ratings.flirting} 
                onChange={(v) => setRatings({...ratings, flirting: v})} 
              />

              <StarRating 
                label="Your feelings right now?" 
                value={ratings.feelings} 
                onChange={(v) => setRatings({...ratings, feelings: v})} 
              />

              <div className="mt-6">
                <p className="text-gray-600 text-sm mb-3 font-semibold ml-1">Suggestion Box / Your Thoughts</p>
                <textarea
                  value={ratings.comment}
                  onChange={(e) => setRatings({...ratings, comment: e.target.value})}
                  placeholder="Is there anything else you want to tell me?"
                  className="w-full p-5 rounded-2xl border border-pink-100 focus:ring-4 focus:ring-pink-100 focus:outline-none h-32 text-gray-700 bg-pink-50/10 text-sm transition-all"
                />
              </div>

              <button
                disabled={isSubmitting || !ratings.experience}
                onClick={handleSubmit}
                className="w-full bg-pink-500 text-white py-5 rounded-2xl font-bold hover:bg-pink-600 transition-all disabled:bg-gray-200 shadow-xl shadow-pink-100 transform active:scale-95"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending your reply...
                  </span>
                ) : 'Submit and finish'}
              </button>
            </div>
          </div>
        )}

        {step === AppState.FINAL && (
          <div className="glass rounded-3xl shadow-2xl p-10 text-center animate-fade-in border-b-8 border-pink-500 relative overflow-hidden">
            <Confetti />
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner relative z-10">
              <span className="text-5xl animate-bounce">💝</span>
            </div>
            <h2 className="text-4xl font-romantic text-pink-600 mb-6 relative z-10">Thank You, Shraddha</h2>
            
            <div className="relative p-8 bg-white/60 rounded-3xl border-2 border-dashed border-pink-200 mb-10 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[10px] px-4 py-1.5 rounded-full uppercase tracking-widest font-bold">A Message from my heart</div>
              <p className="italic text-gray-700 font-serif leading-relaxed text-lg">
                "{aiResponse}"
              </p>
            </div>
            
            <div className="space-y-4 opacity-70 z-10 relative">
              <p className="text-pink-400 text-[10px] uppercase tracking-[0.5em] font-bold">
                See you soon
              </p>
              <p className="text-gray-400 text-xs italic">
                This is just the beginning of our 2026 story.
              </p>
            </div>
          </div>
        )}
      </div>

      <footer className="fixed bottom-8 w-full text-center pointer-events-none px-4 opacity-50">
        <span className="text-[9px] uppercase tracking-[0.6em] text-pink-300 font-bold block mb-1">
          Handcrafted by Soumyajit
        </span>
      </footer>
    </div>
  );
};

export default App;