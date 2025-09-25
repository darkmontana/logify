'use client';
import { useState, FormEvent } from "react";
import {login} from "@/app/api";

export default function Home() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("No Message");

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const user_data = await login(username, password);

        if (user_data) setMessage("Success");
        else setMessage("Fail");

        // @ts-ignore
        //const tg = window.Telegram.WebApp;
        //if (user_data) tg.sendData(JSON.stringify(user_data));
        //else tg.sendData(JSON.stringify({validity: 0,}));
        //tg.close();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-2 bg-white p-4 rounded-xl shadow"
            >
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                >
                    Login
                </button>
            </form>
            <h3>{message}</h3>
        </div>
    );
}
