import React from "react";
import { Card } from "@/components/ui/card";
import { Building, Calendar, Star, Award, User } from "lucide-react";
import type { SearchResult } from "@/types/search";

interface Props {
  result: SearchResult;
  getImageForResult: () => string;
}

const SchoolCard: React.FC<Props> = ({ result, getImageForResult }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex">
      <div className="w-48 flex-shrink-0 relative">
        <img
          src={getImageForResult()}
          alt={`${result.title} campus`}
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {result.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{result.location}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              {result.establishedYear && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Est. {result.establishedYear}
                </div>
              )}
              {result.studentCount && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  {result.studentCount} students
                </div>
              )}
              {result.acceptanceRate && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Award className="w-4 h-4" />
                  {result.acceptanceRate} acceptance
                </div>
              )}
              {result.ranking && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="w-4 h-4" />
                  {result.ranking}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">
              {result.description}
            </p>
            {result.rating && (
              <div className="flex items-center gap-1 mt-3">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{result.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export default SchoolCard;
