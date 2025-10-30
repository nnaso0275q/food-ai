import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

const hf = new InferenceClient(process.env.HF_TOKEN || "");
export async function POST(req: NextRequest) {
  try {
    const { imageFile } = await req.json();

    if (!imageFile) {
      return NextResponse.json(
        { error: "imageFile is required" },
        { status: 400 }
      );
    }
    const response = await hf.imageToText({
      model: "nlpconnect/vit-gpt2-image-captioning",
      inputs: imageFile,
    });

    return NextResponse.json({
      response: response.generated_text,
    });
  } catch (error) {
    console.log("Error extracted text:", error);
    return NextResponse.json(
      { error: "Failed to extracted text" },
      { status: 500 }
    );
  }
}
