# Blue Aura - Live Node.js Companion Backend

This is the Express backend server for the Blue Aura fashion store. It handles:
1. Live database sync for order objects.
2. Automated Gmail SMTP notifications (order placements, confirmations, shipments, deliveries, cancellations).
3. On-the-fly PDF invoice generation attached directly to confirmation emails.

## How to Set Up & Run

### 1. Install Node.js
Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### 2. Install Project Dependencies
Open your terminal inside this `server` directory and run:
```bash
npm install
```

### 3. Configure Gmail SMTP Credentials
Create a copy of `.env.example` named `.env`:
```bash
copy .env.example .env
```
Open the `.env` file and fill in your Gmail SMTP credentials:
- `SMTP_EMAIL`: Your actual Gmail address (e.g., `brand.care@gmail.com`).
- `SMTP_PASSWORD`: A **Gmail App Password**.
  - *Note: To generate a Gmail App Password, go to your Google Account Settings > Security > Enable 2-Step Verification, then search for "App Passwords". Create a password named "Blue Aura Store" and copy the 16-character code.*

### 4. Optional: Configure Supabase Cloud Database
If you want to sync orders to a Supabase Cloud PostgreSQL database:
- Create a project on [Supabase](https://supabase.com/).
- Navigate to the **SQL Editor** in Supabase and run the following query to create the `orders` table:
```sql
create table orders (
  id text primary key,
  customer_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  payment_method text not null,
  items jsonb not null,
  subtotal numeric(12,2) not null,
  shipping_fee numeric(12,2) not null,
  discount numeric(12,2) default 0.00,
  promo_code_used text,
  total numeric(12,2) not null,
  status text default 'pending',
  tracking_number text,
  created_at timestamptz default now()
);
```
- Open your `.env` file and insert your project credentials:
  - `SUPABASE_URL`: Your project URL (e.g., `https://xxxx.supabase.co`).
  - `SUPABASE_KEY`: Your project's API anon public key.

### 5. Start the Server
Run the start script in your terminal:
```bash
npm start
```
The server will boot up at `http://localhost:5000`.

### 6. Frontend Dynamic Connect
Once the server is running, open `index.html` in any browser. The frontend will automatically detect the backend on port `5000` and switch from local simulator mode to **Live Mode**, writing orders to the server database and dispatching real Gmail notifications!

### 7. Configure Firebase Web App (Frontend)

To enable user authentication and Firestore user storage you must create a Firebase Web App and paste its config into `app.js` `FIREBASE_CONFIG` object.

- Go to https://console.firebase.google.com/ and create a project (or use an existing one).
- In Project Settings -> General, under "Your apps" add a Web App and copy the Firebase config values.
- Open the frontend file `app.js` and replace the `FIREBASE_CONFIG` placeholder values with your project's values.

Make sure the frontend loads the Firebase libs (already included in `index.html`) and that the backend `STATE.liveBackendUrl` points to `http://localhost:5000` when testing locally.

Security note: Never commit real API keys or passwords to a public repository. Use environment variables or server-side secrets for private credentials.
