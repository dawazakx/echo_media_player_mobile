import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
const MoviesTab = () => {
  return (
    <CustomView
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.tint,
        height: "100%",
      }}
    >
      <CustomText
        type="title"
        style={{ textAlign: "center", color: Colors.background }}
      >
        Movies Tab
      </CustomText>
    </CustomView>
  );
};
export default MoviesTab;
