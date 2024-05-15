import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "@/constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import MoviesTab from "@/screens/tabs/MoviesTab";
import LiveTvTab from "@/screens/tabs/LiveTvTab";
import TvShowsTab from "@/screens/tabs/TvShowsTab";
import SportsTab from "@/screens/tabs/SportsTab";
import React from "react";
import Header from "../components/Header";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.background,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="LiveTV"
        component={LiveTvTabWithHeader}
        options={{
          title: "Live TV",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesTabWithHeader}
        options={{
          title: "Movies",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TvShows"
        component={TvShowsTabWithHeader}
        options={{
          title: "TV Shows",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sports"
        component={SportsTabWithHeader}
        options={{
          title: "Sports",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const withHeader = (ScreenComponent) => (props) =>
  (
    <React.Fragment>
      <Header {...props} />
      <ScreenComponent {...props} />
    </React.Fragment>
  );

const MoviesTabWithHeader = withHeader(MoviesTab);
const LiveTvTabWithHeader = withHeader(LiveTvTab);
const TvShowsTabWithHeader = withHeader(TvShowsTab);
const SportsTabWithHeader = withHeader(SportsTab);
