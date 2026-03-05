"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, User, Search, MessageSquare, Trash2 } from "lucide-react";

const ADMIN_EMAIL = "admin@kyzor.com";

export default function AdminChatPage() {
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedIntern, setSelectedIntern] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchConversations();

        // Global subscription to update conversation list in real-time
        const channel = supabase
            .channel("admin_direct_chat_list")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "direct_messages",
                },
                () => {
                    fetchConversations();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        if (selectedIntern) {
            fetchMessages(selectedIntern);

            const channel = supabase
                .channel(`admin_direct_chat_${selectedIntern}`)
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "direct_messages",
                    },
                    (payload) => {
                        const msg = payload.new;
                        const isRelevant =
                            (msg.sender_email === selectedIntern && msg.receiver_email === ADMIN_EMAIL) ||
                            (msg.sender_email === ADMIN_EMAIL && msg.receiver_email === selectedIntern);

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
                        fetchConversations();
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        } else {
            setMessages([]);
        }
    }, [selectedIntern]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    async function fetchConversations() {
        const { data } = await supabase
            .from("direct_messages")
            .select("sender_email, receiver_email, content, created_at")
            .order("created_at", { ascending: false });

        if (data) {
            const internsMap = new Map();
            data.forEach((m) => {
                const intern = m.sender_email === ADMIN_EMAIL ? m.receiver_email : m.sender_email;
                if (!internsMap.has(intern)) {
                    internsMap.set(intern, {
                        email: intern,
                        lastMessage: m.content,
                        time: m.created_at,
                    });
                }
            });
            setConversations(Array.from(internsMap.values()));
        }
        setLoading(false);
    }

    async function fetchMessages(internEmail: string) {
        const { data } = await supabase
            .from("direct_messages")
            .select("*")
            .or(`and(sender_email.eq.${internEmail},receiver_email.eq.${ADMIN_EMAIL}),and(sender_email.eq.${ADMIN_EMAIL},receiver_email.eq.${internEmail})`)
            .order("created_at", { ascending: true });

        if (data) setMessages(data);
    }

    async function sendMessage(e: React.FormEvent) {
        e.preventDefault();
        if (!newMessage.trim() || !selectedIntern) return;

        const content = newMessage.trim();
        setNewMessage("");

        const { data, error } = await supabase.from("direct_messages").insert([
            {
                sender_email: ADMIN_EMAIL,
                receiver_email: selectedIntern,
                content: content,
            },
        ]).select();

        if (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message: " + error.message);
        } else if (data && data[0]) {
            // Optimistically add to state
            setMessages((prev) => {
                if (prev.find(m => m.id === data[0].id)) return prev;
                return [...prev, data[0]];
            });
            fetchConversations(); // Update the sidebar last message
        }
    }

    async function handleResetChat() {
        if (!selectedIntern) return;

        const confirmReset = window.confirm(
            `Are you sure you want to reset the conversation with ${selectedIntern}? This will permanently delete all messages.`
        );

        if (!confirmReset) return;

        // Perform deletion for messages in both directions
        const { error } = await supabase
            .from("direct_messages")
            .delete()
            .or(`sender_email.eq.${selectedIntern},receiver_email.eq.${selectedIntern}`);

        if (error) {
            console.error("Error resetting chat:", error);
            alert("Failed to reset chat. Please ensure the DELETE policy is added to your Supabase table. Details: " + error.message);
        } else {
            // Immediately clear local messages
            setMessages([]);
            // Refresh conversation list to remove/update the intern's last message
            fetchConversations();
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

    const filteredConversations = conversations.filter(c =>
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] gap-6">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight uppercase">Intern Chat Portal</h1>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Manage all intern communications</p>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Contact List */}
                <Card className="w-80 overflow-hidden rounded-[2rem] border-white/10 bg-white/[0.02] flex flex-col shrink-0">
                    <div className="p-4 border-b border-white/5 bg-white/[0.01]">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground transition-colors group-focus-within:text-indigo-400" />
                            <Input
                                placeholder="Find intern..."
                                value={search}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                className="pl-9 rounded-xl border-white/10 bg-white/5 text-[10px] h-10 uppercase tracking-widest font-bold placeholder:font-medium placeholder:tracking-normal"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {loading && <div className="p-8 text-center text-[10px] font-bold text-muted-foreground/30 animate-pulse uppercase tracking-[0.2em]">Syncing...</div>}
                        {!loading && filteredConversations.length === 0 && (
                            <div className="p-12 text-center text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest leading-relaxed">
                                <MessageSquare className="h-6 w-6 mx-auto mb-3 opacity-10" />
                                No active<br />transmissions
                            </div>
                        )}
                        {filteredConversations.map((c) => (
                            <button
                                key={c.email}
                                onClick={() => setSelectedIntern(c.email)}
                                className={`
                  w-full p-5 flex items-center gap-4 transition-all border-b border-white/[0.02] relative
                  ${selectedIntern === c.email ? "bg-white/5" : "hover:bg-white/[0.03]"}
                `}
                            >
                                {selectedIntern === c.email && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full shadow-lg shadow-indigo-500/50" />
                                )}
                                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${selectedIntern === c.email ? "bg-indigo-500/10 border-indigo-500/30" : "bg-white/5 border-white/10"}`}>
                                    <User className={`h-5 w-5 ${selectedIntern === c.email ? "text-indigo-400" : "text-muted-foreground/50"}`} />
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                    <div className="text-[11px] font-black uppercase tracking-tight text-foreground/90 truncate">{c.email.split('@')[0]}</div>
                                    <div className="text-[10px] text-muted-foreground/60 truncate tracking-wide mt-0.5">{c.lastMessage}</div>
                                </div>
                                <div className="text-[8px] font-black uppercase tracking-tighter text-muted-foreground/20 shrink-0 self-start mt-1">
                                    {formatTime(c.time)}
                                </div>
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Messaging Area */}
                <Card className="flex-1 overflow-hidden rounded-[2rem] border-white/10 bg-white/[0.02] flex flex-col relative">
                    {!selectedIntern ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground space-y-6">
                            <div className="h-24 w-24 rounded-full border border-dashed border-white/5 flex items-center justify-center">
                                <MessageSquare className="h-10 w-10 opacity-5" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 italic">Select source to monitor</p>
                        </div>
                    ) : (
                        <>
                            <div className="px-8 py-5 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                                        <User className="h-5 w-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold tracking-tight">{selectedIntern}</div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" />
                                            <div className="text-[9px] text-emerald-500/80 font-black uppercase tracking-widest">Active Link</div>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleResetChat}
                                    className="rounded-xl h-9 gap-2 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-white/5"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Reset Conversation
                                </Button>
                            </div>

                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide"
                            >
                                {messages.map((msg, i) => {
                                    const isMe = msg.sender_email === ADMIN_EMAIL;
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
                                                <div className={`max-w-[70%] space-y-1.5`}>
                                                    <div className={`
                            px-5 py-3 rounded-2xl text-sm leading-relaxed tracking-wide whitespace-pre-wrap
                            ${isMe
                                                            ? "bg-indigo-500 text-white rounded-tr-none shadow-xl shadow-indigo-500/20"
                                                            : "bg-white/10 text-foreground rounded-tl-none border border-white/10 backdrop-blur-md shadow-lg"}
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
                                <form onSubmit={sendMessage} className="flex gap-4">
                                    <Textarea
                                        id="admin-chat-input"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type a reply... (Shift+Enter for new line)"
                                        className="min-h-[56px] max-h-[150px] rounded-2xl border-white/10 bg-white/[0.02] focus-visible:ring-indigo-500/20 text-sm px-6 py-4 resize-none"
                                        rows={1}
                                    />
                                    <Button
                                        id="admin-send-button"
                                        type="submit"
                                        size="icon"
                                        className="rounded-2xl bg-indigo-500 hover:bg-indigo-600 shrink-0 h-14 w-14 shadow-xl shadow-indigo-500/30 transition-all active:scale-95"
                                        disabled={!newMessage.trim()}
                                    >
                                        <Send className="h-6 w-6" />
                                    </Button>
                                </form>
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}
