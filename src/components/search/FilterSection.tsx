
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

interface Props {
  title: string;
  options: string[];
  selected: string[];
  onSelectionChange: (values: string[]) => void;
}

const FilterSection: React.FC<Props> = ({ title, options, selected, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${title}-${option}`}
                checked={selected.includes(option)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onSelectionChange([...selected, option]);
                  } else {
                    onSelectionChange(selected.filter((item) => item !== option));
                  }
                }}
              />
              <label
                htmlFor={`${title}-${option}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
