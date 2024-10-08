import React, { useCallback, useContext, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { CustomText } from "./Text";
import { PlaylistContext } from "@/providers/PlaylistProvider";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MoviesStackParamList, RootStackParamList } from "@/constants/types";

interface CategoryI {
  category_id: string;
  category_name: string;
  parent_id: number;
}

interface CategoryFilterProps {
  categories: CategoryI[];
  selectedCategory: string | null;
  onSelect: (category_id: string) => void;
  filterRoute: string;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelect,
  filterRoute,
}: CategoryFilterProps) => {
  const { activePlaylist } = useContext(PlaylistContext);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigation = useNavigation<
    NavigationProp<MoviesStackParamList> | NavigationProp<RootStackParamList>
  >();

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

  const renderModalItem = useCallback(
    ({ item }: { item: CategoryI }) => {
      return (
        <Pressable
          style={styles.modalItem}
          onPress={() => {
            setDrawerVisible(false);
            if (filterRoute === "livetv") {
              onSelect(item.category_id);
            } else {
              navigation.navigate(filterRoute, {
                category: item,
              });
            }
          }}
        >
          <Text style={styles.modalCategoryText}>{item.category_name}</Text>
        </Pressable>
      );
    },
    [navigation]
  );

  return (
    <View
      style={{
        backgroundColor: "#111827D8",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        gap: 8,
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

      <View
        style={{
          width: 1,
          backgroundColor: "#3f3f46",
          marginVertical: 10,
          height: "55%",
        }}
      />

      {/* Drawer Toggle Icon */}
      <Pressable onPress={() => setDrawerVisible(true)}>
        <Feather name="filter" size={20} color="white" />
      </Pressable>

      {/* Custom Drawer */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={drawerVisible}
        onRequestClose={() => setDrawerVisible(false)}
      >
        <View style={styles.drawerContainer}>
          <View style={styles.drawerContent}>
            {/* Close Drawer Button */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 20,
                paddingHorizontal: 10,
              }}
            >
              <CustomText type="title">Categories</CustomText>

              <Pressable onPress={() => setDrawerVisible(false)}>
                <Feather name="x" size={24} color="white" />
              </Pressable>
            </View>

            {/* Category List in Drawer */}
            <FlatList
              data={categories}
              keyExtractor={(item) => item.category_id}
              renderItem={renderModalItem} // Use renderModalItem for modal
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.drawerFlatListContent}
            />
          </View>
        </View>
      </Modal>
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
  drawerContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  drawerContent: {
    backgroundColor: "rgba(0,0,0,0.7)",
    // padding: 20,
    gap: 10,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    maxHeight: "90%",
  },

  drawerFlatListContent: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },

  modalItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.secBackground,
    borderRadius: 8,
    marginVertical: 8,
  },

  modalCategoryText: {
    color: Colors.white,
    fontSize: 14,
  },
});

export default CategoryFilter;
