<script lang="ts">
    import { auth, user } from "$lib/firebase";

    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const credential = await signInWithPopup(auth, provider);

        const idToken = await credential.user.getIdToken();

        const res = await fetch("/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
        });
    }

    async function signOutSSR() {
        const res = await fetch("/api/signin", {method: "DELETE",});
        await signOut(auth);
    }

</script>


{#if $user}
    <h2 class="card-title">Welcome, {$user.displayName}</h2>
    <p class="text-center text-success">You are logged in</p>
    <a class="btn btn-primary" href="/login/username">Pick username</a>
    <!-- sign out button -->
    <button class="btn btn-danger" on:click={signOutSSR}>Sign out</button>
    <button class="btn btn-primary" on:click={() => console.warn("test")}>Test</button>
{:else}
    <h2 class="card-title">login</h2>
    <button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
