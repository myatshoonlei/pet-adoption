import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getPets = async () => {
  try {
    const res = await fetch("/api/pets", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch pets");
    }

    const { pets } = await res.json();
    console.log("Pets fetched in frontend:", pets); // Debugging log
    return pets;
  } catch (error) {
    console.log("Error loading pets: ", error);
    return []; // Return an empty array in case of error
  }
};

export default async function PetsList() {
  const pets = await getPets();

  if (!pets.length) return <div>No pets available</div>;

  return (
    <>
      {pets.map((p) => (
        <div
          key={p._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{p.name}</h2>
            <div>Breed: {p.breed}</div>
            <div>Description: {p.description}</div>
            {/* Display status and handle the case where status might be undefined */}
            <div>Status: {p.status || "No status available"}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={p._id} />
            <Link href={`/editPet/${p._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
