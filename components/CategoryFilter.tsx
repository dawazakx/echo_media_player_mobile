import React, { useCallback, useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { CustomText } from "./Text";
import { PlaylistContext } from "@/providers/PlaylistProvider";
import { MaterialIcons } from "@expo/vector-icons";

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
  const { activePlaylist } = useContext(PlaylistContext);

  const renderCategoryItem = useCallback(
    ({ item }: { item: CategoryI }) => {
      const isSelected = item.category_id === selectedCategory;
      return (
        <Pressable
          style={[
            styles.categoryItem,
            isSelected && styles.selectedCategoryItem,
          ]}
          onPress={() => onSelect(item.category_id)}
        >
          <Text
            style={[
              styles.categoryText,
              isSelected && styles.selectedCategoryText,
            ]}
          >
            {item.category_name}
          </Text>
        </Pressable>
      );
    },
    [selectedCategory, onSelect]
  );

  return (
    <View
      style={{
        backgroundColor: "#111827D8",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 5,
        gap: 10,
      }}
    >
      <Pressable
        style={{
          backgroundColor: "transparent",
          paddingVertical: 7,
          paddingHorizontal: 9,
          flexDirection: "row",
          alignContent: "center",
          borderRadius: 15,
          borderWidth: 1,
          borderColor: "#3f3f46",
          gap: 2,
        }}
      >
        <MaterialIcons name="playlist-play" size={22} color="white" />
        <CustomText type="defaultSemiBold">
          {activePlaylist?.nickname}
        </CustomText>
      </Pressable>

      <View
        style={{
          width: 1,
          backgroundColor: "#3f3f46",
          marginVertical: 10,
          height: "55%",
        }}
      />
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.category_id}
        renderItem={renderCategoryItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: "transparent",
          padding: 10,
          gap: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: "#FBCBC119",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3f3f46",
    padding: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedCategoryItem: {
    backgroundColor: Colors.tint,
  },

  categoryText: {
    color: Colors.white,
    fontSize: 13,
    lineHeight: 14,
  },

  selectedCategoryText: {
    color: Colors.background,
    fontSize: 14,
    lineHeight: 14,
  },
});

export default CategoryFilter;
