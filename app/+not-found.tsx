// app/+not-found.tsx
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "404" }} />
      <View style={styles.container}>
        {/* 404 as background watermark */}
        <View style={styles.watermarkWrapper}>
          <Text style={styles.watermark}>404</Text>

          {/* Content sits on top */}
          <View style={styles.content}>
            <Text style={styles.title}>Screen not found</Text>
            <Text style={styles.subtitle}>
              This route doesn&apos;t exist in SolCircle.
            </Text>
            <Link href="/" style={styles.link}>
              <Text style={styles.linkText}>← Back to Home</Text>
            </Link>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },

  watermarkWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  // 404 — big, faded, sits behind content
  watermark: {
    fontSize: 160,
    fontWeight: "900",
    letterSpacing: -8,
    color: "#1C1C1C", // very dark — barely visible fade
    opacity: 0.9,
    position: "absolute",
    textAlign: "center",
    // creates the gradient-like fade feel with just color
  },

  // Content floats on top of 404
  content: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 60, // pushes content to sit inside 404 text
    paddingHorizontal: 32,
    zIndex: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.6,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    color: "#4A4A4A",
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0.2,
    maxWidth: 220,
  },

  link: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#242424",
    borderRadius: 6,
  },

  linkText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#606060",
    letterSpacing: 0.4,
  },
});
