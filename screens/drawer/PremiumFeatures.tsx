import { CustomText } from "@/components/Text";
import { CustomView } from "@/components/View";
import { Colors } from "@/constants/Colors";
const PremiumFeatures = () => {
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
        Downloads, Reminders and Recordings
      </CustomText>
    </CustomView>
  );
};
export default PremiumFeatures;
