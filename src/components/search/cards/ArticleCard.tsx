
import React from "react";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import type { SearchResult } from "@/types/search";

interface Props {
  result: SearchResult;
  index: number;
  getImageForResult: (result: SearchResult, index: number) => string;
}

const ArticleCard: React.FC<Props> = ({ result, index, getImageForResult }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex h-40">
      <div className="w-32 flex-shrink-0 overflow-hidden">
        <img
          src={getImageForResult(result, index)}
          alt="Article image"
          className="w-full h-full object-cover block"
        />
      </div>
      <div className="flex-1 min-w-0 p-4">
        <p className="text-xs text-gray-500 mb-2">Dec 2024</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {result.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-3">
          {result.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {result.fieldOfStudy && (
            <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs">{result.fieldOfStudy}</span>
          )}
          {result.location && (
            <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs">{result.location}</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>5 min read</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export default ArticleCard;
