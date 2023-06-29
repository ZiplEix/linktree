<script>
    export let icon = 'default';
    export let url = 'foo';
    export let title = 'some cool title';
</script>


<li>
    <a href={url} class="stack text-center bg-base-300 flex justify-center items-center p-4 my-5 rounded-lg not-prose no-underline" target="_blank">
        <img src={`/${icon}.png`} alt={icon} width="40" height="40" class="w-9" />
        <span class="text-lg text-white font-bold">{title}</span>
    </a>
</li>
