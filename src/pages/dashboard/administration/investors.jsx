import CardTable from "@/components/Cards/CardTable";
import Admin from "@/components/layouts/Admin";

export default function Investors() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
      </div>
    </>
  );
}

Investors.layout = Admin;
