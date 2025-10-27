import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Home() {
  return (
    <div>
      <div className="w-full h-14 bg-[#E4E4E7]">
        <div className="mx-12 py-4 font-semibold">Ai Tools</div>
      </div>
      <div className="mx-auto mt-7">
        <Tabs defaultValue="account" className="w-[580px]">
          <TabsList>
            <TabsTrigger value="image">Image analysis</TabsTrigger>
            <TabsTrigger value="ingredient">Ingredient recognition</TabsTrigger>
            <TabsTrigger value="created">image created</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
