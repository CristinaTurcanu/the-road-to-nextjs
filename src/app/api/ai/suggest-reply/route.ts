/* eslint-disable @typescript-eslint/no-explicit-any */
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
    try {
        const { ticketTitle, ticketDescription, previousComments } = await req.json();

        if (!ticketDescription) {
            return Response.json({ error: "Missing description" }, { status: 400 });
        }

        const messages: any = [
            {
                name: '1',
                role: "system",
                content: `You are an AI assistant for a customer support ticketing system. 
                Write a short, helpful, and polite response to the user's issue.`,
            },
            {
                name: '2',
                role: "user",
                content: `
                Ticket: ${ticketTitle || "(no title)"}
                Description: ${ticketDescription}
                Previous Comments: ${previousComments || "none"}
            `,
            },
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-5-mini",
            messages,
        });

        const suggestion = completion.choices[0].message?.content;
        return Response.json({ suggestion });
    } catch (err: any) {
        console.error("AI route error:", err);
        return Response.json(
            { error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}
