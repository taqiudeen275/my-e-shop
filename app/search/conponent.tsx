import React, { FormEvent, useEffect, useState } from "react";
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
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmit(new Event('submit') as unknown as FormEvent<HTMLFormElement>);
      }
    };
    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:scale-[1.1] transition-all text-foreground " variant="link">
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