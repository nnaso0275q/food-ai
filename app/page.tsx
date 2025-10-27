"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export default function Home() {
  // Text to Image
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Text to Text
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const TextToImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setImage("");

    try {
      const response = await fetch("/api/text-to-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();

      if (data.image) {
        setImage(data.image);
      } else {
        alert("Failed text to image");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("failed text to image");
    } finally {
      setLoading(false);
    }
  };

  const TextToText = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setResponseText("");
    try {
      const response = await fetch("/api/text-to-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputText }),
      });
      const textData = await response.json();

      if (textData.text) {
        setResponseText(textData.text);
      } else {
        alert("Failed text to text");
      }
    } catch (error) {
      alert("failed text to text");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full h-fit">
      <div className="w-full h-14">
        <div className=" mx-12 py-4 font-semibold">Ai Tools</div>
      </div>
      <div className=" border-b-fit" />
      <div className="w-full">
        <div className="mx-45">
          <div className="w-[580px] mt-6 h-150 flex justify-center">
            <Tabs defaultValue="account">
              {/* Tabs */}
              <TabsList className=" justify-between w-full">
                <TabsTrigger value="image">Image analysis</TabsTrigger>
                <TabsTrigger value="ingredient">
                  Ingredient recognition
                </TabsTrigger>
                <TabsTrigger value="created">image created</TabsTrigger>
              </TabsList>

              {/* Image analysis === Image to text*/}
              <TabsContent value="image">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="/star.svg"></img>
                    <div className="">Image analysis</div>
                  </div>
                  <div className="w-12 h-10">
                    <img src="/Button.svg"></img>
                  </div>
                </div>
                <p className="text-muted-foreground mt-2 mb-2 font-normal">
                  Upload a food photo, and AI will detect the ingredients.
                </p>
                {/* <Textarea placeholder="Choose File" /> */}
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="picture">Picture</Label>
                  <Input id="picture" type="file" />
                </div>
                <Button className="mt-2 grid justify-self-end hover:bg-gray-500">
                  Generate
                </Button>
                <div className="mt-12 gap-2 flex items-center">
                  <img src="/file.svg"></img>
                  <p>Here is summary</p>
                </div>
              </TabsContent>

              {/* Ingredient recognition === Text to text*/}
              <form onSubmit={TextToText} className="w-full">
                <TabsContent value="ingredient">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="/star.svg"></img>
                      <div className="">Ingredient recognition</div>
                    </div>

                    <img className="w-12 h-10" src="/Button.svg"></img>
                  </div>
                  <p className="text-muted-foreground mt-2 mb-2">
                    Describe the food, and AI will detect the ingredients.
                  </p>
                  <Input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message here."
                  />
                  <Button
                    type="submit"
                    disabled={isGenerating || !inputText}
                    className="mt-2 grid justify-self-end hover:bg-gray-500"
                  >
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>
                  <div className="mt-12 gap-2 flex items-center">
                    <img src="/file.svg"></img>
                    <p>Identified Ingredients</p>
                  </div>
                  <div className="text-muted-foreground mt-2 font-normal text-sm">
                    {isGenerating
                      ? "Working on your image just wait for moment"
                      : "First, enter your text to recognize an ingredients."}
                  </div>
                  <div className="border w-full h-fit rounded-lg mt-2">
                    {responseText && (
                      <p className="m-4 whitespace-pre-wrap text-sm">
                        {responseText}
                      </p>
                    )}
                  </div>
                </TabsContent>
              </form>

              {/* image created === Text to image*/}
              <form onSubmit={TextToImage} className="w-full">
                <TabsContent value="created">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="/star.svg"></img>
                      <div className="">Food image creator</div>
                    </div>
                    <button>
                      <img className="w-12 h-10" src="/Button.svg"></img>
                    </button>
                  </div>
                  <p className="text-muted-foreground mt-2 mb-2">
                    What food image do you want? Describe it briefly.
                  </p>
                  <Input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type your message here."
                  />
                  <Button
                    type="submit"
                    disabled={loading || !prompt}
                    className="mt-2 grid justify-self-end hover:bg-gray-500"
                  >
                    {loading ? "Generating..." : "Generate"}
                  </Button>

                  <div className="mt-12 gap-2 flex items-center">
                    <img src="/photo.svg"></img>
                    <p>Result</p>
                  </div>
                  <div className="border w-full h-fit rounded-lg mt-2">
                    {image && (
                      <div className="w-[300px] h-[300px] ml-4 mb-4 mt-10 ">
                        <img
                          src={image}
                          alt="Generated"
                          className="w-full rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
