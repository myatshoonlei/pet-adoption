import ManageShelterForm from "@/components/ManageShelterForm";

const getShelterById = async (id) => {
  try {
    const res = await fetch(`/api/shelters/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch shelter details");
    }

    const shelter = await res.json();
    console.log("Fetched shelter:", shelter); // Debugging log
    return {
      id: shelter._id, // Ensure mapping `_id` to `id`
      name: shelter.name,
      email: shelter.email,
      phoneNumber: shelter.phoneNumber,
      city: shelter.city,
    };
  } catch (error) {
    console.log(error);
  }
};

export default async function ManageShelter({ params }) {
  const { id } = params;
  const shelter = await getShelterById(id);

  console.log("Shelter details to pass to ManageShelterForm:", shelter); // Debugging log

  if (!shelter) return <div>Loading...</div>; // Handle case where shelter data is not ready

  return <ManageShelterForm {...shelter} />;
}
