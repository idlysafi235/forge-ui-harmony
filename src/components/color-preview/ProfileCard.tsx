
import { User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/ui/bento-card";

interface ProfileCardProps {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
}

export const ProfileCard = ({ primaryColor, secondaryColor, tertiaryColor }: ProfileCardProps) => {
  return (
    <BentoCard className="overflow-hidden">
      <div 
        className="p-6 text-white relative"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: secondaryColor }}
          >
            <User className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-rounded">Alex Designer</h3>
            <p className="text-white/80 font-rounded">Senior UI/UX Designer</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button 
            size="sm" 
            className="text-white font-semibold font-rounded"
            style={{ backgroundColor: tertiaryColor }}
          >
            Follow
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-white text-white hover:bg-white hover:text-gray-900 font-rounded"
          >
            Message
          </Button>
        </div>
      </div>
    </BentoCard>
  );
};
