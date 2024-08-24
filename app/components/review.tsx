import React, { useState } from 'react';
import { Star1 } from "iconsax-react";
import { createReview } from '../sever/general';
import { LabelInputContainer } from "@/app/login/components";
import { Textarea } from "@/app/components/ui/textarea";


interface User {
  id: string | number;
}

interface Product {
  id: string | number;
}

interface ReviewData {
  user: string | number;
  product: string | number;
  rating: number;
  comment: string;
}

interface ReviewComponentProps {
  user: User;
  product: Product;
  onReviewSubmit: (review: ReviewData) => void;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ user = {}, product = {}, onReviewSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const reviewData: ReviewData = {
      user: user.id,
      product: product.id,
      rating,
      comment: review
    };

    try {
      await createReview(reviewData);
      onReviewSubmit(reviewData);
      setRating(0);
      setReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="col-span-5 lg:col-span-2 space-y-4">
      <h1 className="text-xl sm:text-2xl">Your Review</h1>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star1
            key={star}
            className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <LabelInputContainer className="mb-4">
        <Textarea
          cols={6}
          className="bg-background/50"
          id="review"
          placeholder="Write your review"
          value={review}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)}
        />
      </LabelInputContainer>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-150"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewComponent;