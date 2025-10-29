import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

// const hf = new InferenceClient(process.env.HF_TOKEN || "")
export async function POST(req: NextRequest) {
  try {
    const { imageFile } = await req.json();

    if (!imageFile) {
      return NextResponse.json(
        { error: "imageFile is required" },
        { status: 400 }
      );
    }
    const response = (await hf.ImageToText({
      model: "datalab-to/chandra",
      inputs: `${imageFile}`,
      //               messages: [
      //         {
      //           role: "user",
      //           content: `Extract only the ingredients from this food description and return them as a simple comma-separated list without any explanation.
      // Food description: ${imageFile}
      // Ingredients:`,
      //         },
      //       ],
    })) as unknown as Blob;

    const extractedText = response.choices[0]?.message?.content || "";

    return NextResponse.json({
      response: extractedText.trim(),
    });
  } catch (error) {
    console.log("Error extracted text:", error);
    return NextResponse.json(
      { error: "Failed to extracted text" },
      { status: 500 }
    );
  }
}
