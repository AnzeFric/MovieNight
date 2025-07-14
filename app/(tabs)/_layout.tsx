import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  return (
    <Tabs
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.dark.button,
        tabBarInactiveTintColor: Colors.dark.inactiveButton,
        sceneStyle: {
          paddingTop: insets.top,
          backgroundColor: Colors.dark.primaryBackground,
        },
        tabBarStyle: {
          backgroundColor: Colors.dark.secondaryBackground,
          borderColor: Colors.dark.secondaryBackground,
          height: 105,
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
        name="watchlist/index"
        options={{
          title: "Watchlist",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={"list"}
              size={28}
              color={
                pathname.startsWith("/watchlist") ? Colors.dark.button : color
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist/add"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
