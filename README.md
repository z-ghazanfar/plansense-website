# PlanSense

PlanSense is a web app I built to make pre-construction work faster and less messy.

The main idea is simple: upload a floor plan, let AI break it down, build an estimate from that data, and move straight into bidding.

Live site: https://plansense.org

## What it does

- Blueprint takeoff with AI
  Upload a floor plan image and PlanSense detects rooms, measures area, and maps everything visually.

- Cleaner room data
  The app filters noisy detections and duplicate boxes so the results are actually usable.

- Cost estimating workspace
  Pick rooms, apply tasks by trade/category, and generate a running total based on quantity units like `sqft`, `lnft`, and `each`.

- Estimate output flow
  Estimate data is structured so it can be used for proposal/export actions.

- Social marketplace for bidding
  Real estate developers post projects with clear scope details already attached from the AI analysis (floor plan context, estimate inputs, and work needed).
  Contractors bid on those projects, and the developer chooses the winner based on lowest price or overall best fit.

- One connected dashboard
  Takeoff, estimating, and marketplace are all in one flow so you do not have to jump between tools.

## What is in this repo

- Landing page + product marketing pages
- In-app dashboard experience
- Blueprint analyzer UI
- Cost estimator UI
- Marketplace UI
