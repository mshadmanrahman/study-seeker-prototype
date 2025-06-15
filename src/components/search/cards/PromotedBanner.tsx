
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

const PromotedBanner = () => (
  <Card className="overflow-hidden bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200">
    <div className="flex items-center p-6">
      <div className="flex-shrink-0 mr-6">
        <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-pink-600" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Best programs for you
        </h3>
        <p className="text-gray-600">
          Answer a few questions and we'll match you with programs!
        </p>
      </div>
      <div className="flex-shrink-0">
        <Button className="bg-pink-600 hover:bg-pink-700 text-white">
          Get Started
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  </Card>
);

export default PromotedBanner;
