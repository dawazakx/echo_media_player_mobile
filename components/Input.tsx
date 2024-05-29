import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface CustomInputProps {
  containerStyle?: any;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  value?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  containerStyle,
  placeholder,
  onChangeText,
  error,
  ...props
}) => {
  const isFocused = useSharedValue(false);
  const labelPosition = useSharedValue(props.value ? 1 : 0);
  const text = useRef(props.value || "").current;

  const [showPassword, setShowPassword] = useState<boolean>(
    props.secureTextEntry ?? false
  );

  const handleFocus = () => {
    isFocused.value = true;
    labelPosition.value = withTiming(1);
  };

  const handleBlur = () => {
    isFocused.value = false;
    if (!text) {
      labelPosition.value = withTiming(0);
    }
  };

  const handleTextChange = (text: string) => {
    text = text;
    if (onChangeText) {
      onChangeText(text);
    }
    if (text) {
      labelPosition.value = withTiming(1);
    } else {
      labelPosition.value = withTiming(isFocused.value ? 1 : 0);
    }
  };

  const labelStyle = useAnimatedStyle(() => {
    return {
      left: 10,
      top: labelPosition.value ? -22 : 17,
      fontSize: labelPosition.value ? 14 : 16,
      color: labelPosition.value ? "#888" : "white",
    };
  });

  return (
    <View style={containerStyle}>
      <View style={[styles.innerContainer]}>
        <Animated.Text style={[styles.label, labelStyle]}>
          {placeholder}
        </Animated.Text>
        <View style={styles.inputContainer}>
          <TextInput
            {...props}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleTextChange}
            value={text}
            textAlignVertical="center"
            textContentType={props.secureTextEntry ? "password" : "none"}
            secureTextEntry={props.secureTextEntry ? showPassword : false}
          />
          {props.secureTextEntry && !!text && (
            <View>
              <TouchableOpacity
                style={{ width: 24 }}
                onPress={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <Ionicons name="eye" color={"gray"} size={15} />
                ) : (
                  <Ionicons name="eye-off" color={"gray"} size={15} />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    height: 60,
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    color: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 50,
    marginTop: 10,
    paddingLeft: 10,
    color: "white",
  },
});

export default CustomInput;
