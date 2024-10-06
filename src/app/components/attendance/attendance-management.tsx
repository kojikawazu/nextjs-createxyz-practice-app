"use client";

import React, { useState, useEffect } from 'react';

/**
 * 勤怠管理コンポーネント
 * @returns JSX
 */
const AttandanceManagement = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chatResponse, setChatResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChatRequest = () => {
        setLoading(true);
        fetch("/integrations/chat-gpt/conversationgpt4", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messages: [
            {
                role: "user",
                content: "ここはなに？",
            },
            ],
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            setChatResponse(data.choices[0].message.content);
            setLoading(false);
        })
        .catch(() => {
            setChatResponse("エラーが発生しました。もう一度試してください。");
            setLoading(false);
        });
    };

    useEffect(() => {
        handleChatRequest();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
            <header className="bg-[#1c1c1c] text-white p-6 flex justify-between items-center shadow-lg">
                <div className="flex items-center">
                <i
                    className="fas fa-bars text-2xl mr-4 cursor-pointer md:hidden"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                ></i>
                <h1 className="text-3xl font-serif">TechCorp Elite</h1>
                </div>
                <nav className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-[#ffd700] transition duration-300">
                    ホーム
                </a>
                <a href="#" className="hover:text-[#ffd700] transition duration-300">
                    レポート
                </a>
                <a href="#" className="hover:text-[#ffd700] transition duration-300">
                    設定
                </a>
                </nav>
                <button className="bg-[#ffd700] text-[#1c1c1c] px-6 py-2 rounded-full font-bold hover:bg-[#f0c000] transition duration-300">
                ログアウト
                </button>
            </header>

            <div className="flex flex-grow">
                <aside
                className={`bg-[#2c2c2c] text-white w-72 p-6 fixed h-full z-20 transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:relative md:translate-x-0`}
                >
                <nav className="space-y-6">
                    <a
                    href="#"
                    className="block py-3 px-4 hover:bg-[#3c3c3c] rounded-lg transition duration-300"
                    >
                    ダッシュボード
                    </a>
                    <a
                    href="#"
                    className="block py-3 px-4 hover:bg-[#3c3c3c] rounded-lg transition duration-300"
                    >
                    勤怠管理
                    </a>
                    <a
                    href="#"
                    className="block py-3 px-4 hover:bg-[#3c3c3c] rounded-lg transition duration-300"
                    >
                    休暇申請
                    </a>
                    <a
                    href="#"
                    className="block py-3 px-4 hover:bg-[#3c3c3c] rounded-lg transition duration-300"
                    >
                    プロジェクト管理
                    </a>
                </nav>
                </aside>

                <main className="flex-grow p-8">
                <h2 className="text-4xl font-serif mb-8 text-[#1c1c1c]">勤怠管理</h2>
                <p className="text-lg font-serif text-gray-700 bg-white p-4 shadow-md rounded mb-6">
                    {loading ? "読み込み中..." : chatResponse || "ここはなに？"}
                </p>
                <form className="bg-white shadow-2xl rounded-lg p-8 max-w-lg mx-auto border border-[#ffd700]">
                    <div className="mb-6">
                    <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        htmlFor="date"
                    >
                        日付
                    </label>
                    <input
                        className="shadow-inner appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-[#ffd700] transition duration-300"
                        id="date"
                        type="date"
                        name="date"
                    />
                    </div>
                    <div className="mb-6">
                    <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        htmlFor="checkin"
                    >
                        出勤時間
                    </label>
                    <input
                        className="shadow-inner appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-[#ffd700] transition duration-300"
                        id="checkin"
                        type="time"
                        name="checkin"
                    />
                    </div>
                    <div className="mb-8">
                    <label
                        className="block text-gray-800 text-sm font-bold mb-2"
                        htmlFor="checkout"
                    >
                        退勤時間
                    </label>
                    <input
                        className="shadow-inner appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-[#ffd700] transition duration-300"
                        id="checkout"
                        type="time"
                        name="checkout"
                    />
                    </div>
                    <button
                    className="bg-[#1c1c1c] hover:bg-[#2c2c2c] text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out transform hover:scale-105"
                    type="button"
                    >
                    送信
                    </button>
                </form>
                </main>
            </div>

            <footer className="bg-[#1c1c1c] text-white p-6 text-center">
                <p className="font-serif">
                &copy; 2024 TechCorp Elite. All rights reserved.
                </p>
            </footer>
        </div>
    )
}

export default AttandanceManagement;