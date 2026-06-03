import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { UIProvider } from "@/contexts/UIContext";

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, {
    wrapper: ({ children }) => <UIProvider>{children}</UIProvider>,
    ...options,
  });
}
