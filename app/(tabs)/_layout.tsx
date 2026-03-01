// app/(tabs)/_layout.tsx
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#444444",
        tabBarStyle: {
          backgroundColor: "#111111",
          borderTopColor: "#1E1E1E",
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="flash" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="contacts"
        options={{
          title: "People",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="users" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="send"
        options={{
          title: "Send",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="arrow-up" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="circle-o" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
