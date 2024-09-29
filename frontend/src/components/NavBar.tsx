import Link from "next/link";
import { ModeToggle } from "./ThemeToggleButton";
import { BorderBeam } from "./ui/border-beam";
import { Button } from "./ui/button";

export function NavBar() {
  return (
    <div className="flex flex-row  drop-shadow-md justify-around pt-5 py-6 border-b overflow-hidden opacity-100">
      <Link href={"/"}>
        <div>
          <div className="font-bold text-2xl">KYC platform</div>
        </div>
      </Link>
      <div className=" gap-8 flex flex-row justify-center items-center">
        <Link href={"/upload"}>
          <Button variant="outline">Upload</Button>
        </Link>
        <Link href={"/neighbour"}>
          <Button variant="outline">ApproximateNN</Button>
        </Link>
        <Link href={"/video"}>
          <Button variant="outline">Liveness Detection</Button>
        </Link>
        <div>
          <ModeToggle />
        </div>
      </div>

      <BorderBeam borderWidth={1.5} size={500} />
    </div>
  );
}
