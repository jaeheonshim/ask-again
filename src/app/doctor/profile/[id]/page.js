import DoctorProfileCard from "../DoctorProfileCard";

export default function({params}) {
    const { id } = params;

    console.log(id);

    return (
        <DoctorProfileCard id={id} />
    )
}