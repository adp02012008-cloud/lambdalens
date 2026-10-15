# LambdaWatch — Serverless Function Monitoring Platform

> **Hackathon Edition (Phase 1: Frontend & Mock Telemetry)**  
> A modern, dark-themed DevOps observability dashboard for monitoring serverless workloads, execution metrics, CloudWatch logs, and error alarms.

---

## 📌 Project Overview

**LambdaWatch** is an observability console designed for monitoring AWS Lambda serverless functions. This Phase 1 release provides a hackathon-ready frontend dashboard with realistic interactive simulations, performance charts, and configuration metadata.

> [!NOTE]  
> **Phase 1 Scope**: This phase provides the frontend interface with local demonstration data. AWS Lambda, API Gateway, and CloudWatch will be integrated in Phase 2. All mock data and simulated responses are clearly labeled throughout the application.

---

## 🚀 Key Features

### 1. Serverless Overview
- **Metric Cards**: Total Invocations (`22`), Average Latency (`12.29 ms`), Total Errors (`5`), and CloudWatch Alarm Status (`ALARM`).
- **Telemetry Charts**:
  - *Invocation History Area Chart* with smooth gradients and hover tooltips.
  - *Execution Duration Line Chart* displaying latency trends in milliseconds.
  - *Error History Bar Chart* tracking error spikes.
- **Alarm Status Panel**: Monitored function (`hackathon-monitoring-func`), metric (`AWS/Lambda — Errors`), and threshold (`Errors > 1`).
- **Recent Executions Table**: 6 demo invocation records with status badges and execution summaries.

### 2. Function Testing Console
- **Interactive JSON Editor**: Syntax validation with error callouts, JSON formatting, and reset controls.
- **Preset Payloads**: Quick buttons for default arithmetic inputs, large values, and missing fields.
- **Simulated Test Runner**:
  - `Run Function`: Returns `{ "result": 30 }` with realistic latency (`~11 ms`) and status badge `200 SUCCESS`.
  - `Test Error`: Triggers controlled demo error `{ "error": "Invalid input: required field is missing" }` with `400 ERROR`.
- **Response Panel**: Displays HTTP status, execution duration, memory consumption, request ID, and one-click JSON copy.
- **Auto-Sync to History**: Executions automatically record to the Test History page and persist in `localStorage`.

### 3. Monitoring & Metrics
- **Interactive Time-Range Selector**: `Last 1 hour`, `Last 3 hours`, `Last 24 hours`, and `Last 7 days`.
- **Adaptive Data Sets**: Changing the time window dynamically updates chart intervals and aggregate totals.
- **Additional Telemetry**: Throttling metric card, concurrent execution limits (`2 / 1,000`), cold start estimates, and success rate (`77.3%`).

### 4. CloudWatch Logs Viewer
- **Log Stream Selector**: Inspects streams for `/aws/lambda/hackathon-monitoring-func`.
- **Live Search**: Instant filtering against messages, Request IDs, and trace details.
- **Severity Filters**: Filter by `ALL`, `INFO`, `WARN`, `ERROR`, or execution outcome (`Success Only`, `Errors Only`).
- **Expandable Rows**: Inspect AWS Lambda `START`, `END`, and `REPORT` lines with memory and billed duration breakdowns.
- **Export**: One-click log export to `.txt`.

### 5. Alerts & CloudWatch Alarm Management
- **Dedicated Alarm Controller**: Focused on `Hackathon-Error-Alert`.
- **Interactive Demo State Switcher**: Toggle between `OK (Healthy)`, `ALARM (Triggered)`, and `INSUFFICIENT_DATA` for live presentations (synchronizes with Overview and Topbar).
- **Evaluation Rules**: Displays period, metric namespace (`AWS/Lambda`), and missing data policies.
- **State History Table**: Chronological audit log of alarm transitions.

### 6. Test Execution History
- **Persistent Records**: Stored in `localStorage` (`lambdawatch_test_history`).
- **Inspection Modal**: Click any record to inspect raw JSON input and response payloads.
- **Search & Filter**: Search by test ID or status.
- **Clear History**: Includes safety confirmation modal.

### 7. Function Information & Architecture
- **Configuration Spec**: Function name, AWS region (`ap-southeast-2`), proposed runtime (`Python 3.12`), memory (`128 MB`), and timeout (`3.0s`).
- **Architecture Flow Diagram**: Visual map of Client &rarr; API Gateway &rarr; Lambda &rarr; CloudWatch &rarr; LambdaWatch.
- **DevOps Integration Checklist**: Outlines Phase 2 deployment steps for connecting live AWS services.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Language** | JavaScript (ESModules) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Styling** | Vanilla CSS with Design System Variables (Dark Theme) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📂 Project Structure

```
aws/
├── index.html                    # Root HTML with Google Fonts (Inter & JetBrains Mono)
├── package.json                  # Scripts & dependencies
├── vite.config.js                # Vite build configuration
└── src/
    ├── main.jsx                  # Application entry point
    ├── App.jsx                   # React Router & Global Provider wiring
    ├── index.css                 # Root CSS import
    ├── styles/
    │   ├── variables.css         # Dark theme tokens, colors, typography, radii
    │   ├── global.css            # CSS reset, scrollbars, status badges
    │   └── dashboard.css         # Comprehensive responsive dashboard styles
    ├── context/
    │   └── DashboardContext.jsx  # Global state (Alarm state, Time range, History sync)
    ├── services/
    │   └── testFunctionService.js# Modular execution service (Phase 1 mock / Phase 2 fetch)
    ├── data/
    │   ├── mockMetrics.js        # Overview & time-range chart datasets
    │   ├── mockLogs.js           # CloudWatch log streams & sample events
    │   ├── mockHistory.js        # Default test execution records
    │   └── mockConfig.js         # Function metadata & alarm configuration
    ├── layouts/
    │   └── DashboardLayout.jsx   # Sticky Sidebar, Topbar, and main container layout
    ├── components/
    │   ├── Sidebar.jsx           # Responsive sidebar with active highlighting
    │   ├── Topbar.jsx            # Page title, region badge, simulated refresh
    │   ├── MetricCard.jsx        # Telemetry cards with trend indicators
    │   ├── ChartCard.jsx         # Card container with title and demo badges
    │   ├── StatusBadge.jsx       # Color-coded status badges (OK, ALARM, ERROR, etc.)
    │   └── DemoNotice.jsx        # Warning/demo notice banner
    └── pages/
        ├── Overview.jsx          # Dashboard overview with 4 metrics & 3 charts
        ├── FunctionTesting.jsx   # Interactive test console with JSON editor
        ├── Monitoring.jsx        # Telemetry page with 1h/3h/24h/7d selector
        ├── Logs.jsx              # CloudWatch logs search & level filters
        ├── Alerts.jsx            # Alarm details & interactive demo state toggle
        ├── TestHistory.jsx       # Execution table with modal preview & clear dialog
        └── FunctionInfo.jsx      # Metadata, architecture flow, and Phase 2 checklist
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v20+ recommended)
- npm

### 1. Installation
Clone or navigate to the project directory and install dependencies:
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/
```

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.

---

## 🔌 Phase 2 AWS Integration Plan

When ready to connect live AWS resources, the architecture enables straightforward transition:

1. **API Gateway Execution**:
   - Update `src/services/testFunctionService.js` by setting `API_GATEWAY_URL` to your live API Gateway endpoint in `ap-southeast-2`.
   - Replace the simulated delay with a standard `fetch(API_GATEWAY_URL, { method: 'POST', body: JSON.stringify(payload) })`.
2. **CloudWatch Metrics**:
   - Configure AWS SDK v3 (`@aws-sdk/client-cloudwatch`) or an API Gateway telemetry endpoint to query `GetMetricData` for `AWS/Lambda` namespace.
   - Replace `TIME_RANGE_METRICS` in `DashboardContext` with live CloudWatch data.
3. **CloudWatch Logs**:
   - Query `@aws-sdk/client-cloudwatch-logs` with `FilterLogEvents` for `/aws/lambda/hackathon-monitoring-func`.
4. **CloudWatch Alarms**:
   - Query `DescribeAlarms` for `Hackathon-Error-Alert` to dynamically read live `StateValue` (`OK`, `ALARM`, `INSUFFICIENT_DATA`).
