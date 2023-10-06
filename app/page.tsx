import Link from 'next/link';

export default function Page() {
    return (
        <div className="flex flex-col justify-center py-5">
            <label className="font-mono text-6xl">Chat App</label>
            <div className="flex justify-between mt-3">
                <Link
                    className="w-32 h-8 pt-1 rounded-md text-center bg-blue-200 hover:bg-blue-100"
                    href="/chat"
                >
                    ログイン
                </Link>
                <Link
                    className="w-32 h-8 pt-1 rounded-md text-center bg-blue-200 hover:bg-blue-100"
                    href="/signup"
                >
                    登録
                </Link>
            </div>
        </div>
    );
}
