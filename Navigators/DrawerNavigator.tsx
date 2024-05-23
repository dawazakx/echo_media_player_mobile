import { createDrawerNavigator } from "@react-navigation/drawer";
import About from "@/screens/drawer/About";
import ManagePlaylist from "@/screens/drawer/ManagePlaylist";
import PremiumFeatures from "@/screens/drawer/PremiumFeatures";
import Privacy from "@/screens/drawer/Privacy";
import Terms from "@/screens/drawer/Terms";
import Tabs from "@/Navigators/TabNavigator";
import { DrawerParamList } from "@/constants/types";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function SideDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Categories"
    >
      <Drawer.Screen name="Categories" component={Tabs} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Manage" component={ManagePlaylist} />
      <Drawer.Screen name="Premium" component={PremiumFeatures} />
      <Drawer.Screen name="Privacy" component={Privacy} />
      <Drawer.Screen name="Terms" component={Terms} />
    </Drawer.Navigator>
  );
}
