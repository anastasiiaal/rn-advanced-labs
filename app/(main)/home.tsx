import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Link asChild href="/detail/1">
        <Pressable style={styles.button}>
          <ThemedText type="defaultSemiBold" style={styles.linkText}>Detail 1</ThemedText>
        </Pressable>
      </Link>
      <Link asChild href="/detail/2">
        <Pressable style={styles.button}>
          <ThemedText type="defaultSemiBold" style={styles.linkText}>Detail 2</ThemedText>
        </Pressable>
      </Link>
      <Link asChild href="/detail/3">
        <Pressable style={styles.button}>
          <ThemedText type="defaultSemiBold" style={styles.linkText}>Detail 3</ThemedText>
        </Pressable>
      </Link>
      <Link asChild href="/TP3-forms/rhf">
        <Pressable style={styles.button}>
          <ThemedText type="defaultSemiBold" style={styles.linkText}>Formulaire RHF</ThemedText>
        </Pressable>
      </Link>
      <Link asChild href="/TP3-forms/formik">
        <Pressable style={styles.button}>
          <ThemedText type="defaultSemiBold" style={styles.linkText}>Formulaire Formik</ThemedText>
        </Pressable>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  linkText: {
    color: '#111111',
  },
});
