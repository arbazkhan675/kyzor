"use client";

import { useState } from "react";
import { updateConsultationStatusAction } from "@/app/actions/admin";
import { Search, Mail, Phone, Building2, Calendar, MessageSquare, CheckCircle, Archive, Clock } from "lucide-react";
import type { Database } from "@/lib/types/database.types";

type Consultation = Database["public"]["Tables"]["consultation_requests"]["Row"];

interface Props {
  initialItems: Consultation[];
}

export function ConsultationManager({ initialItems }: Props) {
  const [items, setItems] = useState<Consultation[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [selectedItem, setSelectedItem] = useState<Consultation | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.company && item.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: "new" | "contacted" | "archived") => {
    const res = await updateConsultationStatusAction(id, newStatus);
    if (res.success) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, status: newStatus });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or company..."
            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {["all", "new", "contacted", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                statusFilter === st
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Consultations Table & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table View */}
        <div className={`rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden ${selectedItem ? "lg:col-span-2" : "lg:col-span-3"}`}>
          {filteredItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-zinc-800 bg-zinc-950 text-zinc-400 uppercase font-mono">
                  <tr>
                    <th className="py-3 px-4">Lead</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Focus</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`cursor-pointer hover:bg-zinc-900 transition-colors ${
                        selectedItem?.id === item.id ? "bg-purple-500/10" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div>{item.name}</div>
                        {item.company && <div className="text-[10px] text-zinc-500">{item.company}</div>}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-400">
                        <a href={`mailto:${item.email}`} onClick={(e) => e.stopPropagation()} className="hover:text-purple-400">
                          {item.email}
                        </a>
                      </td>
                      <td className="py-3.5 px-4 capitalize font-mono text-purple-400">{item.project_type}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            item.status === "new"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : item.status === "contacted"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(item.id, "contacted")}
                            className="p-1 rounded text-emerald-400 hover:bg-emerald-500/20"
                            title="Mark as Contacted"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(item.id, "archived")}
                            className="p-1 rounded text-zinc-400 hover:bg-zinc-800"
                            title="Archive Request"
                          >
                            <Archive className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-zinc-500">No consultation requests match your filter.</div>
          )}
        </div>

        {/* Selected Item Detail Sidebar */}
        {selectedItem && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-bold text-white">Lead Details</h3>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-xs text-zinc-500 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs text-zinc-300">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Name</span>
                <span className="text-sm font-bold text-white">{selectedItem.name}</span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Business Email</span>
                <a href={`mailto:${selectedItem.email}`} className="text-purple-400 hover:underline font-mono">
                  {selectedItem.email}
                </a>
              </div>

              {selectedItem.company && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Company</span>
                  <span>{selectedItem.company}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Focus</span>
                  <span className="capitalize text-purple-400 font-semibold">{selectedItem.project_type}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Budget</span>
                  <span>{selectedItem.budget || "N/A"}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Project Summary</span>
                <p className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 whitespace-pre-line leading-relaxed">
                  {selectedItem.message}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Update Status</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedItem.id, "new")}
                    className="flex-1 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-bold uppercase text-zinc-300 hover:border-purple-500"
                  >
                    New
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedItem.id, "contacted")}
                    className="flex-1 py-1.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-bold uppercase text-emerald-300 hover:bg-emerald-500/30"
                  >
                    Contacted
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedItem.id, "archived")}
                    className="flex-1 py-1.5 rounded bg-zinc-800 text-[10px] font-bold uppercase text-zinc-400 hover:text-white"
                  >
                    Archive
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
