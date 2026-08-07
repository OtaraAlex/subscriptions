import { type ReactNode } from "react";
import { Text, View } from "react-native";
import { PostHogErrorBoundary, PostHogProvider } from "posthog-react-native";

const projectToken = process.env.EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.EXPO_PUBLIC_POSTHOG_HOST;
const isPostHogConfigured = Boolean(projectToken && host);

if (!isPostHogConfigured && __DEV__) {
  const missingVariable = projectToken
    ? "EXPO_PUBLIC_POSTHOG_HOST"
    : "EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN";

  throw new Error(
    `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
  );
}

type PostHogRootProps = {
  children: ReactNode;
};

export function PostHogRoot({ children }: PostHogRootProps) {
  if (!isPostHogConfigured) {
    return children;
  }

  return (
    <PostHogProvider
      apiKey={projectToken}
      options={{
        host,
        errorTracking: {
          autocapture: {
            uncaughtExceptions: true,
            unhandledRejections: true,
            console: [],
          },
        },
      }}
      autocapture={{
        captureScreens: false,
        captureTouches: true,
      }}
      debug={__DEV__}
    >
      <PostHogErrorBoundary
        fallback={
          <View>
            <Text>Something went wrong. Please restart the app.</Text>
          </View>
        }
      >
        {children}
      </PostHogErrorBoundary>
    </PostHogProvider>
  );
}
