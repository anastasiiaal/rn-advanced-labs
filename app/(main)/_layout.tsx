import { router, Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function MainLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tp1-profile-card"
        options={{
          title: "Profile Card",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="detail"
        options={{
          title: "Detail",
          href: null, // Hide from the tab bar but keep it routable
        }}
      />
      <Tabs.Screen
        name="TP3-forms/formik"
        options={{
          title: "Formik",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="envelope.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="TP3-forms/rhf"
        options={{
          title: "RHF",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="envelope.fill" color={color} />,
          // href: null,
        }}
      />
      <Tabs.Screen
        name="TP3-forms/index"
        options={{
          title: "TP3-forms",
          href: null, // Hide from the tab bar but keep it routable
        }}
      />
      {/* Robots */}
      <Tabs.Screen
        name="tp4-robots/index"
        options={{
          title: "Robots",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="robotic.vacuum.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tp4-robots/create"
        options={{
          title: "Robots create",
          href: null, // Hide from the tab bar but keep it routable
        }}
      />
      <Tabs.Screen
        name="tp4-robots/edit/[id]"
        options={{
          title: "Robot one",
          href: null, // Hide from the tab bar but keep it routable
        }}
      />
      {/* Robots Redux Toolkit */}
      <Tabs.Screen
        name="tp4-robots-rtk"
        options={{
          title: "Robots",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cloud-sync.fill" color={color} />,
        }}
        listeners={{
          tabPress: () => {
            router.replace("/tp4-robots-rtk"); // toujours la liste
          },
        }}
      />
      {/* Robots with DB */}
      <Tabs.Screen
        name="tp5-robots-db"
        options={{
          title: "Robots (DB)",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="tray.full.fill" color={color} />,
        }}
      />
      {/* Robots with DB */}
      <Tabs.Screen
        name="tp6-camera"
        options={{
          title: "Camera",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="camera.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
