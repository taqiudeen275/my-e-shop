import React, { useEffect, useState } from 'react';
import { Star1 } from "iconsax-react";
import { createReview, getReviews } from '../sever/general';
import { LabelInputContainer } from "@/app/login/components";
import { Textarea } from "@/app/components/ui/textarea";
import { useCookies } from 'next-client-cookies';
import { AuthModel, RecordModel } from 'pocketbase';
import pb from '@/lib/pocketbase_client';



interface ReviewData {
  user: AuthModel;
  product: string | number|undefined;
  rating: number;
  comment: string;
}

interface ReviewComponentProps {
  productId: string;
  onReviewSubmit: (review: ReviewData) => void;
}

export const ReviewComponent: React.FC<ReviewComponentProps> = ({ productId,onReviewSubmit  }) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [user, setUser] = useState<AuthModel|null>();

  
  const cookies = useCookies();
  useEffect(() => {
    // setPath(path)
    setPbCookie()
 
    function setPbCookie() {
    pb.client.authStore.loadFromCookie(cookies.get('pb_auth')?? "") 
  setUser(pb.client.authStore.model);
  }}, [cookies]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();   
    const reviewData: ReviewData = {
      user: user?.id,
      product: productId,
      rating,
      comment: review
    };
    
    try {
      await createReview(reviewData);
      setRating(0);
      setReview('');
      onReviewSubmit(reviewData);
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
            className={`cursor-pointer hover:text-primary ${star <= rating ? 'text-primary ' : 'text-gray-300'}`}
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
        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-150"
      >
        Submit Review
      </button>
    </div>
  );
};



type ReviewsListProps = {
  productId: string;
  updated: number;
};

export const ReviewsList: React.FC<ReviewsListProps> = ({ productId,updated }) => {
  const [reviews, setsetReviews] = useState<RecordModel[]|null>();
  const [selfUpdate, setSelfUpdate] = useState(0);
  
  useEffect(() => {
    
    const fetchInitialData = async () => {
      const reviewsResponse = await getReviews([], `product="${productId}"`);
      setSelfUpdate(updated)
      setsetReviews(reviewsResponse);
    };

    fetchInitialData();
   
  }, [productId, updated]);

  return (
    <div className="space-y-4">
      {reviews?.map((review) => (
        <div
          key={review.id}
          className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
        >
          <div className="flex items-center">
            {/* Render stars based on the rating */}
            {Array.from({ length: 5 }, (_, i) => (
              <Star1
                key={i}
                className={`h-5 w-5 ${
                  i < review.rating ? 'text-primary' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {review.comment}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            Reviewed on: {new Date(review.created).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

