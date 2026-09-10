# BloodHub Frontend Audit

Scope: React Native Expo frontend only. The Spring Boot backend is unchanged.

## App, Auth, and Navigation

- `AppNavigator` always starts at `Auth`; there is no persisted-session bootstrap.
- Login stores token, role, and name, but there is no logout action or centralized 401 handling.
- Login and registration use hardcoded localhost URLs instead of the shared API client.
- The Delivery route is a static placeholder; the Delivery screen files are unused and empty. It should remain disabled rather than receive new functionality.
- User and blood-bank stack routes are present and mostly valid, but several child screens hide headers and must provide their own Back action.

## User Search, Reservation, and Emergency Blood

- `MapScreen` uses real inventory data but replaces missing bank address/distance with hardcoded `Chennai` and `Nearby`; it also assumes every response is an array and can fail on a missing bank ID.
- `BloodBankDetailsScreen` has placeholder Call and Directions alerts. These must use real bank contact/location fields and fail gracefully when absent.
- Reservation and emergency submissions use the existing endpoints and inventory/reservation contracts. Their loading states and token checks need strengthening.
- `WaitingScreen` receives a reservation response but later treats `/reservation/my`'s list response as one object, so status/details can remain blank.
- Several form defaults (`Apollo Blood Bank`, `A+`, `2`) are fallback UI values and must not replace selected backend data.

## SOS

- Create, broadcast, polling, accept, confirm, and requester status use the existing SOS API helpers. The requester confirmation helper is not currently wired into a visible action.
- Donor-side Call and Directions in `SOSResponseScreen` are placeholders.
- Post-accept Call and Maps in `SOSAcceptedScreen` exist but need guarded `Linking` calls and real coordinate support when supplied by the backend.
- User home expects `hospitalName`, while SOS responses provide `hospital`; this can produce incomplete cards.
- Loading, empty, and error states exist in several SOS screens but still contain raw console logging and inconsistent alerts.

## Notifications and Profile

- Notifications load real available SOS requests and navigate into the nested Home stack. They need a clearer loading/empty/error presentation and should retain backend fields.
- Profile calls `/user/profile`, but a failed request leaves `user` null while rendering `user.fullName`, causing a runtime crash. It has no logout control.

## Blood Bank

- Dashboard navigation, request polling/acceptance, inventory (`GET /inventory/my`, `PUT /inventory`), and reservation approval use the current backend contracts.
- Inventory and history need explicit loading/empty states and defensive array handling. Inventory must remain scoped to the current blood bank.

## Device Actions and Production Readiness

- Phone buttons must use `Linking` with backend-provided numbers; missing/invalid numbers need a user-facing message.
- Map buttons must use backend coordinates when present, otherwise a real backend address, with a Google Maps URL and device fallback.
- `localhost:8080` is still a development assumption and is intentionally not changed in this pass.
- Hardcoded placeholder locations, contacts, optimistic statuses, and unused Delivery UI need removal or containment where real data exists.