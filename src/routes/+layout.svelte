<script lang="ts">
  import '../app.css';
  import { onMount } from "svelte";
  import { invalidate } from "$app/navigation";

  let { data, children } = $props();
  const { supabase, session } = $derived(data)

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth")
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

{@render children()}