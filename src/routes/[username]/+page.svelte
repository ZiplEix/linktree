<script lang="ts">
    import UserLink from "$lib/components/UserLink.svelte";
import type { PageData } from "./$types";

    export let data: PageData;

</script>

<svelte:head>
    <title>@{data.username} Links</title>
    <meta name="description" content={data.bio} />
</svelte:head>


<div class="mb-12 pb-12">
    <main class="prose text-center mx-auto mt-8 w-2/4">

        <h1 class="lg:text-3xl text-purple-500 mb-8 font-bold">
            @{data.username}
        </h1>

        <img
            src={data.photoURL ?? "/user.png"}
            alt="photoURL"
            width="256"
            class="mx-auto"
        />

        <p class="text-xl my-8">{data.bio ?? "no bio yet..."}</p>
        <ul class="list-none px-2 m-0">
            {#each data.links as item}
                <UserLink {...item} />
            {/each}
        </ul>

    </main>
</div>
