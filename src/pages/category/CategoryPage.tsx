import { FaPlus } from "react-icons/fa";
import SectionComponent from "../../components/SectionComponent";
import { testCategories } from "../../testData";
import CategoryCard from "./components/CategoryCard";
import FloatingButton from "../../components/floatingButton/FloatingButton";
import DialogComponent from "../../components/dialog/DialogComponent";
import { useDialogStore } from "../../components/dialog/DialogStore";
import CategoeryForm from "./components/CategoryForm";
import useTaskStore from "../task/context/TaskContext";

const CategoryPage = () => {
  const { openDialog, closeDialog } = useDialogStore();
  const { originalTasks } = useTaskStore();

  const getTaskCountByCategory = (category: string) => {
    if (!category) return 0;
    return originalTasks.filter(
      (task) => task.category?.toLowerCase() === category.toLowerCase()
    ).length;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Category Management
      </h1>
      <p className="text-muted-foreground">
        This is the Category Page. Here you can manage your categories.
      </p>
      <SectionComponent
        title="Category Structure"
        className="mt-6"
        showAcctionButton
        iconButton={<FaPlus />}
        textButton="Add Category"
        colorButton="#2563eb"
        onClickButton={openDialog}
      >
        {testCategories.map((category) => (
          <div className="mb-4" key={category.id}>
            <CategoryCard
              key={category.id}
              category={category}
              taskCount={getTaskCountByCategory(category.name)}
            />
          </div>
        ))}
      </SectionComponent>

      <FloatingButton tooltip="Add Category" onClick={openDialog} />

      <DialogComponent
        title="New Category"
        onClose={closeDialog}
        content={<CategoeryForm />}
      />
    </div>
  );
};

export default CategoryPage;
