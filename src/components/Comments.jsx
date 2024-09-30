import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../api';

export default function Comments({ recipeId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        fetchComments();
    }, [recipeId]);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${apiUrl}recipe/${recipeId}/comments`);
            setComments(res.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const submitComment = async () => {
        if (newComment.trim() !== "") {
            try {
                await axios.post(`${apiUrl}recipe/${recipeId}/comments`, { comment: newComment });
                setNewComment(""); // Reset comment input
                fetchComments(); // Fetch updated comments
            } catch (error) {
                console.error("Error submitting comment:", error);
            }
        }
    };

    return (
        <div className='comments-section'>
            <h3>Comments</h3>
            <ul>
                {comments.map((comment, idx) => (
                    <li key={idx}>{comment.comment}</li>
                ))}
            </ul>
            <div className='comment-input'>
                <input
                    type='text'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder='Add a comment...'
                />
                <button onClick={submitComment}>Submit</button>
            </div>
        </div>
    );
}