import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
export default function Home() {
  return (
    <div>
      <div className="w-full h-14">
        <div className=" mx-12 py-4 font-semibold">Ai Tools</div>
      </div>
      <div className="border border-b-fit"></div>
      <div className="mx-[180px]">
        <div className="w-[580px]  mt-6 h-150">
          <Tabs defaultValue="account">
            {/* Tabs */}
            <TabsList className=" justify-between w-full">
              <TabsTrigger value="image">Image analysis</TabsTrigger>
              <TabsTrigger value="ingredient">
                Ingredient recognition
              </TabsTrigger>
              <TabsTrigger value="created">image created</TabsTrigger>
            </TabsList>

            {/* Image analysis */}
            <TabsContent value="image">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/star.svg"></img>
                  <div className="">Image analysis</div>
                </div>

                <img className="w-12 h-10" src="/Button.svg"></img>
              </div>
              <p className="text-muted-foreground mt-2 mb-2">
                Upload a food photo, and AI will detect the ingredients.
              </p>
              <Textarea placeholder="Choose File" />
              <Button className="mt-2 grid justify-self-end hover:bg-gray-500">
                Generate
              </Button>
              <div className="mt-12 gap-2 flex items-center">
                <img src="/file.svg"></img>
                <p>Here is summary</p>
              </div>
            </TabsContent>

            {/* Ingredient recognition */}
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
              <Textarea placeholder="Type your message here." />
              <Button className="mt-2 grid justify-self-end hover:bg-gray-500">
                Generate
              </Button>
              <div className="mt-12 gap-2 flex items-center">
                <img src="/file.svg"></img>
                <p>Identified Ingredients</p>
              </div>
            </TabsContent>

            {/* image created */}
            <TabsContent value="created">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/star.svg"></img>
                  <div className="">Food image creator</div>
                </div>

                <img className="w-12 h-10" src="/Button.svg"></img>
              </div>
              <p className="text-muted-foreground mt-2 mb-2">
                What food image do you want? Describe it briefly.
              </p>
              <Textarea placeholder="Type your message here." />
              <Button className="mt-2 grid justify-self-end hover:bg-gray-500">
                Generate
              </Button>
              <div className="mt-12 gap-2 flex items-center">
                <img src="/photo.svg"></img>
                <p>Result</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
