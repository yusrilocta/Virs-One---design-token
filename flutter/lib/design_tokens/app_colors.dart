import 'package:flutter/material.dart';

/// Fingoals Color Tokens extracted from UI
class AppColors {
  AppColors._();

  // Brand Primitives
  static const Color brandPrimary = Color(0xFF0B63F6);
  static const Color brandPrimaryHover = Color(0xFF0952CE);
  static const Color brandPrimaryLight = Color(0xFFEBF2FF);
  static const Color brandNavy = Color(0xFF122A5E);
  static const Color brandSky = Color(0xFFA8CBFF);
  static const Color brandCyan = Color(0xFF00B4D8);

  // Neutral Scale
  static const Color white = Color(0xFFFFFFFF);
  static const Color neutral50 = Color(0xFFF8F9FA);
  static const Color neutral100 = Color(0xFFF0F2F5);
  static const Color neutral200 = Color(0xFFE4E7EC);
  static const Color neutral300 = Color(0xFFD0D5DD);
  static const Color neutral400 = Color(0xFF98A2B3);
  static const Color neutral500 = Color(0xFF667085);
  static const Color neutral600 = Color(0xFF475467);
  static const Color neutral700 = Color(0xFF344054);
  static const Color neutral800 = Color(0xFF1D2939);
  static const Color neutral900 = Color(0xFF101828);
  static const Color neutral950 = Color(0xFF0C0F14);

  // Status Colors
  static const Color successBg = Color(0xFFECFDF3);
  static const Color successText = Color(0xFF027A48);
  static const Color successPrimary = Color(0xFF12B76A);

  static const Color warningBg = Color(0xFFFFFAEB);
  static const Color warningPrimary = Color(0xFFF79009);

  static const Color dangerBg = Color(0xFFFEF3F2);
  static const Color dangerPrimary = Color(0xFFF04438);

  // Semantic Light
  static const Color lightCanvas = neutral50;
  static const Color lightSurface = white;
  static const Color lightSurfaceMuted = neutral100;
  static const Color lightSurfaceInverse = neutral950;
  static const Color lightTextPrimary = neutral900;
  static const Color lightTextSecondary = neutral500;
  static const Color lightBorder = neutral200;

  // Semantic Dark
  static const Color darkCanvas = Color(0xFF0B0E14);
  static const Color darkSurface = Color(0xFF151922);
  static const Color darkSurfaceMuted = Color(0xFF1F2430);
  static const Color darkSurfaceInverse = white;
  static const Color darkTextPrimary = Color(0xFFF3F4F6);
  static const Color darkTextSecondary = Color(0xFF9CA3AF);
  static const Color darkBorder = Color(0xFF262C3A);
}
