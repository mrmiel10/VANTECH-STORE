import Filters from "../../../components/Filters";
import FiltersSheet from "../../../components/FiltersSheet";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 lg:px-6 grid lg:grid-cols-[270px_1fr] gap-10 items-start">
    <FiltersSheet />
    <Filters  />
    <div className="grid gap-6 md:gap-8">
       {children}
    </div>
  </div>
  );
}