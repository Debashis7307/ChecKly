import React from "react";
import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ results }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8 mb-12">
      {Object.entries(results.categories).map(
        ([categoryName, category], index) => (
          <CategoryCard
            key={categoryName}
            categoryName={categoryName}
            category={category}
            index={index}
          />
        )
      )}
    </div>
  );
};

export default CategoryGrid;
