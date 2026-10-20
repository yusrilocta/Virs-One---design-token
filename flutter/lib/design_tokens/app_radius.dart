import 'package:flutter/material.dart';

class AppRadius {
  AppRadius._();

  static const double r0 = 0.0;
  static const double rXs = 4.0;
  static const double rSm = 8.0;
  static const double rMd = 12.0;
  static const double rLg = 16.0;
  static const double rXl = 20.0;
  static const double r2Xl = 24.0;
  static const double r3Xl = 32.0;
  static const double rFull = 9999.0;

  static final BorderRadius card = BorderRadius.circular(r2Xl);
  static final BorderRadius pill = BorderRadius.circular(rFull);
  static final BorderRadius badge = BorderRadius.circular(rFull);
}
