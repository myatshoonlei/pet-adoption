import EditPetForm from "@/components/EditPetForm";

const getPetById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/pets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch pet");
    }

    const pet = await res.json();
    console.log("Fetched pet:", pet); // Debugging log
    return {
      id: pet._id, // Ensure mapping `_id` to `id`
      name: pet.name,
      breed: pet.breed,
      description: pet.description,
      status: pet.status,
    };
  } catch (error) {
    console.log(error);
  }
};

export default async function EditPet({ params }) {
  const { id } = params;
  const pet = await getPetById(id);

  console.log("Pet details to pass to EditPetForm:", pet); // Debugging log

  if (!pet) return <div>Loading...</div>; // Handle case where pet data is not ready

  return <EditPetForm {...pet} />;
}
