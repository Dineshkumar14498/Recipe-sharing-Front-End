import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../api';  // Base API URL

export default function Comments({ recipeId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetchComments();
    }, [recipeId]);

    const fetchComments = async () => {
        try {
            const res = await axios.get(apiUrl + `/recipe/${recipeId}/comments`);
            setComments(res.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const submitComment = async () => {
        if (newComment.trim() !== '' && rating > 0) {
            try {
                await axios.post(apiUrl + `/recipe/${recipeId}/comments`, {
                    comment: newComment,
                    rating: parseInt(rating, 10),
                    user: 'User1'  // Replace with actual user authentication
                });
                setNewComment('');
                setRating(0);
                fetchComments();  // Fetch updated comments after submission
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        }
    };

    return (
        <div className='comments-section'>
            <h3>Comments</h3>
            <ul>
                {comments.map((comment, idx) => (
                    <li key={idx}>
                        {comment.comment} - {comment.rating}/5
                    </li>
                ))}
            </ul>
            <div className='comment-input'>
                <input
                    type='text'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder='Add a comment...'
                />
                <input
                    type='number'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder='Rate (1-5)'
                    min='1'
                    max='5'
                />
                <button onClick={submitComment}>Submit</button>
            </div>
        </div>
    );
}
