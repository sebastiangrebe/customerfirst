// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import algoliasearch from 'https://esm.sh/algoliasearch@4.13.0';
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const algoliaClient = algoliasearch(Deno.env.get("ALGOLIA_APP_ID")!, Deno.env.get("ALGOLIA_ADMIN_API_KEY")!);
const algoliaIndex = algoliaClient.initIndex('requirements');

Deno.serve(async (req) => {
  try {
    // Parse the webhook payload
    const { type, record, ...rest } = await req.json();

    console.log(type, record, rest)

    if (!type || !record) {
      return new Response("Invalid payload", { status: 400 });
    }

    if (type === "INSERT" || type === "UPDATE") {
      // Sync record to Algolia
      await algoliaIndex.saveObject({
        ...record,
        objectID: record.id, // Use your primary key for the objectID
      });
      console.log(`Synced record ${record.id} to Algolia`);
    } else if (type === "DELETE") {
      // Remove record from Algolia
      await algoliaIndex.deleteObject(record.id);
      console.log(`Deleted record ${record.id} from Algolia`);
    }

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/algolia-sync' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
