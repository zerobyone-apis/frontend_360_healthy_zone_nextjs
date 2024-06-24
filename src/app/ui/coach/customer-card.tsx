"use client"
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";


const CustomerCard = ({ client }: any) => {
    
    const router = useRouter();
    const handleNewTrainingClick = () => {
      // Handle the new training click event here
      router.push("?new-training=true&client_id=" + client.id);
    };

  return (
    <>
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white m-2">
      <div className="flex items-center">
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{client.edited_name}</h3>
          <p className="text-sm text-gray-500">{client.country}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-2 p-1 bg-jungle-green-500 rounded-full text-white text-xs font-medium">Active</div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronRightIcon className="w-5 h-5 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-lg rounded-lg p-4 gap-2">
            <DropdownMenuItem onClick={handleNewTrainingClick}>New Training</DropdownMenuItem>
            <DropdownMenuItem>View Trainings</DropdownMenuItem>
            <DropdownMenuItem >View Progress</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    </>
  );
};

export default CustomerCard;
