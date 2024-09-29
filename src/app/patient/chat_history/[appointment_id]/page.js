import MarkdownRenderer from "@/components/MarkdownRenderer";
import Appointment from "@/models/appointment";
import connectMongo from "@/mongoose";
import { notFound } from "next/navigation";

function DefaultTextComponent({ data }) {
    return <div>
    <small>Bandage</small>
    <div className="border-solid border-2 border-black rounded-lg px-3 mb-3">
        <MarkdownRenderer content={data.content} />
    </div>
</div>
}

function UserPromptComponent({ data }) {
    return <div>
        <small>You</small>
        <div className="border-solid border-2 border-black rounded-lg px-3 mb-3">
            <MarkdownRenderer content={data.content} />
        </div>
    </div>
}

function SuggestDoctors({ data }) {
    return <div>
    <small>Bandage</small>
    <div className="border-solid border-2 border-black rounded-lg px-3 mb-3 py-4">
        <div>
            Bandage suggests that you consult a <pre>{data.speciality}</pre>. {data.description}
        </div>
    </div>
</div>
}

const parseResponse = (data) => {
    if (!data) return null;
    if (data.type === "text") {
      return <DefaultTextComponent data={data} />;
    } else if (data.type === "user") {
      return <UserPromptComponent data={data} />;
    } else if (data.type === "suggest-speciality") {
      return <SuggestDoctors data={data} />;
    }
  };

export default async function ChatHistory({params}) {
    await connectMongo();
    const appointmentId = params.appointment_id;

    const appointment = await Appointment.findById(appointmentId).populate("patient");
    if(!appointment || !appointment.chatHistory) {
        return notFound();
    }

    return <div className="container py-3">
        <h1 className="h2">Chat History for {appointment.patient.fullName}</h1>
        <h2>{appointment.createdAt.toISOString()}</h2>
        <br />
        <div>
            {appointment.chatHistory.map(e => parseResponse(e))}
            <div>End of chat.</div>
        </div>
    </div>
}