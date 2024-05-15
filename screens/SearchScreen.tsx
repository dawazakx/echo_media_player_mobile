import CustomButton from "@/components/Button";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Implement search functionality here
  };

  const insets = useSafeAreaInsets();
  return (
    <CustomView
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <CustomView
        style={{
          flexDirection: "row",
          gap: 25,
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Pressable
          style={{ marginLeft: 15 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={32} color={Colors.tint} />
        </Pressable>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 8,
            padding: 8,
            height: 50,
            width: "70%",
            color: Colors.white,
          }}
          placeholder="Search a Channel, Programme, or V.O.D..."
          placeholderTextColor={Colors.white}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </CustomView>
    </CustomView>
  );
};

export default SearchScreen;
