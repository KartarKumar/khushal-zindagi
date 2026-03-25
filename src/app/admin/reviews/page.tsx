"use client";

import { useAdminStore } from "@/store/admin";
import { Star, CheckCircle2, Trash2, Clock, BadgeCheck } from "lucide-react";

export default function ReviewsPage() {
  const { reviews, approveReview, deleteReview } = useAdminStore();
  const pending = reviews.filter((r) => !r.isApproved);
  const approved = reviews.filter((r) => r.isApproved);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-2xl font-extrabold text-navy-950">{reviews.length}</p>
          <p className="text-xs text-gray-500">Total Reviews</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-2xl font-extrabold text-amber-600">{pending.length}</p>
          <p className="text-xs text-gray-500">Pending Approval</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-2xl font-extrabold text-green-600">{approved.length}</p>
          <p className="text-xs text-gray-500">Published</p>
        </div>
      </div>

      {/* Pending Reviews */}
      {pending.length > 0 && (
        <div>
          <h3 className="font-bold text-navy-950 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Pending Approval ({pending.length})
          </h3>
          <div className="space-y-3">
            {pending.map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-5 border-2 border-amber-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-navy-950 flex items-center justify-center">
                      <span className="text-gold-400 font-bold text-sm">{review.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-950">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.city} | {new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-3">&ldquo;{review.text}&rdquo;</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => approveReview(review.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Reviews */}
      <div>
        <h3 className="font-bold text-navy-950 mb-3 flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 text-green-500" />
          Published Reviews ({approved.length})
        </h3>
        <div className="space-y-3">
          {approved.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-950 flex items-center justify-center">
                    <span className="text-gold-400 font-bold text-sm">{review.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-950">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.city} | {new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-3">&ldquo;{review.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
