"use client";

import { cn } from "@/lib/utils";
import React, {
    type ComponentPropsWithRef,
    type ReactNode,
    useContext,
    useState,
} from "react";
import Button from "@/components/ui/Button";

interface TabsContextTypes {
  activeTab: string | null | undefined;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

const TabsContext = React.createContext<TabsContextTypes>({
  activeTab: null,
  setActiveTab: () => {},
});

export function Tabs({
  defaultValue,
  containerClassName,
  children,
}: {
  defaultValue?: string;
  children: React.ReactNode;
  containerClassName?: string;
}) {
  const [activeTab, setActiveTab] = useState<string | null | undefined>(
    defaultValue,
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("space-y-6", containerClassName)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsTrigger({
  label,
  value,
  className,
  activeTriggerClassName,
}: {
  label: string;
  value: string;
  activeTriggerClassName?: string;
  className?: string;
} & ComponentPropsWithRef<"button">) {
  const { setActiveTab, activeTab } = useContext(TabsContext);

  const activeTriggerButtonClassNames =
    activeTab === value
      ? cn("bg-violet-500 text-violet-50", activeTriggerClassName)
      : "";

  return (
    <Button
      onClick={() => setActiveTab(value)}
      className={cn(
        "bg-gray-100 text-gray-900",
        className,
        activeTriggerButtonClassNames,
      )}
    >
      {label}
    </Button>
  );
}

export function TabsContent({
  children,
  contentKey,
  className,
}: {
  children: ReactNode;
  contentKey: string;
  className?: string;
}) {
  const { activeTab } = useContext(TabsContext);

  const isActiveTab = activeTab === contentKey;

  return (
    isActiveTab && <div className={cn("rounded-sm px-4 py-2", className)}>{children}</div>
  );
}
