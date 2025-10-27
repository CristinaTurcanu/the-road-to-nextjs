"use client";

import { useState } from "react";

type Props = {
  ticketTitle?: string;
  ticketDescription: string;
  previousComments?: string;
  onInsertSuggestion?: (suggestion: string) => void;
};

export default function AiSuggestedReply({
    ticketTitle,
    ticketDescription,
    previousComments,
    onInsertSuggestion,
}: Props) {
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState("");

    async function handleSuggest() {
        setLoading(true);
        const res = await fetch("/api/ai/suggest-reply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ticketTitle, ticketDescription, previousComments }),
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Server error: ${error}`);
        }

        const data = await res.json();
        setSuggestion(data.suggestion);
    }

    return (
        <div className="p-4 border rounded-xl">
            <button
                onClick={handleSuggest}
                disabled={loading}
                className="px-3 py-1 rounded disabled:opacity-60"
            >
                {loading ? "Thinking..." : "✨ Suggest Reply"}
            </button>

            {suggestion && (
                <div className="mt-3 p-3 border rounded">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{suggestion}</p>
                    {onInsertSuggestion && (
                        <button
                            onClick={() => onInsertSuggestion(suggestion)}
                            className="mt-2 px-2 py-1 text-sm bg-green-600 text-white rounded"
                        >
                            Insert into comment box
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
