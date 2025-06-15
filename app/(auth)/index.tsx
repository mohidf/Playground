import { useRouter, useSegments, Slot } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        // If at /auth (segments = ["(auth)"]), redirect to /auth/login
        if (segments.length === 1 && segments[0] === "(auth)") {
            router.replace("/(auth)/login");
        }
    }, [segments, router]);

    return <Slot />;
}
