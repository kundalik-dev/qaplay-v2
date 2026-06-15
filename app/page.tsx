import { AppFooter } from "@/components/app-nav/app-footer";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-1 flex-col items-center justify-center bg-transparent font-sans">
      <div className="flex space-x-1.5">
        <Button variant={"default"}>Hello World!</Button>
        <Button variant="destructive">Hello World!</Button>
        <Button variant="ghost">Hello World!</Button>
        <Button variant="link">Hello World!</Button>
        <Button variant="outline">Hello World!</Button>
        <Button variant="secondary">Hello World!</Button>
      </div>

      <div className="pt-2 space-y-2">
        <h1 className="">Hello World!</h1>
        <h2 className="">Hello World!</h2>
      </div>
    </div>
  );
}
