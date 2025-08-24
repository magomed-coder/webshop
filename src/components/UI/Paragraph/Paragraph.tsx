import React, { type CSSProperties } from "react";

export type ThemedTextProps = {
  children: React.ReactNode;
  variant?: string; // "u500.18" / "r400.16"
  style?: CSSProperties;
};

type FontFamilyCode = "r" | "u";
type FontWeight = 300 | 400 | 500 | 700;

const FONT_MAP: Record<FontFamilyCode, Partial<Record<FontWeight, string>>> = {
  r: {
    400: "Roboto, sans-serif",
    500: "Roboto, sans-serif",
    700: "Roboto, sans-serif",
  },
  u: {
    400: "Ubuntu, sans-serif",
    500: "Ubuntu, sans-serif",
    700: "Ubuntu, sans-serif",
  },
};

function parseVariant(variant: string): CSSProperties | undefined {
  const match = variant.match(/^([a-z])(\d{3})\.(\d{1,2})$/);
  if (!match) return undefined;

  const [, familyCode, weightStr, sizeStr] = match;
  const weight = parseInt(weightStr, 10) as FontWeight;
  const fontSize = parseInt(sizeStr, 10);
  const fontFamily = FONT_MAP[familyCode as FontFamilyCode]?.[weight];

  return {
    fontSize,
    lineHeight: Math.round(fontSize * 1.5),
    fontFamily,
    fontWeight: weight,
  };
}

export function Paragraph({
  children,
  variant = "u500.18",
  style,
}: ThemedTextProps) {
  const variantStyle = parseVariant(variant);

  return (
    <span style={{ color: "#000", ...variantStyle, ...style }}>{children}</span>
  );
}
