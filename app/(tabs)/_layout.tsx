import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        sceneStyle: {
          paddingTop: insets.top,
        },

        // Disables android default onClick ripple effect
        tabBarButton: (props) => (
          <Pressable
            onPress={props.onPress}
            onLongPress={props.onLongPress}
            testID={props.testID}
            accessibilityLabel={props.accessibilityLabel}
            accessibilityRole={props.accessibilityRole}
            accessibilityState={props.accessibilityState}
            style={[
              props.style,
              {
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
            android_ripple={{ borderless: true, color: "transparent" }}
          >
            {props.children}
          </Pressable>
        ),
      })}
      backBehavior="history"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"videocam"} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="watched"
        options={{
          title: "Watched",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"glasses"} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: "Watchlist",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"list"} size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
