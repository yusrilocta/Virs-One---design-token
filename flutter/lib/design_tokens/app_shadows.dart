import 'package:flutter/material.dart';

class AppShadows {
  AppShadows._();

  static const List<BoxShadow> card = [
    BoxShadow(
      color: Color.fromRGBO(16, 24, 40, 0.03),
      blurRadius: 4,
      offset: Offset(0, 1),
    ),
    BoxShadow(
      color: Color.fromRGBO(16, 24, 40, 0.04),
      blurRadius: 12,
      offset: Offset(0, 4),
    ),
  ];

  static const List<BoxShadow> float = [
    BoxShadow(
      color: Color.fromRGBO(16, 24, 40, 0.08),
      blurRadius: 24,
      offset: Offset(0, 12),
    ),
  ];
}
