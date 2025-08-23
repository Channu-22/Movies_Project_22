import { useState } from 'react';
import "../main"

function MovieFeedbackForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    favoriteGenre: '',
    rating: '',
    movieSuggestion: '',
    feedback: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // CLEAR ERROR WHEN USER STARTS TYPING
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name || form.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!form.favoriteGenre) {
      newErrors.favoriteGenre = 'Please select your favorite genre';
    }
    
    if (!form.rating) {
      newErrors.rating = 'Please rate our service';
    }
    
    if (!form.feedback || form.feedback.length < 10) {
      newErrors.feedback = 'Feedback must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('https://formspree.io/f/xkgzzzbz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your movie feedback! We appreciate your input and will use it to improve our recommendations.');
        setForm({
          name: '',
          email: '',
          favoriteGenre: '',
          rating: '',
          movieSuggestion: '',
          feedback: ''
        });
      } else {
        setSubmitMessage('Failed to submit feedback. Please try again.');
      }
    } catch (err) {
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 6000);
    }
  };

  return (
    <div className="min-h-screen  py-12 px-4 relative overflow-hidden">
      {/* Movie themed decorative elements */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full opacity-20 blur-xl" />
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full opacity-20 blur-xl" />
      <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full opacity-15 blur-lg" />
      
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full mb-6">
              <span className="text-2xl">🎬</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Movies Club Feedback
            </h1>
            <p className="text-gray-300 text-base max-w-md mx-auto">
              Help us improve your movie discovery experience! Share your thoughts about our movie database.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-700">
            {/* SUCCESS/ERROR MESSAGE */}
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg text-center ${
                submitMessage.includes('Thank you') 
                  ? 'bg-green-800/80 text-green-300 border border-green-600' 
                  : 'bg-red-800/80 text-red-300 border border-red-600'
              }`}>
                {submitMessage}
              </div>
            )}

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700/70 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 text-white placeholder-gray-400 ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* EMAIL FIELD */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700/70 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 text-white placeholder-gray-400 ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* FAVORITE GENRE */}
              <div>
                <label htmlFor="favoriteGenre" className="block text-sm font-medium text-gray-300 mb-2">
                  Favorite Movie Genre *
                </label>
                <select
                  id="favoriteGenre"
                  name="favoriteGenre"
                  value={form.favoriteGenre}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700/70 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 text-white ${
                    errors.favoriteGenre ? 'border-red-500' : 'border-gray-600'
                  }`}
                >
                  <option value="" className="text-gray-400">Select your favorite genre</option>
                  <option value="action">Action</option>
                  <option value="comedy">Comedy</option>
                  <option value="drama">Drama</option>
                  <option value="horror">Horror</option>
                  <option value="romance">Romance</option>
                  <option value="thriller">Thriller</option>
                  <option value="sci-fi">Sci-Fi</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="animation">Animation</option>
                  <option value="documentary">Documentary</option>
                </select>
                {errors.favoriteGenre && (
                  <p className="mt-1 text-sm text-red-400">{errors.favoriteGenre}</p>
                )}
              </div>

              {/* RATING */}
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-2">
                  Rate Our Movie Database *
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700/70 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 text-white ${
                    errors.rating ? 'border-red-500' : 'border-gray-600'
                  }`}
                >
                  <option value="" className="text-gray-400">Rate your experience</option>
                  <option value="5">Excellent (5/5)</option>
                  <option value="4">Very Good (4/5)</option>
                  <option value="3">Good (3/5)</option>
                  <option value="2">Fair (2/5)</option>
                  <option value="1">Needs Improvement (1/5)</option>
                </select>
                {errors.rating && (
                  <p className="mt-1 text-sm text-red-400">{errors.rating}</p>
                )}
              </div>

              {/* MOVIE SUGGESTION */}
              <div>
                <label htmlFor="movieSuggestion" className="block text-sm font-medium text-gray-300 mb-2">
                  Movie Recommendation
                </label>
                <input
                  type="text"
                  id="movieSuggestion"
                  name="movieSuggestion"
                  value={form.movieSuggestion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 text-white placeholder-gray-400"
                  placeholder="Suggest a movie we should add"
                />
              </div>

              {/* FEEDBACK FIELD */}
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Feedback *
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows="5"
                  value={form.feedback}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700/70 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 resize-none text-white placeholder-gray-400 ${
                    errors.feedback ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Tell us what you think about our movie database..."
                />
                {errors.feedback && (
                  <p className="mt-1 text-sm text-red-400">{errors.feedback}</p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-colors duration-200 ${
                  isSubmitting
                    ? 'bg-gray-600 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:from-red-700 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <span className='cursor-pointer'>Submit Feedback</span>
                )}
              </button>
            </div>

            {/* FOOTER */}
            <div className="mt-10 pt-8 border-t border-gray-600 text-center">
              <div className="flex items-center justify-center space-x-3 text-gray-300 mb-4">
                <span className="text-2xl">🍿</span>
                <p className="text-sm font-medium">
                  Your feedback helps us create a better movie discovery experience
                </p>
                <span className="text-2xl">🎭</span>
              </div>
              <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Powered by TMDB</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Response within 48 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieFeedbackForm;