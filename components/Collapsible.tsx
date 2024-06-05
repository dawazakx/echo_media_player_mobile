import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { CustomView } from "./View";
import { CustomText } from "./Text";
import { Colors } from "@/constants/Colors";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string | undefined }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CustomView
      style={{
        width: "90%",
        marginLeft: 20,
        backgroundColor: Colors.tint,
        borderRadius: 8,
      }}
    >
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={Colors.secBackground}
        />
        <CustomText type="defaultSemiBold" style={{ color: Colors.background }}>
          {title}
        </CustomText>
      </TouchableOpacity>
      {isOpen && <CustomView style={styles.content}>{children}</CustomView>}
    </CustomView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
