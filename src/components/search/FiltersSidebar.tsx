
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const filterSections = [
  {
    title: 'Degree Type',
    options: ['Bachelors', 'Masters', 'PhD', 'Certificate', 'Diploma'],
  },
  {
    title: 'Field of Study',
    options: ['Computer Science', 'Business', 'Engineering', 'Medicine', 'Arts', 'Law', 'STEM'],
  },
  {
    title: 'Location',
    options: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands'],
  },
  {
    title: 'Duration',
    options: ['1 year', '2 years', '3 years', '4 years', '5+ years'],
  },
  {
    title: 'Study Pace',
    options: ['Full-time', 'Part-time', 'Flexible'],
  },
];

const FiltersSidebar = () => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <Accordion type="multiple" defaultValue={['Degree Type', 'Field of Study']} className="w-full">
        {filterSections.map((section) => (
          <AccordionItem key={section.title} value={section.title}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {section.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox id={`${section.title}-${option}`} />
                    <Label htmlFor={`${section.title}-${option}`} className="font-normal cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FiltersSidebar;
