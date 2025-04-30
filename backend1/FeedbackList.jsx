import React, { useEffect, useState } from 'react';

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch('/api/feedback');
                const data = await response.json();
                setFeedbacks(data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Feedback Submissions</h2>
            {feedbacks.length > 0 ? (
                feedbacks.map(feedback => (
                    <div key={feedback._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <p><strong>Name:</strong> {feedback.name}</p>
                        <p><strong>Email:</strong> {feedback.email}</p>
                        <p><strong>Message:</strong> {feedback.message}</p>
                        <p><strong>Date:</strong> {new Date(feedback.createdAt).toLocaleString()}</p>
                    </div>
                ))
            ) : (
                <p>No feedback submitted yet.</p>
            )}
        </div>
    );
};

export default FeedbackList;
