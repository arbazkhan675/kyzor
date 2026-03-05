"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, User } from "lucide-react";

const ADMIN_EMAIL = "admin@kyzor.com";

export default function InternChatPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUserEmail(user?.email || null);
        }
        getUser();
    }, []);

    useEffect(() => {
        if (!userEmail) return;

        fetchMessages();

        // Subscribe to new messages in direct_messages
        const channel = supabase
            .channel("direct_chat_intern")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "direct_messages",
                },
                (payload) => {
                    const msg = payload.new;
                    // Only add if it belongs to this conversation
                    const isRelevant =
                        (msg.sender_email === userEmail && msg.receiver_email === ADMIN_EMAIL) ||
                        (msg.sender_email === ADMIN_EMAIL && msg.receiver_email === userEmail);

                    if (isRelevant) {
                        setMessages((prev) => {
                            if (prev.find(m => m.id === msg.id)) return prev;
                            return [...prev, msg];
                        });
                    }
                }
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "direct_messages",
                },
                (payload) => {
                    setMessages((prev) => prev.filter((m) => m.id !== payload.old.id));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userEmail]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    async function fetchMessages() {
        if (!userEmail) return;
        setLoading(true);
        const { data } = await supabase
            .from("direct_messages")
            .select("*")
            .or(`and(sender_email.eq.${userEmail},receiver_email.eq.${ADMIN_EMAIL}),and(sender_email.eq.${ADMIN_EMAIL},receiver_email.eq.${userEmail})`)
            .order("created_at", { ascending: true });

        if (data) setMessages(data);
        setLoading(false);
    }

    async function sendMessage(e: React.FormEvent) {
        e.preventDefault();
        if (!newMessage.trim() || !userEmail) return;

        const content = newMessage.trim();
        setNewMessage("");

        const { data, error } = await supabase.from("direct_messages").insert([
            {
                sender_email: userEmail,
                receiver_email: ADMIN_EMAIL,
                content: content,
            },
        ]).select();

        if (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message: " + error.message);
        } else if (data && data[0]) {
            // Optimistically add to state if not already added by real-time
            setMessages((prev) => {
                if (prev.find(m => m.id === data[0].id)) return prev;
                return [...prev, data[0]];
            });
        }
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e as any);
        }
    }

    function formatTime(dateStr: string) {
        return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function formatDate(dateStr: string) {
        return new Date(dateStr).toLocaleDateString([], { day: 'numeric', month: 'short' });
    }

    if (loading && !userEmail) {
        return <div className="p-12 text-center text-muted-foreground animate-pulse font-mono uppercase tracking-[0.2em] text-xs">Loading Secure Connection...</div>;
    }

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto px-4">
            <div className="mb-6">
                <h1 className="text-xl font-bold tracking-tight uppercase">Support Chat</h1>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Direct encrypted line to Admin</p>
            </div>

            <Card className="flex-1 overflow-hidden rounded-[2rem] border-white/10 bg-white/[0.02] backdrop-blur-3xl flex flex-col shadow-2xl relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 opacity-50" />

                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
                >
                    {messages.length === 0 && !loading && (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground/30 text-xs italic space-y-4">
                            <div className="h-12 w-12 rounded-full border border-dashed border-white/10 flex items-center justify-center">
                                <User className="h-6 w-6 opacity-20" />
                            </div>
                            <p className="uppercase tracking-widest font-black text-[9px]">Initiate transmission to Admin</p>
                        </div>
                    )}

                    {messages.map((msg, i) => {
                        const isMe = msg.sender_email === userEmail;
                        const prevMsg = messages[i - 1];
                        const showDate = !prevMsg || formatDate(prevMsg.created_at) !== formatDate(msg.created_at);

                        return (
                            <div key={msg.id} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                {showDate && (
                                    <div className="flex justify-center my-8">
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.01]">
                                            {formatDate(msg.created_at)}
                                        </span>
                                    </div>
                                )}
                                <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[75%] space-y-1.5`}>
                                        <div className={`
                      px-5 py-3 rounded-2xl text-sm leading-relaxed tracking-wide whitespace-pre-wrap
                      ${isMe
                                                ? "bg-indigo-500 text-white rounded-tr-none shadow-xl shadow-indigo-500/20"
                                                : "bg-white/10 text-foreground rounded-tl-none border border-white/10 backdrop-blur-md"}
                    `}>
                                            {msg.content}
                                        </div>
                                        <div className={`text-[9px] font-black opacity-30 uppercase tracking-tighter px-1 ${isMe ? "text-right" : "text-left"}`}>
                                            {formatTime(msg.created_at)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                    <form onSubmit={sendMessage} className="flex gap-3">
                        <Textarea
                            id="chat-input"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message... (Shift+Enter for new line)"
                            className="min-h-[48px] max-h-[120px] rounded-2xl border-white/10 bg-white/[0.02] focus-visible:ring-indigo-500/20 text-sm px-5 py-3 resize-none"
                            rows={1}
                        />
                        <Button
                            id="send-button"
                            type="submit"
                            size="icon"
                            className="rounded-2xl bg-indigo-500 hover:bg-indigo-600 shrink-0 h-12 w-12 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                            disabled={!newMessage.trim()}
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}
