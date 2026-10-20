# Migration Guide

To adopt Fingoals Design Tokens in your existing project:

### Web Projects
1. Link `web/tokens.css` in your HTML:
   ```html
   <link rel="stylesheet" href="web/tokens.css">
   ```
2. Replace hardcoded colors with CSS variables (`var(--fg-action-primary-bg)`, `var(--fg-card-radius)`).

### Flutter Projects
1. Copy `flutter/lib/design_tokens` to your Flutter `lib/` folder.
2. In your `MaterialApp`:
   ```dart
   theme: AppTheme.lightTheme,
   darkTheme: AppTheme.darkTheme,
   ```
3. Use `AppColors`, `AppTypography`, `AppRadius`, and `AppSpacing`.
