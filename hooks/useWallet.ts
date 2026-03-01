// hooks/useWallet.ts
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { PublicKey } from "@solana/web3.js";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";

const AUTH_TOKEN_KEY = "solcircle_wallet_auth_token";

export function useWallet() {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Try to re-connect on app start (if previous session exists)
  useEffect(() => {
    const tryReauthorize = async () => {
      const authToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      if (!authToken) return;

      try {
        const result = await transact(async (wallet) => {
          const authResult = await wallet.reauthorize({
            auth_token: authToken,
            identity: { uri: "https://solcircle.app", name: "SolCircle" },
          });
          return new PublicKey(authResult.accounts[0].address);
        });

        setPublicKey(result);
      } catch (e) {
        console.log("Reauthorize failed, user needs to connect again");
        await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      }
    };

    tryReauthorize();
  }, []);

  const connect = useCallback(async () => {
    setConnecting(true);
    setError(null);

    try {
      const authorizationResult = await transact(async (wallet) => {
        const auth = await wallet.authorize({
          cluster: "devnet", // ← yahan 'mainnet-beta' bhi daal sakte ho
          identity: {
            uri: "https://your-app-domain.com", // change to your real domain later
            name: "SolCircle",
            icon: "/icon.png", // optional
          },
        });

        // Save for future reauthorize
        await SecureStore.setItemAsync(AUTH_TOKEN_KEY, auth.auth_token);

        return new PublicKey(auth.accounts[0].address);
      });

      setPublicKey(authorizationResult);
    } catch (err: any) {
      console.error("Connect failed:", err);
      setError(err?.message || "Connection failed");
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    setPublicKey(null);
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  }, []);

  return {
    publicKey,
    connected: !!publicKey,
    connecting,
    error,
    connect,
    disconnect,
  };
}
