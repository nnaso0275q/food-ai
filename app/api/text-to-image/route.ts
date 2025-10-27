import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

const hf = new InferenceClient(process.env.HF_TOKEN || "");
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const image = (await hf.textToImage({
      model: "black-forest-labs/FLUX.1-dev",
      inputs: `${prompt} and always old styled`,
    })) as unknown as Blob;

    const buffer = await image.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return NextResponse.json({
      image: `data:image/png;base64,${base64}`,
    });
  } catch (error) {
    console.log("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed text to image" },
      { status: 500 }
    );
  }
}
