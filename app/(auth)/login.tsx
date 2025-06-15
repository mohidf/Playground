import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // On mount, check if already logged in
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                router.replace("/(tabs)");
            }
        });
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);

        console.log('LOGIN RESULT:', { data, error });

        if (error) {
            if (error.message.toLowerCase().includes("confirm")) {
                Alert.alert("Login Failed", "Please confirm your email before logging in.");
            } else {
                Alert.alert("Login Failed", error.message);
            }
        } else if (data && data.session) {
            router.replace("/(tabs)");
        } else {
            Alert.alert("Login Failed", "Unknown error. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <FontAwesome name="user-circle" size={60} color="#4361ee" style={styles.logo} />
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Login to your account</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#aaa"
                />
                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? "Logging in..." : "Login"}
                    </Text>
                </Pressable>
                <Pressable onPress={() => router.push("/(auth)/signup")}
                    style={styles.linkWrap}
                >
                    <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkHighlight}>Sign up</Text></Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6fa",
        padding: 16,
    },
    card: {
        backgroundColor: "#fff",
        padding: 28,
        borderRadius: 18,
        width: "100%",
        maxWidth: 380,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.13,
        shadowRadius: 12,
        elevation: 7,
    },
    logo: {
        width: 60,
        height: 60,
        marginBottom: 18,
        borderRadius: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#22223b",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        color: "#4a4e69",
        marginBottom: 22,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#e0e1dd",
        borderRadius: 10,
        padding: 12,
        marginBottom: 14,
        fontSize: 16,
        backgroundColor: "#f7f7fa",
    },
    button: {
        width: "100%",
        backgroundColor: "#4361ee",
        paddingVertical: 13,
        borderRadius: 10,
        marginBottom: 16,
        marginTop: 4,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonDisabled: {
        backgroundColor: "#b0b5bf",
    },
    linkWrap: {
        marginTop: 2,
    },
    linkText: {
        color: "#4a4e69",
        textAlign: "center",
        fontSize: 15,
    },
    linkHighlight: {
        color: "#4361ee",
        fontWeight: "bold",
    },
});