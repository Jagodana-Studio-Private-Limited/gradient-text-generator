"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Plus, Trash2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

type GradientType = "linear" | "radial" | "conic";

interface ColorStop {
  color: string;
  position: number;
}

const PRESETS = [
  { name: "Sunset", colors: ["#f97316", "#ec4899", "#8b5cf6"], angle: 135 },
  { name: "Ocean", colors: ["#06b6d4", "#3b82f6", "#8b5cf6"], angle: 90 },
  { name: "Forest", colors: ["#22c55e", "#10b981", "#06b6d4"], angle: 45 },
  { name: "Fire", colors: ["#ef4444", "#f97316", "#eab308"], angle: 90 },
  { name: "Neon", colors: ["#8b5cf6", "#ec4899", "#06b6d4"], angle: 135 },
  { name: "Aurora", colors: ["#22c55e", "#06b6d4", "#8b5cf6", "#ec4899"], angle: 90 },
  { name: "Gold", colors: ["#f59e0b", "#d97706", "#b45309"], angle: 135 },
  { name: "Midnight", colors: ["#1e3a5f", "#4f46e5", "#7c3aed"], angle: 180 },
];

export function GradientTextGenerator() {
  const [text, setText] = useState("Gradient Text");
  const [fontSize, setFontSize] = useState(72);
  const [fontWeight, setFontWeight] = useState<string>("800");
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: "#8b5cf6", position: 0 },
    { color: "#ec4899", position: 50 },
    { color: "#06b6d4", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const gradientCSS = useMemo(() => {
    const stops = colorStops
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ");

    switch (gradientType) {
      case "linear":
        return `linear-gradient(${angle}deg, ${stops})`;
      case "radial":
        return `radial-gradient(circle, ${stops})`;
      case "conic":
        return `conic-gradient(from ${angle}deg, ${stops})`;
    }
  }, [colorStops, gradientType, angle]);

  const fullCSS = useMemo(() => {
    return `background: ${gradientCSS};
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
font-size: ${fontSize}px;
font-weight: ${fontWeight};`;
  }, [gradientCSS, fontSize, fontWeight]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(fullCSS);
    setCopied(true);
    toast.success("CSS copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }, [fullCSS]);

  const addColor = useCallback(() => {
    if (colorStops.length >= 5) return;
    const lastPos = colorStops[colorStops.length - 1]?.position ?? 100;
    const newPos = Math.min(lastPos + 10, 100);
    setColorStops((prev) => [...prev, { color: "#6366f1", position: newPos }]);
  }, [colorStops]);

  const removeColor = useCallback(
    (index: number) => {
      if (colorStops.length <= 2) return;
      setColorStops((prev) => prev.filter((_, i) => i !== index));
    },
    [colorStops.length]
  );

  const updateColor = useCallback(
    (index: number, field: keyof ColorStop, value: string | number) => {
      setColorStops((prev) =>
        prev.map((stop, i) =>
          i === index ? { ...stop, [field]: value } : stop
        )
      );
    },
    []
  );

  const applyPreset = useCallback(
    (preset: (typeof PRESETS)[number]) => {
      const step = 100 / (preset.colors.length - 1);
      setColorStops(
        preset.colors.map((color, i) => ({
          color,
          position: Math.round(i * step),
        }))
      );
      setAngle(preset.angle);
      setGradientType("linear");
    },
    []
  );

  const resetAll = useCallback(() => {
    setText("Gradient Text");
    setFontSize(72);
    setFontWeight("800");
    setGradientType("linear");
    setAngle(135);
    setColorStops([
      { color: "#8b5cf6", position: 0 },
      { color: "#ec4899", position: 50 },
      { color: "#06b6d4", position: 100 },
    ]);
  }, []);

  return (
    <div className="space-y-8">
      {/* Live Preview */}
      <Card className="p-8 md:p-12 overflow-hidden">
        <motion.div
          key={gradientCSS + fontSize + fontWeight}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          className="text-center break-words"
        >
          <span
            style={{
              background: gradientCSS,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: `${Math.min(fontSize, 120)}px`,
              fontWeight: Number(fontWeight),
              lineHeight: 1.2,
              display: "inline-block",
            }}
          >
            {text || "Gradient Text"}
          </span>
        </motion.div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <Card className="p-6 space-y-6">
          <h3 className="font-semibold text-lg">Settings</h3>

          {/* Text Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Text
            </label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text..."
            />
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min="16"
              max="120"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-brand"
            />
          </div>

          {/* Font Weight */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Font Weight
            </label>
            <div className="flex flex-wrap gap-2">
              {["400", "500", "600", "700", "800", "900"].map((w) => (
                <button
                  key={w}
                  onClick={() => setFontWeight(w)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                    fontWeight === w
                      ? "bg-brand text-white border-brand"
                      : "bg-muted/50 border-border hover:border-brand/50"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Gradient Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Gradient Type
            </label>
            <div className="flex gap-2">
              {(["linear", "radial", "conic"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setGradientType(type)}
                  className={`px-4 py-2 rounded-lg text-sm border capitalize transition-colors ${
                    gradientType === type
                      ? "bg-brand text-white border-brand"
                      : "bg-muted/50 border-border hover:border-brand/50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Angle */}
          {(gradientType === "linear" || gradientType === "conic") && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Angle: {angle}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-brand"
              />
            </div>
          )}

          {/* Color Stops */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">
                Color Stops
              </label>
              {colorStops.length < 5 && (
                <Button variant="outline" size="sm" onClick={addColor}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Color
                </Button>
              )}
            </div>
            {colorStops.map((stop, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateColor(i, "color", e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-border bg-transparent"
                />
                <Input
                  value={stop.color}
                  onChange={(e) => updateColor(i, "color", e.target.value)}
                  className="flex-1 font-mono text-sm"
                  maxLength={7}
                />
                <div className="flex items-center gap-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={stop.position}
                    onChange={(e) =>
                      updateColor(i, "position", Number(e.target.value))
                    }
                    className="w-20 accent-brand"
                  />
                  <span className="text-xs text-muted-foreground w-8">
                    {stop.position}%
                  </span>
                </div>
                {colorStops.length > 2 && (
                  <button
                    onClick={() => removeColor(i)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove color"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={resetAll}
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </Card>

        {/* Presets + CSS Output */}
        <div className="space-y-6">
          {/* Presets */}
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">Presets</h3>
            <div className="grid grid-cols-2 gap-3">
              {PRESETS.map((preset) => {
                const previewGradient = `linear-gradient(${preset.angle}deg, ${preset.colors.join(", ")})`;
                return (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="group relative overflow-hidden rounded-xl border border-border hover:border-brand/50 transition-colors p-3 text-left"
                  >
                    <div
                      className="h-8 rounded-lg mb-2"
                      style={{ background: previewGradient }}
                    />
                    <span className="text-sm font-medium">{preset.name}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* CSS Output */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">CSS Output</h3>
              <Button
                size="sm"
                onClick={handleCopy}
                className="gap-2"
                variant={copied ? "default" : "outline"}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy CSS
                  </>
                )}
              </Button>
            </div>
            <pre className="bg-muted/50 rounded-xl p-4 text-sm font-mono overflow-x-auto whitespace-pre-wrap border border-border/50">
              <code>{fullCSS}</code>
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}
