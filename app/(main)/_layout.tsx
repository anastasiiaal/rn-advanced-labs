import { Tabs } from 'expo-router';
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
        headerShown: true,
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
        name="TP3-forms/index"
        options={{
          title: "TP3-forms",
          href: null, // Hide from the tab bar but keep it routable
        }}
      />
      <Tabs.Screen
        name="TP3-forms/formik/index"
        options={{
          title: "Formik",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="envelope.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="TP3-forms/formik/validation/schema"
        options={{
          title: "Validation",
          href: null, // Hide from the tab bar but keep it routable
        }}
      />
      <Tabs.Screen
        name="TP3-forms/formik/components/ContactForm"
        options={{
          title: "Validation",
          href: null, // Hide from the tab bar but keep it routable
        }}
      />
      <Tabs.Screen
        name="TP3-forms/rhf/index"
        options={{
          title: "RHF",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="envelope.fill" color={color} />,
          // href: null,
        }}
      />
      <Tabs.Screen
        name="TP3-forms/rhf/validation/schema"
        options={{
          title: "Validation",
          href: null, // Hide from the tab bar but keep it routable
        }}
      />
      <Tabs.Screen
        name="TP3-forms/rhf/components/ContactForm"
        options={{
          title: "Validation",
          href: null, // Hide from the tab bar but keep it routable
        }}
      />
    </Tabs>
  );
}
