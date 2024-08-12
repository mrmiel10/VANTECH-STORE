import Filters from "../../../components/Filters";
import FiltersSheet from "../../../components/FiltersSheet";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
<<<<<<< Updated upstream
    <div className="container mx-auto px-4 lg:px-6 grid lg:grid-cols-[270px_1fr] gap-10 items-start">
    <FiltersSheet />
=======
    <div className="container mx-auto p-8 lg:py-16  grid lg:grid-cols-[270px_1fr] gap-10 items-start">
    
    {/* <FiltersSheet /> */}
    <Suspense fallback={"loading"}>
>>>>>>> Stashed changes
    <Filters  />
    </Suspense>
  
    <div className="grid gap-6 md:gap-8">
       {children}
    </div>
  </div>
  );
}