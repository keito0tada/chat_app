import { Frame } from '@/app/page';
import { Dispatch, SetStateAction } from 'react';

export default function ChatHeader({
    handleName,
    setFrame,
}: {
    handleName: string;
    setFrame: Dispatch<SetStateAction<Frame>>;
}) {
    return (
        <header>
            <div className="w-screen h-8 bg-slate-700">
                <nav>
                    <button
                        className="text-slate-200 hover:text-slate-300"
                        onClick={() => setFrame(Frame.Setting)}
                    >
                        {handleName}
                    </button>
                </nav>
            </div>
        </header>
    );
}
