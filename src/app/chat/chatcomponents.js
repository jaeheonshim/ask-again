import MarkdownRenderer from "@/components/MarkdownRenderer"
import { useEffect, useState } from "react"
import {useRouter} from 'next/navigation';

export function UserEmergencyComponent() {
    return <div>
        <div className="border-solid border-2 border-black rounded-lg px-3 mb-3">
            <h1>Call 911</h1>
        </div>
    </div>

}

export function UserPromptComponent({ data }) {
    return <div>
        <small>You</small>
        <div className="border-solid border-2 border-black rounded-lg px-3 mb-3">
            <MarkdownRenderer content={`${data.content}`} />
        </div>
    </div>

}

export function DefaultTextComponent({ data }) {
    const words = data.content.split(" ");
    const [index, setIndex] = useState(0);
    const [content, setContent] = useState('');

    useEffect(() => {
        if(index >= words.length) return;

        setTimeout(() => {
            setContent(content + " " + words[index]);
        }, 60)
        setIndex(index + 1);
    }, [content]);

    return <div>
    <small>Bandage</small>
    <div className="border-solid border-2 border-black rounded-lg px-3 mb-3">
        <MarkdownRenderer content={content} />
    </div>
</div>
}

export function SuggestDoctors({ data }) {
    const router = useRouter();

    return <div>
    <small>Bandage</small>
    <div className="border-solid border-2 border-black rounded-lg px-3 mb-3 py-4">
        <div>
            Bandage suggests that you consult a <pre>{data.speciality}</pre>. {data.description}
        </div>

        <button type="button" onClick={() => {router.push(`patient/finddoctors?speciality=${data.speciality}`)}} class="btn btn-primary mt-2">Search for {data.speciality} on AskAgain</button>
    </div>
</div>
}