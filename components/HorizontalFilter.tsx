import React, { useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import CustomButton from "./Button";
import { Colors } from "@/constants/Colors";
import { CustomView } from "./View";

interface HorizontalFilterProps {
  onSelect: (filter: string) => void;
  filterOptions: string[];
}

const HorizontalFilter: React.FC<HorizontalFilterProps> = ({
  onSelect,
  filterOptions,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(
    filterOptions[0]
  );
  const flatListRef = useRef<FlatList<string>>(null);

  const handlePress = (filter: string, index: number) => {
    setSelectedFilter(filter);
    onSelect(filter);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
      viewOffset: 10,
    });
  };

  return (
    <CustomView
      style={{ height: 55, alignContent: "center", marginBottom: 12 }}
    >
      <FlatList
        ref={flatListRef}
        horizontal
        data={filterOptions}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <CustomButton
            title={item}
            onPress={() => handlePress(item, index)}
            borderRadius={15}
            style={
              item === selectedFilter
                ? styles.selectedFilterItem
                : styles.filterItem
            }
            textStyle={
              item === selectedFilter
                ? styles.selectedFilterText
                : styles.filterText
            }
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      />
    </CustomView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    gap: 10,
  },
  filterItem: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  selectedFilterItem: {
    backgroundColor: Colors.tint,
  },
  filterText: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 14,
  },
  selectedFilterText: {
    color: Colors.background,
    fontSize: 14,
    lineHeight: 14,
  },
});

export default HorizontalFilter;
