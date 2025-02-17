// src/components/MyQuiz.tsx (TypeScript example)
import React, { useEffect, useState } from 'react';
import { getShuffledQuestions } from '../data/questions';

export default function MyQuiz() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // Call the shuffle function in the browser (runtime), not at build-time
        const shuffled = getShuffledQuestions();
        setData(shuffled);
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div>
            <h2>Career Questions</h2>
            {data.CAREER.map((q: any) => (
                <div key={q.id}>
                    <p>{q.text}</p>
                    <ul>
                        {q.options.map((opt: any) => (
                            <li key={opt.value}>{opt.label}</li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Repeat the same pattern for data.INTEREST, data.SKILLS, data.LEARNING, and data.FUTURE */}
        </div>
    );
}
