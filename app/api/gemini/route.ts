import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite-preview-09-2025",
    contents: `You are Pinecone Academy's official AI assistant.

Your purpose:
- Help users with topics related to Pinecone Academy only.
- Provide accurate, friendly, and helpful answers about the Academy’s courses, teachers, schedules, policies, and activities.
- If the user asks something unrelated to Pinecone Academy, politely respond with:
  "I'm sorry, I can only answer questions about Pinecone Academy."

Answer in a natural and conversational tone.

User question: "${text}"`,
  });
  console.log(response.text);
  return NextResponse.json({ message: response.text });
}
