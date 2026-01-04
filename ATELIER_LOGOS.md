# Atelier Logos: Per-Merged-PR Billing Model for a GitHub-Native Talent Marketplace

## Purpose

This system enables companies to hire developers on a **time-and-deliverables** basis while using **merged pull requests (PRs)** as the primary, objective billing unit.

The goal is to:
- align billing with accepted work
- minimize tooling friction
- avoid surveillance or invasive tracking
- leverage GitHub as the system of record

This design intentionally avoids IDE extensions, AI telemetry requirements, or commit-level accounting.

---

## Core Principles

1. **Acceptance equals payment**  
   Work is billable only when the client explicitly accepts it by merging a PR.

2. **GitHub is the source of truth**  
   All evidence of work, review, and delivery lives in GitHub.

3. **Low friction beats perfect attribution**  
   The system optimizes for trust, clarity, and adoption—not exhaustive measurement.

4. **Billing units must not distort developer behavior**  
   The model must not incentivize unnatural commit or PR practices.

---

## Actors

### Hiring Organization
- Owns the primary GitHub repository
- Defines mission scope
- Reviews and merges PRs
- Approves invoices

### Developer (Candidate)
- Works in a fork of the client repository
- Submits PRs for review
- Is paid for merged, in-scope PRs

### Platform
- Binds missions to repositories
- Tracks PR lifecycle events
- Generates invoices based on merged PRs
- Provides a lightweight mission activity view

---

## Core Concepts

### Mission
A mission represents a scoped task or set of work posted by a hiring organization.
It includes:
- linked GitHub repository
- task/scope description
- deliverable expectations
- time window (optional deadline)
- mission status (open for bids, assigned, in progress, completed)

Companies post missions; developers submit proposals with their rates.

### Proposal
A proposal is a developer's bid to complete a mission.
It includes:
- developer identity
- proposed flat rate (what they'll charge if PR is merged)
- estimated timeline
- approach/methodology (optional)
- portfolio links or relevant experience

Companies review proposals and select a developer.

### Accepted Proposal = Active Assignment
Once a company accepts a proposal:
- The mission is assigned to that developer
- The agreed rate is locked in
- Developer forks the repository and begins work
- Payment occurs when the PR is merged at the agreed rate

### Fork-Based Workflow
- Client repo remains authoritative
- Developer works exclusively in a fork
- All delivery happens via PRs from fork → client repo

This ensures isolation, clean attribution, and easy offboarding.

### Billable Unit: Merged Pull Request
A PR is billable if and only if:
- it is opened against the mission’s designated repository
- it is within mission scope
- it is merged by the client into the target branch
- it is not excluded by policy

---

## Billing Model

### Proposal-Based Pricing
- **Developer sets their flat rate per mission**
- Company reviews proposals and selects based on rate + developer quality
- Rate is locked when proposal is accepted
- **1 merged PR = payment at agreed rate**

### How It Works
1. Company posts mission with scope description
2. Developers submit proposals with their proposed flat rate
3. Company reviews proposals (rate, timeline, developer profile)
4. Company accepts one proposal
5. Developer completes work and opens PR
6. Company reviews and merges PR
7. Developer is paid the agreed flat rate

### Rate Flexibility
Developers set rates based on:
- Mission complexity
- Their expertise level
- Timeline requirements
- Repository familiarity
- Current workload

### Market Dynamics
The platform becomes a marketplace where:
- Competitive developers can win work with quality + fair pricing
- Companies get transparent pricing upfront
- No surprise billing—rate is agreed before work begins

### Explicitly Non-Billable PRs
Unless pre-approved, the following do not count:
- formatting-only changes
- dependency bumps
- automated tool output
- revert PRs
- experimental or abandoned PRs
- PRs closed without merge

Mission scope should be clear enough to avoid disputes.

---

## Workflow: Hiring Side

1. **Post a mission**
   - Describe the task/feature needed
   - Link GitHub repository
   - Install GitHub App (read-only)
   - Set optional deadline
   - Optionally set a budget range to guide proposals

2. **Review proposals**
   - Developers submit proposals with their rates
   - Review: developer profile, rate, timeline, approach
   - Compare proposals side-by-side

3. **Accept a proposal**
   - Select the best proposal
   - Rate is locked in
   - Developer is notified
   - Mission status: "In Progress"

4. **Review work**
   - Developer opens PR from their fork
   - Review code on GitHub
   - Request changes if needed
   - Merge when satisfied

5. **Automatic payment**
   - PR merge triggers billing
   - Invoice created at agreed rate
   - Company pays via Stripe
   - Developer receives payout

No write access to repositories is required.

---

## Workflow: Developer Side

1. **Browse open missions**
   - See available missions from companies
   - Filter by: technology, complexity, budget range
   - Review mission scope and repository

2. **Submit proposal**
   - Set your flat rate for the mission
   - Provide estimated timeline
   - Optionally: explain your approach
   - Link to relevant portfolio work

3. **Wait for acceptance**
   - Company reviews proposals
   - You're notified if accepted
   - Rate is locked in

4. **Complete the work**
   - Fork the repository (if accepted)
   - Implement the feature/fix
   - Test thoroughly
   - Open PR back to client repo

5. **Get paid**
   - Respond to review feedback
   - PR gets merged
   - Platform automatically generates invoice
   - You receive payout via Stripe Connect

The developer does not need any special tooling beyond GitHub.

---

## GitHub Integration

### GitHub App (Recommended)
The platform uses a GitHub App with:
- read access to repositories
- access to PR, commit, and review events

### Events Consumed
- `pull_request.opened`
- `pull_request.synchronize`
- `pull_request.review_requested`
- `pull_request.review_submitted`
- `pull_request.closed`
- `pull_request.merged`

These events are sufficient to reconstruct the mission activity timeline.

---

## Mission Activity View (Web App)

The platform surfaces a **Mission Activity** page that aggregates GitHub data.

It shows:
- linked repository
- open PRs
- merged PRs (billable)
- timestamps and authors
- links to GitHub PRs
- optional weekly summaries

This view is informational, not authoritative—GitHub remains the source of truth.

---

## Invoicing

Invoices are generated based on:
- number of merged PRs
- applicable pricing rules
- mission period

Each invoice line item links directly to:
- the merged PR
- the GitHub diff
- the merge commit

This makes disputes trivial to resolve.

---

## Dispute Handling

If a dispute arises:
- the PR history is reviewed
- merge status is definitive
- scope is checked against mission definition

No subjective activity metrics are required.

---

## Security and Trust

- Developers never receive write access to client repos.
- Access is revoked by disabling PR acceptance or uninstalling the GitHub App.
- No local machine access, IDE tracking, or AI telemetry is required.

Trust is enforced through contracts and process, not surveillance.

---

## Non-Goals

This system does not:
- track time spent coding
- measure effort via commits
- log AI prompts or tool usage
- enforce how work is produced

Only accepted output matters.

---

## Why This Works

This model:
- aligns payment with accepted value
- matches industry-standard GitHub workflows
- minimizes friction for senior developers
- scales operationally
- avoids trust erosion

It is intentionally boring—and that is its strength.

---

## Technical Architecture

### System Components

**1. Web Application (www.atelierlogos.studio)**
- Next.js 15 with App Router
- React Server Components for performance
- Tailwind CSS for styling
- Separate dashboards for hiring orgs and developers
- Real-time updates via Server-Sent Events

**2. Backend API**
- Next.js API routes + serverless functions
- PostgreSQL database (Supabase or Neon)
- GitHub App integration
- Stripe API integration (Connect + Invoicing)

**3. GitHub Integration**
- GitHub App with read-only repository access
- Webhook receiver for PR events
- Octokit SDK for API calls
- Event-driven PR tracking

**4. Payment Infrastructure (Stripe)**
- **Stripe Connect** for developer payouts (Standard Connected Accounts)
- **Stripe Invoicing** or **Stripe Checkout** for charging companies
- Platform fee structure (e.g., 10-15% per transaction)
- Automated payout scheduling

**5. Background Jobs**
- Periodic PR synchronization
- Invoice generation on billing cycles
- Payout processing
- Email notifications

### Data Flow

```
Company posts mission → Developers submit proposals → Company accepts proposal
                                              ↓
                      Company pays upfront (Stripe Checkout) → Funds held in escrow
                                              ↓
                      Developer works on fork → Opens PR → Company reviews
                                              ↓
                      Company merges PR → GitHub Webhook → Platform API
                                              ↓
                      Automatic payout (Stripe Transfer) → Developer receives funds
```

---

## Payment Architecture (Stripe Integration)

### Stripe Connect Setup

**Developer Onboarding:**
1. Developer signs up on platform
2. Platform redirects to Stripe Connect OAuth
3. Developer creates/links Stripe Connect account (Standard)
4. Platform receives `stripe_account_id`
5. Developer can now receive payouts

**Connected Account Type:** Standard
- Developer owns the Stripe account
- Platform takes application fee on transfers
- Developer handles their own tax reporting
- Full payout control and visibility

### Billing Flow (Prepayment/Escrow Model)

#### Step 1: Proposal Acceptance → Payment Required
When company accepts a developer's proposal:
1. Company is prompted to pay immediately via Stripe Checkout
2. Payment amount = developer's proposed rate + platform fee
3. Funds are captured and held by the platform (escrow)
4. Mission status → "Funded & In Progress"
5. Developer is notified: "Mission funded—you can start work"

**Stripe Checkout:**
```javascript
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: `Mission: ${mission.name}`,
        description: `Developer: @${developer.github_username}`,
      },
      unit_amount: proposedRate + platformFee, // e.g., $750 + $75 = $825
    },
    quantity: 1,
  }],
  metadata: {
    mission_id: mission.id,
    proposal_id: proposal.id,
    developer_id: developer.id,
  },
  success_url: 'https://www.atelierlogos.studio/org/missions/{MISSION_ID}/funded',
  cancel_url: 'https://www.atelierlogos.studio/org/missions/{MISSION_ID}/proposals',
});
```

#### Step 2: Developer Completes Work
- Developer forks repo and implements the feature
- Developer opens PR
- Company reviews on GitHub
- Company can request changes
- **Funds remain in escrow until PR is merged**

#### Step 3: PR Merged → Automatic Payout
When company merges the PR:
1. GitHub webhook notifies platform of merge
2. Platform verifies PR is from assigned developer
3. Platform initiates Stripe Transfer to developer's Connected Account
4. Developer receives agreed amount (typically T+2 days)
5. Mission status → "Completed & Paid"

**Transfer API Call:**
```javascript
await stripe.transfers.create({
  amount: 75000, // $750 in cents (developer's agreed rate)
  currency: 'usd',
  destination: developer.stripe_account_id,
  description: `Mission: ${mission.name}`,
  metadata: {
    mission_id: mission.id,
    pr_number: pullRequest.number,
    pr_url: pullRequest.url,
  },
});
```

#### Step 4: Dispute Resolution (If PR Not Merged)
If company doesn't merge PR within reasonable time:
- Developer can request review
- Platform reviews the work
- Options:
  - **PR meets requirements** → Platform can manually release funds
  - **PR needs changes** → Developer must revise
  - **Work not acceptable** → Refund to company (rare, requires evidence)

**Refund API Call (if needed):**
```javascript
await stripe.refunds.create({
  payment_intent: paymentIntent.id,
  amount: 82500, // Full amount including platform fee
  reason: 'requested_by_customer',
  metadata: { mission_id: mission.id }
});
```

### Platform Fee Structure

**With Prepayment Model:**
- Company pays: Developer's rate + Platform fee (e.g., $750 + $75 = $825)
- Platform holds: Full amount in escrow
- On PR merge:
  - Developer receives: $750 (via Stripe Transfer)
  - Platform keeps: $75 (platform fee)

**Fee Percentage:** 10% is recommended
- Competitive with other marketplaces
- Covers payment processing, hosting, GitHub integration
- Simple mental math for developers

**Transparency:**
- Developers see their full proposed rate (what they'll receive)
- Companies see total cost upfront (rate + 10% platform fee)
- No hidden fees or surprises

### Stripe Webhook Handling

Platform listens for:
- `invoice.paid` → Trigger developer payout
- `invoice.payment_failed` → Notify company, pause mission
- `transfer.paid` → Confirm developer received funds
- `account.updated` → Sync developer Connect account status

---

## API Specifications

### Authentication Endpoints

**POST /api/auth/github**
GitHub OAuth callback for developer login

**POST /api/auth/stripe/connect**
Initiate Stripe Connect onboarding
```json
{
  "developer_id": "dev_123",
  "return_url": "https://www.atelierlogos.studio/dashboard",
  "refresh_url": "https://www.atelierlogos.studio/onboarding/stripe"
}
```

### Mission Management

**POST /api/missions**
Create new mission (hiring org)
```json
{
  "name": "Add dark mode to mobile app",
  "description": "Implement dark mode theme support across all screens...",
  "repository": "acme/mobile-app",
  "budget_min": 500,
  "budget_max": 1000,
  "deadline": "2026-02-15",
  "tags": ["react-native", "ui", "theming"]
}
```

**GET /api/missions**
List missions (with filters)
```
Query params:
- status: open, in_progress, completed
- tags: react,typescript
- budget_min: 500
- budget_max: 2000
- org_id: filter by organization
```

**GET /api/missions/:id**
Get mission details with proposal count

**PATCH /api/missions/:id**
Update mission (only if status is 'open')

**DELETE /api/missions/:id**
Cancel mission (refund if already funded)

### Proposal Management

**POST /api/missions/:id/proposals**
Submit proposal (developer)
```json
{
  "proposed_rate": 750,
  "estimated_days": 3,
  "cover_letter": "I have 5 years of React Native experience and have implemented dark mode in several apps. My approach would be...",
  "portfolio_links": [
    "https://github.com/dev/portfolio-app",
    "https://dribbble.com/shots/dark-mode-example"
  ]
}
```

**GET /api/missions/:id/proposals**
List all proposals for a mission (hiring org only)
```json
{
  "proposals": [
    {
      "id": "prop_123",
      "developer": {
        "github_username": "sarah-dev",
        "avatar_url": "...",
        "profile_url": "..."
      },
      "proposed_rate": 750,
      "estimated_days": 3,
      "cover_letter": "...",
      "created_at": "2026-01-20T10:00:00Z"
    }
  ],
  "total": 8
}
```

**GET /api/proposals/:id**
Get proposal details

**POST /api/proposals/:id/accept**
Accept a proposal (hiring org)
- Triggers Stripe Checkout for payment
- Returns checkout session URL
```json
{
  "checkout_url": "https://checkout.stripe.com/..."
}
```

**POST /api/proposals/:id/reject**
Reject a proposal (hiring org)

**DELETE /api/proposals/:id**
Withdraw proposal (developer, before acceptance)

### Pull Request Tracking

**GET /api/missions/:id/prs**
List all PRs with billability status
```json
{
  "prs": [
    {
      "number": 42,
      "title": "Refactor UserProfile component",
      "author": "dev-username",
      "merged_at": "2026-01-22T14:30:00Z",
      "billable": true,
      "size": "medium",
      "amount": 500,
      "url": "https://github.com/acme/mobile-app/pull/42"
    }
  ],
  "summary": {
    "total_billable": 10,
    "total_amount": 5250,
    "pending_payout": 4725
  }
}
```

**PATCH /api/prs/:id/exclude**
Mark PR as non-billable with reason

### Payments & Payouts

**POST /api/payments/checkout**
Create Stripe Checkout session (after proposal acceptance)
```json
{
  "proposal_id": "prop_123",
  "success_url": "https://www.atelierlogos.studio/org/missions/{MISSION_ID}/funded",
  "cancel_url": "https://www.atelierlogos.studio/org/missions/{MISSION_ID}/proposals"
}
```

**GET /api/payments/:id**
Get payment details and escrow status

**POST /api/payments/:id/release**
Manually release escrowed funds to developer (admin/support only, for disputes)

**POST /api/payments/:id/refund**
Refund payment to company (admin/support only, for disputes)

**GET /api/missions/:id/payment**
Get payment status for a mission

**GET /api/developers/:id/payouts**
List payout history for a developer

### Webhooks

**POST /api/webhooks/github**
GitHub App webhook receiver

**POST /api/webhooks/stripe**
Stripe webhook receiver (validates signature)

---

## Database Schema

```sql
-- Organizations (Companies hiring developers)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  github_org VARCHAR(255),
  billing_email VARCHAR(255) NOT NULL,
  stripe_customer_id VARCHAR(255) UNIQUE, -- Stripe Customer ID
  payment_method_id VARCHAR(255), -- Default payment method
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Developers
CREATE TABLE developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  github_id INTEGER UNIQUE NOT NULL,
  github_username VARCHAR(255) NOT NULL,
  github_avatar_url TEXT,
  stripe_account_id VARCHAR(255) UNIQUE, -- Stripe Connect Account ID
  stripe_onboarding_complete BOOLEAN DEFAULT false,
  payout_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Missions
CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  assigned_developer_id UUID REFERENCES developers(id), -- NULL until proposal accepted
  accepted_proposal_id UUID, -- References proposals table
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL, -- What needs to be built
  repository VARCHAR(255) NOT NULL, -- "owner/repo"
  repository_id BIGINT, -- GitHub repo ID
  github_installation_id BIGINT, -- GitHub App installation
  status VARCHAR(50) DEFAULT 'open', -- open, in_progress, completed, cancelled, disputed
  budget_min DECIMAL(10,2), -- Optional guidance for developers
  budget_max DECIMAL(10,2), -- Optional guidance for developers
  deadline DATE, -- Optional deadline
  agreed_rate DECIMAL(10,2), -- Locked when proposal accepted
  platform_fee_percent DECIMAL(5,2) DEFAULT 10.00,
  total_cost DECIMAL(10,2), -- agreed_rate + platform fee
  funded BOOLEAN DEFAULT false, -- True when company has paid
  stripe_payment_intent_id VARCHAR(255), -- Escrow payment
  payout_completed BOOLEAN DEFAULT false,
  tags TEXT[], -- e.g., ['react', 'typescript', 'frontend']
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  funded_at TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE INDEX idx_missions_status ON missions(status);
CREATE INDEX idx_missions_repo ON missions(repository);
CREATE INDEX idx_missions_developer ON missions(assigned_developer_id);
CREATE INDEX idx_missions_org ON missions(organization_id);

-- Proposals (Developer bids on missions)
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
  developer_id UUID REFERENCES developers(id),
  proposed_rate DECIMAL(10,2) NOT NULL, -- What developer will be paid
  estimated_days INTEGER, -- How long developer estimates
  cover_letter TEXT, -- Developer's pitch/approach
  portfolio_links JSONB, -- Array of relevant work examples
  status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected, withdrawn
  accepted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(mission_id, developer_id) -- One proposal per developer per mission
);

CREATE INDEX idx_proposals_mission ON proposals(mission_id);
CREATE INDEX idx_proposals_developer ON proposals(developer_id);
CREATE INDEX idx_proposals_status ON proposals(status);

-- Pull Requests (Cached from GitHub)
CREATE TABLE pull_requests (
  id VARCHAR(255) PRIMARY KEY, -- GitHub node ID
  mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
  pr_number INTEGER NOT NULL,
  repository VARCHAR(255) NOT NULL,
  title TEXT NOT NULL,
  author_github_id BIGINT NOT NULL,
  state VARCHAR(50) NOT NULL,
  is_from_fork BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL,
  merged_at TIMESTAMP,
  additions INTEGER DEFAULT 0,
  deletions INTEGER DEFAULT 0,
  changed_files INTEGER DEFAULT 0,
  size_category VARCHAR(50), -- small, medium, large
  billable BOOLEAN DEFAULT false,
  excluded BOOLEAN DEFAULT false,
  exclusion_reason TEXT,
  billed_amount DECIMAL(10,2),
  invoiced BOOLEAN DEFAULT false,
  invoice_id UUID,
  github_url TEXT NOT NULL,
  raw_data JSONB,
  synced_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_prs_mission ON pull_requests(mission_id);
CREATE INDEX idx_prs_merged ON pull_requests(merged_at) WHERE merged_at IS NOT NULL;

-- Payments (Escrow tracking - prepayment model)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id UUID REFERENCES missions(id),
  organization_id UUID REFERENCES organizations(id),
  developer_id UUID REFERENCES developers(id),
  stripe_payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_charge_id VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL, -- Total charged to company
  developer_amount DECIMAL(10,2) NOT NULL, -- Amount developer receives
  platform_fee DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'held', -- held, released, refunded
  released_at TIMESTAMP, -- When funds were sent to developer
  refunded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payments_mission ON payments(mission_id);
CREATE INDEX idx_payments_status ON payments(status);

-- Payouts (Stripe Transfers to developers)
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id UUID REFERENCES missions(id),
  payment_id UUID REFERENCES payments(id),
  pull_request_id VARCHAR(255) REFERENCES pull_requests(id),
  developer_id UUID REFERENCES developers(id),
  stripe_transfer_id VARCHAR(255) UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'usd',
  status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed
  transferred_at TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payouts_mission ON payouts(mission_id);
CREATE INDEX idx_payouts_developer ON payouts(developer_id);

-- Events (Audit Log)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,
  actor_id UUID,
  actor_type VARCHAR(50),
  resource_type VARCHAR(50),
  resource_id VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_events_resource ON events(resource_type, resource_id);
CREATE INDEX idx_events_created ON events(created_at DESC);
```

---

## Frontend Flows & Pages

### Hiring Organization Side (www.atelierlogos.studio/org)

#### Pages

**1. Dashboard (`/org/dashboard`)**
- Posted missions (open, in progress, completed)
- Pending proposals count (notifications)
- Active missions with PR status
- Recent activity feed
- Quick actions: Post mission, review proposals

**2. Post Mission (`/org/missions/new`)**
Multi-step form:
- **Step 1:** Repository selection
  - Connect GitHub if not connected
  - Select repo from dropdown
  - Install GitHub App
- **Step 2:** Mission details
  - Title (e.g., "Add dark mode support")
  - Description (rich text editor)
  - Tags (react, typescript, etc.)
- **Step 3:** Budget & timeline
  - Budget range (optional but recommended)
  - Deadline (optional)
- **Step 4:** Review & publish
  - Preview how mission appears to developers
  - Publish to marketplace

**3. Mission Detail (`/org/missions/:id`)**

**When status = 'open' (accepting proposals):**
- Mission description
- Budget range
- Proposals tab with list of developer bids
- Each proposal shows:
  - Developer GitHub profile
  - Proposed rate
  - Timeline
  - Cover letter
  - Portfolio links
- Action: Accept proposal → Pay

**When status = 'in_progress' (funded & assigned):**
- Mission description
- Assigned developer info
- Payment status: "✓ Funded ($825 in escrow)"
- PR tab showing open/in-review PRs
- Activity timeline
- GitHub repo link

**When status = 'completed':**
- Completed PR with link
- Payment receipt
- Option to leave review for developer

**4. Proposals Review (`/org/missions/:id/proposals`)**
- List of all proposals
- Sort by: rate (low→high), date submitted, developer rating
- Filter by: rate range
- Side-by-side comparison view
- Click to view developer profile
- Accept button → redirects to Stripe Checkout

**5. Payment Confirmation (`/org/missions/:id/funded`)**
After successful Stripe payment:
- "Mission funded! Developer has been notified"
- Show developer info
- Link to mission dashboard
- Track PR progress

**6. Completed Missions (`/org/missions/completed`)**
- List of all completed missions
- Filter by date, developer
- Download receipts
- Leave reviews

**7. Settings (`/org/settings`)**
- Organization profile
- Notification preferences
- Team members
- Payment history (Stripe Customer Portal)

#### User Flow Examples

**Posting a Mission:**
```
Dashboard → "Post Mission"
  → Connect GitHub → Select repo → Install GitHub App
  → Enter mission details (title, description, tags)
  → Set budget range ($500-$1000)
  → Preview → Publish
  → Mission appears in marketplace (status: open)
```

**Reviewing Proposals:**
```
Email: "You have 5 new proposals for 'Add dark mode'"
  → Click link → Mission detail page
  → Proposals tab shows 5 developer bids
  → Sort by rate (low to high)
  → Review: @sarah-dev - $750, 3 days, strong portfolio
  → Click "Accept Proposal"
  → Redirected to Stripe Checkout
  → Pay $825 (incl. platform fee)
  → Confirmation: "Mission funded! Developer notified"
```

**Tracking Work & Merge:**
```
Email: "PR opened for 'Add dark mode' mission"
  → Click link → Mission detail page
  → See PR #42 in PR tab
  → Click GitHub link → Review code
  → Request changes OR approve
  → Merge PR on GitHub
  → Platform detects merge
  → Automatic payout to developer ($750)
  → Mission status: Completed
```

---

### Developer Side (www.atelierlogos.studio/dev)

#### Pages

**1. Dashboard (`/dev/dashboard`)**
- Earnings summary (in escrow, paid, total lifetime)
- Active missions (in progress)
- Pending proposals (awaiting company response)
- Available missions (browse marketplace)
- Quick actions: Browse missions, view earnings

**2. Mission Marketplace (`/dev/missions/browse`)**
- Browse all open missions
- Filter by:
  - Tags (react, python, mobile, etc.)
  - Budget range
  - Posted date
  - Organization
- Each mission card shows:
  - Title & description preview
  - Budget range
  - Deadline
  - Tags
  - Proposal count
  - "Submit Proposal" button

**3. Mission Detail (`/dev/missions/:id`) - Before Proposing**
- Full mission description
- Repository link (preview on GitHub)
- Budget range (if set)
- Deadline
- Tags
- Posted by: Organization name
- Proposal count: "8 developers have submitted proposals"
- **Submit Proposal** button (opens modal)

**4. Submit Proposal Modal**
Form with:
- Your rate: $ (number input)
  - Shows company's budget range as guidance
  - Shows platform fee calculation: "Company pays $825 total"
- Estimated timeline: (number) days
- Cover letter: (rich text area)
  - "Explain your approach and relevant experience"
- Portfolio links: (optional, up to 3 URLs)
- Submit button

**5. My Proposals (`/dev/proposals`)**
- List of all submitted proposals
- Tabs: Pending, Accepted, Rejected
- Each shows:
  - Mission title
  - Your proposed rate
  - Status
  - Submitted date
  - Actions: View, Withdraw (if pending)

**6. Active Mission (`/dev/missions/:id`) - After Acceptance**
- Mission description
- **Status: Funded ($750 in escrow)**
- Your agreed rate
- Deadline countdown
- Repository info with "Fork Repository" button
- PR tracking:
  - Your open PRs
  - Review status
- Activity feed

**7. Earnings (`/dev/earnings`)**
- Total earnings (all time)
- In escrow: missions funded but PR not merged
- Pending payout: PR merged, waiting T+2 days
- Paid: completed payouts
- Monthly breakdown chart
- Link to Stripe Connect dashboard

**8. Payout History (`/dev/payouts`)**
- List of all Stripe transfers
- Each shows:
  - Mission title
  - Amount
  - Date received
  - PR link
  - Stripe transfer ID

**9. Settings (`/dev/settings`)**
- GitHub profile (read-only, synced from GitHub)
- Stripe Connect status
  - Connected: ✓ Payouts enabled
  - Link to Stripe Express dashboard
- Notification preferences
- Profile visibility settings

#### User Flow Examples

**Finding & Bidding on a Mission:**
```
Dashboard → "Browse Missions"
  → See: "Add dark mode to mobile app"
  → Click to view details
  → Review: Budget $500-$1000, React Native, 2 week deadline
  → Click "Submit Proposal"
  → Modal opens → Enter:
    - Rate: $750
    - Timeline: 3 days
    - Cover letter: "I have experience with..."
    - Portfolio link
  → Submit → "Proposal submitted!"
  → Status: Pending (waiting for company response)
```

**Proposal Accepted & Getting Paid:**
```
Email: "Your proposal was accepted!"
  → Click link → Mission detail page
  → Status: "Funded - $750 in escrow"
  → Click "Fork Repository" → GitHub opens
  → Work on fork → Implement feature → Test
  → Open PR to company repo
  → Company reviews code
  → Company merges PR
  → Email: "PR merged! Payout initiated"
  → 2 days later: $750 arrives in Stripe account
  → Mission status: Completed
```

**Tracking Earnings:**
```
Dashboard → Earnings widget shows:
  - In escrow: $1,200 (2 funded missions in progress)
  - Pending: $750 (1 PR merged, awaiting payout)
  - Paid: $4,500 (lifetime earnings)

Click "View Earnings" → Detailed breakdown:
  - Jan 2026: $1,500 (3 completed missions)
  - Dec 2025: $2,200 (4 completed missions)
  - Link to Stripe Connect dashboard for tax docs
```

---

## Onboarding Flows

### Hiring Organization Onboarding

**Step 1: Sign Up**
- Landing page: "Hire developers on GitHub. Pay per merged PR."
- Sign up form:
  - Company name
  - Email
  - Password
  - Or: "Sign up with Google"
- Accept terms of service
- Email verification

**Step 2: Welcome & Connect GitHub**
Welcome screen:
```
Welcome to Atelier Logos!

Let's get your first mission posted.

To post missions, you'll need to connect your GitHub account
so developers can submit PRs to your repositories.

[Connect GitHub Account]
```

- Click button → GitHub OAuth flow
- Permissions requested:
  - Read access to repositories
  - Read organization info
- Authorize → Return to platform

**Step 3: Post Your First Mission (Guided Wizard)**

**Page 1: Select Repository**
- "Which repository needs work?"
- Dropdown: List of GitHub repos from connected account
- Search/filter repos
- Select repo → "Next"

**Page 2: Install GitHub App**
- "Install Atelier Logos on [repo-name]"
- "This allows us to track PRs and notify you when work is ready"
- "Install App" → Redirect to GitHub
- User selects repository on GitHub
- Confirms installation
- Redirects back to platform

**Page 3: Describe the Mission**
Form:
- Mission title: (e.g., "Add dark mode support")
- Description: (rich text editor)
  - "Describe what you need built, include any requirements or constraints"
- Tags: (multi-select: react, typescript, mobile, etc.)

**Page 4: Budget & Timeline**
- Budget range (optional):
  - Min: $ ____
  - Max: $ ____
  - "Helps developers know if this fits their rate"
- Deadline (optional):
  - Date picker
  - "When do you need this completed?"

**Page 5: Review & Publish**
- Preview of mission as developers will see it
- Shows: Title, description, budget, deadline, repo, tags
- "Publish Mission" button
- Confirmation: "Mission published! You'll be notified when developers submit proposals."

**Step 4: First Proposal Arrives**
Email notification:
```
You have a new proposal for "Add dark mode support"

Developer: @sarah-dev
Rate: $750
Timeline: 3 days

[Review Proposal]
```

Tutorial overlay in dashboard:
```
Great! You have your first proposal.

Here's what to do:
1. Review the developer's GitHub profile
2. Read their cover letter and approach
3. Compare with other proposals
4. When ready, accept a proposal
5. You'll pay upfront via Stripe
6. Developer gets to work
7. Review and merge their PR
8. Developer gets paid automatically

[Got it]
```

**Onboarding Checklist (Dashboard widget):**
- [x] Account created
- [x] GitHub connected
- [x] First mission posted
- [x] GitHub App installed
- [ ] Reviewed a proposal
- [ ] Funded a mission
- [ ] First PR merged

---

### Developer Onboarding

**Step 1: Sign Up**
- Landing page: "Find paid GitHub work. Get paid per merged PR."
- Sign up options:
  - **"Continue with GitHub"** (recommended, highlighted)
  - Or: Email/password
- GitHub OAuth flow:
  - Permissions: Read profile, email
  - Developer authorizes
  - Returns to platform with GitHub identity

**Step 2: Connect Stripe (Critical Step)**
Immediately after signup, welcome screen:
```
Welcome, @your-github-username!

Before you can bid on missions, you need to connect Stripe
so we can pay you when your PRs get merged.

This takes about 2 minutes.

[Connect Stripe to Get Paid]
```

- Click button → Stripe Connect OAuth
- Developer creates Stripe Express account or logs in
- Stripe onboarding form:
  - Country
  - Personal or business account
  - Bank account details
  - Tax information (SSN/EIN for US, equivalent for others)
  - Identity verification (ID upload if needed)
- Complete → Return to platform
- Platform receives `stripe_account_id`

**Verification Check:**
```javascript
const account = await stripe.accounts.retrieve(stripe_account_id);

if (account.details_submitted && account.payouts_enabled) {
  // ✓ Ready to work
  developer.payout_enabled = true;
} else {
  // Show "Complete Stripe onboarding" banner
  // Provide link to return to Stripe
}
```

**Step 3: Browse Missions (Tutorial Overlay)**
Once Stripe connected, redirect to mission marketplace with tutorial:
```
✓ You're all set to earn!

Here's how Atelier Logos works:

1. Browse missions posted by companies
2. Submit proposals with your rate
3. Company reviews and picks a developer
4. If chosen, company pays upfront (held in escrow)
5. You build the feature in your fork
6. Open PR for review
7. Company merges your PR
8. You get paid automatically 🎉

Ready to find your first mission?

[Browse Missions]
```

**Step 4: First Proposal Tutorial**
When developer clicks "Submit Proposal" on their first mission:

Tutorial overlay on proposal modal:
```
Your First Proposal

Set your rate based on:
- How complex the work is
- Your experience level
- How fast you can deliver

Tips:
- Check the company's budget range
- Be competitive but fair
- Explain your approach in the cover letter
- Link to relevant portfolio work

The company sees:
- Your GitHub profile
- Your rate
- Your timeline
- Your cover letter

Good luck!

[Got it]
```

**Step 5: Proposal Accepted → Start Work**
Email: "Congratulations! Your proposal was accepted"

Mission detail page shows:
```
Mission Funded!

The company has paid $825 (your $750 + platform fee).
Funds are held in escrow until you complete the work.

What's next:
1. Fork the repository
2. Build the feature
3. Open a PR
4. Respond to feedback
5. PR gets merged
6. You get paid $750

[Fork Repository on GitHub]
```

**Step 6: Complete First Mission**
After first PR is merged:
```
🎉 Congratulations on your first completed mission!

Your $750 payout is on the way (arrives in 2-3 business days).

You can:
- View payout status in Earnings
- Browse more open missions
- Track payments in your Stripe dashboard

[Browse More Missions]
```

**Onboarding Checklist (Dashboard widget):**
- [x] Account created
- [x] GitHub connected
- [x] Stripe connected
- [ ] First proposal submitted
- [ ] First proposal accepted
- [ ] First PR merged
- [ ] First payout received

**Onboarding States:**
```
State 1: Signed up → needs Stripe
State 2: Stripe connected → can browse & bid
State 3: Proposal accepted → mission assigned, can work
State 4: Fully active → earning regularly
```

Platform allows browsing but blocks proposal submission until Stripe is connected.

---

## Real-Time Features

### Server-Sent Events (SSE)

**Mission Activity Feed Endpoint:**
```typescript
// /api/missions/:id/activity/stream

GET /api/missions/:id/activity/stream
Accept: text/event-stream

// Client receives:
event: pr_opened
data: {"pr": {...}, "timestamp": "..."}

event: pr_merged
data: {"pr": {...}, "amount": 500, "billable": true}

event: invoice_generated
data: {"invoice": {...}, "total": 2500}
```

**Implementation:**
```typescript
// Frontend
const eventSource = new EventSource(
  `/api/missions/${missionId}/activity/stream`
);

eventSource.addEventListener('pr_merged', (e) => {
  const data = JSON.parse(e.data);
  toast.success(`PR #${data.pr.number} merged - $${data.amount} billable`);
  refetchPRs();
});
```

### WebSocket Alternative

For bi-directional needs (optional):
- Use Pusher or Ably
- Real-time notifications
- Presence detection
- Chat between org and developer

---

## Security Considerations

**GitHub App Security:**
- Minimal permissions (read-only)
- Repository-scoped installations
- Webhook signature validation
- Rotate webhook secrets regularly

**Stripe Security:**
- Never expose secret keys client-side
- Validate webhook signatures
- Use Stripe Elements for card input
- PCI compliance via Stripe

**API Security:**
- JWT or session-based auth
- CSRF protection
- Rate limiting
- Input validation
- SQL injection prevention (parameterized queries)

**Data Privacy:**
- GDPR compliance (EU users)
- Data retention policies
- Soft deletes for audit trail
- Encrypted sensitive data at rest

---

## Summary

Charging per **merged pull request**, backed by a fork-based GitHub workflow, is a clean, defensible, and scalable approach for time-and-deliverables engagements.

The platform’s role is to organize, surface, and invoice—not to instrument or control how developers work.
