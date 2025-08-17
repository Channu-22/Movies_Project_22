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
    <div className="min-h-screen  py-12 px-4">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center  mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-300 rounded-full mb-6">
              <span className="text-2xl">🎬</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-50 mb-4">
              Movie Feedback
            </h1>
            <p className="text-gray-50 text-base max-w-md mx-auto">
              Help us improve your movie discovery experience! Share your thoughts about our movie database.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            {/* SUCCESS/ERROR MESSAGE */}
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg text-center ${
                submitMessage.includes('Thank you') 
                  ? 'bg-green-600 text-white' 
                  : 'bg-red-600 text-white'
              }`}>
                {submitMessage}
              </div>
            )}

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:border-amber-400 focus:outline-none transition-colors text-gray-800 placeholder-gray-500 ${
                    errors.name ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* EMAIL FIELD */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:border-amber-400 focus:outline-none transition-colors text-gray-800 placeholder-gray-500 ${
                    errors.email ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* FAVORITE  */}
              <div>
                <label htmlFor="favoriteGenre" className="block text-sm font-medium text-gray-700 mb-2">
                  Favorite Movie Genre *
                </label>
                <select
                  id="favoriteGenre"
                  name="favoriteGenre"
                  value={form.favoriteGenre}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:border-amber-400 focus:outline-none transition-colors text-gray-800 ${
                    errors.favoriteGenre ? 'border-red-400' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your favorite genre</option>
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
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Rate Our Movie Database *
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:border-amber-400 focus:outline-none transition-colors text-gray-800 ${
                    errors.rating ? 'border-red-400' : 'border-gray-300'
                  }`}
                >
                  <option value="">Rate your experience</option>
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

              {/* MOVIE SUGGESTION  */}
              <div>
                <label htmlFor="movieSuggestion" className="block text-sm font-medium text-gray-700 mb-2">
                  Movie Recommendation
                </label>
                <input
                  type="text"
                  id="movieSuggestion"
                  name="movieSuggestion"
                  value={form.movieSuggestion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-amber-400 focus:outline-none transition-colors text-gray-800 placeholder-gray-500"
                  placeholder="Suggest a movie we should add"
                />
              </div>

              {/* FEEDBACK FIELD */}
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback *
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows="5"
                  value={form.feedback}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:border-amber-400 focus:outline-none transition-colors resize-none text-gray-800 placeholder-gray-500 ${
                    errors.feedback ? 'border-red-400' : 'border-gray-300'
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
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors ${
                  isSubmitting
                    ? 'bg-gray-600 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
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
            <div className="mt-10 pt-8 border-t border-gray-200 text-center">
              <div className="flex items-center justify-center space-x-3 text-gray-600 mb-4">
                <span className="text-2xl">🍿</span>
                <p className="text-sm font-medium">
                  Your feedback helps us create a better movie discovery experience
                </p>
                <span className="text-2xl">🎭</span>
              </div>
              <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Powered by TMDB</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
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