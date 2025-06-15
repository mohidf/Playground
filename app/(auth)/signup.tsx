import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showConfirmMsg, setShowConfirmMsg] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        setLoading(false);
        if (error) {
            Alert.alert("Sign Up Failed", error.message);
        } else {
            setShowConfirmMsg(true);
            Alert.alert("Success", "Check your email for a confirmation link!");
            // Optionally, do not redirect immediately
            // router.replace("/(tabs)");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <FontAwesome name="user-circle" size={60} color="#4361ee" style={styles.logo} />
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Sign up to get started</Text>
                {showConfirmMsg && (
                    <View style={styles.confirmMsg}>
                        <Text style={styles.confirmMsgText}>
                            Please check your email and confirm your account before logging in.
                        </Text>
                        <Pressable onPress={() => setShowConfirmMsg(false)} style={styles.dismissBtn}>
                            <Text style={styles.dismissBtnText}>Dismiss</Text>
                        </Pressable>
                    </View>
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Pressable
                    onPress={handleSignup}
                    style={({ pressed }) => {
                        // Only include ViewStyles for Pressable
                        let btnStyles: any[] = [styles.button];
                        if (pressed) btnStyles.push(styles.buttonPressed);
                        if (loading) btnStyles.push(styles.buttonDisabled);
                        return btnStyles;
                    }}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>{loading ? "Signing up..." : "Sign Up"}</Text>
                </Pressable>

                <View style={styles.linkWrap}>
                    <Text style={styles.linkText}>Already have an account?</Text>
                    <Pressable onPress={() => router.replace("/(auth)/login")}> 
                        <Text style={styles.linkHighlight}>Log In</Text>
                    </Pressable>
                </View>
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
    confirmMsg: {
        backgroundColor: '#e9f7ef',
        borderColor: '#38b000',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 18,
        marginTop: 2,
        alignItems: 'center',
        width: '100%',
    },
    confirmMsgText: {
        color: '#1b4332',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10,
    },
    dismissBtn: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: '#38b000',
    },
    dismissBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});