"use client";

import { useState } from "react";
import { updateConsultationStatusAction } from "@/app/actions/admin";
import { Search, CheckCircle, Archive } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or company..."
            className="w-full rounded-lg bg-slate-50 border border-slate-200 pl-9 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {["all", "new", "contacted", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                statusFilter === st
                  ? "bg-purple-700 text-white"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900"
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
        <div className={`rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm ${selectedItem ? "lg:col-span-2" : "lg:col-span-3"}`}>
          {filteredItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-mono">
                  <tr>
                    <th className="py-3 px-4">Lead</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Focus</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`cursor-pointer hover:bg-slate-50 transition-colors ${
                        selectedItem?.id === item.id ? "bg-purple-50/80" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        <div>{item.name}</div>
                        {item.company && <div className="text-[10px] text-slate-500">{item.company}</div>}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        <a href={`mailto:${item.email}`} onClick={(e) => e.stopPropagation()} className="hover:text-purple-700">
                          {item.email}
                        </a>
                      </td>
                      <td className="py-3.5 px-4 capitalize font-mono text-purple-700 font-semibold">{item.project_type}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            item.status === "new"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : item.status === "contacted"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
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
                            className="p-1 rounded text-emerald-600 hover:bg-emerald-50"
                            title="Mark as Contacted"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(item.id, "archived")}
                            className="p-1 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700"
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
            <div className="p-8 text-center text-xs text-slate-500">No consultation requests match your filter.</div>
          )}
        </div>

        {/* Selected Item Detail Sidebar */}
        {selectedItem && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Lead Details</h3>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-xs text-slate-500 hover:text-slate-900"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Name</span>
                <span className="text-sm font-bold text-slate-900">{selectedItem.name}</span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Business Email</span>
                <a href={`mailto:${selectedItem.email}`} className="text-purple-700 hover:underline font-mono font-semibold">
                  {selectedItem.email}
                </a>
              </div>

              {selectedItem.company && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Company</span>
                  <span>{selectedItem.company}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Focus</span>
                  <span className="capitalize text-purple-700 font-semibold">{selectedItem.project_type}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Budget</span>
                  <span>{selectedItem.budget || "N/A"}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Project Summary</span>
                <p className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 whitespace-pre-line leading-relaxed">
                  {selectedItem.message}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Update Status</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedItem.id, "new")}
                    className="flex-1 py-1.5 rounded bg-slate-50 border border-slate-200 text-[10px] font-bold uppercase text-slate-700 hover:border-purple-500"
                  >
                    New
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedItem.id, "contacted")}
                    className="flex-1 py-1.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-bold uppercase text-emerald-700 hover:bg-emerald-100"
                  >
                    Contacted
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedItem.id, "archived")}
                    className="flex-1 py-1.5 rounded bg-slate-100 text-[10px] font-bold uppercase text-slate-600 hover:text-slate-900"
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
