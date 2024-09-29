import MarkdownRenderer from "@/components/MarkdownRenderer"
import { useEffect, useState } from "react"
import {useRouter} from 'next/navigation';

export function UserEmergencyComponent() {
    return <div>
        <small>Bandage</small>
         <div className="border-solid border-2 border-purple rounded-lg p-4">
            <h4>Seek Medical Attention Now</h4>
            <p>askAgain cannot properly diagnose your issue.</p>
        </div>
    </div>

}

export function UserPromptComponent({ data }) {
    return <div>
        <small>You</small>
        <div className="border-solid border-2 border-purple rounded-lg px-3 mb-3">
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
    <div className="border-solid border-2 border-purple rounded-lg px-3 mb-3">
        <MarkdownRenderer content={content} />
    </div>
</div>
}

export function SuggestDoctors({ data, searchDoctor }) {
    const router = useRouter();

    return (
        <div className="rounded-lg p-4 -md mb-4">
            <small className="text-gray-500 font-medium"></small>
            <div className="border border-gray-300 rounded-lg p-4 mt-2 bg-gray-50">
                <div className="text-gray-700">
                    <span className="font-bold">Bandage</span> suggests that you consult a <pre className="inline text-purple-700 font-medium">{data.speciality}</pre>. {data.description}
                </div>
                <button 
                    type="button" 
                    onClick={() => searchDoctor(data.speciality)} 
                    className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 focus:outline-none"
                >
                    Search for {data.speciality} on AskAgain
                </button>
            </div>
        </div>
    );
}