import Filters from "../../../components/GenericComponentsPage/Filters";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto p-8 lg:py-16  grid lg:grid-cols-[270px_1fr] gap-10 items-start">
      <Filters />
      <main>{children}</main>
    </div>
  );
}
