import { IconButton } from "@mui/material";
import { iconMap } from "../../../testData";
import type { Category } from "../../../types/TaskTypes";
import { MdDelete, MdModeEdit } from "react-icons/md";

const CategoryCard = ({ category, className }: { category: Category, className?: string }) => {
  const IconComponent = iconMap[category.icon];

  return (
    <div className={`flex items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      {IconComponent ? (
        <IconComponent
          color={category.color ?? "#000"}
          size={category.size ?? 24}
        />
      ) : (
        <span>❓</span>
      )}

      <div>
        <h3 className="font-bold">{category.name}</h3>
        <p className="text-sm text-gray-600">{category.description}</p>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <span className="text-xs italic mr-7 text-blue-500 font-bold">1 tareas</span>
        <IconButton aria-label="edit">
          <MdModeEdit size={18}/>
        </IconButton>
        <IconButton aria-label="delete">
          <MdDelete size={18} color="red"/>
        </IconButton>
      </div>
    </div>
  );
};

export default CategoryCard;
