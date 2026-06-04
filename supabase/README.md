# Supabase backend

This directory replaces the old Node/Express backend with Supabase-native pieces:

- `functions/chat`: portfolio chat endpoint with Gemini fallback to rule-based replies
- `functions/contact`: contact form handler that stores rows in Supabase and sends email
- `functions/admin-login`: access-key gate for the admin dashboard
- `functions/admin-contacts`: protected contact inbox reader
- `migrations/20260604_contact_messages.sql`: contact inbox table and policies

## Required secrets

Set these for the deployed functions:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_CONTACT_TABLE`
- `CLIENT_ORIGIN`
- `GEMINI_API_KEY`
- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_SECURE`
- `MAIL_USER`
- `MAIL_PASS`
- `ADMIN_EMAIL`
- `ADMIN_ACCESS_KEY`

`supabase/.env.example` lists the same variables for local function serving.

## Typical deploy flow

```bash
supabase link --project-ref <project-ref>
supabase db push
supabase secrets set --env-file supabase/.env
supabase functions deploy chat
supabase functions deploy contact
supabase functions deploy admin-login
supabase functions deploy admin-contacts
```

## Frontend environment

The frontend now calls Supabase directly and only needs:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_CONTACT_TABLE` (optional, defaults to `contact_messages`)
