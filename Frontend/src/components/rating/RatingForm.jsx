import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating: { overall: rating }, review });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Your Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-3xl ${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="label">Review (Optional)</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="4"
          className="input-field"
          placeholder="Share your experience..."
        />
      </div>

      <button type="submit" className="btn-primary w-full" disabled={rating === 0}>
        Submit Rating
      </button>
    </form>
  );
};

export default RatingForm;
