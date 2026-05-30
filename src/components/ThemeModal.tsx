import { Button } from "./Button";
import { X, Moon, Sun, Palette } from "lucide-react";
import type { ColorTheme, ThemeMode } from "../hooks/useTheme";

type ThemeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
};

const THEMES: { id: ColorTheme; label: string; color: string }[] = [
  { id: "default", label: "Witold Obłoza", color: "bg-[#8b5cf6]" }, // obecny fioletowy
  { id: "theme-shrek", label: "Siergiej Fialko", color: "bg-[#ef4444]" },
  { id: "theme-panther", label: "Menadżer inpostu", color: "bg-[#f59e0b]" },
  { id: "theme-smurf", label: "Czolasty", color: "bg-[#737373]" },
  { id: "theme-ziomo", label: "Niezdzeiedzki….", color: "bg-[#10b981]" },
];

export function ThemeModal({
  isOpen,
  onClose,
  themeMode,
  setThemeMode,
  colorTheme,
  setColorTheme,
}: ThemeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surfaceContainer-light dark:bg-surfaceContainer-dark w-full max-w-sm rounded-3xl p-6 shadow-xl border border-outlineVariant-light dark:border-outlineVariant-dark">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Wybierz motyw
          </h2>
          <Button
            variant="text"
            onClick={onClose}
            className="p-2 w-10 h-10 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark mb-3 uppercase tracking-wider">
              Tryb
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={themeMode === "light" ? "filled" : "outlined"}
                onClick={() => setThemeMode("light")}
              >
                <Sun className="w-4 h-4 mr-2" />
                Jasny
              </Button>
              <Button
                variant={themeMode === "dark" ? "filled" : "outlined"}
                onClick={() => setThemeMode("dark")}
              >
                <Moon className="w-4 h-4 mr-2" />
                Ciemny
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark mb-3 uppercase tracking-wider">
              Kolor wiodący
            </h3>
            <div className="space-y-2">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setColorTheme(theme.id)}
                  className={`w-full flex items-center p-3 rounded-xl border-2 transition-all ${
                    colorTheme === theme.id
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                      : "border-transparent hover:bg-surfaceContainerHighest-light dark:hover:bg-surfaceContainerHighest-dark"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full mr-3 ${theme.color} shadow-sm border border-black/10`}
                  />
                  <span className="font-medium text-left flex-1">
                    {theme.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
