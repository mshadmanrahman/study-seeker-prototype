
import React from "react";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, GraduationCap, Award } from "lucide-react";
import type { SearchResult } from "@/types/search";

interface Props {
  result: SearchResult;
  index: number;
  getImageForResult: (result: SearchResult, index: number) => string;
}

const ScholarshipCard: React.FC<Props> = ({ result, index, getImageForResult }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex h-40">
      <div className="w-32 flex-shrink-0 overflow-hidden relative">
        <img
          src={getImageForResult(result, index)}
          alt="Scholarship image"
          className="w-full h-full object-cover block"
        />
        <div className="absolute bottom-1 right-1">
          <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
            <Award className="w-3 h-3 text-yellow-600" />
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0 p-4">
        <p className="text-xs text-gray-500 mb-2">Dec 2024</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {result.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-1 leading-relaxed mb-3">
          {result.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {result.fieldOfStudy && (
            <div className="flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              <span>{result.fieldOfStudy}</span>
            </div>
          )}
          {result.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{result.location}</span>
            </div>
          )}
          {result.deadline && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Deadline: {new Date(result.deadline).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </Card>
);

export default ScholarshipCard;
