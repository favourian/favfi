# FavFI for iPhone and iPad (App Store version)

This is a separate native app that wraps the same FavFI you already use. The web app (PWA) is untouched and keeps working.
Everything runs offline from files inside the app. Open `FavFI.swiftpm` in Swift Playgrounds to read and run it.

## Get it on your iPad
1. In Safari on the iPad open https://favourian.github.io/favfi/FavFI-iOS.zip and tap Download.
2. In Files, tap the zip to unzip it. You get `FavFI.swiftpm`.
3. Tap `FavFI.swiftpm` (opens in Swift Playgrounds 4.6 or later), then tap Run.

## Files
- `FavFIApp.swift`: app entry, lock cover. `AppModel.swift`: Face ID / passcode lock.
- `Bridge.swift`: the web view and the messages between the page and iOS (haptics, reminders, share sheet, erase).
- `AppSchemeHandler.swift`: serves the bundled `web/` folder offline over `favfi://`.
- `Store.swift`: private on-device settings and the safety copy.
- `Intelligence.swift` and `AskView.swift`: **Apple Intelligence**. A native "Ask FavFI" sheet with an on-device model and Apple's Private Cloud Compute model. Find it on the dashboard (Ask FavFI button) or Preferences, Apple Intelligence.
- `FavFIIntents.swift` and `SiriAI/`: **Siri and Shortcuts** (off by default).
- `web/index.html`: the FavFI web app with sample data and the native bridge.

## What works where (honest status)
- The Swift code was written without a compiler available. Expect to fix a few small compile errors on first Run. Paste them to Claude and they get fixed quickly.
- On-device model: needs a device with Apple Intelligence on, iOS 26 or later.
- Apple cloud model: needs iOS 27 and likely Apple's approval of your app (apply on the Apple developer site; limits apply per iCloud account). Until then the sheet shows a friendly error.
- Siri AI (apps as tools): needs a development-signed Xcode build on an Apple Intelligence device; App Store users get it in spring; unavailable in the EU. Playgrounds may not generate App Intents metadata, so the Siri file is switched off by default. To try: add `swiftSettings: [.define("FAVFI_SIRI")]` to the target in Package.swift.
- Face ID: in App Settings, Capabilities, add Face ID with the text "FavFI uses Face ID to keep your finances private."
- The icon is upscaled from a 512 px image. Replace `Assets.xcassets/AppIcon.appiconset/AppIcon.png` with a true 1024 px icon before submitting.

## Before you submit (needs a paid Apple Developer account)
1. App Settings: set your Team and a unique Bundle ID. Check the name "FavFI" is free in App Store Connect.
2. Add an email or support contact to `privacy.html` and `support.html` (currently a GitHub issues link).
3. Test on a real device: lock, reminders, export and share, erase, sample data, offline.
4. Playgrounds: Share, then Submit to App Store Connect. Complete the listing there.

### App Store Connect answers
- Age rating 4+. Unrestricted web access: No. Price: free.
- Privacy label: Data Not Collected. Privacy policy URL: https://favourian.github.io/favfi/privacy.html. Support URL: https://favourian.github.io/favfi/support.html.
- Export compliance: uses no non-exempt encryption.
- Category: Finance (or Productivity).
- Screenshots: iPhone and iPad, with sample data.

### Review notes (paste)
FavFI is an offline personal-finance planner. It has no accounts, servers, ads or tracking, and does not move money or connect to banks. All content ships inside the app. To explore quickly: Preferences, About & legal, Load sample data. Native features: Face ID/passcode lock, local bill reminders, share sheet, Apple Intelligence "Ask FavFI" (on-device by default; Apple's cloud model only after in-app consent). Estimates are labelled as not financial, tax or legal advice. No sign-in is needed.

### Likely rejection risks and how they're handled
| Guideline | Risk | Handling |
|---|---|---|
| 4.2 Minimum functionality (web wrapper) | "Just a website" | Bundled offline, native lock, reminders, haptics, share sheet, Apple Intelligence |
| 2.1 Completeness | Empty app confuses reviewers | Sample-data loader and review notes |
| 5.1.1 Privacy | Missing policy or purpose strings | Policy and support pages, Face ID text, notifications asked only on tap |
| 5.1.2(i) Sharing data with AI | Cloud AI without consent | On-device default; cloud needs an explicit in-app agree |
| 5.1.1(v) Account deletion | n/a, no accounts | "Erase all data" in Preferences |
| 3.1 / 5.x Financial | Looks like advice or money movement | "Estimates only" disclaimers; no money movement |
| 4.1 Copycats / name | Name clash | Check name availability |

## After you update the web app
Rebuild the native page (Claude does this), then replace `web/index.html` with the new `native/index.html`. Move data between the web app and this app with Backup, Save to Files, then import.
