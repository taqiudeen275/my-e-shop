import React, { FormEvent, useState } from "react";
import { Dialog, DialogContent, DialogTrigger , DialogClose} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SearchNormal1 } from "iconsax-react";
import { useRouter } from "next/navigation";


export const SearchContainer = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/search/${encodeURIComponent(query)}`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[25%]" variant="ghost">
          <SearchNormal1 />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-transparent border-none">
        <div className="form mt-10">
          <form onSubmit={handleSubmit}>
            <div className="form flex rounded-md border-2 border-white">
              <input
                type="text"
                className="bg-transparent outline-none text-white w-[90%] p-3"
                placeholder="Search"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <DialogClose asChild>
              <Button type="submit" variant='ghost' className="w-[50px] items-center p-3 border-r h-[50px] hover:bg-transparent">
                <SearchNormal1 className="text-white" />
              </Button>
          </DialogClose>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};