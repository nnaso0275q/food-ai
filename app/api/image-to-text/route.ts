import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const { imageFile } = await req.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Upload an image and let AI describe what it sees.

Our system uses advanced vision models to analyze the content of your image and instantly generate a clear, human-like text description.
User question: "${imageFile}"`,
  });
  console.log(response.text);
  return NextResponse.json({ message: response.text });
}
