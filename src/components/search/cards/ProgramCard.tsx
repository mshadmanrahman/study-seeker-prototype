
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, MapPin, Globe, Building } from "lucide-react";
import type { SearchResult } from "@/types/search";

interface Props {
  result: SearchResult;
  index: number;
  getImageForResult: () => string;
}

const ProgramCard: React.FC<Props> = ({ result, index, getImageForResult }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative">
    {result.isPromoted && (
      <div className="absolute top-4 right-4 z-10">
        <Badge className="bg-gray-300 text-gray-600 text-xs">Promoted</Badge>
      </div>
    )}
    <div className="flex">
      <div className="w-48 flex-shrink-0 relative">
        <img
          src={getImageForResult()}
          alt={`${result.institution} campus`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 left-3">
          <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
            <Building className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-start h-full">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{result.institution}</p>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {result.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{result.location}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              {result.degreeType && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4" />
                  {result.degreeType}
                </div>
              )}
              {result.duration && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {result.duration}
                </div>
              )}
              {result.studyFormat && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {result.studyFormat}
                </div>
              )}
              {result.language && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Globe className="w-4 h-4" />
                  {result.language}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">
              {result.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export default ProgramCard;
