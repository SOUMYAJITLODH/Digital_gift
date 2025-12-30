
import React, { useState } from 'react';
import { AppState, Ratings } from './types';
import HeartBackground from './components/HeartBackground';
import StarRating from './components/StarRating';
import { generateReaction } from './services/geminiService';

// Your unique Formspree endpoint to get Shraddha's responses on your iPad!
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mregvywk"; 

const App: React.FC = () => {
  const [step, setStep] = useState<AppState>(AppState.INTRO);
  const [ratings, setRatings] = useState<Ratings>({
    experience: 0,
    flirting: 0,
    feelings: 0,
    comment: '',
  });
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step === AppState.INTRO) setStep(AppState.LETTER);
    else if (step === AppState.LETTER) setStep(AppState.RATING);
  };

  const sendNotification = async (currentRatings: Ratings) => {
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: "Shraddha sent you a response! ❤️",
          name: "Shraddha",
          ...currentRatings
        }),
      });
    } catch (err) {
      console.error("Notification failed, but Gemini will still work:", err);
    }
  };

  const handleSubmit = async (finalRatings?: Ratings) => {
    const dataToSubmit = finalRatings || ratings;
    setIsSubmitting(true);
    
    // 1. Send notification to your iPad (via Email)
    await sendNotification(dataToSubmit);

    // 2. Get AI reaction
    const response = await generateReaction(dataToSubmit);
    setAiResponse(response || "I appreciate you more than words can say.");
    
    setStep(AppState.FINAL);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <HeartBackground />

      <div className="w-full max-w-lg glass rounded-3xl shadow-2xl p-8 z-10 relative">
        {step === AppState.INTRO && (
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-romantic text-pink-600 mb-6">Hello Shraddha...</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              I've been carrying some thoughts in my heart for a while now. 
              I wanted to share them with you in a special way.
            </p>
            <button
              onClick={handleNext}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Open My Letter
            </button>
          </div>
        )}

        {step === AppState.LETTER && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-serif italic text-pink-700 mb-6 underline decoration-pink-200">To My Dear Shraddha,</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed font-serif">
              <p>
                Shraddha, there’s a certain magic in the way we talk. From our very first conversation to this moment, 
                you’ve occupied a space in my mind that I didn't even know was vacant.
              </p>
              <p className="font-bold text-pink-800 text-lg">
                The truth is... I love you.
              </p>
              <p>
                But please know this: there is absolutely no pressure. You don’t need to make 
                any big decisions right now, and you definitely don't need to rush. 
                Our rhythm is beautiful just the way it is, and I treasure every second of it.
              </p>
              <p>
                I just wanted you to know how I feel as we move forward together. I truly believe 
                that we can make <span className="text-pink-600 font-bold">2026</span> a beautiful new beginning for us, 
                whatever shape that takes.
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleNext}
                className="text-pink-600 font-semibold border-b-2 border-pink-600 pb-1 hover:text-pink-800 hover:border-pink-800 transition-colors"
              >
                Continue...
              </button>
            </div>
          </div>
        )}

        {step === AppState.RATING && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-romantic text-pink-600 mb-6 text-center">Be Honest with Me, Shraddha?</h2>
            
            <StarRating 
              label="1. How has your experience with me been so far?" 
              value={ratings.experience} 
              onChange={(v) => setRatings({...ratings, experience: v})} 
            />
            
            <StarRating 
              label="2. Rate my flirting skills (be brutal!)" 
              value={ratings.flirting} 
              onChange={(v) => setRatings({...ratings, flirting: v})} 
            />

            <StarRating 
              label="3. Your feelings towards me right now?" 
              value={ratings.feelings} 
              onChange={(v) => setRatings({...ratings, feelings: v})} 
            />

            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-2">Anything else you want to tell me?</p>
              <textarea
                value={ratings.comment}
                onChange={(e) => setRatings({...ratings, comment: e.target.value})}
                placeholder="Write your heart out..."
                className="w-full p-4 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none h-24 text-gray-700"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
                className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold hover:bg-pink-600 transition-all disabled:bg-gray-400"
              >
                {isSubmitting ? 'Sending...' : 'Send Review'}
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 mb-2 italic px-4">
                  If you love me right now then you can click this button down below
                </p>
                <button
                  disabled={isSubmitting}
                  onClick={() => {
                     const updated = {...ratings, feelings: 5};
                     setRatings(updated);
                     handleSubmit(updated);
                  }}
                  className="w-full bg-white text-pink-500 border-2 border-pink-500 py-3 rounded-xl font-bold hover:bg-pink-50 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  Love Him
                </button>
              </div>
            </div>
          </div>
        )}

        {step === AppState.FINAL && (
          <div className="text-center animate-bounce-in">
            <div className="text-6xl mb-4">💖</div>
            <h2 className="text-3xl font-romantic text-pink-600 mb-4">Sent to My Heart!</h2>
            <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100 italic text-gray-700 mb-6 shadow-inner">
              "{aiResponse}"
            </div>
            <p className="text-gray-500 text-sm">
              Thank you for being you, Shraddha. No matter what the stars say, 
              thank you for being part of my journey towards 2026.
            </p>
          </div>
        )}
      </div>

      <footer className="fixed bottom-4 text-pink-300 text-xs tracking-widest uppercase">
        Made for Shraddha • 2024-2026
      </footer>
    </div>
  );
};

export default App;
