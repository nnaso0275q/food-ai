import { InferenceClient } from "@huggingface/inference";
import { NextRequest } from "next/server";

const hf = new InferenceClient(process.env.HF_TOKEN);
// export async function POST (req: NextRequest) {
//   try{
//     const {promt}=await req.json()

//     const image=(await hf.textToImage({
//         model: "black-forest-labs/FLUX.1-dev",

//     }))
//   }
// };
