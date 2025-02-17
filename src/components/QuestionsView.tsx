// src/components/QuestionsView.tsx (example React component)
import React, { useEffect, useState } from 'react';
import { getShuffledQuestions, CATEGORY } from '../data/questions';

type ShuffledData = ReturnType<typeof getShuffledQuestions>;

export default function QuestionsView() {
    const [shuffledData, setShuffledData] = useState<ShuffledData | null>(null);

    useEffect(() => {
        // Call the shuffle each time this component mounts or refreshes
        const data = getShuffledQuestions();
        setShuffledData(data);
    }, []);

    if (!shuffledData) {
        return <div>Loading questions...</div>;
    }

    return (
        <div style={{ padding: '1rem' }}>
            {/* Render each category in any order you like */}
            <h1>Career & Future Path</h1>
            {shuffledData[CATEGORY.CAREER].map((question) => (
                <div key={question.id} style={{ margin: '1rem 0' }}>
                    <h2>{question.text}</h2>
                    <ul>
                        {question.options.map((option) => (
                            <li key={option.value}>{option.label}</li>
                        ))}
                    </ul>
                </div>
            ))}

            <h1>Interest & Enjoyment</h1>
            {shuffledData[CATEGORY.INTEREST].map((question) => (
                <div key={question.id} style={{ margin: '1rem 0' }}>
                    <h2>{question.text}</h2>
                    <ul>
                        {question.options.map((option) => (
                            <li key={option.value}>{option.label}</li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Repeat for SKILLS, LEARNING, FUTURE ... */}
        </div>
    );
}
