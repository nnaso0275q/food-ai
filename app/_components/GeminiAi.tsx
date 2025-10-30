"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const GeminiAi = () => {
  const [input, setInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const SendChat = async (file: File) => {
    setLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageFile: base64Image }),
      });

      const data = await res.json();
      setResponse(data?.message || "No response");
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) SendChat(file);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img src="/chat.svg" alt="chat" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[380px] h-[472px]">
        <div className="flex items-center justify-between">
          <DropdownMenuLabel>Chat assistant</DropdownMenuLabel>
          <Button
            variant="outline"
            className="w-8 h-8 rounded-md bg-gray-400"
          />
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="mx-[18px] bg-gray-100">
          {loading ? <p>Loading...</p> : response && <p>{response}</p>}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="mt-84" />

        <div className="flex flex-col gap-2 mx-[18px] mt-2">
          <Input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Type your message..."
          />

          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// export const GeminiAi = () => {
//   const [input, setInput] = useState<string>("");
//   const [response, setResponse] = useState<string>("");

//   const SendChat = async (file: File) => {
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64Image = reader.result;

//       const response = await fetch("/api/gemini", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ imageFile: base64Image }),
//       });
//       const data = await response.json();
//       if (data) {
//         setResponse(data.message);
//       }
//       reader.readAsDataURL(file);
//     };
//   };
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <img src="/chat.svg"></img>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-[380px] h-[472px]">
//         <div className="flex items-center justify-between">
//           <DropdownMenuLabel>Chat assistand</DropdownMenuLabel>
//           <Button
//             variant="outline"
//             className="w-8 h-8 rounded-md bg-gray-400"
//           />
//         </div>
//         <DropdownMenuSeparator />

//         <DropdownMenuItem className="mx-[18px] bg-gray-100">
//           {response && <p>{response}</p>}
//         </DropdownMenuItem>
//         <DropdownMenuSeparator className="mt-84" />
//         <div className="flex items-center gap-2 mx-[18px] mt-2 ">
//           <Input
//             onChange={(e) => setInput(e.target.value)}
//             value={input}
//             placeholder="Type your message..."
//           />
//           <img onClick={SendChat} src="/send.svg"></img>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };
