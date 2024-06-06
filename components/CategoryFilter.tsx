import { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";

import CustomButton from "@/components/Button";

import { Colors } from "@/constants/Colors";
import React = require("react");

interface CategoryI {
  category_id: string;
  category_name: string;
  parent_id: number;
}

interface CategoryFilterProps {
  categories: CategoryI[];
  selectedCategory: string | null;
  onSelect: (category_id: string) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) => {
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const renderCategoryItem = useCallback(
    ({ item }: { item: CategoryI }) => (
      <CustomButton
        borderRadius={15}
        style={
          item.category_id === selectedCategory
            ? styles.selectedCategoryItem
            : styles.categoryItem
        }
        textStyle={
          item.category_id === selectedCategory
            ? styles.selectedCategoryText
            : styles.categoryText
        }
        onPress={() => onSelect(item.category_id)}
        title={item.category_name}
      ></CustomButton>
    ),
    [selectedCategory]
  );

  return (
    <FlatList
      data={categories}
      horizontal
      keyExtractor={(item) => item.category_id}
      renderItem={renderCategoryItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryContainer}
    />
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    paddingHorizontal: 10,
    paddingTop: 15,
    gap: 10,
    height: 55,
    marginBottom: 12,
  },

  categoryItem: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.white,
  },

  selectedCategoryItem: {
    backgroundColor: Colors.tint,
  },

  categoryText: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 14,
  },

  selectedCategoryText: {
    color: Colors.background,
    fontSize: 14,
    lineHeight: 14,
  },
});

export default CategoryFilter;
